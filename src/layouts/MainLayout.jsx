import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronRightIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";

const MainLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "bg-gray-900" : ""}`}>
      {/* Navigation Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? isDarkMode
              ? "bg-gray-800 shadow-md shadow-gray-900 py-2"
              : "bg-white shadow-md py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link
            to="/"
            className={`text-2xl font-bold transition-colors ${
              scrolled
                ? "text-[#4f46e5]"
                : isDarkMode
                ? "text-white"
                : "text-white"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <span className="bg-[#4f46e5] text-white p-2 rounded-lg mr-2">
                AI
              </span>
              <span className="gradient-text">AIVO</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`${
                location.pathname === "/"
                  ? "text-[#4f46e5] font-medium"
                  : scrolled
                  ? isDarkMode
                    ? "text-gray-300 hover:text-[#818cf8]"
                    : "text-gray-700 hover:text-[#4f46e5]"
                  : "text-white hover:text-white/80"
              } transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/features"
              className={`${
                location.pathname === "/features"
                  ? "text-[#4f46e5] font-medium"
                  : scrolled
                  ? isDarkMode
                    ? "text-gray-300 hover:text-[#818cf8]"
                    : "text-gray-700 hover:text-[#4f46e5]"
                  : "text-white hover:text-white/80"
              } transition-colors`}
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className={`${
                location.pathname === "/pricing"
                  ? "text-[#4f46e5] font-medium"
                  : scrolled
                  ? isDarkMode
                    ? "text-gray-300 hover:text-[#818cf8]"
                    : "text-gray-700 hover:text-[#4f46e5]"
                  : "text-white hover:text-white/80"
              } transition-colors`}
            >
              Pricing
            </Link>

            {/* Theme toggle button */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5 text-yellow-400 theme-toggle-icon" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-600 theme-toggle-icon" />
              )}
            </button>

            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className={`btn ${
                  scrolled
                    ? isDarkMode
                      ? "btn-secondary bg-gray-700 hover:bg-gray-600"
                      : "btn-secondary"
                    : "glass text-white"
                }`}
              >
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Try Free
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-500 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon
                className={`h-6 w-6 ${
                  scrolled
                    ? isDarkMode
                      ? "text-gray-200"
                      : "text-gray-800"
                    : "text-white"
                }`}
              />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`absolute top-full left-0 right-0 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-lg z-20 md:hidden`}
          >
            <div className="px-4 py-2 space-y-1">
              <Link
                to="/"
                className={`block p-3 rounded-lg ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-gray-200"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/features"
                className={`block p-3 rounded-lg ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-gray-200"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className={`block p-3 rounded-lg ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-gray-200"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>

              {/* Theme toggle in mobile menu */}
              <div
                className={`p-3 rounded-lg ${
                  isDarkMode ? "text-gray-200" : "text-gray-800"
                } flex justify-between items-center`}
              >
                <span>Theme</span>
                <button
                  onClick={toggleTheme}
                  className="theme-toggle p-2"
                  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDarkMode ? (
                    <SunIcon className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <MoonIcon className="h-5 w-5 text-gray-600" />
                  )}
                </button>
              </div>

              <div className="flex flex-col space-y-2 pt-2 pb-3">
                <Link
                  to="/login"
                  className={`btn ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                      : "btn-secondary"
                  } w-full text-center`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary w-full text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Try Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Main Content with top padding for fixed header */}
      <main
        className={`flex-grow pt-16 ${
          isDarkMode ? "bg-gray-900 text-gray-100" : ""
        }`}
      >
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        className={
          isDarkMode
            ? "bg-gray-900 text-white py-12 border-t border-gray-800"
            : "bg-gray-900 text-white py-12"
        }
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center mb-6">
                <span className="bg-[#4f46e5] text-white p-1 rounded-md mr-2 text-sm">
                  AI
                </span>
                <span className="font-bold text-xl gradient-text">AIVO</span>
              </Link>
              <p className="text-gray-400 mb-6">
                AI Search Visibility Optimizer - Enhance your product visibility
                in AI search systems.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#4f46e5] transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#4f46e5] transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#4f46e5] transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Case Studies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Reviews
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Updates
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    API Docs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row md:justify-between md:items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} AIVO. All rights reserved.
            </p>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cookies Settings
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
