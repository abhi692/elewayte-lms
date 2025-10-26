// src/pages/courses/CoursesList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Search, Filter } from "lucide-react";

export default function CoursesList() {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);

  // Close any open kebab menu on click outside / escape / route change
  useEffect(() => {
    const close = () => setOpenMenuId(null);
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("click", close);
    window.addEventListener("scroll", close, true);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Dummy data (images optional; fallback will render if missing)
  const courses = [
    { id: 1, title: "Python : Master the Language of the Future", image: "/course-thumbs/python.jpg" },
    { id: 2, title: "PYTHON", image: "/course-thumbs/python2.jpg" },
    { id: 3, title: "Web Development : Transform Ideas into Dynamic Websites.", image: "/course-thumbs/webdev1.jpg" },
    { id: 4, title: "Web Development", image: "/course-thumbs/webdev2.jpg" },
    { id: 5, title: "Auto CAD: Bringing Your Blueprints to Life", image: "/course-thumbs/autocad.jpg" },
  ];

  // Local placeholder if image not available yet
  const fallbackImg = "https://via.placeholder.com/64x40?text=IMG";

  const onRowClick = (id) => navigate(`/courses/${id}`);

  const onKebabClick = (e, id) => {
    e.stopPropagation(); // don't trigger row navigation
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-slate-800">Courses</h2>
          <span className="ml-2 text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
            5 PUBLISHED
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-300"
            />
          </div>
          <button className="flex items-center gap-1 text-sm text-slate-600">
            <Filter size={14} /> Filters
          </button>
          <button className="px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium">
            + New Course
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg bg-white border border-slate-200">
        {/* Header row */}
        <div
          className="grid bg-slate-50 text-xs font-medium text-slate-600 border-b border-slate-200"
          style={{ gridTemplateColumns: "72px 1fr 100px" }}
        >
          <div className="px-4 py-3">Sr.</div>
          <div className="px-4 py-3">Course name</div>
          <div className="px-4 py-3 text-right">Actions</div>
        </div>

        {/* Rows */}
        {courses.map((course, index) => (
          <div
            key={course.id}
            className="grid items-center border-b border-slate-100 hover:bg-slate-50 cursor-pointer relative"
            style={{ gridTemplateColumns: "72px 1fr 100px" }}
            onClick={() => onRowClick(course.id)}
          >
            {/* Sr. */}
            <div className="px-4 py-3 text-sm text-slate-700 tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Course name (image optional) */}
            <div className="flex items-center gap-3 px-4 py-3 min-w-0">
              <img
                src={course.image}
                alt={course.title}
                className="h-10 w-16 rounded-md object-cover border border-slate-200 bg-slate-100"
                onError={(e) => {
                  // If images are not ready yet, keep UI stable
                  e.currentTarget.src = fallbackImg;
                }}
              />
              <div className="text-sm text-slate-800 truncate">{course.title}</div>
            </div>

            {/* Actions */}
            <div className="px-4 py-3 text-right relative">
              <button
                className="w-8 h-8 grid place-items-center rounded-md hover:bg-slate-100 text-slate-500"
                onClick={(e) => onKebabClick(e, course.id)}
              >
                <MoreVertical size={18} />
              </button>

              {/* Dropdown */}
              {openMenuId === course.id && (
                <div
                  className="absolute right-3 top-10 w-32 bg-white border border-slate-200 shadow-lg rounded-md z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    onClick={() => {
                      setOpenMenuId(null);
                      // placeholder: implement reorder modal later
                    }}
                  >
                    Reorder
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setOpenMenuId(null);
                      // placeholder: implement archive action later
                    }}
                  >
                    Archive
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
