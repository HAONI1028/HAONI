/* =====================================================================
   HAONI control panel — login + save server (Cloudflare Worker)

   This is the only place your Lanyard API key lives. It:
     1. logs you in with Discord (OAuth2 "code" flow, using a client secret),
     2. checks the Discord account is yours (OWNER_ID),
     3. gives the panel a signed session token,
     4. only accepts saves that carry a valid token, then writes to Lanyard.

   Settings (Cloudflare dashboard → your worker → Settings → Variables):
     Variables (plain):  DISCORD_CLIENT_ID, OWNER_ID, PANEL_URL
     Secrets (encrypted): DISCORD_CLIENT_SECRET, LANYARD_KEY, SESSION_SECRET
   See SETUP.md in this folder.
   ===================================================================== */

const LANYARD = "https://api.lanyard.rest/v1/users/";
const DISCORD_API = "https://discord.com/api/v10";
const SESSION_HOURS = 12;          // normal login
const STAY_DAYS = 30;              // "Stay logged in"
const EPOCH_KEY = "panel_epoch";   // "Log out everywhere" changes this on Lanyard
const WRITABLE = { site: 30000, bio: 2000, pronouns: 40 };   // what the panel may save (max length)
const DELETABLE = ["bio", "pronouns", "panel_lock"];

const te = new TextEncoder(), td = new TextDecoder();

/* ---------- small helpers ---------- */
const b64url = (bytes) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const unb64url = (s) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0));
const randomId = () => b64url(crypto.getRandomValues(new Uint8Array(16)));

class HttpError extends Error {
  constructor(status, code, message) { super(message || code); this.status = status; this.code = code; }
}

async function hmacKey(env) {
  if (!env.SESSION_SECRET || env.SESSION_SECRET.length < 32) throw new HttpError(500, "not_configured", "SESSION_SECRET is missing or too short.");
  return crypto.subtle.importKey("raw", te.encode(env.SESSION_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}
// value -> "payload.signature"
async function sign(env, value) {
  const payload = b64url(te.encode(JSON.stringify(value)));
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", await hmacKey(env), te.encode(payload)));
  return `${payload}.${b64url(sig)}`;
}
// "payload.signature" -> value (or null if forged/garbled)
async function unsign(env, token) {
  if (typeof token !== "string" || token.length > 2000) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  try {
    const ok = await crypto.subtle.verify("HMAC", await hmacKey(env), unb64url(sig), te.encode(payload));
    return ok ? JSON.parse(td.decode(unb64url(payload))) : null;
  } catch { return null; }
}

function cors(env, request) {
  const origin = request.headers.get("Origin");
  const allowed = new URL(env.PANEL_URL).origin;
  if (origin !== allowed) return {};
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Max-Age": "600",
    "Vary": "Origin",
  };
}
const json = (data, status, headers) =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers } });
const redirect = (url) => new Response(null, { status: 302, headers: { Location: url, "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });

/* ---------- Lanyard ---------- */
async function currentEpoch(env) {
  const r = await fetch(LANYARD + env.OWNER_ID);
  const j = await r.json();
  if (!j.success) throw new HttpError(502, "lanyard_error", "Couldn't read from Lanyard.");
  return (j.data.kv && j.data.kv[EPOCH_KEY]) || "";
}
async function lanyardWrite(env, method, path, body) {
  if (!env.LANYARD_KEY) throw new HttpError(500, "not_configured", "LANYARD_KEY is missing.");
  const r = await fetch(`${LANYARD}${env.OWNER_ID}/kv${path}`, {
    method,
    headers: Object.assign({ Authorization: env.LANYARD_KEY }, body ? { "Content-Type": "application/json" } : {}),
    body: body ? JSON.stringify(body) : undefined,
  });
  if (r.ok || (method === "DELETE" && r.status === 404)) return;
  if (r.status === 401 || r.status === 403) throw new HttpError(502, "lanyard_key", "Lanyard rejected the API key stored in the worker. Update LANYARD_KEY.");
  throw new HttpError(502, "lanyard_error", `Lanyard returned an error (${r.status}).`);
}

/* ---------- sessions ---------- */
async function requireSession(request, env) {
  const auth = request.headers.get("Authorization") || "";
  const s = await unsign(env, auth.startsWith("Bearer ") ? auth.slice(7) : "");
  if (!s || s.typ !== "session" || s.uid !== env.OWNER_ID || !(s.exp > Date.now())) {
    throw new HttpError(401, "not_logged_in", "Your login has expired. Log in again.");
  }
  if (s.epoch !== (await currentEpoch(env))) throw new HttpError(401, "logged_out", "You were logged out from another device.");
  return s;
}

/* ---------- routes ---------- */
// 1) send the browser to Discord
async function login(url, env) {
  const state = await sign(env, { typ: "state", n: randomId(), t: Date.now(), stay: url.searchParams.get("stay") === "1" });
  const q = new URLSearchParams({
    client_id: env.DISCORD_CLIENT_ID,
    response_type: "code",
    scope: "identify",
    redirect_uri: `${url.origin}/callback`,
    state,
    prompt: "none",   // skip Discord's "Authorize" screen after the first time
  });
  return redirect(`https://discord.com/oauth2/authorize?${q}`);
}

// 2) Discord sends the browser back here with a one-time code
async function callback(url, env) {
  const back = (hash) => redirect(`${env.PANEL_URL}#${hash}`);
  if (url.searchParams.get("error")) return back("login_error=cancelled");
  const state = await unsign(env, url.searchParams.get("state") || "");
  if (!state || state.typ !== "state" || Date.now() - state.t > 10 * 60 * 1000) return back("login_error=expired");
  const code = url.searchParams.get("code");
  if (!code) return back("login_error=failed");

  // swap the code for a Discord token (this needs the client secret, so only the worker can do it)
  const tr = await fetch(`${DISCORD_API}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.DISCORD_CLIENT_ID,
      client_secret: env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: `${url.origin}/callback`,
    }),
  });
  if (!tr.ok) return back("login_error=failed");
  const { access_token } = await tr.json();

  // who logged in?
  const ur = await fetch(`${DISCORD_API}/users/@me`, { headers: { Authorization: `Bearer ${access_token}` } });
  const user = ur.ok ? await ur.json() : null;
  // we only needed the name: hand the Discord token straight back
  await fetch(`${DISCORD_API}/oauth2/token/revoke`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: env.DISCORD_CLIENT_ID, client_secret: env.DISCORD_CLIENT_SECRET, token: access_token }),
  }).catch(() => {});
  if (!user || !user.id) return back("login_error=failed");
  if (user.id !== env.OWNER_ID) return back("login_error=wrong_account");

  const ttl = state.stay ? STAY_DAYS * 864e5 : SESSION_HOURS * 36e5;
  const session = await sign(env, {
    typ: "session", uid: user.id, name: user.global_name || user.username,
    exp: Date.now() + ttl, stay: !!state.stay, epoch: await currentEpoch(env), sid: randomId(),
  });
  return back(`session=${session}`);
}

// 3) save: { set: { site?, bio?, pronouns? }, del: ["bio" | "pronouns" | "panel_lock"] }
async function save(request, env) {
  await requireSession(request, env);
  let body;
  try { body = await request.json(); } catch { throw new HttpError(400, "bad_request", "Couldn't read the request."); }
  const set = {}, del = [];
  for (const [k, v] of Object.entries((body && body.set) || {})) {
    if (!(k in WRITABLE) || typeof v !== "string" || v.length > WRITABLE[k]) throw new HttpError(400, "bad_request", `Can't save "${k}".`);
    set[k] = v;
  }
  for (const k of (body && body.del) || []) {
    if (!DELETABLE.includes(k)) throw new HttpError(400, "bad_request", `Can't delete "${k}".`);
    del.push(k);
  }
  if (Object.keys(set).length) await lanyardWrite(env, "PATCH", "", set);
  for (const k of del) await lanyardWrite(env, "DELETE", `/${k}`);
  return { ok: true };
}

async function logoutEverywhere(request, env) {
  await requireSession(request, env);
  await lanyardWrite(env, "PATCH", "", { [EPOCH_KEY]: randomId() });
  return { ok: true };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const headers = cors(env, request);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    try {
      for (const name of ["DISCORD_CLIENT_ID", "OWNER_ID", "PANEL_URL"]) {
        if (!env[name]) throw new HttpError(500, "not_configured", `${name} is missing.`);
      }
      const route = `${request.method} ${url.pathname}`;
      if (route === "GET /login") return await login(url, env);
      if (route === "GET /callback") return await callback(url, env);
      // API calls must come from the panel's page
      if (request.method === "POST" && request.headers.get("Origin") !== new URL(env.PANEL_URL).origin) {
        throw new HttpError(403, "bad_origin", "Not allowed from this site.");
      }
      if (route === "POST /me") { const s = await requireSession(request, env); return json({ ok: true, name: s.name, exp: s.exp }, 200, headers); }
      if (route === "POST /save") return json(await save(request, env), 200, headers);
      if (route === "POST /logout-all") return json(await logoutEverywhere(request, env), 200, headers);
      if (route === "GET /") return new Response("HAONI panel login server is running.", { headers: { "Content-Type": "text/plain" } });
      throw new HttpError(404, "not_found", "Not found.");
    } catch (err) {
      const status = err.status || 500;
      return json({ ok: false, error: err.code || "error", message: err.status ? err.message : "Something went wrong." }, status, headers);
    }
  },
};
