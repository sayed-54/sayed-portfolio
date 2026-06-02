import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        // Display font for headings — geometric, premium
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        // Body font — clean, highly legible
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        // Semantic brand tokens
        brand: {
          primary: "#14b8a6", // teal-500
          glow: "#2dd4bf",   // teal-400
          muted: "#0f766e",  // teal-700
        },
        surface: {
          glass: "rgba(255,255,255,0.40)",
          card: "rgba(255,255,255,0.50)",
          "glass-dark": "rgba(0,0,0,0.40)",
          "card-dark": "rgba(0,0,0,0.20)",
        },
      },
      boxShadow: {
        // Tinted teal shadows — carry brand hue
        brand: "0 8px 32px rgba(20,184,166,0.25)",
        "brand-sm": "0 4px 24px rgba(20,184,166,0.12)",
        "brand-lg": "0 0 40px rgba(20,184,166,0.4)",
        glass: "0 8px 32px 0 rgba(31,38,135,0.37)",
        "glow-teal": "0 0 20px rgba(20,184,166,0.5)",
      },
      animation: {
        "spin-slow": "spin 6s linear infinite",
        "spin-slower": "spin 20s linear infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16,1,0.3,1)",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "count-up": "count-up 1s ease-out",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 12px rgba(20,184,166,0.4)" },
          "50%": { boxShadow: "0 0 28px rgba(20,184,166,0.8)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar-hide"),
  ],
};
export default config;
