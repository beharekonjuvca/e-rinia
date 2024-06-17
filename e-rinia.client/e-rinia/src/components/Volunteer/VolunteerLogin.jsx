/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginVolunteer } from "../../endpoints"; // Ensure the path is correct
import { useAuth } from "../../Auth/AuthContext"; // Ensure the path is correct

const VolunteerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/volunteer"); // Redirect to the homepage or admin dashboard
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await loginVolunteer({ email, password });
      login(data.token);
      navigate("/volunteer"); // Redirect to the homepage or admin dashboard
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  if (isAuthenticated) {
    return null; // Optionally render a loading spinner or nothing
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Volunteer Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p>
          Don`t have an account?
          <span>
            {" "}
            <Link to="/volunteer/register" className="text-blue">
              Sign Up
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default VolunteerLogin;
