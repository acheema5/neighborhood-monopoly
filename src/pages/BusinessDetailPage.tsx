import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBusiness } from "../hooks/useBusinesses";
import { useAppStore } from "../store/useAppStore";
import { TaskChecklist } from "../components/TaskChecklist";
import { UnlockModal } from "../components/UnlockModal";
import { RedeemConfirmModal } from "../components/RedeemConfirmModal";
import { PlaceholderImage } from "../components/PlaceholderImage";
import { ArrowLeftIcon } from "../components/icons";

export function BusinessDetailPage() {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const business = useBusiness(businessId);

  const canCollect = useAppStore((s) => (business ? s.canCollect(business.id) : false));
  const isCollected = useAppStore((s) => (business ? s.isCollected(business.id) : false));
  const canRedeem = useAppStore((s) => (business ? s.canRedeem(business.id) : false));
  const isRedeemed = useAppStore((s) =>
    business ? s.redeemedRewardBusinessIds.includes(business.id) : false,
  );
  const isPendingRedemption = useAppStore((s) =>
    business ? s.pendingRedemptionBusinessIds.includes(business.id) : false,
  );
  const pointsBalance = useAppStore((s) => s.pointsBalance);
  const collectBusiness = useAppStore((s) => s.collectBusiness);
  const logDiscoveryView = useAppStore((s) => s.logDiscoveryView);

  const [showUnlock, setShowUnlock] = useState(false);
  const [showRedeem, setShowRedeem] = useState(false);

  useEffect(() => {
    if (business) logDiscoveryView(business.id);
  }, [business, logDiscoveryView]);

  if (!business) {
    return <p>Business not found.</p>;
  }

  function handleCollect() {
    collectBusiness(business!.id);
    setShowUnlock(true);
  }

  const earnedPoints = business.tasks.reduce((sum, t) => sum + t.points, 0);
  const statusLabel = isCollected ? "Collected" : canCollect ? "Ready to collect" : "In progress";

  return (
    <div className="business-detail">
      <div className="business-detail__image-wrap">
        <PlaceholderImage category={business.categoryGroup} className="business-detail__image" />
        <button type="button" className="business-detail__back" onClick={() => navigate(-1)} aria-label="Back">
          <ArrowLeftIcon />
        </button>
      </div>

      <h1>{business.name}</h1>
      <p className="business-detail__meta">
        {business.category} · {business.address}
      </p>
      <span className={`status-pill${isCollected ? " status-pill--collected" : ""}`}>{statusLabel}</span>

      <p>{business.description}</p>

      <h2>{business.catalogLabel}</h2>
      <ul className="business-detail__catalog">
        {business.catalog.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>${item.priceUSD.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <p className="demo-disclaimer">{business.dataStatus}</p>

      <h2>How to collect this property</h2>
      <p className="business-detail__quest-total">
        {business.tasks.length} tasks · {earnedPoints} pts total · +{business.unlockPointsBonus} bonus on unlock
      </p>
      <TaskChecklist business={business} />

      {!isCollected && (
        <button type="button" className="business-detail__cta" disabled={!canCollect} onClick={handleCollect}>
          Collect Property
        </button>
      )}

      <h2>Reward</h2>
      <p className="business-detail__reward-preview">
        {business.reward.title}
        {" · "}
        {business.reward.instant
          ? "Free with collection"
          : isCollected && !isRedeemed && !canRedeem
            ? `${business.reward.pointsCost - pointsBalance} more points needed`
            : `${business.reward.pointsCost} pts`}
      </p>
      {isCollected && (
        <button
          type="button"
          className="business-detail__cta"
          disabled={isRedeemed || isPendingRedemption || !canRedeem}
          onClick={() => setShowRedeem(true)}
        >
          {isRedeemed
            ? "Redeemed"
            : isPendingRedemption
              ? "Pending merchant confirmation"
              : "Redeem Reward"}
        </button>
      )}

      <button
        type="button"
        className="business-detail__cta business-detail__cta--secondary"
      >
        Get Directions
      </button>

      {showUnlock && (
        <UnlockModal
          business={business}
          onViewCollection={() => navigate("/collection")}
          onBackToMap={() => navigate("/")}
        />
      )}

      {showRedeem && (
        <RedeemConfirmModal business={business} onClose={() => setShowRedeem(false)} />
      )}
    </div>
  );
}
