// src/components/CloneSectionModal.jsx
import React, { useEffect, useMemo, useState } from "react";

export default function CloneSectionModal({
  open,
  onClose,
  onClone,
  // optional: pass lists if you have them from API; otherwise we show demo ones
  curricula = [],
  sectionsByCurriculum = {},
}) {
  const [curriculumId, setCurriculumId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [rename, setRename] = useState("");

  // demo fallback options (only used if nothing passed)
  const fallbackCurricula = useMemo(
    () => [
      { id: "c1", name: "Python : Master the Language of the Future" },
      { id: "c2", name: "Data Structures & Algorithms" },
    ],
    []
  );
  const fallbackSectionsByCurriculum = useMemo(
    () => ({
      c1: [
        { id: "s1", name: "Getting Started with Python" },
        { id: "s2", name: "Strings & Numbers & Dates" },
      ],
      c2: [
        { id: "s3", name: "Arrays & Linked Lists" },
        { id: "s4", name: "Stacks, Queues, Hashing" },
      ],
    }),
    []
  );

  const curriculaList = curricula.length ? curricula : fallbackCurricula;
  const sectionList =
    (sectionsByCurriculum[curriculumId] || fallbackSectionsByCurriculum[curriculumId]) || [];

  useEffect(() => {
    if (!open) {
      setCurriculumId("");
      setSectionId("");
      setRename("");
    }
  }, [open]);

  const canClone = curriculumId && sectionId;

  const handleClone = () => {
    if (!canClone) return;
    onClone({
      fromCurriculumId: curriculumId,
      fromSectionId: sectionId,
      rename: rename.trim(),
    });
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/40"
          onClick={onClose}
        />
      )}

      {/* Modal */}
      <div
        className={`fixed z-[70] left-1/2 top-1/2 w-[92vw] max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-xl ring-1 ring-slate-200 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="px-5 pt-5 pb-2">
          <h3 className="text-lg font-semibold text-slate-900">Add Section by Cloning</h3>
          <p className="mt-1 text-sm text-slate-600">
            Copy a section from another course into this course. The new section will be independent and will not change if the original is modified.
          </p>
        </div>

        <div className="px-5 pb-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Curriculum <span className="text-red-500">*</span></label>
            <select
              value={curriculumId}
              onChange={(e) => {
                setCurriculumId(e.target.value);
                setSectionId("");
              }}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
            >
              <option value="">Select Curriculum Package</option>
              {curriculaList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Section <span className="text-red-500">*</span></label>
            <select
              value={sectionId}
              onChange={(e) => setSectionId(e.target.value)}
              disabled={!curriculumId}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white disabled:bg-slate-50 disabled:text-slate-400"
            >
              <option value="">{curriculumId ? "Select Course Section" : "Choose a curriculum first"}</option>
              {sectionList.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Rename</label>
            <div className="flex items-center gap-2">
              <input
                value={rename}
                maxLength={100}
                onChange={(e) => setRename(e.target.value)}
                placeholder="Enter section name"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <span className="text-[11px] text-slate-400 mt-1">{rename.length}</span>
            </div>
          </div>

          <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            <div className="font-medium mb-1">About Clones</div>
            <ul className="list-disc pl-5 space-y-1">
              <li>When you delete a master/original source, any sections or materials using its clone will not be deleted automatically.</li>
              <li>For example, using the same video in three courses and deleting the original won’t affect those courses.</li>
              <li>This video will only be permanently removed from your library once it has been removed from all courses where it was cloned.</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-2 px-5 py-3 border-t border-slate-200 bg-slate-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-md border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            onClick={handleClone}
            disabled={!canClone}
            className={`h-9 px-4 rounded-md text-sm font-medium ${
              canClone ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-slate-200 text-slate-500 cursor-not-allowed"
            }`}
          >
            Clone Section
          </button>
        </div>
      </div>
    </>
  );
}