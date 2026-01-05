import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@styles": path.resolve(__dirname, "./src/styles"),
    },
  },
  server: {
    host: "0.0.0.0", // Listen on all network interfaces
    port: 5173,
    strictPort: false,
    cors: true,
    // Allow requests from tunneling services and local network
    allowedHosts: [
      "localhost",
      ".localtunnel.me",
      ".loca.lt",
      ".ngrok.io",
      ".ngrok-free.app",
      ".trycloudflare.com",
    ],
    // Additional options for better mobile compatibility
    hmr: {
      clientPort: 5173,
    },
    // Force IPv4 for better compatibility
    // host: "0.0.0.0" already does this, but being explicit
  },
});
