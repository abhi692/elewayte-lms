import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-[#f7f8fa]">
        <Topbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
