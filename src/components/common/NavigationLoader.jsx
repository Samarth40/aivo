import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoading } from "../../context/LoadingContext";
import useDataLoading from "../../context/useDataLoading";
import LoadingPage from "../../pages/LoadingPage";

// List of routes that should have loading screens
const ROUTES_WITH_LOADING = [
  "/", // Added home page to show loading on initial site load
  "/dashboard",
  "/analyze",
  "/suggestions",
  "/comparison",
  "/reports",
  "/settings",
  "/features",
  "/pricing",
  "/integrations",
  "/login",
  "/register",
];

// Some routes may need custom loading messages
const CUSTOM_LOADING_MESSAGES = {
  "/": "Welcome to AIVO...",
  "/analyze": "Preparing analysis tools...",
  "/suggestions": "Generating suggestions...",
  "/comparison": "Loading comparison data...",
  "/reports": "Compiling reports...",
  "/login": "Preparing secure login...",
  "/register": "Setting up registration...",
};

// Routes that might need longer loading time (in ms) - INCREASED DURATIONS
const LOADING_DURATIONS = {
  "/": 3000, // Increased from 1500 to 3000
  "/dashboard": 2500, // Increased from 1200 to 2500
  "/analyze": 3500, // Increased from 2000 to 3500
  "/suggestions": 3000, // Increased from 1800 to 3000
  "/reports": 2800, // Increased from 1500 to 2800
  default: 2500, // Increased from 1000 to 2500
};

const NavigationLoader = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, loadingMessage } = useLoading();
  const { withLoading } = useDataLoading();
  const [initialLoad, setInitialLoad] = useState(true);
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(location.search)
  );

  // Handle initial app load
  useEffect(() => {
    if (initialLoad) {
      handleLoadingState(location);
      setInitialLoad(false);
    }
  }, [initialLoad]);

  // Handle URL search parameters changes
  useEffect(() => {
    const currentParams = new URLSearchParams(location.search);
    const paramsChanged = currentParams.toString() !== searchParams.toString();

    if (paramsChanged) {
      // If search parameters changed, trigger loading
      handleLoadingState(location);
      setSearchParams(currentParams);
    }
  }, [location.search]);

  // Handle route changes
  useEffect(() => {
    handleLoadingState(location);
  }, [location.pathname]);

  // Handle loading state for a location
  const handleLoadingState = async (location) => {
    const shouldShowLoading = ROUTES_WITH_LOADING.some((route) =>
      location.pathname.startsWith(route)
    );

    if (shouldShowLoading) {
      // Get custom message for this route if exists
      const message =
        CUSTOM_LOADING_MESSAGES[location.pathname] || "Loading...";

      // Get duration for this route if exists
      const duration =
        LOADING_DURATIONS[location.pathname] || LOADING_DURATIONS.default;

      // Use the withLoading hook to handle the route transition loading
      await withLoading(
        async () => {
          // Add a slight delay for better user experience
          await new Promise((resolve) => setTimeout(resolve, 300));
          return true;
        },
        message,
        duration
      );
    }
  };

  // Show loading page when loading state is true
  if (isLoading) {
    return <LoadingPage message={loadingMessage} />;
  }

  return <>{children}</>;
};

export default NavigationLoader;
