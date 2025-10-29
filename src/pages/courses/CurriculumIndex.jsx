// src/pages/courses/CurriculumIndex.jsx
import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import { Plus, List } from "lucide-react";
import { useState } from "react";
import { AddCurriculumDrawer } from "../../components/AddCurriculumDrawer";

export default function CurriculumIndex() {
  const { course } = useOutletContext();     // from CourseEditLayout
  const navigate = useNavigate();
  const { courseId } = useParams();

  // NEW: right-drawer open state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Dummy single-row list (mirror of your screenshot)
  const rows = [
    {
      id: 1,
      name: course?.title || "Untitled Course",
      sectionsCount: 11,
    },
  ];

  return (
    <div className="p-5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">
          <span className="font-medium text-slate-700">All Curriculums</span>
          <span className="ml-2 inline-flex items-center justify-center h-5 px-1.5 text-[11px] rounded-md bg-slate-100 text-slate-700 ring-1 ring-slate-200">
            {String(rows.length).padStart(2, "0")}
          </span>
        </div>

        <button
          className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50"
          onClick={() => setDrawerOpen(true)}               // NEW: open drawer
        >
          <Plus size={16} />
          Add Curriculum
        </button>
      </div>

      {/* Table */}
      <div className="mt-3 overflow-hidden rounded-lg bg-white ring-1 ring-slate-200/60">
        {/* header */}
        <div
          className="grid bg-slate-50 text-xs font-medium text-slate-600"
          style={{ gridTemplateColumns: "72px 1fr 160px 120px" }}
        >
          <div className="px-4 py-2">Sr.</div>
          <div className="px-4 py-2">Curriculum Name</div>
          <div className="px-4 py-2">Content</div>
          <div className="px-4 py-2 text-right pr-2">Actions</div>
        </div>

        {rows.map((r, idx) => (
          <div
            key={r.id}
            className="grid items-center border-t border-slate-100 hover:bg-slate-50 cursor-pointer"
            style={{ gridTemplateColumns: "72px 1fr 160px 120px" }}
            onClick={() => navigate(`/courses/${courseId}/curriculum/sections`)} // ← open builder
          >
            <div className="px-4 py-3 tabular-nums text-slate-700">
              {String(idx + 1).padStart(2, "0")}
            </div>

            <div className="px-4 py-3">
              <div className="text-sm text-slate-800">{r.name}</div>
            </div>

            <div className="px-4 py-3">
              <div className="inline-flex items-center gap-2 text-sm text-slate-700">
                <List size={16} className="text-slate-400" />
                {r.sectionsCount} Section(s)
              </div>
            </div>

            <div className="px-2 py-3 flex justify-end">
              <button
                className="h-8 px-3 rounded-md border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/courses/${courseId}/curriculum/sections`);
                }}
              >
                Open
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* NEW: Right-side slide-in drawer */}
      <AddCurriculumDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onCreate={(payload) => {
          setDrawerOpen(false);
          // Plug your API/create flow here; keeping alert as placeholder
          alert(`Created: ${payload.name} (mode: ${payload.mode})`);
        }}
      />
    </div>
  );
}
