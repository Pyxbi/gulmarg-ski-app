# Gulmarg Smart Ski Guide 🏔️❄️

Phone-first web app (opens via a QR → link, primarily iPhone) for the Gulmarg ski
resort smart wristband. React + Vite + Tailwind + Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Vite prints a **Local** and a **Network** URL. Open the Network URL on your phone
(same Wi-Fi) to test the real thing. On desktop the app renders inside a centered
phone frame.

## Build & preview

```bash
npm run build
npm run preview
```

## Deploy (to get a shareable link)

The build output in `dist/` is static — drop it on Vercel, Netlify, or Cloudflare
Pages. For SPA routing, add a catch-all rewrite to `/index.html` (Vercel/Netlify
do this automatically for Vite SPAs).

## Screens (routes)

| Feature | Route(s) |
|---|---|
| F1 Scan & Activate | `/scan` → `/activating` → `/welcome` |
| F2 Routes & Weather | `/routes` → `/routes/:id` |
| F3 Location / Safety / Strava | `/tracking` → `/tracking/sos` → `/tracking/summary` |
| F4 Return & Refund | `/return` → `/return/verify` → `/return/method` → `/return/receipt` |

Start at `/` — it redirects to `/scan` (the QR entry point).

See **CLAUDE.md** for the design system, color tokens, and conventions.
