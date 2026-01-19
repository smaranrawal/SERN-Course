import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700"
        >
          MultiVendor
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          
          {!user && (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </Link>

              <Link
                to="/signin"
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}

          {user && user.type === "customer" && (
            <Link
              to="/cart"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              My Cart
            </Link>
          )}

          {user && (
            <button
              onClick={logout}
              className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
