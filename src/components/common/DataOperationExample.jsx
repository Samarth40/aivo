import React, { useState, useEffect } from "react";
import { useDataOperation } from "../../context/DataOperationContext";

/**
 * Example component that demonstrates the enhanced loading workflow
 */
const DataOperationExample = () => {
  const [userData, setUserData] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [exportStatus, setExportStatus] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("");

  const {
    fetchWithLoading,
    submitFormWithLoading,
    processDataSequence,
    exportDataWithLoading,
  } = useDataOperation();

  // Example of using fetchWithLoading
  const loadUserData = async () => {
    try {
      // This will automatically show a loading screen while fetching data
      const data = await fetchWithLoading(
        "https://api.example.com/users/profile",
        {},
        "Loading your profile...",
        1200
      );
      setUserData(data);
    } catch (error) {
      console.error("Failed to load user data", error);
    }
  };

  // Example of using sequential operations with a single loading screen
  const loadDashboardData = async () => {
    try {
      // This will execute all operations with a single loading screen
      const results = await processDataSequence(
        [
          // First operation - load user data
          async () => {
            const response = await fetch(
              "https://api.example.com/users/profile"
            );
            return response.json();
          },
          // Second operation - load analytics data
          async () => {
            const response = await fetch("https://api.example.com/analytics");
            return response.json();
          },
        ],
        "Preparing your dashboard..."
      );

      // Process results - they're returned in order
      if (results.length >= 2) {
        setUserData(results[0]);
        setAnalyticsData(results[1]);
      }
    } catch (error) {
      console.error("Failed to load dashboard data", error);
    }
  };

  // Example of form submission with loading
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      message: event.target.message.value,
    };

    try {
      const response = await submitFormWithLoading(
        "https://api.example.com/contact",
        formData,
        "POST",
        "Sending your message..."
      );

      setSubmissionStatus("Message sent successfully!");

      // Reset after 3 seconds
      setTimeout(() => setSubmissionStatus(""), 3000);
    } catch (error) {
      setSubmissionStatus("Failed to send message. Please try again.");
    }
  };

  // Example of data export with loading
  const handleExport = async (format) => {
    try {
      await exportDataWithLoading(async () => {
        // Simulate export logic
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // In a real app, this would generate and download a file
        console.log(`Exporting data in ${format} format`);

        return true;
      }, format);

      setExportStatus(`Data exported successfully as ${format.toUpperCase()}`);

      // Reset after 3 seconds
      setTimeout(() => setExportStatus(""), 3000);
    } catch (error) {
      setExportStatus("Export failed. Please try again.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-3xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Data Operation Examples
      </h2>

      <div className="space-y-8">
        {/* Data Loading Example */}
        <section className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
            Data Fetching
          </h3>

          <div className="flex space-x-4">
            <button
              onClick={loadUserData}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
            >
              Load User Data
            </button>

            <button
              onClick={loadDashboardData}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
            >
              Load Dashboard
            </button>
          </div>

          {userData && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
              <p className="text-gray-800 dark:text-gray-200">
                User data loaded successfully!
              </p>
            </div>
          )}

          {analyticsData && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
              <p className="text-gray-800 dark:text-gray-200">
                Analytics data loaded successfully!
              </p>
            </div>
          )}
        </section>

        {/* Form Submission Example */}
        <section className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
            Form Submission
          </h3>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Submit Form
            </button>
          </form>

          {submissionStatus && (
            <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 rounded-md">
              <p className="text-green-800 dark:text-green-200">
                {submissionStatus}
              </p>
            </div>
          )}
        </section>

        {/* Data Export Example */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
            Data Export
          </h3>

          <div className="flex space-x-4">
            <button
              onClick={() => handleExport("csv")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Export CSV
            </button>

            <button
              onClick={() => handleExport("pdf")}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Export PDF
            </button>

            <button
              onClick={() => handleExport("excel")}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Export Excel
            </button>
          </div>

          {exportStatus && (
            <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900 rounded-md">
              <p className="text-blue-800 dark:text-blue-200">{exportStatus}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DataOperationExample;
