import { showLogoutToast, showUserToast } from "@/Toast/customToast";
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
// import toast from "react-hot-toast";

const AdminContext = createContext();
// const BASE_URL = "http://localhost:5000/api/admin"; // Update with your actual base URL if needed
const BASE_URL =
"https://bajrang-latkan-production-server.vercel.app/api/admin";

const AdminProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("adminToken") || null
  );
  const [admin, setAdmin] = useState(""); // Initialize with null to indicate no user initially
  // const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = !!token;

  const authorizationToken = `Bearer ${token}`;

  // Store token in Local Storage and update state
  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("adminToken", serverToken);
    setToken(serverToken);
  };

  // Logout function
  const adminLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    if (token == null) {
      showLogoutToast();
    }
    setAdmin(""); // Clear the user data on logout
  };

  // JWT Authentication - Fetch currently logged-in user data
  const userAuthentication = async () => {
    if (!token) return; // Skip if no token is available
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/auth`, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      const userInfo = res.data;
      setAdmin(userInfo.adminData); // Update admin state
      setLoading(false);
    } catch (error) {
      console.error("Can't fetch admin data:", error.message);
      adminLogout(); // Logout if authentication fails
    }
  };

  console.log("Admin Data :", admin);

  useEffect(() => {
    if (token) {
      userAuthentication();
    }
  }, [token]);

  // Effect to sync token with localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    setToken(storedToken);
  }, []);

  return (
    <AdminContext.Provider
      value={{
        storeTokenInLS,
        adminLogout,
        isLoggedIn,
        loading,
        admin,
        token,
        authorizationToken,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to use Admin Context
const useAdminContext = () => {
  return useContext(AdminContext);
};

export { useAdminContext, AdminProvider };
