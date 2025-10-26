// src/pages/courses/CurriculumSections.jsx
import { useParams, useOutletContext } from "react-router-dom";
import { ChevronDown, ChevronRight, MoreVertical, Eye, Plus, Copy, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import AddMaterialModal from "../../components/AddMaterialModal";

export default function CurriculumSections() {
  const { courseId } = useParams();
  const { course } = useOutletContext(); // from CourseEditLayout

  // Dummy data for sections
  const initial = [
    { id: 1, title: "Getting Started with Python", count: 1, duration: "01h 35m 50s", open: true },
    { id: 2, title: "String Variables, Storing Numbers & Working with Dates and Times", count: 5, duration: "03h 28m 22s", open: false },
    { id: 3, title: "Perform operations using Data Types and Operators", count: 3, duration: "01h 38m 01s", open: false },
    { id: 4, title: "Control Flow with Decisions and Loops", count: 3, duration: "01h 38m 01s", open: false },
    { id: 5, title: "Data Structure - Lists", count: 2, duration: "01h 38m 01s", open: false },
    { id: 6, title: "Data Structure : Tuples, Dictionaries and Sets", count: 5, duration: "02h 54m 28s", open: false },
  ];

  const [sections, setSections] = useState(initial);
  const [showAdd, setShowAdd] = useState(false);

  const handleContinue = (typeKey) => {
  // For now just log; later route to a specific editor/upload
  console.log("Selected material type:", typeKey);
  // TODO: open upload screen or create draft item
};

  const toggle = (id) =>
    setSections((s) => s.map((sec) => (sec.id === id ? { ...sec, open: !sec.open } : sec)));

  return (
    <div className="p-5">
      {/* Local header (inside CourseEditLayout) */}
      <div className="mb-3">
        <div className="text-lg font-semibold text-slate-900">Create and Edit Your Curriculum</div>
        <div className="text-sm text-slate-600">
          {course?.title} <span className="text-slate-400">#{courseId}</span>
        </div>
      </div>

      {/* Tabs (Curriculum / Tests) */}
      <div className="border-b border-slate-200 mb-4">
        <div className="-mb-px flex gap-6">
          <span className="inline-flex items-center px-1 py-3 text-sm font-medium border-b-2 border-primary text-slate-900">
            Curriculum
          </span>
          <span className="inline-flex items-center px-1 py-3 text-sm font-medium border-b-2 border-transparent text-slate-500">
            Tests
          </span>
        </div>
      </div>

      {/* Stats + actions */}
      <div className="flex flex-wrap items-center gap-2 justify-between mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <Chip>11 Sections</Chip>
          <Chip>38 materials</Chip>
          <Chip>23h 44m 30s</Chip>
        </div>
        <div className="flex items-center gap-2">
          <ActionGhost icon={<Copy size={16} />}>Clone Section</ActionGhost>
          <ActionGhost icon={<ArrowUpDown size={16} />}>Rearrange sections</ActionGhost>
          <ActionPrimary icon={<Plus size={16} />}>Add Section</ActionPrimary>
        </div>
      </div>

      {/* Sections list */}
      <div className="space-y-3">
        {sections.map((s, i) => (
          <div key={s.id} className="rounded-xl bg-white ring-1 ring-slate-200/70">
            {/* Section header */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <button
                  className="w-6 h-6 grid place-items-center rounded-md hover:bg-slate-100"
                  onClick={() => toggle(s.id)}
                >
                  {s.open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                <span className="text-slate-500 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-medium text-slate-900">{s.title}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-sm text-slate-500">
                  <span className="text-slate-600">{s.count}</span> material(s) • <span className="text-slate-600">{s.duration}</span>
                </div>

                <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <Eye size={14} /> 31/31
                </span>

                <button
                    className="h-8 px-3 rounded-md border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50"
                    onClick={() => setShowAdd(true)}
                    >
                    + Add Material
                    </button>

                <button className="w-8 h-8 grid place-items-center rounded-md hover:bg-slate-100 text-slate-500">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            {/* First section shows one material card like your screenshot */}
            {s.open && i === 0 && (
              <div className="px-4 pb-4">
                <div className="ml-12 mt-1 rounded-xl border border-slate-200 bg-white">
                  <div className="px-4 py-3">
                    <div className="text-xs text-slate-500">01</div>
                    <div className="font-medium text-slate-900">PYTHON SESSION 2</div>
                    <div className="text-sm text-slate-500">Python Session 2 (1).mp4</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <AddMaterialModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onContinue={handleContinue}
        />
    </div>
  );
}

/* ---------- Small UI helpers ---------- */
function Chip({ children }) {
  return (
    <span className="inline-flex items-center h-6 px-2 rounded-md text-xs bg-slate-100 text-slate-700 ring-1 ring-slate-200">
      {children}
    </span>
  );
}
function ActionGhost({ icon, children }) {
  return (
    <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50">
      {icon} {children}
    </button>
  );
}
function ActionPrimary({ icon, children }) {
  return (
    <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-white text-sm font-medium hover:bg-blue-600">
      {icon} {children}
    </button>
  );
}
