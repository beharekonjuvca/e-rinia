/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"], // use 'content' instead of 'purge' for Tailwind CSS 3.0 and later
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"], // for Tailwind CSS 3.0 and later
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
