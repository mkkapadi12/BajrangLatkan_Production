import React, { useEffect } from "react";
import { useAdminContext } from "@/context/AdminContext";
import { Navigate } from "react-router-dom";

const AdminLogout = () => {
  const { adminLogout } = useAdminContext();

  useEffect(() => {
    adminLogout(); // Call the logout function
  }, [adminLogout]);

  return <Navigate to="/admin/login" />;
};

export default AdminLogout;
