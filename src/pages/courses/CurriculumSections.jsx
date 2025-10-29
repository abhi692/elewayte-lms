// src/pages/courses/CurriculumSections.jsx
import { useParams, useOutletContext } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Eye,
  Plus,
  Copy,
  ArrowUpDown,
} from "lucide-react";
import { useState, useMemo } from "react";
import AddMaterialModal from "../../components/AddMaterialModal";
import MaterialRow from "../../components/MaterialRow";
import AddSectionDrawer from "../../components/AddSectionDrawer";
import RearrangeSectionsDrawer from "../../components/RearrangeSectionsDrawer";
import CloneSectionModal from "../../components/CloneSectionModal"; // ← add this

export default function CurriculumSections() {
  const { courseId } = useParams();
  const { course } = useOutletContext();

  const initial = useMemo(
    () => [
      {
        id: 1,
        title: "Getting Started with Python",
        count: 1,
        duration: "01h 35m 50s",
        open: true,
        materials: [
          {
            id: "m1",
            title: "PYTHON SESSION 2",
            type: "mp4",
            duration: "01h 35m 50s",
            createdAt: "2023-04-27T00:00:00Z",
            published: true,
            freePreview: true,
          },
        ],
      },
      {
        id: 2,
        title: "String Variables, Storing Numbers & Working with Dates and Times",
        count: 5,
        duration: "03h 28m 22s",
        open: false,
        materials: [
          {
            id: "m2",
            title: "Variables & Data Types.pdf",
            type: "pdf",
            duration: "00h 42m 10s",
            createdAt: "2023-05-01T00:00:00Z",
            published: true,
            freePreview: false,
          },
          {
            id: "m3",
            title: "Working with Dates.mp4",
            type: "mp4",
            duration: "01h 11m 05s",
            createdAt: "2023-05-02T00:00:00Z",
            published: false,
            freePreview: false,
          },
        ],
      },
      { id: 3, title: "Perform operations using Data Types and Operators", count: 3, duration: "01h 38m 01s", open: false, materials: [] },
      { id: 4, title: "Control Flow with Decisions and Loops", count: 3, duration: "01h 38m 01s", open: false, materials: [] },
      { id: 5, title: "Data Structure - Lists", count: 2, duration: "01h 38m 01s", open: false, materials: [] },
      { id: 6, title: "Data Structure : Tuples, Dictionaries and Sets", count: 5, duration: "02h 54m 28s", open: false, materials: [] },
    ],
    []
  );

  const [sections, setSections] = useState(initial);
  const [showAdd, setShowAdd] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [showRearrange, setShowRearrange] = useState(false);
  const [showClone, setShowClone] = useState(false); // ← add this

  // Material flow
  const handleContinue = (typeKey) => {
    console.log("Selected material type:", typeKey);
  };

  // Expand/Collapse
  const toggle = (id) =>
    setSections((s) => s.map((sec) => (sec.id === id ? { ...sec, open: !sec.open } : sec)));

  // Row menu handlers
  const onPreview = (m) => alert(`Preview → ${m.title}`);
  const onEditDetails = (m) => alert(`Edit Details → ${m.title}`);
  const onTogglePublish = async (m) => {
    setSections((prev) =>
      prev.map((sec) => ({
        ...sec,
        materials: sec.materials?.map((x) => (x.id === m.id ? { ...x, published: !x.published } : x)),
      }))
    );
  };
  const onToggleFreePreview = async (m) => {
    setSections((prev) =>
      prev.map((sec) => ({
        ...sec,
        materials: sec.materials?.map((x) => (x.id === m.id ? { ...x, freePreview: !x.freePreview } : x)),
      }))
    );
  };
  const onMakePrerequisite = async (m) => alert(`Make Prerequisite → ${m.title}`);
  const onDelete = async (m) => {
    if (!confirm(`Delete "${m.title}"?`)) return;
    setSections((prev) =>
      prev.map((sec) => ({ ...sec, materials: sec.materials?.filter((x) => x.id !== m.id) }))
    );
  };

  const handlers = {
    onPreview,
    onEditDetails,
    onTogglePublish,
    onToggleFreePreview,
    onMakePrerequisite,
    onDelete,
  };

  // Drawer ordering helpers
  const sectionsForDrawer = sections.map(({ id, title }) => ({ id, title }));
  const applyNewOrder = (orderedIds) => {
    setSections((prev) => {
      const byId = new Map(prev.map((s) => [s.id, s]));
      const next = orderedIds.map((id) => byId.get(id)).filter(Boolean);
      const leftovers = prev.filter((s) => !orderedIds.includes(s.id));
      return [...next, ...leftovers];
    });
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="mb-3">
        <div className="text-lg font-semibold text-slate-900">Create and Edit Your Curriculum</div>
        <div className="text-sm text-slate-600">
          {course?.title} <span className="text-slate-400">#{courseId}</span>
        </div>
      </div>

      {/* Tabs */}
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
          <ActionGhost icon={<Copy size={16} />} onClick={() => setShowClone(true)}>
            Clone Section
          </ActionGhost>
          <ActionGhost icon={<ArrowUpDown size={16} />} onClick={() => setShowRearrange(true)}>
            Rearrange sections
          </ActionGhost>
          <ActionPrimary icon={<Plus size={16} />} onClick={() => setShowAddSection(true)}>
            Add Section
          </ActionPrimary>
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
                  <span className="text-slate-600">{s.count}</span> material(s) •{" "}
                  <span className="text-slate-600">{s.duration}</span>
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

            {/* Materials under this section */}
            {s.open && (
              <div className="px-4 pb-4">
                <div className="ml-12 mt-1 space-y-2">
                  {(s.materials || []).length === 0 ? (
                    <EmptyRow />
                  ) : (
                    s.materials.map((m, idx) => (
                      <MaterialRow
                        key={m.id}
                        material={m}
                        index={idx + 1}
                        onPreview={handlers.onPreview}
                        onEditDetails={handlers.onEditDetails}
                        onTogglePublish={handlers.onTogglePublish}
                        onToggleFreePreview={handlers.onToggleFreePreview}
                        onMakePrerequisite={handlers.onMakePrerequisite}
                        onDelete={handlers.onDelete}
                      />
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Material modal */}
      <AddMaterialModal open={showAdd} onClose={() => setShowAdd(false)} onContinue={handleContinue} />

      {/* Add Section Drawer (with backdrop) */}
      {showAddSection && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowAddSection(false)} />}
      <AddSectionDrawer
        open={showAddSection}
        onClose={() => setShowAddSection(false)}
        onAdd={(newSection) => {
          setSections((prev) => [
            ...prev,
            {
              id: Date.now(),
              title: newSection.name,
              description: newSection.description,
              prerequisite: newSection.prerequisite,
              count: 0,
              duration: "00h 00m 00s",
              open: false,
              materials: [],
            },
          ]);
          setShowAddSection(false);
        }}
      />

      {/* Rearrange Sections Drawer */}
      <RearrangeSectionsDrawer
        open={showRearrange}
        sections={sectionsForDrawer}
        onClose={() => setShowRearrange(false)}
        onApply={applyNewOrder}
      />

      {/* Clone Section Modal */}
      <CloneSectionModal
        open={showClone}
        onClose={() => setShowClone(false)}
        onClone={({ fromCurriculumId, fromSectionId, rename }) => {
          // TODO: replace with API call
          const cloned = {
            id: Date.now(),
            title: rename || `Cloned Section (${fromSectionId})`,
            count: 0,
            duration: "00h 00m 00s",
            open: false,
            materials: [],
          };
          setSections((prev) => [...prev, cloned]);
          setShowClone(false);
        }}
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

// Forward props so onClick works
function ActionGhost({ icon, children, ...props }) {
  return (
    <button
      {...props}
      className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50"
    >
      {icon} {children}
    </button>
  );
}
function ActionPrimary({ icon, children, ...props }) {
  return (
    <button
      {...props}
      className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-white text-sm font-medium hover:bg-blue-600"
    >
      {icon} {children}
    </button>
  );
}

function EmptyRow() {
  return (
    <div className="rounded-md border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
      No materials yet. Click <span className="font-medium">+ Add Material</span> to upload.
    </div>
  );
}
