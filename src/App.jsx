// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
// Main pages
import Dashboard from "./pages/Dashboard.jsx";
import CoursesList from "./pages/courses/CoursesList.jsx";
import CourseEditLayout from "./pages/courses/CourseEditLayout.jsx";

// Sidebar → All batches page
import BatchesPage from "./pages/courses/batches/BatchesTab.jsx";

// Course tabs
import DetailsTab from "./pages/courses/tabs/DetailsTab.jsx";
import BatchesTab from "./pages/courses/tabs/BatchesTab.jsx";
import PricingPublishingTab from "./pages/courses/tabs/PricingPublishingTab.jsx";
import LearnersTab from "./pages/courses/tabs/LearnersTab.jsx";
import DripTab from "./pages/courses/tabs/DripTab.jsx";

// Curriculum
import CurriculumIndex from "./pages/courses/CurriculumIndex.jsx";
import CurriculumSections from "./pages/courses/CurriculumSections.jsx";

// Learner profile
import LearnerProfile from "./pages/courses/learner/LearnerProfile.jsx";

// Enrollment
import NewEnrollment from "./pages/enrollment/NewEnrollment.jsx";

export default function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Sidebar → show all batches */}
          <Route path="/batches" element={<BatchesPage />} />

          {/* Courses list */}
          <Route path="/courses" element={<CoursesList />} />

          {/* Course edit layout with nested tabs */}
          <Route path="/courses/:courseId" element={<CourseEditLayout />}>
            <Route index element={<DetailsTab />} />
            <Route path="details" element={<DetailsTab />} />
            <Route path="curriculum" element={<CurriculumIndex />} />
            <Route path="curriculum/sections" element={<CurriculumSections />} />
            <Route path="batches" element={<BatchesTab />} />
            <Route path="pricing" element={<PricingPublishingTab />} />
            <Route path="learners" element={<LearnersTab />} />
            <Route path="learners/:learnerId" element={<LearnerProfile />} />
            <Route path="drip" element={<DripTab />} />
            {/* Learner → add to course (relative child route) */}
            <Route
              path="learners/:learnerId/add-to-course"
              element={<NewEnrollment />}
            />
          </Route>
        </Routes>
      </main>
    </div>
  );
}
