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
  const collectBusiness = useAppStore((s) => s.collectBusiness);

  const [showUnlock, setShowUnlock] = useState(false);

  if (!business) {
    return <p>Business not found.</p>;
  }

  function handleCollect() {
    collectBusiness(business!.id);
    setShowUnlock(true);
  }

  return (
    <div className="business-detail">
      <PlaceholderImage category={business.category} className="business-detail__image" />
      <h1>{business.name}</h1>
      <p className="business-detail__meta">
        {business.category} · {business.addressOrArea} · {business.distanceLabel}
      </p>
      <p>{business.description}</p>

      <h2>Featured</h2>
      <ul>
        {business.featuredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Status: {isCollected ? "Collected" : canCollect ? "Ready to collect" : "In progress"}</h2>

      <h2>How to collect this property</h2>
      <TaskChecklist business={business} />

      {!isCollected && (
        <button type="button" disabled={!canCollect} onClick={handleCollect}>
          Collect Property
        </button>
      )}

      <p className="business-detail__reward-preview">
        Reward: +{business.pointsReward} points
        {business.couponReward ? ` · ${business.couponReward}` : ""}
      </p>

      <button type="button" onClick={() => alert("Directions are simulated for this demo.")}>
        Get Directions (demo)
      </button>

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
