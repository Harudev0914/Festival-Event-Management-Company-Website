/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0B",
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#8B5CF6",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#1F1F23",
          foreground: "#A1A1AA",
        },
        accent: {
          DEFAULT: "#D946EF",
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
        display: ["Giants", "sans-serif"],
      },
    },
  },
  plugins: [],
}
