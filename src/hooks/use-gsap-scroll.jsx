import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export const useGSAPScroll = () => {
  const initializeScrollAnimations = () => {
    // Smooth scrolling configuration
    gsap.config({
      autoSleep: 60,
      force3D: true,
      nullTargetWarn: false,
    });

    // Page entrance animation
    const tl = gsap.timeline();
    tl.from("body", { opacity: 0, duration: 0.5 })
      .from(
        ".hero-content",
        { y: 100, opacity: 0, duration: 1, ease: "power3.out" },
        "-=0.3"
      )
      .from(
        ".nav-item",
        {
          y: -50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );

    // Advanced parallax scrolling
    gsap.utils.toArray(".parallax-element").forEach((element, i) => {
      const speed = element.dataset.speed || 0.5;
      const direction = element.dataset.direction || "vertical";

      if (direction === "vertical") {
        gsap.to(element, {
          yPercent: -50 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      } else {
        gsap.to(element, {
          xPercent: -25 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    // Complex section reveals with morphing effects
    gsap.utils.toArray(".section-reveal").forEach((section, i) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
          onEnter: () => {
            gsap.to(section, {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              duration: 1.5,
              ease: "power3.out",
            });
          },
        },
      });

      timeline
        .from(section.querySelectorAll(".animate-text"), {
          y: 100,
          opacity: 0,
          rotationX: 90,
          transformOrigin: "50% 50%",
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
        })
        .from(
          section.querySelectorAll(".animate-card"),
          {
            scale: 0.8,
            opacity: 0,
            rotationY: 45,
            transformOrigin: "center center",
            duration: 1,
            stagger: 0.15,
            ease: "back.out(1.7)",
          },
          "-=0.8"
        );
    });

    // Magnetic scroll effects for interactive elements
    gsap.utils.toArray(".magnetic-scroll").forEach((element) => {
      const handleMouseMove = (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(element, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    // Complex text animations
    gsap.utils.toArray(".text-reveal").forEach((text) => {
      const chars = text.textContent.split("");
      text.innerHTML = chars
        .map((char) => `<span class="char">${char}</span>`)
        .join("");

      gsap.from(text.querySelectorAll(".char"), {
        y: 100,
        opacity: 0,
        rotationX: -90,
        duration: 0.8,
        stagger: 0.02,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Morphing background shapes
    gsap.utils.toArray(".morphing-bg").forEach((shape, i) => {
      const morphTimeline = gsap.timeline({
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      morphTimeline
        .to(shape, {
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          duration: 4,
        })
        .to(shape, {
          borderRadius: "70% 30% 30% 70% / 70% 70% 30% 30%",
          duration: 4,
        })
        .to(shape, {
          borderRadius: "50% 50% 50% 50% / 50% 50% 50% 50%",
          duration: 4,
        });

      ScrollTrigger.create({
        trigger: shape,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => morphTimeline.play(),
        onLeave: () => morphTimeline.pause(),
        onEnterBack: () => morphTimeline.play(),
        onLeaveBack: () => morphTimeline.pause(),
      });
    });

    // Advanced scroll-based counter animation
    gsap.utils.toArray(".counter").forEach((counter) => {
      const target = parseInt(counter.dataset.target);
      const duration = parseFloat(counter.dataset.duration) || 2;

      ScrollTrigger.create({
        trigger: counter,
        start: "top 80%",
        onEnter: () => {
          gsap.to(counter, {
            innerHTML: target,
            duration: duration,
            ease: "power2.out",
            snap: { innerHTML: 1 },
            stagger: 0.1,
          });
        },
      });
    });

    // Complex image reveals with clip-path
    gsap.utils.toArray(".image-reveal").forEach((img) => {
      const direction = img.dataset.direction || "left";
      let clipPath;

      switch (direction) {
        case "left":
          clipPath = [
            "polygon(0 0, 0 0, 0 100%, 0% 100%)",
            "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          ];
          break;
        case "right":
          clipPath = [
            "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
            "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          ];
          break;
        case "top":
          clipPath = [
            "polygon(0 0, 100% 0, 100% 0, 0 0)",
            "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          ];
          break;
        case "bottom":
          clipPath = [
            "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          ];
          break;
        default:
          clipPath = [
            "polygon(0 0, 0 0, 0 100%, 0% 100%)",
            "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          ];
      }

      gsap.fromTo(
        img,
        {
          clipPath: clipPath[0],
        },
        {
          clipPath: clipPath[1],
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: img,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Floating elements with complex physics
    gsap.utils.toArray(".float-complex").forEach((element, i) => {
      const speed = 0.02 + Math.random() * 0.03;
      const amplitude = 20 + Math.random() * 40;
      const offset = Math.random() * Math.PI * 2;

      gsap.to(element, {
        y: `+=${amplitude}`,
        rotation: 360,
        duration: 8 + Math.random() * 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.2,
      });

      gsap.to(element, {
        x: `+=${amplitude * 0.5}`,
        duration: 12 + Math.random() * 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.3,
      });
    });

    // Progressive loading animation
    gsap.utils.toArray(".progressive-load").forEach((element, i) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(element, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      }).from(
        element.querySelectorAll(".progressive-item"),
        {
          y: 50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4"
      );
    });

    // Scroll-triggered particle effects
    gsap.utils.toArray(".particle-trigger").forEach((trigger) => {
      ScrollTrigger.create({
        trigger: trigger,
        start: "top 70%",
        onEnter: () => {
          // Create particle burst effect
          for (let i = 0; i < 20; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.style.position = "absolute";
            particle.style.width = "4px";
            particle.style.height = "4px";
            particle.style.backgroundColor = `hsl(${
              Math.random() * 360
            }, 70%, 60%)`;
            particle.style.borderRadius = "50%";
            particle.style.pointerEvents = "none";
            particle.style.zIndex = "1000";

            const rect = trigger.getBoundingClientRect();
            particle.style.left = `${rect.left + rect.width / 2}px`;
            particle.style.top = `${rect.top + rect.height / 2}px`;

            document.body.appendChild(particle);

            gsap.to(particle, {
              x: (Math.random() - 0.5) * 200,
              y: (Math.random() - 0.5) * 200,
              opacity: 0,
              scale: 0,
              duration: 1.5,
              ease: "power2.out",
              onComplete: () => particle.remove(),
            });
          }
        },
      });
    });

    // Smooth section transitions
    gsap.utils.toArray("section").forEach((section, i) => {
      const nextSection = section.nextElementSibling;
      if (nextSection) {
        gsap.to(section, {
          yPercent: -100,
          ease: "none",
          scrollTrigger: {
            trigger: nextSection,
            start: "top bottom",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  };

  return { initializeScrollAnimations };
};
