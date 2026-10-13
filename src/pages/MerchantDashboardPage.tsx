import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { businesses } from "../data/businesses";
import { ArrowLeftIcon } from "../components/icons";

interface MenuItem {
  id: string;
  name: string;
  priceUSD: number;
}

interface Offer {
  id: string;
  title: string;
  pointsCost: number;
  instant: boolean;
}

interface Redemption {
  id: string;
  customerName: string;
  offerTitle: string;
  whenLabel: string;
  confirmed: boolean;
}

const SUB_TABS = ["Menu", "Offers", "Redemptions"] as const;

function seedRedemptions(offerTitle: string): Redemption[] {
  return [
    { id: "r1", customerName: "Alex", offerTitle, whenLabel: "2 min ago", confirmed: false },
    { id: "r2", customerName: "Jordan", offerTitle, whenLabel: "18 min ago", confirmed: false },
    { id: "r3", customerName: "Sam", offerTitle, whenLabel: "1 hr ago", confirmed: false },
  ];
}

export function MerchantDashboardPage() {
  const { businessId } = useParams();
  const business = businesses.find((b) => b.id === businessId);

  const [subTab, setSubTab] = useState<typeof SUB_TABS[number]>("Menu");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);

  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editItemName, setEditItemName] = useState("");
  const [editItemPrice, setEditItemPrice] = useState("");

  const [offerTitle, setOfferTitle] = useState("");
  const [offerCost, setOfferCost] = useState("");
  const [offerInstant, setOfferInstant] = useState(false);
  const [editingOfferId, setEditingOfferId] = useState<string | null>(null);
  const [editOfferTitle, setEditOfferTitle] = useState("");
  const [editOfferCost, setEditOfferCost] = useState("");
  const [editOfferInstant, setEditOfferInstant] = useState(false);

  useEffect(() => {
    if (!business) return;
    setSubTab("Menu");
    setMenuItems(business.catalog.map((c) => ({ id: c.id, name: c.name, priceUSD: c.priceUSD })));
    setOffers([
      {
        id: "seed-offer",
        title: business.reward.title,
        pointsCost: business.reward.pointsCost,
        instant: !!business.reward.instant,
      },
    ]);
    setRedemptions(seedRedemptions(business.reward.title));
    setEditingItemId(null);
    setEditingOfferId(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessId]);

  if (!business) {
    return <p>Business not found.</p>;
  }

  function handleAddItem(e: FormEvent) {
    e.preventDefault();
    const price = Number(itemPrice);
    if (!itemName.trim() || !Number.isFinite(price) || price <= 0) return;
    setMenuItems((prev) => [...prev, { id: `item-${Date.now()}`, name: itemName.trim(), priceUSD: price }]);
    setItemName("");
    setItemPrice("");
  }

  function startEditItem(item: MenuItem) {
    setEditingItemId(item.id);
    setEditItemName(item.name);
    setEditItemPrice(String(item.priceUSD));
  }

  function saveEditItem(id: string) {
    const price = Number(editItemPrice);
    if (!editItemName.trim() || !Number.isFinite(price) || price <= 0) return;
    setMenuItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, name: editItemName.trim(), priceUSD: price } : i)),
    );
    setEditingItemId(null);
  }

  function deleteItem(id: string) {
    setMenuItems((prev) => prev.filter((i) => i.id !== id));
  }

  function handleAddOffer(e: FormEvent) {
    e.preventDefault();
    const cost = Number(offerCost);
    if (!offerTitle.trim() || !Number.isFinite(cost) || cost < 0) return;
    setOffers((prev) => [
      ...prev,
      { id: `offer-${Date.now()}`, title: offerTitle.trim(), pointsCost: cost, instant: offerInstant },
    ]);
    setOfferTitle("");
    setOfferCost("");
    setOfferInstant(false);
  }

  function startEditOffer(offer: Offer) {
    setEditingOfferId(offer.id);
    setEditOfferTitle(offer.title);
    setEditOfferCost(String(offer.pointsCost));
    setEditOfferInstant(offer.instant);
  }

  function saveEditOffer(id: string) {
    const cost = Number(editOfferCost);
    if (!editOfferTitle.trim() || !Number.isFinite(cost) || cost < 0) return;
    setOffers((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, title: editOfferTitle.trim(), pointsCost: cost, instant: editOfferInstant } : o,
      ),
    );
    setEditingOfferId(null);
  }

  function deleteOffer(id: string) {
    setOffers((prev) => prev.filter((o) => o.id !== id));
  }

  function confirmRedemption(id: string) {
    setRedemptions((prev) => prev.map((r) => (r.id === id ? { ...r, confirmed: true } : r)));
  }

  return (
    <div className="merchant-page">
      <Link to="/merchant" className="merchant-dashboard__switch">
        <ArrowLeftIcon /> Switch business
      </Link>

      <h1>{business.name}</h1>
      <p className="business-detail__meta">
        {business.category} · {business.address}
      </p>
      <p className="demo-disclaimer">
        Simulated merchant view for {business.name} — edits here are local to this session and do
        not change what customers see in the consumer app.
      </p>

      <div className="segmented">
        {SUB_TABS.map((t) => (
          <button
            key={t}
            type="button"
            className={t === subTab ? "segmented__item--active" : ""}
            onClick={() => setSubTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {subTab === "Menu" && (
        <>
          <h2>Add a menu item</h2>
          <form className="merchant-page__form" onSubmit={handleAddItem}>
            <input
              type="text"
              placeholder="Item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price (USD)"
              min={0.01}
              step="0.01"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            />
            <button type="submit" className="merchant-page__cta">
              Add Item
            </button>
          </form>

          <ul className="merchant-page__offer-list">
            {menuItems.length === 0 && <li className="merchant-page__empty">No menu items yet.</li>}
            {menuItems.map((item) =>
              editingItemId === item.id ? (
                <li key={item.id} className="merchant-page__offer merchant-page__offer--editing">
                  <input
                    type="text"
                    value={editItemName}
                    onChange={(e) => setEditItemName(e.target.value)}
                  />
                  <input
                    type="number"
                    min={0.01}
                    step="0.01"
                    value={editItemPrice}
                    onChange={(e) => setEditItemPrice(e.target.value)}
                  />
                  <button type="button" onClick={() => saveEditItem(item.id)}>
                    Save
                  </button>
                  <button type="button" onClick={() => setEditingItemId(null)}>
                    Cancel
                  </button>
                </li>
              ) : (
                <li key={item.id} className="merchant-page__offer">
                  <span>
                    {item.name} — ${item.priceUSD.toFixed(2)}
                  </span>
                  <span className="merchant-page__row-actions">
                    <button type="button" onClick={() => startEditItem(item)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => deleteItem(item.id)}>
                      Delete
                    </button>
                  </span>
                </li>
              ),
            )}
          </ul>
        </>
      )}

      {subTab === "Offers" && (
        <>
          <h2>Add an offer</h2>
          <form className="merchant-page__form" onSubmit={handleAddOffer}>
            <input
              type="text"
              placeholder="Offer title (e.g. 10% off any drink)"
              value={offerTitle}
              onChange={(e) => setOfferTitle(e.target.value)}
            />
            <input
              type="number"
              placeholder="Points cost"
              min={0}
              value={offerCost}
              onChange={(e) => setOfferCost(e.target.value)}
            />
            <label className="merchant-page__checkbox">
              <input
                type="checkbox"
                checked={offerInstant}
                onChange={(e) => setOfferInstant(e.target.checked)}
              />
              Instant (free with collection)
            </label>
            <button type="submit" className="merchant-page__cta">
              Create Offer
            </button>
          </form>

          <ul className="merchant-page__offer-list">
            {offers.length === 0 && <li className="merchant-page__empty">No offers created yet.</li>}
            {offers.map((offer) =>
              editingOfferId === offer.id ? (
                <li key={offer.id} className="merchant-page__offer merchant-page__offer--editing">
                  <input
                    type="text"
                    value={editOfferTitle}
                    onChange={(e) => setEditOfferTitle(e.target.value)}
                  />
                  <input
                    type="number"
                    min={0}
                    value={editOfferCost}
                    onChange={(e) => setEditOfferCost(e.target.value)}
                  />
                  <label className="merchant-page__checkbox">
                    <input
                      type="checkbox"
                      checked={editOfferInstant}
                      onChange={(e) => setEditOfferInstant(e.target.checked)}
                    />
                    Instant
                  </label>
                  <button type="button" onClick={() => saveEditOffer(offer.id)}>
                    Save
                  </button>
                  <button type="button" onClick={() => setEditingOfferId(null)}>
                    Cancel
                  </button>
                </li>
              ) : (
                <li key={offer.id} className="merchant-page__offer">
                  <span>{offer.title}</span>
                  <span className="status-pill status-pill--collected">
                    {offer.instant ? "Free with collection" : `${offer.pointsCost} pts`}
                  </span>
                  <span className="merchant-page__row-actions">
                    <button type="button" onClick={() => startEditOffer(offer)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => deleteOffer(offer.id)}>
                      Delete
                    </button>
                  </span>
                </li>
              ),
            )}
          </ul>
        </>
      )}

      {subTab === "Redemptions" && (
        <>
          <h2>Pending redemptions</h2>
          <ul className="merchant-page__redemption-list">
            {redemptions.map((r) => (
              <li key={r.id} className="merchant-page__redemption">
                <div>
                  <strong>
                    {r.customerName} redeemed "{r.offerTitle}"
                  </strong>
                  <span>{r.whenLabel}</span>
                </div>
                {r.confirmed ? (
                  <span className="status-pill status-pill--collected">Confirmed</span>
                ) : (
                  <button type="button" onClick={() => confirmRedemption(r.id)}>
                    Confirm Redemption
                  </button>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
