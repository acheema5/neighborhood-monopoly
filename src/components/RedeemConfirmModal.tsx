import { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import type { Business } from "../data/types";

interface RedeemConfirmModalProps {
  business: Business;
  onClose: () => void;
}

export function RedeemConfirmModal({ business, onClose }: RedeemConfirmModalProps) {
  const requestRedemption = useAppStore((s) => s.requestRedemption);
  const reward = useAppStore((s) => s.getEffectiveReward(business.id)) ?? business.reward;
  const [requested, setRequested] = useState(false);

  function handleConfirm() {
    requestRedemption(business.id);
    setRequested(true);
  }

  return (
    <div className="redeem-modal__overlay" role="dialog" aria-modal="true">
      <div className="redeem-modal">
        {!requested ? (
          <>
            <p className="redeem-modal__eyebrow">Confirm redemption</p>
            <h2 className="redeem-modal__name">{reward.title}</h2>
            <p className="redeem-modal__business">{business.name}</p>
            <p className="redeem-modal__cost">
              {reward.instant ? "Free with collection" : `${reward.pointsCost} pts`}
            </p>
            <div className="redeem-modal__actions">
              <button type="button" onClick={handleConfirm}>
                Confirm redemption
              </button>
              <button type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="redeem-modal__eyebrow">Pending confirmation</p>
            <h2 className="redeem-modal__name">Show this at {business.name}</h2>
            <p className="redeem-modal__business">
              A staff member confirms your redemption before it's applied.
            </p>
            <div className="redeem-modal__actions">
              <button type="button" onClick={onClose}>
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
