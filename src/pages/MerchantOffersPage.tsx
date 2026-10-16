import { useState } from "react";
import type { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { useBusiness } from "../hooks/useBusinesses";
import { useAppStore } from "../store/useAppStore";
import { MerchantBackLink } from "../components/MerchantBackLink";
import { CheckIcon } from "../components/icons";

export function MerchantOffersPage() {
  const { businessId } = useParams();
  const business = useBusiness(businessId);
  const updateReward = useAppStore((s) => s.updateReward);
  const setRewardEnabled = useAppStore((s) => s.setRewardEnabled);

  const [rewardTitle, setRewardTitle] = useState(() => business?.reward.title ?? "");
  const [rewardCost, setRewardCost] = useState(() => String(business?.reward.pointsCost ?? 0));
  const [rewardInstant, setRewardInstant] = useState(() => !!business?.reward.instant);
  const [offerSaved, setOfferSaved] = useState(false);

  if (!business) {
    return <p>Business not found.</p>;
  }

  function handleSaveReward(e: FormEvent) {
    e.preventDefault();
    const cost = Number(rewardCost);
    if (!rewardTitle.trim() || !Number.isFinite(cost) || cost < 0) return;
    updateReward(business!.id, {
      title: rewardTitle.trim(),
      pointsCost: cost,
      mockOnly: true,
      enabled: business!.reward.enabled !== false,
      ...(rewardInstant ? { instant: true } : {}),
    });
    setOfferSaved(true);
  }

  return (
    <div className="merchant-page">
      <MerchantBackLink businessId={business.id} businessName={business.name} />

      <h1>Offers</h1>

      <div className="merchant-page__offer-toggle">
        <span>Offer is {business.reward.enabled === false ? "disabled" : "enabled"}</span>
        <button
          type="button"
          className={business.reward.enabled === false ? "toggle" : "toggle toggle--on"}
          role="switch"
          aria-checked={business.reward.enabled !== false}
          onClick={() => setRewardEnabled(business!.id, business.reward.enabled === false)}
        >
          <span className="toggle__thumb" />
        </button>
      </div>

      <form className="merchant-page__form" onSubmit={handleSaveReward}>
        <label className="merchant-page__field">
          <span>Offer title</span>
          <input
            type="text"
            placeholder="e.g. 10% off any drink"
            value={rewardTitle}
            onChange={(e) => setRewardTitle(e.target.value)}
          />
        </label>
        <label className="merchant-page__field">
          <span>Points required</span>
          <input
            type="number"
            min={0}
            value={rewardCost}
            onChange={(e) => setRewardCost(e.target.value)}
            disabled={rewardInstant}
          />
        </label>
        <label className="merchant-page__checkbox">
          <input
            type="checkbox"
            checked={rewardInstant}
            onChange={(e) => setRewardInstant(e.target.checked)}
          />
          Instant — unlocked as soon as a resident collects this business
        </label>
        <button type="submit" className="merchant-page__cta">
          Save offer
        </button>
      </form>

      {offerSaved && (
        <div className="merchant-page__save-confirm">
          <p className="merchant-page__success">
            <CheckIcon /> Saved — residents see the updated offer.
          </p>
          <MerchantBackLink businessId={business.id} businessName={business.name} variant="button" />
        </div>
      )}
    </div>
  );
}
