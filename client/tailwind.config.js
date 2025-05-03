/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class", // Enables dark mode via class (you toggle it manually)
  theme: {
    extend: {
      colors: {
        primary: "#a78bfa",   // Tailwind's indigo-400
        accent: "#f472b6",    // Tailwind's pink-400
        background: "#0f0f0f",
        card: "rgba(255, 255, 255, 0.05)",
      },
      blur: {
        "3xl": "64px",
      },
      animation: {
        pulse: "pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),       // For better form styling
    require("@tailwindcss/typography"),  // Optional, for styled prose
  ],
};
