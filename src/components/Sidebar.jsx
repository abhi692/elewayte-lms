// src/components/Sidebar.jsx
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Megaphone,
  ShoppingBag,
  LineChart,
  FileBarChart,
  Settings,
  Award,
  ClipboardList,
  MessageSquare,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";

/** ---------- NAV MODEL (edit routes/labels here) ---------- */
const NAV = [
  // Singles
  { id: "dashboard", type: "single", label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },

  // Course delivery
  {
    id: "course",
    label: "Course delivery",
    icon: BookOpen,
    children: [
      { label: "Courses", to: "/courses" },
      { label: "Batches", to: "/batches" },
      { label: "Sessions", to: "/sessions" },
      { label: "Events", to: "/events", badge: "NEW" },
      { label: "Curriculum", to: "/curriculum" },
      { label: "Question Bank", to: "/question-bank" },
      { label: "Live Class Recordings", to: "/live-class-recordings" },
      { label: "Categories", to: "/categories" },
      { label: "Submissions", to: "/submissions" },
      { label: "Feedback forms", to: "/feedback-forms" },
    ],
  },

  // Users
  {
    id: "users",
    label: "Users",
    icon: Users,
    children: [
      { label: "Learners", to: "/users/learners" },
      { label: "Admins & Instructors", to: "/users/admins" },
      { label: "New Enrollment", to: "/users/new-enrollment" },
    ],
  },

  // Marketing
  {
    id: "marketing",
    label: "Marketing",
    icon: Megaphone,
    children: [
      { label: "Announcements", to: "/marketing/announcements" },
      { label: "Campaigns", to: "/marketing/campaigns", badge: "NEW" },
      { label: "Blogs", to: "/marketing/blogs" },
      { label: "Memberships", to: "/marketing/memberships", badge: "NEW" },
      { label: "Course Banners", to: "/marketing/course-banners" },
      { label: "Leads & Enquiries", to: "/marketing/leads" },
      { label: "SMS", to: "/marketing/sms" },
      { label: "Workflows", to: "/marketing/workflows", badge: "NEW" },
      { label: "Promotional Templates", to: "/marketing/promotional-templates" },
      { label: "Promotional Banners", to: "/marketing/promotional-banners" },
      { label: "Segments", to: "/marketing/segments", badge: "NEW" },
      { label: "Conversations", to: "/marketing/conversations", badge: "NEW" },
    ],
  },

  // Sales
  {
    id: "sales",
    label: "Sales",
    icon: ShoppingBag,
    children: [
      { label: "Payments Transactions", to: "/sales/payments-transactions" },
      { label: "Payment Settlements", to: "/sales/payment-settlements" },
      { label: "Fee Details", to: "/sales/fee-details" },
      { label: "Promo Codes", to: "/sales/promo-codes" },
      { label: "Cheque Management", to: "/sales/cheque-management" },
      { label: "Loyalty Program", to: "/sales/loyalty-program" },
      { label: "Fees Templates", to: "/sales/fees-templates" },
      { label: "Miscellaneous Fees", to: "/sales/miscellaneous-fees" },
      { label: "Abandoned Cart", to: "/sales/abandoned-cart" },
    ],
  },

  // Analytics
  {
    id: "analytics",
    label: "Analytics",
    icon: LineChart,
    children: [
      { label: "Learner Analytics", to: "/analytics/learner" },
      { label: "Course Analytics", to: "/analytics/course" },
      { label: "Test Analytics", to: "/analytics/test" },
    ],
  },

  // Reports
  {
    id: "reports",
    label: "Reports",
    icon: FileBarChart,
    children: [
      { label: "Sales", to: "/reports/sales" },
      { label: "Enrollments", to: "/reports/enrollments" },
      { label: "Payments", to: "/reports/payments" },
      { label: "GST", to: "/reports/gst" },
      { label: "Attendance", to: "/reports/attendance" },
      { label: "Branch Statistics", to: "/reports/branch-stats" },
      { label: "Course Wise Enrollments", to: "/reports/course-wise-enrollments" },
      { label: "Promo Code Statistics", to: "/reports/promo-code-stats" },
      { label: "Bandwidth Consumption", to: "/reports/bandwidth-consumption" },
      { label: "Storage Consumption", to: "/reports/storage-consumption" },
      { label: "Scheduled Tasks", to: "/reports/scheduled-tasks" },
      { label: "Wallet Recharges", to: "/reports/wallet-recharges", badge: "NEW" },
    ],
  },

  // Settings
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    children: [
      { label: "My Profile", to: "/settings/my-profile" },
      { label: "Institution Profile", to: "/settings/institution-profile" },
      { label: "Branches", to: "/settings/branches" },
      { label: "General Preferences", to: "/settings/general-preferences" },
      { label: "Master Data", to: "/settings/master-data" },
      { label: "Email Notifications", to: "/settings/email-notifications" },
      { label: "SMS Notifications", to: "/settings/sms-notifications" },
      { label: "GST Settings", to: "/settings/gst-settings" },
      { label: "Field Customization", to: "/settings/field-customization" },
      { label: "Integrations", to: "/settings/integrations" },
      { label: "Billing", to: "/settings/billing" },
      { label: "International Selling", to: "/settings/international-selling" },
      { label: "Grading System", to: "/settings/grading-system" },
      { label: "Roles and Permissions", to: "/settings/roles-and-permissions", badge: "NEW" },
      { label: "Website & App Setup", to: "/settings/website-app-setup" },
      { label: "Testimonials", to: "/settings/testimonials" },
      { label: "System Notifications", to: "/settings/system-notifications", badge: "NEW" },
      { label: "Utility Wallet", to: "/settings/utility-wallet" },
    ],
  },

  // Singles (no dropdown)
  { id: "certificates", type: "single", label: "Certificates", to: "/certificates", icon: Award },
  { id: "exams", type: "single", label: "Exams/Tests", to: "/exams-tests", icon: ClipboardList },
  { id: "discussions", type: "single", label: "Discussions", to: "/discussions", icon: MessageSquare },
];

/** ---------- COMPONENT ---------- */
export default function Sidebar() {
  const location = useLocation();

  // open state persisted; by default open a group if current URL is inside it
  const [open, setOpen] = useState(() => {
    let initial = {};
    try {
      initial = JSON.parse(localStorage.getItem("elewayte_sidebar_open") || "{}");
    } catch {}
    // auto-open group that matches current route
    NAV.forEach((g) => {
      if (g.children?.length) {
        if (g.children.some((c) => location.pathname.startsWith(c.to))) {
          initial[g.id] = true;
        }
      }
    });
    return initial;
  });

  useEffect(() => {
    localStorage.setItem("elewayte_sidebar_open", JSON.stringify(open));
  }, [open]);

  const toggle = (id) => setOpen((s) => ({ ...s, [id]: !s[id] }));

  return (
    <aside className="w-64 shrink-0 bg-[var(--sidebar)] text-slate-200 flex flex-col">
      {/* Brand */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-white/10 grid place-items-center">
          <span className="text-pink-300 font-bold">E</span>
        </div>
        <span className="font-semibold text-white">Elewayte</span>
      </div>

      {/* Nav list */}
      <nav className="flex-1 overflow-y-auto px-2 py-1 space-y-1">
        {NAV.map((item) =>
          item.type === "single" ? (
            <SingleItem key={item.id} icon={item.icon} label={item.label} to={item.to} />
          ) : (
            <GroupItem
              key={item.id}
              id={item.id}
              icon={item.icon}
              label={item.label}
              open={!!open[item.id]}
              onToggle={() => toggle(item.id)}
              childrenItems={item.children}
            />
          )
        )}
      </nav>

      {/* User chip */}
      <div className="mt-auto px-4 py-3">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
          <div className="w-7 h-7 rounded-full bg-indigo-200/80 text-indigo-900 grid place-items-center text-xs font-semibold">
            E
          </div>
          <div className="min-w-0">
            <div className="text-sm text-white truncate">Abhishek</div>
            <div className="text-[11px] text-slate-400">SUPER ADMIN</div>
          </div>
          <button className="ml-auto w-7 h-7 rounded-md hover:bg-white/10 grid place-items-center text-slate-400">⋯</button>
        </div>
      </div>
    </aside>
  );
}

/** ---------- Building blocks ---------- */
function SingleItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group flex items-center gap-3 h-10 px-3 text-sm rounded-md transition
         ${isActive ? "bg-white/10 text-white" : "text-slate-300 hover:text-white hover:bg-white/5"}`
      }
    >
      <Icon size={18} className="opacity-90" />
      <span className="flex-1">{label}</span>
    </NavLink>
  );
}

function GroupItem({ id, icon: Icon, label, open, onToggle, childrenItems }) {
  return (
    <div className="rounded-md">
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex items-center gap-3 h-10 px-3 text-sm rounded-md transition
          ${open ? "bg-white/10 text-white" : "text-slate-300 hover:text-white hover:bg-white/5"}`}
      >
        <Icon size={18} className="opacity-90" />
        <span className="flex-1 text-left">{label}</span>
        {open ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />}
      </button>

      {open && (
        <div className="mt-1 ml-9 space-y-1 pb-1">
          {childrenItems.map((c, i) => (
            <NavLink
              key={`${id}-${i}`}
              to={c.to}
              className={({ isActive }) =>
                `flex items-center gap-2 h-9 px-3 rounded-md text-sm
                 ${isActive ? "bg-white/10 text-white" : "text-slate-300 hover:text-white hover:bg-white/5"}`
              }
            >
              <span className="flex-1">{c.label}</span>
              {c.badge === "NEW" && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-blue-600/90 text-white font-medium">
                  NEW
                </span>
              )}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
