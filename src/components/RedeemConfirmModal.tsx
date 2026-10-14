import { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import type { Business } from "../data/types";

interface RedeemConfirmModalProps {
  business: Business;
  onClose: () => void;
}

export function RedeemConfirmModal({ business, onClose }: RedeemConfirmModalProps) {
  const requestRedemption = useAppStore((s) => s.requestRedemption);
  const recordIncrementalPurchase = useAppStore((s) => s.recordIncrementalPurchase);
  const [requested, setRequested] = useState(false);
  const [purchaseAnswered, setPurchaseAnswered] = useState(false);

  function handleConfirm() {
    requestRedemption(business.id);
    setRequested(true);
  }

  function handlePurchaseAnswer(madePurchase: boolean) {
    recordIncrementalPurchase(business.id, madePurchase);
    setPurchaseAnswered(true);
  }

  return (
    <div className="redeem-modal__overlay" role="dialog" aria-modal="true">
      <div className="redeem-modal">
        {!requested ? (
          <>
            <p className="redeem-modal__eyebrow">Confirm Redemption</p>
            <h2 className="redeem-modal__name">{business.reward.title}</h2>
            <p className="redeem-modal__business">{business.name}</p>
            <p className="redeem-modal__cost">
              {business.reward.instant ? "Free with collection" : `${business.reward.pointsCost} pts`}
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
            <p className="redeem-modal__eyebrow">Redemption requested</p>
            <h2 className="redeem-modal__name">{business.reward.title}</h2>
            <p className="redeem-modal__business">
              Show this screen at {business.name} — a staff member confirms it before points are
              finalized.
            </p>

            {!purchaseAnswered ? (
              <div className="redeem-modal__purchase-check">
                <p>Did you buy anything else during this visit?</p>
                <div className="redeem-modal__purchase-actions">
                  <button type="button" onClick={() => handlePurchaseAnswer(true)}>
                    Yes
                  </button>
                  <button type="button" onClick={() => handlePurchaseAnswer(false)}>
                    No
                  </button>
                </div>
              </div>
            ) : (
              <div className="redeem-modal__actions">
                <button type="button" onClick={onClose}>
                  Done
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
