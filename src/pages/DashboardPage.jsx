import React, { useState } from "react";
import { motion } from "framer-motion";
import '../styles/components/DashboardPage.css';
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
      <div className="dashboard-header">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="dashboard-title gradient-text"
        >
          AI Visibility Dashboard
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="dashboard-timeframe"
        >
          <button
            onClick={() => setActiveTimeframe("week")}
            className={`timeframe-button ${
              activeTimeframe === "week"
                ? "timeframe-button-active"
                : "timeframe-button-inactive"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setActiveTimeframe("month")}
            className={`timeframe-button ${
              activeTimeframe === "month"
                ? "timeframe-button-active"
                : "timeframe-button-inactive"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setActiveTimeframe("quarter")}
            className={`timeframe-button ${
              activeTimeframe === "quarter"
                ? "timeframe-button-active"
                : "timeframe-button-inactive"
            }`}
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
        className="stats-grid"
      >
        {/* AI Visibility Score */}
        <motion.div
          variants={itemVariants}
          className="stat-card"
          style={{"--from": "rgba(79, 70, 229, 0.1)", "--to": "rgba(129, 140, 248, 0.2)"}}
        >
          <div className="stat-card-header">
            <div>
              <p className="stat-card-title">
                AI Visibility Score
              </p>
              <h3 className="stat-card-value">78/100</h3>
            </div>
            <span className="stat-card-icon-container" style={{"backgroundColor": "rgba(79, 70, 229, 0.1)"}}>
              <ChartBarIcon className="h-6 w-6 text-[#4f46e5]" />
            </span>
          </div>
          <div className="stat-card-metric">
            <ArrowUpIcon className="stat-card-metric-icon stat-card-metric-positive" />
            <span className="stat-card-metric-value stat-card-metric-positive">+12%</span>
            <span className="stat-card-metric-label">from last month</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill bg-[#4f46e5]"
              style={{ width: "78%" }}
            ></div>
          </div>
        </motion.div>

        {/* Product Appearances */}
        <motion.div
          variants={itemVariants}
          className="stat-card"
          style={{"--from": "rgba(14, 165, 233, 0.1)", "--to": "rgba(56, 189, 248, 0.2)"}}
        >
          <div className="stat-card-header">
            <div>
              <p className="stat-card-title">
                Product Appearances
              </p>
              <h3 className="stat-card-value">1,482</h3>
            </div>
            <span className="stat-card-icon-container" style={{"backgroundColor": "rgba(14, 165, 233, 0.1)"}}>
              <EyeIcon className="h-6 w-6 text-[#0ea5e9]" />
            </span>
          </div>
          <div className="stat-card-metric">
            <ArrowUpIcon className="stat-card-metric-icon stat-card-metric-positive" />
            <span className="stat-card-metric-value stat-card-metric-positive">+24%</span>
            <span className="stat-card-metric-label">from last month</span>
          </div>
          <div className="mt-3 h-8">
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>500</span>
              <span>1000</span>
              <span>1500</span>
              <span>2000</span>
            </div>
            <div className="progress-bar mt-1">
              <div
                className="progress-bar-fill bg-[#0ea5e9]"
                style={{ width: "74%" }}
              ></div>
            </div>
          </div>
        </motion.div>

        {/* Optimization Score */}
        <motion.div
          variants={itemVariants}
          className="stat-card"
          style={{"--from": "rgba(16, 185, 129, 0.1)", "--to": "rgba(52, 211, 153, 0.2)"}}
        >
          <div className="stat-card-header">
            <div>
              <p className="stat-card-title">
                Optimization Score
              </p>
              <h3 className="stat-card-value">86%</h3>
            </div>
            <span className="stat-card-icon-container" style={{"backgroundColor": "rgba(16, 185, 129, 0.1)"}}>
              <RocketLaunchIcon className="h-6 w-6 text-[#10b981]" />
            </span>
          </div>
          <div className="stat-card-metric">
            <ArrowUpIcon className="stat-card-metric-icon stat-card-metric-positive" />
            <span className="stat-card-metric-value stat-card-metric-positive">+8%</span>
            <span className="stat-card-metric-label">from last month</span>
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
              <div className="progress-bar">
                <div
                  className="progress-bar-fill bg-[#10b981]"
                  style={{ width: "86%" }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Competitive Rank */}
        <motion.div
          variants={itemVariants}
          className="stat-card"
          style={{"--from": "rgba(245, 158, 11, 0.1)", "--to": "rgba(251, 191, 36, 0.2)"}}
        >
          <div className="stat-card-header">
            <div>
              <p className="stat-card-title">
                Competitive Rank
              </p>
              <h3 className="stat-card-value">#2</h3>
            </div>
            <span className="stat-card-icon-container" style={{"backgroundColor": "rgba(245, 158, 11, 0.1)"}}>
              <StarIcon className="h-6 w-6 text-[#f59e0b]" />
            </span>
          </div>
          <div className="stat-card-metric">
            <ArrowUpIcon className="stat-card-metric-icon stat-card-metric-positive" />
            <span className="stat-card-metric-value stat-card-metric-positive">+1</span>
            <span className="stat-card-metric-label">from last month</span>
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
        className="card chart-card"
      >
        <div className="chart-header">
          <div>
            <h2 className="chart-title">AI Visibility Trend</h2>
            <p className="chart-description">
              Your product's visibility score over time
            </p>
          </div>
          <div className="chart-actions">
            <button className="chart-action-button">
              <ArrowPathIcon className="chart-action-icon" />
              <span>Refresh Data</span>
            </button>
          </div>
        </div>

        <div className="chart-container">
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

      <div className="two-column-grid">
        {/* Competitor comparison chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <h2 className="chart-title">Competitor Comparison</h2>
          <p className="chart-description">
            How your products compare to competitors
          </p>

          <div className="chart-container">
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
          <h2 className="chart-title">Improvement Opportunities</h2>
          <p className="chart-description">Top areas to focus on</p>

          <div className="space-y-6">
            <div className="improvement-item">
              <div className="improvement-header">
                <div className="improvement-label">
                  <span className="improvement-indicator" style={{ backgroundColor: "#ef4444" }}></span>
                  <span className="improvement-title">
                    Product Descriptions
                  </span>
                </div>
                <span className="improvement-score">65%</span>
              </div>
              <div className="improvement-bar">
                <div
                  className="improvement-bar-fill"
                  style={{ width: "65%", backgroundColor: "#ef4444" }}
                ></div>
              </div>
              <p className="improvement-description">
                Your product descriptions need more specific use cases and
                problem-solving language.
              </p>
            </div>

            <div className="improvement-item">
              <div className="improvement-header">
                <div className="improvement-label">
                  <span className="improvement-indicator" style={{ backgroundColor: "#f59e0b" }}></span>
                  <span className="improvement-title">Feature Highlight</span>
                </div>
                <span className="improvement-score">72%</span>
              </div>
              <div className="improvement-bar">
                <div
                  className="improvement-bar-fill"
                  style={{ width: "72%", backgroundColor: "#f59e0b" }}
                ></div>
              </div>
              <p className="improvement-description">
                Key features need to be described in terms of benefits rather
                than specifications.
              </p>
            </div>

            <div className="improvement-item">
              <div className="improvement-header">
                <div className="improvement-label">
                  <span className="improvement-indicator" style={{ backgroundColor: "#10b981" }}></span>
                  <span className="improvement-title">
                    Contextual Relationships
                  </span>
                </div>
                <span className="improvement-score">84%</span>
              </div>
              <div className="improvement-bar">
                <div
                  className="improvement-bar-fill"
                  style={{ width: "84%", backgroundColor: "#10b981" }}
                ></div>
              </div>
              <p className="improvement-description">
                Strong connection between product and related use cases. Minor
                improvements possible.
              </p>
            </div>

            <div className="improvement-actions">
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
