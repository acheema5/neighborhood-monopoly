import { CameraIcon } from "./icons";

interface VisitConfirmModalProps {
  businessName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function VisitConfirmModal({ businessName, onCancel, onConfirm }: VisitConfirmModalProps) {
  return (
    <div className="visit-confirm-modal__overlay" role="dialog" aria-modal="true">
      <div className="visit-confirm-modal">
        <span className="visit-confirm-modal__icon">
          <CameraIcon />
        </span>
        <p className="visit-confirm-modal__eyebrow">Check-in</p>
        <h2 className="visit-confirm-modal__name">Check in at {businessName}?</h2>
        <p className="visit-confirm-modal__body">
          We'll open a short form where you can confirm your visit with a photo. Submitting opens the
          form and collects this property.
        </p>
        <div className="visit-confirm-modal__actions">
          <button type="button" onClick={onConfirm}>
            Open photo form &amp; check in
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
