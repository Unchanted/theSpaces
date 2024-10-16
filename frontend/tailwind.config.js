/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        background: "rgb(var(--color-background) / <alpha-value>)",
        card: "rgb(var(--color-card) / <alpha-value>)",
        mute: "rgb(var(--color-mute) / <alpha-value>)",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        vitality: "rgb(var(--color-vitality) / <alpha-value>)",
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
