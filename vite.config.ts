//-------import-------

import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

//-------Config-------

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5175,

    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },

      "/courses": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
