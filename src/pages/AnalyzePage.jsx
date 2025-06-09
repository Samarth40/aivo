import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import useDataLoading from "../context/useDataLoading";

const AnalyzePage = () => {
  const { isDarkMode } = useTheme();
  const { withLoading } = useDataLoading();
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate API call to fetch data
  const fetchData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          products: [
            { id: 1, name: "Product A", score: 87 },
            { id: 2, name: "Product B", score: 65 },
            { id: 3, name: "Product C", score: 92 },
          ],
          recommendations: [
            "Optimize product titles for AI search",
            "Add more detailed product features",
            "Include usage scenarios in descriptions",
          ],
        });
      }, 2000); // Simulate 2 second API delay
    });
  };

  useEffect(() => {
    // Load data with loading screen when component mounts
    const loadData = async () => {
      const result = await withLoading(
        fetchData,
        "Analyzing your product data..."
      );
      setData(result);
      setIsLoaded(true);
    };

    loadData();
  }, [withLoading]);

  // Function to simulate running a new analysis
  const runNewAnalysis = async () => {
    // Use the withLoading hook to show loading screen during operation
    const result = await withLoading(
      async () => {
        // Simulate API call
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              products: [
                { id: 1, name: "Product A", score: 89 },
                { id: 2, name: "Product B", score: 72 },
                { id: 3, name: "Product C", score: 94 },
              ],
              recommendations: [
                "Implement semantic product descriptions",
                "Add more detailed specifications",
                "Enhance product images with AI-friendly metadata",
              ],
            });
          }, 3000); // Longer operation
        });
      },
      "Performing deep product analysis...",
      2000 // Minimum duration of 2 seconds
    );

    setData(result);
  };

  if (!isLoaded) {
    return null; // The loading is handled by the NavigationLoader
  }

  return (
    <div
      className={`min-h-screen py-10 px-4 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8">Product Analysis</h1>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div
              className={`p-6 rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <h2 className="text-xl font-semibold mb-4">
                AI Visibility Scores
              </h2>
              <div className="space-y-4">
                {data?.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between"
                  >
                    <span>{product.name}</span>
                    <div className="flex items-center">
                      <div className="w-48 h-3 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700 mr-3">
                        <div
                          className={`h-full ${
                            product.score > 85
                              ? "bg-green-500"
                              : product.score > 70
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${product.score}%` }}
                        />
                      </div>
                      <span className="font-medium">{product.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`p-6 rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <h2 className="text-xl font-semibold mb-4">
                AI Search Recommendations
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                {data?.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={runNewAnalysis}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
            >
              Run New Analysis
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyzePage;
