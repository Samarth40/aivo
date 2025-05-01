import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownTrayIcon,
  CalendarIcon,
  ShareIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState(0);

  const reports = [
    {
      title: "AI Visibility Monthly Report - April 2025",
      date: "April 30, 2025",
      type: "Monthly Report",
      summary: "Overall visibility increased by 18% compared to previous month",
      sections: [
        "Executive Summary",
        "Visibility Score Breakdown",
        "Product Performance",
        "Competitor Analysis",
        "Recommendations",
      ],
    },
    {
      title: "Product Detail Analysis - Smart Home Hub",
      date: "April 25, 2025",
      type: "Product Report",
      summary:
        "Product improved in AI response rate but needs better feature descriptions",
      sections: [
        "Product Overview",
        "AI Search Performance",
        "Content Analysis",
        "Improvement Areas",
        "Optimization Steps",
      ],
    },
    {
      title: "Weekly AI Trend Report",
      date: "April 21, 2025",
      type: "Trend Analysis",
      summary:
        "New AI models showing preference for more conversational product descriptions",
      sections: [
        "AI Search Trends",
        "Key Algorithm Changes",
        "Industry Impact Analysis",
        "Content Strategy Recommendations",
        "Action Items",
      ],
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="py-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
              AI Search Reports
            </h1>
            <p className="text-gray-600">
              Review your visibility performance and recommendations
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <div className="relative">
              <select
                className="input appearance-none pr-10 py-2"
                defaultValue="all"
              >
                <option value="all">All Reports</option>
                <option value="monthly">Monthly Reports</option>
                <option value="product">Product Analysis</option>
                <option value="trends">Trend Reports</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <button className="btn btn-secondary flex items-center text-sm">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>Date Range</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Reports List */}
          <motion.div
            className="md:w-1/3 bg-white rounded-xl shadow-md overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold">Available Reports</h2>
            </div>

            <div className="divide-y divide-gray-100">
              {reports.map((report, index) => (
                <motion.button
                  key={index}
                  variants={itemVariants}
                  className={`p-4 w-full text-left flex items-start transition-colors ${
                    selectedReport === index
                      ? "bg-primary/10 border-l-4 border-primary"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedReport(index)}
                >
                  <div className="flex-1">
                    <h3
                      className={`font-medium ${
                        selectedReport === index
                          ? "text-primary"
                          : "text-gray-800"
                      }`}
                    >
                      {report.title}
                    </h3>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span>{report.date}</span>
                    </div>
                    <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {report.type}
                    </span>
                  </div>
                  <ChevronRightIcon
                    className={`h-5 w-5 ${
                      selectedReport === index
                        ? "text-primary"
                        : "text-gray-400"
                    }`}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Report Detail */}
          <motion.div
            className="md:w-2/3 bg-white rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            key={selectedReport}
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {reports[selectedReport].title}
                </h2>
                <p className="text-gray-500 text-sm">
                  {reports[selectedReport].date}
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                  <ShareIcon className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Summary</h3>
                  <span className="badge badge-primary">AI Insights</span>
                </div>
                <p className="text-gray-700">
                  {reports[selectedReport].summary}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4">Report Contents</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-3">
                    {reports[selectedReport].sections.map((section, index) => (
                      <li key={index} className="flex items-center">
                        <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mr-3">
                          <span className="text-xs font-medium text-primary">
                            {index + 1}
                          </span>
                        </span>
                        <span className="text-gray-800">{section}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4">
                  Key Performance Metrics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-500">
                      Overall AI Visibility
                    </p>
                    <p className="mt-1 text-2xl font-bold text-primary">78%</p>
                    <div className="mt-1 flex items-center text-sm">
                      <svg
                        className="w-4 h-4 text-green-500 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                      <span className="text-green-500">+12%</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-500">
                      Product Mentions
                    </p>
                    <p className="mt-1 text-2xl font-bold text-primary">
                      1,245
                    </p>
                    <div className="mt-1 flex items-center text-sm">
                      <svg
                        className="w-4 h-4 text-green-500 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                      <span className="text-green-500">+28%</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-500">
                      Competitive Rank
                    </p>
                    <p className="mt-1 text-2xl font-bold text-primary">#2</p>
                    <div className="mt-1 flex items-center text-sm">
                      <svg
                        className="w-4 h-4 text-green-500 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                      <span className="text-green-500">+1</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button className="btn btn-primary w-full sm:w-auto">
                  View Full Report
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportsPage;
