// src/pages/courses/tabs/LearnersTab.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, MoreVertical } from "lucide-react";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";

/* -------------------- Mock data (replace with API later) ------------------- */
const MOCK_BATCHES = [
  "PY MAY SP",
  "PY JUNE SP",
  "PY JULY SP",
  "PY AUGUST SP",
  "PY SEP SP",
  "Python SP - OCT",
  "Python SP Nov",
  "Python Dec SP",
];

export const MOCK_LEARNERS = [
  {
    id: "L001",
    name: "Manuguri. Venkata Raghavi Gayathri",
    roll: "# 3263",
    email: "mssgayri@gmail.com",
    phone: "+91 8501992044",
    enrolledOn: "23 Jul 2023",
    attendance: { present: 0, total: 0 },
    progress: 3,
  },
  {
    id: "L002",
    name: "Savitha. S",
    roll: "# 7669",
    email: "savithas9824@gmail.com",
    phone: "+91 7010150834",
    enrolledOn: "13 Jul 2023",
    attendance: { present: 0, total: 0 },
    progress: 0,
  },
  {
    id: "L003",
    name: "MUVVALA VANDANA",
    roll: "# 8890",
    email: "vandana34cme@gmail.com",
    phone: "+91 8074031172",
    enrolledOn: "08 Jul 2023",
    attendance: { present: 0, total: 0 },
    progress: 95,
  },
  {
    id: "L004",
    name: "Kotakonda Tharun sai",
    roll: "# 1236",
    email: "tharun.sai28402@gmail.com",
    phone: "+91 9652968204",
    enrolledOn: "03 Jun 2023",
    attendance: { present: 1, total: 1 },
    progress: 92,
  },
  {
    id: "L005",
    name: "Dandala Rupasree",
    roll: "# 1242",
    email: "rupasree7417@gmail.com",
    phone: "+91 9652537417",
    enrolledOn: "31 May 2023",
    attendance: { present: 0, total: 1 },
    progress: 3,
  },
  {
    id: "L006",
    name: "bhuvana",
    roll: "# 2728",
    email: "bhuvaneswari@elewayte.com",
    phone: "+91 9620240065",
    enrolledOn: "27 May 2023",
    attendance: { present: 0, total: 1 },
    progress: 5,
  },
];

/* ------------------------------ UI helpers -------------------------------- */
function MiniProgress({ value }) {
  const v = Math.min(Math.max(value ?? 0, 0), 100);
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-2 w-40 overflow-hidden rounded-full bg-slate-200">
        <div
          className="absolute left-0 top-0 h-2 rounded-full"
          style={{ width: `${v}%`, background: "#105132" }}
        />
      </div>
      <span className="text-xs text-slate-700 tabular-nums">{v}%</span>
    </div>
  );
}

function useOutsideCloser(setOpen) {
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [setOpen]);
  return ref;
}

function KebabMenu({ onResetPwd, onArchive }) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideCloser(setOpen);

  const Item = ({ children, onClick, danger = false }) => (
    <button
      className={`block w-full px-3 py-2 text-left text-sm hover:bg-slate-50 ${
        danger ? "text-rose-600 hover:bg-rose-50" : ""
      }`}
      onClick={() => {
        onClick?.();
        setOpen(false);
      }}
    >
      {children}
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
          className="absolute right-0 z-20 mt-1 w-44 overflow-hidden rounded-md border border-slate-200 bg-white shadow-md"
          onClick={(e) => e.stopPropagation()}
        >
          <Item onClick={onResetPwd}>Reset Password</Item>
          <Item onClick={onArchive} danger>
            Archive
          </Item>
        </div>
      )}
    </div>
  );
}

function BatchPicker({ batches, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideCloser(setOpen);
  return (
    <div className="relative inline-flex" ref={ref}>
      <button
        className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
        onClick={() => setOpen((v) => !v)}
      >
        {value}
        <ChevronDown size={16} className="ml-1 text-slate-500" />
      </button>

      {open && (
        <div className="absolute left-0 top-[115%] z-20 max-h-72 w-60 overflow-auto rounded-md border border-slate-200 bg-white text-sm shadow-md">
          {batches.map((b) => (
            <button
              key={b}
              className={`block w-full px-3 py-2 text-left hover:bg-slate-50 ${
                b === value ? "bg-slate-50" : ""
              }`}
              onClick={() => {
                onChange(b);
                setOpen(false);
              }}
            >
              {b}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* --------------------------------- Main ----------------------------------- */
export default function LearnersTab() {
  const { course } = useOutletContext() || {};
  const [selectedBatch, setSelectedBatch] = useState(MOCK_BATCHES[0]);

  const navigate = useNavigate();
  const { courseId } = useParams();

  const rows = useMemo(() => MOCK_LEARNERS, [selectedBatch]);

  const resetPwd = (row) => alert(`Reset password for: ${row.name}`);
  const archiveLearner = (row) => alert(`Archive learner: ${row.name}`);

  const COLS =
    "72px minmax(280px,1fr) minmax(280px,1fr) 160px 140px 220px 80px";

  return (
    <div className="p-5">
      {/* Toolbar */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <BatchPicker
          batches={MOCK_BATCHES}
          value={selectedBatch}
          onChange={setSelectedBatch}
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg bg-white ring-1 ring-slate-200/60">
        <div
          className="grid bg-slate-50 text-xs font-medium text-slate-600"
          style={{ gridTemplateColumns: COLS }}
        >
          <div className="px-4 py-2">Sr.</div>
          <div className="px-4 py-2">Learner name</div>
          <div className="px-4 py-2">Contact Details</div>
          <div className="px-4 py-2">Enrolled On</div>
          <div className="px-4 py-2">Attendance</div>
          <div className="px-4 py-2">Curriculum Progress</div>
          <div className="px-4 py-2 text-right pr-3">Actions</div>
        </div>

        {rows.map((r, idx) => (
          <div
            key={r.id}
            className="grid cursor-pointer items-center border-t border-slate-100 hover:bg-slate-50"
            style={{ gridTemplateColumns: COLS }}
            onClick={() =>
              navigate(`/courses/${courseId}/learners/${r.id}`, {
                state: { learner: r },
              })
            }
            title="View learner profile"
          >
            <div className="px-4 py-3 tabular-nums text-slate-700">
              {String(idx + 1).padStart(2, "0")}
            </div>

            <div className="px-4 py-3">
              <div className="text-sm font-medium text-slate-800">{r.name}</div>
              <div className="text-xs text-slate-500">{r.roll}</div>
            </div>

            <div className="px-4 py-3 text-sm">
              <div className="text-slate-800">{r.email}</div>
              <div className="text-slate-600">{r.phone}</div>
            </div>

            <div className="px-4 py-3 text-sm text-slate-800">
              {r.enrolledOn}
            </div>

            <div className="px-4 py-3 text-sm">
              <span className="text-green-700">{r.attendance.present}</span>
              <span className="text-slate-400"> / </span>
              <span className="text-slate-700">{r.attendance.total}</span>
            </div>

            <div className="px-4 py-3">
              <MiniProgress value={r.progress} />
            </div>

            <div
              className="px-3 py-3 flex justify-end"
              onClick={(e) => e.stopPropagation()}
            >
              <KebabMenu
                onResetPwd={() => resetPwd(r)}
                onArchive={() => archiveLearner(r)}
              />
            </div>
          </div>
        ))}

        {rows.length === 0 && (
          <div className="px-4 py-10 text-center text-sm text-slate-500">
            No learners in this batch.
          </div>
        )}
      </div>
    </div>
  );
}
