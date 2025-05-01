import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const DashboardPage = () => {
  // Mock data for charts
  const [visibilityData] = useState([
    { name: "Jan", score: 65 },
    { name: "Feb", score: 59 },
    { name: "Mar", score: 80 },
    { name: "Apr", score: 81 },
    { name: "May", score: 76 },
  ]);

  const [keywordData] = useState([
    { name: "Featured", value: 15 },
    { name: "Top 3", value: 30 },
    { name: "Top 10", value: 45 },
    { name: "Not Ranking", value: 10 },
  ]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const [recentAlerts] = useState([
    {
      id: 1,
      message: "Your visibility score increased by 5% this week",
      date: "May 1, 2025",
      type: "positive",
    },
    {
      id: 2,
      message: 'New competitor detected for "AI marketing tools"',
      date: "Apr 29, 2025",
      type: "warning",
    },
    {
      id: 3,
      message: "Content update recommended for /blog/ai-seo-tips",
      date: "Apr 28, 2025",
      type: "info",
    },
    {
      id: 4,
      message: "Weekly report generated",
      date: "Apr 27, 2025",
      type: "info",
    },
  ]);

  const alertTypeClasses = {
    positive: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
    negative: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            AI Visibility Score
          </h3>
          <p className="text-3xl font-bold">76/100</p>
          <p className="text-green-500 flex items-center mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clipRule="evenodd"
              />
            </svg>
            +5% from last week
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            AI Featured Snippets
          </h3>
          <p className="text-3xl font-bold">15</p>
          <p className="text-green-500 flex items-center mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clipRule="evenodd"
              />
            </svg>
            +2 from last week
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            Content Analyzed
          </h3>
          <p className="text-3xl font-bold">123</p>
          <p className="text-gray-500 mt-2">Across 8 properties</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            Optimization Score
          </h3>
          <p className="text-3xl font-bold">82%</p>
          <p className="text-yellow-500 flex items-center mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            5 suggestions available
          </p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">AI Visibility Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={visibilityData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#6366F1"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Keyword Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={keywordData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {keywordData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Alerts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold">Recent Alerts</h2>
          </div>
          <div className="divide-y">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="px-6 py-4">
                <div className="flex justify-between">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      alertTypeClasses[alert.type]
                    }`}
                  >
                    {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">{alert.date}</span>
                </div>
                <p className="mt-1">{alert.message}</p>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t">
            <button className="text-primary hover:text-primary-dark font-medium">
              View all alerts
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-4">
            <button className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition">
              Run Analysis
            </button>
            <button className="w-full border border-primary text-primary py-2 px-4 rounded hover:bg-primary-light hover:text-white transition">
              Generate Report
            </button>
            <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 transition">
              Add URL to Monitor
            </button>
            <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 transition">
              Create New Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
