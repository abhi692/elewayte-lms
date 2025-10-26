import { format } from "date-fns";
import {
  Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

import ChartCard from "../components/ChartCard";
import StatCard from "../components/StatCard";
import SessionsSummaryRow from "../components/SessionsSummaryRow";
import SessionsTable from "../components/SessionsTable";
import { CalendarClock, Sparkles } from "lucide-react";
import { kpis, dau, enrollments } from "../data/dashboard";
import { sessionsSummary, sessions } from "../data/sessions";

export default function Dashboard() {
  const today = format(new Date(), "dd-MM-yyyy");

  return (
    <div className="min-h-screen bg-[var(--page-bg)]">
      {/* ===== Header (kept) ===== */}
      <div className="px-8 pt-6 pb-4 flex items-center justify-between">
        <div>
          <div className="text-2xl font-semibold text-slate-900">Welcome Abhishek!</div>
          <div className="text-sm text-slate-600">Let’s begin your journey to training excellence.</div>
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-2">
          <button className="h-9 px-3 rounded-md border border-slate-200 bg-white text-sm text-slate-700 flex items-center gap-1 hover:bg-slate-50">
            <CalendarClock size={16} className="text-slate-600" />
            Schedule Session
          </button>

          <button className="h-9 px-3 rounded-md border border-slate-200 bg-white text-sm text-slate-700 flex items-center gap-1 hover:bg-slate-50">
            <Sparkles size={16} className="text-indigo-500" />
            What’s New
          </button>
        </div>
      </div>

      {/* ===== KPI Row (kept) ===== */}
      <section className="px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <StatCard key={k.id} title={k.title} value={k.value} delta={k.delta} series={k.series} />
        ))}
      </section>

      {/* ===== Charts Row (kept) ===== */}
      <section className="px-8 mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Daily active users">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dau}>
                <CartesianGrid stroke="#eef2f7" />
                <XAxis dataKey="d" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="v" stroke="#60a5fa" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Enrollments"
          right={
            <>
              <button className="h-8 px-2 rounded-md border text-xs border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
                Signup vs Enrollments
              </button>
              <button className="h-8 px-2 rounded-md border text-xs border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
                Sales
              </button>
            </>
          }
        >
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrollments}>
                <CartesianGrid stroke="#eef2f7" />
                <XAxis dataKey="d" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="v" stroke="#34d399" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      {/* ===== Date tools (kept) ===== */}
      <section className="px-8 mt-5">
        <div className="bg-white rounded-lg ring-1 ring-slate-200/60 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="h-8 px-3 rounded-md border text-sm border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
                {today}
              </button>
              <button className="text-slate-500 text-sm px-2">◀</button>
              <button className="text-slate-500 text-sm px-2">▶</button>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 rounded-md border text-sm border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
                View Calendar
              </button>
              <button className="h-8 px-3 rounded-md border text-sm border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
                Mark as holiday
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Today's Sessions summary tiles (kept) ===== */}
      <div className="mt-3">
        <SessionsSummaryRow items={sessionsSummary} />
      </div>

      {/* ===== NEW: Sessions table (added) ===== */}
      <div className="mt-3">
        <SessionsTable rows={sessions} />
      </div>

      <div className="py-10" />
    </div>
  );
}
