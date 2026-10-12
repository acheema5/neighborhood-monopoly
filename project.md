# Neighborhood Monopoly — MVP Project Vision

**Project:** Cornell Tech Product Studio  
**Document:** Product direction, UX principles, and scope for the initial React prototype  
**Status:** Working vision, October 12, 2026

## 1. What we are building

Neighborhood Monopoly is a **gamified neighborhood discovery experience** that encourages people to explore, visit, and support local businesses. Imagine the effortless, design-forward discovery of a modern consumer app, paired with the exploration loop of Pokémon GO and the property-collection motivation of Monopoly. The product should feel mature, polished, and contemporary rather than like a literal board game.

Users explore nearby local businesses on a map, open a business's detail page, learn what it offers, complete simple visit-related tasks, collect that business as a virtual **property**, and earn points, badges, or coupons. They can also discover local events and track the neighborhood places they have collected.

**This is a school-project proof of concept, not a production application.** The immediate deliverable is a visually polished, navigable, frontend-only React MVP that we can walk through in a live demo. The objective is to communicate the product's experience and value, not to build real infrastructure.

## 2. Problem and opportunity

People often pass by small businesses without knowing what makes them special. Local businesses need approachable ways to become discoverable and encourage repeat visits. Neighborhood Monopoly makes local discovery feel like an adventure: nearby businesses become places to explore, everyday visits become achievable quests, and community participation becomes something users can see and celebrate.

**Core proposition:** Explore your neighborhood. Collect local places. Earn rewards. Feel part of the community.

## 3. Audience and demonstration setting

- **Primary user:** A resident, student, or visitor exploring local businesses in a neighborhood.
- **Future user:** A local business owner who wants to create a business listing, design visitor tasks and rewards, and participate in local discovery. This business-facing experience is **not part of the initial implementation** and should not distract from completing the consumer prototype.
- **Demo geography:** One small, coherent NYC neighborhood, rather than all of New York. Use **Roosevelt Island, NYC** as the proposed initial setting, unless the team chooses a more visually compelling neighborhood before implementation.
- Use a small, **hand-curated fictional/demo dataset** of roughly **8–12 neighborhood businesses** and **3–5 events**. Business names may be fictional or recognizable examples, but all offers, task completion, reward balances, and activities must be clearly understood as simulated.
- A consistent neighborhood identity matters more than geographic accuracy. The map can be a **stylized illustration**, not a real street map.

## 4. Product principles

1. **Map-first and intuitive.** The neighborhood itself is the homepage, with clear, tappable business destinations and a crisp, modern map experience.
2. **Local-first.** Small coffee shops, bookstores, restaurants, markets, and similar independent places should feel like the stars.
3. **Easy-to-understand progression.** Users should immediately understand how to unlock a place and what they get for it.
4. **Reward exploration, not just spending.** Visiting a place, attending an event, or completing a simple discovery activity can count alongside purchases.
5. **Modern consumer-product design.** Think of the restraint and clarity of Notion and the tastefully social, discovery-focused polish of Beli. The UI should be highly usable and aesthetically refined, with gamification integrated into a mature visual language.
6. **Demo over infrastructure.** A compelling, coherent click-through experience is more valuable than backend complexity.

## 5. MVP scope and constraints

### Must-have constraints

- **Frontend only:** React web application, designed primarily as a **mobile-app-style experience** viewed in a browser.
- **No backend, database, authentication, external business integrations, actual payments, real location tracking, or actual QR validation.**
- All content, state, transactions, quests, and rewards are **mocked locally**. Use static JavaScript/TypeScript objects (or local JSON) for seed data.
- All major actions should be clickable and lead to meaningful visible changes; this should feel like an interactive prototype, **not a set of disconnected static screenshots**.
- Session-level in-memory state is sufficient. Optional `localStorage` persistence and a **Reset Demo** control may help rehearsals, but are not mandatory.
- Desktop browser should show a clean mobile-width layout, rather than attempting a second fully developed desktop product.
- Use the provided image mockups **only to understand intended screen types, information hierarchy, and feature flows**. They are **not a visual-style reference**. Do not copy their storybook illustrations, cute buildings, decorative scenery, typography, or overall aesthetic.

### Out of scope

- Real map provider integration or turn-by-turn navigation
- Live GPS or proximity verification
- Camera-based QR scanning and actual receipt/purchase validation
- Real-world checkout, payments, or transferable monetary currency
- Accounts, password flows, user-generated reviews, social feeds, notifications
- Real-time events or inventory syncing
- Merchant portal, merchant onboarding, coupon administration, analytics dashboards
- Production-grade anti-fraud, security, accessibility audits, localization, scalability, or deployment architecture

## 6. Consumer experience: primary navigation

Use a persistent **bottom navigation bar** with five destinations:

1. **Explore** — interactive neighborhood map and discovery.
2. **Collection** — businesses/properties the user has unlocked or can unlock.
3. **Events** — neighborhood gatherings and featured activities.
4. **Rewards** — points, coupons, and achievement badges.
5. **Profile** — simple member profile, neighborhood progress, and mock settings.

The screenshots vary slightly in navigation wording. For consistency in this MVP, use the five tabs above and keep the same order across screens.

### A. Explore / Map (default landing page)

The primary screen is a **clean, contemporary map discovery experience**, closer in feel to a premium location-based consumer app than to an illustrated board game.

**Show:**
- A streamlined map surface with subtle streets/blocks/water, neutral land colors, and high-contrast business markers. A restrained SVG/vector map or locally mocked map view is fine. Avoid hand-drawn scenery and fantasy buildings.
- A neighborhood title and brief progress cue (e.g., `6 / 12 places collected`).
- Search bar and simple category chips: All, Food & Drink, Shopping, Arts, etc.
- Markers/icons for businesses; distinguish **collected** from **not yet collected** places.
- A selected-place preview card showing an image/illustration, business name, category, distance (mocked), current collection status, and optionally a reward teaser.

**Interactions:**
- Tap a marker to select a business and display its preview card.
- Tap the preview card to open the full Business / Property detail screen.
- Search/filter should update the visible business results or markers using mock data.
- Tapping a collected place should show its collected status and still allow visiting its detail page.
- Map exploration can be a bounded, tappable modern vector map; smooth pan/zoom is a nice-to-have, **not required**.

### B. Business / Property detail

This is the central place where discovery turns into action.

**Show:**
- Business name, category, illustrative image, short description, neighborhood/location, and mock distance.
- A brief business overview plus **sample menu, popular items, or products** as relevant. This is static seed data, not live inventory.
- Its collection status (`Not collected`, `In progress`, or `Collected`).
- A straightforward checklist explaining **how to collect/unlock this property**. Example for a coffee shop:
  1. Visit the store.
  2. Buy a drink *(simulated for the demo)*.
  3. Scan the in-store QR code *(simulated for the demo)*.
  4. Unlock the property.
- A preview of points or coupon rewards associated with completion.

**Interactions:**
- Users can mark mock visit/purchase tasks complete and use a **Simulate QR Scan** button; do not request real camera access.
- Display task progress immediately.
- When required tasks are completed, users can **Collect Property** or have it unlock automatically, provided the flow is clear.
- Show a satisfying **Property Unlocked!** success state/modal with a restrained celebratory animation, strong typography, business visual, and reward summary.
- Provide next actions: `View My Collection` and `Back to Map`.
- Include a **Get Directions** visual affordance only if it is explicitly labeled as a demo action; real routing is not needed. A simulated directions message or noncritical link is fine.

**Important:** The prototype's simulated purchase/visit/QR tasks are *not* claims that real-world actions have been verified. Make the simulated nature clear in the UX where needed.

### C. Collection / Properties

This screen should make the Monopoly inspiration clear without trying to reproduce official Monopoly artwork, branding, or board rules.

**Show:**
- Progress header, e.g. `6 / 12 properties collected in Roosevelt Island`.
- Filter chips for business categories.
- Grid/list of elegant property cards with clean photos, refined thumbnails, or tasteful graphic treatments.
- Each property has a visible locked/unlocked state.
- Optional playful rarity, set, or neighborhood-completion indicators; keep rules simple.

**Interactions:**
- Tap any property to open its business detail.
- Newly unlocked properties immediately appear as collected.
- Progress counts update when the user completes a property.

### D. Rewards

A single, coherent **mock reward wallet** that motivates neighborhood engagement.

**Show:**
- Mock points balance (the app's **non-cash in-game currency**).
- Coupons/rewards from participating businesses (e.g., `10% off a drink`, `Free pastry with purchase`).
- Earned and locked badges (e.g., `Coffee Explorer`, `Neighborhood Collector`, `Event Goer`).
- Light progress indicators toward the next milestone.

**Interactions:**
- Unlocking a property updates the points balance and potentially a badge.
- Tap reward tabs/filters: Coupons, Points, Badges.
- Tap `Use` on a sample coupon to display a **simulated redemption confirmation**, with an appropriate used state if implemented. Do not imply an actual business will honor it.

**Product rule:** Points are a mock loyalty/reward mechanic, **not cryptocurrency or money**. The idea of redeeming rewards at other businesses can be communicated as a future product direction; cross-merchant settlement is not implemented.

### E. Events

Help people connect with their community beyond individual store visits.

**Show:**
- A featured neighborhood event banner.
- Event cards for examples like a farmers market, live music night, art walk, or seasonal festival.
- Event imagery, date/time, location, category, and short summary.
- Optional category filters (All, Music, Food, Arts, Markets).

**Interactions:**
- Browse and filter events.
- Open an event detail card/page or modal with more information.
- Optionally save an event or mark a mock `Interested` state; no actual RSVP infrastructure.

### F. Profile

A minimal user identity and neighborhood progress hub.

**Show:**
- Fictional demo user avatar/name and local explorer level/title.
- Properties collected, points earned, and badges unlocked.
- A `My Neighborhood` progress panel.
- Simple mock links/actions for Collection History, Rewards, Saved Places, Settings, and Reset Demo if implemented.

**Interactions:**
- Collection/rewards shortcuts navigate to the appropriate tab.
- Settings may be a simple static panel; no real account-management functions.

## 7. Primary demo flow (should work end to end)

This is the most important user journey to support in the final prototype:

1. **Start on Explore.** Show a lively illustrated neighborhood map with several local business pins and collection progress.
2. **Choose a business.** Tap a coffee shop pin and open its preview, then its detail page.
3. **Learn about it.** Read a short description, view sample menu items, and see the tasks required to collect it.
4. **Complete the simulated tasks.** Mark `Visit store`, `Buy a drink`, then tap `Simulate QR Scan`.
5. **Unlock the property.** Show a celebratory confirmation and add it to the collection.
6. **Observe progression.** In Collection, the coffee shop is now marked collected, and the collection count increases.
7. **Check Rewards.** The points balance increases and a related reward or badge visibly changes.
8. **Explore Events.** Browse a farmers market or similar neighborhood event.
9. **View Profile.** See updated progress across the neighborhood.

All changes should be coordinated through **one shared client-side state** so the walkthrough remains consistent between screens.

## 8. Mock data and prototype logic

Seed data should be intentionally small and consistent, with enough variety to demonstrate filters, collection, and rewards.

### Suggested entities

**Neighborhood**
- `id`, `name`, `description`, optional illustration/map configuration.

**Business**
- `id`, `name`, `category`, `description`, `addressOrArea`, `distanceLabel`, `image`, `mapPosition`, `featuredItems`, `tasks`, `pointsReward`, `couponReward` (optional).

**Business task**
- `id`, `label`, `type` (`visit`, `purchase`, `qr`, `other`), `required`, `completed` (prefer completion tracked separately in app state).

**User demo state**
- `collectedBusinessIds`, `completedTaskIdsByBusiness`, `pointsBalance`, `earnedBadgeIds`, `redeemedCouponIds`, `savedEventIds`.

**Event**
- `id`, `title`, `category`, `dateTimeLabel`, `location`, `description`, `image`.

**Reward / badge**
- `id`, `title`, `description`, `type`, `associatedBusinessId` (optional), `unlockRule` or demo unlock condition.

### Consistency rules

- A property can be collected **once**. Do not award points repeatedly if a user revisits a completed flow.
- Collection totals reflect the mock business dataset and the user's current state.
- The map, business detail, Collection, Rewards, and Profile must show the **same** collected/uncollected state.
- Choose one predictable points rule (for example, completing a property awards 100 points). Record it centrally rather than hardcoding inconsistent numbers throughout the UI.
- Keep a small initial set of businesses already collected **or** start with none; either is acceptable, but seed the state intentionally so the demo has visible progression.
- Events may display illustrative dates rather than relying on live event calendars.
- A Reset Demo capability is helpful so the presentation can repeat from the starting point.

## 9. Visual design direction — modern, premium, subtly gamified

**This section supersedes the visual aesthetic of the supplied screenshots.** The screenshots help explain features and screen structure, but **we do not want the app to look like them**. Specifically, avoid the illustrated village, storybook/cartoon look, playful handwriting, cozy fantasy-map art, decorative badges everywhere, and overly cute UI.

### Overall design goal

Build something that could plausibly ship as a polished 2026 consumer app. The inspiration is **Notion's disciplined simplicity** and **Beli's sharp, modern, discovery-oriented consumer experience**. These are references for quality and feel, **not products to clone**. Use an original design system and distinct Neighborhood Monopoly identity.

The right balance is **80% sophisticated discovery app, 20% delightful game mechanics**. The app should feel cool and desirable to use even if all game elements were removed. Gamification adds motivation and moments of delight; it does not dictate the whole aesthetic.

### Visual language

- **Layout:** Clean white/off-white surfaces, generous breathing room, strong alignment, intentionally spaced sections, minimal chrome. Avoid crowded screens.
- **Typography:** Crisp contemporary sans-serif (e.g., Inter or Geist), excellent hierarchy, bold but controlled headings, understated supporting labels. No whimsical or handwritten display fonts.
- **Color:** Start with a neutral foundation (white, warm off-white, charcoal, muted grays). Choose **one distinctive accent** (such as deep cobalt, electric lime, or a carefully chosen rich green) for primary actions and progress. Use color sparingly and systematically, not a full storybook palette.
- **Cards and surfaces:** Refined cards or list rows with purposeful borders, subtle elevation, and consistent moderate corner radii. Not every element needs to be a pill or bubble.
- **Photography/art:** Favor curated local-business photography, tasteful cover images, simple editorial crops, and minimal iconography. Use consistent mock assets. No illustrated houses/landscapes as the main look.
- **Navigation:** Minimal, familiar mobile bottom tab bar, polished active state, compact icons and legible labels.
- **Map:** A modern, quiet street-map surface. Business markers should be legible, distinctive, and easy to tap. The selected business reveals a high-quality bottom preview card. The map should feel like a location product, not a cartoon board.
- **Motion:** Fast, smooth, purposeful transitions, subtle pressed/selected states, tasteful progress fill, light success feedback. Avoid excessive bouncing, confetti, or arcade effects.
- **Responsive presentation:** Mobile-first composition with exceptional spacing and tap targets. On a desktop browser, show the app cleanly at an appropriate phone-width or responsive centered layout.

### Where the game feeling lives

Gamification should come from **progression, collectible property cards, task completion, and rewards**, not childish styling.

- **Properties:** Businesses become collectibles. A collected property could receive a premium-style card treatment, numbered index, subtle stamp/check, or tasteful foil-like accent.
- **Collection:** A visually satisfying grid, meaningful completed vs. uncollected states, neighborhood set progress, and count-based milestones.
- **Tasks:** Simple, elegant checklists with satisfying completion feedback and clear progress.
- **Rewards:** A polished wallet with points, unlockable perks, and well-designed badge graphics. Badges are achievements, not a reason to clutter every screen.
- **Unlock moment:** A brief, exciting but restrained celebration, such as a property card reveal, check animation, and points increase.
- **Game vocabulary:** Terms like *Collect*, *Property*, *Unlock*, *Neighborhood progress*, and *Quest* may reinforce the concept, but UI copy should still feel natural and concise.

### Screen-specific aesthetic priorities

- **Explore:** Let the map breathe. Use a sophisticated search bar, compact category filters, clean pins, and a beautiful place-preview card.
- **Business detail:** Think editorial venue profile: strong cover image, precise information hierarchy, useful product/menu snippets, and a clear "How to collect" module.
- **Collection:** Make it feel like a thoughtfully designed collection library, not a Monopoly board screenshot.
- **Rewards:** Resemble a premium loyalty wallet rather than a game inventory screen.
- **Events:** A curated city-guide feed with compelling photos, dates, categories, and clean event cards.
- **Profile:** Understated personal stats, collection progress, and clean settings rows.

### Visual acceptance test

If someone sees only the UI, they should first think **"beautiful, modern local discovery app"** and then notice **"oh, collecting places is a fun mechanic."** They should **not** think "children's board game," "storybook mobile game," or "copy of the provided screenshots."

### How to use the supplied reference screenshots

- `image(8).png` — reference for the conceptual Explore, Business Detail, Rewards, and Events flows **only**.
- `image(9).png` — reference for screen inventory, Collection structure, unlock flow, and interaction patterns **only**.
- If these files are copied into the repository, place them under `docs/references/`.
- **When screenshots conflict with this written design direction, follow this document.** Claude Code should develop a fresh, cohesive, original UI rather than recreate the screenshots.

## 10. Suggested technical approach (guidance, not mandatory architecture)

- **React**, optionally with TypeScript, and a lightweight development setup such as Vite.
- Use simple React Router navigation or a small view/state controller. Choose the simplest solution that supports reliable back navigation and bottom tabs.
- Store mock data in local files and user progression in shared client state (Context, Zustand, or equivalent lightweight mechanism).
- Component ideas: `AppShell`, `BottomNav`, `ExploreMap`, `BusinessMarker`, `BusinessPreviewCard`, `BusinessDetail`, `TaskChecklist`, `UnlockModal`, `CollectionGrid`, `RewardWallet`, `EventList`, `ProfileView`.
- Keep the map visual **self-contained**: CSS/SVG/modern static vector map with positioned clickable markers. There is no requirement to integrate Google Maps, Mapbox, or geolocation APIs.
- Prefer small, understandable components, consistent design tokens, and data-driven screens instead of one giant component or duplicated static layouts.
- No environment secrets, remote APIs, cloud database, or server endpoint is needed.

## 11. Implementation priorities

### Phase 1 — Consumer demo (build now)

1. Build the mobile UI shell, design system, and navigation.
2. Define one neighborhood and coherent mock business/event/reward data.
3. Implement a clean modern Explore map with tappable business pins and polished business previews.
4. Implement Business Detail with mock tasks and unlock celebration.
5. Connect Collection and Rewards to the same state used by Explore.
6. Add Events and Profile.
7. Polish transitions and the scripted demo journey; verify all interactions.

### Phase 2 — Business-facing concept (plan later, do not build yet)

Potential future merchant features could include a business profile/listing editor, business menu/catalog preview, configurable visit challenges, rewards/coupon creation, and a simple participation/engagement dashboard. These are **exploratory ideas**, not settled product requirements. The team should define merchant needs and a separate business flow before planning that build.

## 12. Definition of done

The initial MVP is ready to present when:

- [ ] The React application starts locally with simple setup instructions.
- [ ] The five consumer tabs are accessible and visually consistent.
- [ ] Explore contains multiple clickable businesses on a neighborhood map.
- [ ] Business detail contains meaningful information and a functional mock task checklist.
- [ ] A user can complete tasks, unlock a business, and see a celebration.
- [ ] The collected state synchronizes across Explore, Collection, Rewards, and Profile.
- [ ] Rewards and Events have clear, interactive demo behavior.
- [ ] The app looks convincingly mobile-friendly, premium, and contemporary, with subtle gamification; it does **not** replicate the supplied screenshots' illustrated style.
- [ ] Demo flow can be restarted without changing source code.
- [ ] No functional action depends on backend services, real QR codes, real purchases, real location, or a real account.

## 13. Instructions for Claude Code when reading this document

Treat this file as the **product vision and scope source**. Before implementing, translate it into a compact set of actionable frontend requirements and an ordered build plan. Prioritize a coherent end-to-end consumer demo over breadth or technical sophistication. Make sensible product/design decisions wherever details are open, but do not silently introduce backend infrastructure or expand into a merchant dashboard in Phase 1. Keep all fake actions visibly simulated. Favor reusable components and seed data that will be easy to change during our school presentation. Treat Section 9 as the source of truth for UI design; develop a fresh visual system instead of copying screenshots.

**North star:** Someone viewing the demo should understand in under two minutes how Neighborhood Monopoly helps them discover a local business, interact with it, collect it, and get rewarded for participating in their community.
