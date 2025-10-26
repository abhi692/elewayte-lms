export default function ChartCard({ title, children, right }) {
  return (
    <div className="bg-white rounded-lg ring-1 ring-slate-200/60 shadow-sm">
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200/60">
        <div className="text-sm font-medium text-slate-700">{title}</div>
        {right ? <div className="flex items-center gap-2">{right}</div> : null}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
