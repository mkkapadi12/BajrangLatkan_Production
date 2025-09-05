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
import AdminWelcome from "./pages/Admin/components/AdminWelcome";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Auth pages for worker */}
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
          <Route path="/admin" element={<AdminWelcome />} />

          {/* 404 Not Found */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
};

export default App;
