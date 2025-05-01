/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000000",
      white: "#ffffff",
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
      blue: {
        700: "#1d4ed8",
      },
      green: {
        100: "#dcfce7",
        600: "#16a34a",
      },
      red: {
        100: "#fee2e2",
        600: "#dc2626",
      },
      yellow: {
        100: "#fef9c3",
        400: "#facc15",
        600: "#ca8a04",
      },
      purple: {
        100: "#f3e8ff",
        600: "#9333ea",
      },
      indigo: {
        100: "#e0e7ff",
        600: "#4f46e5",
      },
      primary: "#0056b3",
      secondary: "#6c757d",
      accent: "#17a2b8",
      "primary-dark": "#004494",
      "primary-light": "#3385d6",
    },
  },
  plugins: [],
};
