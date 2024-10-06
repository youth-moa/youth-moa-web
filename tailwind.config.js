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
        "tag-gray": "rgba(110, 112, 116, 1)",
        "gray-005": "rgba(245, 245, 245, 1)",
        "gray-003": "rgba(197, 197, 197, 1)",
        "gray-002": "rgba(144, 144, 146, 1)",
        "gray-001": "rgba(130, 128, 134, 1)",
        "gray-000": "rgba(111, 111, 111, 1)",
        green: "rgba(69, 180, 25, 1)",
        red: "rgba(254, 38, 38, 1)",
      },
      boxShadow: { base: "0px 0px 4px 0px rgba(0, 0, 0, 0.20);" },
    },
  },
  plugins: [],
};
