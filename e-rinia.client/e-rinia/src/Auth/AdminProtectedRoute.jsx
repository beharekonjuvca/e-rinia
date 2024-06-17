import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Ensure the path is correct

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated || userRole !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminProtectedRoute;
