import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard.jsx";
import CoursesList from "./pages/courses/CoursesList.jsx";
import CourseEditLayout from "./pages/courses/CourseEditLayout.jsx";

// Tabs
import DetailsTab from "./pages/courses/tabs/DetailsTab.jsx";
import BatchesTab from "./pages/courses/tabs/BatchesTab.jsx";
import PricingPublishingTab from "./pages/courses/tabs/PricingPublishingTab.jsx";
import LearnersTab from "./pages/courses/tabs/LearnersTab.jsx";
import DripTab from "./pages/courses/tabs/DripTab.jsx";

// Curriculum pages
import CurriculumIndex from "./pages/courses/CurriculumIndex.jsx";
import CurriculumSections from "./pages/courses/CurriculumSections.jsx"; // ← NEW PAGE

export default function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/courses" element={<CoursesList />} />

          <Route path="/courses/:courseId" element={<CourseEditLayout />}>
            <Route index element={<DetailsTab />} />
            <Route path="details" element={<DetailsTab />} />
            <Route path="curriculum" element={<CurriculumIndex />} />
            {/* Builder page (the detailed sections view) */}
            <Route path="curriculum/sections" element={<CurriculumSections />} />
            <Route path="batches" element={<BatchesTab />} />
            <Route path="pricing" element={<PricingPublishingTab />} />
            <Route path="learners" element={<LearnersTab />} />
            <Route path="drip" element={<DripTab />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}
