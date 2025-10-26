import { Users, Clock } from "lucide-react";
import Badge from "./Badge";
import KebabMenu from "./KebabMenu";

export default function SessionsTable({ rows }) {
  return (
    <div className="px-8 mt-4">
      <div className="relative rounded-lg bg-white ring-1 ring-slate-200/60 overflow-visible">
        {/* header */}
        <div className="grid bg-slate-50 text-xs font-medium text-slate-600"
             style={{ gridTemplateColumns: "72px 1.5fr 140px 160px 1fr 160px" }}>
          <div className="px-4 py-2">#</div>
          <div className="px-4 py-2">Sessions</div>
          <div className="px-4 py-2">Attendance</div>
          <div className="px-4 py-2">Status</div>
          <div className="px-4 py-2">Topics</div>
          <div className="px-4 py-2 text-right">Actions</div>
        </div>

        {/* rows */}
        {rows.map((s, idx) => (
          <div key={s.id}
               className="grid items-center border-t border-slate-100 hover:bg-slate-50"
               style={{ gridTemplateColumns: "72px 1.5fr 140px 160px 1fr 160px" }}>
            {/* # */}
            <div className="px-4 py-3 tabular-nums text-slate-600">{String(idx + 1).padStart(2, "0")}</div>

            {/* Session details */}
            <div className="px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="text-slate-600 text-sm flex items-center gap-1.5">
                  <Clock size={14} className="text-slate-400" />
                  {s.start} to {s.end}
                </div>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="indigo">{s.platform} MEETING</Badge>
                <div className="text-sm font-medium text-slate-900">{s.title}</div>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">{s.instructor}</div>
            </div>

            {/* Attendance */}
            <div className="px-4 py-3">
              <div className="flex items-center gap-2 text-slate-700">
                <Users size={16} className="text-slate-500" />
                <span className="text-sm">{s.attendance.signedIn}/{s.attendance.total}</span>
              </div>
            </div>

            {/* Status */}
            <div className="px-4 py-3">
              <Badge variant="neutral">{s.status}</Badge>
            </div>

            {/* Topics */}
            <div className="px-4 py-3 text-sm text-slate-700">{s.topics}</div>

            {/* Actions */}
            <div className="px-4 py-3">
              <div className="flex items-center justify-end gap-2">
                <button className="h-9 px-3 rounded-md border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50">
                  Sign in →
                </button>
                <KebabMenu />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
