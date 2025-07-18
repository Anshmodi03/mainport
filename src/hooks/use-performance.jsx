import { useCallback } from "react";

export function usePerformanceOptimization() {
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

  return { debounce, throttle };
}

export function useIntersectionObserver(options = {}) {
  const elementRef = useRef();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px", ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return elementRef;
}
