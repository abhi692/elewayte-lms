import { useOutletContext } from "react-router-dom";

export default function DetailsTab() {
  const { course } = useOutletContext();

  return (
    <div className="p-5">
      {/* Thumbnail */}
      <label className="text-sm font-medium text-slate-700">Thumbnail Image</label>
      <div className="mt-2 rounded-md border-2 border-dashed border-slate-300 bg-slate-50/50 p-4">
        <img
          src={course.thumb}
          alt=""
          className="w-full max-w-3xl h-56 object-cover rounded-md ring-1 ring-slate-200 bg-white"
        />
        <div className="mt-2 text-xs text-slate-500">{course.title.replace(/\s+/g, "")}.png</div>
      </div>

      {/* Course name */}
      <div className="mt-6">
        <label className="text-sm font-medium text-slate-700">Course name <span className="text-rose-500">*</span></label>
        <div className="mt-2">
          <input
            defaultValue={course.title}
            className="w-full max-w-3xl h-10 rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
        <div className="mt-1 text-right w-full max-w-3xl text-xs text-slate-400">42 / 350</div>
      </div>

      {/* Description */}
      <div className="mt-4">
        <label className="text-sm font-medium text-slate-700">Description</label>
        <textarea
          placeholder="A short description of your course"
          className="mt-2 w-full max-w-3xl min-h-[140px] rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        />
      </div>

      {/* Pretty name */}
      <div className="mt-6">
        <label className="text-sm font-medium text-slate-700">Pretty name</label>
        <input
          defaultValue={course.title.replace(/\s/g, "")}
          className="mt-2 w-full max-w-3xl h-10 rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        />
        <div className="mt-1 text-right w-full max-w-3xl text-xs text-slate-400">34 / 50</div>
      </div>

      {/* Overview (simple textarea now) */}
      <div className="mt-6">
        <label className="text-sm font-medium text-slate-700">Overview</label>
        <textarea
          className="mt-2 w-full max-w-3xl min-h-[160px] rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          placeholder="Write an overview for this course..."
        />
      </div>

      {/* Sub-categories + Promo URL */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">
        <div>
          <label className="text-sm font-medium text-slate-700">Sub-Categories</label>
          <select className="mt-2 w-full h-10 rounded-md border border-slate-300 bg-white px-3 text-sm">
            <option>Self-Paced Program</option>
            <option>Instructor-Led</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Promo video URL</label>
          <input
            placeholder="Enter Promo video URL"
            className="mt-2 w-full h-10 rounded-md border border-slate-300 px-3 text-sm"
          />
        </div>
      </div>

      {/* Checkboxes */}
      <div className="mt-6 space-y-3 max-w-3xl text-sm text-slate-700">
        <label className="flex items-start gap-2">
          <input type="checkbox" className="mt-1" />
          <span>
            <span className="font-medium">Content access after completion</span>
            <div className="text-slate-500 text-xs">
              Allow enrolled learners to access course content even after the batch is marked as completed.
            </div>
          </span>
        </label>

        <label className="flex items-start gap-2">
          <input type="checkbox" className="mt-1" />
          <span>
            <span className="font-medium">Course completion</span>
            <div className="text-slate-500 text-xs">Allow learner to mark course as complete.</div>
          </span>
        </label>

        <label className="flex items-start gap-2">
          <input type="checkbox" className="mt-1" />
          <span>
            <span className="font-medium">Enable milestone achievement celebrations on course player</span>
            <div className="text-slate-500 text-xs">
              Show built-in celebration screens at key milestones to motivate learners.
            </div>
          </span>
        </label>
      </div>

      <div className="mt-6">
        <button className="h-9 px-4 rounded-md bg-primary text-white text-sm font-medium hover:bg-blue-600">Save</button>
      </div>
    </div>
  );
}
