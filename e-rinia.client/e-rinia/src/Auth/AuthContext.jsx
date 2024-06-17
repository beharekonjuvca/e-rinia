import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { verifyToken, getAuthToken } from "../endpoints"; // Ensure the path is correct

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = getAuthToken();
    if (token && verifyToken()) {
      setIsAuthenticated(true);
      const decodedToken = jwtDecode(token);
      if (decodedToken.admin) {
        setUserRole("admin");
      } else if (decodedToken.volunteer) {
        setUserRole("volunteer");
      } else if (decodedToken.organization) {
        setUserRole("organization");
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    const decodedToken = jwtDecode(token);
    if (decodedToken.admin) {
      setUserRole("admin");
    } else if (decodedToken.volunteer) {
      setUserRole("volunteer");
    } else if (decodedToken.organization) {
      setUserRole("organization");
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUserRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
