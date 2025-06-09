import React, { createContext, useContext, useCallback } from "react";
import useDataLoading from "./useDataLoading";

/**
 * Context for handling complex data operations with loading states
 */
const DataOperationContext = createContext();

export const useDataOperation = () => useContext(DataOperationContext);

/**
 * Provider component for centralized data operations with managed loading states
 */
export const DataOperationProvider = ({ children }) => {
  const { withLoading, withSequentialLoading, forceHideLoading, isInProgress } =
    useDataLoading();

  /**
   * Fetch data with managed loading state
   * @param {string} endpoint - The API endpoint to fetch from
   * @param {Object} options - Fetch options
   * @param {string} loadingMessage - Custom loading message
   * @param {number} minDuration - Minimum loading time in ms
   */
  const fetchWithLoading = useCallback(
    (
      endpoint,
      options = {},
      loadingMessage = "Fetching data...",
      minDuration = 2500
    ) => {
      return withLoading(
        async () => {
          try {
            const response = await fetch(endpoint, options);
            if (!response.ok) {
              throw new Error(
                `Network error: ${response.status} ${response.statusText}`
              );
            }
            return await response.json();
          } catch (error) {
            console.error("Fetch error:", error);
            throw error;
          }
        },
        loadingMessage,
        minDuration,
        (error) => {
          // Custom error handling for fetch operations
          console.error("Data fetch failed:", error);
          // You could add toast notifications or other error UI here
        }
      );
    },
    [withLoading]
  );

  /**
   * Submit form data with managed loading state
   * @param {string} endpoint - The API endpoint to submit to
   * @param {Object} formData - Form data to submit
   * @param {string} method - HTTP method
   * @param {string} loadingMessage - Custom loading message
   */
  const submitFormWithLoading = useCallback(
    (endpoint, formData, method = "POST", loadingMessage = "Submitting...") => {
      return withLoading(
        async () => {
          const options = {
            method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          };

          const response = await fetch(endpoint, options);
          if (!response.ok) {
            throw new Error(`Submission failed: ${response.status}`);
          }
          return await response.json();
        },
        loadingMessage,
        2800
      );
    },
    [withLoading]
  );

  /**
   * Process complex data operations in sequence with a single loading state
   * @param {Array} operations - Array of async functions to execute in sequence
   * @param {string} loadingMessage - Custom loading message
   */
  const processDataSequence = useCallback(
    (operations = [], loadingMessage = "Processing data...") => {
      return withSequentialLoading(operations, loadingMessage, 3000);
    },
    [withSequentialLoading]
  );

  /**
   * Export/download data with managed loading state
   * @param {Function} exportFn - Function that handles the export logic
   * @param {string} format - Export format (e.g., 'csv', 'pdf')
   */
  const exportDataWithLoading = useCallback(
    (exportFn, format = "csv") => {
      const formatMap = {
        csv: "Exporting CSV...",
        pdf: "Generating PDF...",
        excel: "Creating Excel file...",
        json: "Preparing JSON data...",
      };

      const message = formatMap[format.toLowerCase()] || "Exporting data...";

      return withLoading(exportFn, message, 3000);
    },
    [withLoading]
  );

  /**
   * Recovery function for handling broken loading states
   */
  const recoverFromLoadingErrors = useCallback(() => {
    forceHideLoading();
    // Potentially add cleanup or reset logic here
  }, [forceHideLoading]);

  return (
    <DataOperationContext.Provider
      value={{
        fetchWithLoading,
        submitFormWithLoading,
        processDataSequence,
        exportDataWithLoading,
        isLoadingOperation: isInProgress,
        recoverFromLoadingErrors,
        // Also expose the base functions for flexibility
        withLoading,
        withSequentialLoading,
      }}
    >
      {children}
    </DataOperationContext.Provider>
  );
};

export default DataOperationContext;
