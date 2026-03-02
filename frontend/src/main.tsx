import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import GlobalErrorBoundary from "./components/GlobalErrorBoundary";
import "./styles.css";

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient();

function Root() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => console.error("SW registration failed", err));
    }
  }, []);

  if (!CLERK_PUBLISHABLE_KEY) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#030712] p-6 text-center text-slate-100">
        <div className="glass-panel max-w-md p-8 border-red-500/20">
          <h1 className="mb-4 text-2xl font-bold text-red-400">Configuration Error</h1>
          <p className="mb-6 text-slate-400">
            Missing **VITE_CLERK_PUBLISHABLE_KEY** environment variable.
            Please add it to your Vercel project settings.
          </p>
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium w-full inline-block"
          >
            Go to Vercel Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <React.StrictMode>
      <GlobalErrorBoundary>
        <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </QueryClientProvider>
        </ClerkProvider>
      </GlobalErrorBoundary>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<Root />);

