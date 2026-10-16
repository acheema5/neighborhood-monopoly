# Neighborhood Monopoly — Maker Day 2 Project Vision

**Project:** Cornell Tech Product Studio
**Document:** Product direction, UX principles, and scope for the Maker Day 2 React prototype
**Status:** Working vision, October 15, 2026 — supersedes the Phase 1 (Maker Day 1) scope below

## 1. What we are building

Neighborhood Monopoly is a **gamified neighborhood discovery experience** that encourages people to explore, visit, and support local businesses. It pairs the effortless, design-forward discovery of a modern consumer app with the exploration loop of Pokémon GO and the property-collection motivation of Monopoly — without looking like a literal board game.

Residents explore East Village businesses on a map, open a business's detail page, collect it as a virtual **property** with a single simulated check-in, and earn points, badges, and rewards. They can also discover local events and track the businesses they have collected.

**This prototype now includes a second, equally real audience: the local business owner.** Maker Day 2 demonstrates both sides of the marketplace — residents discovering and collecting places, and merchants managing their listing, offers, and redemptions. **This is a school-project proof of concept, not a production application.** All content, transactions, and verification are simulated and clearly labeled as such.

## 2. Problem and opportunity

People often pass by small businesses without knowing what makes them special. Local businesses need approachable ways to become discoverable and encourage repeat visits. Neighborhood Monopoly makes local discovery feel like an adventure for residents, and gives merchants a lightweight way to see how that exploration translates into visits to their door.

**Core proposition:** Explore your neighborhood. Collect local places. Earn rewards. Feel part of the community — and give neighborhood businesses a new way to be discovered.

## 3. Audience and demonstration setting

- **Primary user:** A resident, student, or visitor exploring East Village businesses.
- **Secondary user (now in scope):** A local business owner who claims a listing, edits their profile and menu, configures a reward offer, and confirms redemptions.
- **Demo geography:** East Village, NYC. All ten businesses are real, named places; all menus, tasks, rewards, and prices are invented demo content, clearly labeled as such throughout the UI.
- **Demo dataset:** 10 East Village businesses and 3 curated demo events.

## 4. Product principles

1. **One clear journey, not fifteen average ones.** Discover → collect with a single check-in → earn a reward → (as a merchant) confirm it. Every screen supports this loop.
2. **Local-first.** The small cafes, bookstores, record shops, and boutiques of the East Village are the stars.
3. **Collecting is one step.** A single simulated QR check-in collects a property. Optional bonus activities award extra points but never block collection.
4. **Modern consumer-product design.** Warm off-white surfaces, charcoal text, a single muted forest-green accent, restrained shadows, consistent radii, Inter typography. Gamification comes from collectible cards, badges, and progress — not childish styling.
5. **Demo over infrastructure.** A compelling, coherent click-through experience is more valuable than backend complexity. No backend, auth, database, payments, or real QR/location verification exist or are implied.

## 5. MVP scope and constraints

### Must-have constraints

- **Frontend only:** React + TypeScript + Vite, styled as a mobile-app-style experience; the merchant portal may use a wider responsive layout.
- **No backend, database, authentication, external business integrations, real payments, real location tracking, or real QR validation.**
- All content and progression are mocked in `src/data/` and driven by one shared Zustand store (`localStorage`-persisted so the demo survives refreshes).
- A **Reset Demo** action (with confirmation) restores the deterministic starting state described in Section 9.

### Out of scope

- Real map provider routing, live GPS, camera-based QR scanning, or real purchase/receipt validation.
- Real accounts, authentication, or identity-verified merchant ownership claims.
- Real-time event syncing, cross-merchant settlement, or production-grade analytics.

## 6. Resident navigation

A persistent **bottom navigation bar** with four destinations: **Explore, Collection, Events, Profile.** Rewards and Badges live inside Collection as sub-tabs, with direct deep links from Profile (`/collection?tab=rewards`).

### A. Explore (default landing page)

- Neighborhood header with a collection progress cue (`X / 10 places collected`) and progress bar.
- Search bar and category chips (All, Food & Drink, Culture, Fashion).
- A Leaflet/OpenStreetMap-based map (roughly half the screen) with branded markers — dark for uncollected, forest green for collected.
- Tapping a marker reveals a bottom preview card (image, name, category, status, reward teaser); tapping the card opens the business detail page.
- A horizontally scrolling "Nearby places" row below the map gives a second, map-independent way to reach every filtered business.

### B. Business detail

The central screen where discovery turns into action.

1. Category-illustrated hero image, name, category, address, short description.
2. Reward preview card (instant vs. points-based, clearly labeled).
3. **Simulate check-in** — the single required action that collects the property. Confirms via a lightweight "simulated QR scan" modal, then shows a collected success state with points earned, badge unlocked, and reward unlocked. Re-visiting an already-collected business shows a checked-in state instead of a repeatable button — points are never re-awarded.
4. Optional bonus activities (e.g. "Discover this business", "Mark a simulated visit") — each awards a small amount of bonus points once, but none of them block collecting the property.
5. Sample menu/catalog with an explicit "illustrative, not verified" disclaimer.
6. Redeem Reward action (once collected) — opens a pending-confirmation flow (see Section 6D).
7. Get Directions — opens a simulated, clearly-labeled directions modal; no real routing.

### C. Collection

- Progress header (`X / 10 properties collected`) with a progress bar and points pill.
- **Properties** sub-tab: a two-column grid of collectible cards — category icon artwork, index number, a green stamp for collected businesses, status pill. Category filter chips.
- **Rewards** sub-tab: a wallet split into "Unlocked with collection" (instant rewards) and "Earn with points" (points-gated rewards), each showing locked/eligible/redeemed state.
- **Badges** sub-tab: a two-column badge grid with earned/locked states and live progress toward milestone badges (e.g. "2 / 3 collected" for Block Explorer).

### D. Events

Curated routes through East Village businesses (East Village Coffee Crawl, St. Marks Book & Vinyl Walk, 9th Street Style Trail). Each event card shows participating businesses as tappable chips (checked off once collected), a live collected-count, and a working "Mark Interested" toggle.

### E. Profile

A consumer-oriented explorer profile: identity, stat row (properties / points / badges), neighborhood progress, recent check-in activity, reward redemption history, and quick links into Collection and Rewards. Self-reported **Pilot feedback** (two yes/no questions) is kept in its own clearly-labeled, optional section — never presented as measured product impact. Reset Demo lives in Settings behind a confirmation dialog.

## 7. Merchant experience

Accessible from Profile → "I am a merchant", with its own shell (dark header, "Merchant Portal" label, exit back to the resident app) and a wider responsive layout on desktop.

**Onboarding:** Select neighborhood (East Village, available by default) → search and claim a business listing → merchant dashboard. All claim/verification language is explicitly labeled as simulated — no real ownership check occurs.

**Dashboard tabs**, scoped to the claimed business:

- **Profile** — edit name, category, address, description; **Save Profile** writes to shared Zustand state, shows a success confirmation, and is immediately reflected on the resident-facing business detail page (and survives refresh via persistence).
- **Menu** — add, edit, and delete catalog items.
- **Offers** — edit the reward title, points cost, and instant/points-based type; an enable/disable toggle controls whether the offer appears to residents at all.
- **Redemptions** — see a resident's pending reward request and confirm it; confirming updates the resident's reward wallet and reward history. A business can't have a reward double-confirmed — the request/confirm/redeemed states are mutually exclusive in the shared store.
- **Reports** — simulated check-ins, whether the property has been collected, and reward redemption counts. Explicitly labeled as simulated in-app activity, not verified physical visits or point-of-sale data.

## 8. Shared application state

A single Zustand store (`src/store/useAppStore.ts`, persisted to `localStorage`) is the only source of truth for both the resident and merchant experiences:

- `checkInBusiness` collects a property exactly once (idempotent), awarding check-in points + a collection bonus, logging a visit, and re-evaluating badges.
- `completeBonusTask` awards optional bonus points once per task; it never gates collection.
- `requestRedemption` / `confirmRedemption` model the resident-request → merchant-confirm redemption flow; a reward can't be redeemed twice or while disabled or insufficiently funded.
- `updateBusinessProfile`, `updateCatalog`, `updateReward`, `setRewardEnabled` are the merchant-side writes; `useBusinesses()` layers these overrides onto the base seed data everywhere a business is rendered, so resident and merchant views never diverge.
- `resetDemo` restores the deterministic starting state below.

## 9. Deterministic demo state

The app always starts (and Reset Demo always restores) from:

- East Village selected, 10 businesses loaded.
- **East Village Books already collected**; all other nine businesses, **including Coffee Project New York, not yet collected**.
- Starting points balance of 420, with "First Steps" and "Page Turner" badges already earned.
- No pending or confirmed redemptions.
- No merchant profile/menu/offer overrides.

This state is defined in `src/data/eastVillageSeed.json` (`player.initialCollectedBusinessIds`) and rebuilt by `buildInitialState()` in the store.

## 10. Maker Day 2 demo script

1. **Discover** — Land on Explore. Search/filter to show the map and category chips work. Open Coffee Project New York from the map or the nearby row.
2. **Collect** — On the business detail page, tap **Simulate check-in**, confirm in the modal. See the collected celebration (points, badge, reward unlocked).
3. **View the collection** — Open Collection → Properties. Coffee Project now shows as collected; Badges shows Coffee Scout earned.
4. **Redeem a reward** — Open Collection → Rewards, tap Redeem on the Coffee Project reward, confirm the request. Note the pending-confirmation state (not an instant claim).
5. **Browse events** — Open Events. Show the Coffee Crawl card listing Coffee Project, La Cabra, and Veniero's, with a live collected-count.
6. **Switch to the merchant portal** — From Profile, open "I am a merchant" → claim Coffee Project New York. Edit the description and tap **Save Profile** — prove it saved. Open Offers and show the offer toggle/edit. Open Redemptions, confirm the resident's pending request. Open Reports and show the recorded activity.
7. **Close the loop** — Return to the resident app. Show the reward now marked Redeemed in the wallet and reward history.

## 11. Definition of done

- [x] The app starts locally with `npm install && npm run dev`.
- [x] Explore, Collection, Events, and Profile are reachable from a persistent bottom nav; the merchant portal has its own shell reachable from Profile.
- [x] Explore shows 10 East Village businesses on a real map with working search and category filters.
- [x] Business detail collects a property with a single simulated check-in; optional bonus activities never block collection; re-checking in is a no-op.
- [x] Collected state, points, and badges stay in sync across Explore, Collection, and Profile.
- [x] Rewards distinguish instant vs. points-gated, and redemption goes through a pending → merchant-confirmed flow that updates both sides.
- [x] Merchant Save Profile, Menu edits, and Offer edits write to shared state and are reflected immediately on the resident-facing listing.
- [x] Reset Demo (with confirmation) restores the deterministic starting state; state and UI survive a hard refresh via `localStorage`.
- [x] No functional action depends on a backend, real QR codes, real purchases, real location, or a real account.
