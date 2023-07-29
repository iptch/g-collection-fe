/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      tablet: "480px",
      laptop: "1024px",
      monitor: "1920px",
    },
    extend: {
      colors: {
        "blue-primary": "#064266",
        "blue-secondary": "#0065a0",
        "blue-tertiary": "#0093d9",
        "yellow-primary": "#fee45d",
        "green-primary": "#54c766",
        "gray-background": "#0642660d",
        "gray-background-darkened": "#00000015",
        "gray-border": "#e1e5f0",
        "gray-element-background": "#f4f6fb",
      },
      fontFamily: {
        sans: ["Montserrat", "Roboto", "Helvetica Neue", "sans-serif"],
      },
      boxShadow: {
        card: "0px 0px 30px #0000000d",
      },
    },
  },
  plugins: [],
};
