import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGSAPAnimations() {
  const elementRef = useRef(null);

  const createMagneticEffect = (element, strength = 0.3) => {
    if (!element) return;

    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    element.addEventListener("mouseleave", () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    });
  };

  const createTextReveal = (element, delay = 0) => {
    if (!element) return;

    gsap.fromTo(
      element.children || element,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  };

  const createParallaxScroll = (element, speed = 0.5) => {
    if (!element) return;

    ScrollTrigger.create({
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const yPos = -(self.progress - 0.5) * speed * 100;
        gsap.set(element, { y: yPos });
      },
    });
  };

  const createMorphingShape = (element) => {
    if (!element) return;

    gsap.to(element, {
      borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });
  };

  return {
    elementRef,
    createMagneticEffect,
    createTextReveal,
    createParallaxScroll,
    createMorphingShape,
  };
}
