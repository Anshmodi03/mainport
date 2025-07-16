import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollEffects = () => {
  useEffect(() => {
    // Enhanced section reveal animations
    gsap.utils.toArray(".section-reveal").forEach((section) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 100,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Enhanced parallax effects
    gsap.utils.toArray(".parallax-element").forEach((element) => {
      const speed = element.dataset.speed || 0.5;
      gsap.to(element, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    // Enhanced text reveal animations
    gsap.utils.toArray(".text-reveal").forEach((text) => {
      gsap.fromTo(
        text,
        {
          opacity: 0,
          y: 30,
          rotationX: 45,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Progressive loading animations
    gsap.utils.toArray(".progressive-load").forEach((container) => {
      const items = container.querySelectorAll(".progressive-item");
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Floating animations
    gsap.utils.toArray(".floating-element").forEach((element) => {
      gsap.to(element, {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-5, 5)",
        duration: "random(3, 6)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    // Enhanced hover lift effects
    gsap.utils.toArray(".hover-lift").forEach((element) => {
      const tl = gsap.timeline({ paused: true });

      tl.to(element, {
        y: -10,
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        duration: 0.3,
        ease: "power2.out",
      });

      element.addEventListener("mouseenter", () => tl.play());
      element.addEventListener("mouseleave", () => tl.reverse());
    });

    // Card glow effects
    gsap.utils.toArray(".card-glow").forEach((card) => {
      gsap.fromTo(
        card,
        {
          boxShadow: "0 0 0 rgba(59, 130, 246, 0)",
        },
        {
          boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Morphing background effects
    gsap.utils.toArray(".morphing-bg").forEach((bg) => {
      gsap.to(bg, {
        backgroundPosition: "200% 200%",
        duration: 10,
        ease: "none",
        repeat: -1,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
};
