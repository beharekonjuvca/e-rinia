import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext"; // Ensure the path is correct

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logging out
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
