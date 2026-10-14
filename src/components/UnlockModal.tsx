import { useState } from "react";
import type { Business } from "../data/types";
import { useAppStore } from "../store/useAppStore";

interface UnlockModalProps {
  business: Business;
  onViewCollection: () => void;
  onBackToMap: () => void;
}

export function UnlockModal({ business, onViewCollection, onBackToMap }: UnlockModalProps) {
  const recordValueFeedback = useAppStore((s) => s.recordValueFeedback);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  function handleFeedback(worthIt: boolean) {
    recordValueFeedback(business.id, worthIt);
    setFeedbackGiven(true);
  }

  return (
    <div className="unlock-modal__overlay" role="dialog" aria-modal="true">
      <div className="unlock-modal">
        <p className="unlock-modal__eyebrow">Property Unlocked!</p>
        <h2 className="unlock-modal__name">{business.name}</h2>
        <p className="unlock-modal__reward">+{business.unlockPointsBonus} bonus points</p>
        <p className="unlock-modal__coupon">Badge earned: {business.badgeTitle}</p>

        {!feedbackGiven ? (
          <div className="unlock-modal__feedback">
            <p>Was collecting this property worth your time?</p>
            <div className="unlock-modal__feedback-actions">
              <button type="button" onClick={() => handleFeedback(true)}>
                👍 Worth it
              </button>
              <button type="button" onClick={() => handleFeedback(false)}>
                👎 Not really
              </button>
            </div>
          </div>
        ) : (
          <p className="unlock-modal__feedback-thanks">Thanks for the feedback!</p>
        )}

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
