import { showLogoutToast } from "@/Toast/customToast";
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
// import toast from "react-hot-toast";

const AuthContext = createContext();
// const BASE_URL = "http://localhost:5000/api/auth"; // Update with your actual base URL if needed
const BASE_URL = "https://bajrang-latkan-production-server.vercel.app/api/auth";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("production_worker") || null
  );
  const [user, setUser] = useState(""); // Initialize with null to indicate no user initially
  // const [file, setFile] = useState(null);
  const isLoggedIn = !!token;

  const authorizationToken = `Bearer ${token}`;

  // Store token in Local Storage and update state
  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("production_worker", serverToken);
    setToken(serverToken);
  };

  // Logout function
  const userLogout = () => {
    localStorage.removeItem("production_worker");
    setToken(null);
    if (token == null) {
      showLogoutToast();
    }
    setUser(""); // Clear the user data on logout
  };

  // JWT Authentication - Fetch currently logged-in user data
  const userAuthentication = async () => {
    if (!token) return; // Skip if no token is available
    try {
      const res = await axios.get(`${BASE_URL}/user`, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      const userInfo = res.data;
      setUser(userInfo.workerData); // Update user state
    } catch (error) {
      console.error("Can't fetch user data:", error);
      userLogout(); // Logout if authentication fails
    }
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
    }
  }, [token]);

  // Effect to sync token with localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("production_worker");
    setToken(storedToken);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        userLogout,
        isLoggedIn,
        user,
        token,
        authorizationToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
const useAuthContext = () => {
  return useContext(AuthContext);
};

export { useAuthContext, AuthProvider };
