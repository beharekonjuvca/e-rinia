import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const handleLinkClick = () => {
    if (isOpen) {
      toggleSidebar();
    }
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:relative md:inset-0 transition-transform duration-200 ease-in-out bg-gray-800 w-64 z-30`}
    >
      <div className="p-6 flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-white">Event Link</h1>
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <nav className="mt-10">
        <Link
          to="/"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 text-white"
          onClick={handleLinkClick}
        >
          Home
        </Link>
        <Link
          to="/volunteers"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 text-white"
          onClick={handleLinkClick}
        >
          Volunteers
        </Link>
        <Link
          to="/organizations"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 text-white"
          onClick={handleLinkClick}
        >
          Organizations
        </Link>
        <Link
          to="/events"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 text-white"
          onClick={handleLinkClick}
        >
          Events
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
