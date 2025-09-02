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

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
};

export default App;
