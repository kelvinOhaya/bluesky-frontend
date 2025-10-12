import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
