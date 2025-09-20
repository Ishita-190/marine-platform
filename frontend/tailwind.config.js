/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // scan all source files for classnames
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        oceanBlue: "#1e3a8a",
        seaGreen: "#10b981",
        coral: "#fb7185"
      }
    },
  },
  plugins: [],
};
