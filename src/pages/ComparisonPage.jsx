import React, { useState } from "react";

const ComparisonPage = () => {
  const [comparisonMode, setComparisonMode] = useState("visibility");

  // Mock data for demonstration
  const comparisonData = {
    yourProduct: {
      name: "Your Product",
      url: "https://example.com/products/wireless-headphones",
      visibility: 78,
      queryMatch: 65,
      contentCompleteness: 82,
      trends: [72, 74, 75, 78, 78, 78, 78],
      features: {
        "Noise Cancellation": true,
        Wireless: true,
        "Battery Life": "20 hours",
        "Quick Charge": true,
        "Water Resistant": false,
        "Multi-device Connection": false,
        "Voice Assistant": true,
        "Touch Controls": true,
        "Foldable Design": true,
        "Active EQ": false,
      },
      strengths: [
        "Detailed product specifications",
        "Clear pricing information",
        "High-quality images",
      ],
      weaknesses: [
        "Limited use case examples",
        "Missing comparison to previous models",
        "No customer testimonials",
        "Limited compatibility information",
      ],
    },
    competitors: [
      {
        name: "Sony WH-1000XM5",
        url: "https://sony.com/headphones/wh-1000xm5",
        visibility: 92,
        queryMatch: 88,
        contentCompleteness: 94,
        trends: [89, 90, 91, 91, 92, 92, 92],
        features: {
          "Noise Cancellation": true,
          Wireless: true,
          "Battery Life": "30 hours",
          "Quick Charge": true,
          "Water Resistant": true,
          "Multi-device Connection": true,
          "Voice Assistant": true,
          "Touch Controls": true,
          "Foldable Design": true,
          "Active EQ": true,
        },
        strengths: [
          "Extensive use case scenarios",
          "Interactive product tour",
          "Clear feature comparison with previous models",
          "Rich schema markup",
        ],
      },
      {
        name: "Bose QuietComfort",
        url: "https://bose.com/headphones/quietcomfort",
        visibility: 86,
        queryMatch: 78,
        contentCompleteness: 88,
        trends: [83, 84, 84, 85, 85, 86, 86],
        features: {
          "Noise Cancellation": true,
          Wireless: true,
          "Battery Life": "24 hours",
          "Quick Charge": true,
          "Water Resistant": true,
          "Multi-device Connection": true,
          "Voice Assistant": true,
          "Touch Controls": false,
          "Foldable Design": true,
          "Active EQ": true,
        },
        strengths: [
          "Detailed acoustic technology explanations",
          "Strong customer testimonials section",
          "Clear compatibility information",
        ],
      },
      {
        name: "Apple AirPods Max",
        url: "https://apple.com/airpods-max",
        visibility: 82,
        queryMatch: 70,
        contentCompleteness: 80,
        trends: [80, 80, 81, 81, 82, 82, 82],
        features: {
          "Noise Cancellation": true,
          Wireless: true,
          "Battery Life": "20 hours",
          "Quick Charge": false,
          "Water Resistant": false,
          "Multi-device Connection": false,
          "Voice Assistant": true,
          "Touch Controls": false,
          "Foldable Design": false,
          "Active EQ": true,
        },
        strengths: [
          "Integration with ecosystem",
          "Premium design emphasis",
          "Strong brand positioning",
          "Clear feature explanations",
        ],
      },
    ],
  };

  // Calculate average for competitors to use in comparisons
  const calculateCompetitorAverage = (metric) => {
    const sum = comparisonData.competitors.reduce(
      (acc, comp) => acc + comp[metric],
      0
    );
    return Math.round(sum / comparisonData.competitors.length);
  };

  const competitorAvg = {
    visibility: calculateCompetitorAverage("visibility"),
    queryMatch: calculateCompetitorAverage("queryMatch"),
    contentCompleteness: calculateCompetitorAverage("contentCompleteness"),
  };

  // Helper function to determine the status color based on value comparison
  const getStatusColor = (yourValue, competitorValue) => {
    const diff = yourValue - competitorValue;
    if (diff >= 5) return "text-green-600";
    if (diff <= -5) return "text-red-600";
    return "text-yellow-600";
  };

  // Helper function to determine feature comparison status
  const getFeatureStatus = (feature, competitorHasFeature) => {
    if (comparisonData.yourProduct.features[feature] === competitorHasFeature) {
      return "text-gray-600"; // Same status (both have or both don't have)
    } else if (
      comparisonData.yourProduct.features[feature] &&
      !competitorHasFeature
    ) {
      return "text-green-600"; // You have it, competitor doesn't
    } else {
      return "text-red-600"; // Competitor has it, you don't
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Competitor Comparison</h1>
        <p className="text-gray-600">
          See how your product stacks up against competitors in AI search
          visibility
        </p>
      </div>

      {/* Comparison Mode Selection */}
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-3 px-6 ${
              comparisonMode === "visibility"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setComparisonMode("visibility")}
          >
            Visibility Metrics
          </button>
          <button
            className={`py-3 px-6 ${
              comparisonMode === "features"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setComparisonMode("features")}
          >
            Feature Comparison
          </button>
          <button
            className={`py-3 px-6 ${
              comparisonMode === "strengths"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setComparisonMode("strengths")}
          >
            Strengths & Weaknesses
          </button>
        </div>
      </div>

      {/* Visibility Metrics Comparison */}
      {comparisonMode === "visibility" && (
        <div className="space-y-8">
          {/* Overall Visibility Score */}
          <div className="card">
            <h2 className="text-lg font-medium mb-6">
              Overall AI Visibility Score
            </h2>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-2/3 pr-0 lg:pr-8">
                <div className="space-y-6">
                  {/* Your Product */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        Your Product
                      </span>
                      <span className="text-sm font-medium">
                        {comparisonData.yourProduct.visibility}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{
                          width: `${comparisonData.yourProduct.visibility}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Competitors */}
                  {comparisonData.competitors.map((competitor, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {competitor.name}
                        </span>
                        <span className="text-sm font-medium">
                          {competitor.visibility}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-gray-600 h-2.5 rounded-full"
                          style={{ width: `${competitor.visibility}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}

                  {/* Average */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        Competitor Average
                      </span>
                      <span className="text-sm font-medium">
                        {competitorAvg.visibility}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-yellow-500 h-2.5 rounded-full"
                        style={{ width: `${competitorAvg.visibility}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
                <div className="card bg-gray-50 h-full">
                  <h3 className="font-medium mb-2">Analysis</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Your visibility score is{" "}
                    <span
                      className={getStatusColor(
                        comparisonData.yourProduct.visibility,
                        competitorAvg.visibility
                      )}
                    >
                      {comparisonData.yourProduct.visibility <
                      competitorAvg.visibility
                        ? "lower than"
                        : comparisonData.yourProduct.visibility >
                          competitorAvg.visibility
                        ? "higher than"
                        : "equal to"}{" "}
                      the competitor average
                    </span>
                    .
                  </p>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Recommendations:</h4>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                      <li>
                        Implement structured data for better AI comprehension
                      </li>
                      <li>Add more specific use case examples</li>
                      <li>Include comparative information with competitors</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="card">
            <h2 className="text-lg font-medium mb-6">Detailed Metrics</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      AI Query Match
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Content Completeness
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Overall Score
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Your Product */}
                  <tr className="bg-blue-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {comparisonData.yourProduct.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        {comparisonData.yourProduct.queryMatch}%
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{
                            width: `${comparisonData.yourProduct.queryMatch}%`,
                          }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        {comparisonData.yourProduct.contentCompleteness}%
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{
                            width: `${comparisonData.yourProduct.contentCompleteness}%`,
                          }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        {comparisonData.yourProduct.visibility}%
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{
                            width: `${comparisonData.yourProduct.visibility}%`,
                          }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center h-6">
                        {comparisonData.yourProduct.trends.map((point, i) => (
                          <div
                            key={i}
                            className="relative flex items-end h-full"
                          >
                            <div
                              className="w-3 bg-primary mx-0.5 rounded-t"
                              style={{ height: `${point * 0.6}%` }}
                            ></div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>

                  {/* Competitors */}
                  {comparisonData.competitors.map((competitor, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {competitor.name}
                        </div>
                        <div className="text-xs text-gray-500 truncate max-w-xs">
                          {competitor.url}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{competitor.queryMatch}%</div>
                        <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-gray-600 h-1.5 rounded-full"
                            style={{ width: `${competitor.queryMatch}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          {competitor.contentCompleteness}%
                        </div>
                        <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-gray-600 h-1.5 rounded-full"
                            style={{
                              width: `${competitor.contentCompleteness}%`,
                            }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{competitor.visibility}%</div>
                        <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-gray-600 h-1.5 rounded-full"
                            style={{ width: `${competitor.visibility}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center h-6">
                          {competitor.trends.map((point, i) => (
                            <div
                              key={i}
                              className="relative flex items-end h-full"
                            >
                              <div
                                className="w-3 bg-gray-600 mx-0.5 rounded-t"
                                style={{ height: `${point * 0.6}%` }}
                              ></div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* Average */}
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        Competitor Average
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{competitorAvg.queryMatch}%</div>
                      <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-yellow-500 h-1.5 rounded-full"
                          style={{ width: `${competitorAvg.queryMatch}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        {competitorAvg.contentCompleteness}%
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-yellow-500 h-1.5 rounded-full"
                          style={{
                            width: `${competitorAvg.contentCompleteness}%`,
                          }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{competitorAvg.visibility}%</div>
                      <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-yellow-500 h-1.5 rounded-full"
                          style={{ width: `${competitorAvg.visibility}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* No trend for average */}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Feature Comparison */}
      {comparisonMode === "features" && (
        <div className="card">
          <h2 className="text-lg font-medium mb-6">
            Feature Coverage Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Feature
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Your Product
                  </th>
                  {comparisonData.competitors.map((competitor, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {competitor.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(comparisonData.yourProduct.features).map(
                  ([feature, value], index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {feature}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                        {typeof value === "boolean" ? (
                          value ? (
                            <span className="text-green-600">✓</span>
                          ) : (
                            <span className="text-red-600">✕</span>
                          )
                        ) : (
                          value
                        )}
                      </td>
                      {comparisonData.competitors.map(
                        (competitor, compIndex) => {
                          const compValue = competitor.features[feature];
                          return (
                            <td
                              key={compIndex}
                              className="px-6 py-3 whitespace-nowrap text-sm"
                            >
                              <span
                                className={getFeatureStatus(feature, compValue)}
                              >
                                {typeof compValue === "boolean"
                                  ? compValue
                                    ? "✓"
                                    : "✕"
                                  : compValue}
                              </span>
                            </td>
                          );
                        }
                      )}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Feature Comparison Analysis</h3>
            <p className="text-sm text-gray-600 mb-4">
              Your product is missing the following features that competitors
              prominently highlight:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>
                Water Resistance - 2 out of 3 competitors have this feature
              </li>
              <li>
                Multi-device Connection - 2 out of 3 competitors have this
                feature
              </li>
              <li>Active EQ - 2 out of 3 competitors have this feature</li>
            </ul>
          </div>
        </div>
      )}

      {/* Strengths & Weaknesses */}
      {comparisonMode === "strengths" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Your Product */}
          <div className="card">
            <h2 className="text-lg font-medium mb-4">Your Product</h2>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-green-700 mb-2">
                Strengths
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                {comparisonData.yourProduct.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-700 mb-2">
                Areas for Improvement
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                {comparisonData.yourProduct.weaknesses.map(
                  (weakness, index) => (
                    <li key={index}>{weakness}</li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Competitors */}
          <div className="space-y-6">
            {comparisonData.competitors.map((competitor, index) => (
              <div key={index} className="card">
                <h2 className="text-lg font-medium mb-4">{competitor.name}</h2>
                <div>
                  <h3 className="text-sm font-medium text-blue-700 mb-2">
                    Competitive Advantages
                  </h3>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    {competitor.strengths.map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="card col-span-1 lg:col-span-2">
            <h2 className="text-lg font-medium mb-4">
              Strategic Recommendations
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Based on competitive analysis, here are key improvements to
              consider:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2">
                  Add Use Case Examples
                </h3>
                <p className="text-sm text-gray-600">
                  Follow Sony's approach of showing specific scenarios where
                  your headphones excel.
                </p>
              </div>
              <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2">
                  Include Customer Testimonials
                </h3>
                <p className="text-sm text-gray-600">
                  Bose effectively uses customer quotes to build trust and
                  demonstrate real-world benefits.
                </p>
              </div>
              <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2">
                  Add Compatibility Information
                </h3>
                <p className="text-sm text-gray-600">
                  Clearly list all compatible devices and systems like your
                  competitors do.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonPage;
