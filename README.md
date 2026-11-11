# Neighborhood Monopoly

Frontend-only React prototype covering both the resident discovery experience and a
merchant portal (`/merchant`). See `project.md` for full product vision, scope, and the
Maker Day 2 demo script.

## Run locally

```bash
npm install
npm run dev
```

## Stack

- React + TypeScript + Vite
- React Router (navigation, bottom tabs, merchant routes under `/merchant`)
- Zustand (shared client-side demo state, persisted to `localStorage`)
- Leaflet / React Leaflet (self-contained map, OpenStreetMap tiles)

All data is mocked locally in `src/data/`. No backend, auth, or real APIs. Reset the
demo to its deterministic starting state from Profile → Settings → Reset demo.

## Deploy (Vercel)

This is a client-rendered SPA (React Router), so all routes must fall back to
`index.html` or deep links (e.g. `/app/business/la-cabra`) and page refreshes 404.
`vercel.json` adds the required rewrite — no extra project configuration needed
beyond the default Vite build (`npm run build`, output dir `dist`).

## Photo check-in form

`src/data/checkInForm.ts` builds the pre-filled Google Form link used by the
"Check in with a photo" button. It currently points at placeholder values —
replace `CHECK_IN_FORM_BASE_URL` and `SHOP_NAME_ENTRY_ID` in that file with the
real form's URL and its "shop name" field entry ID once the form exists.
