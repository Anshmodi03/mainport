import { useEffect, useCallback, useRef } from "react";

export function usePerformanceOptimization() {
  const rafRef = useRef();
  const frameCallbacks = useRef([]);

  const scheduleFrame = useCallback((callback) => {
    frameCallbacks.current.push(callback);

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        frameCallbacks.current.forEach((cb) => cb());
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

  return { scheduleFrame, debounce, throttle };
}

export function useIntersectionObserver(options = {}) {
  const elementRef = useRef();
  const observerRef = useRef();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add("in-view");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
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
