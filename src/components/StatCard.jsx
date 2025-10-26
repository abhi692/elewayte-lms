import { Area, AreaChart, ResponsiveContainer } from "recharts";

export default function StatCard({ title, value, delta, series }) {
  const sign = delta > 0 ? '+' : '';
  const tone =
    delta > 0 ? 'text-green-600 bg-green-50 ring-green-200'
    : delta < 0 ? 'text-rose-600 bg-rose-50 ring-rose-200'
    : 'text-slate-600 bg-slate-50 ring-slate-200';

  return (
    <div className="bg-white rounded-lg ring-1 ring-slate-200/60 shadow-sm p-4">
      <div className="text-sm text-slate-600">{title}</div>
      <div className="mt-2 flex items-center gap-2">
        <div className="text-xl font-semibold text-slate-900">{value}</div>
        <span className={`text-xs px-1.5 h-5 inline-flex items-center rounded-full ring-1 ${tone}`}>
          {sign}{delta}%
        </span>
      </div>
      <div className="mt-3 h-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series.map((v, i) => ({ i, v }))}>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.35}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke="#22c55e" fill="url(#grad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-1 text-[11px] text-slate-400">compared to last week</div>
    </div>
  );
}
