export default function DripTab() {
  return (
    <div className="p-5">
      <h2 className="text-lg font-semibold text-slate-900">Drip</h2>
      <p className="text-slate-600 mt-2">Schedule content releases over time.</p>

      <div className="mt-6 rounded-md border border-slate-200 p-4">
        <div className="text-sm text-slate-600">
          No drip rules configured. Click <span className="font-medium">Add Rule</span> to start.
        </div>
        <div className="mt-3">
          <button className="h-9 px-3 rounded-md border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50">
            Add Rule
          </button>
        </div>
      </div>
    </div>
  );
}
