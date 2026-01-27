import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { initSentry } from "./lib/sentry";
import { initPerformanceMonitoring } from "./lib/performance";
import { logger } from "./lib/logger";

// Validate environment variables on app start
import "./lib/env";

// Initialize i18n BEFORE rendering the app
import "./i18n/config";

// Initialize error monitoring (production only)
initSentry();

// Initialize performance monitoring in production
if (import.meta.env.PROD) {
  initPerformanceMonitoring();
  logger.info('Performance monitoring initialized');
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <App />
    </ThemeProvider>
  </StrictMode>
);
