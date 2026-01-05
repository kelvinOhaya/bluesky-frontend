import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// PWA Detection - Add CSS classes based on how app is launched
function detectPWAMode() {
  const isPWA =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: minimal-ui)").matches ||
    window.navigator.standalone === true || // iOS Safari
    document.referrer.includes("android-app://"); // Android TWA

  if (isPWA) {
    document.body.classList.add("pwa-mode");
    document.body.classList.remove("browser-mode");
    console.log("Running as PWA");
  } else {
    document.body.classList.add("browser-mode");
    document.body.classList.remove("pwa-mode");
    console.log("Running in browser");
  }
}

// Run PWA detection immediately
detectPWAMode();

// Also check when display mode changes
window.addEventListener("resize", detectPWAMode);

// Register service worker for PWA functionality
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

createRoot(document.getElementById("root")).render(<App />);
