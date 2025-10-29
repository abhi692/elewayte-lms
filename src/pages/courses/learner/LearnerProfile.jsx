// src/pages/courses/learner/LearnerProfile.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { MOCK_LEARNERS } from "../tabs/LearnersTab.jsx";
import { ChevronDown } from "lucide-react";

/** Example enrollments; in real app fetch per learner from backend */
const DEFAULT_ENROLLMENTS = [
  {
    sr: "01",
    course: "Python : Master the Language of the Future",
    batch: "PY MAY SP",
    batchDates: "11 May 2023 – 23 Jul 2023 · Added on 23 Jul 2023",
    attendance: { pct: 0, present: 0, total: 1 },
    progress: 3,
    archived: false,
  },
  {
    sr: "02",
    course: "Exclusive Weekend Masterclass",
    batch: "Weekend Webinar",
    batchDates: "Added on 3 Sep 2023",
    attendance: { pct: 0, present: 0, total: 84 },
    progress: 0,
    archived: false,
  },
  {
    sr: "03",
    course: "Web Development",
    batch: "WD AUG",
    batchDates: "12 Aug 2023 – 7 Oct 2023 · Added on 8 Aug 2023",
    attendance: { pct: 0, present: 0, total: 17 },
    progress: 0,
    archived: true,
  },
];

function MiniProgress({ value }) {
  const v = Math.min(Math.max(value ?? 0, 0), 100);
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-2 w-40 overflow-hidden rounded-full bg-slate-200">
        <div className="absolute left-0 top-0 h-2 rounded-full" style={{ width: `${v}%`, background: "#105132" }} />
      </div>
      <span className="text-xs text-slate-700 tabular-nums">{v}%</span>
    </div>
  );
}

/* reusable hook to close popovers on outside click + Esc */
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

/* top-right Actions dropdown */
function TopActionsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useOutsideCloser(setOpen);

  const items = [
    { key: "sendReset", label: "Send password reset link" },
    { key: "changePwd", label: "Change password" },
    { key: "updateStatus", label: "Update status" },
    { key: "clearSessions", label: "Clear Sessions" },
  ];

  const onAction = (key) => {
    alert(`Action → ${key}`);
  };

  return (
    <div className="relative z-20" ref={ref}>
      <button
        className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
        onClick={() => setOpen((v) => !v)}
      >
        Actions
        <ChevronDown size={16} className="text-slate-500" />
      </button>

      {open && (
        <div
          className="absolute right-0 top-[115%] w-60 overflow-hidden rounded-md border border-slate-200 bg-white text-sm shadow-md"
          role="menu"
        >
          {items.map((it) => (
            <button
              key={it.key}
              className="block w-full px-3 py-2 text-left hover:bg-slate-50"
              onClick={() => {
                onAction(it.key);
                setOpen(false);
              }}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LearnerProfile() {
  const { courseId, learnerId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 1) Prefer data passed from LearnersTab (fast)
  const fromState = location.state?.learner;

  // 2) Fallback for deep link: find from mock (replace with API later)
  const fromMock = useMemo(
    () => MOCK_LEARNERS.find((x) => x.id === learnerId),
    [learnerId]
  );

  // 3) Final merged learner
  const learner = useMemo(() => {
    const base =
      fromState ??
      fromMock ?? {
        id: learnerId,
        name: "Unknown Learner",
        email: "-",
        phone: "-",
        enrolledOn: "-",
        roll: "-",
        attendance: { present: 0, total: 0 },
        progress: 0,
      };
    return {
      ...base,
      registeredOn: base.enrolledOn || "—",
      regId: (base.roll || "").replace("#", "").trim() || "—",
      username: (base.name || "user").toLowerCase().replace(/\s+/g, "."),
      enrollments: DEFAULT_ENROLLMENTS,
    };
  }, [fromState, fromMock, learnerId]);

  const COLS = "72px minmax(280px,1fr) minmax(320px,1fr) 160px 240px 100px";

  return (
    <div className="p-5">
      {/* Header card */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="h-16 rounded-t-xl bg-gradient-to-r from-violet-400/70 to-indigo-400/70" />
        <div className="p-5">
          <button
            className="text-sm text-slate-600 hover:text-slate-800"
            onClick={() => navigate(`/courses/${courseId}/learners`)}
          >
            ← Back to Learners
          </button>

          <div className="mt-3 grid grid-cols-[64px_1fr_auto] items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700">
              {learner.name
                .split(" ")
                .filter(Boolean)
                .map((p) => p[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>

            <div>
              <div className="text-lg font-semibold text-slate-900">{learner.name}</div>
              <div className="mt-1 text-sm text-slate-600">
                {learner.email} · {learner.phone}
              </div>

              <div className="mt-3 grid grid-cols-[160px_160px_1fr] gap-6 text-sm text-slate-700">
                <div>
                  <div className="text-slate-500">Registered on</div>
                  <div>{learner.registeredOn}</div>
                </div>
                <div>
                  <div className="text-slate-500">Reg. ID</div>
                  <div>{learner.regId}</div>
                </div>
                <div>
                  <div className="text-slate-500">Username</div>
                  <div>{learner.username}</div>
                </div>
              </div>
            </div>

            {/* Actions area with working dropdown */}
            <div className="flex gap-2">
              <TopActionsMenu />
              <button
                className="rounded-md bg-[#105132] px-3 py-2 text-sm font-semibold text-white hover:opacity-90"
                onClick={() =>
                  navigate(`/courses/${courseId}/learners/${learner.id}/add-to-course`)
                }
                title="Add this learner to a course"
              >
                + Add to course
              </button>
            </div>
          </div>

          {/* Tabs (static UI for now) */}
          <div className="mt-6 flex gap-6 border-b border-slate-200 text-sm">
            {["Enrollments", "Admission / Fees", "Payments", "Exams", "Certificates", "Activity", "Profile"].map(
              (t, i) => (
                <button
                  key={t}
                  className={`-mb-px border-b-2 px-1 pb-2 ${
                    i === 0
                      ? "border-[#105132] text-slate-900"
                      : "border-transparent text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {t}
                </button>
              )
            )}
          </div>
        </div>

        {/* Enrollments table */}
        <div className="px-5 pb-6">
          <div
            className="grid rounded-t-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-600"
            style={{ gridTemplateColumns: COLS }}
          >
            <div className="px-4 py-2">Sr.</div>
            <div className="px-4 py-2">Course name</div>
            <div className="px-4 py-2">Batch name</div>
            <div className="px-4 py-2">Attendance</div>
            <div className="px-4 py-2">Progress</div>
            <div className="px-4 py-2 text-right pr-3">Actions</div>
          </div>

          {learner.enrollments.map((e) => (
            <div
              key={e.sr}
              className="grid items-center border-x border-b border-slate-200 hover:bg-slate-50"
              style={{ gridTemplateColumns: COLS }}
            >
              <div className="px-4 py-3 tabular-nums text-slate-700">{e.sr}</div>
              <div className="px-4 py-3 text-sm text-slate-800">{e.course}</div>
              <div className="px-4 py-3 text-sm">
                <div className="text-slate-800">{e.batch}</div>
                <div className="text-xs text-slate-500">{e.batchDates}</div>
                {e.archived && (
                  <span className="mt-1 inline-block rounded-md bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-700 ring-1 ring-rose-200">
                    ARCHIVED
                  </span>
                )}
              </div>
              <div className="px-4 py-3 text-sm">
                <span className="mr-2 rounded-full bg-amber-100 px-1.5 py-0.5 text-[11px] font-semibold text-amber-700">
                  {e.attendance.pct}%
                </span>
                <span className="text-slate-700">{e.attendance.present}</span>
                <span className="text-slate-400">/</span>
                <span className="text-slate-700">{e.attendance.total}</span>
              </div>
              <div className="px-4 py-3">
                <MiniProgress value={e.progress} />
              </div>
              <div className="px-3 py-3 text-right">
                <button className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm hover:bg-slate-50">
                  ⋯
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
