import { useRef, useState, useEffect } from "react";
import { MoreHorizontal, Bell, Pencil, CalendarPlus, XCircle, Trash2, RotateCcw } from "lucide-react";

export default function KebabMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!ref.current?.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const item = (Icon, label, tone = "") => (
    <button className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 ${tone}`} onClick={()=>setOpen(false)}>
      <Icon size={16} className="text-slate-500" /> {label}
    </button>
  );

  return (
    <div className="relative" ref={ref}>
      <button
        className="h-9 w-9 rounded-md border border-slate-200 bg-white grid place-items-center hover:bg-slate-50"
        onClick={() => setOpen(v => !v)}
      >
        <MoreHorizontal size={18} className="text-slate-600" />
      </button>

      {open && (
  <div className="absolute right-0 mt-2 w-48 rounded-md border border-slate-200 bg-white shadow-xl overflow-hidden z-[9999]">
          {item(Bell, "Send Reminder")}
          {item(Pencil, "Edit")}
          {item(RotateCcw, "Reschedule")}
          {item(CalendarPlus, "Add to calendar")}
          {item(XCircle, "Cancel")}
          <div className="border-t border-slate-200" />
          {item(Trash2, "Delete", "text-rose-600")}
        </div>
      )}
    </div>
  );
}
