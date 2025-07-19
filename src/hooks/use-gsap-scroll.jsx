import { useEffect } from "react";

// Lightweight version - just basic scroll handling without heavy GSAP animations
export const useGSAPScroll = () => {
  const initializeScrollAnimations = () => {
    // Simple scroll-to-top on page load
    window.scrollTo(0, 0);

    // Basic smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    // Cleanup function
    return () => {
      // No heavy cleanup needed
    };
  };

  return { initializeScrollAnimations };
};
