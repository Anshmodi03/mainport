import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingScreen from "./components/loading-screen.jsx";
import { useGSAPScroll } from "./hooks/use-gsap-scroll.jsx";

// Lazy load components for better performance
const Home = lazy(() => import("./pages/home.jsx"));
const NotFound = lazy(() => import("./pages/not-found.jsx"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { initializeScrollAnimations } = useGSAPScroll();

  useEffect(() => {
    if (!isLoading) {
      // Initialize GSAP scroll animations after loading
      const cleanup = initializeScrollAnimations();
      return cleanup;
    }
  }, [isLoading, initializeScrollAnimations]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground">
        <AppRouter />
      </div>
    </QueryClientProvider>
  );
}

export default App;
