interface ConfirmModalProps {
  title: string;
  body: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ title, body, confirmLabel, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className="redeem-modal__overlay" role="dialog" aria-modal="true">
      <div className="redeem-modal">
        <h2 className="redeem-modal__name">{title}</h2>
        <p className="redeem-modal__business">{body}</p>
        <div className="redeem-modal__actions">
          <button type="button" className="redeem-modal__danger" onClick={onConfirm}>
            {confirmLabel}
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
