import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBusiness } from "../hooks/useBusinesses";
import { useAppStore } from "../store/useAppStore";
import { BonusActivities } from "../components/BonusActivities";
import { UnlockModal } from "../components/UnlockModal";
import { RedeemConfirmModal } from "../components/RedeemConfirmModal";
import { VisitConfirmModal } from "../components/VisitConfirmModal";
import { PlaceholderImage } from "../components/PlaceholderImage";
import { ArrowLeftIcon, CheckIcon, MapPinIcon, QrIcon } from "../components/icons";

export function BusinessDetailPage() {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const business = useBusiness(businessId);

  const isCollected = useAppStore((s) => (business ? s.isCollected(business.id) : false));
  const canRedeem = useAppStore((s) => (business ? s.canRedeem(business.id) : false));
  const isRedeemed = useAppStore((s) =>
    business ? s.redeemedRewardBusinessIds.includes(business.id) : false,
  );
  const isPendingRedemption = useAppStore((s) =>
    business ? s.pendingRedemptionBusinessIds.includes(business.id) : false,
  );
  const pointsBalance = useAppStore((s) => s.pointsBalance);
  const reward = useAppStore((s) => (business ? s.getEffectiveReward(business.id) : undefined));
  const checkInBusiness = useAppStore((s) => s.checkInBusiness);
  const logDiscoveryView = useAppStore((s) => s.logDiscoveryView);

  const [showCheckInConfirm, setShowCheckInConfirm] = useState(false);
  const [showUnlock, setShowUnlock] = useState(false);
  const [showRedeem, setShowRedeem] = useState(false);
  const [showDirections, setShowDirections] = useState(false);

  useEffect(() => {
    if (business) logDiscoveryView(business.id);
  }, [business, logDiscoveryView]);

  if (!business) {
    return <p>Business not found.</p>;
  }

  function handleConfirmCheckIn() {
    checkInBusiness(business!.id);
    setShowCheckInConfirm(false);
    setShowUnlock(true);
  }

  const totalCheckInPoints = business.checkInTask.points + business.unlockPointsBonus;
  const rewardEnabled = reward && reward.enabled !== false;

  return (
    <div className="business-detail">
      <div className="business-detail__image-wrap">
        <PlaceholderImage
          categoryGroup={business.categoryGroup}
          rawCategory={business.category}
          className="business-detail__image"
          alt={`${business.name} category icon`}
        />
        <button type="button" className="business-detail__back" onClick={() => navigate(-1)} aria-label="Back">
          <ArrowLeftIcon />
        </button>
        {isCollected && (
          <span className="business-detail__collected-badge">
            <CheckIcon /> Collected
          </span>
        )}
      </div>

      <h1>{business.name}</h1>
      <p className="business-detail__meta">
        {business.category} · {business.address}
      </p>
      <p>{business.description}</p>

      {rewardEnabled && (
        <div className="reward-preview-card">
          <div>
            <span className="reward-preview-card__eyebrow">
              {reward!.instant ? "Unlocked on collection" : "Points reward"}
            </span>
            <strong>{reward!.title}</strong>
          </div>
          <span className="reward-preview-card__cost">
            {reward!.instant ? "Free" : `${reward!.pointsCost} pts`}
          </span>
        </div>
      )}

      {!isCollected ? (
        <div className="checkin-module">
          <p className="checkin-module__explainer">
            <QrIcon /> Collecting is one step: scan the QR code in store to check in. You'll earn{" "}
            {totalCheckInPoints} points and unlock the {business.badgeTitle} badge.
          </p>
          <button type="button" className="business-detail__cta" onClick={() => setShowCheckInConfirm(true)}>
            Check in
          </button>
        </div>
      ) : (
        <div className="checkin-module checkin-module--done">
          <CheckIcon />
          <span>Checked in — this property is in your collection.</span>
        </div>
      )}

      {business.bonusTasks.length > 0 && (
        <>
          <h2>Optional — earn bonus points</h2>
          <BonusActivities business={business} />
        </>
      )}

      <h2>{business.catalogLabel}</h2>
      <ul className="business-detail__catalog">
        {business.catalog.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>${item.priceUSD.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      {isCollected && rewardEnabled && (
        <>
          <h2>Reward</h2>
          <p className="business-detail__reward-preview">
            {reward!.title}
            {" · "}
            {reward!.instant
              ? "Free with collection"
              : !isRedeemed && !canRedeem
                ? `${Math.max(reward!.pointsCost - pointsBalance, 0)} more points needed`
                : `${reward!.pointsCost} pts`}
          </p>
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
                : "Redeem reward"}
          </button>
        </>
      )}

      <button
        type="button"
        className="business-detail__cta business-detail__cta--secondary"
        onClick={() => setShowDirections(true)}
      >
        <MapPinIcon /> Get directions
      </button>

      {showDirections && (
        <div className="redeem-modal__overlay" role="dialog" aria-modal="true" onClick={() => setShowDirections(false)}>
          <div className="redeem-modal" onClick={(e) => e.stopPropagation()}>
            <p className="redeem-modal__eyebrow">Directions</p>
            <h2 className="redeem-modal__name">{business.address}</h2>
            <div className="redeem-modal__actions">
              <button type="button" onClick={() => setShowDirections(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showCheckInConfirm && (
        <VisitConfirmModal
          businessName={business.name}
          onCancel={() => setShowCheckInConfirm(false)}
          onConfirm={handleConfirmCheckIn}
        />
      )}

      {showUnlock && (
        <UnlockModal
          business={business}
          onViewCollection={() => navigate("/app/collection")}
          onExploreMore={() => {
            setShowUnlock(false);
            navigate("/app");
          }}
        />
      )}

      {showRedeem && (
        <RedeemConfirmModal business={business} onClose={() => setShowRedeem(false)} />
      )}
    </div>
  );
}
