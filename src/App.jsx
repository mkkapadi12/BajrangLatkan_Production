import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import LoginPage from "./pages/Worker/Auth/Login";
import SignupPage from "./pages/Worker/Auth/SignUp";
import { Toaster } from "react-hot-toast";
import Logout from "./pages/Worker/Auth/Logout";
import { WorkerDashboardLayout } from "./pages/Worker/Layout/WorkerDashboardLayout";
import { DashboardOverview } from "./pages/Worker/components/DashboardOverview";
import { AssignedWork } from "./pages/Worker/components/AssignedWork";
import { SalaryEarnings } from "./pages/Worker/components/SalaryEarnings";
import { Notifications } from "./pages/Worker/components/Notifications";
import { Profile } from "./pages/Worker/components/Profile";
import { HelpSupport } from "./pages/Worker/components/HelpSupport";
import AdminLogin from "./pages/Admin/Auth/AdminLogin";
import AdminLogout from "./pages/Admin/Auth/AdminLogout";
import AdminSignup from "./pages/Admin/Auth/AdminSignup";
import AdminWelcome from "./pages/Admin/pages/AdminWelcome";
import AdminLayout from "./pages/Admin/Layout/AdminLayout";
import AdminDashboardOverview from "./pages/Admin/pages/AdminDashboardOverview";
import { WorkersManagement } from "./pages/Admin/pages/WorkersManagement";
import { AssignWork } from "./pages/Admin/pages/AssignWork";
import { SalaryManagement } from "./pages/Admin/pages/SalaryManagement";
import { WorkTracking } from "./pages/Admin/pages/WorkTracking";
import { ReportsAnalytics } from "./pages/Admin/pages/ReportsAnalytics";
import { MaterialsManagement } from "./pages/Admin/pages/MaterialsManagement";
import { NotificationsManagement } from "./pages/Admin/pages/NotificationsManagement";
import { AdminSettings } from "./pages/Admin/pages/AdminSettings";

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
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Worker Layout */}
          <Route path="/worker" element={<WorkerDashboardLayout />}>
            <Route path="dashboard" element={<DashboardOverview />} />
            <Route path="work" element={<AssignedWork />} />
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
            <Route path="assign-work" element={<AssignWork />} />
            <Route path="work-tracking" element={<WorkTracking />} />
            <Route path="salary" element={<SalaryManagement />} />
            <Route path="materials" element={<MaterialsManagement />} />
            <Route path="notifications" element={<NotificationsManagement />} />
            <Route path="reports" element={<ReportsAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
};

export default App;
