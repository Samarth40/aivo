import React, { useState } from "react";

const AnalyzePage = () => {
  const [analyzeType, setAnalyzeType] = useState("url");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [competitors, setCompetitors] = useState([""]);
  const [options, setOptions] = useState({
    analyzeCompetitors: true,
    detectKeywords: true,
    contentGaps: true,
    aiQuerySimulation: true,
  });

  const handleAddCompetitor = () => {
    setCompetitors([...competitors, ""]);
  };

  const handleCompetitorChange = (index, value) => {
    const updatedCompetitors = [...competitors];
    updatedCompetitors[index] = value;
    setCompetitors(updatedCompetitors);
  };

  const handleRemoveCompetitor = (index) => {
    if (competitors.length > 1) {
      const updatedCompetitors = competitors.filter((_, i) => i !== index);
      setCompetitors(updatedCompetitors);
    }
  };

  const handleOptionChange = (option) => {
    setOptions({
      ...options,
      [option]: !options[option],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setProgress(0);

    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            // Here you would redirect to the results page
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Analyze Content</h1>
        <p className="text-gray-600">
          Submit a URL or raw content to analyze its visibility in AI search
          results
        </p>
      </div>

      {!isAnalyzing ? (
        <div className="card">
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button
                className={`py-3 px-6 ${
                  analyzeType === "url"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setAnalyzeType("url")}
              >
                Analyze URL
              </button>
              <button
                className={`py-3 px-6 ${
                  analyzeType === "content"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setAnalyzeType("content")}
              >
                Analyze Raw Content
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {analyzeType === "url" ? (
              <div>
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Page URL
                </label>
                <input
                  type="url"
                  id="url"
                  className="input"
                  placeholder="https://example.com/product"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
            ) : (
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Content
                </label>
                <textarea
                  id="content"
                  rows="6"
                  className="input"
                  placeholder="Paste your product description, features, and other content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>
            )}

            <div>
              <h3 className="text-lg font-medium mb-3">Competitor Analysis</h3>
              <p className="text-sm text-gray-600 mb-4">
                Add competitor product URLs to compare visibility and identify
                opportunities
              </p>

              {competitors.map((competitor, index) => (
                <div key={index} className="flex items-center mb-3">
                  <input
                    type="url"
                    className="input"
                    placeholder="https://competitor.com/product"
                    value={competitor}
                    onChange={(e) =>
                      handleCompetitorChange(index, e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="ml-2 p-2 text-gray-400 hover:text-red-500"
                    onClick={() => handleRemoveCompetitor(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="text-primary hover:text-blue-700 text-sm flex items-center"
                onClick={handleAddCompetitor}
              >
                <span className="mr-1">+</span> Add Competitor
              </button>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Analysis Options</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    id="analyze-competitors"
                    type="checkbox"
                    className="h-4 w-4 text-primary"
                    checked={options.analyzeCompetitors}
                    onChange={() => handleOptionChange("analyzeCompetitors")}
                  />
                  <label
                    htmlFor="analyze-competitors"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Compare with competitors
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="detect-keywords"
                    type="checkbox"
                    className="h-4 w-4 text-primary"
                    checked={options.detectKeywords}
                    onChange={() => handleOptionChange("detectKeywords")}
                  />
                  <label
                    htmlFor="detect-keywords"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Detect relevant AI search keywords
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="content-gaps"
                    type="checkbox"
                    className="h-4 w-4 text-primary"
                    checked={options.contentGaps}
                    onChange={() => handleOptionChange("contentGaps")}
                  />
                  <label
                    htmlFor="content-gaps"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Identify content gaps
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="ai-query-simulation"
                    type="checkbox"
                    className="h-4 w-4 text-primary"
                    checked={options.aiQuerySimulation}
                    onChange={() => handleOptionChange("aiQuerySimulation")}
                  />
                  <label
                    htmlFor="ai-query-simulation"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Perform AI query simulation
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" className="btn btn-primary py-3 px-8">
                Start Analysis
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="card">
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold mb-6">
              Analyzing Your Content...
            </h2>
            <div className="max-w-md mx-auto mb-4">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-primary h-4 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-600">{progress}% complete</p>
            </div>

            <div className="space-y-4 mt-8 max-w-md mx-auto text-left">
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                    progress >= 20 ? "bg-green-500" : "bg-gray-200"
                  }`}
                >
                  {progress >= 20 && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </div>
                <span className="text-sm">Scanning content structure</span>
              </div>
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                    progress >= 40 ? "bg-green-500" : "bg-gray-200"
                  }`}
                >
                  {progress >= 40 && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </div>
                <span className="text-sm">
                  Analyzing natural language elements
                </span>
              </div>
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                    progress >= 60 ? "bg-green-500" : "bg-gray-200"
                  }`}
                >
                  {progress >= 60 && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </div>
                <span className="text-sm">
                  Identifying entity relationships
                </span>
              </div>
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                    progress >= 80 ? "bg-green-500" : "bg-gray-200"
                  }`}
                >
                  {progress >= 80 && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </div>
                <span className="text-sm">Simulating AI search queries</span>
              </div>
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                    progress >= 100 ? "bg-green-500" : "bg-gray-200"
                  }`}
                >
                  {progress >= 100 && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </div>
                <span className="text-sm">Generating recommendations</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzePage;
