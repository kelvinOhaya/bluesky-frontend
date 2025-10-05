import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all /api requests to the backend
      "/api": {
        target: import.meta.env.VITE_BASE_BACKEND_URL, // Your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
