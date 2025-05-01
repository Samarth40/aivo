import React, { useState } from 'react';

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState(0);
  const [timeRange, setTimeRange] = useState('month');
  
  // Mock data for demonstration
  const reports = [
    {
      id: 1,
      date: 'Apr 25, 2025',
      title: 'Weekly AI Search Trend Report',
      summary: 'AI search systems now prioritize products with clear compatibility information and user testimonials.',
      insights: [
        {
          title: 'Comparative content is gaining importance',
          description: 'AI systems are now more likely to recommend products that clearly compare their features to competitors or previous models.',
          change: '+18%',
          impact: 'High',
        },
        {
          title: 'Technical specifications in structured format',
          description: 'Tabular or list-based specifications are more easily parsed by AI systems than paragraph format.',
          change: '+12%',
          impact: 'Medium',
        },
        {
          title: 'Use case scenarios improve visibility',
          description: 'Products with specific use case examples are ranked higher in AI recommendations.',
          change: '+24%',
          impact: 'High',
        },
      ],
      productPerformance: {
        score: 78,
        change: +2,
        metrics: {
          visibility: 78,
          entityRelations: 65,
          contentCompleteness: 82,
          queryMatch: 70,
        },
        queries: [
          {
            query: 'best noise cancelling headphones for travel',
            position: 4,
            change: 0,
          },
          {
            query: 'comfortable wireless headphones for work',
            position: 6,
            change: +1,
          },
          {
            query: 'headphones with best battery life',
            position: 'Not in top 10',
            change: 0,
          },
        ],
      },
    },
    {
      id: 2,
      date: 'Apr 18, 2025',
      title: 'Weekly AI Search Trend Report',
      summary: 'Real-world customer experiences are increasingly valued by AI recommendation systems.',
      insights: [
        {
          title: 'Customer testimonials boost credibility',
          description: 'Products with authentic customer testimonials are receiving higher visibility.',
          change: '+15%',
          impact: 'High',
        },
        {
          title: 'Video content improves engagement',
          description: 'AI systems can now better understand and evaluate video content.',
          change: '+20%',
          impact: 'Medium',
        },
        {
          title: 'Schema markup adoption increasing',
          description: 'Products with detailed schema.org markup are receiving priority.',
          change: '+10%',
          impact: 'High',
        },
      ],
      productPerformance: {
        score: 76,
        change: +3,
        metrics: {
          visibility: 76,
          entityRelations: 62,
          contentCompleteness: 81,
          queryMatch: 68,
        },
        queries: [
          {
            query: 'best noise cancelling headphones for travel',
            position: 4,
            change: +1,
          },
          {
            query: 'comfortable wireless headphones for work',
            position: 7,
            change: 0,
          },
          {
            query: 'headphones with best battery life',
            position: 'Not in top 10',
            change: 0,
          },
        ],
      },
    },
    {
      id: 3,
      date: 'Apr 11, 2025',
      title: 'Weekly AI Search Trend Report',
      summary: 'AI systems are increasingly evaluating products based on relationship to user needs.',
      insights: [
        {
          title: 'Problem-solution framing',
          description: 'Products that clearly state which problems they solve are receiving higher visibility.',
          change: '+22%',
          impact: 'High',
        },
        {
          title: 'Technical jargon decreasing in importance',
          description: 'Natural language descriptions are now preferred over technical jargon.',
          change: '-8%',
          impact: 'Medium',
        },
        {
          title: 'Mobile experience evaluation',
          description: 'AI systems are factoring in mobile experience when recommending products.',
          change: '+14%',
          impact: 'Medium',
        },
      ],
      productPerformance: {
        score: 73,
        change: -2,
        metrics: {
          visibility: 73,
          entityRelations: 60,
          contentCompleteness: 79,
          queryMatch: 66,
        },
        queries: [
          {
            query: 'best noise cancelling headphones for travel',
            position: 5,
            change: -1,
          },
          {
            query: 'comfortable wireless headphones for work',
            position: 7,
            change: -2,
          },
          {
            query: 'headphones with best battery life',
            position: 'Not in top 10',
            change: 0,
          },
        ],
      },
    },
  ];
  
  // Weekly trends for graphs
  const weeklyTrends = {
    dates: ['Mar 28', 'Apr 4', 'Apr 11', 'Apr 18', 'Apr 25'],
    visibility: [70, 75, 73, 76, 78],
    competitors: {
      'Sony WH-1000XM5': [88, 89, 90, 92, 92],
      'Bose QuietComfort': [80, 82, 83, 85, 86],
      'Apple AirPods Max': [78, 79, 80, 81, 82],
    },
    topQueries: [
      {
        name: 'noise cancelling headphones',
        values: [64, 68, 66, 70, 72],
      },
      {
        name: 'wireless headphones',
        values: [72, 74, 70, 74, 75],
      },
      {
        name: 'headphones for travel',
        values: [60, 62, 65, 67, 70],
      },
    ],
  };

  // Helper function to determine color based on change
  const getChangeColor = (change) => {
    if (typeof change === 'number') {
      if (change > 0) return 'text-green-600';
      if (change < 0) return 'text-red-600';
      return 'text-gray-600';
    }
    if (change.startsWith('+')) return 'text-green-600';
    if (change.startsWith('-')) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">AI Search Trend Reports</h1>
        <p className="text-gray-600">
          Weekly insights on how AI search systems are evolving and how your product visibility is changing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Reports List */}
        <div className="lg:col-span-1">
          <div className="card h-full">
            <h2 className="text-lg font-medium mb-4">Recent Reports</h2>
            <div className="space-y-4">
              {reports.map((report, index) => (
                <div 
                  key={report.id}
                  className={`p-4 rounded-lg cursor-pointer ${
                    selectedReport === index ? 'bg-primary bg-opacity-10 border-l-4 border-primary' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedReport(index)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{report.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{report.date}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      report.productPerformance.change > 0 
                        ? 'bg-green-100 text-green-800' 
                        : report.productPerformance.change < 0
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {report.productPerformance.change > 0 ? '+' : ''}{report.productPerformance.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="text-primary text-sm hover:underline">
                View All Reports
              </button>
            </div>
          </div>
        </div>

        {/* Report Details */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-medium">{reports[selectedReport].title}</h2>
                <p className="text-sm text-gray-600 mt-1">{reports[selectedReport].date}</p>
              </div>
              <button className="text-primary text-sm hover:underline">
                Download PDF
              </button>
            </div>

            <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <h3 className="font-medium text-blue-800 mb-1">Summary</h3>
              <p className="text-sm text-gray-700">{reports[selectedReport].summary}</p>
            </div>

            <div className="mb-8">
              <h3 className="font-medium mb-4">Key AI Search Trends This Week</h3>
              <div className="space-y-4">
                {reports[selectedReport].insights.map((insight, index) => (
                  <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gray-900">{insight.title}</h4>
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${getChangeColor(insight.change)}`}>
                          {insight.change}
                        </span>
                        <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-gray-100">
                          {insight.impact} Impact
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{insight.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Your Product Performance</h3>
              
              {/* Score Card */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">AI Visibility Score</h4>
                    <div className="flex items-center mt-1">
                      <span className="text-2xl font-bold">{reports[selectedReport].productPerformance.score}%</span>
                      <span className={`ml-2 text-sm ${getChangeColor(reports[selectedReport].productPerformance.change)}`}>
                        {reports[selectedReport].productPerformance.change > 0 ? '+' : ''}{reports[selectedReport].productPerformance.change}%
                      </span>
                    </div>
                  </div>
                  <div className="w-24 h-24 rounded-full bg-blue-50 border-8 border-blue-100 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">{reports[selectedReport].productPerformance.score}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  {Object.entries(reports[selectedReport].productPerformance.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-sm text-gray-600 mb-1">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                      <div className="font-semibold">{value}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Query Performance */}
              <h4 className="text-sm font-medium text-gray-700 mb-3">Performance for Top Queries</h4>
              <div className="space-y-3 mb-8">
                {reports[selectedReport].productPerformance.queries.map((queryData, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium">"{queryData.query}"</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-sm ${
                        queryData.position === 'Not in top 10' 
                          ? 'text-red-600'
                          : queryData.position <= 3
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      }`}>
                        {queryData.position}
                      </span>
                      <span className={`ml-3 text-sm ${getChangeColor(queryData.change)}`}>
                        {queryData.change > 0 ? '+' : ''}{queryData.change !== 0 ? queryData.change : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trend Charts */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-medium text-gray-700">Visibility Trend</h4>
                  <div className="flex space-x-2">
                    {['week', 'month', '3month'].map(range => (
                      <button
                        key={range}
                        className={`px-3 py-1 text-xs rounded-full ${
                          timeRange === range 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        onClick={() => setTimeRange(range)}
                      >
                        {range === 'week' ? 'Week' : range === 'month' ? 'Month' : '3 Months'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="h-64 relative">
                    {/* This is a placeholder for where a real chart would be */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-gray-500">Visibility trend chart will be displayed here</p>
                    </div>
                    
                    {/* Sample chart visualization with CSS */}
                    <div className="absolute bottom-0 left-0 right-0 h-40">
                      <div className="flex h-full items-end justify-between px-2">
                        {weeklyTrends.visibility.map((value, i) => (
                          <div key={i} className="w-1/5 px-1 flex flex-col items-center">
                            <div className="relative w-full">
                              <div 
                                className="absolute bottom-0 w-full bg-primary rounded-t"
                                style={{ height: `${value}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 mt-2">{weeklyTrends.dates[i]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 text-right">
              <button className="btn btn-secondary mr-2">Previous Report</button>
              <button className="btn btn-primary">Next Report</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;