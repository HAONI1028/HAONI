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

**First time:** DM the Lanyard bot `.apikey` on Discord and paste the key into the panel's
Connect section. The key stays in your browser and is only sent to Lanyard; anyone with it can
change your site, so don't share it.

Pressing **Save & publish** writes the settings to Lanyard KV, and every open copy of the site
updates instantly. Use **Export settings** for a backup.

## Changing the bio from Discord
The bio and pronouns can also be set by DMing the Lanyard bot:

```
.set bio your bio text here
.set pronouns he/him
```

`.del bio` removes it.

## Files
- `index.html` — the profile page
- `panel.html` — the control panel
- `assets/shared.js` — settings format, defaults and validation (used by both pages)
- `assets/effects.js` — particles, cursor effects and card tilt
