import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Ensure the path is correct

const OrganizationProtectedRoute = ({ children }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated || userRole !== "organization") {
    return <Navigate to="/organization/login" />;
  }

  return children;
};

export default OrganizationProtectedRoute;
