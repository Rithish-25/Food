/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff4d4d",
        secondary: "#ff9933",
        accent: "#f97316",
        dark: "#1a1a1a",
      },
    },
  },
  plugins: [],
}
