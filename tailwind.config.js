/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "0.2" } },
        borderGrow: { "100%": { maxWidth: "100%", opacity: "0.2" } },
        cornerFade: { "100%": { opacity: "1" } },
      },
      animation: {
        fadeIn: "fadeIn 1.2s forwards",
        borderGrow: "borderGrow 1.2s forwards",
        cornerFade: "cornerFade 0.3s 0.5s forwards",
      },
    },
  },
  plugins: [],
};
