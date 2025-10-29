import React, { useEffect, useState } from "react";

export default function CreateBatchDrawer({
  open,
  onClose,
  onCreate,
  // optional props (can be wired to API later)
  courses = ["Python : Master the Language of the Future", "Machine Learning", "Digital Marketing"],
  curricula = ["Add Curriculum", "S1: Foundations", "S2: Advanced"],
  managers = ["Eshwar", "Elewayte Classroom", "Elewayte Virtual Classroom", "Kiran", "Yuvaraj"],
}) {
  const [batchName, setBatchName] = useState("");
  const [course, setCourse] = useState(courses[0] || "");
  const [curriculum, setCurriculum] = useState(curricula[0] || "");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [manager, setManager] = useState("");
  const [manager2, setManager2] = useState("");

  // reset form when opened/closed
  useEffect(() => {
    if (open) {
      setBatchName("");
      setCourse(courses[0] || "");
      setCurriculum(curricula[0] || "");
      setStartDate("");
      setEndDate("");
      setManager("");
      setManager2("");
    }
  }, [open]);

  // Close on Esc
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute right-0 top-0 flex h-full w-full max-w-[560px] flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <div className="text-lg font-semibold">Create Batch</div>
            <div className="text-xs text-slate-500">
              Add some basic details to create your batch.
            </div>
          </div>
          <button
            className="rounded-lg border border-slate-200 px-2 py-1 text-sm"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 pb-28">
          <div className="text-[13px] font-medium text-slate-700">Basic Details</div>

          {/* Form grid */}
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Batch name (full width) */}
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-slate-700">Batch name *</label>
              <input
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                placeholder="Enter batch name"
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              />
            </div>

            {/* Course */}
            <div>
              <label className="text-sm font-medium text-slate-700">Course *</label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              >
                {courses.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Curriculum */}
            <div>
              <label className="text-sm font-medium text-slate-700">Curriculum *</label>
              <select
                value={curriculum}
                onChange={(e) => setCurriculum(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              >
                {curricula.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Start / End date */}
            <div>
              <label className="text-sm font-medium text-slate-700">Start date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">End date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              />
            </div>

            {/* Managers */}
            <div>
              <label className="text-sm font-medium text-slate-700">Batch manager *</label>
              <select
                value={manager}
                onChange={(e) => setManager(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              >
                <option value="">Select the batch manager</option>
                {managers.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Additional batch manager</label>
              <select
                value={manager2}
                onChange={(e) => setManager2(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              >
                <option value="">Select the additional batch manager</option>
                {managers.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Footer (never cropped) */}
        <div className="shrink-0 border-t bg-white px-5 py-4">
          <div className="flex items-center justify-end gap-2">
            <button
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="rounded-xl bg-[#105132] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              disabled={!batchName.trim() || !course || !curriculum || !manager}
              onClick={() =>
                onCreate?.({
                  batchName: batchName.trim(),
                  course,
                  curriculum,
                  startDate,
                  endDate,
                  manager,
                  manager2,
                })
              }
            >
              Create Batch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
