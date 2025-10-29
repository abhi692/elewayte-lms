// src/pages/courses/batches/BatchesTab.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Plus, MoreVertical, Search, X } from "lucide-react";

/* ------------------------ Mock data (swap with API later) ----------------- */
const ALL_BATCHES = [
  {
    id: "b01",
    courseId: "c1",
    courseName: "Digital Marketing",
    name: "Jan Batch - 1",
    startDate: "6th Jan, 2023",
    endDate: "23rd Jan, 2023",
    subject: "Digital Marketing",
    instructor: "Eshwar",
    manager: "Eshwar",
    learners: 1,
    isDefault: true,
    isOld: true,
    progress: 0,
  },
  {
    id: "b02",
    courseId: "c2",
    courseName: "Machine Learning",
    name: "DS DUMMY",
    startDate: "3rd Feb, 2023",
    endDate: "7th Feb, 2023",
    subject: "Machine Learning",
    room: "Elewayte Classroom",
    manager: "Elewayte Classroom",
    learners: 2,
    isOld: true,
    progress: 6,
  },
  {
    id: "b03",
    courseId: "c3",
    courseName: "PYTHON",
    name: "PY FEB",
    startDate: "19th Feb, 2023",
    endDate: "9th Apr, 2023",
    subject: "PYTHON",
    room: "Elewayte Classroom",
    manager: "Elewayte Classroom",
    learners: 31,
    isOld: true,
    progress: 12,
  },
  {
    id: "b04",
    courseId: "c3",
    courseName: "PYTHON",
    name: "PY MAY",
    startDate: "20th May, 2023",
    endDate: "8th Jul, 2023",
    subject: "PYTHON",
    instructor: "Yuvaraj",
    manager: "Yuvaraj",
    learners: 19,
    isOld: true,
    progress: 18,
  },
  {
    id: "b05",
    courseId: "c3",
    courseName: "PYTHON",
    name: "PY JUNE",
    startDate: "16th Jun, 2023",
    endDate: "3rd Aug, 2023",
    subject: "PYTHON",
    instructor: "Kiran",
    manager: "Kiran",
    learners: 11,
    isOld: true,
    progress: 32,
  },
];

/* ------------------------------ UI helpers -------------------------------- */
function ProgressBar({ value = 0 }) {
  const v = Math.min(Math.max(value, 0), 100);
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-2 w-32 rounded-full bg-slate-200">
        <div
          className="absolute left-0 top-0 h-2 rounded-full bg-blue-600"
          style={{ width: `${v}%` }}
        />
      </div>
      <span className="text-xs tabular-nums text-slate-600">{v}%</span>
    </div>
  );
}

function useOutsideCloser(onClose) {
  const ref = useRef(null);
  useEffect(() => {
    const md = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) onClose?.();
    };
    const esc = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("mousedown", md);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", md);
      document.removeEventListener("keydown", esc);
    };
  }, [onClose]);
  return ref;
}

/* ---------------------------- Row actions menu ---------------------------- */
function RowActions({ row, onAction }) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideCloser(() => setOpen(false));

  const Item = ({ label, action, danger }) => (
    <button
      className={`block w-full px-3 py-2 text-left text-sm hover:bg-slate-50 ${
        danger ? "text-rose-600 hover:bg-rose-50" : "text-slate-700"
      }`}
      onClick={() => {
        onAction?.(action, row);
        setOpen(false);
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="relative" ref={ref}>
      <button
        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white hover:bg-slate-50"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        aria-haspopup="menu"
        aria-expanded={open}
        title="Actions"
      >
        <MoreVertical size={16} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[115%] z-50 w-52 overflow-hidden rounded-md border border-slate-200 bg-white shadow-md"
          onClick={(e) => e.stopPropagation()}
        >
          <Item label="View Details" action="view" />
          <Item label="Edit batch" action="edit" />
          <Item label="Mark this default" action="markDefault" />
          <Item label="Mark as completed" action="markCompleted" />
          <Item label="Archive" action="archive" danger />
        </div>
      )}
    </div>
  );
}

/* ----------------------------- SlideOver panel ---------------------------- */
function CreateBatchSlideOver({ open, onClose, onCreate }) {
  // lock scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [open]);

  const ref = useOutsideCloser(onClose);

  const [form, setForm] = useState({
    name: "",
    course: "",
    curriculum: "",
    start: "",
    end: "",
    manager: "",
    manager2: "",
  });

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* scrim */}
      <div className="absolute inset-0 bg-black/40" />
      {/* panel */}
      <div
        className="absolute right-0 top-0 h-full w-full max-w-[520px] bg-white shadow-xl"
        ref={ref}
      >
        {/* header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3">
          <div>
            <div className="text-base font-semibold text-slate-900">
              Create Batch
            </div>
            <div className="text-xs text-slate-500">
              Add some basic details to create your batch.
            </div>
          </div>
          <button
            className="rounded-md p-2 text-slate-500 hover:bg-slate-100"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* body */}
        <div className="h-[calc(100%-112px)] overflow-y-auto px-5 pb-28 pt-4">
          <div className="mb-4 text-xs font-medium text-emerald-700">
            Basic Details
          </div>

          {/* form grid */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="mb-1 block text-sm text-slate-700">
                Batch name <span className="text-rose-600">*</span>
              </label>
              <input
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600"
                placeholder="Enter batch name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-slate-700">
                  Course <span className="text-rose-600">*</span>
                </label>
                <select
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600"
                  value={form.course}
                  onChange={(e) => update("course", e.target.value)}
                >
                  <option value="">Select course</option>
                  <option value="c1">Digital Marketing</option>
                  <option value="c2">Machine Learning</option>
                  <option value="c3">PYTHON</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-700">
                  Curriculum <span className="text-rose-600">*</span>
                </label>
                <select
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600"
                  value={form.curriculum}
                  onChange={(e) => update("curriculum", e.target.value)}
                >
                  <option value="">Add Curriculum</option>
                  <option value="default">App Curriculum</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-slate-700">
                  Start date
                </label>
                <input
                  type="date"
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600"
                  value={form.start}
                  onChange={(e) => update("start", e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-700">
                  End date
                </label>
                <input
                  type="date"
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600"
                  value={form.end}
                  onChange={(e) => update("end", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-slate-700">
                  Batch manager <span className="text-rose-600">*</span>
                </label>
                <select
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600"
                  value={form.manager}
                  onChange={(e) => update("manager", e.target.value)}
                >
                  <option value="">Select the batch manager</option>
                  <option value="eshwar">Eshwar</option>
                  <option value="yuvaraj">Yuvaraj</option>
                  <option value="kiran">Kiran</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-700">
                  Additional batch manager
                </label>
                <select
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600"
                  value={form.manager2}
                  onChange={(e) => update("manager2", e.target.value)}
                >
                  <option value="">Select the additional batch manager</option>
                  <option value="eshwar">Eshwar</option>
                  <option value="yuvaraj">Yuvaraj</option>
                  <option value="kiran">Kiran</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="pointer-events-auto absolute bottom-0 left-0 right-0 z-10 border-t border-slate-200 bg-white px-5 py-3">
          <div className="flex items-center justify-end gap-3">
            <button
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700/90"
              onClick={() => {
                onCreate?.(form);
                onClose?.();
                alert("Created (mock)"); // API_TODO
              }}
              disabled={!form.name || !form.course || !form.curriculum || !form.manager}
            >
              Create Batch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Page ----------------------------------- */
export default function BatchesTab() {
  const [q, setQ] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const rows = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return ALL_BATCHES;
    return ALL_BATCHES.filter(
      (b) =>
        b.name.toLowerCase().includes(t) ||
        b.courseName.toLowerCase().includes(t) ||
        (b.manager || "").toLowerCase().includes(t)
    );
  }, [q]);

  // # | Batch name | Course | Duration | Subject & Instructor | Manager | Progress | Actions
  const COLS =
    "56px minmax(220px,1.2fr) minmax(140px,0.9fr) minmax(180px,0.9fr) minmax(220px,1fr) minmax(150px,0.8fr) 150px 56px";

  const handleAction = (action, row) => {
    switch (action) {
      case "view":
        alert(`View details → ${row.name}`);
        break;
      case "edit":
        alert(`Edit batch → ${row.name}`);
        break;
      case "markDefault":
        alert(`Marked default → ${row.name}`);
        break;
      case "markCompleted":
        alert(`Marked completed → ${row.name}`);
        break;
      case "archive":
        if (confirm(`Archive batch "${row.name}"?`)) {
          alert("Archived (mock)");
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Batches</h2>
          <p className="text-xs text-slate-500">
            Manage batches and curriculum for your courses
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search
              size={16}
              className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by batch name…"
              className="w-64 rounded-md border border-slate-300 bg-white pl-8 pr-3 py-2 text-sm outline-none focus:border-emerald-600"
            />
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-md bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700/90"
            onClick={() => setShowCreate(true)}
          >
            <Plus size={16} />
            Create Batch
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg bg-white ring-1 ring-slate-200/60 overflow-visible">
        <div
          className="grid min-w-0 bg-slate-50 text-xs font-medium text-slate-600"
          style={{ gridTemplateColumns: COLS }}
        >
          <div className="px-3 py-2">#</div>
          <div className="px-3 py-2">Batch name</div>
          <div className="px-3 py-2">Course</div>
          <div className="px-3 py-2">Duration</div>
          <div className="px-3 py-2">Subject & Instructor</div>
          <div className="px-3 py-2">Batch manager</div>
          <div className="px-3 py-2">Batch Progress</div>
          <div className="px-3 py-2 text-right pr-3">Actions</div>
        </div>

        {rows.map((b, i) => (
          <div
            key={b.id}
            className="grid min-w-0 items-center border-t border-slate-100 hover:bg-slate-50"
            style={{ gridTemplateColumns: COLS }}
          >
            <div className="px-3 py-3 text-slate-700 tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </div>

            <div className="px-3 py-3 min-w-0">
              <div className="truncate text-sm font-medium text-slate-900" title={b.name}>
                {b.name}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                {b.isDefault && (
                  <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200">
                    DEFAULT
                  </span>
                )}
                <span>👥 {b.learners ?? 0} Learners</span>
                {b.isOld && (
                  <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800 ring-1 ring-amber-200">
                    OLD
                  </span>
                )}
              </div>
            </div>

            <div className="px-3 py-3 min-w-0">
              <div className="truncate text-sm text-slate-800" title={b.courseName}>
                {b.courseName}
              </div>
            </div>

            <div className="px-3 py-3 text-sm">
              <div className="text-slate-800">{b.startDate}</div>
              <div className="text-slate-800">{b.endDate}</div>
            </div>

            <div className="px-3 py-3 min-w-0 text-sm">
              <div
                className="truncate text-slate-800"
                title={`${b.subject}${b.instructor ? ` (${b.instructor})` : ""}`}
              >
                {b.subject}
                {b.instructor && (
                  <>
                    {" "}
                    (<span className="text-slate-700">{b.instructor}</span>)
                  </>
                )}
              </div>
              {b.room && (
                <div className="truncate text-slate-500" title={b.room}>
                  {b.room}
                </div>
              )}
            </div>

            <div className="px-3 py-3 min-w-0">
              <div className="truncate text-sm text-slate-800" title={b.manager}>
                {b.manager}
              </div>
            </div>

            <div className="px-3 py-3">
              <ProgressBar value={b.progress} />
            </div>

            <div className="px-3 py-3 flex justify-end" onClick={(e) => e.stopPropagation()}>
              <RowActions row={b} onAction={handleAction} />
            </div>
          </div>
        ))}

        {rows.length === 0 && (
          <div className="px-4 py-10 text-center text-sm text-slate-500">
            No batches found.
          </div>
        )}
      </div>

      {/* SlideOver */}
      <CreateBatchSlideOver
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreate={(data) => {
          // API_TODO: send to server
          console.log("Create batch payload:", data);
        }}
      />
    </div>
  );
}
