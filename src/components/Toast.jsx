import React from "react";

const ICONS = {
  success: "✓",
  error: "!",
  info: "i",
};

export default function ToastViewport({ toasts, onDismiss }) {
  if (!toasts.length) return null;

  return (
    <div className="toast-viewport" role="region" aria-label="Notifications">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast--${t.type}`} role="status">
          <span className="toast__icon" aria-hidden="true">
            {ICONS[t.type] || ICONS.info}
          </span>
          <span className="toast__message">{t.message}</span>
          <button
            className="toast__close"
            aria-label="Dismiss notification"
            onClick={() => onDismiss(t.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
