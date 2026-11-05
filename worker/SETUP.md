# Setting up Discord login for the control panel

The panel's login server is a small, free **Cloudflare Worker** (`worker.js` in this folder).
It holds your Lanyard API key, does the Discord login, and only lets **your** Discord
account save changes. Takes about 10 minutes.

## 1. Get a fresh Lanyard API key

On Discord, DM the Lanyard bot: `.apikey`

Copy the key it sends (it starts with `lnyd_`). This also cancels your old key, so any old
copies of it stop working.

## 2. Create the Cloudflare Worker

1. Sign up (free) at <https://dash.cloudflare.com/sign-up>.
2. Go to **Workers & Pages → Create → Create Worker**. Name it `haoni-panel` and press **Deploy**.
3. Press **Edit code**, delete what's there, paste everything from `worker.js`, and press **Deploy**.
4. Note your worker's address, shown at the top. It looks like
   `https://haoni-panel.YOURNAME.workers.dev`

## 3. Create a Discord app

1. Go to <https://discord.com/developers/applications> → **New Application**, and name it
   something like `HAONI panel`.
2. Open **OAuth2**.
   - Copy the **Client ID**.
   - Press **Reset Secret** and copy the **Client Secret**. Keep it private.
   - Under **Redirects**, add your worker's address followed by `/callback`, e.g.
     `https://haoni-panel.YOURNAME.workers.dev/callback`, then **Save Changes**.

## 4. Give the worker its settings

In Cloudflare, open your worker → **Settings → Variables and Secrets** → **Add**.

| Name | Type | Value |
|---|---|---|
| `DISCORD_CLIENT_ID` | Text | the Client ID from step 3 |
| `OWNER_ID` | Text | `955378599412764722` (your Discord user ID) |
| `PANEL_URL` | Text | `https://haoni1028.github.io/HAONI/panel.html` |
| `DISCORD_CLIENT_SECRET` | Secret | the Client Secret from step 3 |
| `LANYARD_KEY` | Secret | the Lanyard key from step 1 |
| `SESSION_SECRET` | Secret | a long random string (see below) |

For `SESSION_SECRET`, open any browser tab, press F12, and run this in the Console. Copy the
result:

```js
crypto.randomUUID() + crypto.randomUUID()
```

Press **Deploy** (or **Save and deploy**) when done. Opening your worker's address should now
say *"HAONI panel login server is running."*

## 5. Point the panel at the worker

In `assets/shared.js`, set `AUTH_SERVER` to your worker's address (no `/` at the end):

```js
const AUTH_SERVER = "https://haoni-panel.YOURNAME.workers.dev";
```

Then open the panel and press **Log in with Discord**.

## Good to know

- **Secrets stay in Cloudflare.** Never put the Lanyard key, client secret or session secret
  in this repo.
- **Log out everywhere** (in the panel) instantly ends every session. Changing
  `SESSION_SECRET` does the same.
- **If the Lanyard key leaks:** DM `.apikey` again and update `LANYARD_KEY` in Cloudflare.
- **Using the command line instead:** with [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
  installed, run `npx wrangler deploy` in this folder, then add the settings with
  `npx wrangler secret put NAME`.
