import React, { createContext, useState, useContext, useCallback } from "react";
import { useLoading } from "./LoadingContext";
import useDataLoading from "./useDataLoading";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResultsInline, setShowResultsInline] = useState(true);
  const { hideLoading } = useLoading();
  const { withLoading } = useDataLoading();

  // Simulate search with loading screen - enhanced with useDataLoading
  const performSearch = useCallback(
    async (query) => {
      if (!query || query.trim() === "") return;

      // Update search query state
      setSearchQuery(query);
      setIsSearching(true);

      try {
        // Use withLoading to wrap the search functionality
        const results = await withLoading(
          async () => {
            // Simulate search delay - moved inside the wrapped function
            await new Promise((resolve) => setTimeout(resolve, 4000));

            // Simulate search results based on query
            return [
              {
                id: 1,
                title: "AI Product Optimization",
                description:
                  "Learn how to optimize your product listings for AI search",
                url: "/analyze",
              },
              {
                id: 2,
                title: "Marketing Performance",
                description:
                  "Analyze your marketing performance with AI insights",
                url: "/dashboard",
              },
              {
                id: 3,
                title: "Product Recommendations",
                description: "Get AI-powered suggestions for your products",
                url: "/suggestions",
              },
              {
                id: 4,
                title: "Performance Reports",
                description: "View detailed AI performance analytics",
                url: "/reports",
              },
            ].filter(
              (item) =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase())
            );
          },
          "Searching across AIVO...",
          3000 // Increased minimum loading duration for better UX (changed from 1500ms to 3000ms)
        );

        setSearchResults(results);
        return results;
      } finally {
        setIsSearching(false);
      }
    },
    [withLoading]
  );

  // Function to toggle between inline results
  const toggleResultsDisplay = useCallback((showInline = true) => {
    setShowResultsInline(showInline);
  }, []);

  // Clear search state
  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        searchResults,
        isSearching,
        performSearch,
        clearSearch,
        showResultsInline,
        toggleResultsDisplay,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
