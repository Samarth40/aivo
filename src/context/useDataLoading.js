import { useCallback, useRef } from "react";
import { useLoading } from "./LoadingContext";

/**
 * A utility hook for components to trigger loading screens during data operations
 * with enhanced error handling and queuing capabilities
 */
const useDataLoading = () => {
  const { showLoading, hideLoading } = useLoading();
  const operationQueue = useRef([]);
  const isLoadingRef = useRef(false);

  /**
   * Wraps an async function with loading state
   * @param {Function} asyncFn - The async function to execute
   * @param {string} message - Custom loading message
   * @param {number} minDuration - Minimum loading time in ms
   * @param {Function} onError - Optional error handler callback
   * @returns {Promise<any>} - The result of the async function
   */
  const withLoading = useCallback(
    async (
      asyncFn,
      message = "Processing data...",
      minDuration = 800,
      onError = null
    ) => {
      // Show loading indicator
      showLoading(message);
      isLoadingRef.current = true;

      // Add to operation queue for tracking
      const operationId = Date.now().toString();
      operationQueue.current.push(operationId);

      const startTime = Date.now();

      try {
        // Execute the async function
        const result = await asyncFn();

        // Ensure minimum loading time for better UX
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < minDuration) {
          await new Promise((resolve) =>
            setTimeout(resolve, minDuration - elapsedTime)
          );
        }

        return result;
      } catch (error) {
        // Handle errors with custom handler or rethrow
        if (onError && typeof onError === "function") {
          onError(error);
        } else {
          console.error("Error during loading operation:", error);
          throw error;
        }
      } finally {
        // Remove from queue
        operationQueue.current = operationQueue.current.filter(
          (id) => id !== operationId
        );

        // Only hide loading if this is the last operation
        if (operationQueue.current.length === 0) {
          hideLoading();
          isLoadingRef.current = false;
        }
      }
    },
    [showLoading, hideLoading]
  );

  /**
   * Executes multiple async functions in sequence with a single loading state
   * @param {Array<Function>} asyncFunctions - Array of async functions to execute
   * @param {string} message - Custom loading message
   * @param {number} minDuration - Minimum loading time in ms
   * @returns {Promise<Array>} - Array of results from all async functions
   */
  const withSequentialLoading = useCallback(
    async (
      asyncFunctions = [],
      message = "Processing data...",
      minDuration = 800
    ) => {
      if (!Array.isArray(asyncFunctions) || asyncFunctions.length === 0) {
        return [];
      }

      return withLoading(
        async () => {
          const results = [];
          for (const fn of asyncFunctions) {
            if (typeof fn === "function") {
              const result = await fn();
              results.push(result);
            }
          }
          return results;
        },
        message,
        minDuration
      );
    },
    [withLoading]
  );

  /**
   * Forces hiding the loading state regardless of queue
   * Use with caution - only in error recovery scenarios
   */
  const forceHideLoading = useCallback(() => {
    operationQueue.current = [];
    hideLoading();
    isLoadingRef.current = false;
  }, [hideLoading]);

  return {
    withLoading,
    withSequentialLoading,
    forceHideLoading,
    isInProgress: () => isLoadingRef.current,
  };
};

export default useDataLoading;
