import React, { useEffect, useState } from "react";

export function AddCurriculumDrawer({ open, onClose, onCreate }) {
  const [mode, setMode] = useState("new");
  const [name, setName] = useState("");

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-[520px] bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <div className="text-lg font-semibold">Add Curriculum</div>
            <div className="text-xs text-slate-500">
              Add some basic details to create your course.
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
        <div className="flex-1 overflow-y-auto px-5 py-5 pb-24"> {/* 👈 added pb-24 for spacing */}
          <div className="text-sm font-medium mb-2">Select an option</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMode("new")}
              className={`rounded-2xl border p-4 text-left ${
                mode === "new"
                  ? "border-[#105132] ring-2 ring-[#105132]/20"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="mb-1 font-semibold">Create from scratch</div>
              <div className="text-xs text-slate-500">
                Start adding content for your course without a template
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMode("reuse")}
              className={`rounded-2xl border p-4 text-left ${
                mode === "reuse"
                  ? "border-[#105132] ring-2 ring-[#105132]/20"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="mb-1 font-semibold">Use from another course</div>
              <div className="text-xs text-slate-500">
                Use a pre-existing curriculum from another course
              </div>
            </button>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Curriculum Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter curriculum name"
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2"
              maxLength={100}
            />
            <div className="mt-1 text-right text-xs text-slate-400">
              {name.length} / 100
            </div>
          </div>

          {mode === "reuse" && (
            <div className="mt-4">
              <label className="text-sm font-medium">
                Select Course to Copy From
              </label>
              <select className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2">
                <option value="">Choose…</option>
                <option>Embedded Systems – Foundations</option>
                <option>Data Structures & Algorithms</option>
                <option>ANSYS for Beginners</option>
              </select>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 flex items-center justify-end gap-2 border-t bg-white px-5 py-4">
          <button
            className="rounded-xl border px-4 py-2 text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded-xl bg-[#105132] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            disabled={!name.trim()}
            onClick={() => onCreate?.({ name: name.trim(), mode })}
          >
            Create Curriculum
          </button>
        </div>
      </div>
    </div>
  );
}
