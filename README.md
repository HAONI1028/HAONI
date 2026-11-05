# HAONI

A real time website profile that links my actual Discord Profile and updates automatically when changes happen.

Live: https://haoni1028.github.io/HAONI/

## What updates by itself
- **Instantly** (via the [Lanyard](https://github.com/Phineas/lanyard) WebSocket): online status,
  platforms, custom status, games, Spotify, avatar, display name and colour, avatar decoration,
  nameplate, server tag, badges, bio and pronouns.
- **Within ~1 hour** (via japi.rest, which caches): banner and profile colour.

The site's look (fonts, effects, links, etc.) comes from the `site` value in Lanyard KV, saved
earlier with the old control panel. Without it, the page uses its defaults.

## Changing the bio from Discord
The bio and pronouns can be set by DMing the Lanyard bot:

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
mentions `<@id>`.

## Security
- **No secrets are stored in this repo.**
- **If your Lanyard API key ever leaks:** DM the Lanyard bot `.apikey` — that makes a new key and
  the old one stops working.
- **The page blocks outside scripts** (Content-Security-Policy).

## Files
- `index.html` — the profile page
- `assets/profile.js` — the profile's logic (live data, rendering)
- `assets/shared.js` — settings format, defaults and validation
- `assets/effects.js` — particles, cursor effects and card tilt
- `assets/markdown.js` + `assets/markdown.css` — Discord-style formatting for the bio
