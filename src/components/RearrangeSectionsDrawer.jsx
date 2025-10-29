// src/components/RearrangeSectionsDrawer.jsx
import React, { useEffect, useMemo, useState } from "react";
import { GripVertical, MoreVertical } from "lucide-react";

/**
 * Right-side drawer to reorder sections via HTML5 drag & drop.
 *
 * Props:
 *  - open: boolean
 *  - sections: Array<{ id, title }>
 *  - onClose: () => void
 *  - onApply: (orderedIds: Array<string|number>) => void
 */
export default function RearrangeSectionsDrawer({ open, sections = [], onClose, onApply }) {
  const [list, setList] = useState([]);
  const [dragIndex, setDragIndex] = useState(null);

  useEffect(() => {
    setList(sections.map((s) => ({ id: s.id, title: s.title })));
  }, [sections, open]);

  const canApply = useMemo(() => list.length > 0, [list]);

  const onDragStart = (idx) => () => setDragIndex(idx);
  const onDragOver = (idx) => (e) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === idx) return;
    setList((prev) => {
      const next = prev.slice();
      const [moved] = next.splice(dragIndex, 1);
      next.splice(idx, 0, moved);
      return next;
    });
    setDragIndex(idx);
  };
  const onDrop = () => setDragIndex(null);

  const applyOrder = () => {
    onApply(list.map((s) => s.id));
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/30"
          onClick={onClose}
        />
      )}

      {/* Drawer (flex column so footer is always visible) */}
      <aside
        className={`fixed right-0 top-0 z-[70] h-full w-full sm:w-[420px] bg-white shadow-2xl ring-1 ring-slate-200 transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Rearrange sections</h2>
          <p className="mt-1 text-sm text-slate-600">
            Drag sections up or down to rearrange. View options for more actions.
          </p>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {list.map((s, idx) => (
              <div
                key={s.id}
                className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-3 py-2"
                draggable
                onDragStart={onDragStart(idx)}
                onDragOver={onDragOver(idx)}
                onDrop={onDrop}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-slate-300">
                    <GripVertical size={18} />
                  </span>
                  <span className="text-[12px] tabular-nums text-slate-500 w-8">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="truncate text-sm text-slate-800">{s.title}</div>
                </div>

                <button
                  type="button"
                  className="w-8 h-8 grid place-items-center rounded-md hover:bg-slate-100 text-slate-500"
                  title="More"
                >
                  <MoreVertical size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-md border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-100"
          >
            Close
          </button>
          <button
            onClick={applyOrder}
            disabled={!canApply}
            className={`h-9 px-4 rounded-md text-sm font-medium ${
              canApply
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-slate-200 text-slate-500 cursor-not-allowed"
            }`}
          >
            Apply Order
          </button>
        </div>
      </aside>
    </>
  );
}
