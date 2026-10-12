# Neighborhood Monopoly — East Village demo data

## Selected area
**East Village, Manhattan**, around St. Marks Place, East 9th Street and Tompkins Square Park. For MVP map boundaries use East 5th–13th Streets, Bowery/Third Avenue to Avenue B.

## Critical integrity note
All featured businesses and their addresses are sourced from public business listings. **Every catalog item and price below is generated for UI prototyping, not an official menu or verified inventory.** Tasks, property awards, discounts, events and rewards are fictional. None of the businesses are confirmed partners; avoid suggesting that promotions are real.

## Businesses and sample catalogs

### Coffee Project New York
- **Category:** Coffee
- **Address:** 239 E 5th St, New York, NY 10003
- **Profile:** Specialty coffee and a laid-back stop for the first property unlock.
- **Illustrative sample menu:** Espresso ($4.50); Flat White ($5.75); Honey Latte ($6.75); Cold Brew ($5.50)
- **Property quest:** Discover → demo check-in → complete your first coffee stop → simulated QR scan → unlock
- **Badge:** Coffee Scout
- **Illustrative reward:** Free espresso upgrade (demo) (300 points)

### La Cabra
- **Category:** Coffee & Bakery
- **Address:** 152 2nd Ave, New York, NY 10003
- **Profile:** A design-forward coffee and pastry destination.
- **Illustrative sample menu:** Filter Coffee ($5.50); Cappuccino ($6.00); Cardamom Bun ($6.50); Seasonal Pastry ($7.50)
- **Property quest:** Discover → demo check-in → explore a second cafe → simulated QR scan → unlock
- **Badge:** Pastry Passport
- **Illustrative reward:** 10% off a pastry (demo) (350 points)

### Veniero’s Pasticceria & Caffè
- **Category:** Bakery
- **Address:** 342 E 11th St, New York, NY 10003
- **Profile:** A classic neighborhood pastry shop.
- **Illustrative sample menu:** Cannoli ($6.00); Tiramisu Slice ($8.50); Mini Cheesecake ($7.00); Espresso ($4.00)
- **Property quest:** Discover → demo check-in → discover a neighborhood staple → simulated QR scan → unlock
- **Badge:** Historic Sweet Tooth
- **Illustrative reward:** Free mini cookie with purchase (demo) (400 points)

### East Village Books
- **Category:** Books
- **Address:** 99 St Marks Pl, New York, NY 10009
- **Profile:** Used books and the thrill of finding something unexpected.
- **Illustrative sample inventory:** Used Fiction Paperback ($9.00); Poetry Collection ($12.00); Vintage Paperback ($14.00); Mystery Pick ($10.00)
- **Property quest:** Discover → demo check-in → browse a local bookstore → simulated QR scan → unlock
- **Badge:** Page Turner
- **Illustrative reward:** $5 off a used-book purchase (demo) (450 points)

### Cafe Mogador
- **Category:** Restaurant
- **Address:** 101 St Marks Pl, New York, NY 10009
- **Profile:** Neighborhood dining with Moroccan-inspired flavors.
- **Illustrative sample menu:** Moroccan Mint Tea ($5.00); Hummus & Pita ($11.00); Chicken Tagine ($27.00); Brunch Eggs ($19.00)
- **Property quest:** Discover → demo check-in → discover a sit-down restaurant → simulated QR scan → unlock
- **Badge:** Neighborhood Table
- **Illustrative reward:** Free mint tea with entrée (demo) (500 points)

### A-1 Record Shop
- **Category:** Music
- **Address:** 439 E 6th St, New York, NY 10009
- **Profile:** Dig for vinyl and discover a new sound.
- **Illustrative sample inventory:** Used LP ($18.00); 7-inch Single ($8.00); Record Sleeve Pack ($6.00); Staff Pick LP ($24.00)
- **Property quest:** Discover → demo check-in → visit a neighborhood record store → simulated QR scan → unlock
- **Badge:** Crate Digger
- **Illustrative reward:** $5 off vinyl purchase (demo) (550 points)

### Spark Pretty
- **Category:** Vintage
- **Address:** 333 E 9th St, New York, NY 10003
- **Profile:** Playful vintage fashion with one-of-a-kind finds.
- **Illustrative sample inventory:** Vintage Graphic Tee ($28.00); Denim Jacket ($65.00); Retro Sunglasses ($22.00); Vintage Accessories ($18.00)
- **Property quest:** Discover → demo check-in → find a one-of-one piece → simulated QR scan → unlock
- **Badge:** Vintage Hunter
- **Illustrative reward:** 10% off accessories (demo) (600 points)

### Cloak & Dagger
- **Category:** Fashion
- **Address:** 334 E 9th St, New York, NY 10003
- **Profile:** An independent boutique to bring shopping into the game.
- **Illustrative sample inventory:** Everyday Top ($48.00); Tote Bag ($24.00); Statement Earrings ($32.00); Knit Layer ($88.00)
- **Property quest:** Discover → demo check-in → visit a boutique → simulated QR scan → unlock
- **Badge:** Style Explorer
- **Illustrative reward:** $10 off $75 (demo) (650 points)

### Stranded Records NYC
- **Category:** Music
- **Address:** 218 E 5th St, New York, NY 10003
- **Profile:** A second vinyl stop to make collection quests interesting.
- **Illustrative sample inventory:** Indie LP ($26.00); Jazz Reissue ($32.00); Used Record ($15.00); Vinyl Cleaning Brush ($12.00)
- **Property quest:** Discover → demo check-in → explore two music stores → simulated QR scan → unlock
- **Badge:** Side B
- **Illustrative reward:** Free protective sleeve (demo) (700 points)

### Limited to One Record Shop
- **Category:** Music
- **Address:** 221 E 10th St, New York, NY 10003
- **Profile:** A specialist record stop for dedicated collectors.
- **Illustrative sample inventory:** Rare LP ($45.00); Used Album ($20.00); 7-inch Record ($12.00); Record Storage Sleeve ($5.00)
- **Property quest:** Discover → demo check-in → complete the vinyl trail → simulated QR scan → unlock
- **Badge:** Deep Cuts
- **Illustrative reward:** 10% off a used album (demo) (750 points)

## Example events (fictional)
- **East Village Coffee Crawl** — Saturday • Demo event. Discover three neighborhood cafes and unlock a Coffee Scout badge.
- **St. Marks Book & Vinyl Walk** — Sunday • Demo event. Explore a bookstore and two record shops.
- **9th Street Style Trail** — Next weekend • Demo event. Visit two independent fashion shops and earn points.

## Suggested demo walkthrough
1. Open the East Village map; browse category filters and business markers.
2. Select Coffee Project New York; browse sample products and complete the four simulated tasks.
3. Unlock the Coffee Project property and watch the progress animation.
4. See points increase, badge earned, and the collection count update.
5. Open Rewards and redeem a mock coupon with a success modal.
6. Open Events, join a fictional neighborhood trail, and navigate to its highlighted locations.

## Frontend integration
- Use `east-village-seed.json` as the single source of truth for business cards, profiles, collection tasks, catalog, rewards, and events.
- Never silently convert sample pricing or promotions into claims about current real-world offerings.
- For the initial MVP, treat simulated QR and check-ins as buttons or modal confirmations.
- Use real street-map geometry if easily available, but do not require a backend.
- Follow the restrained modern visual language specified in project.md.
