import React, { useState } from "react";
import '../styles/components/ComparisonPage.css';

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
    if (diff >= 5) return "feature-status-positive";
    if (diff <= -5) return "feature-status-negative";
    return "text-yellow-600";
  };

  // Helper function to determine feature comparison status
  const getFeatureStatus = (feature, competitorHasFeature) => {
    if (comparisonData.yourProduct.features[feature] === competitorHasFeature) {
      return "feature-status-neutral"; // Same status (both have or both don't have)
    } else if (
      comparisonData.yourProduct.features[feature] &&
      !competitorHasFeature
    ) {
      return "feature-status-positive"; // You have it, competitor doesn't
    } else {
      return "feature-status-negative"; // Competitor has it, you don't
    }
  };

  return (
    <div className="comparison-page-container">
      <div className="comparison-page-header">
        <h1 className="comparison-page-title">Competitor Comparison</h1>
        <p className="comparison-page-description">
          See how your product stacks up against competitors in AI search
          visibility
        </p>
      </div>

      {/* Comparison Mode Selection */}
      <div className="comparison-tab-nav">
        <button
          className={`comparison-tab-button ${
            comparisonMode === "visibility" ? "active" : ""
          }`}
          onClick={() => setComparisonMode("visibility")}
        >
          Visibility Metrics
        </button>
        <button
          className={`comparison-tab-button ${
            comparisonMode === "features" ? "active" : ""
          }`}
          onClick={() => setComparisonMode("features")}
        >
          Feature Comparison
        </button>
        <button
          className={`comparison-tab-button ${
            comparisonMode === "strengths" ? "active" : ""
          }`}
          onClick={() => setComparisonMode("strengths")}
        >
          Strengths & Weaknesses
        </button>
      </div>

      {/* Visibility Metrics Comparison */}
      {comparisonMode === "visibility" && (
        <div className="space-y-8">
          {/* Overall Visibility Score */}
          <div className="card">
            <h2 className="text-lg font-medium mb-6">
              Overall AI Visibility Score
            </h2>
            <div className="metric-grid">
              <div className="metric-chart-container">
                <div className="space-y-6">
                  {/* Your Product */}
                  <div className="metric-item">
                    <div className="metric-header">
                      <span className="metric-label">
                        Your Product
                      </span>
                      <span className="metric-value">
                        {comparisonData.yourProduct.visibility}%
                      </span>
                    </div>
                    <div className="metric-bar">
                      <div
                        className="metric-bar-fill metric-primary"
                        style={{
                          width: `${comparisonData.yourProduct.visibility}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Competitors */}
                  {comparisonData.competitors.map((competitor, index) => (
                    <div className="metric-item" key={index}>
                      <div className="metric-header">
                        <span className="metric-label">
                          {competitor.name}
                        </span>
                        <span className="metric-value">
                          {competitor.visibility}%
                        </span>
                      </div>
                      <div className="metric-bar">
                        <div
                          className="metric-bar-fill metric-competitor"
                          style={{ width: `${competitor.visibility}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}

                  {/* Average */}
                  <div className="metric-item">
                    <div className="metric-header">
                      <span className="metric-label">
                        Competitor Average
                      </span>
                      <span className="metric-value">
                        {competitorAvg.visibility}%
                      </span>
                    </div>
                    <div className="metric-bar">
                      <div
                        className="metric-bar-fill metric-average"
                        style={{ width: `${competitorAvg.visibility}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="metric-analysis-container">
                <div className="analysis-card">
                  <h3 className="analysis-title">Analysis</h3>
                  <p className="analysis-text">
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
                  <div>
                    <h4 className="recommendations-title">Recommendations:</h4>
                    <ul className="recommendations-list">
                      <li className="recommendation-item">
                        Implement structured data for better AI comprehension
                      </li>
                      <li className="recommendation-item">Add more specific use case examples</li>
                      <li className="recommendation-item">Include comparative information with competitors</li>
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
              <table className="comparison-table">
                <thead className="comparison-table-header">
                  <tr>
                    <th className="comparison-table-header-cell">
                      Product
                    </th>
                    <th className="comparison-table-header-cell">
                      AI Query Match
                    </th>
                    <th className="comparison-table-header-cell">
                      Content Completeness
                    </th>
                    <th className="comparison-table-header-cell">
                      Overall Score
                    </th>
                    <th className="comparison-table-header-cell">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="comparison-table-body">
                  {/* Your Product */}
                  <tr className="comparison-table-row comparison-table-row-highlight">
                    <td className="comparison-table-cell">
                      <div className="comparison-table-cell-title">
                        {comparisonData.yourProduct.name}
                      </div>
                    </td>
                    <td className="comparison-table-cell">
                      <div className="text-sm">
                        {comparisonData.yourProduct.queryMatch}%
                      </div>
                      <div className="metric-bar-chart">
                        <div
                          className="metric-bar-fill metric-primary"
                          style={{
                            width: `${comparisonData.yourProduct.queryMatch}%`,
                          }}
                        ></div>
                      </div>
                    </td>
                    <td className="comparison-table-cell">
                      <div className="text-sm">
                        {comparisonData.yourProduct.contentCompleteness}%
                      </div>
                      <div className="metric-bar-chart">
                        <div
                          className="metric-bar-fill metric-primary"
                          style={{
                            width: `${comparisonData.yourProduct.contentCompleteness}%`,
                          }}
                        ></div>
                      </div>
                    </td>
                    <td className="comparison-table-cell">
                      <div className="text-sm">
                        {comparisonData.yourProduct.visibility}%
                      </div>
                      <div className="metric-bar-chart">
                        <div
                          className="metric-bar-fill metric-primary"
                          style={{
                            width: `${comparisonData.yourProduct.visibility}%`,
                          }}
                        ></div>
                      </div>
                    </td>
                    <td className="comparison-table-cell">
                      <div className="trend-chart">
                        {comparisonData.yourProduct.trends.map((point, i) => (
                          <div
                            key={i}
                            className="trend-bar bg-primary"
                            style={{ height: `${point * 0.6}%` }}
                          ></div>
                        ))}
                      </div>
                    </td>
                  </tr>

                  {/* Competitors */}
                  {comparisonData.competitors.map((competitor, index) => (
                    <tr key={index} className="comparison-table-row">
                      <td className="comparison-table-cell">
                        <div className="comparison-table-cell-title">
                          {competitor.name}
                        </div>
                        <div className="comparison-table-cell-url">
                          {competitor.url}
                        </div>
                      </td>
                      <td className="comparison-table-cell">
                        <div className="text-sm">{competitor.queryMatch}%</div>
                        <div className="metric-bar-chart">
                          <div
                            className="metric-bar-fill metric-competitor"
                            style={{ width: `${competitor.queryMatch}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="comparison-table-cell">
                        <div className="text-sm">
                          {competitor.contentCompleteness}%
                        </div>
                        <div className="metric-bar-chart">
                          <div
                            className="metric-bar-fill metric-competitor"
                            style={{
                              width: `${competitor.contentCompleteness}%`,
                            }}
                          ></div>
                        </div>
                      </td>
                      <td className="comparison-table-cell">
                        <div className="text-sm">{competitor.visibility}%</div>
                        <div className="metric-bar-chart">
                          <div
                            className="metric-bar-fill metric-competitor"
                            style={{ width: `${competitor.visibility}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="comparison-table-cell">
                        <div className="trend-chart">
                          {competitor.trends.map((point, i) => (
                            <div
                              key={i}
                              className="trend-bar bg-gray-600"
                              style={{ height: `${point * 0.6}%` }}
                            ></div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* Average */}
                  <tr className="comparison-table-row bg-gray-50">
                    <td className="comparison-table-cell">
                      <div className="comparison-table-cell-title">
                        Competitor Average
                      </div>
                    </td>
                    <td className="comparison-table-cell">
                      <div className="text-sm">{competitorAvg.queryMatch}%</div>
                      <div className="metric-bar-chart">
                        <div
                          className="metric-bar-fill metric-average"
                          style={{ width: `${competitorAvg.queryMatch}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="comparison-table-cell">
                      <div className="text-sm">
                        {competitorAvg.contentCompleteness}%
                      </div>
                      <div className="metric-bar-chart">
                        <div
                          className="metric-bar-fill metric-average"
                          style={{
                            width: `${competitorAvg.contentCompleteness}%`,
                          }}
                        ></div>
                      </div>
                    </td>
                    <td className="comparison-table-cell">
                      <div className="text-sm">{competitorAvg.visibility}%</div>
                      <div className="metric-bar-chart">
                        <div
                          className="metric-bar-fill metric-average"
                          style={{ width: `${competitorAvg.visibility}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="comparison-table-cell">
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
            <table className="comparison-table">
              <thead className="comparison-table-header">
                <tr>
                  <th className="comparison-table-header-cell">
                    Feature
                  </th>
                  <th className="comparison-table-header-cell">
                    Your Product
                  </th>
                  {comparisonData.competitors.map((competitor, index) => (
                    <th
                      key={index}
                      className="comparison-table-header-cell"
                    >
                      {competitor.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="comparison-table-body">
                {Object.entries(comparisonData.yourProduct.features).map(
                  ([feature, value], index) => (
                    <tr
                      key={index}
                      className={`comparison-table-row ${
                        index % 2 === 0 ? "" : "bg-gray-50"
                      }`}
                    >
                      <td className="comparison-table-cell comparison-table-cell-title">
                        {feature}
                      </td>
                      <td className="comparison-table-cell">
                        {typeof value === "boolean" ? (
                          value ? (
                            <span className="feature-status-positive">✓</span>
                          ) : (
                            <span className="feature-status-negative">✕</span>
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
                              className="comparison-table-cell"
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
          <div className="feature-analysis">
            <h3 className="analysis-title">Feature Comparison Analysis</h3>
            <p className="analysis-text">
              Your product is missing the following features that competitors
              prominently highlight:
            </p>
            <ul className="recommendations-list">
              <li className="recommendation-item">
                Water Resistance - 2 out of 3 competitors have this feature
              </li>
              <li className="recommendation-item">
                Multi-device Connection - 2 out of 3 competitors have this
                feature
              </li>
              <li className="recommendation-item">Active EQ - 2 out of 3 competitors have this feature</li>
            </ul>
          </div>
        </div>
      )}

      {/* Strengths & Weaknesses */}
      {comparisonMode === "strengths" && (
        <div className="strengths-weaknesses-grid">
          {/* Your Product */}
          <div className="card">
            <h2 className="text-lg font-medium mb-4">Your Product</h2>
            <div className="mb-4">
              <h3 className="strengths-section-title strengths-title">
                Strengths
              </h3>
              <ul className="strengths-weaknesses-list">
                {comparisonData.yourProduct.strengths.map((strength, index) => (
                  <li key={index} className="strengths-weaknesses-item">{strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="strengths-section-title weaknesses-title">
                Areas for Improvement
              </h3>
              <ul className="strengths-weaknesses-list">
                {comparisonData.yourProduct.weaknesses.map(
                  (weakness, index) => (
                    <li key={index} className="strengths-weaknesses-item">{weakness}</li>
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
                  <h3 className="strengths-section-title competitor-advantages-title">
                    Competitive Advantages
                  </h3>
                  <ul className="strengths-weaknesses-list">
                    {competitor.strengths.map((strength, i) => (
                      <li key={i} className="strengths-weaknesses-item">{strength}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="card strengths-weaknesses-full-width">
            <h2 className="text-lg font-medium mb-4">
              Strategic Recommendations
            </h2>
            <p className="analysis-text">
              Based on competitive analysis, here are key improvements to
              consider:
            </p>
            <div className="recommendations-grid">
              <div className="recommendation-card">
                <h3 className="recommendation-card-title">
                  Add Use Case Examples
                </h3>
                <p className="text-sm text-gray-600">
                  Follow Sony's approach of showing specific scenarios where
                  your headphones excel.
                </p>
              </div>
              <div className="recommendation-card">
                <h3 className="recommendation-card-title">
                  Include Customer Testimonials
                </h3>
                <p className="text-sm text-gray-600">
                  Bose effectively uses customer quotes to build trust and
                  demonstrate real-world benefits.
                </p>
              </div>
              <div className="recommendation-card">
                <h3 className="recommendation-card-title">
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
