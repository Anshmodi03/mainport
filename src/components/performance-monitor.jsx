import { useEffect } from "react";

const PerformanceMonitor = () => {
  useEffect(() => {
    // Set optimized animation durations
    document.documentElement.style.setProperty("--animation-duration", "0.2s");
    document.documentElement.style.setProperty(
      "--transition-duration",
      "0.15s"
    );
  }, []);

  return null;
};

export default PerformanceMonitor;
