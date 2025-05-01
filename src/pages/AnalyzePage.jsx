import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MagnifyingGlassIcon,
  DocumentTextIcon,
  LinkIcon,
  SparklesIcon,
  DocumentDuplicateIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  ChevronRightIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

const AnalyzePage = () => {
  const [url, setUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Demo analysis data
  const analysisData = {
    score: 68,
    recommendations: [
      {
        category: "Content Structure",
        score: 72,
        details:
          "Your product structure follows best practices but could be improved.",
        suggestions: [
          "Add more hierarchical headings to organize product information",
          "Create distinct sections for features, benefits, and specifications",
          "Include a FAQ section addressing common customer questions",
        ],
      },
      {
        category: "Natural Language",
        score: 65,
        details: "Your product descriptions need more conversational elements.",
        suggestions: [
          "Replace technical jargon with everyday language where possible",
          "Frame features in terms of how they solve customer problems",
          "Use more active voice in your product descriptions",
        ],
      },
      {
        category: "Entity Relationships",
        score: 74,
        details:
          "Product relationships to use cases and related concepts are good.",
        suggestions: [
          "Add more specific examples of when your product is most useful",
          "Create stronger connections to industry-specific terminology",
          "Mention complementary products or services",
        ],
      },
      {
        category: "Query Matching",
        score: 62,
        details: "Your content could better match common AI queries.",
        suggestions: [
          "Include questions users might ask about your product directly in content",
          "Add comparison sections that AI systems can easily extract",
          "Include definitive statements about what problems your product solves",
        ],
      },
    ],
  };

  const handleAnalyze = () => {
    if (!url) return;

    setAnalyzing(true);

    // Simulate analysis process
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 3000);
  };

  const handleReset = () => {
    setUrl("");
    setAnalyzed(false);
  };

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
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 gradient-text">
          AI Search Visibility Analysis
        </h1>
        <p className="text-gray-600 mb-8">
          Analyze any product page to see how it performs in AI search systems.
        </p>

        {!analyzed ? (
          <div className="card p-8 max-w-3xl">
            <h2 className="text-xl font-semibold mb-6">
              Enter a product URL or paste content
            </h2>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setActiveTab("url")}
                  className={`flex items-center px-4 py-3 rounded-lg border ${
                    activeTab === "url"
                      ? "border-[#4f46e5] bg-[#4f46e5]/5"
                      : "border-gray-200"
                  }`}
                >
                  <LinkIcon className="h-5 w-5 mr-2 text-gray-500" />
                  <span>URL</span>
                </button>

                <button
                  onClick={() => setActiveTab("text")}
                  className={`flex items-center px-4 py-3 rounded-lg border ${
                    activeTab === "text"
                      ? "border-[#4f46e5] bg-[#4f46e5]/5"
                      : "border-gray-200"
                  }`}
                >
                  <DocumentTextIcon className="h-5 w-5 mr-2 text-gray-500" />
                  <span>Text</span>
                </button>

                <button
                  onClick={() => setActiveTab("document")}
                  className={`flex items-center px-4 py-3 rounded-lg border ${
                    activeTab === "document"
                      ? "border-[#4f46e5] bg-[#4f46e5]/5"
                      : "border-gray-200"
                  }`}
                >
                  <DocumentDuplicateIcon className="h-5 w-5 mr-2 text-gray-500" />
                  <span>Document</span>
                </button>
              </div>

              {activeTab === "url" && (
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <LinkIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="input pl-10"
                      placeholder="https://example.com/your-product"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    <span>Recently analyzed:</span>
                  </div>

                  <div className="space-y-2">
                    {[
                      "https://demo-store.com/premium-headphones",
                      "https://tech-gadgets.io/smart-watch",
                    ].map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setUrl(item)}
                        className="flex items-center w-full p-2 text-left text-sm hover:bg-gray-50 rounded-md"
                      >
                        <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          {index + 1}
                        </span>
                        <span className="text-gray-800 truncate flex-1">
                          {item}
                        </span>
                        <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "text" && (
                <div>
                  <textarea
                    className="w-full h-40 rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] resize-none"
                    placeholder="Paste your product content here..."
                  ></textarea>
                </div>
              )}

              {activeTab === "document" && (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">
                  <DocumentDuplicateIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">
                    Drag & drop your file here
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    Supports PDF, DOCX, HTML (Max 10MB)
                  </p>
                  <button className="btn btn-secondary">Browse Files</button>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing || !url}
                  className="btn btn-primary flex items-center"
                >
                  {analyzing ? (
                    <>
                      <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                      Analyze
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div>
                <div className="flex items-center">
                  <h2 className="text-xl font-semibold mr-3">
                    Analysis Results
                  </h2>
                  <span className="badge badge-primary">Product Page</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">{url}</p>
              </div>
              <div className="flex items-center mt-4 sm:mt-0">
                <button
                  onClick={handleReset}
                  className="btn btn-secondary mr-3 flex items-center text-sm"
                >
                  <ArrowPathIcon className="h-4 w-4 mr-1" />
                  New Analysis
                </button>
                <button className="btn btn-accent flex items-center text-sm">
                  <SparklesIcon className="h-4 w-4 mr-1" />
                  Optimize
                </button>
              </div>
            </div>

            {/* Score Overview */}
            <motion.div variants={itemVariants} className="card mb-8">
              <div className="flex flex-col md:flex-row items-center">
                <div className="relative flex-shrink-0">
                  <svg className="w-40 h-40" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    ></circle>
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="2"
                      strokeDasharray={`${analysisData.score} ${
                        100 - analysisData.score
                      }`}
                      strokeDashoffset="25"
                      className="transition-all duration-1000 ease-out"
                    ></circle>
                    <text
                      x="18"
                      y="18.5"
                      textAnchor="middle"
                      dy=".35em"
                      className="text-3xl font-bold"
                    >
                      {analysisData.score}
                    </text>
                  </svg>

                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="text-3xl font-bold text-gray-800">
                      {analysisData.score}
                    </div>
                    <div className="text-sm text-center text-gray-500">
                      out of 100
                    </div>
                  </div>
                </div>

                <div className="ml-0 md:ml-8 mt-6 md:mt-0">
                  <h3 className="text-xl font-bold mb-2">
                    AI Search Visibility Score
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Your product page has moderate visibility in AI search
                    systems. With targeted improvements, you could see a
                    significant boost in how often your product is recommended.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center px-3 py-1 bg-[#4f46e5]/10 rounded-full">
                      <ArrowTrendingUpIcon className="h-4 w-4 text-[#4f46e5] mr-1" />
                      <span className="text-sm font-medium text-[#4f46e5]">
                        Top 40% of products
                      </span>
                    </div>
                    <div className="flex items-center px-3 py-1 bg-green-100 rounded-full">
                      <CheckCircleIcon className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm font-medium text-green-600">
                        Good entity linking
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Detailed Analysis Sections */}
            {analysisData.recommendations.map((rec, index) => (
              <motion.div
                variants={itemVariants}
                key={index}
                className="card mb-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                        rec.score >= 80
                          ? "bg-green-100 text-green-600"
                          : rec.score >= 70
                          ? "bg-blue-100 text-blue-600"
                          : rec.score >= 60
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      <span className="text-lg font-bold">{rec.score}</span>
                    </div>
                    <h3 className="text-lg font-semibold">{rec.category}</h3>
                  </div>

                  <div className="mt-4 md:mt-0">
                    <div className="w-full md:w-48 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          rec.score >= 80
                            ? "bg-green-500"
                            : rec.score >= 70
                            ? "bg-blue-500"
                            : rec.score >= 60
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${rec.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{rec.details}</p>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Suggestions:</h4>
                  <ul className="space-y-2">
                    {rec.suggestions.map((suggestion, i) => (
                      <li key={i} className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-[#4f46e5]/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
                          <span className="text-xs font-medium text-[#4f46e5]">
                            {i + 1}
                          </span>
                        </span>
                        <span className="text-gray-700">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}

            <motion.div
              variants={itemVariants}
              className="flex justify-center mt-8"
            >
              <button className="btn btn-primary mr-4">
                Generate Improvement Report
              </button>
              <button className="btn btn-secondary">
                Schedule Optimization Call
              </button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AnalyzePage;
