export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[680px] max-w-[95vw] rounded-xl shadow-lg">
        <div className="px-5 py-4 border-b font-semibold">{title}</div>
        <div className="p-5">{children}</div>
        <div className="px-5 py-3 border-t flex justify-end gap-2">
          {footer}
        </div>
      </div>
    </div>
  );
}
