# Gulmarg Smart Ski Guide

A **phone-first web app** for the Gulmarg ski resort, accessed by scanning a QR on a
smart wristband → the QR opens a **link in the phone browser** (primarily iPhone/Safari).
It is NOT a native app and NOT a desktop site — design every screen for a single
390px-wide phone viewport, used one-handed, outdoors, in cold/glare/gloves.

## Tech stack

- **React 18 + Vite** (JavaScript/JSX, no TypeScript)
- **Tailwind CSS** for styling (tokens in `tailwind.config.js`)
- **Framer Motion** for page transitions + micro-animations
- **React Router** (`react-router-dom`) for navigation
- **lucide-react** for icons

Run: `npm install` then `npm run dev` (Vite prints a Network URL you can open on a real phone).

## The 4 features (screen map)

| Feature | Screens / routes |
|---|---|
| **F1 Scan & Activate** | `/scan` → `/activating` → `/welcome` |
| **F2 Routes & Weather** | `/routes` (mountain map) → `/routes/:id` (detail + 3h forecast) |
| **F3 Location, Safety, Strava** | `/tracking` (live radar) → `/tracking/sos` (fall→red alert) → `/tracking/summary` (Strava-style run) |
| **F4 Return & Refund** | `/return` (kiosk QR) → `/return/verify` → `/return/method` → `/return/receipt` |

## Design rules

### Color palette (Alpine Frost) — single source of truth
Use the Tailwind token names, never raw hex in components.

| Token | Hex | Use |
|---|---|---|
| `glacier` | `#3B9CE0` | Primary buttons, active nav, live paths, key data |
| `glacier-dark` | `#2B88CB` | Gradient end for primary buttons |
| `glacier-deep` | `#247AB8` | Pressed state |
| `ice` | `#BFE0F5` | Secondary accents, chip borders, focus rings |
| `frost` | `#EAF4FB` | Soft card / pill fills |
| `navy` | `#0E2A47` | All headlines + primary text (high contrast for sunlight) |
| `canvas` / `glacierwhite` | `#FFFFFF` / `#F7FAFC` | Page backgrounds |
| `perimeter` | `#E2E8F0` | Borders / dividers |
| `slope` | `#94A3B8` | Secondary metadata text |
| `safe` | `#10B981` | Open trail, "Safe", synced, green location dot |
| `caution` | `#F59E0B` | "Not recommended" / caution slots |
| `danger` | `#E11D48` | SOS, avalanche, fall-detection red dot |

**Overall look:** white / light-blue winter theme, frosted **glassmorphism** panels over maps,
lots of white space, soft shadows. Never dark-mode; this is a bright, snow-inspired UI.

### Typography
- **Inter** everywhere. Headlines 700/800 with slight negative letter-spacing.
- Numeric telemetry (temp, speed, altitude, time) uses **tabular figures**
  (`tabular-nums` / the `.nums` utility) so digits don't jitter on live updates.

### Layout & touch
- Fixed **390px** content column, centered on wider screens via the phone shell.
- Screen margin **20px**. Vertical spacing on an 8px scale.
- Touch targets **≥ 48px**, primary actions **52–56px** (glove-friendly).
- Respect iOS safe areas (`env(safe-area-inset-*)`) — the bottom nav already does.

### Navigation — ONE consistent bottom nav (do not vary per screen)
Bottom tab bar, identical on every main screen:
**My Pass · Routes · Tracking · Return**, plus a persistent **SOS** action.
Bottom tabs (not a top header) because the app is phone-first and one-handed.
The top of each screen is a **context header** (title, back, status) — not navigation.
Onboarding screens (`/scan`, `/activating`) and full-screen alerts hide the nav.

### Motion
- Page changes animate via a shared `PageTransition` (fade + subtle slide/scale).
- The active nav tab animates with a shared `layoutId` pill.
- Keep motion quick (200–350ms) and calm; respect `prefers-reduced-motion`.

## Conventions

- Reusable UI in `src/components/ui/` (Button, Card, Chip, StatTile, etc.).
- Mock data (routes, group, forecast) lives in `src/data/mock.js` — no backend yet.
- Keep raw hex out of components; add a token to `tailwind.config.js` instead and
  mirror it in the table above.
