/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#DEDBC8",
        mint: "#5ED29C",
      },
      fontFamily: {
        sans: ['"Almarai"', "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "sans-serif"],
        serif: ['"Instrument Serif"', "serif"],
      },
    },
  },
  plugins: [],
};
