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

**Login:** the panel is password-protected. The first time you open it, DM the Lanyard bot
`.apikey` on Discord, paste the key, and choose a password. The panel encrypts the API key with
your password (PBKDF2 + AES-256-GCM) and stores only the encrypted copy on Lanyard (KV key
`panel_lock`). Logging in downloads that copy and unlocks it, so a wrong password can't unlock
it, and without the key nothing can be saved. It works from any device. Forgot the password?
Use **Forgot password?** with a fresh key from `.apikey`. Use a long password: the encrypted copy
is public, so a short one could be guessed offline.

Pressing **Save & publish** writes the settings to Lanyard KV, and every open copy of the site
updates instantly. Use **Export settings** for a backup.

## Security
- **No secrets are stored in this repo.** The only secret is your Lanyard API key, and it only
  exists encrypted (in Lanyard KV, `panel_lock`) or in your own browser after you log in. It can
  only change this site's Lanyard data; it can't access your Discord account.
- **If the key ever leaks:** DM the Lanyard bot `.apikey` — that makes a new key and the old one
  stops working. Then open the panel, click **Forgot password?**, and set it up with the new key.
  (Every `.apikey` replaces the key, so do this whenever you run it.)
- **After you log in**, the key is kept in memory, and any copy saved in the browser (for reloads
  or "Stay logged in") is encrypted with a browser key that can't be exported, so copying it from
  F12 → Application is useless on another computer. Logging out deletes both. A normal session
  locks itself after 30 minutes without activity. Still: someone using your *logged-in* browser
  can act as you, so only tick "Stay logged in" on your own device.
- **Log out everywhere** (Account section) signs the panel out on every device. Changing your
  password does the same for your other devices. This ends panel sessions; if you think the API
  key itself was copied, also DM `.apikey` and use **Forgot password?**.
- **Both pages block outside scripts** (Content-Security-Policy), the panel won't run inside
  another site's frame, and its live preview runs in a sealed-off sandbox.
- **Use a long, unique password** — anyone can download the encrypted key and try guesses offline.
- **Turn on two-factor authentication for your GitHub account**: anyone who can push to this
  repo could change the panel's code.

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
