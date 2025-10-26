// Mock data
export const courses = [
  {
    id: 1,
    title: 'Python : Master the Language of the Future',
    thumb: 'https://cdn-icons-png.flaticon.com/512/5968/5968350.png',
    published: true,
  },
  {
    id: 2,
    title: 'Web Development : Transform Ideas into Dynamic Websites',
    thumb: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png',
    published: true,
  },
  {
    id: 3,
    title: 'AutoCAD : Bringing Your Blueprints to Life',
    thumb: 'https://cdn-icons-png.flaticon.com/512/5968/5968267.png',
    published: false,
  },
  {
    id: 4,
    title: 'Data Science (AI & ML)',
    thumb: 'https://cdn-icons-png.flaticon.com/512/2103/2103659.png',
    published: true,
  },
];

// Helper: find by id (id can be string or number)
export function getCourseById(id) {
  const key = String(id);
  return courses.find(c => String(c.id) === key) || null;
}
