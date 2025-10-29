// src/pages/curriculum/CurriculumList.jsx
import React, { useMemo, useState } from "react";
import { MoreVertical, Plus, X } from "lucide-react";

const demoCurricula = [
  { id: "c1", name: "Finance – Master the Money Game", sections: 25 },
  { id: "c2", name: "Business Analytics – Decode Data, Drive Decisions", sections: 15 },
  { id: "c3", name: "Elewayte Demo Video (MC)", sections: 1 },
  { id: "c4", name: "Soft skills", sections: 5 },
  { id: "c5", name: "Cyber Security – Training today, security forever", sections: 19 },
  { id: "c6", name: "Business Analytics", sections: 15 },
  { id: "c7", name: "Finance", sections: 21 },
  { id: "c8", name: "VLSI (Very Large Scale Integration)", sections: 25 },
];

// util pretty seconds -> “0s / 12m / 1h 03m”
const fmt = (s) => {
  const sec = Math.max(0, Math.floor(Number(s || 0)));
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const rs = sec % 60;
  if (h) return `${h}h ${String(m).padStart(2, "0")}m`;
  if (m) return `${m}m`;
  return `${rs}s`;
};

export default function CurriculumList() {
  const [q, setQ] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);

  // --- Drawer form state ---
  const [currName, setCurrName] = useState("");
  const [branch, setBranch] = useState("Elewayte");
  const [limitType, setLimitType] = useState("restricted"); // 'unlimited' | 'restricted'
  const [totalDurationSeconds] = useState(0); // readonly for now (0s like your screenshot)
  const [multiplier, setMultiplier] = useState(0);

  const totalWatchSeconds =
    limitType === "restricted" ? Math.max(0, Number(multiplier)) * totalDurationSeconds : Infinity;

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return demoCurricula;
    return demoCurricula.filter((c) => c.name.toLowerCase().includes(t));
  }, [q]);

  const resetDrawer = () => {
    setCurrName("");
    setBranch("Elewayte");
    setLimitType("restricted");
    setMultiplier(0);
  };

  const onAddCurriculum = () => {
    const payload = {
      name: currName.trim(),
      branch,
      maxView: limitType === "unlimited" ? null : { multiplier: Number(multiplier), baseSeconds: totalDurationSeconds },
    };
    // TODO: Replace with API call
    console.log("Add Curriculum →", payload);
    setOpenDrawer(false);
    resetDrawer();
  };

  return (
    <div className="p-6">
      {/* Header + Actions (search + add) */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: title + description + count chip */}
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Curriculum</h1>
          <p className="text-slate-600 text-sm">Manage all your course curriculum in one place.</p>

          {/* All Curriculum + count */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-slate-600">All Curriculum</span>
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded bg-slate-100 px-1.5 text-xs text-slate-700">
              {filtered.length}
            </span>
          </div>
        </div>

        {/* Right: search + add */}
        <div className="flex items-center gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="h-9 w-64 rounded-md border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
            onClick={() => setOpenDrawer(true)}
          >
            <Plus size={16} />
            Add Curriculum
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 rounded-lg bg-white ring-1 ring-slate-200/60 overflow-hidden">
        {/* Head */}
        <div
          className="grid bg-slate-50 text-xs font-medium text-slate-600"
          style={{ gridTemplateColumns: "80px 1fr 160px 100px" }}
        >
          <div className="px-4 py-2">Sr.</div>
          <div className="px-4 py-2">Curriculum Name</div>
          <div className="px-4 py-2">Content</div>
          <div className="px-4 py-2 text-right">Actions</div>
        </div>

        {/* Rows */}
        {filtered.map((c, i) => (
          <div
            key={c.id}
            className="grid items-center border-t border-slate-100 hover:bg-slate-50"
            style={{ gridTemplateColumns: "80px 1fr 160px 100px" }}
          >
            <div className="px-4 py-3 tabular-nums text-slate-600">{String(i + 1).padStart(2, "0")}</div>

            <div className="px-4 py-3 text-sm text-slate-900">
              <button
                className="text-left hover:underline"
                onClick={() => {
                  // TODO: navigate(`/curriculum/${c.id}`)
                }}
              >
                {c.name}
              </button>
            </div>

            <div className="px-4 py-3 text-sm text-slate-700">{c.sections} Sections</div>

            <div className="px-4 py-3">
              <div className="flex items-center justify-end">
                <button className="h-8 w-8 grid place-items-center rounded-md hover:bg-slate-100">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="p-8 text-center text-sm text-slate-500">No curriculum found.</div>
        )}
      </div>

      {/* Right-side Drawer */}
      {openDrawer && (
        <>
          {/* overlay */}
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => {
              setOpenDrawer(false);
              resetDrawer();
            }}
          />
          {/* panel */}
          <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[460px] bg-white z-50 shadow-xl ring-1 ring-black/5 flex flex-col">
            {/* header */}
            <div className="flex items-center justify-between px-4 h-14 border-b">
              <div className="text-sm font-semibold text-slate-900">Add Curriculum</div>
              <button
                className="p-2 rounded hover:bg-slate-100"
                onClick={() => {
                  setOpenDrawer(false);
                  resetDrawer();
                }}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* body */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Name */}
              <label className="block text-sm font-medium text-slate-700">Name *</label>
              <input
                type="text"
                maxLength={100}
                placeholder="Enter curriculum name"
                value={currName}
                onChange={(e) => setCurrName(e.target.value)}
                className="mt-1 w-full h-10 rounded-md border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="mt-1 text-xs text-slate-500">{currName.length}/100</div>

              {/* Branch */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700">Branch</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="mt-1 w-full h-10 rounded-md border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Elewayte</option>
                  <option>Realtekh</option>
                  <option>Main</option>
                </select>
              </div>

              {/* Maximum View Duration */}
              <div className="mt-6">
                <div className="text-sm font-medium text-slate-700">Maximum View Duration</div>

                <div className="mt-2 space-y-2">
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="radio"
                      name="limitType"
                      value="unlimited"
                      checked={limitType === "unlimited"}
                      onChange={() => setLimitType("unlimited")}
                      className="h-4 w-4"
                    />
                    Unlimited
                  </label>

                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="radio"
                      name="limitType"
                      value="restricted"
                      checked={limitType === "restricted"}
                      onChange={() => setLimitType("restricted")}
                      className="h-4 w-4"
                    />
                    Restricted
                  </label>
                </div>

                {/* Watch-time row */}
                <div className="mt-3 rounded-md border border-slate-200 p-3 grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-4">
                    <div className="text-xs text-slate-600">Total duration</div>
                    <div className="mt-1 text-sm text-slate-900">{fmt(totalDurationSeconds)}</div>
                  </div>

                  <div className="col-span-1 text-center text-slate-500">×</div>

                  <div className="col-span-3">
                    <div className="text-xs text-slate-600">Multiplier</div>
                    <input
                      type="number"
                      min={0}
                      value={multiplier}
                      onChange={(e) => setMultiplier(e.target.value)}
                      disabled={limitType === "unlimited"}
                      className="mt-1 w-full h-9 rounded-md border border-slate-300 bg-white px-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50"
                    />
                  </div>

                  <div className="col-span-1 text-center text-slate-500">=</div>

                  <div className="col-span-3">
                    <div className="text-xs text-slate-600">Total watch-time</div>
                    <div className="mt-1 text-sm text-slate-900">
                      {limitType === "unlimited" ? "Unlimited" : fmt(totalWatchSeconds)}
                    </div>
                  </div>
                </div>

                {/* info box */}
                <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
                  <div className="font-medium mb-1">What is watch-time?</div>
                  Watch Time is the maximum duration a student can spend viewing course content. Once the
                  limit is reached, access is restricted.
                </div>
              </div>
            </div>

            {/* footer */}
            <div className="border-t p-3 flex items-center justify-end gap-2">
              <button
                className="inline-flex items-center justify-center h-9 px-3 rounded-md border border-slate-200 bg-white text-sm hover:bg-slate-50"
                onClick={() => {
                  setOpenDrawer(false);
                  resetDrawer();
                }}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center h-9 px-3 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700 disabled:opacity-60"
                disabled={!currName.trim()}
                onClick={onAddCurriculum}
              >
                Add Curriculum
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
