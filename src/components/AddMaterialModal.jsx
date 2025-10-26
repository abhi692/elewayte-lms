// src/components/AddMaterialModal.jsx
import { useState } from "react";
import Modal from "./Modal";
import {
  PlaySquare, // Video
  Headphones, // Audio
  FileText,   // PDF / Doc / Text
  Youtube,
  Image as ImageIcon,
  Table,
  Presentation,
  FileArchive,
  Link,       // Link
  Brain,      // Exercise
  ClipboardList, // Assignment / Form
  CodeSquare, // Programming Assignment
  BookOpen,   // Epub
  Boxes,      // Scorm Zip
} from "lucide-react";

const TYPES = [
  { key: "video", label: "Video", icon: PlaySquare },
  { key: "audio", label: "Audio", icon: Headphones },
  { key: "pdf", label: "PDF", icon: FileText },
  { key: "youtube", label: "Youtube", icon: Youtube },
  { key: "image", label: "Image", icon: ImageIcon },
  { key: "doc", label: "Doc", icon: FileText },
  { key: "sheet", label: "Sheet", icon: Table },
  { key: "slide", label: "Slide", icon: Presentation },
  { key: "text", label: "Text/HTML", icon: FileText },
  { key: "zip", label: "Zip", icon: FileArchive },
  { key: "scorm", label: "Scorm Zip", icon: Boxes },
  { key: "link", label: "Link", icon: Link },
  { key: "exercise", label: "Exercise", icon: Brain },
  { key: "assignment", label: "Assignment", icon: ClipboardList },
  { key: "prog-assignment", label: "Programming Assignment", icon: CodeSquare },
  { key: "form", label: "Form", icon: ClipboardList },
  { key: "epub", label: "Epub", icon: BookOpen },
];

export default function AddMaterialModal({ open, onClose, onContinue }) {
  const [selected, setSelected] = useState(null);

  const footer = (
    <div className="flex items-center justify-end gap-2">
      <button
        className="h-9 px-4 rounded-md border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50"
        onClick={() => {
          setSelected(null);
          onClose?.();
        }}
      >
        Cancel
      </button>
      <button
        className={`h-9 px-4 rounded-md text-sm font-medium ${
          selected
            ? "bg-primary text-white hover:bg-blue-600"
            : "bg-slate-200 text-slate-500 cursor-not-allowed"
        }`}
        disabled={!selected}
        onClick={() => {
          if (!selected) return;
          onContinue?.(selected);
          setSelected(null);
          onClose?.();
        }}
      >
        Continue
      </button>
    </div>
  );

  return (
    <Modal open={open} onClose={onClose} title="Add Material" footer={footer}>
      <p className="text-sm text-slate-600">
        Select material type or{" "}
        <button className="text-primary hover:underline" onClick={(e) => e.preventDefault()}>
          Clone from existing library
        </button>
      </p>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {TYPES.map(({ key, label, icon: Icon }) => {
          const active = selected === key;
          return (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`flex flex-col items-center justify-center gap-2 h-24 rounded-lg border text-sm
                ${active ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}
            >
              <div className={`w-10 h-10 grid place-items-center rounded-md
                ${active ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>
                <Icon size={18} />
              </div>
              <span className="text-slate-700">{label}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-slate-500">
        If you don’t see your format listed here, please upload it as a zip file.
      </p>
    </Modal>
  );
}
