import React from "react";
//rrd
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

//layouts
import Layout from "./components/layout/Layout";
import { WorkerDashboardLayout } from "./pages/Worker/Layout/WorkerDashboardLayout";
import AdminLayout from "./pages/Admin/Layout/AdminLayout";

//common pages
import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";

//Worker Auth pages
import LoginPage from "./pages/Worker/Auth/Login";
import SignupPage from "./pages/Worker/Auth/SignUp";
import Logout from "./pages/Worker/Auth/Logout";

//Worker Dashboard pages
import { DashboardOverview } from "./pages/Worker/components/DashboardOverview";
import { AssignedWork } from "./pages/Worker/components/AssignedWork";
import { SalaryEarnings } from "./pages/Worker/components/SalaryEarnings";
import { Notifications } from "./pages/Worker/components/Notifications";
import { Profile } from "./pages/Worker/components/Profile";
import { HelpSupport } from "./pages/Worker/components/HelpSupport";
import WorkHistory from "./pages/Worker/pages/WorkHistory";

//Admin Auth pages
import AdminLogin from "./pages/Admin/Auth/AdminLogin";
import AdminLogout from "./pages/Admin/Auth/AdminLogout";
import AdminSignup from "./pages/Admin/Auth/AdminSignup";

//Admin Dashboard pages
import AdminWelcome from "./pages/Admin/pages/AdminWelcome";
import AdminDashboardOverview from "./pages/Admin/pages/AdminDashboardOverview";
import { WorkersManagement } from "./pages/Admin/pages/WorkersManagement";
import { AssignWork } from "./pages/Admin/pages/AssignWork";
import { SalaryManagement } from "./pages/Admin/pages/SalaryManagement";
import { WorkTracking } from "./pages/Admin/pages/WorkTracking";
import { ReportsAnalytics } from "./pages/Admin/pages/ReportsAnalytics";
import { MaterialsManagement } from "./pages/Admin/pages/MaterialsManagement";
import { NotificationsManagement } from "./pages/Admin/pages/NotificationsManagement";
import { AdminSettings } from "./pages/Admin/pages/AdminSettings";
import { WorkerDetails } from "./pages/Admin/pages/WorkerDetails";
import { SubmitWork } from "./pages/Admin/pages/SubmitWork";
import MonthlyWorkDetails from "./pages/Admin/pages/MonthlyWorkDetails";
import SalaryDetails from "./pages/Admin/pages/SalaryDetails";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Worker Auth Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<Logout />} />

          {/* Admin Auth Pages */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/logout" element={<AdminLogout />} />

          {/* Common pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Worker Layout */}
          <Route path="/worker" element={<WorkerDashboardLayout />}>
            <Route path="dashboard" element={<DashboardOverview />} />
            <Route path="assigned-work" element={<AssignedWork />} />
            <Route path="work-history" element={<WorkHistory />} />
            <Route path="salary" element={<SalaryEarnings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
            <Route path="help" element={<HelpSupport />} />
          </Route>

          {/* Admin Layout and Routes */}
          <Route path="/admin/welcome" element={<AdminWelcome />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboardOverview />} />
            <Route path="workers" element={<WorkersManagement />} />
            {/* sub pages */}
            <Route path="workers/:id" element={<WorkerDetails />} />
            <Route path="assign-work" element={<AssignWork />} />
            <Route path="submit-work" element={<SubmitWork />} />
            <Route path="work-tracking" element={<WorkTracking />} />
            {/* sub pages */}
            <Route path="work-tracking/:id" element={<MonthlyWorkDetails />} />
            <Route path="salary" element={<SalaryManagement />} />
            {/* sub pages */}
            <Route path="salary/:id" element={<SalaryDetails />} />
            <Route path="materials" element={<MaterialsManagement />} />
            <Route path="notifications" element={<NotificationsManagement />} />
            <Route path="reports" element={<ReportsAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
};

export default App;
