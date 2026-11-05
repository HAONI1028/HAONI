/* =====================================================================
   Control panel logic (moved out of panel.html so the page can use a
   Content-Security-Policy that only allows scripts from this site).
   ===================================================================== */
(function () {
"use strict";
if (window.top !== window.self) {
  document.body.replaceChildren(Object.assign(document.createElement("p"), {
    textContent: "For your safety, the control panel can't be opened inside another page. Open it directly.",
  }));
  throw new Error("Control panel refused to run inside a frame.");
}
const S = window.SiteSettings;
const $ = (id) => document.getElementById(id);
const el = (tag, props = {}, ...kids) => {
  const n = Object.assign(document.createElement(tag), props);
  kids.flat().forEach(k => k != null && n.append(k));
  return n;
};
const clone = (o) => JSON.parse(JSON.stringify(o));
const fields = $("fields");
// Older versions of the panel kept the Lanyard API key in this browser. It now
// lives only on your login server, so wipe any old copy.
try { localStorage.removeItem("haoni.lanyardKey"); sessionStorage.removeItem("haoni.lanyardKey"); } catch {}

let saved = { settings: S.defaults(), bio: "", pronouns: "" };   // what's live on the site
let draft = clone(saved);                                       // what's in the form
let discord = null;                                             // Discord user from Lanyard
let loaded = false, saving = false;

/* =====================================================================
   LOGIN — with Discord, through your login server (worker/worker.js)
   The server holds the Lanyard API key, checks that the Discord account
   is yours, and only then saves. This page never sees the key; it only
   gets a signed session token that the server can check (and that
   "Log out everywhere" cancels).
   ===================================================================== */
const AUTH = (S.AUTH_SERVER || "").replace(/\/+$/, "");
const te = new TextEncoder(), td = new TextDecoder();
const toB64 = (u8) => btoa(String.fromCharCode(...u8));
const fromB64 = (str) => Uint8Array.from(atob(str), c => c.charCodeAt(0));
let lockStr = "";   // the old password lock, if it's still on Lanyard (removed after you log in)

function tokenInfo(token) {   // what's inside the server's token (name, expiry); the server does the real checking
  try { return JSON.parse(td.decode(fromB64(token.split(".")[0].replace(/-/g, "+").replace(/_/g, "/")))); } catch { return {}; }
}

/* =====================================================================
   SESSION
   The session token lives in memory. To survive a reload (or with "Stay
   logged in"), an ENCRYPTED copy goes in browser storage; the key that
   unlocks it is a non-exportable browser key in IndexedDB, so what
   F12 → Application shows is useless if copied anywhere else. Logging
   out wipes both. Idle sessions lock after 30 minutes.
   ===================================================================== */
const SESSION_NAME = "haoni.panelSession", IDLE_LIMIT = 30 * 60 * 1000;
let memToken = "", stayLoggedIn = false, lastActive = Date.now();

function idbOpen() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("haoni-panel", 1);
    req.onupgradeneeded = () => req.result.createObjectStore("keys");
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function idb(mode, run) {
  const db = await idbOpen();
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction("keys", mode), req = run(tx.objectStore("keys"));
      tx.oncomplete = () => resolve(req && req.result);
      tx.onerror = tx.onabort = () => reject(tx.error);
    });
  } finally { db.close(); }
}
async function deviceKey(create) {
  let k = await idb("readonly", st => st.get("device"));
  if (!k && create) {
    k = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
    await idb("readwrite", st => st.put(k, "device"));
  }
  return k;
}
async function startSession(token, remember) {
  memToken = token; stayLoggedIn = remember; lastActive = Date.now();
  try {
    const dk = await deviceKey(true);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, dk, te.encode(token)));
    const sealed = JSON.stringify({ iv: toB64(iv), ct: toB64(ct) });
    (remember ? localStorage : sessionStorage).setItem(SESSION_NAME, sealed);
    (remember ? sessionStorage : localStorage).removeItem(SESSION_NAME);
  } catch {}   // storage blocked: stay logged in for this page only
}
async function resumeSession() {
  try {
    const tab = sessionStorage.getItem(SESSION_NAME), kept = localStorage.getItem(SESSION_NAME);
    if (!tab && !kept) return false;
    const dk = await deviceKey(false);
    const sealed = JSON.parse(tab || kept);
    const token = td.decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: fromB64(sealed.iv) }, dk, fromB64(sealed.ct)));
    if (!(tokenInfo(token).exp > Date.now())) throw new Error("expired");
    memToken = token;
    stayLoggedIn = !tab;
    lastActive = Date.now();
    return true;
  } catch {
    await endSession();
    return false;
  }
}
async function endSession() {
  memToken = ""; stayLoggedIn = false;
  try { localStorage.removeItem(SESSION_NAME); sessionStorage.removeItem(SESSION_NAME); } catch {}
  try { await idb("readwrite", st => st.delete("device")); } catch {}
}
for (const ev of ["pointerdown", "keydown", "wheel", "touchstart"]) {
  addEventListener(ev, () => { lastActive = Date.now(); }, { passive: true });
}
setInterval(async () => {
  if (memToken && !stayLoggedIn && Date.now() - lastActive > IDLE_LIMIT) {
    await endSession();
    showGate("login");
    toast("Logged out after 30 minutes without activity. Your unsaved changes are still here.");
  }
}, 30000);

/* ---------- talking to the login server ---------- */
async function api(path, body) {
  let r;
  try {
    r = await fetch(AUTH + path, {
      method: "POST",
      headers: { Authorization: `Bearer ${memToken}`, "Content-Type": "application/json" },
      body: JSON.stringify(body || {}),
    });
  } catch {
    throw new Error("Couldn't reach your login server. Check your internet connection and try again.");
  }
  let j = {};
  try { j = await r.json(); } catch {}
  if (r.status === 401) {
    await endSession();
    showGate("login", j.message || "Your login has expired. Log in again.");
    throw Object.assign(new Error(j.message || "You've been logged out."), { loggedOut: true });
  }
  if (!r.ok || !j.ok) throw new Error(j.message || `Your login server returned an error (${r.status}).`);
  return j;
}
// still logged in? (checked every minute, when this tab comes back, and before saving)
async function checkSession() {
  if (!memToken || !loaded) return true;
  try { await api("/me"); return true; } catch (e) { return !e.loggedOut; }
}
setInterval(checkSession, 60000);
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") checkSession(); });

/* ---------- login screen ---------- */
function showGate(mode, message) {   // "loading" | "login" | "notset" | "error"
  document.body.classList.add("locked");
  $("gate").hidden = false;
  $("login-box").hidden = mode !== "login";
  $("notset-box").hidden = mode !== "notset";
  $("gate-error").hidden = mode !== "error";
  $("gate-sub").textContent = {
    loading: "Loading…",
    login: "Log in with Discord to edit your site.",
    notset: "Discord login isn't set up yet.",
    error: "Something went wrong.",
  }[mode];
  if (mode === "error") $("gate-error-text").textContent = message;
  $("login-error").hidden = !(mode === "login" && message);
  if (mode === "login" && message) $("login-error").textContent = message;
  if (mode === "login") setTimeout(() => $("discord-login").focus(), 0);
}
function hideGate() {
  document.body.classList.remove("locked");
  $("gate").hidden = true;
}
$("discord-login").prepend(S.discordIcon());
$("discord-login").addEventListener("click", () => {
  location.href = `${AUTH}/login${$("login-stay").checked ? "?stay=1" : ""}`;
});
$("gate-retry").addEventListener("click", () => load());

// coming back from Discord: the server puts the result after "#" in the address
let loginResult = "";
async function takeLoginFromAddress() {
  const h = new URLSearchParams(location.hash.slice(1));
  if (!h.has("session") && !h.has("login_error")) return;
  history.replaceState(null, "", location.pathname + location.search);   // don't leave it in the address bar
  if (h.get("login_error")) { loginResult = h.get("login_error"); return; }
  const token = h.get("session");
  await startSession(token, !!tokenInfo(token).stay);
  loginResult = "ok";
}
function loginErrorText(code) {
  const who = discord ? `@${discord.username}` : "the site owner";
  return {
    wrong_account: `That Discord account can't edit this site. Log in as ${who}.`,
    cancelled: "Discord login was cancelled.",
    expired: "That login took too long. Try again.",
    failed: "Discord login didn't work. Try again.",
  }[code] || "";
}

$("logout-btn").addEventListener("click", async () => {
  if (isDirty() && !confirm("You have unsaved changes. Log out anyway?")) return;
  await endSession();
  showGate("login");
});
$("logout-all-btn").addEventListener("click", async () => {
  if (!confirm("Log out of the control panel on every device, including this one?")) return;
  if (isDirty() && !confirm("You have unsaved changes. Log out anyway?")) return;
  const btn = $("logout-all-btn");
  btn.disabled = true;
  try {
    await api("/logout-all");
    await endSession();
    showGate("login");
    toast("Logged out on every device.");
  } catch (err) {
    if (!err.loggedOut) toast(err.message, "error");
  } finally {
    btn.disabled = false;
  }
});

/* =====================================================================
   BUILD THE FORM
   ===================================================================== */
function radio(key, value, labelText) {
  const input = el("input", { type: "radio", name: "opt-" + key, value });
  input.dataset.key = key;
  return el("label", { className: "opt" }, input, el("span", { textContent: labelText }));
}
document.querySelectorAll("[data-options]").forEach(box => {
  box.setAttribute("role", "radiogroup");
  box.replaceChildren(...S[box.dataset.options].map(o => radio(box.dataset.key, o.id, o.label)));
});

// font cards (each sample is drawn in its own font)
document.head.append(el("link", { rel: "stylesheet", href: S.fontURL(S.FONTS.map(f => f.id)) }));
$("font-grid").replaceChildren(...S.FONTS.map(f => {
  const input = el("input", { type: "radio", name: "opt-nameFont", value: f.id });
  input.dataset.key = "nameFont";
  const sample = el("span", { className: "sample" });
  sample.style.fontFamily = S.fontFamily(f.id);
  return el("label", { className: "font-opt" }, input,
    el("span", { className: "font-card" }, sample, el("span", { className: "fname", textContent: f.id })));
}));

// show / hide switches
$("show-grid").replaceChildren(...S.SHOW.map(([k, label]) => {
  const input = el("input", { type: "checkbox" });
  input.dataset.show = k;
  const track = el("span", { className: "track" });
  track.setAttribute("aria-hidden", "true");
  return el("label", { className: "switch" }, input, track, el("span", { textContent: label }));
}));

// time zones
let zones = [];
try { zones = Intl.supportedValuesOf("timeZone"); } catch {}
if (!zones.length) zones = ["America/Vancouver", "America/Los_Angeles", "America/Denver", "America/Chicago", "America/Toronto", "America/New_York", "Europe/London", "Europe/Paris", "Asia/Shanghai", "Asia/Tokyo", "Australia/Sydney"];
$("tz-list").replaceChildren(...zones.map(z => el("option", { value: z })));

/* ---------- links editor ---------- */
function iconButton(text, label, onClick, extra = "") {
  const b = el("button", { type: "button", className: "icon-btn " + extra, textContent: text, title: label });
  b.setAttribute("aria-label", label);
  b.addEventListener("click", onClick);
  return b;
}
function renderLinkRows() {
  const links = draft.settings.links;
  $("link-list").replaceChildren(...links.map((l, i) => {
    const label = el("input", { type: "text", className: "l-label", value: l.label || "", maxLength: S.LIMITS.linkLabel, autocomplete: "off" });
    label.setAttribute("aria-label", `Link ${i + 1} label`);
    const url = el("input", { type: "text", className: "l-url", value: l.url || "", placeholder: "youtube.com/@you", spellcheck: false, autocomplete: "off", inputMode: "url" });
    url.setAttribute("aria-label", `Link ${i + 1} address`);
    const up = iconButton("↑", "Move up", () => moveLink(i, -1));
    const down = iconButton("↓", "Move down", () => moveLink(i, 1));
    const del = iconButton("✕", "Remove link", () => removeLink(i), "del");
    up.disabled = i === 0;
    down.disabled = i === links.length - 1;
    const row = el("div", { className: "link-row" },
      el("span", { className: "l-ico" }),
      el("div", { className: "l-inputs" }, label, url),
      el("div", { className: "l-actions" }, up, down, del),
      el("p", { className: "hint error l-err", textContent: "That doesn't look like a link.", hidden: true }));
    updateRowIcon(row);
    return row;
  }));
  $("links-empty").hidden = links.length > 0;
  $("add-link").disabled = links.length >= S.LIMITS.links;
}
function updateRowIcon(row) {
  const raw = row.querySelector(".l-url").value;
  const url = S.safeUrl(S.normalizeUrl(raw), ["http:", "https:", "mailto:"]);
  const info = S.linkInfo(url);
  const ico = row.querySelector(".l-ico");
  ico.replaceChildren(S.iconSVG(info));
  ico.title = url ? info.name : "";
  const bad = !!raw.trim() && !url;
  row.classList.toggle("invalid", bad);
  row.querySelector(".l-err").hidden = !bad;
  row.querySelector(".l-label").placeholder = url ? info.name : "Label (optional)";
}
function readLinkRows() {
  const rows = [...$("link-list").children];
  draft.settings.links = rows.map(r => ({ label: r.querySelector(".l-label").value, url: r.querySelector(".l-url").value }));
  rows.forEach(updateRowIcon);
}
function moveLink(i, d) {
  const L = draft.settings.links, j = i + d;
  if (j < 0 || j >= L.length) return;
  [L[i], L[j]] = [L[j], L[i]];
  renderLinkRows();
  $("link-list").children[j].querySelector(d < 0 ? ".icon-btn" : ".icon-btn:nth-child(2)").focus();
  changed();
}
function removeLink(i) {
  draft.settings.links.splice(i, 1);
  renderLinkRows();
  changed();
}
$("add-link").addEventListener("click", () => {
  if (draft.settings.links.length >= S.LIMITS.links) return;
  draft.settings.links.push({ label: "", url: "" });
  renderLinkRows();
  $("link-list").lastElementChild.querySelector(".l-url").focus();
  changed();
});

/* ---------- fill / read ---------- */
function fillForm() {
  const s = draft.settings;
  fields.querySelectorAll("[data-key]").forEach(i => {
    const v = s[i.dataset.key];
    if (i.type === "radio") i.checked = i.value === v;
    else if (i.type === "checkbox") i.checked = !!v;
    else i.value = v == null ? "" : v;
  });
  fields.querySelectorAll("[data-show]").forEach(i => { i.checked = s.show[i.dataset.show] !== false; });
  fields.querySelectorAll("[data-kv]").forEach(i => { i.value = draft[i.dataset.kv] || ""; });
  renderLinkRows();
  refreshUI();
}

fields.addEventListener("input", (e) => {
  const t = e.target;
  if (t.closest(".link-row")) readLinkRows();
  else if (t.dataset.key) {
    if (t.type === "radio") { if (!t.checked) return; draft.settings[t.dataset.key] = t.value; }
    else if (t.type === "checkbox") draft.settings[t.dataset.key] = t.checked;
    else draft.settings[t.dataset.key] = t.value;
  }
  else if (t.dataset.show) draft.settings.show[t.dataset.show] = t.checked;
  else if (t.dataset.kv) draft[t.dataset.kv] = t.value;
  else return;
  changed();
});
// tidy links when leaving a field (adds https:// etc.)
fields.addEventListener("focusout", (e) => {
  const t = e.target;
  if (t.classList && t.classList.contains("l-url") && t.value.trim()) {
    const url = S.safeUrl(S.normalizeUrl(t.value), ["http:", "https:", "mailto:"]);
    if (url && url !== t.value) { t.value = url; readLinkRows(); changed(); }
  }
  if (t.id === "f-backgroundImage" && t.value.trim()) {
    const url = S.safeUrl(S.normalizeUrl(t.value));
    if (url && url !== t.value) { t.value = url; draft.settings.backgroundImage = url; changed(); }
  }
});

function refreshUI() {
  const s = draft.settings;
  const eff = S.NAME_EFFECTS.find(x => x.id === s.nameEffect) || {};
  $("name-colors-field").hidden = !!eff.noColor;
  $("custom-name-colors").hidden = s.nameColors !== "custom";
  $("color2-wrap").hidden = !(eff.two || s.nameEffect === "discord");
  $("accent-wrap").hidden = s.accentSource !== "custom";
  $("bg-image-field").hidden = s.background !== "image";
  $("bg-error").hidden = !s.backgroundImage.trim() || !!S.safeUrl(S.normalizeUrl(s.backgroundImage));
  $("tz-error").hidden = !s.timezone || S.validTimezone(s.timezone);
  document.querySelectorAll("[data-hex]").forEach(h => { h.textContent = s[h.dataset.hex]; });
  document.querySelectorAll("[data-count-for]").forEach(c => {
    const t = $(c.dataset.countFor);
    c.textContent = `${t.value.length} / ${t.maxLength}`;
    c.classList.toggle("full", t.value.length >= t.maxLength);
  });
  const sampleName = s.displayName.trim() || (discord && (discord.global_name || discord.username)) || "HAONI";
  document.querySelectorAll("#font-grid .sample").forEach(x => { x.textContent = sampleName; });
}

/* =====================================================================
   DIRTY STATE, PREVIEW, SAVE
   ===================================================================== */
const normalized = (d) => JSON.stringify({ s: S.sanitize(d.settings), b: (d.bio || "").trim(), p: (d.pronouns || "").trim() });
const isDirty = () => loaded && normalized(draft) !== normalized(saved);

function setState(s, text) {
  $("state").dataset.s = s;
  $("state-text").textContent = text;
}
function updateDirty() {
  if (!loaded || saving) return;
  const dirty = isDirty();
  $("save-btn").disabled = !dirty;
  if (dirty) setState("dirty", "Unsaved changes");
  else if ($("state").dataset.s !== "saved") setState("clean", "All changes saved");
}
function changed() {
  refreshUI();
  updateDirty();
  sendPreview();
}

// live preview iframe
const frame = $("preview");
let frameReady = false, previewTimer = 0;
addEventListener("message", (e) => {
  if (e.source !== frame.contentWindow) return;   // only our own (sandboxed) preview frame
  if (e.data && e.data.type === "haoni:ready") { frameReady = true; sendPreview(true); }
});
// in case the preview finished loading before this script ran
frame.addEventListener("load", () => { frameReady = true; sendPreview(true); });
try {
  if (frame.contentDocument && frame.contentDocument.readyState === "complete" && /preview/.test(frame.contentWindow.location.search)) frameReady = true;
} catch {}
function sendPreview(now) {
  clearTimeout(previewTimer);
  previewTimer = setTimeout(() => {
    if (!frameReady || !frame.contentWindow) return;
    frame.contentWindow.postMessage({
      type: "haoni:preview",
      settings: S.sanitize(draft.settings),
      bio: draft.bio,
      pronouns: draft.pronouns,
    }, "*");   // the sandboxed preview has no origin to name; it only gets design settings, never the key
  }, now ? 0 : 60);
}

async function save() {
  if (memToken && !(await checkSession())) return;
  if (!loaded || saving || !isDirty()) return;
  if (!memToken) { showGate("login"); return; }
  const settings = S.sanitize(draft.settings);
  const site = JSON.stringify(settings);
  const bio = draft.bio.trim().slice(0, S.LIMITS.bio);
  const pronouns = draft.pronouns.trim().slice(0, S.LIMITS.pronouns);
  if (site.length > S.KV_MAX) { toast("Settings are too big to save. Try shortening the custom CSS.", "error"); return; }

  saving = true;
  $("save-btn").disabled = true;
  setState("saving", "Saving…");
  try {
    const set = { site }, del = [];
    if (bio) set.bio = bio; else if (saved.bio) del.push("bio");               // empty: remove it
    if (pronouns) set.pronouns = pronouns; else if (saved.pronouns) del.push("pronouns");
    await api("/save", { set, del });
    saved = { settings, bio, pronouns };
    draft = clone(saved);
    saving = false;
    fillForm();
    sendPreview(true);
    setState("saved", "Saved · live now");
    $("save-btn").disabled = true;
    toast("Saved! Your site has updated for everyone.");
  } catch (err) {
    saving = false;
    setState("error", "Couldn't save");
    $("save-btn").disabled = false;
    toast(err.loggedOut ? "You're logged out, so nothing was saved. Log in and press Save again." : err.message, "error");
  }
}
$("save-btn").addEventListener("click", save);
addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") { e.preventDefault(); save(); }
});
addEventListener("beforeunload", (e) => { if (isDirty()) { e.preventDefault(); e.returnValue = ""; } });

/* =====================================================================
   LOAD CURRENT SETTINGS
   ===================================================================== */
async function load() {
  const notice = $("load-notice");
  notice.className = "notice";
  notice.textContent = "Loading your current settings from Lanyard…";
  notice.hidden = false;
  setState("loading", "Loading…");
  await takeLoginFromAddress();
  const resumed = memToken ? Promise.resolve(true) : resumeSession();   // unlock a saved session while the data loads
  try {
    const r = await fetch(`${S.LANYARD_API}/users/${S.DISCORD_ID}`);
    const j = await r.json();
    if (!j.success) {
      const code = j.error && j.error.code;
      throw new Error(code === "user_not_monitored"
        ? "Lanyard isn't tracking your account yet. Join the Lanyard Discord server (discord.gg/lanyard), then try again."
        : (j.error && j.error.message) || "Lanyard returned an error.");
    }
    discord = j.data.discord_user;
    const kv = j.data.kv || {};
    lockStr = kv.panel_lock || "";
    await resumed;
    if (!AUTH) showGate("notset");
    else if (memToken) {
      hideGate();
      if (loginResult === "ok") toast("Logged in with Discord.");
      // the old password lock still holds an encrypted copy of the API key: remove it
      if (lockStr) api("/save", { set: {}, del: ["panel_lock"] }).then(() => { lockStr = ""; }).catch(() => {});
    }
    else showGate("login", loginErrorText(loginResult));
    saved = { settings: S.sanitize(kv.site), bio: kv.bio || "", pronouns: kv.pronouns || "" };
    draft = clone(saved);
    loaded = true;
    fields.disabled = false;
    notice.hidden = true;
    showIdentity();
    fillForm();
    setState("clean", "All changes saved");
    sendPreview(true);
  } catch (err) {
    const msg = err instanceof TypeError ? "Couldn't reach Lanyard. Check your internet connection." : err.message;
    notice.className = "notice error";
    notice.textContent = msg;
    showGate("error", msg);
    setState("error", "Not loaded");
  }
}
function showIdentity() {
  if (!discord) return;
  const name = discord.global_name || discord.display_name || discord.username;
  $("me-name").textContent = `${name} · @${discord.username}`;
  if (discord.avatar) {
    const url = `https://cdn.discordapp.com/avatars/${discord.id}/${discord.avatar}.png?size=64`;
    $("me-avatar").src = url;
    $("gate-avatar").src = url.replace("size=64", "size=96");
    $("favicon").href = url;
  }
  $("f-displayName").placeholder = name;
  $("f-username").placeholder = discord.username;
  $("f-tabTitle").placeholder = name;
}

/* =====================================================================
   EXPORT / IMPORT / RESET
   ===================================================================== */
$("export-btn").addEventListener("click", () => {
  const data = { settings: S.sanitize(draft.settings), bio: draft.bio, pronouns: draft.pronouns };
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
  const a = el("a", { href: url, download: "haoni-site-settings.json" });
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
$("import-btn").addEventListener("click", () => $("import-file").click());
$("import-file").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  e.target.value = "";
  if (!file) return;
  try {
    if (file.size > 200000) throw new Error("too big");
    const data = JSON.parse(await file.text());
    if (!data || typeof data !== "object") throw new Error("not an object");
    draft.settings = S.sanitize(data.settings || data);
    if (typeof data.bio === "string") draft.bio = data.bio.slice(0, S.LIMITS.bio);
    if (typeof data.pronouns === "string") draft.pronouns = data.pronouns.slice(0, S.LIMITS.pronouns);
    fillForm();
    changed();
    toast("Imported. Press Save to publish it.");
  } catch {
    toast("That file isn't a settings export.", "error");
  }
});
$("reset-btn").addEventListener("click", () => {
  if (!confirm("Reset the whole design to default? Your About Me and pronouns are kept. Nothing changes on your site until you press Save.")) return;
  draft.settings = S.defaults();
  fillForm();
  changed();
  toast("Design reset. Press Save to publish it.");
});

/* =====================================================================
   VIEW SWITCHING (phone layout) + PREVIEW SIZE
   ===================================================================== */
function showView(v) {
  $("layout").dataset.view = v;
  $("view-edit").setAttribute("aria-selected", v === "edit");
  $("view-preview").setAttribute("aria-selected", v === "preview");
}
$("view-edit").addEventListener("click", () => showView("edit"));
$("view-preview").addEventListener("click", () => showView("preview"));
$("device-seg").addEventListener("change", (e) => { $("stage").dataset.device = e.target.value; });

/* =====================================================================
   ABOUT ME: Discord formatting toolbar, shortcuts, help, timestamps
   ===================================================================== */
const MD = window.DiscordMarkdown;
const bioBox = $("f-bio");

// Replace part of the About Me text (keeps Ctrl+Z working where the browser allows).
function replaceRange(start, end, text, selStart, selEnd) {
  bioBox.focus();
  bioBox.setSelectionRange(start, end);
  let ok = false;
  try { ok = document.execCommand("insertText", false, text); } catch {}
  if (!ok) {
    bioBox.setRangeText(text, start, end, "end");
    bioBox.dispatchEvent(new Event("input", { bubbles: true }));
  }
  if (selStart != null) bioBox.setSelectionRange(selStart, selEnd);
}
function wrapSelection(before, after = before, placeholder = "text") {
  const s = bioBox.selectionStart, e = bioBox.selectionEnd, v = bioBox.value;
  if (s >= before.length && v.slice(s - before.length, s) === before && v.slice(e, e + after.length) === after) {
    // already formatted: take the markers off again
    replaceRange(s - before.length, e + after.length, v.slice(s, e), s - before.length, e - before.length);
    return;
  }
  const sel = v.slice(s, e) || placeholder;
  replaceRange(s, e, before + sel + after, s + before.length, s + before.length + sel.length);
}
function prefixLines(prefix) {
  const v = bioBox.value;
  const start = v.lastIndexOf("\n", bioBox.selectionStart - 1) + 1;
  let end = v.indexOf("\n", bioBox.selectionEnd);
  if (end < 0) end = v.length;
  const lines = v.slice(start, end).split("\n");
  const all = lines.every(l => l.startsWith(prefix));
  const next = lines.map(l => (all ? l.slice(prefix.length) : prefix + l)).join("\n");
  replaceRange(start, end, next, start, start + next.length);
}
const MD_ACTIONS = {
  bold: () => wrapSelection("**"),
  italic: () => wrapSelection("*"),
  underline: () => wrapSelection("__"),
  strike: () => wrapSelection("~~"),
  spoiler: () => wrapSelection("||", "||", "secret"),
  code: () => {
    const multi = bioBox.value.slice(bioBox.selectionStart, bioBox.selectionEnd).includes("\n");
    multi ? wrapSelection("```\n", "\n```", "code") : wrapSelection("`", "`", "code");
  },
  link: () => {
    const s = bioBox.selectionStart, e = bioBox.selectionEnd;
    const label = bioBox.value.slice(s, e) || "link text";
    const at = s + label.length + 3;           // select "https://" so you can paste over it
    replaceRange(s, e, `[${label}](https://)`, at, at + 8);
  },
  heading: () => prefixLines("# "),
  quote: () => prefixLines("> "),
  list: () => prefixLines("- "),
  subtext: () => prefixLines("-# "),
};
$("md-toolbar").addEventListener("mousedown", (e) => { if (e.target.closest("[data-md]")) e.preventDefault(); }); // keep the text selected
$("md-toolbar").addEventListener("click", (e) => {
  const b = e.target.closest("[data-md]");
  if (b) MD_ACTIONS[b.dataset.md]();
});
bioBox.addEventListener("keydown", (e) => {
  if (!(e.ctrlKey || e.metaKey) || e.altKey || e.shiftKey) return;
  const action = { b: "bold", i: "italic", u: "underline" }[e.key.toLowerCase()];
  if (action) { e.preventDefault(); MD_ACTIONS[action](); }
});

// formatting help, drawn with the same formatter as the site
const HELP = [
  "**bold**", "*italic*", "__underline__", "~~strikethrough~~", "||spoiler||", "`code`",
  "```\ncode block\n```", "> quote", "# Big heading", "## Medium heading", "### Small heading",
  "-# small grey text", "- list item\n  - indented item", "1. numbered list",
  "[masked link](https://discord.com)", "<t:1798761600:R>", "\\*not italic\\*",
];
if (MD) {
  $("md-help").replaceChildren(
    el("span", { className: "h", textContent: "You type" }),
    el("span", { className: "h", textContent: "You get" }),
    ...HELP.flatMap(src => [el("code", { className: "src", textContent: src }), el("div", { className: "out md" }, MD.render(src))]));
  $("md-help").addEventListener("click", (e) => {
    const sp = e.target.closest(".md-spoiler:not(.shown)");
    if (sp) { e.preventDefault(); sp.classList.add("shown"); }
  });
}

// timestamp maker: <t:UNIX:STYLE>
const TS_STYLES = [["R", "Relative"], ["t", "Short time"], ["T", "Long time"], ["d", "Short date"], ["D", "Long date"], ["f", "Date & time"], ["F", "Full date & time"]];
{
  const pad = (n) => String(n).padStart(2, "0");
  const d = new Date(Date.now() + 86400000);
  $("ts-date").value = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:00`;
}
function tsOptions() {
  const ms = new Date($("ts-date").value).getTime(), ok = Number.isFinite(ms) && !!MD;
  const keep = $("ts-style").value || "R";
  $("ts-style").replaceChildren(...TS_STYLES.map(([k, name]) =>
    el("option", { value: k, textContent: ok ? `${name}: ${MD.formatTimestamp(ms, k)}` : name })));
  $("ts-style").value = keep;
  $("ts-insert").disabled = !ok;
}
$("ts-date").addEventListener("input", tsOptions);
tsOptions();
$("ts-insert").addEventListener("click", () => {
  const ms = new Date($("ts-date").value).getTime();
  if (!Number.isFinite(ms)) return;
  const code = `<t:${Math.floor(ms / 1000)}:${$("ts-style").value}>`;
  const s = bioBox.selectionStart, e = bioBox.selectionEnd;
  replaceRange(s, e, code, s + code.length, s + code.length);
});

/* ---------- toast ---------- */
let toastTimer = 0;
function toast(msg, kind = "ok") {
  const t = $("toast");
  t.textContent = msg;
  t.dataset.kind = kind;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, kind === "error" ? 7000 : 3500);
}

/* ---------- go ---------- */
showGate("loading");
fillForm();
load();
})();
