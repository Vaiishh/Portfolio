# Viggy Chat Worker — Deploy Guide

This Cloudflare Worker keeps your Groq API key safe (server-side) and proxies chat requests from the portfolio site. Free tier is more than enough — Cloudflare gives you 100K Worker requests/day, you'll use a few hundred.

## One-time setup (~10 minutes)

### 1. Get a Groq API key

1. Go to <https://console.groq.com/keys>
2. Sign up (free, no credit card)
3. Click **Create API Key**, copy it (starts with `gsk_...`)

### 2. Create a Cloudflare account

1. Go to <https://dash.cloudflare.com/sign-up>
2. Sign up (free)

### 3. Install Wrangler (Cloudflare's CLI)

```bash
npm install -g wrangler
wrangler login    # opens browser, log in once
```

### 4. Edit the allowed origins

Open `worker.js` and update the `ALLOWED_ORIGINS` array at the top. Keep `https://vaiishh.github.io` (your GitHub Pages URL) and `localhost:5173` (Vite dev). Add any custom domain you'll deploy to.

### 5. (Optional but recommended) Set up rate limiting

This stops anyone from spamming your worker and burning your Groq quota.

```bash
cd worker
wrangler kv:namespace create "RATE_KV"
```

Wrangler prints something like:
```
✨ Success!
[[kv_namespaces]]
binding = "RATE_KV"
id = "abc123def456..."
```

Copy that `id` value, open `wrangler.toml`, uncomment the `[[kv_namespaces]]` block, and paste the id in.

### 6. Set your Groq API key as a secret

```bash
cd worker
wrangler secret put GROQ_API_KEY
```

It'll prompt — paste your `gsk_...` key and hit enter. Cloudflare encrypts and stores it; it's never in your code or git.

### 7. Deploy

```bash
wrangler deploy
```

You'll get a URL like:
```
https://viggy-chat.YOUR-USERNAME.workers.dev
```

Copy that URL.

### 8. Wire it into the React app

Open `src/components/Viggy.jsx` and find the line:
```js
const CHAT_API_URL = 'https://viggy-chat.YOUR-USERNAME.workers.dev';
```
Replace it with your actual worker URL.

Commit, push, done. The chat button on Viggy now works.

## Costs

- **Groq:** Free tier — 30 req/min, 1,000 req/day on llama-3.3-70b. Your portfolio won't get close.
- **Cloudflare Workers:** Free tier — 100,000 req/day. Won't get close.
- **Cloudflare KV:** Free tier — 100K reads/day, 1K writes/day. Each chat = 2 KV writes.

For typical portfolio traffic (a few hundred chats/month), you'll never see a bill.

## Updating the worker later

Edit `worker.js`, then:
```bash
cd worker
wrangler deploy
```

That's it. Changes go live in seconds.

## Troubleshooting

**Chat returns "Origin not allowed"**
→ The site's URL isn't in `ALLOWED_ORIGINS`. Add it and redeploy.

**Chat returns 401**
→ Groq key is wrong or missing. Re-run `wrangler secret put GROQ_API_KEY`.

**Chat returns 429**
→ Rate limit hit. Either you've sent 8 messages in a minute, or 60 in a day. Wait, or raise the limits in `worker.js`.
