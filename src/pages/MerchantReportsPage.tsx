import { useParams } from "react-router-dom";
import { useBusiness } from "../hooks/useBusinesses";
import { useAppStore } from "../store/useAppStore";
import { MerchantBackLink } from "../components/MerchantBackLink";

export function MerchantReportsPage() {
  const { businessId } = useParams();
  const business = useBusiness(businessId);
  const isCollected = useAppStore((s) => (business ? s.isCollected(business.id) : false));
  const isPending = useAppStore((s) =>
    business ? s.pendingRedemptionBusinessIds.includes(business.id) : false,
  );
  const isRedeemed = useAppStore((s) =>
    business ? s.redeemedRewardBusinessIds.includes(business.id) : false,
  );
  const visitCount = useAppStore((s) =>
    business ? s.visitLog.filter((v) => v.businessId === business.id).length : 0,
  );

  if (!business) {
    return <p>Business not found.</p>;
  }

  return (
    <div className="merchant-page">
      <MerchantBackLink businessId={business.id} businessName={business.name} />

      <h1>Reports</h1>

      <ul className="settings-list settings-list--readonly">
        <li>
          <span>Check-ins</span>
          <strong>{visitCount}</strong>
        </li>
        <li>
          <span>Property collected</span>
          <strong>{isCollected ? "Yes" : "Not yet"}</strong>
        </li>
        <li>
          <span>Reward redemptions</span>
          <strong>{isRedeemed ? "1 confirmed" : isPending ? "1 pending" : "0"}</strong>
        </li>
      </ul>
    </div>
  );
}
