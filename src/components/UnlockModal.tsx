import type { Business } from "../data/types";

interface UnlockModalProps {
  business: Business;
  onViewCollection: () => void;
  onBackToMap: () => void;
}

export function UnlockModal({ business, onViewCollection, onBackToMap }: UnlockModalProps) {
  return (
    <div className="unlock-modal__overlay" role="dialog" aria-modal="true">
      <div className="unlock-modal">
        <p className="unlock-modal__eyebrow">Property Unlocked!</p>
        <h2 className="unlock-modal__name">{business.name}</h2>
        <p className="unlock-modal__reward">+{business.unlockPointsBonus} bonus points</p>
        <p className="unlock-modal__coupon">Badge earned: {business.badgeTitle}</p>
        <div className="unlock-modal__actions">
          <button type="button" onClick={onViewCollection}>
            View My Collection
          </button>
          <button type="button" onClick={onBackToMap}>
            Back to Map
          </button>
        </div>
      </div>
    </div>
  );
}
