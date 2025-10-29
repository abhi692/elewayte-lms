// src/pages/sessions/SessionsCreatePage.jsx
import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronRight, X } from "lucide-react";

/** Demo data (replace with API later) */
const DEMO_BATCHES = [
  { id: "b1", name: "Investment Banking Aug 2025" },
  { id: "b2", name: "Python DC SEP" },
  { id: "b3", name: "Retail Banking Sep PM" },
  { id: "b4", name: "Soft Skills BFSI" },
];

const DEMO_LEARNERS = [
  { id: "l1", name: "Aditi Sharma (IB Aug 2025)" },
  { id: "l2", name: "Karthik M (IB Aug 2025)" },
  { id: "l3", name: "Rahul S (Python DC SEP)" },
  { id: "l4", name: "Smitha P (Retail Banking Sep PM)" },
];

export default function SessionsCreatePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    date: "",
    start: "",
    end: "",
    instructor: "",
    mode: "online", // online | offline
    platform: "Zoom Meetings",
    approvalRequired: false,
    shareableLink: false,
    allowJoinWithoutLogin: false,
    notifyOnSchedule: true,
    notifyReminder: true,
    scheduleType: "batch", // batch | subject
    topics: "",
    feedbackEnabled: true,
    feedbackForm: "Training Experience form (Default)",
  });

  // NEW: selection state for the drawer
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [selectedLearners, setSelectedLearners] = useState([]);

  // NEW: drawer visibility
  const [openSelect, setOpenSelect] = useState(false);
  const openDrawer = () => setOpenSelect(true);
  const closeDrawer = () => setOpenSelect(false);

  const onChange = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = (e) => {
    e.preventDefault();
    // Compose payload depending on scheduleType
    const payload = {
      ...form,
      batches: form.scheduleType === "batch" ? selectedBatches : [],
      learners: form.scheduleType === "subject" ? selectedLearners : [],
    };
    console.log("Saving session payload:", payload);
    // TODO: call your API here
    navigate("/sessions");
  };

  /** Helpers */
  const scheduleTypeBtn = (value, label, sub) => (
    <button
      type="button"
      onClick={() => onChange("scheduleType", value)}
      className={`w-full h-auto rounded-md text-left border p-3 transition ${
        form.scheduleType === value
          ? "bg-indigo-50 border-indigo-300"
          : "bg-white border-slate-300 hover:bg-slate-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-slate-900">{label}</div>
        {form.scheduleType === value ? (
          <div className="h-5 w-5 rounded-full bg-indigo-600" />
        ) : (
          <div className="h-5 w-5 rounded-full border border-slate-300 bg-white" />
        )}
      </div>
      {sub && <div className="mt-1 text-xs text-slate-600">{sub}</div>}
    </button>
  );

  const selectorTitle =
    form.scheduleType === "batch"
      ? "Select Batches for this Session"
      : "Select learners for this Session";

  const selectorSub =
    form.scheduleType === "batch"
      ? `${selectedBatches.length} selected`
      : `${selectedLearners.length} selected`;

  // Render list inside drawer based on scheduleType
  const drawerList = useMemo(() => {
    if (form.scheduleType === "batch") {
      return (
        <ul className="mt-4 space-y-2">
          {DEMO_BATCHES.map((b) => {
            const checked = selectedBatches.includes(b.id);
            return (
              <li key={b.id} className="flex items-center gap-2">
                <input
                  id={`b-${b.id}`}
                  type="checkbox"
                  className="h-4 w-4"
                  checked={checked}
                  onChange={(e) => {
                    setSelectedBatches((prev) =>
                      e.target.checked
                        ? [...prev, b.id]
                        : prev.filter((x) => x !== b.id)
                    );
                  }}
                />
                <label htmlFor={`b-${b.id}`} className="text-sm text-slate-800">
                  {b.name}
                </label>
              </li>
            );
          })}
        </ul>
      );
    }
    // subject → learners selection
    return (
      <ul className="mt-4 space-y-2">
        {DEMO_LEARNERS.map((l) => {
          const checked = selectedLearners.includes(l.id);
          return (
            <li key={l.id} className="flex items-center gap-2">
              <input
                id={`l-${l.id}`}
                type="checkbox"
                className="h-4 w-4"
                checked={checked}
                onChange={(e) => {
                  setSelectedLearners((prev) =>
                    e.target.checked
                      ? [...prev, l.id]
                      : prev.filter((x) => x !== l.id)
                  );
                }}
              />
              <label htmlFor={`l-${l.id}`} className="text-sm text-slate-800">
                {l.name}
              </label>
            </li>
          );
        })}
      </ul>
    );
  }, [form.scheduleType, selectedBatches, selectedLearners]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-semibold text-slate-900">Create Session</h1>
        <div className="flex items-center gap-2">
          <Link
            to="/sessions"
            className="inline-flex items-center justify-center h-9 px-3 rounded-md border border-slate-200 bg-white text-sm hover:bg-slate-50"
          >
            View Calendar
          </Link>
          <button
            onClick={handleSave}
            className="inline-flex items-center justify-center h-9 px-3 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
          >
            Save Session
          </button>
        </div>
      </div>

      <p className="text-slate-600 mb-6">
        Plan sessions, recurring events, and auto-notify learners.
      </p>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Row: Session name */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <label className="block text-sm font-medium text-slate-700">
              Session name
            </label>
            <input
              type="text"
              maxLength={100}
              value={form.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="Session name"
              className="mt-1 w-full h-10 rounded-md border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <div className="mt-1 text-xs text-slate-500">
              {form.name.length}/100
            </div>
          </div>
        </div>

        {/* Row: Session type + Batches selector row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* session type cards */}
          <div className="md:col-span-8">
            <label className="block text-sm font-medium text-slate-700">
              Session type
            </label>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scheduleTypeBtn(
                "batch",
                "Schedule by Batch",
                "Select batches across courses of your branch"
              )}
              {scheduleTypeBtn(
                "subject",
                "Schedule by Subject",
                "Select learners from a single subject of a batch"
              )}
            </div>
          </div>

          {/* Batches row (as per your screenshot) */}
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-slate-700">
              Batches
            </label>
            <button
              type="button"
              onClick={openDrawer}
              className="mt-2 w-full h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-left flex items-center justify-between hover:bg-slate-50"
            >
              <span>
                {selectorTitle}
                {((form.scheduleType === "batch" && selectedBatches.length > 0) ||
                  (form.scheduleType === "subject" && selectedLearners.length > 0)) && (
                  <span className="ml-2 text-xs text-slate-500">({selectorSub})</span>
                )}
              </span>
              <ChevronRight size={16} className="text-slate-500" />
            </button>
          </div>
        </div>

        {/* Row: timings */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-slate-700">
              Start date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => onChange("date", e.target.value)}
              className="mt-1 w-full h-10 rounded-md border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-slate-700">
              Start time
            </label>
            <input
              type="time"
              value={form.start}
              onChange={(e) => onChange("start", e.target.value)}
              className="mt-1 w-full h-10 rounded-md border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-slate-700">
              End time
            </label>
            <input
              type="time"
              value={form.end}
              onChange={(e) => onChange("end", e.target.value)}
              className="mt-1 w-full h-10 rounded-md border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        {/* Instructor */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Instructor
          </label>
        <select
            value={form.instructor}
            onChange={(e) => onChange("instructor", e.target.value)}
            className="mt-1 w-full h-10 rounded-md border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select the instructor for the session</option>
            <option>Smitha</option>
            <option>Rahul</option>
            <option>Ananya</option>
          </select>
        </div>

        {/* Mode of conducting */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6">
            <label className="block text-sm font-medium text-slate-700">
              Mode of conducting
            </label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onChange("mode", "online")}
                className={`rounded-md border p-3 text-left ${
                  form.mode === "online"
                    ? "bg-indigo-50 border-indigo-300"
                    : "bg-white border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="font-medium text-sm">Online Session</div>
                <div className="text-xs text-slate-600 mt-1">
                  Learners join remotely; instructor teaches live online
                </div>
              </button>
              <button
                type="button"
                onClick={() => onChange("mode", "offline")}
                className={`rounded-md border p-3 text-left ${
                  form.mode === "offline"
                    ? "bg-indigo-50 border-indigo-300"
                    : "bg-white border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="font-medium text-sm">Offline Session</div>
                <div className="text-xs text-slate-600 mt-1">
                  Learners attend sessions in person
                </div>
              </button>
            </div>
          </div>

          <div className="md:col-span-6">
            <label className="block text-sm font-medium text-slate-700">
              Meeting Platform
            </label>
            <select
              value={form.platform}
              onChange={(e) => onChange("platform", e.target.value)}
              className="mt-1 w-full h-10 rounded-md border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={form.mode === "offline"}
            >
              <option>Zoom Meetings</option>
              <option>Google Meet</option>
              <option>Microsoft Teams</option>
            </select>

            <label className="mt-3 flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.approvalRequired}
                onChange={(e) => onChange("approvalRequired", e.target.checked)}
                className="h-4 w-4"
              />
              Approval required to join
            </label>
          </div>
        </div>

        {/* Link Sharing */}
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="font-medium text-sm text-slate-800">Link Sharing</div>
          <div className="text-xs text-slate-500 mt-1">
            Link is generated after scheduling and appears in calendar. Same link
            is used across recurring sessions.
          </div>
          <div className="mt-3 space-y-2">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.shareableLink}
                onChange={(e) => onChange("shareableLink", e.target.checked)}
                className="h-4 w-4"
              />
              Generate shareable link
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.allowJoinWithoutLogin}
                onChange={(e) =>
                  onChange("allowJoinWithoutLogin", e.target.checked)
                }
                className="h-4 w-4"
                disabled={!form.shareableLink}
              />
              Allow learners to join without logging in
            </label>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="font-medium text-sm text-slate-800">Notifications</div>
          <div className="mt-3 space-y-2">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.notifyOnSchedule}
                onChange={(e) => onChange("notifyOnSchedule", e.target.checked)}
                className="h-4 w-4"
              />
              Send immediately after scheduling this session
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.notifyReminder}
                onChange={(e) => onChange("notifyReminder", e.target.checked)}
                className="h-4 w-4"
              />
              Send session notification reminders to the learners
            </label>
          </div>
        </div>

        {/* Topics */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Topics
          </label>
          <textarea
            rows={6}
            maxLength={250}
            value={form.topics}
            onChange={(e) => onChange("topics", e.target.value)}
            placeholder="What will be covered during the session?"
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="mt-1 text-xs text-slate-500">
            {form.topics.length}/250
          </div>
        </div>

        {/* Feedback form */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <label className="block text-sm font-medium text-slate-700">
              Class Feedback Form
            </label>
            <select
              value={form.feedbackForm}
              onChange={(e) => onChange("feedbackForm", e.target.value)}
              className="mt-1 w-full h-10 rounded-md border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={!form.feedbackEnabled}
            >
              <option>Training Experience form (Default)</option>
              <option>Instructor Feedback v2</option>
            </select>
          </div>
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-slate-700">
              Feedback Enabled
            </label>
            <div className="mt-1">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={form.feedbackEnabled}
                  onChange={(e) => onChange("feedbackEnabled", e.target.checked)}
                  className="h-4 w-4"
                />
                Enable post-class feedback
              </label>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <Link
            to="/sessions"
            className="inline-flex items-center justify-center h-9 px-3 rounded-md border border-slate-200 bg-white text-sm hover:bg-slate-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center justify-center h-9 px-3 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
          >
            Save Session
          </button>
        </div>
      </form>

      {/* Right-side Drawer */}
      {openSelect && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={closeDrawer}
          />
          <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[440px] bg-white z-50 shadow-xl ring-1 ring-black/5">
            <div className="flex items-center justify-between px-4 h-14 border-b">
              <div className="text-sm font-semibold text-slate-900">
                {selectorTitle}
              </div>
              <button
                className="p-2 rounded hover:bg-slate-100"
                onClick={closeDrawer}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4">
              {/* Optional search/filter input */}
              <input
                type="text"
                placeholder={
                  form.scheduleType === "batch"
                    ? "Search batches…"
                    : "Search learners…"
                }
                className="w-full h-9 rounded-md border border-slate-300 px-3 text-sm"
                onChange={() => {}}
              />

              {drawerList}

              <div className="mt-6 flex items-center justify-end gap-2">
                <button
                  onClick={closeDrawer}
                  className="h-9 px-3 rounded-md border border-slate-200 bg-white text-sm hover:bg-slate-50"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
