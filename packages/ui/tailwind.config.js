/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#0A0A0B", // Deep charcoal black
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#8B5CF6", // Electric Violet
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#1F1F23", // Dark gray surface
          foreground: "#A1A1AA",
        },
        accent: {
          DEFAULT: "#D946EF", // Fuchsia neon
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#27272A",
          foreground: "#71717A",
        },
        border: "#27272A",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Giants", "sans-serif"], // Updated to Giants
      },
    },
  },
  plugins: [],
}
