# Vaishnavi Srinivas — Portfolio

A React + Vite portfolio with an animated AI agent guide (Viggy), live neural-network background, and detailed deep-dives for every project.

## Tech

- **React 18** + **Vite 5**
- Single CSS file with design tokens — no Tailwind, no preprocessor
- Plain JS hooks for scroll reveal, neural canvas, token rain, active-section tracking
- All content (projects, publications, work, certs, skills, dialogue) lives in `src/data/` — easy to edit
- **AI chat (Viggy)** — slide-up chat panel powered by Groq's free `llama-3.3-70b-versatile` via a Cloudflare Worker proxy that keeps your API key safe. See `worker/README.md` for the 10-minute setup.

## Getting started

```bash
# Install dependencies
npm install

# Run the dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

## Project structure

```
.
├── index.html               # Vite entry, fonts loaded here
├── vite.config.js           # IMPORTANT: set `base` to your repo name
├── package.json
├── src/
│   ├── main.jsx             # React mount point
│   ├── App.jsx              # Top-level layout
│   ├── styles.css           # All CSS
│   ├── hooks.js             # useScrollReveal, useNeuralCanvas, useTokenRain, useActiveSection
│   ├── components/
│   │   ├── Nav.jsx
│   │   ├── Hero.jsx
│   │   ├── Ticker.jsx
│   │   ├── About.jsx
│   │   ├── Research.jsx
│   │   ├── Work.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectModal.jsx
│   │   ├── Stack.jsx
│   │   ├── Log.jsx
│   │   ├── Education.jsx
│   │   ├── Certs.jsx
│   │   ├── Contact.jsx
│   │   ├── ChatPanel.jsx    # Slide-up chat panel (Groq-powered)
│   │   └── Viggy.jsx        # The animated AI robot guide
│   └── data/
│       ├── projects.js      # 8 projects + modal deep-dives
│       ├── content.js       # publications, work, education, certs, skills, log, ID card
│       ├── viggy.js         # Per-section dialogue for Viggy
│       └── viggy-prompt.js  # System prompt with all resume facts (edit when resume changes)
├── worker/
│   ├── worker.js            # Cloudflare Worker that proxies Groq API
│   ├── wrangler.toml        # Worker config
│   └── README.md            # Step-by-step deploy guide for the chat backend
└── .github/workflows/
    └── deploy.yml           # Auto-deploy to GitHub Pages on push to main
```

## Deploying to GitHub Pages

You have two options:

### Option A — GitHub Actions (recommended, fully automatic)

1. Open `vite.config.js` and set `base` to match your repo name. If your repo is named `Portfolio`, leave it as `'/Portfolio/'`. If it's `vaiishh.github.io` (root user site), change it to `'/'`.
2. Push the project to GitHub: `git init && git add . && git commit -m "init" && git push`.
3. On GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Push any commit to `main`. The workflow in `.github/workflows/deploy.yml` will build and publish automatically. You'll see the live URL under **Actions → Deploy to GitHub Pages**.

### Option B — Manual `gh-pages` deploy

```bash
npm install --save-dev gh-pages   # already in package.json
npm run build
npm run deploy
```

This pushes the `dist` folder to a `gh-pages` branch. Then in **Settings → Pages**, set **Source** to **Deploy from branch** and pick `gh-pages`.

## Editing content

- **Projects:** `src/data/projects.js` — title, status, metrics, stack, modal sections
- **Publications, work, certs, skills, log, ID card:** `src/data/content.js`
- **Viggy's dialogue per section:** `src/data/viggy.js`
- **Viggy's chat knowledge (resume facts):** `src/data/viggy-prompt.js` — edit this whenever your resume updates and Viggy will use the new info automatically
- **Visual tokens (colors, fonts, spacing):** the `:root` block at the top of `src/styles.css`

## Setting up Viggy's chat (Groq + Cloudflare Worker)

The chat panel uses Groq's free `llama-3.3-70b` model. Your API key stays server-side on a Cloudflare Worker (free tier, ~10 minute setup). See **`worker/README.md`** for step-by-step instructions.

After deploying the worker, edit one line in `src/components/ChatPanel.jsx`:

```js
const CHAT_API_URL = 'https://viggy-chat.YOUR-USERNAME.workers.dev';
```

That's it. The chat works locally and on production.

## Notes

- Viggy responds to: hovering (scales up), clicking (shows context-aware dialogue), the cursor (eyes follow), and section changes (auto-pops-up on Research and Projects).
- Reduced motion is respected: animations disable for users with `prefers-reduced-motion: reduce`.
- All content uses `dangerouslySetInnerHTML` only for trusted data files you control — never user input.

— Vaish · Built with care in LA
