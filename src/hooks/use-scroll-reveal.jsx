import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollReveal = () => {
  const initializeScrollReveal = () => {
    // Global scroll reveal animations
    gsap.utils.toArray(".reveal-up").forEach((element, i) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Staggered reveals
    gsap.utils.toArray(".reveal-stagger").forEach((container) => {
      const items = container.children;
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 50,
          rotationX: 45,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Slide in from left
    gsap.utils.toArray(".reveal-left").forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          x: -100,
          rotationY: -45,
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Slide in from right
    gsap.utils.toArray(".reveal-right").forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          x: 100,
          rotationY: 45,
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Scale reveal
    gsap.utils.toArray(".reveal-scale").forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          scale: 0.5,
          rotation: 180,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Text reveal with typing effect
    gsap.utils.toArray(".reveal-text").forEach((element) => {
      const text = element.textContent;
      element.innerHTML = text
        .split("")
        .map(
          (char) =>
            `<span class="char">${char === " " ? "&nbsp;" : char}</span>`
        )
        .join("");

      gsap.fromTo(
        element.querySelectorAll(".char"),
        {
          opacity: 0,
          y: 50,
          rotationX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.05,
          ease: "power2.out",
          stagger: 0.02,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Parallax elements
    gsap.utils.toArray(".parallax-slow").forEach((element) => {
      gsap.to(element, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    gsap.utils.toArray(".parallax-fast").forEach((element) => {
      gsap.to(element, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    // Counter animations
    gsap.utils.toArray(".counter-animate").forEach((counter) => {
      const target = parseInt(counter.dataset.target) || 0;
      const obj = { count: 0 };

      gsap.to(obj, {
        count: target,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          counter.textContent = Math.round(obj.count);
        },
        scrollTrigger: {
          trigger: counter,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    // Progress bar animations
    gsap.utils.toArray(".progress-animate").forEach((bar) => {
      const target = parseInt(bar.dataset.progress) || 0;

      gsap.fromTo(
        bar,
        { width: "0%" },
        {
          width: `${target}%`,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  };

  return { initializeScrollReveal };
};
