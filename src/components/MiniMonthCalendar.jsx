// src/components/MiniMonthCalendar.jsx
import React, { useMemo } from "react";

function startOfMonth(d){ const x=new Date(d); x.setDate(1); x.setHours(0,0,0,0); return x; }
function addMonths(d,n){ const x=new Date(d); x.setMonth(x.getMonth()+n); x.setHours(0,0,0,0); return x; }
function isSameDay(a,b){ return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }
function daysInMonth(year,month){ return new Date(year, month+1, 0).getDate(); }

export default function MiniMonthCalendar({ value, onChange }) {
  const monthStart = startOfMonth(value);
  const year = monthStart.getFullYear();
  const month = monthStart.getMonth();
  const today = new Date();

  const grid = useMemo(() => {
    const firstWeekday = (new Date(year, month, 1)).getDay(); // 0=Sun
    const prevMonthDays = firstWeekday;
    const curMonthDays = daysInMonth(year, month);
    const totalCells = 42; // 6 weeks

    const cells = [];
    for (let i=0; i<totalCells; i++) {
      const dayNum = i - prevMonthDays + 1;
      let date, inCurrent = true;
      if (dayNum < 1) {
        const prev = addMonths(monthStart, -1);
        const prevTotal = daysInMonth(prev.getFullYear(), prev.getMonth());
        date = new Date(prev.getFullYear(), prev.getMonth(), prevTotal + dayNum);
        inCurrent = false;
      } else if (dayNum > curMonthDays) {
        const next = addMonths(monthStart, 1);
        date = new Date(next.getFullYear(), next.getMonth(), dayNum - curMonthDays);
        inCurrent = false;
      } else {
        date = new Date(year, month, dayNum);
      }
      cells.push({ date, inCurrent });
    }
    return cells;
  }, [monthStart, month, year]);

  const goPrev = () => onChange(addMonths(monthStart, -1));
  const goNext = () => onChange(addMonths(monthStart, 1));

  return (
    <div className="rounded-lg bg-slate-800/60 border border-slate-700">
      <div className="flex items-center justify-between px-3 py-2 text-slate-100">
        <button onClick={goPrev} className="px-2 py-1 rounded hover:bg-slate-700" aria-label="Previous month">‹</button>
        <div className="text-sm font-medium">
          {monthStart.toLocaleString("en-US", { month: "long" })} {year}
        </div>
        <button onClick={goNext} className="px-2 py-1 rounded hover:bg-slate-700" aria-label="Next month">›</button>
      </div>

      <div className="grid grid-cols-7 gap-1 px-2 pb-3">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
          <div key={d} className="text-[11px] text-slate-300 text-center py-1">{d}</div>
        ))}
        {grid.map(({date,inCurrent}) => {
          const isToday = isSameDay(date, today);
          const isSelected = isSameDay(date, value);
          return (
            <button
              key={date.toISOString()}
              onClick={() => onChange(new Date(date))}
              className={[
                "h-8 rounded text-xs transition",
                "focus:outline-none focus:ring-2 focus:ring-indigo-400/70",
                inCurrent ? "text-slate-100" : "text-slate-400",
                isSelected ? "bg-indigo-500 text-white" : "hover:bg-slate-700",
                isToday && !isSelected ? "ring-1 ring-indigo-400/60" : ""
              ].join(" ")}
              title={date.toDateString()}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
