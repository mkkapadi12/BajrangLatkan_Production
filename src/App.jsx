import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import LoginPage from "./pages/Auth/Login";
import SignupPage from "./pages/Auth/SignUp";
import { Toaster } from "react-hot-toast";
import Logout from "./pages/Auth/Logout";
import { WorkerDashboardLayout } from "./pages/Worker/Layout/WorkerDashboardLayout";
import { DashboardOverview } from "./pages/Worker/components/DashboardOverview";
import { AssignedWork } from "./pages/Worker/components/AssignedWork";
import { SalaryEarnings } from "./pages/Worker/components/SalaryEarnings";
import { Notifications } from "./pages/Worker/components/Notifications";
import { Profile } from "./pages/Worker/components/Profile";
import { HelpSupport } from "./pages/Worker/components/HelpSupport";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Auth pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<Logout />} />

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

          {/* 404 Not Found */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
};

export default App;
