import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  EyeIcon,
  RocketLaunchIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

// Sample data for charts
const visibilityData = [
  { name: "Week 1", score: 42 },
  { name: "Week 2", score: 47 },
  { name: "Week 3", score: 53 },
  { name: "Week 4", score: 58 },
  { name: "Week 5", score: 62 },
  { name: "Week 6", score: 67 },
  { name: "Week 7", score: 72 },
  { name: "Week 8", score: 78 },
];

const comparativeData = [
  {
    name: "Product A",
    yours: 78,
    competitor1: 65,
    competitor2: 72,
  },
  {
    name: "Product B",
    yours: 82,
    competitor1: 75,
    competitor2: 68,
  },
  {
    name: "Product C",
    yours: 65,
    competitor1: 70,
    competitor2: 60,
  },
];

const DashboardPage = () => {
  const [activeTimeframe, setActiveTimeframe] = useState("month");

  // Animation variants for elements
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold gradient-text"
        >
          AI Visibility Dashboard
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2 mt-4 sm:mt-0"
        >
          <button
            onClick={() => setActiveTimeframe("week")}
            className={`px-4 py-2 text-sm rounded-lg ${
              activeTimeframe === "week"
                ? "bg-[#4f46e5] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition-colors`}
          >
            Week
          </button>
          <button
            onClick={() => setActiveTimeframe("month")}
            className={`px-4 py-2 text-sm rounded-lg ${
              activeTimeframe === "month"
                ? "bg-[#4f46e5] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition-colors`}
          >
            Month
          </button>
          <button
            onClick={() => setActiveTimeframe("quarter")}
            className={`px-4 py-2 text-sm rounded-lg ${
              activeTimeframe === "quarter"
                ? "bg-[#4f46e5] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition-colors`}
          >
            Quarter
          </button>
        </motion.div>
      </div>

      {/* Main stats section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {/* AI Visibility Score */}
        <motion.div
          variants={itemVariants}
          className="stat-card from-[#4f46e5]/10 to-[#818cf8]/20 border border-[#818cf8]/20"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">
                AI Visibility Score
              </p>
              <h3 className="text-3xl font-bold mt-1">78/100</h3>
            </div>
            <span className="p-2 bg-[#4f46e5]/10 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-[#4f46e5]" />
            </span>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+12%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
          <div className="mt-3 w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#4f46e5] h-full rounded-full"
              style={{ width: "78%" }}
            ></div>
          </div>
        </motion.div>

        {/* Product Appearances */}
        <motion.div
          variants={itemVariants}
          className="stat-card from-[#0ea5e9]/10 to-[#38bdf8]/20 border border-[#38bdf8]/20"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Product Appearances
              </p>
              <h3 className="text-3xl font-bold mt-1">1,482</h3>
            </div>
            <span className="p-2 bg-[#0ea5e9]/10 rounded-lg">
              <EyeIcon className="h-6 w-6 text-[#0ea5e9]" />
            </span>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+24%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
          <div className="mt-3 h-8">
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>500</span>
              <span>1000</span>
              <span>1500</span>
              <span>2000</span>
            </div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mt-1">
              <div
                className="bg-[#0ea5e9] h-full rounded-full"
                style={{ width: "74%" }}
              ></div>
            </div>
          </div>
        </motion.div>

        {/* Optimization Score */}
        <motion.div
          variants={itemVariants}
          className="stat-card from-[#10b981]/10 to-[#34d399]/20 border border-[#34d399]/20"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Optimization Score
              </p>
              <h3 className="text-3xl font-bold mt-1">86%</h3>
            </div>
            <span className="p-2 bg-[#10b981]/10 rounded-lg">
              <RocketLaunchIcon className="h-6 w-6 text-[#10b981]" />
            </span>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+8%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
          <div className="mt-3">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div className="text-xs text-gray-500 w-10">0%</div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-[#10b981]">
                    86%
                  </span>
                </div>
              </div>
              <div className="flex h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  style={{ width: "86%" }}
                  className="bg-[#10b981] rounded-full"
                ></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Competitive Rank */}
        <motion.div
          variants={itemVariants}
          className="stat-card from-[#f59e0b]/10 to-[#fbbf24]/20 border border-[#fbbf24]/20"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Competitive Rank
              </p>
              <h3 className="text-3xl font-bold mt-1">#2</h3>
            </div>
            <span className="p-2 bg-[#f59e0b]/10 rounded-lg">
              <StarIcon className="h-6 w-6 text-[#f59e0b]" />
            </span>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+1</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                1
              </div>
              <div className="h-0.5 w-6 bg-gray-300"></div>
              <div className="w-8 h-8 rounded-full bg-[#f59e0b] flex items-center justify-center text-xs font-bold text-white">
                2
              </div>
              <div className="h-0.5 w-6 bg-gray-300"></div>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                3
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Visibility trend chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold mb-1">AI Visibility Trend</h2>
            <p className="text-gray-500 text-sm">
              Your product's visibility score over time
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <button className="flex items-center text-sm text-[#4f46e5] hover:text-[#3730a3] transition-colors">
              <ArrowPathIcon className="h-4 w-4 mr-1" />
              <span>Refresh Data</span>
            </button>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={visibilityData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
              />
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="score"
                stroke="#4f46e5"
                strokeWidth={2}
                fill="url(#colorScore)"
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Competitor comparison chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <h2 className="text-xl font-bold mb-1">Competitor Comparison</h2>
          <p className="text-gray-500 text-sm mb-6">
            How your products compare to competitors
          </p>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparativeData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    border: "none",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="yours"
                  fill="#4f46e5"
                  name="Your Score"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="competitor1"
                  fill="#94a3b8"
                  name="Competitor 1"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="competitor2"
                  fill="#cbd5e1"
                  name="Competitor 2"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Improvement opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <h2 className="text-xl font-bold mb-1">Improvement Opportunities</h2>
          <p className="text-gray-500 text-sm mb-6">Top areas to focus on</p>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-[#ef4444] rounded-full mr-2"></span>
                  <span className="text-sm font-medium">
                    Product Descriptions
                  </span>
                </div>
                <span className="text-sm font-medium">65%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-[#ef4444] rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Your product descriptions need more specific use cases and
                problem-solving language.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-[#f59e0b] rounded-full mr-2"></span>
                  <span className="text-sm font-medium">Feature Highlight</span>
                </div>
                <span className="text-sm font-medium">72%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-[#f59e0b] rounded-full"
                  style={{ width: "72%" }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Key features need to be described in terms of benefits rather
                than specifications.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-[#10b981] rounded-full mr-2"></span>
                  <span className="text-sm font-medium">
                    Contextual Relationships
                  </span>
                </div>
                <span className="text-sm font-medium">84%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-[#10b981] rounded-full"
                  style={{ width: "84%" }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Strong connection between product and related use cases. Minor
                improvements possible.
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <button className="btn btn-primary flex items-center">
                <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                Run Detailed Analysis
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
