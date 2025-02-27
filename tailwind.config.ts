import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#8a8181", // Light text
          100: "#5c5858", // Primary text
          300: "#7d140c", // Dark accent
          500: "#e2421b", // Alert accent
          700: "#fc9257", // Decoration accent
          900: "#fcdab8", // Very light background
          950: "#fff4e5", // Page background
        },
        accent: {
          300: "#d99276", // Light accent
          400: "#d0694e", // Medium accent
          500: "#b74735", // Main accent color (used in toast)
        },
      },
      spacing: {
        xs: "0.25rem", // 4px
        sm: "0.5rem", // 8px
        md: "1rem", // 16px
        lg: "1.5rem", // 24px
        xl: "2rem", // 32px
        "2xl": "3rem", // 48px
        "3xl": "4rem", // 64px
      },
    },
  },
  plugins: [],
} satisfies Config;
