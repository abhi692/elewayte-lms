import { NavLink } from "react-router-dom";
import { useState } from "react";

function SectionHeader({ title, onToggle, open }) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-3 py-2 text-[11px] tracking-wide uppercase text-gray-400 hover:text-gray-300"
    >
      <span>{title}</span>
      <span className={`transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
    </button>
  );
}

function Item({ to, label, badge }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "block px-4 py-2.5 rounded-md text-sm",
          "hover:bg-gray-800 hover:text-white",
          isActive ? "bg-gray-800 text-white" : "text-gray-200",
        ].join(" ")
      }
    >
      <span>{label}</span>
      {badge ? (
        <span className="ml-2 inline-flex items-center rounded bg-blue-600/20 text-blue-300 text-[10px] px-1.5 py-0.5">
          {badge}
        </span>
      ) : null}
    </NavLink>
  );
}

export default function Sidebar() {
  const [cdOpen, setCdOpen] = useState(true); // Course delivery group
  return (
    <aside className="w-64 bg-[#0f172a] text-gray-100 h-screen sticky top-0">
      <div className="p-4 font-semibold text-white">Elewayte</div>

      <nav className="px-2 space-y-2">
        {/* Dashboard */}
        <Item to="/" label="Dashboard" />

        {/* Course delivery group */}
        <div className="mt-2">
          <SectionHeader
            title="Course delivery"
            open={cdOpen}
            onToggle={() => setCdOpen((v) => !v)}
          />
          {cdOpen && (
            <div className="space-y-1">
              <Item to="/courses" label="Courses" />
              <Item to="/batches" label="Batches" />
              <Item to="/sessions" label="Sessions" />
              <Item to="/events" label="Events" badge="NEW" />
              <Item to="/curriculum" label="Curriculum" />
              <Item to="/question-bank" label="Question Bank" />
              <Item to="/live-class-recordings" label="Live Class Recordings" />
              <Item to="/categories" label="Categories" />
              <Item to="/submissions" label="Submissions" />
              <Item to="/feedback-forms" label="Feedback forms" />
            </div>
          )}
        </div>

        {/* Other top-level links */}
        <div className="mt-2">
          <Item to="/analytics" label="Analytics" />
          <Item to="/reports" label="Reports" />
          <Item to="/settings" label="Settings" />
        </div>
      </nav>

      {/* Bottom user badge (optional) */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="rounded-lg bg-gray-800/60 px-3 py-2 text-xs">
          <div className="font-medium">Abhishek</div>
          <div className="text-gray-400">SUPER ADMIN</div>
        </div>
      </div>
    </aside>
  );
}
