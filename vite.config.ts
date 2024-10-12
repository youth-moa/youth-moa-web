import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    // proxy: {
    //   "/": {
    //     target: "http://15.164.66.16",
    //     changeOrigin: true,
    //   },
    // },
  },
});
