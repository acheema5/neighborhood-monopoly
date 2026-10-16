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
