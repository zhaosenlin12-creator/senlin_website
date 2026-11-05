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
    },
  },
  plugins: [],
};
