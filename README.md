# HAONI

A real time website profile that links my actual Discord Profile and updates automatically when changes happen.

Live: https://haoni1028.github.io/HAONI/

## What updates by itself
- **Instantly** (via the [Lanyard](https://github.com/Phineas/lanyard) WebSocket): online status,
  platforms, custom status, games, Spotify, avatar, display name and colour, avatar decoration,
  nameplate, server tag, badges, bio and pronouns.
- **Within ~1 hour** (via japi.rest, which caches): banner and profile colour.

## Changing the bio
Discord doesn't make "About Me" public, so the bio lives in Lanyard KV. DM the Lanyard bot:

```
.set bio your bio text here
.set pronouns he/him
```

The site updates instantly. `.del bio` removes it.

Settings (Discord ID, timezone) are in the `CONFIG` object near the bottom of `index.html`.
