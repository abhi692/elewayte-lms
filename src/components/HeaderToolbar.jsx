import { Search, Funnel, ChevronDown, Plus } from 'lucide-react'

export default function HeaderToolbar({ publishedCount = 39, totalCount = 51 }) {
  return (
    <header className="flex items-center justify-between px-8 pt-6 pb-4">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-slate-900">Courses</h1>
          <span className="inline-flex items-center px-2 h-6 rounded-full text-xs font-medium bg-green-50 text-green-700 ring-1 ring-green-200">
            {publishedCount} PUBLISHED
          </span>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
          <button className="inline-flex items-center gap-1 px-1.5 py-1 rounded hover:bg-slate-100">
            Courses <ChevronDown size={12} />
          </button>
          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">{totalCount}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search"
            className="pl-9 pr-3 h-9 w-72 rounded-md border border-slate-200 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
        <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50">
          <Funnel size={16} /> Filters
        </button>
        <button className="h-9 px-4 rounded-md bg-primary text-white text-sm font-medium hover:bg-blue-600 flex items-center gap-1.5">
          <Plus size={16} /> New Course
        </button>
      </div>
    </header>
  )
}
