import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SuggestionsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const analysisId = searchParams.get("id");

  const [activeTab, setActiveTab] = useState("content");
  const [isImplementing, setIsImplementing] = useState(false);

  // Mock data for demonstration purposes
  const analysisResult = {
    url: "https://example.com/products/wireless-headphones",
    score: 78,
    date: "2025-04-30",
    summary:
      "This product page has good basic information but lacks sufficient context for AI search systems to fully understand its capabilities and use cases.",
    recommendations: {
      content: [
        {
          id: 1,
          title: "Enhance product description with real-world use cases",
          description:
            "Add 3-5 concrete scenarios where the product solves specific problems for users.",
          priority: "High",
          difficulty: "Medium",
          impact: 8.5,
        },
        {
          id: 2,
          title: "Use more conversational language in features section",
          description:
            "Rewrite technical specifications in more natural language that mimics how users would ask about these features.",
          priority: "Medium",
          difficulty: "Low",
          impact: 7.2,
        },
        {
          id: 3,
          title: "Add comparison with previous models",
          description:
            "Include clear differences between this and previous product versions to help AI understand the evolution and improvements.",
          priority: "Low",
          difficulty: "Low",
          impact: 5.8,
        },
      ],
      entities: [
        {
          id: 4,
          title: "Add explicit product category information",
          description:
            'Ensure the product is clearly identified as "wireless noise-cancelling headphones" early in the content.',
          priority: "High",
          difficulty: "Low",
          impact: 8.9,
        },
        {
          id: 5,
          title: "Link product to relevant activities",
          description:
            'Create explicit connections between the product and activities like "travel," "work from home," and "exercise."',
          priority: "Medium",
          difficulty: "Medium",
          impact: 7.5,
        },
      ],
      gaps: [
        {
          id: 6,
          title: "Address battery life concerns",
          description:
            "Add content that proactively addresses common questions about battery performance and charging time.",
          priority: "High",
          difficulty: "Low",
          impact: 8.3,
        },
        {
          id: 7,
          title: "Include compatibility information",
          description:
            "Specify exactly which devices and operating systems are compatible with these headphones.",
          priority: "High",
          difficulty: "Medium",
          impact: 9.1,
        },
      ],
      structure: [
        {
          id: 8,
          title: "Use more structured data markup",
          description:
            "Implement product schema.org markup to help AI systems better understand product attributes.",
          priority: "Medium",
          difficulty: "High",
          impact: 8.7,
        },
        {
          id: 9,
          title: "Organize specifications in a table",
          description:
            "Present technical specifications in a structured table rather than paragraph format.",
          priority: "Low",
          difficulty: "Low",
          impact: 6.2,
        },
      ],
    },
    querySimulation: {
      results: [
        {
          query: "best noise cancelling headphones for travel",
          ranking: 4,
          visibility: "Medium",
          competitors: [
            "Sony WH-1000XM5",
            "Bose QuietComfort",
            "Apple AirPods Max",
          ],
        },
        {
          query: "comfortable wireless headphones for work",
          ranking: 6,
          visibility: "Low",
          competitors: [
            "Jabra Elite 85h",
            "Microsoft Surface Headphones",
            "Bose NC 700",
          ],
        },
        {
          query: "headphones with best battery life",
          ranking: "Not in top 10",
          visibility: "Very Low",
          competitors: [
            "Sony WH-1000XM5",
            "Sennheiser Momentum 4",
            "Jabra Elite 85h",
          ],
        },
      ],
    },
  };

  const tabs = [
    {
      id: "content",
      label: "Content Optimization",
      count: analysisResult.recommendations.content.length,
    },
    {
      id: "entities",
      label: "Entity & Relationship",
      count: analysisResult.recommendations.entities.length,
    },
    {
      id: "gaps",
      label: "Content Gaps",
      count: analysisResult.recommendations.gaps.length,
    },
    {
      id: "structure",
      label: "Structure & Schema",
      count: analysisResult.recommendations.structure.length,
    },
    {
      id: "simulation",
      label: "Query Simulation",
      count: analysisResult.querySimulation.results.length,
    },
  ];

  // Get current tab recommendations
  const getCurrentTabItems = () => {
    if (activeTab === "simulation") {
      return analysisResult.querySimulation.results;
    }
    return analysisResult.recommendations[activeTab] || [];
  };

  const handleImplement = (recommendationId) => {
    setIsImplementing(true);
    // Simulate implementation process
    setTimeout(() => {
      setIsImplementing(false);
      // Mark as implemented logic would go here
    }, 1500);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Optimization Suggestions</h1>
        <p className="text-gray-600">
          Based on analysis of {analysisResult.url}
        </p>
      </div>

      {/* Score Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-medium mb-1">AI Visibility Score</h2>
            <p className="text-gray-600 text-sm mb-2">
              Analyzed on {analysisResult.date}
            </p>
            <p className="text-gray-700">{analysisResult.summary}</p>
          </div>
          <div className="flex items-center">
            <div className="w-24 h-24 rounded-full bg-blue-50 border-8 border-blue-100 flex items-center justify-center">
              <span className="text-3xl font-bold text-primary">
                {analysisResult.score}%
              </span>
            </div>
            <div className="ml-4">
              <div className="text-sm text-gray-600 mb-1">Score Range:</div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="mx-1 text-xs">0-60</span>
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span className="mx-1 text-xs">61-80</span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="mx-1 text-xs">81-100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`inline-flex items-center py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              <span
                className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                  activeTab === tab.id ? "bg-primary text-white" : "bg-gray-100"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Recommendation Content */}
      <div className="space-y-6">
        {activeTab !== "simulation" ? (
          getCurrentTabItems().map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.priority === "High"
                            ? "bg-red-100 text-red-800"
                            : item.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {item.priority} Priority
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.difficulty === "High"
                            ? "bg-red-100 text-red-800"
                            : item.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {item.difficulty} Difficulty
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Impact: {item.impact}/10
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleImplement(item.id)}
                    disabled={isImplementing}
                    className={`btn ${
                      isImplementing
                        ? "btn-secondary opacity-70"
                        : "btn-primary"
                    }`}
                  >
                    {isImplementing ? "Implementing..." : "Implement"}
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3 flex justify-between">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Tip:</span>{" "}
                  {activeTab === "content"
                    ? "Focus on natural language that answers common user questions."
                    : activeTab === "entities"
                    ? "Create clear connections between your product and related concepts."
                    : activeTab === "gaps"
                    ? "Address frequently asked questions before they're asked."
                    : "Structured data helps AI systems classify your product accurately."}
                </div>
                <button className="text-primary text-sm font-medium hover:text-blue-700">
                  See example
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">
                AI Query Simulation Results
              </h3>
              <p className="text-gray-600 mb-6">
                How your product appears in AI responses to common user queries:
              </p>

              <div className="space-y-6">
                {analysisResult.querySimulation.results.map((result, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">"{result.query}"</h4>
                        <div className="mt-2 flex items-center">
                          <span className="text-sm text-gray-600 mr-2">
                            Your product ranks:
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              result.ranking === "Not in top 10" ||
                              result.ranking > 5
                                ? "bg-red-100 text-red-800"
                                : result.ranking > 2
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {result.ranking}
                          </span>
                          <span className="ml-4 text-sm text-gray-600">
                            Visibility:
                          </span>
                          <span
                            className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                              result.visibility === "Very Low" ||
                              result.visibility === "Low"
                                ? "bg-red-100 text-red-800"
                                : result.visibility === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {result.visibility}
                          </span>
                        </div>
                      </div>
                      <button className="btn btn-secondary text-sm py-1">
                        Improve Ranking
                      </button>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">
                        Top competitors for this query:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {result.competitors.map((competitor, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-100 rounded-full text-xs"
                          >
                            {i + 1}. {competitor}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestionsPage;
