import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
        animation: {
        'spin-slow': 'spin 6s linear infinite',
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),require("@tailwindcss/forms"),
     require('tailwind-scrollbar-hide'),
  ],
};
export default config;
