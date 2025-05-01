import React, { createContext, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Always use dark mode
  const isDarkMode = true;

  // Apply dark theme class when the component mounts
  useEffect(() => {
    document.documentElement.classList.add("dark-mode");

    // Save theme preference to localStorage
    localStorage.setItem("aivo-theme", "dark");
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => useContext(ThemeContext);
