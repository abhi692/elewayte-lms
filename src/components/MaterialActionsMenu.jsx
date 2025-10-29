// components/MaterialActionsMenu.jsx
import React, { useEffect, useRef, useState } from "react";

export default function MaterialActionsMenu({
  material,
  onPreview,
  onEditDetails,
  onTogglePublish,
  onToggleFreePreview,
  onMakePrerequisite,
  onDelete,
  align = "right",
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const itemClass =
    "px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center justify-between";

  return (
    <div className="relative" ref={menuRef}>
      <button
        aria-label="More actions"
        className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
      >
        {/* 3-dots icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" className="fill-current text-gray-600">
          <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute z-20 mt-2 w-56 rounded-md border border-gray-200 bg-white shadow-lg ${
            align === "left" ? "left-0" : "right-0"
          }`}
          role="menu"
        >
          <div className="py-1">
            <div className={itemClass} role="menuitem" onClick={() => { setOpen(false); onPreview(material); }}>
              Preview <span className="text-xs text-gray-400">{material.type?.toUpperCase?.()}</span>
            </div>
            <div className={itemClass} role="menuitem" onClick={() => { setOpen(false); onEditDetails(material); }}>
              Edit Details
            </div>
            <div className={itemClass} role="menuitem" onClick={() => { setOpen(false); onTogglePublish(material); }}>
              {material.published ? "Unpublish" : "Publish"}
            </div>
            <div className={itemClass} role="menuitem" onClick={() => { setOpen(false); onToggleFreePreview(material); }}>
              {material.freePreview ? "Remove Free Preview" : "Free Preview"}
            </div>
            <div className={itemClass} role="menuitem" onClick={() => { setOpen(false); onMakePrerequisite(material); }}>
              Make Prerequisite
            </div>
            <div
              className={`${itemClass} text-red-600`}
              role="menuitem"
              onClick={() => { setOpen(false); onDelete(material); }}
            >
              Delete
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
