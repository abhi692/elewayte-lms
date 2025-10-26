import Badge from "./Badge";

export default function SessionsSummaryRow({ items }) {
  const tone = (t) =>
    t === "danger" ? "ring-rose-200 bg-rose-50"
    : t === "success" ? "ring-green-200 bg-green-50"
    : t === "warning" ? "ring-amber-200 bg-amber-50"
    : "ring-slate-200 bg-slate-50";

  return (
    <div className="px-8">
      <div className="rounded-lg ring-1 ring-slate-200/60 bg-white">
        <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {items.map((it, i) => (
            <div key={i} className={`rounded-md ${tone(it.tone)} px-3 py-3`}>
              <div className="text-xs text-slate-600">{it.label}</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">{it.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
