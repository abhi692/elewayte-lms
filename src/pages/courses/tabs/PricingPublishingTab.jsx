export default function PricingPublishingTab() {
  return (
    <div className="p-5">
      <h2 className="text-lg font-semibold text-slate-900">Pricing & Publishing</h2>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
        <div>
          <label className="text-sm font-medium text-slate-700">Price (₹)</label>
          <input className="mt-2 w-full h-10 rounded-md border border-slate-300 px-3 text-sm" defaultValue="0" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Discount (%)</label>
          <input className="mt-2 w-full h-10 rounded-md border border-slate-300 px-3 text-sm" defaultValue="0" />
        </div>
      </div>

      <div className="mt-6 space-x-2">
        <button className="h-9 px-3 rounded-md border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50">
          Save Draft
        </button>
        <button className="h-9 px-3 rounded-md bg-primary text-white text-sm font-medium hover:bg-blue-600">
          Publish
        </button>
      </div>
    </div>
  );
}
