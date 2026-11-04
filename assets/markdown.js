/* =====================================================================
   Discord-style formatting for the About Me.

   Supports what Discord does:
     **bold**  *italic*  _italic_  __underline__  ~~strikethrough~~
     ||spoiler||  `code`  ```code block```  > quote  >>> quote
     # heading  ## heading  ### heading  -# subtext
     - list / * list / 1. numbered list (indent to nest)
     [masked links](https://…)  https://bare.links  <https://links>
     <:custom:emoji>  <a:animated:emoji>  <t:1700000000:R> timestamps
     <@mentions>  and \escapes

   The output is built from DOM nodes only (never innerHTML), so text
   can't turn into HTML, and links are limited to http(s).
   ===================================================================== */
(function () {
  "use strict";

  const CDN = "https://cdn.discordapp.com";
  const node = (tag, cls) => { const n = document.createElement(tag); if (cls) n.className = cls; return n; };
  const text = (s) => document.createTextNode(s);

  function safeHttp(u) {
    if (window.SiteSettings) return window.SiteSettings.safeUrl(u);
    try { const x = new URL(u); return x.protocol === "https:" || x.protocol === "http:" ? x.href : ""; } catch { return ""; }
  }

  /* ---------- timestamps ---------- */
  const TS_FORMATS = {
    t: { timeStyle: "short" },
    T: { timeStyle: "medium" },
    d: { dateStyle: "short" },
    D: { dateStyle: "long" },
    f: { dateStyle: "long", timeStyle: "short" },
    F: { dateStyle: "full", timeStyle: "short" },
  };
  const UNITS = [["year", 31536000], ["month", 2592000], ["day", 86400], ["hour", 3600], ["minute", 60], ["second", 1]];
  function formatTimestamp(ms, style) {
    if (style === "R") {
      const diff = (ms - Date.now()) / 1000, abs = Math.abs(diff);
      const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "always" });
      for (const [unit, sec] of UNITS) {
        if (abs >= sec || unit === "second") return rtf.format(Math.trunc(diff / sec), unit);
      }
    }
    return new Intl.DateTimeFormat(undefined, TS_FORMATS[style] || TS_FORMATS.f).format(new Date(ms));
  }

  /* ---------- helpers used by the rules ---------- */
  const MAX_DEPTH = 12;     // deeper nesting is shown as plain text (stops "*****…" from overflowing)
  const MAX_LENGTH = 4000;  // longer text is cut (Discord's own limit is far lower)
  const inline = (st) => Object.assign({}, st, { inline: true, depth: (st.depth || 0) + 1 });
  function wrap(tag, inner, st, cls) {
    const n = node(tag, cls);
    if ((st.depth || 0) >= MAX_DEPTH) n.textContent = inner;
    else n.append(...parse(inner, inline(st)));
    return n;
  }
  function link(href) {
    const a = node("a");
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.title = href;
    return a;
  }
  function quote(content, st) {
    const q = node("blockquote", "md-quote");
    q.append(...parse(content, Object.assign({}, st, { inQuote: true, depth: (st.depth || 0) + 1 }), true));
    return q;
  }

  /* ---------- lists ---------- */
  const LIST_LINE = /^( *)([*-]|\d{1,9}\.) +([^\n]*\S[^\n]*)(?:\n|$)/;
  function matchList(src) {
    const items = [];
    let pos = 0, m;
    while ((m = LIST_LINE.exec(src.slice(pos)))) {
      items.push({ indent: m[1].length, ordered: /\d/.test(m[2]), num: parseInt(m[2], 10), text: m[3] });
      pos += m[0].length;
      if (!m[0].endsWith("\n")) break;
    }
    return items.length ? Object.assign([src.slice(0, pos)], { items }) : null;
  }
  function renderList(m, st) {
    const items = m.items;
    let i = 0;
    const build = (indent) => {
      const first = items[i];
      const list = node(first.ordered ? "ol" : "ul", "md-list");
      if (first.ordered && first.num !== 1) list.start = first.num;
      while (i < items.length && items[i].indent >= indent) {
        const it = items[i];
        if (it.indent === indent && it.ordered !== first.ordered) break; // "-" then "1." starts a new list
        if (it.indent > indent && list.lastElementChild) { list.lastElementChild.append(build(it.indent)); continue; }
        const li = node("li");
        li.append(...parse(it.text, inline(st)));
        list.append(li);
        i++;
      }
      return list;
    };
    const lists = [];
    while (i < items.length) lists.push(build(items[i].indent));
    return lists;
  }

  /* ---------- italics (Discord's rules: _ only around whole words) ---------- */
  const EM_UNDERSCORE = /^_((?:__|\\[\s\S]|[^\\_])+?)_(?![0-9A-Za-z_])/;
  const EM_STAR = /^\*(?=\S)((?:\*\*|\\[\s\S]|\s+(?:\\[\s\S]|[^\s*\\]|\*\*)|[^\s*\\])+?)\*(?!\*)/;
  function matchEm(src, prevChar) {
    if (src[0] === "_") return /[0-9A-Za-z_]/.test(prevChar) ? null : EM_UNDERSCORE.exec(src);
    return EM_STAR.exec(src);
  }

  /* =====================================================================
     RULES — tried in order at each position. "block" rules make their own
     line and only work outside inline formatting; "lineStart" ones only
     at the start of a line.
     ===================================================================== */
  const RULES = [
    { name: "codeBlock", block: true,
      re: /^```(?:([a-z0-9_+\-.#]+?)\n)?\n*([^\n][\s\S]*?)\n*```/i,
      render(m) {
        const pre = node("pre", "md-codeblock"), code = node("code");
        code.textContent = m[2];
        if (m[1]) pre.dataset.lang = m[1];
        pre.append(code);
        return pre;
      } },
    { name: "quoteAll", block: true, lineStart: true, noQuote: true,
      re: /^ *>>> ([\s\S]*)/,
      render: (m, st) => quote(m[1], st) },
    { name: "quote", block: true, lineStart: true, noQuote: true,
      re: /^ *> [^\n]*(?:\n *> [^\n]*)*\n?/,
      render: (m, st) => quote(m[0].replace(/\n$/, "").split("\n").map(l => l.replace(/^ *> /, "")).join("\n"), st) },
    { name: "heading", block: true, lineStart: true,
      re: /^(#{1,3}) +([^\n]+?)[ \t]*(?:\n|$)/,
      render(m, st) {
        const level = m[1].length, h = wrap("div", m[2], st, "md-h" + level);
        h.setAttribute("role", "heading");
        h.setAttribute("aria-level", String(level + 2));
        return h;
      } },
    { name: "subtext", block: true, lineStart: true,
      re: /^-# +([^\n]+?)[ \t]*(?:\n|$)/,
      render: (m, st) => wrap("div", m[1], st, "md-subtext") },
    { name: "list", block: true, lineStart: true, match: matchList, render: renderList },

    { name: "escape", re: /^\\([^0-9A-Za-z\s])/, render: (m) => text(m[1]) },
    { name: "inlineCode", re: /^(`+)([\s\S]*?[^`])\1(?!`)/,
      render(m) {
        const c = node("code", "md-code");
        c.textContent = m[2].replace(/^ ([\s\S]*) $/, "$1");
        return c;
      } },
    { name: "emoji", re: /^<(a?):(\w{2,32}):(\d{15,21})>/,
      render(m, st) {
        const img = node("img", "md-emoji");
        img.src = st.emojiURL ? st.emojiURL(m[3], m[1] === "a") : `${CDN}/emojis/${m[3]}.${m[1] ? "gif" : "webp"}?size=48`;
        img.alt = img.title = `:${m[2]}:`;
        img.draggable = false;
        return img;
      } },
    { name: "timestamp", re: /^<t:(-?\d{1,13})(?::([tTdDfFR]))?>/,
      render(m) {
        const ms = Number(m[1]) * 1000;
        if (!Number.isFinite(ms) || Math.abs(ms) > 8.64e15) return null;
        const style = m[2] || "f", t = node("time", "md-time");
        t.dateTime = new Date(ms).toISOString();
        t.dataset.ts = String(ms);
        t.dataset.style = style;
        t.title = formatTimestamp(ms, "F");
        t.textContent = formatTimestamp(ms, style);
        return t;
      } },
    { name: "userMention", re: /^<@!?(\d{15,21})>/,
      render(m, st) {
        const s = node("span", "md-mention");
        s.dataset.mention = m[1];
        s.textContent = "@" + (st.mentionName ? st.mentionName(m[1]) : "unknown-user");
        return s;
      } },
    { name: "roleMention", re: /^<@&(\d{15,21})>/,
      render() { const s = node("span", "md-mention"); s.textContent = "@role"; return s; } },
    { name: "channelMention", re: /^<#(\d{15,21})>/,
      render() { const s = node("span", "md-mention"); s.textContent = "#channel"; return s; } },
    { name: "maskedLink",
      re: /^\[((?:\[[^\]]*\]|[^[\]]|\](?=[^[]*\]))*)\]\(\s*<?([^\s<>()]+(?:\([^\s<>()]*\)[^\s<>()]*)*)>?\s*\)/,
      render(m, st) {
        const href = !st.inLink && safeHttp(m[2]);
        if (!href || !m[1].trim()) return null;
        const a = link(href);
        a.append(...parse(m[1], Object.assign(inline(st), { inLink: true })));
        return a;
      } },
    { name: "angleLink", re: /^<(https?:\/\/[^\s>]+)>/,
      render(m, st) {
        const href = !st.inLink && safeHttp(m[1]);
        if (!href) return null;
        const a = link(href);
        a.textContent = m[1];
        return a;
      } },
    { name: "autolink", re: /^https?:\/\/[^\s<]+[^<.,:;"')\]\s]/,
      render(m, st) {
        const href = !st.inLink && safeHttp(m[0]);
        if (!href) return null;
        const a = link(href);
        a.textContent = m[0];
        return a;
      } },
    { name: "strong", re: /^\*\*((?:\\[\s\S]|[^\\])+?)\*\*(?!\*)/, render: (m, st) => wrap("strong", m[1], st) },
    { name: "underline", re: /^__((?:\\[\s\S]|[^\\])+?)__(?!_)/, render: (m, st) => wrap("u", m[1], st) },
    { name: "em", match: matchEm, render: (m, st) => wrap("em", m[1], st) },
    { name: "strike", re: /^~~([\s\S]+?)~~(?!_)/, render: (m, st) => wrap("s", m[1], st) },
    { name: "spoiler", re: /^\|\|([\s\S]+?)\|\|/,
      render(m, st) {
        const s = wrap("span", m[1], st, "md-spoiler");
        s.tabIndex = 0;
        s.setAttribute("role", "button");
        s.title = "Spoiler: click to reveal";
        return s;
      } },
    { name: "newline", re: /^\n/, render: () => text("\n") },
    { name: "text", re: /^[\s\S]+?(?=[^0-9A-Za-z\sÀ-￿]|\n|\w+:\S|$)/, render: (m) => text(m[0]) },
  ];

  function push(out, produced) {
    for (const n of [].concat(produced)) {
      const last = out[out.length - 1];
      if (n.nodeType === 3 && last && last.nodeType === 3) last.data += n.data;
      else out.push(n);
    }
  }
  // block elements already start on their own line, so drop the newline before them
  function trimTrailingNewline(out) {
    const last = out[out.length - 1];
    if (last && last.nodeType === 3 && last.data.endsWith("\n")) {
      last.data = last.data.slice(0, -1);
      if (!last.data) out.pop();
    }
  }

  function parse(src, st, lineStart) {
    const out = [];
    let atLineStart = !!lineStart, prevChar = "";
    outer: while (src) {
      for (const r of RULES) {
        if (r.lineStart && !atLineStart) continue;
        if (r.block && st.inline) continue;
        if (r.noQuote && st.inQuote) continue;
        const m = r.match ? r.match(src, prevChar) : r.re.exec(src);
        if (!m) continue;
        const produced = r.render(m, st);
        if (produced == null) continue;
        let len = m[0].length;
        if (r.block) {
          trimTrailingNewline(out);
          if (!m[0].endsWith("\n") && src[len] === "\n") len++; // and the newline after them
        }
        push(out, produced);
        const consumed = src.slice(0, len);
        atLineStart = !!r.block || consumed.endsWith("\n");
        prevChar = consumed.slice(-1);
        src = src.slice(len);
        continue outer;
      }
      // nothing matched: keep the character as plain text
      push(out, text(src[0]));
      atLineStart = src[0] === "\n";
      prevChar = src[0];
      src = src.slice(1);
    }
    return out;
  }

  /**
   * Turns Discord-formatted text into a DocumentFragment.
   * options.emojiURL(id, animated)  -> image URL for custom emoji
   * options.mentionName(id)         -> name to show for <@id>
   */
  function render(source, options = {}) {
    const frag = document.createDocumentFragment();
    const st = { emojiURL: options.emojiURL, mentionName: options.mentionName };
    frag.append(...parse(String(source == null ? "" : source).slice(0, MAX_LENGTH).replace(/\r\n?/g, "\n"), st, true));
    return frag;
  }

  window.DiscordMarkdown = { render, formatTimestamp };
})();
