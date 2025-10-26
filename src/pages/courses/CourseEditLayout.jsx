import { NavLink, Outlet, useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../../data/courses";
import { ChevronLeft } from "lucide-react";

const TABS = [
  { label: "Details", path: "" }, // index
  { label: "Curriculum", path: "curriculum" },
  { label: "Batches", path: "batches" },
  { label: "Pricing and Publishing", path: "pricing" },
  { label: "Learners", path: "learners" },
  { label: "Drip", path: "drip" },
];

export default function CourseEditLayout() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = getCourseById(courseId);

  if (!course) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-semibold">Course not found</h1>
        <button className="mt-4 text-blue-600 underline" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--page-bg)]">
      {/* Header */}
      <div className="px-6 pt-5 pb-3 flex items-start gap-3">
        <button
          onClick={() => navigate(-1)}
          className="h-9 w-9 rounded-md border border-slate-200 bg-white grid place-items-center hover:bg-slate-50"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex-1">
          <div className="text-lg font-semibold text-slate-900">Create and Edit your Course</div>
          <div className="text-sm text-slate-600">
            {course.title} <span className="text-slate-400">#{course.id}</span>
          </div>

          {/* Tabs */}
          <div className="mt-4 border-b border-slate-200">
            <nav className="-mb-px flex flex-wrap gap-6">
              {TABS.map((t) => {
                const to = t.path ? `/courses/${course.id}/${t.path}` : `/courses/${course.id}`;
                return (
                  <NavLink
                    key={t.label}
                    to={to}
                    end={!t.path}
                    className={({ isActive }) =>
                      `inline-flex items-center px-1 py-3 text-sm font-medium border-b-2 ${
                        isActive
                          ? "border-primary text-slate-900"
                          : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                      }`
                    }
                  >
                    {t.label}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Routed content */}
      <div className="px-6 pb-10">
        <div className="rounded-lg bg-white ring-1 ring-slate-200/60 shadow-sm">
          <Outlet context={{ course }} />
        </div>
      </div>
    </div>
  );
}
