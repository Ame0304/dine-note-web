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
          50: "#E1E8EF",
          100: "#1a0002",
          200: "#4b0706",
          300: "#7d140c",
          400: "#b02813",
          500: "#e2421b",
          600: "#fb672c",
          700: "#fc9257",
          800: "#fcba88",
          900: "#fcdab8",
          950: "#fff4e5",
        },
        accent: {
          50: "#faf2ea",
          100: "#edd6c6",
          200: "#e3b69e",
          300: "#d99276",
          400: "#d0694e",
          500: "#b74735",
          600: "#8e312a",
          700: "#651e1e",
          800: "#3c1215",
          900: "#150508",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
