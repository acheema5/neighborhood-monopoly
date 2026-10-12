import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { businesses } from "../data/businesses";
import { useAppStore } from "../store/useAppStore";
import { TaskChecklist } from "../components/TaskChecklist";
import { UnlockModal } from "../components/UnlockModal";
import { PlaceholderImage } from "../components/PlaceholderImage";

export function BusinessDetailPage() {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const business = businesses.find((b) => b.id === businessId);

  const canCollect = useAppStore((s) => (business ? s.canCollect(business.id) : false));
  const isCollected = useAppStore((s) => (business ? s.isCollected(business.id) : false));
  const canRedeem = useAppStore((s) => (business ? s.canRedeem(business.id) : false));
  const isRedeemed = useAppStore((s) =>
    business ? s.redeemedRewardBusinessIds.includes(business.id) : false,
  );
  const collectBusiness = useAppStore((s) => s.collectBusiness);
  const redeemReward = useAppStore((s) => s.redeemReward);

  const [showUnlock, setShowUnlock] = useState(false);
  const [showDirections, setShowDirections] = useState(false);

  if (!business) {
    return <p>Business not found.</p>;
  }

  function handleCollect() {
    collectBusiness(business!.id);
    setShowUnlock(true);
  }

  const earnedPoints = business.tasks.reduce(
    (sum, t) => sum + t.points,
    0,
  );

  return (
    <div className="business-detail">
      <PlaceholderImage category={business.categoryGroup} className="business-detail__image" />
      <h1>{business.name}</h1>
      <p className="business-detail__meta">
        {business.category} · {business.address}
      </p>
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

      <h2>Status: {isCollected ? "Collected" : canCollect ? "Ready to collect" : "In progress"}</h2>

      <h2>How to collect this property</h2>
      <p className="business-detail__quest-total">
        {business.tasks.length} tasks · {earnedPoints} pts total · +{business.unlockPointsBonus} bonus on unlock
      </p>
      <TaskChecklist business={business} />

      {!isCollected && (
        <button type="button" disabled={!canCollect} onClick={handleCollect}>
          Collect Property
        </button>
      )}

      <h2>Reward</h2>
      <p className="business-detail__reward-preview">
        {business.reward.title} · {business.reward.pointsCost} pts
      </p>
      {isCollected && (
        <button type="button" disabled={isRedeemed || !canRedeem} onClick={() => redeemReward(business.id)}>
          {isRedeemed ? "Redeemed" : "Redeem Reward (demo)"}
        </button>
      )}

      <button type="button" onClick={() => setShowDirections(true)}>
        Get Directions (demo)
      </button>
      {showDirections && (
        <p className="demo-disclaimer">
          Directions are simulated for this demo — no real routing is performed.
        </p>
      )}

      {showUnlock && (
        <UnlockModal
          business={business}
          onViewCollection={() => navigate("/collection")}
          onBackToMap={() => navigate("/")}
        />
      )}
    </div>
  );
}
