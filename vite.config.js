import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all /api requests to the backend
      "/api": {
        target: "https://bluesky-backend-production.up.railway.app", // Your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // Copy netlify.toml to build output
  publicDir: "public",
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
});
