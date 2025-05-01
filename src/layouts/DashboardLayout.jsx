import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Analyze", path: "/dashboard/analyze", icon: "🔍" },
    { name: "Suggestions", path: "/dashboard/suggestions", icon: "💡" },
    { name: "Comparison", path: "/dashboard/comparison", icon: "⚖️" },
    { name: "Reports", path: "/dashboard/reports", icon: "📈" },
    { name: "Settings", path: "/dashboard/settings", icon: "⚙️" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white ${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 ease-in-out flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen ? (
            <Link to="/dashboard" className="text-2xl font-bold">
              AIVO
            </Link>
          ) : (
            <Link to="/dashboard" className="text-2xl font-bold">
              AI
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white focus:outline-none"
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>
        <nav className="flex-1 mt-6">
          <ul className="space-y-2 px-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-primary text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {sidebarOpen && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          {sidebarOpen ? (
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-500 flex-shrink-0"></div>
              <div className="ml-3">
                <p className="text-sm font-medium">User Name</p>
                <button className="text-xs text-gray-400 hover:text-white">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-500 mx-auto"></div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {navItems.find((item) => isActive(item.path))?.name ||
                "Dashboard"}
            </h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                🔔
              </button>
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                ❓
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
