import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/components/AnalyzePage.css";
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
    <div className="analyze-page">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="analyze-page-title gradient-text">
          AI Search Visibility Analysis
        </h1>
        <p className="analyze-page-description">
          Analyze any product page to see how it performs in AI search systems.
        </p>

        {!analyzed ? (
          <div className="card p-8 max-w-3xl">
            <h2 className="text-xl font-semibold mb-6">
              Enter a product URL or paste content
            </h2>

            <div className="space-y-6">
              <div className="analyze-tab-group">
                <button
                  onClick={() => setActiveTab("url")}
                  className={`analyze-tab ${
                    activeTab === "url" ? "active" : ""
                  }`}
                >
                  <LinkIcon className="analyze-tab-icon" />
                  <span>URL</span>
                </button>

                <button
                  onClick={() => setActiveTab("text")}
                  className={`analyze-tab ${
                    activeTab === "text" ? "active" : ""
                  }`}
                >
                  <DocumentTextIcon className="analyze-tab-icon" />
                  <span>Text</span>
                </button>

                <button
                  onClick={() => setActiveTab("document")}
                  className={`analyze-tab ${
                    activeTab === "document" ? "active" : ""
                  }`}
                >
                  <DocumentDuplicateIcon className="analyze-tab-icon" />
                  <span>Document</span>
                </button>
              </div>

              {activeTab === "url" && (
                <div className="space-y-4">
                  <div className="url-input-container">
                    <div className="url-input-icon">
                      <LinkIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="input url-input"
                      placeholder="https://example.com/your-product"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>

                  <div className="recent-items-label">
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
                        className="recent-item"
                      >
                        <span className="recent-item-number">{index + 1}</span>
                        <span className="recent-item-text">{item}</span>
                        <ChevronRightIcon className="recent-item-icon" />
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
                <div className="file-upload-area">
                  <DocumentDuplicateIcon className="file-upload-icon" />
                  <p className="file-upload-text">Drag & drop your file here</p>
                  <p className="file-upload-subtext">
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
            <div className="results-header">
              <div>
                <div className="results-title-container">
                  <h2 className="results-title">Analysis Results</h2>
                  <span className="badge badge-primary">Product Page</span>
                </div>
                <p className="results-url">{url}</p>
              </div>
              <div className="results-actions">
                <button
                  onClick={handleReset}
                  className="btn btn-secondary mr-3 flex items-center text-sm"
                >
                  <ArrowPathIcon className="action-button-icon" />
                  New Analysis
                </button>
                <button className="btn btn-accent flex items-center text-sm">
                  <SparklesIcon className="action-button-icon" />
                  Optimize
                </button>
              </div>
            </div>

            {/* Score Overview */}
            <motion.div variants={itemVariants} className="card mb-8">
              <div className="score-overview">
                <div className="score-circle-container">
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
                  </svg>

                  <div className="score-circle-text">
                    <div className="score-circle-value">
                      {analysisData.score}
                    </div>
                    <div className="score-circle-label">out of 100</div>
                  </div>
                </div>

                <div className="score-details">
                  <h3 className="score-details-title">
                    AI Search Visibility Score
                  </h3>
                  <p className="score-details-description">
                    Your product page has moderate visibility in AI search
                    systems. With targeted improvements, you could see a
                    significant boost in how often your product is recommended.
                  </p>
                  <div className="score-badges">
                    <div className="score-badge score-badge-primary">
                      <ArrowTrendingUpIcon className="score-badge-icon text-[#4f46e5]" />
                      <span className="score-badge-text-primary">
                        Top 40% of products
                      </span>
                    </div>
                    <div className="score-badge score-badge-success">
                      <CheckCircleIcon className="score-badge-icon text-green-600" />
                      <span className="score-badge-text-success">
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
                <div className="recommendation-header">
                  <div className="recommendation-title-container">
                    <div
                      className={`recommendation-score ${
                        rec.score >= 80
                          ? "recommendation-score-good"
                          : rec.score >= 70
                          ? "recommendation-score-moderate"
                          : rec.score >= 60
                          ? "recommendation-score-fair"
                          : "recommendation-score-poor"
                      }`}
                    >
                      <span className="recommendation-score-text">
                        {rec.score}
                      </span>
                    </div>
                    <h3 className="recommendation-title">{rec.category}</h3>
                  </div>

                  <div className="recommendation-progress">
                    <div className="recommendation-progress-bg">
                      <div
                        className={`recommendation-progress-bar ${
                          rec.score >= 80
                            ? "recommendation-progress-good"
                            : rec.score >= 70
                            ? "recommendation-progress-moderate"
                            : rec.score >= 60
                            ? "recommendation-progress-fair"
                            : "recommendation-progress-poor"
                        }`}
                        style={{ width: `${rec.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <p className="recommendation-details">{rec.details}</p>

                <div className="recommendation-suggestions">
                  <h4 className="recommendation-suggestions-title">
                    Suggestions:
                  </h4>
                  <ul className="recommendation-suggestions-list">
                    {rec.suggestions.map((suggestion, i) => (
                      <li key={i} className="recommendation-suggestion-item">
                        <span className="recommendation-suggestion-number">
                          <span className="recommendation-suggestion-number-text">
                            {i + 1}
                          </span>
                        </span>
                        <span className="recommendation-suggestion-text">
                          {suggestion}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}

            <motion.div variants={itemVariants} className="final-actions">
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
