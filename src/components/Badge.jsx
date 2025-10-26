export default function Badge({ children, variant = "slate" }) {
  const map = {
    slate: "bg-slate-100 text-slate-700",
    green: "bg-green-50 text-green-700 ring-1 ring-green-200",
    amber: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    blue: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
    rose: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
    indigo: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
    purple: "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
    neutral: "bg-slate-50 text-slate-700 ring-1 ring-slate-200",
  };
  return (
    <span className={`inline-flex items-center px-2 h-6 rounded-full text-xs font-medium ${map[variant] || map.neutral}`}>
      {children}
    </span>
  );
}
