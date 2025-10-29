// components/MaterialRow.jsx
import React from "react";
import MaterialActionsMenu from "./MaterialActionsMenu";

export default function MaterialRow({
  material,               // { id, title, type: 'mp4'|'pdf'|'doc'|'upload', duration, createdAt, published, freePreview }
  index,
  onPreview,
  onEditDetails,
  onTogglePublish,
  onToggleFreePreview,
  onMakePrerequisite,
  onDelete,
}) {
  const ext = material.type?.toUpperCase?.() || "FILE";
  const created = material.createdAt
    ? new Date(material.createdAt).toLocaleDateString()
    : "";

  return (
    <div className="group relative flex items-center gap-3 rounded-md border border-gray-200 bg-white px-4 py-3 hover:bg-gray-50">
      {/* Index bubble */}
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600">
        {String(index).padStart(2, "0")}
      </div>

      {/* Title & meta */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-medium text-gray-900">{material.title}</p>
          <span className="rounded border border-gray-200 px-2 py-0.5 text-[11px] text-gray-600">
            Type: {ext}
          </span>
          {created && (
            <span className="rounded border border-gray-200 px-2 py-0.5 text-[11px] text-gray-600">
              Created: {created}
            </span>
          )}
        </div>

        {/* Secondary line: duration / status */}
        <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          {material.duration ? <span>{material.duration}</span> : null}
          <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[11px] ${
            material.published ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
          }`}>
            {material.published ? "Published" : "Unpublished"}
          </span>
          {material.freePreview && (
            <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[11px] text-blue-700">
              Free Preview
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <MaterialActionsMenu
        material={material}
        onPreview={onPreview}
        onEditDetails={onEditDetails}
        onTogglePublish={onTogglePublish}
        onToggleFreePreview={onToggleFreePreview}
        onMakePrerequisite={onMakePrerequisite}
        onDelete={onDelete}
      />
    </div>
  );
}
