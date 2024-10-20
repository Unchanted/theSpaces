/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        textBlack: "#060320",
        textWhite: "#f7f7fe",
        background: "#f7f7fe",
        primary: "#2e1de8",
        secondary: "#f2c77d",
        accent: "#a6ef5c",
      },
      fontFamily: {
        marcellus: "Marcellus",
        fira: ["Fira Sans", "sans-serif"],
        poppins: "Poppins",
      },
    },
  },
  plugins: [],
};
