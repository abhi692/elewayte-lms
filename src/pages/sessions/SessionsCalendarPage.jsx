// src/pages/sessions/SessionsCalendarPage.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import MiniMonthCalendar from "../../components/MiniMonthCalendar";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SessionsCalendarPage() {
  const calRef = useRef(null);
  const navigate = useNavigate();

  // Selected day controls both mini-calendar and FullCalendar's focus
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Toolbar state
  const [calTitle, setCalTitle] = useState("");
  const [viewName, setViewName] = useState("timeGridWeek");

  // Keep FullCalendar in sync when selectedDate changes
  useEffect(() => {
    const api = calRef.current?.getApi();
    if (api) api.gotoDate(selectedDate);
  }, [selectedDate]);

  // Demo events — replace with API later
  const events = useMemo(
    () => [
      { id: "e1", title: "Investment Banking", start: "2025-10-26T16:00:00", end: "2025-10-26T18:30:00" },
      { id: "e2", title: "Python DC SEP",     start: "2025-10-26T20:00:00", end: "2025-10-26T21:00:00" },
      { id: "e3", title: "Retail Banking",     start: "2025-10-29T18:00:00", end: "2025-10-29T19:00:00" },
      { id: "e4", title: "Banking Services",   start: "2025-10-29T19:30:00", end: "2025-10-29T20:00:00" },
      { id: "e5", title: "Soft Skills BFSI",   start: "2025-10-30T18:00:00", end: "2025-10-30T19:00:00" },
    ],
    []
  );

  // Calendar interactions
  const handleDateClick = (info) => setSelectedDate(new Date(info.dateStr));
  const handleEventClick = (info) => {
    // TODO: open drawer/modal with event details
    // info.event has .id .title .start .end etc.
  };

  // Toolbar controls
  const goPrev = () => {
    const api = calRef.current?.getApi();
    api?.prev();
    setCalTitle(api?.view?.title || "");
  };
  const goNext = () => {
    const api = calRef.current?.getApi();
    api?.next();
    setCalTitle(api?.view?.title || "");
  };
  const goToday = () => {
    setSelectedDate(new Date());
    const api = calRef.current?.getApi();
    api?.today();
    setCalTitle(api?.view?.title || "");
  };
  const setView = (v) => {
    setViewName(v);
    const api = calRef.current?.getApi();
    if (api) {
      api.changeView(v);
      setCalTitle(api.view?.title || "");
    }
  };

  return (
    <div className="h-full w-full flex gap-4 p-4">
      {/* Left rail (mini tools + filters).
          Your global LMS sidebar remains visible because App.jsx renders it outside routes. */}
      <aside className="w-72 shrink-0 bg-slate-900 text-white rounded-xl p-4">
        <button
          className="mt-4 w-full h-10 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white text-sm"
          onClick={() => navigate("/sessions/create")}
        >
          + Schedule session
        </button>

        <button
          className="mt-2 w-full h-10 rounded-md bg-slate-700/70 hover:bg-slate-700 text-white text-sm"
          onClick={() => { window.history.back(); }}
        >
          Back to home
        </button>

        {/* Mini Month Calendar */}
        <div className="mt-6">
          <MiniMonthCalendar
            value={selectedDate}
            onChange={(d) => setSelectedDate(new Date(d))}
          />
        </div>

        {/* Trainer filter (placeholder) */}
        <div className="mt-6">
          <label className="text-xs text-slate-300">Select Trainers</label>
          <select className="mt-2 w-full h-10 rounded-md bg-slate-800 text-slate-100 text-sm border border-slate-700">
            <option>All Trainers</option>
            <option>Smitha</option>
            <option>Rahul</option>
          </select>
        </div>
      </aside>

      {/* Main calendar */}
      <section className="flex-1 rounded-xl bg-white p-3 ring-1 ring-slate-200/60">
        {/* Modern sticky toolbar */}
        <div className="sticky top-0 z-10 mb-3 rounded-lg bg-white/90 backdrop-blur px-3 py-2 ring-1 ring-slate-200/60">
          <div className="flex items-center gap-3">
            {/* Left: nav controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={goToday}
                className="h-9 px-3 rounded-md border border-slate-200 bg-white text-sm hover:bg-slate-50"
              >
                Today
              </button>
              <div className="flex rounded-md overflow-hidden border border-slate-200">
                <button
                  onClick={goPrev}
                  className="h-9 w-10 grid place-items-center hover:bg-slate-50"
                  aria-label="Previous period"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={goNext}
                  className="h-9 w-10 grid place-items-center hover:bg-slate-50"
                  aria-label="Next period"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Center: title */}
            <div className="flex-1 text-center">
              <div className="text-lg font-semibold text-slate-900 tracking-tight">
                {calTitle}
              </div>
            </div>

            {/* Right: view switcher */}
            <div className="flex items-center">
              <div className="inline-flex rounded-md bg-slate-900 text-white overflow-hidden">
                <button
                  onClick={() => setView("listWeek")}
                  className={`h-9 px-3 text-sm ${viewName==="listWeek" ? "bg-indigo-500" : "hover:bg-slate-800"}`}
                >
                  list
                </button>
                <button
                  onClick={() => setView("dayGridMonth")}
                  className={`h-9 px-3 text-sm ${viewName==="dayGridMonth" ? "bg-indigo-500" : "hover:bg-slate-800"}`}
                >
                  month
                </button>
                <button
                  onClick={() => setView("timeGridWeek")}
                  className={`h-9 px-3 text-sm ${viewName==="timeGridWeek" ? "bg-indigo-500" : "hover:bg-slate-800"}`}
                >
                  week
                </button>
                <button
                  onClick={() => setView("timeGridDay")}
                  className={`h-9 px-3 text-sm ${viewName==="timeGridDay" ? "bg-indigo-500" : "hover:bg-slate-800"}`}
                >
                  day
                </button>
              </div>
            </div>
          </div>
        </div>

        <FullCalendar
          ref={calRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          initialView="timeGridWeek"
          headerToolbar={false} // we use custom toolbar above
          datesSet={(arg) => {
            setCalTitle(arg.view.title);
            setViewName(arg.view.type);
          }}
          views={{
            timeGridWeek: { slotMinTime: "06:00:00", slotMaxTime: "23:00:00" },
          }}
          height="auto"
          nowIndicator
          selectable
          selectMirror
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
        />
      </section>
    </div>
  );
}
