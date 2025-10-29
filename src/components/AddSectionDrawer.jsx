// src/components/AddSectionDrawer.jsx
import React, { useState, useEffect } from "react";

export default function AddSectionDrawer({ open, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [prerequisite, setPrerequisite] = useState(false);

  // reset form when drawer is closed
  useEffect(() => {
    if (!open) {
      setName("");
      setDesc("");
      setPrerequisite(false);
    }
  }, [open]);

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("Please enter a section name");
      return;
    }
    onAdd({
      name: name.trim(),
      description: desc.trim(),
      prerequisite,
    });
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl transition-transform duration-300 z-50 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      aria-hidden={!open}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-900">Add New Section</h2>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 text-xl leading-none"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5 overflow-y-auto h-[calc(100%-100px)]">
        <div>
          <label className="text-sm font-medium text-slate-700">
            Section Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Section Name"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Short Description</label>
          <textarea
            rows={3}
            maxLength={250}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Section Description"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <div className="text-xs text-slate-400 text-right">{desc.length}/250</div>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={prerequisite}
            onChange={(e) => setPrerequisite(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-slate-300 rounded"
          />
          Make this a prerequisite
        </label>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full border-t border-slate-200 bg-slate-50 flex justify-end gap-3 px-6 py-3">
        <button
          onClick={onClose}
          className="h-9 px-4 rounded-md border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-100"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="h-9 px-4 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
        >
          Add Section
        </button>
      </div>
    </div>
  );
}
