// src/components/Modal.jsx
import { useEffect } from "react";

export default function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={onClose}
      />
      {/* dialog */}
      <div className="absolute inset-0 flex items-start justify-center p-4 md:p-8 overflow-auto">
        <div
          className="mt-6 w-full max-w-2xl rounded-xl bg-white shadow-2xl ring-1 ring-slate-200"
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <div className="px-5 py-4 border-b border-slate-200">
              <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            </div>
          )}
          <div className="p-5">{children}</div>
          {footer && <div className="px-5 py-4 border-t border-slate-200 bg-slate-50">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
