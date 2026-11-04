# HAONI

A real time website profile that links my actual Discord Profile and updates automatically when changes happen.

- Live: https://haoni1028.github.io/HAONI/
- Control panel: https://haoni1028.github.io/HAONI/panel.html

## What updates by itself
- **Instantly** (via the [Lanyard](https://github.com/Phineas/lanyard) WebSocket): online status,
  platforms, custom status, games, Spotify, avatar, display name and colour, avatar decoration,
  nameplate, server tag, badges, bio, pronouns, and everything set in the control panel.
- **Within ~1 hour** (via japi.rest, which caches): banner and profile colour.

## Control panel (`panel.html`)
Edit the site without touching code: display name, username, bio, pronouns, links (with
automatic icons), name font / effect / size / colours, background particles, cursor effects,
3D tilt, typewriter bio, theme, accent colour, glass card, page background, show/hide for every
part of the page, and custom CSS. A live preview shows changes before you publish.

**Login:** log in with Discord. Only your Discord account (@haoni1028) gets in. The login runs
through a small free Cloudflare Worker (`worker/`) that holds the Lanyard API key, checks who
logged in, and does the saving, so the key never reaches the browser. Set it up once with
`worker/SETUP.md`, then put the worker's address in `assets/shared.js` (`AUTH_SERVER`).

Pressing **Save & publish** writes the settings to Lanyard KV, and every open copy of the site
updates instantly. Use **Export settings** for a backup.

## Security
- **No secrets are stored in this repo.** The Lanyard API key, Discord client secret and session
  secret live only in the Cloudflare Worker's encrypted settings. The key can only change this
  site's Lanyard data; it can't access your Discord account.
- **Only your Discord account can save.** The worker checks the Discord account on every login and
  a signed session token on every save. Hiding the login screen with F12 doesn't help: without a
  valid token the worker refuses to save.
- **After you log in**, the session token is kept in memory, and any copy saved in the browser (for
  reloads or "Stay logged in") is encrypted with a browser key that can't be exported. Logging
  out deletes both. A normal session locks itself after 30 minutes without activity, and expires
  after 12 hours ("Stay logged in": 30 days).
- **Log out everywhere** (Account section) instantly ends every session on every device.
- **If the Lanyard key leaks:** DM the Lanyard bot `.apikey` and update `LANYARD_KEY` in Cloudflare.
- **Both pages block outside scripts** (Content-Security-Policy), the panel won't run inside
  another site's frame, and its live preview runs in a sealed-off sandbox.
- **Turn on two-factor authentication** for your Discord, GitHub and Cloudflare accounts. Anyone in
  them could get into the panel or change its code.

## Changing the bio from Discord
The bio and pronouns can also be set by DMing the Lanyard bot:

```
.set bio your bio text here
.set pronouns he/him
```

`.del bio` removes it.

## Bio formatting
The bio uses Discord's formatting, so you can write it the same way as on Discord:
`**bold**`, `*italic*`, `__underline__`, `~~strike~~`, `||spoiler||`, `` `code` ``,
```` ```code blocks``` ````, `> quotes`, `# headings`, `-# small text`, `- lists`,
`[links](https://…)`, custom emoji `<:name:id>`, timestamps `<t:1700000000:R>` and
mentions `<@id>`. The control panel has a formatting toolbar (Ctrl+B / I / U work too) and a
timestamp maker.

## Files
- `index.html` — the profile page
- `panel.html` — the control panel
- `assets/shared.js` — settings format, defaults and validation (used by both pages)
- `assets/effects.js` — particles, cursor effects and card tilt
- `assets/markdown.js` + `assets/markdown.css` — Discord-style formatting for the bio
- `worker/` — the Discord login server (Cloudflare Worker) and its setup guide
