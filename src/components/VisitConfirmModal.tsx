interface VisitConfirmModalProps {
  businessName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function VisitConfirmModal({ businessName, onCancel, onConfirm }: VisitConfirmModalProps) {
  return (
    <div className="visit-confirm-modal__overlay" role="dialog" aria-modal="true">
      <div className="visit-confirm-modal">
        <p className="visit-confirm-modal__eyebrow">Confirm Visit</p>
        <h2 className="visit-confirm-modal__name">Simulate scanning the QR code at {businessName}?</h2>
        <p className="visit-confirm-modal__body">
          This confirms your simulated visit for the demo. No real camera or QR code is used.
        </p>
        <div className="visit-confirm-modal__actions">
          <button type="button" onClick={onConfirm}>
            Simulate QR Scan
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
