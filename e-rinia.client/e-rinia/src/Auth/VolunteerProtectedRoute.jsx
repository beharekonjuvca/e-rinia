import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Ensure the path is correct

const VolunteerProtectedRoute = ({ children }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated || userRole !== "volunteer") {
    return <Navigate to="/volunteer/login" />;
  }

  return children;
};

export default VolunteerProtectedRoute;
