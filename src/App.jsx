import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
// import Products from './pages/Products'
// import Workers from './pages/Workers'
import HomePage from "./pages/Home";
import ProductsPage from "./pages/ProductPage";
import WorkersPage from "./pages/WorkerPage";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import WorkerDetailsPage from "./pages/SingleWorker";
// import SingleWorkerPage from "./pages/SingleWorkerPage";
import LoginPage from "./pages/Auth/Login";
import SignupPage from "./pages/Auth/SignUp";
import { Toaster } from "react-hot-toast";
import Logout from "./pages/Auth/Logout";
import { useAuthContext } from "./context/AuthContext";
import PrivateRoute from "./Private/PrivateRoute";

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
          <Route path="/products" element={<ProductsPage />} />
          <Route
            path="/workers"
            element={
              <PrivateRoute>
                <WorkersPage />
              </PrivateRoute>
            }
          />
          <Route path="/workers/:id" element={<WorkerDetailsPage />} />
          {/* <Route path="/workers/:id" element={<SingleWorkerPage />} /> */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
};

export default App;
