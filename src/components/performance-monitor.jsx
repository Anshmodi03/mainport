import React, { useEffect, useState } from "react";

const PerformanceMonitor = () => {
  const [fps, setFps] = useState(60);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        const currentFPS = frameCount;
        setFps(currentFPS);
        setIsLowPerformance(currentFPS < 30);
        frameCount = 0;
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(measureFPS);
    };

    measureFPS();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Apply performance adjustments globally
  useEffect(() => {
    if (isLowPerformance) {
      document.documentElement.style.setProperty(
        "--animation-duration",
        "0.2s"
      );
      document.documentElement.style.setProperty(
        "--transition-duration",
        "0.15s"
      );
    } else {
      document.documentElement.style.setProperty(
        "--animation-duration",
        "0.3s"
      );
      document.documentElement.style.setProperty(
        "--transition-duration",
        "0.2s"
      );
    }
  }, [isLowPerformance]);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;
