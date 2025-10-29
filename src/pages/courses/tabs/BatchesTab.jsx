// src/pages/courses/tabs/BatchesTab.jsx
import React, { useMemo, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { Plus, MoreVertical, Search } from "lucide-react";

/** 🔁 Use same global set for now and filter by :courseId */
const ALL_BATCHES = [
  { id: "b01", courseId: "c1", courseName: "Digital Marketing", name: "Jan Batch - 1", startDate: "6th Jan, 2023", endDate: "23rd Jan, 2023", subject: "Digital Marketing", instructor: "Eshwar", manager: "Eshwar", learners: 1, isDefault: true },
  { id: "b02", courseId: "c2", courseName: "Machine Learning",   name: "DS DUMMY",     startDate: "3rd Feb, 2023", endDate: "7th Feb, 2023",  subject: "Machine Learning", room: "Elewayte Classroom", manager: "Elewayte Classroom", learners: 2, isOld: true },
  { id: "b03", courseId: "c3", courseName: "PYTHON",             name: "PY FEB",       startDate: "19th Feb, 2023", endDate: "9th Apr, 2023", subject: "PYTHON", room: "Elewayte Classroom", manager: "Elewayte Classroom", learners: 31, isOld: true },
  { id: "b04", courseId: "c3", courseName: "PYTHON",             name: "PY MAY",       startDate: "20th May, 2023", endDate: "8th Jul, 2023", subject: "PYTHON", instructor: "Yuvaraj", manager: "Yuvaraj", learners: 19, isOld: true },
];

export default function BatchesTab() {
  const { courseId } = useParams();
  const { course } = useOutletContext() || {};
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const onlyThisCourse = ALL_BATCHES.filter((b) => String(b.courseId) === String(courseId));
    const t = q.trim().toLowerCase();
    if (!t) return onlyThisCourse;
    return onlyThisCourse.filter(
      (b) =>
        b.name.toLowerCase().includes(t) ||
        b.courseName.toLowerCase().includes(t) ||
        (b.manager || "").toLowerCase().includes(t)
    );
  }, [q, courseId]);

  const COLS =
    "64px minmax(260px,1.4fr) minmax(180px,1fr) minmax(220px,1fr) minmax(260px,1.2fr) minmax(200px,1fr) 68px";

  return (
    <div className="p-5">
      {/* Header (kept same look) */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Batches</h2>
          <p className="text-sm text-slate-500">
            {course?.title ? `For course: ${course.title}` : "Batches under this course"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search size={16} className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by batch name…"
              className="w-64 rounded-md border border-slate-300 bg-white pl-8 pr-3 py-2 text-sm outline-none focus:border-emerald-600"
            />
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-md bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700/90"
            onClick={() => alert(`Create Batch for course ${courseId}`)}
          >
            <Plus size={16} />
            Create Batch
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg bg-white ring-1 ring-slate-200/60">
        <div className="grid bg-slate-50 text-xs font-medium text-slate-600" style={{ gridTemplateColumns: COLS }}>
          <div className="px-4 py-2">#</div>
          <div className="px-4 py-2">Batch name</div>
          <div className="px-4 py-2">Course</div>
          <div className="px-4 py-2">Duration</div>
          <div className="px-4 py-2">Subject & Instructor</div>
          <div className="px-4 py-2">Batch manager</div>
          <div className="px-4 py-2 text-right pr-3">Actions</div>
        </div>

        {rows.map((b, i) => (
          <div key={b.id} className="grid items-center border-t border-slate-100 hover:bg-slate-50" style={{ gridTemplateColumns: COLS }}>
            <div className="px-4 py-3 text-slate-700 tabular-nums">{String(i + 1).padStart(2, "0")}</div>

            <div className="px-4 py-3">
              <div className="text-sm font-medium text-slate-900">{b.name}</div>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                {b.isDefault && (
                  <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200">
                    DEFAULT
                  </span>
                )}
                <span>{b.learners ?? 0} Learners</span>
                {b.isOld && (
                  <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800 ring-1 ring-amber-200">
                    OLD
                  </span>
                )}
              </div>
            </div>

            <div className="px-4 py-3 text-sm text-slate-800">{b.courseName}</div>

            <div className="px-4 py-3 text-sm">
              <div className="text-slate-800">{b.startDate}</div>
              <div className="text-slate-800">{b.endDate}</div>
            </div>

            <div className="px-4 py-3 text-sm">
              <div className="text-slate-800">
                {b.subject}
                {b.instructor && <> (<span className="text-slate-700">{b.instructor}</span>)</>}
              </div>
              {b.room && <div className="text-slate-500">{b.room}</div>}
            </div>

            <div className="px-4 py-3 text-sm text-slate-800">{b.manager}</div>

            <div className="px-3 py-3 flex justify-end">
              <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white hover:bg-slate-50">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}

        {rows.length === 0 && <div className="px-4 py-10 text-center text-sm text-slate-500">No batches in this course.</div>}
      </div>
    </div>
  );
}
