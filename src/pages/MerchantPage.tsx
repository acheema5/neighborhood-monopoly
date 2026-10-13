import { useState } from "react";

interface Offer {
  id: string;
  title: string;
  pointsCost: number;
}

interface Redemption {
  id: string;
  customerName: string;
  offerTitle: string;
  whenLabel: string;
  confirmed: boolean;
}

const INITIAL_REDEMPTIONS: Redemption[] = [
  { id: "r1", customerName: "Alex", offerTitle: "10% off any drink", whenLabel: "2 min ago", confirmed: false },
  { id: "r2", customerName: "Jordan", offerTitle: "Free pastry with purchase", whenLabel: "18 min ago", confirmed: false },
  { id: "r3", customerName: "Sam", offerTitle: "$5 off vinyl purchase", whenLabel: "1 hr ago", confirmed: false },
];

export function MerchantPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [title, setTitle] = useState("");
  const [pointsCost, setPointsCost] = useState("");
  const [redemptions, setRedemptions] = useState<Redemption[]>(INITIAL_REDEMPTIONS);

  function handleCreateOffer(e: React.FormEvent) {
    e.preventDefault();
    const cost = Number(pointsCost);
    if (!title.trim() || !Number.isFinite(cost) || cost <= 0) return;
    setOffers((prev) => [...prev, { id: `offer-${Date.now()}`, title: title.trim(), pointsCost: cost }]);
    setTitle("");
    setPointsCost("");
  }

  function confirmRedemption(id: string) {
    setRedemptions((prev) => prev.map((r) => (r.id === id ? { ...r, confirmed: true } : r)));
  }

  return (
    <div className="merchant-page">
      <h1>Merchant Demo</h1>
      <p className="demo-disclaimer">
        Non-functional concept screen, separate from the consumer app — illustrates a possible Phase 2
        merchant-facing direction. Nothing here is wired to real business accounts or data.
      </p>

      <h2>Create an offer</h2>
      <form className="merchant-page__form" onSubmit={handleCreateOffer}>
        <input
          type="text"
          placeholder="Offer title (e.g. 10% off any drink)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Points cost"
          min={1}
          value={pointsCost}
          onChange={(e) => setPointsCost(e.target.value)}
        />
        <button type="submit" className="merchant-page__cta">
          Create Offer
        </button>
      </form>

      <ul className="merchant-page__offer-list">
        {offers.length === 0 && <li className="merchant-page__empty">No offers created yet.</li>}
        {offers.map((offer) => (
          <li key={offer.id} className="merchant-page__offer">
            <span>{offer.title}</span>
            <span className="status-pill status-pill--collected">{offer.pointsCost} pts</span>
          </li>
        ))}
      </ul>

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
    </div>
  );
}
