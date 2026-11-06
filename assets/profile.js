/* =====================================================================
   Profile page logic (in its own file so the page can use a Content-
   Security-Policy that only allows scripts from this site).
   ===================================================================== */
(function () {
"use strict";
/* =====================================================================
   Everything on this page comes from Discord (live), plus the look you
   choose in the control panel (panel.html), which is saved to Lanyard KV.
   ===================================================================== */
const S = window.SiteSettings;
const FX = window.SiteEffects || { setParticles() {}, setCursor() {}, setTilt() {}, refreshColors() {} };
const ID = S.DISCORD_ID;
const CDN = "https://cdn.discordapp.com";
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// What the page shows before the live data arrives (or if it can't load).
const SNAPSHOT = {
  id: ID,
  username: "haoni1028",
  global_name: "HAONI",
  avatar: "4544384a53cc2459cbefc546aec48267",
  banner: "a_9f2985c88b85543909d28f217d08c79b",
  banner_color: "#7b00ff",
  public_flags: 128,
  nitro: true,
  avatar_decoration_data: { asset: "a_ab6beffdbc7e82cd59af53b845f13a3c" },
  collectibles: { nameplate: { asset: "nameplates/special_events_2/nitro_rocketfuel_nameplate/" } },
  display_name_styles: { font_id: 6, effect_id: 3, colors: [1874155] },
  primary_guild: { identity_guild_id: "1386407365653299352", identity_enabled: true, tag: "NES", badge: "abfcf0314946253b157797a648829c11" },
};

const $ = (id) => document.getElementById(id);
const el = (tag, props = {}, ...kids) => {
  const n = Object.assign(document.createElement(tag), props);
  kids.flat().forEach(k => k != null && n.append(k));
  return n;
};
const setSrc = (img, url) => { if (img.getAttribute("src") !== url) img.src = url; };
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch {} },
};

// Discord profile badges: [flag bit, label, icon hash]
const BADGES = [
  [1 << 0,  "Discord Staff",                   "5e74e9b61934fc1f67c65515d1f7e60d"],
  [1 << 1,  "Partnered Server Owner",          "3f9748e53446a137a052f3454e2de41e"],
  [1 << 18, "Moderator Programs Alumni",       "fee1624003e2fee35cb398e125dc479b"],
  [1 << 2,  "HypeSquad Events",                "bf01d1073931f921909045f3a39fd264"],
  [1 << 6,  "HypeSquad Bravery",               "8a88d63823d8a71cd5e390baa45efa02"],
  [1 << 7,  "HypeSquad Brilliance",            "011940fd013da3f7fb926e4a1cd2e618"],
  [1 << 8,  "HypeSquad Balance",               "3aa41de486fa12454c3761e8e223442e"],
  [1 << 3,  "Discord Bug Hunter",              "2717692c7dca7289b35297368a940dd0"],
  [1 << 14, "Discord Bug Hunter",              "848f79194d4be5ff5f81505cbd0ce1e6"],
  [1 << 22, "Active Developer",                "6bdc42827a38498929a4920da12695d9"],
  [1 << 17, "Early Verified Bot Developer",    "6df5892e0f35b051f8b61eace34f4967"],
  [1 << 9,  "Early Supporter",                 "7060786766c9c840eb3019e725d2b358"],
];
const NITRO_BADGE = ["Nitro", "2ba85e8026a8614b640c2837bcdfe21b"];

/* ---------- state ---------- */
const state = {
  user: { ...SNAPSHOT },
  presence: null,
  settings: S.defaults(),
  siteRaw: null,      // last raw settings string seen (to skip needless re-renders)
  revealed: false,
};
const createdAt = new Date(Number((BigInt(ID) >> 22n) + 1420070400000n));

const settings = () => state.settings;
const kv = () => (state.presence && state.presence.kv) || {};
const iconSource = () => kv();
const bioText = () => String(kv().bio || "").slice(0, 2000);
const pronounsText = () => String(kv().pronouns || "").slice(0, S.LIMITS.pronouns);

/* ---------- helpers ---------- */
const hex = (n) => "#" + n.toString(16).padStart(6, "0");
function readableInk(color) {
  const c = color.replace("#", "");
  const [r, g, b] = [0, 2, 4].map(i => parseInt(c.slice(i, i + 2), 16) / 255)
    .map(v => v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) > 0.45 ? "#111216" : "#FFFFFF";
}
const avatarURL = (u, size = 256) => u.avatar
  ? `${CDN}/avatars/${u.id}/${u.avatar}.${u.avatar.startsWith("a_") && !reducedMotion ? "gif" : "png"}?size=${size}`
  : `${CDN}/embed/avatars/${Number((BigInt(u.id) >> 22n) % 6n)}.png`;
const emojiURL = (id, animated, size = 48) => `${CDN}/emojis/${id}.${animated && !reducedMotion ? "gif" : "webp"}?size=${size}&quality=lossless`;
function fmtDuration(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), sec = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${sec}` : `${m}:${sec}`;
}

/* ---------- Discord formatting for the About Me ---------- */
const MD = window.DiscordMarkdown;
const mentionNames = {};   // user id -> display name (looked up once)
function mentionName(id) {
  if (id === ID) return state.user.global_name || state.user.username;
  if (mentionNames[id]) return mentionNames[id];
  lookupMention(id);
  return "unknown-user";
}
async function lookupMention(id) {
  if (id in mentionNames) return;
  mentionNames[id] = "";
  try {
    const { data } = await (await fetch(`https://japi.rest/discord/v1/user/${id}`)).json();
    const name = data && (data.global_name || data.username);
    if (!name) return;
    mentionNames[id] = name;
    const roots = [$("bio")].concat(bioSource ? [bioSource] : []);
    for (const r of roots) r.querySelectorAll(`.md-mention[data-mention="${id}"]`).forEach(n => { n.textContent = "@" + name; });
  } catch {}
}
const mdOptions = { emojiURL: (id, animated) => emojiURL(id, animated), mentionName };
function formatted(text) {
  if (MD) return MD.render(text, mdOptions);
  const frag = document.createDocumentFragment(); // formatter didn't load: plain text
  frag.append(text);
  return frag;
}

/* ---------- look: theme, background, card, font, effects, show/hide, custom CSS ---------- */
function applyTheme() {
  const s = settings(), root = document.documentElement;
  let mode = s.themeMode;
  const saved = store.get("theme");
  if (saved === "dark" || saved === "light") mode = saved;
  if (mode === "dark" || mode === "light") root.dataset.theme = mode;
  else delete root.dataset.theme;
  FX.refreshColors();
}

function applyBackground() {
  const s = settings(), u = state.user, pg = $("page-bg");
  let url = "";
  if (s.background === "image") url = s.backgroundImage;
  else if (s.background === "banner" && u.banner) url = `${CDN}/banners/${u.id}/${u.banner}.png?size=600`;
  pg.style.backgroundImage = url ? `url("${url.replace(/["\\]/g, encodeURIComponent)}")` : "";
  pg.hidden = !url;
}

let fontLink = null;
function applyFont(id) {
  document.documentElement.style.setProperty("--name-font", S.fontFamily(id));
  if (id === "Space Grotesk") return; // already loaded above
  const href = S.fontURL(id);
  if (!fontLink) { fontLink = el("link", { rel: "stylesheet" }); document.head.append(fontLink); }
  if (fontLink.getAttribute("href") !== href) fontLink.href = href;
}

function applyLook() {
  const s = settings(), root = document.documentElement;
  for (const [k] of S.SHOW) root.classList.toggle("hide-" + k, !s.show[k]);
  root.classList.toggle("card-glass", s.cardStyle === "glass");
  for (const b of S.BACKGROUNDS) root.classList.toggle("bg-" + b.id, s.background === b.id);
  applyBackground();
  applyFont(s.nameFont);
  root.style.setProperty("--name-size", (S.NAME_SIZES.find(x => x.id === s.nameSize) || S.NAME_SIZES[1]).px + "px");
  applyTheme();
  FX.setParticles(s.particles);
  FX.setCursor(s.cursor);
  FX.setTilt($("card"), s.tilt);
  $("custom-css").textContent = s.customCss;
}

/* ---------- profile (name, avatar, decoration, nameplate, tag, badges, colours, banner) ---------- */
function applyNameStyle(name) {
  const s = settings(), u = state.user, dn = $("display-name");
  const root = document.documentElement.style;
  const st = u.display_name_styles || {};
  const dc = (st.colors || []).map(hex);
  const n1 = s.nameColors === "custom" ? s.nameColor1 : dc[0] || "var(--ink)";
  const n2 = s.nameColors === "custom" ? s.nameColor2 : dc[1] || "var(--accent)";
  root.setProperty("--n1", n1);
  root.setProperty("--n2", n2);
  let fx = s.nameEffect;
  if (fx === "discord") fx = dc.length > 1 ? "gradient" : st.effect_id ? "glow" : "solid";
  dn.className = "display fx-" + fx;
  dn.dataset.text = name;
}

function renderUser() {
  const u = state.user, s = settings();
  const name = s.displayName || u.global_name || u.display_name || u.username;

  document.title = s.tabTitle || name;
  $("display-name").textContent = name;
  $("foot-name").textContent = name.toLowerCase();
  $("handle").textContent = s.username || u.username;
  applyNameStyle(name);

  // avatar + decoration
  const av = $("avatar");
  setSrc(av, avatarURL(u));
  av.alt = `${name}'s avatar`;
  av.onerror = () => { av.onerror = null; av.src = `${CDN}/embed/avatars/0.png`; };
  $("favicon").href = avatarURL(u, 64);

  const deco = u.avatar_decoration_data && u.avatar_decoration_data.asset;
  $("deco").hidden = !deco;
  if (deco) setSrc($("deco"), `${CDN}/avatar-decoration-presets/${deco}.png?size=240&passthrough=${!reducedMotion}`);

  // nameplate
  const np = u.collectibles && u.collectibles.nameplate && u.collectibles.nameplate.asset;
  const vid = $("nameplate");
  vid.hidden = !np;
  if (np) {
    const base = `${CDN}/assets/collectibles/${np}`;
    if (vid.getAttribute("poster") !== base + "static.png") {
      vid.poster = base + "static.png";
      if (!reducedMotion) { vid.src = base + "asset.webm"; vid.play().catch(() => {}); }
    }
  }

  // server tag
  const g = u.primary_guild || u.clan;
  const tagEl = $("guild-tag");
  tagEl.hidden = !(g && g.identity_enabled && g.tag);
  if (!tagEl.hidden) {
    const kids = [];
    if (g.badge) kids.push(el("img", { src: `${CDN}/guild-tag-badges/${g.identity_guild_id}/${g.badge}.png?size=32`, alt: "" }));
    kids.push(g.tag);
    tagEl.replaceChildren(...kids);
    tagEl.title = "Server tag";
  }

  // badges
  const flags = u.public_flags || 0;
  const list = BADGES.filter(([bit]) => flags & bit).map(([, label, icon]) => [label, icon]);
  if (u.nitro) list.unshift(NITRO_BADGE);
  $("badges").hidden = list.length === 0;
  $("badges").replaceChildren(...list.map(([label, icon]) =>
    el("span", { className: "badge", tabIndex: 0, ariaLabel: label },
      el("img", { src: `${CDN}/badge-icons/${icon}.png`, alt: "" }),
      el("span", { className: "tip", textContent: label }))
  ));

  // accent colour (Discord profile colour unless overridden) + banner
  const root = document.documentElement.style;
  const discordColor = u.banner_color || (u.accent_color != null ? hex(u.accent_color) : null);
  const color = s.accentSource === "custom" ? s.accent : discordColor;
  if (color) {
    root.setProperty("--accent", color);
    root.setProperty("--accent-ink", readableInk(color));
    document.querySelector('meta[name="theme-color"]').content = color;
  }
  const bImg = $("banner-img");
  bImg.hidden = !u.banner;
  if (u.banner) {
    const animated = u.banner.startsWith("a_") && !reducedMotion;
    setSrc(bImg, `${CDN}/banners/${u.id}/${u.banner}.${animated ? "gif" : "png"}?size=1024`);
  }
  applyBackground();
  FX.refreshColors();

  // add-me button
  const cta = $("discord-cta");
  cta.href = `https://discord.com/users/${u.id}`;
  cta.replaceChildren(S.discordIcon(), s.discordButtonText + " ↗");
}

/* ---------- bio (Lanyard KV "bio") with optional typewriter ---------- */
let bioKey = null, typeRun = 0;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const graphemes = (str) => (typeof Intl.Segmenter === "function"
  ? [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(str)].map(x => x.segment)
  : [...str]);

// Types `source` (formatted DOM) into `target`, keeping every bold/link/quote/list in place.
let bioSource = null;
async function typewrite(target, source, run) {
  const caret = el("span", { className: "caret" });
  target.append(caret);
  const walk = async (from, into) => {
    for (const n of [...from.childNodes]) {
      if (run !== typeRun) return false;
      if (n.nodeType === 3) {
        const t = document.createTextNode("");
        into.append(t);
        t.after(caret);
        for (const ch of graphemes(n.data)) {
          if (run !== typeRun) return false;
          t.data += ch;
          await sleep(ch === "\n" ? 200 : 32);
        }
      } else if (n.nodeType === 1) {
        const copy = n.cloneNode(false);
        into.append(copy);
        if (!n.firstChild) { copy.after(caret); await sleep(80); continue; }
        if (!(await walk(n, copy))) return false;
      }
    }
    return true;
  };
  await walk(source, target);
  if (run === typeRun) bioSource = null;
}

function renderBio() {
  const s = settings();
  const bio = bioText().replace(/^\n+|\s+$/g, "");
  const show = s.show.bio && !!bio;
  $("bio-section").hidden = !show;
  const key = show ? bio + "\u0000" + s.typewriter : null;
  if (key === bioKey) return; // unchanged — don't restart the typewriter
  bioKey = key;
  typeRun++;
  bioSource = null;
  if (!show) { $("bio").replaceChildren(); return; }
  if (s.typewriter && !reducedMotion) {
    const shown = el("div", { className: "md" });
    shown.setAttribute("aria-hidden", "true");
    $("bio").replaceChildren(el("div", { className: "md sr-only" }, formatted(bio)), shown);
    bioSource = el("div", {}, formatted(bio));
    typewrite(shown, bioSource, typeRun);
  } else {
    $("bio").replaceChildren(el("div", { className: "md" }, formatted(bio)));
  }
}

// spoilers: click (or Enter/Space) to reveal, like Discord
function revealSpoiler(sp) {
  sp.classList.add("shown");
  sp.removeAttribute("role");
  sp.removeAttribute("tabindex");
  sp.removeAttribute("title");
}
$("bio").addEventListener("click", (e) => {
  const sp = e.target.closest(".md-spoiler:not(.shown)");
  if (sp) { e.preventDefault(); revealSpoiler(sp); }   // don't follow a link that's still hidden
});
$("bio").addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === " ") && e.target.matches(".md-spoiler:not(.shown)")) {
    e.preventDefault();
    revealSpoiler(e.target);
  }
});
// keep "in 3 days" / "2 hours ago" timestamps current
function tickRelativeTimes() {
  if (!MD) return;
  document.querySelectorAll('#bio .md-time[data-style="R"]').forEach(t => { t.textContent = MD.formatTimestamp(+t.dataset.ts, "R"); });
}
function renderPronouns() {
  const pr = pronounsText().trim();
  $("pronouns").hidden = !pr;
  $("pronouns").textContent = pr ? "• " + pr : "";
}

/* ---------- links ---------- */
function renderLinks() {
  const s = settings();
  const links = s.show.links ? s.links : [];
  $("links-section").hidden = links.length === 0;
  const box = $("links");
  box.className = "links links-" + s.linkStyle;
  box.replaceChildren(...links.map(l => {
    const info = S.linkInfo(l.url);
    const invite = S.discordInvite(l.url);
    const server = invite ? servers[invite] : null;     // filled in once the invite lookup returns
    if (invite && !(invite in servers)) {
      servers[invite] = null;
      S.lookupInvite(invite).then(g => { servers[invite] = g; if (g) renderLinks(); });
    }
    const label = l.label || (server && server.name) || info.name;
    // icon: your uploaded one, else the Discord server's, else the site's own logo
    const src = linkIcon(l.icon) || S.serverIconURL(server, !reducedMotion);
    const icon = src ? el("img", { className: "ico", src, alt: "", loading: "lazy", decoding: "async", referrerPolicy: "no-referrer" }) : S.iconSVG(info);
    if (src) icon.addEventListener("error", () => icon.replaceWith(S.iconSVG(info)), { once: true });
    const a = el("a", { href: l.url, target: "_blank", rel: "noopener me" });
    if (info.color) a.style.setProperty("--brand", info.color);
    if (s.linkStyle === "icons") {
      a.className = "link-icon";
      a.title = label;
      a.setAttribute("aria-label", label);
      a.append(icon);
    } else {
      a.className = "link-btn";
      a.append(icon, el("span", { className: "l", textContent: label }), el("span", { className: "go", textContent: "↗" }));
    }
    return a;
  }));
}
const servers = {};   // invite code → { id, name, icon } (or null while loading / if not found)
const linkIcon = (id) => S.validIconId(id) ? S.safeIcon(iconSource()[S.ICON_PREFIX + id]) : null;

/* ---------- presence (status, platforms, custom status, activities, Spotify) ---------- */
const STATUS_NAMES = { online: "Online", idle: "Idle", dnd: "Do Not Disturb", offline: "Offline" };
const KINDS = { 0: "Playing", 1: "Streaming", 2: "Listening to", 3: "Watching", 5: "Competing in" };
const appIcons = {};

async function appIcon(appId, placeholder) {
  if (!(appId in appIcons)) {
    appIcons[appId] = fetch(`https://discord.com/api/v10/applications/${appId}/rpc`)
      .then(r => r.ok ? r.json() : null)
      .then(j => j && j.icon ? `${CDN}/app-icons/${appId}/${j.icon}.png?size=128` : null)
      .catch(() => null);
  }
  const url = await appIcons[appId];
  if (url && placeholder.isConnected) placeholder.replaceWith(el("img", { src: url, alt: "" }));
}

function assetURL(a, key) {
  const v = a.assets && a.assets[key];
  if (!v) return null;
  if (v.startsWith("mp:")) return `https://media.discordapp.net/${v.slice(3)}`;
  if (v.startsWith("spotify:")) return `https://i.scdn.co/image/${v.slice(8)}`;
  if (a.application_id) return `${CDN}/app-assets/${a.application_id}/${v}.png`;
  return null;
}

function renderPresence() {
  const d = state.presence, s = settings();
  const st = (d && d.discord_status) || "offline";
  $("status").dataset.s = st;
  $("status").setAttribute("aria-label", `Status: ${STATUS_NAMES[st]}`);
  $("status").title = STATUS_NAMES[st];
  if (!d) return;

  // platforms
  const on = [
    d.active_on_discord_desktop && "desktop",
    d.active_on_discord_web && "web",
    d.active_on_discord_mobile && "mobile",
    d.active_on_discord_vr && "VR",
  ].filter(Boolean);
  const pl = $("platforms");
  pl.hidden = false;
  pl.dataset.s = st;
  pl.querySelector("span").textContent = st === "offline" ? "Offline" : `${STATUS_NAMES[st]}${on.length ? " on " + on.join(", ") : ""}`;

  const acts = d.activities || [];

  // custom status
  const cs = acts.find(a => a.type === 4);
  const csEl = $("custom-status");
  csEl.hidden = !(cs && (cs.state || cs.emoji));
  if (!csEl.hidden) {
    const kids = [];
    if (cs.emoji) {
      kids.push(/^\d{1,25}$/.test(cs.emoji.id || "")
        ? el("img", { src: emojiURL(cs.emoji.id, cs.emoji.animated), alt: `:${cs.emoji.name}:` })
        : el("span", { className: "e", textContent: cs.emoji.name }));
    }
    if (cs.state) kids.push(el("span", { textContent: cs.state }));
    csEl.replaceChildren(...kids);
  }

  // activities
  const cards = [];
  if (s.show.spotify && d.listening_to_spotify && d.spotify) {
    const sp = d.spotify;
    const card = el("a", { className: "activity", href: `https://open.spotify.com/track/${sp.track_id}`, target: "_blank", rel: "noopener" },
      el("div", { className: "art" }, S.safeUrl(sp.album_art_url || "") ? el("img", { src: S.safeUrl(sp.album_art_url), alt: "" }) : "🎵"),
      el("div", { className: "body" },
        el("div", { className: "kind", textContent: "Listening to Spotify" }),
        el("div", { className: "what", textContent: sp.song }),
        el("div", { className: "detail", textContent: `by ${sp.artist}` }),
        el("div", { className: "bar" }, el("i")),
        el("div", { className: "bar-times" }, el("span", { className: "t-now" }), el("span", { className: "t-end" }))
      ));
    card.dataset.start = sp.timestamps.start;
    card.dataset.end = sp.timestamps.end;
    cards.push(card);
  }
  for (const a of s.show.activity ? acts : []) {
    if (a.type === 4) continue;
    if (a.type === 2 && a.name === "Spotify" && d.listening_to_spotify) continue;
    const large = assetURL(a, "large_image"), small = assetURL(a, "small_image");
    const art = el("div", { className: "art" });
    if (large) art.append(el("img", { src: large, alt: "", title: (a.assets && a.assets.large_text) || "" }));
    else {
      const ph = el("span", { textContent: "🎮" });
      art.append(ph);
      if (a.application_id) appIcon(a.application_id, ph);
    }
    if (small) art.append(el("img", { className: "small", src: small, alt: "", title: (a.assets && a.assets.small_text) || "" }));
    const streamUrl = a.type === 1 ? S.safeUrl(a.url || "") : "";
    const isStream = !!streamUrl;
    const card = el(isStream ? "a" : "div", { className: "activity" },
      art,
      el("div", { className: "body" },
        el("div", { className: "kind", textContent: KINDS[a.type] || "Playing" }),
        el("div", { className: "what", textContent: a.name }),
        a.details ? el("div", { className: "detail", textContent: a.details }) : null,
        a.state ? el("div", { className: "detail", textContent: a.state }) : null,
        a.timestamps && a.timestamps.start ? el("div", { className: "time" }) : null
      ));
    if (isStream) Object.assign(card, { href: streamUrl, target: "_blank", rel: "noopener" });
    if (a.timestamps && a.timestamps.start) card.dataset.start = a.timestamps.start;
    cards.push(card);
  }
  $("activity-section").hidden = cards.length === 0;
  $("activities").replaceChildren(...cards);
  tickTimers();
}

function tickTimers() {
  const now = Date.now();
  document.querySelectorAll(".activity[data-start]").forEach(c => {
    const start = +c.dataset.start, end = +c.dataset.end;
    if (end) {
      const total = end - start, cur = Math.min(now - start, total);
      c.querySelector(".bar > i").style.width = (cur / total * 100) + "%";
      c.querySelector(".t-now").textContent = fmtDuration(cur);
      c.querySelector(".t-end").textContent = fmtDuration(total);
    } else {
      const t = c.querySelector(".time");
      if (t) t.textContent = `${fmtDuration(now - start)} elapsed`;
    }
  });
}

/* ---------- info ---------- */
function renderFacts() {
  const s = settings(), facts = [];
  if (s.show.memberSince) facts.push(["Member Since", createdAt.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" })]);
  if (s.show.localTime) {
    try { facts.push(["Local Time", new Intl.DateTimeFormat([], { hour: "numeric", minute: "2-digit", timeZone: s.timezone }).format(new Date())]); } catch {}
  }
  $("facts-section").hidden = facts.length === 0;
  $("facts").replaceChildren(...facts.map(([k, v]) =>
    el("div", { className: "fact" }, el("div", { className: "k", textContent: k }), el("div", { className: "v", textContent: v }))
  ));
}

function renderAll() {
  renderUser();
  renderBio();
  renderPronouns();
  renderLinks();
  renderPresence();
  renderFacts();
}

function reveal() {
  if (state.revealed) return;
  state.revealed = true;
  document.documentElement.classList.remove("js-loading");
}

/* ---------- copy username (always the real Discord username) ---------- */
$("copy-btn").onclick = async (e) => {
  const btn = e.currentTarget, name = state.user.username;
  try { await navigator.clipboard.writeText(name); }
  catch {
    const t = el("textarea", { value: name });
    document.body.append(t); t.select();
    try { document.execCommand("copy"); } catch {}
    t.remove();
  }
  btn.textContent = "Copied!"; btn.classList.add("done");
  setTimeout(() => { btn.textContent = "Copy username"; btn.classList.remove("done"); }, 1600);
};

/* ---------- theme toggle (a visitor's choice beats the default) ---------- */
$("theme-btn").onclick = () => {
  const root = document.documentElement;
  const isLight = root.dataset.theme
    ? root.dataset.theme === "light"
    : matchMedia("(prefers-color-scheme: light)").matches;
  root.dataset.theme = isLight ? "dark" : "light";
  store.set("theme", root.dataset.theme);
  FX.refreshColors();
};
matchMedia("(prefers-color-scheme: light)").addEventListener("change", () => FX.refreshColors());

/* =====================================================================
   LIVE DATA
   - Lanyard WebSocket: status, activities, Spotify, custom status, avatar,
     name, decoration, nameplate, server tag, bio, and your control-panel
     settings (KV) — pushed instantly.
   - japi.rest: banner, profile colour, Nitro badge (refreshed every 10 min).
   ===================================================================== */
function setLive(on, text) {
  $("live").classList.toggle("on", on);
  $("live").querySelector("span").textContent = text;
}

function applyPresence(d) {
  if (!d || !d.discord_user) return;
  state.presence = d;
  const du = d.discord_user;
  Object.assign(state.user, {
    username: du.username,
    global_name: du.global_name || du.display_name,
    avatar: du.avatar,
    public_flags: du.public_flags,
    avatar_decoration_data: du.avatar_decoration_data || null,
    collectibles: du.collectibles || null,
    display_name_styles: du.display_name_styles || null,
    primary_guild: du.primary_guild || null,
  });
  const raw = (d.kv && d.kv.site) || "";
  if (raw !== state.siteRaw) {
    state.siteRaw = raw;
    state.settings = S.sanitize(raw);
    store.set("haoni.site", raw || null);
    applyLook();
  }
  renderAll();
  reveal();
}

async function loadProfileExtras() {
  try {
    const r = await fetch(`https://japi.rest/discord/v1/user/${ID}`);
    if (!r.ok) return;
    const { data } = await r.json();
    if (!data) return;
    Object.assign(state.user, {
      banner: data.banner || null,
      banner_color: data.banner_color || null,
      accent_color: data.accent_color,
      nitro: (data.public_flags_array || []).includes("NITRO"),
    });
    // fill in profile fields too if Lanyard isn't connected
    if (!state.presence) Object.assign(state.user, {
      username: data.username, global_name: data.global_name, avatar: data.avatar,
      public_flags: data.public_flags, avatar_decoration_data: data.avatar_decoration_data || null,
      collectibles: data.collectibles || null, display_name_styles: data.display_name_styles || null,
      primary_guild: data.primary_guild || data.clan || null,
    });
    renderUser();
  } catch {}
}

let ws, heartbeat, retries = 0, pollTimer;
function connectSocket() {
  try { ws = new WebSocket(S.LANYARD_SOCKET); }
  catch { return startPolling(); }
  ws.onmessage = (e) => {
    let m; try { m = JSON.parse(e.data); } catch { return; }
    if (m.op === 1) {
      clearInterval(heartbeat);
      heartbeat = setInterval(() => ws.readyState === 1 && ws.send(JSON.stringify({ op: 3 })), m.d.heartbeat_interval);
      ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: ID } }));
    } else if (m.op === 0 && (m.t === "INIT_STATE" || m.t === "PRESENCE_UPDATE")) {
      retries = 0;
      if (m.d && m.d.discord_user) { applyPresence(m.d); setLive(true, "Live from Discord"); }
      else setLive(false, "Join the Lanyard server to show live status");
    }
  };
  ws.onclose = () => {
    clearInterval(heartbeat);
    setLive(false, "Reconnecting…");
    if (++retries > 5) return startPolling();
    setTimeout(connectSocket, Math.min(30000, 1000 * 2 ** retries));
  };
}

async function pollOnce() {
  try {
    const j = await (await fetch(`${S.LANYARD_API}/users/${ID}`)).json();
    if (j.success) { applyPresence(j.data); setLive(true, "Live from Discord (updates every 30s)"); }
  } catch {}
}
function startPolling() {
  if (pollTimer) return;
  pollOnce();
  pollTimer = setInterval(pollOnce, 30000);
}

{
  const cached = store.get("haoni.site");
  if (cached) { state.siteRaw = cached; state.settings = S.sanitize(cached); }
}
applyLook();
renderAll();
if (state.siteRaw) reveal();          // returning visitor: we already know the look
setTimeout(reveal, 1500);              // never stay hidden if Discord is slow
setInterval(tickTimers, 1000);
setInterval(renderFacts, 15000);
setInterval(tickRelativeTimes, 30000);
connectSocket();
loadProfileExtras();
setInterval(loadProfileExtras, 10 * 60 * 1000);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") loadProfileExtras();
});
})();
