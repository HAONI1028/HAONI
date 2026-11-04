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
// The old (password-less) panel saved the plain API key under this name with
// "remember" on by default. Remove it so it can't skip the login; keep it in
// memory only, to fill in the one-time password setup.
let legacyKey = "";
try {
  legacyKey = localStorage.getItem("haoni.lanyardKey") || sessionStorage.getItem("haoni.lanyardKey") || "";
  localStorage.removeItem("haoni.lanyardKey");
  sessionStorage.removeItem("haoni.lanyardKey");
} catch {}

let saved = { settings: S.defaults(), bio: "", pronouns: "" };   // what's live on the site
let draft = clone(saved);                                       // what's in the form
let discord = null;                                             // Discord user from Lanyard
let loaded = false, saving = false;

/* =====================================================================
   LOGIN
   Your Lanyard API key is encrypted with your password (PBKDF2-SHA256,
   600k rounds -> AES-256-GCM) and stored on Lanyard as KV "panel_lock".
   Logging in downloads that and unlocks it: a wrong password can't
   decrypt it, and without the key nothing can be saved.
   ===================================================================== */
const LOCK_KEY = "panel_lock", PBKDF2_ITER = 600000, MIN_PW = 12;
let lockStr = "";
const te = new TextEncoder(), td = new TextDecoder();
const toB64 = (u8) => btoa(String.fromCharCode(...u8));
const fromB64 = (str) => Uint8Array.from(atob(str), c => c.charCodeAt(0));

async function deriveAes(password, salt, iterations) {
  const base = await crypto.subtle.importKey("raw", te.encode(password), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey({ name: "PBKDF2", salt, iterations, hash: "SHA-256" }, base,
    { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
}
async function makeLock(apiKey, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const aes = await deriveAes(password, salt, PBKDF2_ITER);
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, aes, te.encode(apiKey)));
  return JSON.stringify({ v: 1, kdf: "PBKDF2-SHA256", iter: PBKDF2_ITER, salt: toB64(salt), iv: toB64(iv), ct: toB64(ct) });
}
async function openLock(lock, password) {
  const L = JSON.parse(lock);
  if (!L || L.v !== 1 || !L.salt || !L.iv || !L.ct) throw new Error("bad lock");
  const iter = Math.min(5000000, Math.max(100000, Number(L.iter) || PBKDF2_ITER));
  const aes = await deriveAes(password, fromB64(L.salt), iter);
  return td.decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: fromB64(L.iv) }, aes, fromB64(L.ct)));
}

/* =====================================================================
   SESSION
   After you log in, the API key lives in memory. To survive a reload (or
   with "Stay logged in"), an ENCRYPTED copy goes in browser storage. The
   key that unlocks it is a non-exportable browser key kept in IndexedDB,
   so what F12 → Application shows is useless if copied anywhere else.
   Logging out wipes both. Idle sessions lock after 30 minutes.
   ===================================================================== */
const SESSION_NAME = "haoni.panelSession", IDLE_LIMIT = 30 * 60 * 1000;
// "Log out everywhere" changes this value on Lanyard (KV "panel_epoch"). Every
// session remembers the value it started under; when they differ, it logs out.
const EPOCH_KEY = "panel_epoch";
let epoch = "";
const newEpoch = () => toB64(crypto.getRandomValues(new Uint8Array(12)));
let memKey = "", stayLoggedIn = false, lastActive = Date.now();
const getKey = () => memKey;

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
async function startSession(key, remember) {
  memKey = key; stayLoggedIn = remember; lastActive = Date.now();
  try {
    const dk = await deviceKey(true);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, dk, te.encode(key)));
    const sealed = JSON.stringify({ iv: toB64(iv), ct: toB64(ct), epoch });
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
    memKey = td.decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: fromB64(sealed.iv) }, dk, fromB64(sealed.ct)));
    stayLoggedIn = !tab;
    lastActive = Date.now();
    return sealed.epoch || "";
  } catch {
    memKey = "";
    return false;
  }
}
async function endSession() {
  memKey = ""; stayLoggedIn = false;
  try { localStorage.removeItem(SESSION_NAME); sessionStorage.removeItem(SESSION_NAME); } catch {}
  try { await idb("readwrite", st => st.delete("device")); } catch {}
}
for (const ev of ["pointerdown", "keydown", "wheel", "touchstart"]) {
  addEventListener(ev, () => { lastActive = Date.now(); }, { passive: true });
}
setInterval(async () => {
  if (memKey && !stayLoggedIn && Date.now() - lastActive > IDLE_LIMIT) {
    await endSession();
    showGate(lockStr ? "login" : "setup");
    toast("Logged out after 30 minutes without activity. Your unsaved changes are still here.");
  }
}, 30000);

function showGate(mode, message) {   // "loading" | "login" | "setup" | "reset" | "error"
  document.body.classList.add("locked");
  $("gate").hidden = false;
  $("login-form").hidden = mode !== "login";
  $("setup-form").hidden = !(mode === "setup" || mode === "reset");
  $("gate-error").hidden = mode !== "error";
  $("to-login").hidden = mode !== "reset";
  $("setup-btn").textContent = mode === "reset" ? "Reset password" : "Create password";
  $("gate-sub").textContent = {
    loading: "Loading…",
    login: "Enter your password to edit your site.",
    setup: "Set a password to protect your panel.",
    reset: "Reset your password with a fresh API key.",
    error: "Something went wrong.",
  }[mode];
  if (mode === "error") $("gate-error-text").textContent = message;
  ["login-error", "setup-error"].forEach(id => { $(id).hidden = true; });
  const first = { login: "login-pw", setup: legacyKey ? "setup-pw" : "setup-key", reset: "setup-key" }[mode];
  if (mode === "setup" && legacyKey) $("setup-key").value = legacyKey;   // key saved by the old panel
  if (first) setTimeout(() => $(first).focus(), 0);
}
function hideGate() {
  document.body.classList.remove("locked");
  $("gate").hidden = true;
}
function formError(id, msg) { $(id).textContent = msg; $(id).hidden = false; }
const WEAK = /password|passwort|qwerty|asdf|zxcv|letmein|welcome|iloveyou|admin|login|123456|abcdef|haoni|discord|lanyard|roblox/;
function checkNewPassword(pw, pw2) {
  if (pw.length < MIN_PW) return `Use at least ${MIN_PW} characters.`;
  if (WEAK.test(pw.toLowerCase()) || new Set(pw.toLowerCase()).size < 6) {
    return "That password is too easy to guess. Try a few random words, like purple-taco-rocket-lamp.";
  }
  if (pw !== pw2) return "The two passwords don't match.";
  return "";
}

let fails = 0, waitUntil = 0;
$("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = $("login-btn"), pw = $("login-pw");
  if (Date.now() < waitUntil) return;
  btn.disabled = true; btn.textContent = "Checking…";
  try {
    const key = await openLock(lockStr, pw.value);
    await startSession(key, $("login-stay").checked);
    pw.value = ""; fails = 0;
    hideGate();
    toast("Logged in.");
  } catch {
    fails++;
    const wait = fails >= 3 ? Math.min(30, 2 ** (fails - 2)) : 0;   // slow down guessing
    waitUntil = Date.now() + wait * 1000;
    formError("login-error", "Wrong password." + (wait ? ` Try again in ${wait}s.` : ""));
    pw.select();
    await new Promise(r => setTimeout(r, wait * 1000));
  } finally {
    btn.disabled = false; btn.textContent = "Log in";
  }
});

$("setup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const key = $("setup-key").value.trim(), pw = $("setup-pw").value, btn = $("setup-btn"), label = btn.textContent;
  if (!key || /\s/.test(key)) return formError("setup-error", "Paste the API key the Lanyard bot sent you.");
  const bad = checkNewPassword(pw, $("setup-pw2").value);
  if (bad) return formError("setup-error", bad);
  btn.disabled = true; btn.textContent = "Setting up…";
  try {
    const lock = await makeLock(key, pw), fresh = newEpoch();
    await lanyard("PATCH", "/kv", JSON.stringify({ [LOCK_KEY]: lock, [EPOCH_KEY]: fresh }), key);   // Lanyard checks the key here
    lockStr = lock;
    epoch = fresh;
    legacyKey = "";
    await startSession(key, $("setup-stay").checked);
    ["setup-key", "setup-pw", "setup-pw2"].forEach(id => { $(id).value = ""; });
    hideGate();
    toast("Password set. You're logged in.");
  } catch (err) {
    formError("setup-error", err.message);
  } finally {
    btn.disabled = false; btn.textContent = label;
  }
});
// clear an old error message as soon as you start typing again
for (const [form, err] of [["login-form", "login-error"], ["setup-form", "setup-error"], ["chpw-form", "chpw-error"]]) {
  $(form).addEventListener("input", () => { $(err).hidden = true; });
}
$("to-reset").addEventListener("click", () => showGate("reset"));
$("to-login").addEventListener("click", () => showGate("login"));
$("gate-retry").addEventListener("click", () => load());

$("logout-btn").addEventListener("click", async () => {
  if (isDirty() && !confirm("You have unsaved changes. Log out anyway?")) return;
  await endSession();
  showGate(lockStr ? "login" : "setup");
});
$("logout-all-btn").addEventListener("click", async () => {
  if (!confirm("Log out of the control panel on every device, including this one?")) return;
  if (isDirty() && !confirm("You have unsaved changes. Log out anyway?")) return;
  const btn = $("logout-all-btn");
  btn.disabled = true;
  try {
    const fresh = newEpoch();
    await lanyard("PATCH", "/kv", JSON.stringify({ [EPOCH_KEY]: fresh }));
    epoch = fresh;
    await endSession();
    showGate("login");
    toast("Logged out on every device.");
  } catch (err) {
    toast(err.message, "error");
  } finally {
    btn.disabled = false;
  }
});
// check now and then (and whenever this tab comes back) whether we've been logged out elsewhere
async function checkEpoch() {
  if (!memKey || !loaded) return true;
  try {
    const j = await (await fetch(`${S.LANYARD_API}/users/${S.DISCORD_ID}`)).json();
    const current = (j.success && j.data.kv && j.data.kv[EPOCH_KEY]) || "";
    if (current === epoch) return true;
    epoch = current;
    await endSession();
    showGate("login");
    toast("You were logged out from another device.");
    return false;
  } catch { return true; }   // offline: try again later
}
setInterval(checkEpoch, 60000);
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") checkEpoch(); });
$("chpw-toggle").addEventListener("click", () => {
  const f = $("chpw-form");
  f.hidden = !f.hidden;
  $("chpw-toggle").setAttribute("aria-expanded", String(!f.hidden));
  if (!f.hidden) $("chpw-1").focus();
});
$("chpw-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const pw = $("chpw-1").value, btn = $("chpw-btn");
  const bad = checkNewPassword(pw, $("chpw-2").value);
  if (bad) return formError("chpw-error", bad);
  $("chpw-error").hidden = true;
  btn.disabled = true; btn.textContent = "Saving…";
  try {
    const lock = await makeLock(getKey(), pw), fresh = newEpoch();
    await lanyard("PATCH", "/kv", JSON.stringify({ [LOCK_KEY]: lock, [EPOCH_KEY]: fresh }));
    lockStr = lock;
    epoch = fresh;
    await startSession(getKey(), stayLoggedIn);   // keep this device logged in
    $("chpw-1").value = $("chpw-2").value = "";
    $("chpw-form").hidden = true;
    $("chpw-toggle").setAttribute("aria-expanded", "false");
    toast("Password changed. Other devices have been logged out.");
  } catch (err) {
    formError("chpw-error", err.message);
  } finally {
    btn.disabled = false; btn.textContent = "Save new password";
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

async function lanyard(method, path, body, key = getKey()) {
  let r;
  try {
    r = await fetch(`${S.LANYARD_API}/users/${S.DISCORD_ID}${path}`, {
      method,
      headers: Object.assign({ Authorization: key }, body ? { "Content-Type": "application/json" } : {}),
      body,
    });
  } catch {
    throw new Error("Couldn't reach Lanyard. Check your internet connection and try again.");
  }
  if (r.ok) return;
  let msg = "";
  try { const j = await r.json(); msg = j && j.error && j.error.message; } catch {}
  if (r.status === 401 || r.status === 403) {
    throw new Error("Lanyard didn't accept that API key. Get a fresh one by DMing the Lanyard bot .apikey (if you were logged in, log out and use “Forgot password?”).");
  }
  throw new Error(msg ? `Lanyard said: ${msg}` : `Lanyard returned an error (${r.status}).`);
}

async function save() {
  if (memKey && !(await checkEpoch())) return;
  if (!loaded || saving || !isDirty()) return;
  if (!getKey()) { showGate(lockStr ? "login" : "setup"); return; }
  const settings = S.sanitize(draft.settings);
  const site = JSON.stringify(settings);
  const bio = draft.bio.trim().slice(0, S.LIMITS.bio);
  const pronouns = draft.pronouns.trim().slice(0, S.LIMITS.pronouns);
  if (site.length > S.KV_MAX) { toast("Settings are too big to save. Try shortening the custom CSS.", "error"); return; }

  saving = true;
  $("save-btn").disabled = true;
  setState("saving", "Saving…");
  try {
    const body = { site };
    if (bio) body.bio = bio;
    if (pronouns) body.pronouns = pronouns;
    await lanyard("PATCH", "/kv", JSON.stringify(body));
    // empty fields: remove the key instead of saving an empty value
    if (!bio && saved.bio) await lanyard("DELETE", "/kv/bio");
    if (!pronouns && saved.pronouns) await lanyard("DELETE", "/kv/pronouns");
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
    toast(err.message, "error");
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
  const resumed = resumeSession();   // unlock a saved session while the data loads
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
    lockStr = kv[LOCK_KEY] || "";
    epoch = kv[EPOCH_KEY] || "";
    const sessionEpoch = await resumed;       // false = no saved session
    if (sessionEpoch !== false && sessionEpoch !== epoch) await endSession();   // logged out everywhere since
    if (!lockStr) showGate("setup");          // first time: create a password
    else if (memKey) hideGate();              // still logged in on this device
    else showGate("login");
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
