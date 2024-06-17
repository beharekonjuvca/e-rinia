import React from "react";
import AdminProfileDropdown from "../components/Admin/AdminProfileDropdown"; // Ensure the path is correct
import { Link } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center m-2 rounded-md">
      <h1 className="text-2xl">Dashboard Header</h1>
      <Link
        to="/volunteer/organizations"
        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 text-white"
      >
        Organizations
      </Link>
      <AdminProfileDropdown />
      <button
        onClick={toggleSidebar}
        className="md:hidden text-gray-500 focus:outline-none focus:text-gray-800"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </header>
  );
};

export default Header;
