import { useParams } from "react-router-dom";
import { useBusiness } from "../hooks/useBusinesses";
import { useAppStore } from "../store/useAppStore";
import { MerchantBackLink } from "../components/MerchantBackLink";

export function MerchantRedemptionsPage() {
  const { businessId } = useParams();
  const business = useBusiness(businessId);
  const confirmRedemption = useAppStore((s) => s.confirmRedemption);
  const isPending = useAppStore((s) =>
    business ? s.pendingRedemptionBusinessIds.includes(business.id) : false,
  );
  const isRedeemed = useAppStore((s) =>
    business ? s.redeemedRewardBusinessIds.includes(business.id) : false,
  );

  if (!business) {
    return <p>Business not found.</p>;
  }

  return (
    <div className="merchant-page">
      <MerchantBackLink businessId={business.id} businessName={business.name} />

      <h1>Redemptions</h1>
      <p>Confirm a resident's reward in person once they show you their request.</p>

      <ul className="merchant-page__redemption-list">
        {isPending && (
          <li className="merchant-page__redemption">
            <div>
              <strong>Reward requested: "{business.reward.title}"</strong>
              <span>Awaiting your confirmation</span>
            </div>
            <button type="button" onClick={() => confirmRedemption(business!.id)}>
              Confirm redemption
            </button>
          </li>
        )}
        {isRedeemed && (
          <li className="merchant-page__redemption">
            <div>
              <strong>Reward confirmed: "{business.reward.title}"</strong>
            </div>
            <span className="status-pill status-pill--collected">Confirmed</span>
          </li>
        )}
        {!isPending && !isRedeemed && (
          <li className="merchant-page__empty">No pending redemptions right now.</li>
        )}
      </ul>
    </div>
  );
}
