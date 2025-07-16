import { useEffect, useCallback, useRef } from "react";

export function usePerformanceOptimization() {
  const rafRef = useRef();
  const frameCallbacks = useRef([]);
  const isLowEndDevice = useRef(null);

  // Detect low-end device
  const detectDeviceCapability = useCallback(() => {
    if (isLowEndDevice.current === null) {
      const cores = navigator.hardwareConcurrency || 4;
      const memory = navigator.deviceMemory || 4;
      const connection = navigator.connection;

      isLowEndDevice.current =
        cores <= 4 ||
        memory <= 4 ||
        (connection && connection.effectiveType === "slow-2g") ||
        (connection && connection.effectiveType === "2g") ||
        (connection && connection.effectiveType === "3g");
    }
    return isLowEndDevice.current;
  }, []);

  const scheduleFrame = useCallback((callback) => {
    frameCallbacks.current.push(callback);

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        const startTime = performance.now();
        frameCallbacks.current.forEach((cb) => {
          if (performance.now() - startTime > 16) return; // Skip if frame budget exceeded
          cb();
        });
        frameCallbacks.current = [];
        rafRef.current = null;
      });
    }
  }, []);

  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  const throttle = useCallback((func, limit) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        func.apply(null, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return { scheduleFrame, debounce, throttle, detectDeviceCapability };
}

export function useIntersectionObserver(options = {}) {
  const elementRef = useRef();
  const observerRef = useRef();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Use passive observers for better performance
    observerRef.current = new IntersectionObserver(
      (entries) => {
        requestIdleCallback(() => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              element.classList.add("in-view");
            }
          });
        });
      },
      {
        threshold: 0.05, // Reduced threshold for earlier triggering
        rootMargin: "100px", // Increased margin for better preparation
        ...options,
      }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return elementRef;
}
