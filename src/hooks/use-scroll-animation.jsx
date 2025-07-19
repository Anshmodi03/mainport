import { useInView } from "react-intersection-observer";

export function useScrollAnimation(options = {}) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "50px",
    triggerOnce: true,
    ...options,
  });

  return { ref, isVisible: inView };
}
