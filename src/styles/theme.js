/**
 * Theme configuration file for AIVO
 *
 * This file exports theme variables that can be imported and used
 * throughout the application. To change the theme, modify the values here
 * or in colors.css - both should be kept in sync.
 */

export const theme = {
  colors: {
    // Primary Colors
    primary: "var(--color-primary)",
    primaryLight: "var(--color-primary-light)",
    primaryDark: "var(--color-primary-dark)",

    secondary: "var(--color-secondary)",
    secondaryLight: "var(--color-secondary-light)",
    secondaryDark: "var(--color-secondary-dark)",

    // Neutral Colors
    textPrimary: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    background: "var(--color-background)",
    white: "var(--color-white)",
    border: "var(--color-border)",

    // Accent Colors
    success: "var(--color-success)",
    successLight: "var(--color-success-light)",
    successDark: "var(--color-success-dark)",

    warning: "var(--color-warning)",
    warningLight: "var(--color-warning-light)",
    warningDark: "var(--color-warning-dark)",

    error: "var(--color-error)",
    errorLight: "var(--color-error-light)",
    errorDark: "var(--color-error-dark)",

    accent: "var(--color-accent)",
    accentLight: "var(--color-accent-light)",
    accentDark: "var(--color-accent-dark)",

    // Gray Scale
    gray: {
      50: "var(--color-gray-50)",
      100: "var(--color-gray-100)",
      200: "var(--color-gray-200)",
      300: "var(--color-gray-300)",
      400: "var(--color-gray-400)",
      500: "var(--color-gray-500)",
      600: "var(--color-gray-600)",
      700: "var(--color-gray-700)",
      800: "var(--color-gray-800)",
      900: "var(--color-gray-900)",
    },

    // Component-specific colors
    components: {
      cardBackground: "var(--color-card-background)",
      sidebarFrom: "var(--color-sidebar-from)",
      sidebarTo: "var(--color-sidebar-to)",
      buttonPrimaryBg: "var(--color-button-primary-bg)",
      buttonPrimaryText: "var(--color-button-primary-text)",
      buttonSecondaryBg: "var(--color-button-secondary-bg)",
      buttonSecondaryText: "var(--color-button-secondary-text)",
      buttonAccentBg: "var(--color-button-accent-bg)",
      buttonAccentText: "var(--color-button-accent-text)",
      inputBorder: "var(--color-input-border)",
      inputFocus: "var(--color-input-focus)",
      gradientFrom: "var(--color-gradient-from)",
      gradientTo: "var(--color-gradient-to)",
    },

    // Dark mode colors
    dark: {
      textPrimary: "var(--dark-color-text-primary)",
      textSecondary: "var(--dark-color-text-secondary)",
      background: "var(--dark-color-background)",
      white: "var(--dark-color-white)",
      border: "var(--dark-color-border)",
    },
  },

  // Typography
  fontFamily: {
    heading: '"Poppins", sans-serif',
    body: '"Inter", sans-serif',
  },

  // Border Radius
  borderRadius: {
    sm: "var(--border-radius-sm)",
    md: "var(--border-radius-md)",
    lg: "var(--border-radius-lg)",
    xl: "var(--border-radius-xl)",
    full: "var(--border-radius-full)",
  },

  // Shadows
  shadows: {
    sm: "var(--shadow-sm)",
    md: "var(--shadow-md)",
    lg: "var(--shadow-lg)",
  },

  // Spacing (can be used for padding/margin)
  spacing: {
    xs: "var(--spacing-xs)",
    sm: "var(--spacing-sm)",
    md: "var(--spacing-md)",
    lg: "var(--spacing-lg)",
    xl: "var(--spacing-xl)",
    xxl: "var(--spacing-xxl)",
  },

  // Helper function to get CSS variable value
  getCssVar: (varName) => {
    return getComputedStyle(document.documentElement).getPropertyValue(varName);
  },

  // Helper function to set CSS variable value
  setCssVar: (varName, value) => {
    document.documentElement.style.setProperty(varName, value);
  },
};

export default theme;
