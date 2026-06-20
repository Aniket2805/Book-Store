import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useAuth } from "../store/auth";
import { ImBook } from "react-icons/im";
import { MdContactMail } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { GiSecretBook } from "react-icons/gi";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-primary-600 to-primary-700 shadow-lg fixed w-full top-0 z-50 h-16 flex items-center">
      <div className="w-full px-4 sm:px-10 md:px-16 lg:px-24 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0" onClick={closeMobileMenu}>
          <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all duration-300">
            <ImBook className="text-white text-2xl md:text-3xl" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white hidden sm:block">
            BookStore
          </h1>
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-6 md:gap-8">
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-white font-medium hover:text-white/80 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="text-white font-medium hover:text-white/80 transition-colors duration-300 flex items-center gap-1"
            >
              <MdContactMail className="text-lg" />
              Contact
            </Link>
            {isLoggedIn && user?.isAdmin && (
              <Link
                to="/admin/userslist"
                className="text-white font-medium hover:text-white/80 transition-colors duration-300 flex items-center gap-1"
              >
                <FaUsers className="text-lg" />
                Users
              </Link>
            )}
            {isLoggedIn && !user?.isAdmin && (
              <Link
                to="/user/savedbooks"
                className="text-white font-medium hover:text-white/80 transition-colors duration-300 flex items-center gap-1"
              >
                <GiSecretBook className="text-lg" />
                My Wishlist
              </Link>
            )}
          </div>

          {/* Auth Section - Desktop only */}
          {isLoggedIn ? (
            <Link
              to="/logout"
              className="hidden md:flex items-center gap-2 px-4 sm:px-6 py-2 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 hover:text-primary-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base whitespace-nowrap"
            >
              <RiLogoutCircleLine className="text-xl" />
              <span>Sign Out</span>
            </Link>
          ) : (
            <button
              className="hidden md:flex items-center gap-2 px-4 sm:px-6 py-2 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 hover:text-primary-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base whitespace-nowrap"
              onClick={() => {
                navigate("/signin");
                closeMobileMenu();
              }}
            >
              <IoMdLogIn className="text-xl" />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white text-2xl hover:text-white/80 transition-colors"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden">
          <div className="px-4 py-4 space-y-2">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 rounded-lg font-medium transition-colors"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 text-gray-700 hover:bg-primary-50 rounded-lg font-medium transition-colors flex items-center gap-2"
              onClick={closeMobileMenu}
            >
              <MdContactMail className="text-lg" />
              Contact
            </Link>
            <hr className="my-2 border-gray-200" />
            {isLoggedIn ? (
              <Link
                to="/logout"
                className="px-4 py-2 text-gray-700 hover:bg-secondary-50 rounded-lg font-medium transition-colors flex items-center gap-2"
                onClick={closeMobileMenu}
              >
                <RiLogoutCircleLine className="text-lg" />
                Sign Out
              </Link>
            ) : (
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-primary-50 rounded-lg font-medium transition-colors flex items-center gap-2"
                onClick={() => {
                  navigate("/signin");
                  closeMobileMenu();
                }}
              >
                <IoMdLogIn className="text-lg" />
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
