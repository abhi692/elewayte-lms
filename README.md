# 🎓 Elewayte LMS (In-house Learning Management System)

Elewayte LMS is an internal learning management platform built to streamline course delivery, content management, and analytics across multiple departments — designed as a full replica of Edmingle but optimized for Elewayte’s needs.

---

## 🚀 Project Overview

This project aims to replicate the functionality and layout of the Edmingle LMS using:
- **Frontend:** React + Vite + Tailwind CSS
- **UI Framework:** Lucide React Icons
- **Routing:** React Router v6
- **Design Goal:** Clean, modern, and fully modular UI (100% customizable later for backend integration)

---

## 🧩 Current Folder Structure

elewayte-lms/
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ │ ├── Sidebar.jsx
│ │ ├── HeaderToolbar.jsx
│ │ └── CourseRow.jsx
│ ├── pages/
│ │ ├── dashboard/
│ │ │ └── Dashboard.jsx
│ │ ├── courses/
│ │ │ ├── CoursesList.jsx
│ │ │ ├── CourseEditLayout.jsx
│ │ │ ├── tabs/
│ │ │ │ ├── DetailsTab.jsx
│ │ │ │ ├── CurriculumIndex.jsx
│ │ │ │ └── CurriculumSections.jsx
│ │ └── ...
│ ├── data/
│ │ └── courses.js (mock data)
│ ├── libs/
│ │ └── apiClient.js (to be connected later)
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md

yaml
Copy code

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Routing | React Router v6 |
| Build Tool | Vite |
| API Client (Future) | Axios |
| Data | Currently Mock Data (JSON) |

---

## 🧠 Current Progress

### ✅ Completed
- Full Sidebar with all dropdowns:
  - Course Delivery
  - Users
  - Marketing
  - Sales
  - Analytics
  - Reports
  - Settings
  - Certificates
  - Exams/Tests
  - Discussions
- Dashboard UI with:
  - Stats Cards (Avg Time, Total Views, Avg Rating, Avg Attendance)
  - Graph Components (Daily Active Users, Enrollments)
  - Sessions Table (with Actions dropdown)
- Courses Module with:
  - Courses List View
  - Curriculum Index
  - Course Edit Layout
- Tailwind + Lucide properly configured
- Optimized Vite setup for faster development

---

## 🔗 Planned API Endpoints (For Chennai Team)

| Feature | Endpoint | Method | Description |
|----------|-----------|---------|--------------|
| Dashboard Stats | `/api/dashboard` | GET | Fetch overall metrics |
| Sessions Table | `/api/sessions` | GET | Get all scheduled sessions |
| Courses List | `/api/courses` | GET | List all courses |
| Course Details | `/api/courses/:id` | GET | Get specific course info |
| Curriculum Data | `/api/courses/:id/sections` | GET | Fetch course curriculum |
| User Management | `/api/users` | GET/POST/PUT/DELETE | Manage learners, instructors, admins |

---

## 🧩 Integration Plan

Once backend is ready:
1. Update `.env` with:
   ```env
   VITE_API_BASE_URL=https://api.elewayte.com
Create /src/libs/apiClient.js:

js
Copy code
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});
Replace mock imports:

js
Copy code
// OLD
import { getCourseById } from "../../data/courses";
const course = getCourseById(id);

// NEW
import { api } from "../../libs/apiClient";
const { data: course } = await api.get(`/courses/${id}`);
💻 Setup Instructions
bash
Copy code
# 1. Clone the project
git clone https://github.com/elewayte/elewayte-lms.git
cd elewayte-lms

# 2. Install dependencies
npm install

# 3. Run locally
npm run dev

# 4. Build for production
npm run build
Access the app at http://localhost:5173/

🧾 Change Log
📅 Oct 26, 2025
Added session table under dashboard

Added icons to “Schedule Session” and “What’s New” buttons

Removed credit wallet section from dashboard topbar

Expanded sidebar dropdowns (Users, Marketing, Sales, Analytics, Reports, Settings)

📅 Oct 25, 2025
Completed CoursesList, CurriculumIndex, and CourseEditLayout

Fixed Sidebar active state and color consistency

Setup Tailwind & Vite optimization

👨‍💻 Contributors
Frontend Development: Mishty / Abhi-Mish

Backend Integration: Chennai Tech Team (Realtekh Software Services Pvt. Ltd.)

🏗️ Future Enhancements
API integration for all dashboards and courses

JWT-based login system

Role-based UI access (Admin, Instructor, Learner)

Notification & reminder system

LMS Analytics Dashboard

Content upload via Admin panel

🧰 Environment Requirements
Node.js ≥ 18

npm ≥ 9

Vite ≥ 7

Tailwind CSS ≥ 3.4

© 2025 Elewayte EdTech (Realtekh Software Services Pvt. Ltd.)
All rights reserved.