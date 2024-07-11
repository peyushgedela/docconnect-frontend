import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-gray-50 text-2xl font-bold">
          <Link to="/">DocConnect</Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-50 focus:outline-none"
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
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-blue-600 mt-2 space-y-2 p-2">
          <Link
            to="/login"
            className="block text-gray-50 bg-blue-800 hover:bg-blue-700 px-3 py-2 rounded"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block text-blue-600 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
