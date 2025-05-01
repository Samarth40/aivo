import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChartBarIcon,
  MagnifyingGlassIcon,
  LightBulbIcon,
  ScaleIcon,
  ChartBarSquareIcon,
  Cog6ToothIcon,
  BellIcon,
  QuestionMarkCircleIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { isDarkMode } = useTheme();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: ChartBarIcon },
    { name: "Analyze", path: "/dashboard/analyze", icon: MagnifyingGlassIcon },
    {
      name: "Suggestions",
      path: "/dashboard/suggestions",
      icon: LightBulbIcon,
    },
    { name: "Comparison", path: "/dashboard/comparison", icon: ScaleIcon },
    { name: "Reports", path: "/dashboard/reports", icon: ChartBarSquareIcon },
    { name: "Settings", path: "/dashboard/settings", icon: Cog6ToothIcon },
  ];

  const isActive = (path) => location.pathname === path;

  // Animation variants
  const sidebarVariants = {
    open: { width: "16rem" },
    closed: { width: "5rem" },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Animated Sidebar */}
      <motion.aside
        initial={sidebarOpen ? "open" : "closed"}
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-gradient-to-b from-[var(--color-sidebar-from)] to-[var(--color-sidebar-to)] text-white flex flex-col shadow-lg z-20"
      >
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen ? (
            <Link to="/dashboard" className="text-2xl font-bold gradient-text">
              AIVO
            </Link>
          ) : (
            <Link to="/dashboard" className="text-2xl font-bold text-white">
              AI
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-300 hover:text-white focus:outline-none transition-colors"
          >
            {sidebarOpen ? (
              <ArrowLeftCircleIcon className="h-6 w-6" />
            ) : (
              <ArrowRightCircleIcon className="h-6 w-6" />
            )}
          </button>
        </div>
        <nav className="flex-1 mt-6 px-2">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 rounded-xl transition-all duration-200 ${
                      active
                        ? "bg-[#4f46e5] text-white shadow-md"
                        : "text-gray-300 hover:bg-gray-700/50"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                    {sidebarOpen && (
                      <motion.span
                        initial="hidden"
                        animate="visible"
                        variants={fadeInVariants}
                        className="ml-3"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          {sidebarOpen ? (
            <div className="flex items-center">
              <div className="relative">
                <UserCircleIcon className="h-10 w-10 text-gray-300" />
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">John Doe</p>
                <button className="text-xs text-gray-400 hover:text-white flex items-center mt-1 group">
                  <span>Logout</span>
                  <ArrowRightOnRectangleIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="relative">
                <UserCircleIcon className="h-8 w-8 text-gray-300" />
                <div className="absolute bottom-0 right-0 h-2 w-2 bg-green-500 rounded-full border-2 border-gray-800"></div>
              </div>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-800 shadow-md shadow-gray-900 z-10">
          <div className="px-6 py-4 flex justify-between items-center">
            <motion.h2
              key={location.pathname}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xl font-semibold text-gray-100"
            >
              {navItems.find((item) => isActive(item.path))?.name ||
                "Dashboard"}
            </motion.h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors">
                  <BellIcon className="h-5 w-5" />
                </button>
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#ef4444] text-xs text-white flex items-center justify-center border-2 border-gray-800">
                  3
                </span>
              </div>
              <button className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors">
                <QuestionMarkCircleIcon className="h-5 w-5" />
              </button>
              <div className="h-8 border-l border-gray-700"></div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-300 mr-4">
                  AIVO Pro
                </span>
                <span className="badge badge-primary">Beta</span>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 bg-gray-900">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <Outlet />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
