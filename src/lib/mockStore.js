// ---- seed courses (mirror your screenshots) ----
let _courses = [
  { id: 27369, title: "Python : Master the Language of the Future", prettyName: "PythonMaster", description: "", overview: "", published: true, thumbnailUrl: "" },
  { id: 1002,  title: "Web Development : Transform Ideas into Dynamic Websites.", prettyName: "WebDev", description: "", overview: "", published: true, thumbnailUrl: "" },
  { id: 1003,  title: "Data Science (AI & ML)", prettyName: "DS-ML", description: "", overview: "", published: false, thumbnailUrl: "" },
];

export const store = {
  listCourses({ q = "" } = {}) {
    const query = q.trim().toLowerCase();
    const data = query ? _courses.filter(c => c.title.toLowerCase().includes(query)) : _courses;
    return { items: data, total: data.length };
  },
  getCourse(id) {
    return _courses.find(c => String(c.id) === String(id)) || null;
  },
  updateCourse(id, patch) {
    const i = _courses.findIndex(c => String(c.id) === String(id));
    if (i === -1) return null;
    _courses[i] = { ..._courses[i], ...patch };
    return _courses[i];
  },
  createCourse(payload) {
    const id = Math.max(..._courses.map(c => c.id)) + 1;
    const course = { id, published:false, thumbnailUrl:"", ...payload };
    _courses.unshift(course);
    return course;
  }
};
