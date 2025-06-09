import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useSearch } from "../../context/SearchContext";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence } from "framer-motion";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const {
    performSearch,
    searchResults,
    searchQuery: contextSearchQuery,
  } = useSearch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
      setShowResults(true);
    }
  };

  const handleCloseResults = () => {
    setShowResults(false);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showResults &&
        !e.target.closest(".search-container") &&
        !e.target.closest(".search-results")
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showResults]);

  // Show results when search is complete and there are results
  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setShowResults(true);
    }
  }, [searchResults]);

  return (
    <header
      className={`sticky top-0 z-50 shadow-md ${
        isDarkMode
          ? "bg-gray-900 text-white border-gray-800"
          : "bg-white text-gray-800 border-gray-100"
      } border-b`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold tracking-tight text-indigo-600">
                AIVO
              </span>
            </Link>
            <nav className="hidden md:ml-8 md:flex md:space-x-6">
              <Link
                to="/features"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isDarkMode
                    ? "hover:bg-gray-800 hover:text-indigo-400"
                    : "hover:bg-gray-50 hover:text-indigo-700"
                }`}
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isDarkMode
                    ? "hover:bg-gray-800 hover:text-indigo-400"
                    : "hover:bg-gray-50 hover:text-indigo-700"
                }`}
              >
                Pricing
              </Link>
              <Link
                to="/integrations"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isDarkMode
                    ? "hover:bg-gray-800 hover:text-indigo-400"
                    : "hover:bg-gray-50 hover:text-indigo-700"
                }`}
              >
                Integrations
              </Link>
            </nav>
          </div>

          {/* Search form */}
          <div className="flex-1 max-w-md px-2 hidden md:flex items-center justify-center search-container">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative text-gray-400 focus-within:text-indigo-500">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </div>
                <input
                  type="search"
                  className={`block w-full pl-10 pr-3 py-2 rounded-md text-sm ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 placeholder:text-gray-500 text-white"
                      : "bg-gray-100 border-transparent placeholder:text-gray-500 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="Search across AIVO..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className={`p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              {isDarkMode ? (
                <SunIcon className="h-6 w-6 text-yellow-300" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-500" />
              )}
            </button>

            <div className="hidden md:ml-4 md:flex md:items-center md:space-x-2">
              <Link
                to="/login"
                className={`px-4 py-2 text-sm font-medium rounded ${
                  isDarkMode
                    ? "text-white hover:bg-gray-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign up
              </Link>
            </div>

            <div className="flex md:hidden">
              <button
                onClick={toggleMenu}
                className={`p-2 rounded-md focus:outline-none focus:bg-gray-100 focus:text-gray-900`}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div
            className={`px-2 pt-2 pb-3 space-y-1 ${
              isDarkMode ? "bg-gray-900" : "bg-white"
            }`}
          >
            <form onSubmit={handleSearch} className="p-2 search-container">
              <div className="relative text-gray-400 focus-within:text-indigo-500">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </div>
                <input
                  type="search"
                  className={`block w-full pl-10 pr-3 py-2 rounded-md text-sm ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 placeholder:text-gray-500 text-white"
                      : "bg-gray-100 border-transparent placeholder:text-gray-500 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="Search across AIVO..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            <Link
              to="/features"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isDarkMode
                  ? "text-white hover:bg-gray-800 hover:text-indigo-400"
                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-700"
              }`}
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isDarkMode
                  ? "text-white hover:bg-gray-800 hover:text-indigo-400"
                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-700"
              }`}
            >
              Pricing
            </Link>
            <Link
              to="/integrations"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isDarkMode
                  ? "text-white hover:bg-gray-800 hover:text-indigo-400"
                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-700"
              }`}
            >
              Integrations
            </Link>
            <Link
              to="/login"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isDarkMode
                  ? "text-white hover:bg-gray-800 hover:text-indigo-400"
                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-700"
              }`}
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="block px-3 py-2 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}

      {/* Search Results Overlay */}
      <AnimatePresence>
        {showResults && searchResults.length > 0 && (
          <div className="search-results">
            <SearchResults
              results={searchResults}
              query={contextSearchQuery}
              onClose={handleCloseResults}
            />
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
