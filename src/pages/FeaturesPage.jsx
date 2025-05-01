import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  ChartBarIcon,
  MagnifyingGlassIcon,
  LightBulbIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  PresentationChartLineIcon,
  CloudArrowUpIcon,
  CubeIcon,
  CodeBracketIcon,
  ShieldCheckIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  DocumentChartBarIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

const FeaturesPage = () => {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState({});
  const [activeTab, setActiveTab] = useState("all");

  // Scroll animation refs
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const scrollIndicatorWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  // Animation for fading in sections when they become visible
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    });

    const sections = document.querySelectorAll(".observe-section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Features data
  const featuresData = [
    {
      id: 1,
      icon: <ChartBarIcon className="w-8 h-8" />,
      color: "indigo",
      title: "AI Visibility Score",
      description:
        "Get a comprehensive score that shows how well your products perform in AI search engines, with detailed breakdowns by categories.",
      category: "analytics",
    },
    {
      id: 2,
      icon: <LightBulbIcon className="w-8 h-8" />,
      color: "green",
      title: "Smart Optimization Suggestions",
      description:
        "Receive specific, actionable recommendations to improve your product descriptions, features, and structure for AI search algorithms.",
      category: "optimization",
    },
    {
      id: 3,
      icon: <MagnifyingGlassIcon className="w-8 h-8" />,
      color: "blue",
      title: "Competitor Analysis",
      description:
        "See how your products compare to competitors in AI search visibility and identify opportunities to outrank them with strategic content changes.",
      category: "analytics",
    },
    {
      id: 4,
      icon: <SparklesIcon className="w-8 h-8" />,
      color: "purple",
      title: "AI Search Trend Reports",
      description:
        "Weekly reports on changing AI search patterns and behaviors to help you stay ahead of the curve and adapt your strategy accordingly.",
      category: "analytics",
    },
    {
      id: 5,
      icon: <ArrowTrendingUpIcon className="w-8 h-8" />,
      color: "red",
      title: "CMS Integrations",
      description:
        "Connect directly with popular content management systems like WordPress, Shopify, and WooCommerce to seamlessly optimize your content.",
      category: "integrations",
    },
    {
      id: 6,
      icon: <CloudArrowUpIcon className="w-8 h-8" />,
      color: "cyan",
      title: "Bulk Content Upload",
      description:
        "Upload and analyze multiple products at once, saving time and ensuring consistent optimization across your entire product catalog.",
      category: "productivity",
    },
    {
      id: 7,
      icon: <PresentationChartLineIcon className="w-8 h-8" />,
      color: "amber",
      title: "Performance Dashboard",
      description:
        "Track your optimization progress over time with comprehensive analytics and visualizations showing your AI search visibility improvements.",
      category: "analytics",
    },
    {
      id: 8,
      icon: <CodeBracketIcon className="w-8 h-8" />,
      color: "emerald",
      title: "API Access",
      description:
        "Integrate AIVO's powerful optimization tools directly into your workflows with our comprehensive API and developer documentation.",
      category: "integrations",
    },
    {
      id: 9,
      icon: <CubeIcon className="w-8 h-8" />,
      color: "fuchsia",
      title: "Multi-Platform Optimization",
      description:
        "Optimize your products for multiple AI platforms including ChatGPT, Google Bard, and other major AI search systems with platform-specific insights.",
      category: "optimization",
    },
    {
      id: 10,
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      color: "teal",
      title: "Data Security",
      description:
        "Enterprise-grade security ensuring your product data and optimization strategies remain private and protected at all times.",
      category: "security",
    },
    {
      id: 11,
      icon: <UsersIcon className="w-8 h-8" />,
      color: "rose",
      title: "Team Collaboration",
      description:
        "Multiple user accounts with role-based permissions to facilitate teamwork between content creators, marketers, and management.",
      category: "productivity",
    },
    {
      id: 12,
      icon: <ChatBubbleLeftRightIcon className="w-8 h-8" />,
      color: "sky",
      title: "AI Content Assistant",
      description:
        "Built-in AI writing assistant to help you implement recommendations and create optimized product descriptions that perform well in AI searches.",
      category: "optimization",
    },
    {
      id: 13,
      icon: <DocumentChartBarIcon className="w-8 h-8" />,
      color: "yellow",
      title: "Export & Reporting",
      description:
        "Export detailed reports and analysis for stakeholders, with customizable formats including PDF, CSV, and interactive presentations.",
      category: "productivity",
    },
    {
      id: 14,
      icon: <RocketLaunchIcon className="w-8 h-8" />,
      color: "violet",
      title: "Strategy Planner",
      description:
        "AI-powered planning tool that creates a customized roadmap for improving your product visibility based on your specific business goals.",
      category: "optimization",
    },
    {
      id: 15,
      icon: <CheckCircleIcon className="w-8 h-8" />,
      color: "lime",
      title: "A/B Testing",
      description:
        "Test different product descriptions and content strategies to determine which performs best in AI search results before full implementation.",
      category: "analytics",
    },
  ];

  const categories = [
    { id: "all", name: "All Features" },
    { id: "analytics", name: "Analytics" },
    { id: "optimization", name: "Optimization" },
    { id: "productivity", name: "Productivity" },
    { id: "integrations", name: "Integrations" },
    { id: "security", name: "Security" },
  ];

  // Filter features based on active tab
  const filteredFeatures =
    activeTab === "all"
      ? featuresData
      : featuresData.filter((feature) => feature.category === activeTab);

  return (
    <div
      ref={scrollRef}
      className={`overflow-hidden ${isDarkMode ? "text-gray-100" : ""}`}
    >
      {/* Scroll progress indicator */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-1 bg-indigo-600 z-50`}
        style={{ scaleX: scrollIndicatorWidth, transformOrigin: "0%" }}
      />

      {/* Hero Section */}
      <section
        className={`relative py-20 md:py-28 lg:py-24 overflow-hidden bg-gradient-to-br ${
          isDarkMode
            ? "from-gray-900 via-gray-800 to-gray-900"
            : "from-indigo-50 via-blue-50 to-indigo-50"
        }`}
      >
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight"
            >
              <span className="gradient-text">Powerful Features</span> for AI
              Search Optimization
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto"
            >
              Discover all the tools and features AIVO offers to boost your
              product visibility in AI search results
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-10"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="shadow-lg"
              >
                <Link
                  to="/register"
                  className="btn bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg font-medium rounded-lg transition duration-300 flex items-center justify-center"
                >
                  <span>Start 14-Day Free Trial</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/pricing"
                  className={`btn border-2 ${
                    isDarkMode
                      ? "border-white text-white hover:bg-white/10"
                      : "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                  } px-8 py-4 text-lg font-medium rounded-lg transition duration-300`}
                >
                  View Pricing
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative shapes */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
      </section>

      {/* Feature Categories Navigation */}
      <section
        className={`py-8 sticky top-0 z-30 border-b ${
          isDarkMode
            ? "bg-gray-900/95 backdrop-blur-md border-gray-800"
            : "bg-white/95 backdrop-blur-md border-gray-100"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all ${
                  activeTab === category.id
                    ? isDarkMode
                      ? "bg-indigo-600 text-white"
                      : "bg-indigo-600 text-white"
                    : isDarkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        id="features-grid"
        className={`py-20 observe-section ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={
              isVisible["features-grid"] ? { opacity: 1 } : { opacity: 0 }
            }
            transition={{ duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-800/80"
                    : "bg-white hover:bg-gray-50 border border-gray-100"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible["features-grid"]
                    ? {
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.1 * (index % 6) },
                      }
                    : { opacity: 0, y: 20 }
                }
                whileHover={{ y: -5 }}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-${
                    feature.color
                  }-100 text-${feature.color}-600 ${
                    isDarkMode ? `bg-${feature.color}-900 bg-opacity-30` : ""
                  }`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA if no features match filter */}
          {filteredFeatures.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold mb-4">
                No features match this category
              </h3>
              <button
                onClick={() => setActiveTab("all")}
                className="btn bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition duration-300"
              >
                View All Features
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Feature Showcase Section */}
      <section
        id="feature-showcase"
        className={`py-24 observe-section ${
          isDarkMode ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={
              isVisible["feature-showcase"] ? { opacity: 1 } : { opacity: 0 }
            }
            transition={{ duration: 1 }}
          >
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                isDarkMode
                  ? "bg-gray-700 text-indigo-300"
                  : "bg-indigo-100 text-indigo-800"
              }`}
            >
              Featured Highlight
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI Visibility Score
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Our proprietary algorithm evaluates your products from the
              perspective of AI search engines
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={
                isVisible["feature-showcase"]
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -50 }
              }
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div
                className={`rounded-2xl overflow-hidden shadow-xl ${
                  isDarkMode ? "bg-gray-900" : "bg-white"
                }`}
              >
                <div className="p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600">
                  <div
                    className={`p-6 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-2xl font-bold">
                          Product Visibility Score
                        </h3>
                        <p
                          className={`${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Updated 2 hours ago
                        </p>
                      </div>
                      <div
                        className={`text-4xl font-bold text-indigo-600 flex items-center`}
                      >
                        78
                        <span className="text-sm ml-1 font-normal text-green-500">
                          +12%
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Relevance</span>
                          <span
                            className={`font-medium ${
                              isDarkMode ? "text-indigo-400" : "text-indigo-600"
                            }`}
                          >
                            85%
                          </span>
                        </div>
                        <div
                          className={`h-2 rounded-full ${
                            isDarkMode ? "bg-gray-700" : "bg-gray-200"
                          }`}
                        >
                          <div
                            className="h-full rounded-full bg-indigo-500"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Completeness</span>
                          <span
                            className={`font-medium ${
                              isDarkMode ? "text-indigo-400" : "text-indigo-600"
                            }`}
                          >
                            70%
                          </span>
                        </div>
                        <div
                          className={`h-2 rounded-full ${
                            isDarkMode ? "bg-gray-700" : "bg-gray-200"
                          }`}
                        >
                          <div
                            className="h-full rounded-full bg-indigo-500"
                            style={{ width: "70%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>User Satisfaction Prediction</span>
                          <span
                            className={`font-medium ${
                              isDarkMode ? "text-indigo-400" : "text-indigo-600"
                            }`}
                          >
                            92%
                          </span>
                        </div>
                        <div
                          className={`h-2 rounded-full ${
                            isDarkMode ? "bg-gray-700" : "bg-gray-200"
                          }`}
                        >
                          <div
                            className="h-full rounded-full bg-green-500"
                            style={{ width: "92%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Search Visibility</span>
                          <span
                            className={`font-medium ${
                              isDarkMode ? "text-indigo-400" : "text-indigo-600"
                            }`}
                          >
                            65%
                          </span>
                        </div>
                        <div
                          className={`h-2 rounded-full ${
                            isDarkMode ? "bg-gray-700" : "bg-gray-200"
                          }`}
                        >
                          <div
                            className="h-full rounded-full bg-amber-500"
                            style={{ width: "65%" }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          isDarkMode
                            ? "bg-gray-800 text-white hover:bg-gray-700"
                            : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                        } transition-colors`}
                      >
                        View Full Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={
                isVisible["feature-showcase"]
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: 50 }
              }
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-6"
            >
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                  <ChartBarIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Comprehensive Analysis
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Our AI Visibility Score examines over 50 different factors
                  that influence how AI search engines evaluate your products,
                  from content quality to structured data.
                </p>
              </div>

              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                  <ArrowTrendingUpIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Competitor Benchmarking
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  See how your products stack up against your competitors in AI
                  search results and identify specific areas where you can gain
                  a competitive edge.
                </p>
              </div>

              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-4">
                  <LightBulbIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Actionable Insights</h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Each score comes with specific, prioritized recommendations
                  that you can implement immediately to improve your product's
                  visibility in AI search results.
                </p>
              </div>

              <Link
                to="/register"
                className="inline-flex items-center text-indigo-500 font-medium hover:text-indigo-700 mt-4"
              >
                Try AI Visibility Score
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section
        id="integrations"
        className={`py-24 observe-section ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={
              isVisible["integrations"] ? { opacity: 1 } : { opacity: 0 }
            }
            transition={{ duration: 1 }}
          >
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                isDarkMode
                  ? "bg-gray-800 text-indigo-300"
                  : "bg-indigo-100 text-indigo-800"
              }`}
            >
              Seamless Integration
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Works With Your Existing Tools
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              AIVO integrates with your favorite platforms to streamline your
              workflow
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              "WordPress",
              "Shopify",
              "WooCommerce",
              "Magento",
              "BigCommerce",
              "Salesforce",
              "HubSpot",
              "Google Analytics",
              "Slack",
              "Zapier",
            ].map((platform, index) => (
              <motion.div
                key={platform}
                className={`flex flex-col items-center justify-center p-6 rounded-xl ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-800/80"
                    : "bg-gray-50 hover:bg-gray-100"
                } transition-colors duration-300`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isVisible["integrations"]
                    ? {
                        opacity: 1,
                        scale: 1,
                        transition: { delay: 0.1 * (index % 5) },
                      }
                    : { opacity: 0, scale: 0.9 }
                }
                whileHover={{ y: -5 }}
              >
                <div
                  className={`w-12 h-12 rounded-lg ${
                    isDarkMode ? "bg-gray-700" : "bg-white"
                  } flex items-center justify-center mb-4`}
                >
                  {/* This would be replaced with actual logos */}
                  <span
                    className={`text-2xl font-bold ${
                      isDarkMode ? "text-indigo-400" : "text-indigo-600"
                    }`}
                  >
                    {platform.charAt(0)}
                  </span>
                </div>
                <p className="text-center font-medium">{platform}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/integrations"
              className={`inline-flex items-center px-6 py-3 rounded-lg ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              } transition-colors`}
            >
              <span className="font-medium">View All Integrations</span>
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta-section"
        className="py-24 observe-section relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900"
      >
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <svg
            className="absolute h-full w-full"
            viewBox="0 0 800 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="a" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              fill="url(#a)"
              d="M400,200L400,200C511,200,600,289,600,400L600,400C600,511,511,600,400,600L400,600C289,600,200,511,200,400L200,400C200,289,289,200,400,200Z"
              transform="rotate(0, 400, 400)"
              opacity="0.4"
            >
              <animate
                attributeName="d"
                dur="15s"
                repeatCount="indefinite"
                values="M400,200L400,200C511,200,600,289,600,400L600,400C600,511,511,600,400,600L400,600C289,600,200,511,200,400L200,400C200,289,289,200,400,200Z;
                       M350,173.2L396.9,171.8C443.7,170.3,537.3,196.7,593.2,243.3L649,290C704.8,336.7,722.7,403.3,690,470L657.3,536.7C624.7,603.3,541.3,670,458,678.2L374.7,686.3C291.3,694.7,208,644.7,166.2,584L124.3,523.3C82.5,462.7,82.3,391.3,121.8,335L161.3,278.7C200.8,222.3,280,181,320,170.5L360,160Z;
                       M400,200L400,200C511,200,600,289,600,400L600,400C600,511,511,600,400,600L400,600C289,600,200,511,200,400L200,400C200,289,289,200,400,200Z"
              />
            </path>
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={
              isVisible["cta-section"]
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Ready to Boost Your AI Search Visibility?
            </h2>

            <p className="text-xl md:text-2xl mb-10 text-indigo-100">
              Join hundreds of businesses already improving their visibility in
              AI search results with AIVO
            </p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isVisible["cta-section"]
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/register"
                  className="btn bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-lg transition duration-300 flex items-center justify-center"
                >
                  <span>Start Free Trial</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/demo"
                  className="btn border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-medium rounded-lg transition duration-300"
                >
                  Request Demo
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center gap-8"
              initial={{ opacity: 0 }}
              animate={
                isVisible["cta-section"] ? { opacity: 1 } : { opacity: 0 }
              }
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-green-400 mr-2" />
                <p className="text-indigo-100 text-sm">
                  No credit card required
                </p>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-green-400 mr-2" />
                <p className="text-indigo-100 text-sm">14-day free trial</p>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-green-400 mr-2" />
                <p className="text-indigo-100 text-sm">Cancel anytime</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
