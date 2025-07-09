import { useAuthContext } from "@/context/AuthContext";
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, user } = useAuthContext();
  const location = useLocation();
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (isLoggedIn && user.role === "ADMIN") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
