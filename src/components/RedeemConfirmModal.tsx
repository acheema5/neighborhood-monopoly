import { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import type { Business } from "../data/types";

interface RedeemConfirmModalProps {
  business: Business;
  onClose: () => void;
}

export function RedeemConfirmModal({ business, onClose }: RedeemConfirmModalProps) {
  const redeemReward = useAppStore((s) => s.redeemReward);
  const [redeemed, setRedeemed] = useState(false);

  function handleConfirm() {
    redeemReward(business.id);
    setRedeemed(true);
  }

  return (
    <div className="redeem-modal__overlay" role="dialog" aria-modal="true">
      <div className="redeem-modal">
        {!redeemed ? (
          <>
            <p className="redeem-modal__eyebrow">Confirm Redemption</p>
            <h2 className="redeem-modal__name">{business.reward.title}</h2>
            <p className="redeem-modal__business">{business.name}</p>
            <p className="redeem-modal__cost">
              {business.reward.instant ? "Free with collection" : `${business.reward.pointsCost} pts`}
            </p>
            <p className="demo-disclaimer">
              Simulated redemption for this demo — no real business offer is being honored.
            </p>
            <div className="redeem-modal__actions">
              <button type="button" onClick={handleConfirm}>
                Confirm Redemption
              </button>
              <button type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="redeem-modal__eyebrow">Redeemed!</p>
            <h2 className="redeem-modal__name">{business.reward.title}</h2>
            <p className="redeem-modal__business">
              Show this screen at {business.name} (simulated).
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
