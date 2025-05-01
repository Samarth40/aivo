/**
 * Theme configuration file for AIVO
 * 
 * This file exports theme variables that can be imported and used
 * throughout the application. To change the theme, modify the values here.
 */

export const theme = {
  colors: {
    // Primary Colors
    primary: 'var(--color-primary)',
    primaryLight: 'var(--color-primary-light)',
    primaryDark: 'var(--color-primary-dark)',
    
    secondary: 'var(--color-secondary)',
    secondaryLight: 'var(--color-secondary-light)',
    secondaryDark: 'var(--color-secondary-dark)',
    
    // Neutral Colors
    textPrimary: 'var(--color-text-primary)',
    textSecondary: 'var(--color-text-secondary)',
    background: 'var(--color-background)',
    white: 'var(--color-white)',
    border: 'var(--color-border)',
    
    // Accent Colors
    success: 'var(--color-success)',
    successLight: 'var(--color-success-light)',
    successDark: 'var(--color-success-dark)',
    
    warning: 'var(--color-warning)',
    warningLight: 'var(--color-warning-light)',
    warningDark: 'var(--color-warning-dark)',
    
    error: 'var(--color-error)',
    errorLight: 'var(--color-error-light)',
    errorDark: 'var(--color-error-dark)',
    
    accent: 'var(--color-accent)',
    accentLight: 'var(--color-accent-light)',
    accentDark: 'var(--color-accent-dark)',
  },
  
  // Typography
  fontFamily: {
    heading: '"Poppins", sans-serif',
    body: '"Inter", sans-serif',
  },
  
  // Border Radius
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
  },
  
  // Spacing (can be used for padding/margin)
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
};

export default theme;
