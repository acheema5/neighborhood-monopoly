import type { Business } from "../data/types";
import { CheckIcon } from "./icons";

interface UnlockModalProps {
  business: Business;
  onViewCollection: () => void;
  onExploreMore: () => void;
}

export function UnlockModal({ business, onViewCollection, onExploreMore }: UnlockModalProps) {
  const totalPoints = business.checkInTask.points + business.unlockPointsBonus;

  return (
    <div className="unlock-modal__overlay" role="dialog" aria-modal="true">
      <div className="unlock-modal">
        <span className="unlock-modal__check">
          <CheckIcon />
        </span>
        <p className="unlock-modal__eyebrow">Property collected</p>
        <h2 className="unlock-modal__name">{business.name} collected!</h2>
        <p className="unlock-modal__reward">+{totalPoints} points</p>
        <p className="unlock-modal__coupon">Badge earned — {business.badgeTitle}</p>
        {business.reward.enabled !== false && (
          <p className="unlock-modal__unlocked-reward">Reward unlocked: {business.reward.title}</p>
        )}

        <div className="unlock-modal__actions">
          <button type="button" onClick={onViewCollection}>
            View my collection
          </button>
          <button type="button" onClick={onExploreMore}>
            Explore another business
          </button>
        </div>
      </div>
    </div>
  );
}
