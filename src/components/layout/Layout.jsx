import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  // Hide Navbar/Footer for auth routes & worker dashboard routes
  const hideLayout =
    location.pathname.startsWith("/worker") ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <div>
      {!hideLayout && <Navbar />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </div>
  );
};

export default Layout;
