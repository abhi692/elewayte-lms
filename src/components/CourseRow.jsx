import { EllipsisVertical } from "lucide-react";

export default function CourseRow({ index, title, thumb, onClick, actionsDisabled }) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" ? onClick?.() : null)}
      className="grid items-center px-6 py-3 hover:bg-slate-50 border-t border-slate-100 cursor-pointer"
      style={{ gridTemplateColumns: "72px 1fr 72px" }}
    >
      <div className="text-center tabular-nums text-slate-600">{String(index).padStart(2, "0")}</div>

      <div className="flex items-center gap-3">
        <img src={thumb} alt="" className="w-10 h-10 rounded-md object-cover ring-1 ring-slate-200" />
        <div className="min-w-0">
          <div className="text-sm font-medium text-slate-900 truncate">{title}</div>
        </div>
      </div>

      <div className="flex justify-end pr-2">
        <button
          className="w-8 h-8 grid place-items-center rounded-md hover:bg-slate-100"
          onClick={(e) => {
            e.stopPropagation(); // don't navigate if actions clicked
          }}
          disabled={actionsDisabled}
        >
          <EllipsisVertical size={16} className="text-slate-500" />
        </button>
      </div>
    </div>
  );
}
