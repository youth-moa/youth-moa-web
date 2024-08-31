/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        header: "0px 3px 4px 0px rgba(0, 0, 0, 0.12);",
      },
      colors: {
        blue: "rgba(63, 48, 233, 1)",
        "border-gray": "rgba(217, 217, 217, 1)",
        "header-black": "rgba(50, 50, 50, 1)",
        "gray-005": "rgba(245, 245, 245, 1)",
        "gray-002": "rgba(144, 144, 146, 1)",
        red: "rgba(254, 38, 38, 1)",
      },
    },
  },
  plugins: [],
};
