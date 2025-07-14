import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MoveDown,
  Github,
  Linkedin,
  Mail,
  Download,
  Play,
  Sparkles,
} from "lucide-react";
import { useTypingAnimation } from "../hooks/use-typing-animation.jsx";
import { Button } from "./ui/button.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const particlesRef = useRef([]);

  const titles = [
    "Full Stack Developer",
    "React Developer",
    "Mern Stack Developer",
    "Problem Solver",
    "Innovation Creator",
  ];

  const currentTitle = useTypingAnimation(titles, {
    typeSpeed: 80,
    deleteSpeed: 40,
    delaySpeed: 2500,
  });

  const handleMouseMove = useCallback((e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    // Complex GSAP animations
    const tl = gsap.timeline();

    // Magnetic effect for CTA buttons
    const buttons = ctaRef.current?.querySelectorAll("button, a");
    buttons?.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      });

      button.addEventListener("mouseleave", () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      });
    });

    // Parallax scrolling effect
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(titleRef.current, {
          y: progress * 100,
          opacity: 1 - progress * 0.5,
        });
        gsap.set(subtitleRef.current, {
          y: progress * 150,
          opacity: 1 - progress * 0.3,
        });
      },
    });

    // Floating particles animation
    particlesRef.current.forEach((particle, i) => {
      gsap.to(particle, {
        y: `random(-100, 100)`,
        x: `random(-100, 100)`,
        rotation: `random(0, 360)`,
        duration: `random(3, 6)`,
        repeat: -1,
        yoyo: true,
        ease: "none",
        delay: i * 0.1,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden z-10 px-4 sm:px-6 lg:px-8"
    >
      {/* Enhanced background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary to-background-secondary opacity-95" />

      {/* Animated background elements - Hidden on mobile for better performance */}
      <div className="absolute inset-0 overflow-hidden hidden lg:block">
        <div
          className="absolute w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse-glow"
          style={{
            left: mousePosition.x * 0.03,
            top: mousePosition.y * 0.03,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute w-80 h-80 bg-accent-secondary/15 rounded-full blur-3xl animate-pulse-glow"
          style={{
            right: mousePosition.x * 0.02,
            bottom: mousePosition.y * 0.02,
            transform: "translate(50%, 50%)",
          }}
        />

        {/* Enhanced floating elements with GSAP */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            className={`absolute w-${4 + (i % 3) * 2} h-${
              4 + (i % 3) * 2
            } bg-gradient-to-r ${
              i % 3 === 0
                ? "from-accent/30 to-accent-secondary/20"
                : i % 3 === 1
                ? "from-accent-secondary/25 to-accent/15"
                : "from-accent/20 to-accent-secondary/30"
            } rounded-full blur-xl`}
            style={{
              left: `${10 + (i % 4) * 20}%`,
              top: `${10 + (i % 3) * 25}%`,
            }}
          />
        ))}

        {/* Additional decorative elements */}
        <div className="floating-element absolute top-20 left-20 w-16 h-16 bg-gradient-to-r from-accent/30 to-accent-secondary/30 rounded-full blur-lg" />
        <div className="floating-element-slow absolute bottom-20 right-20 w-12 h-12 bg-gradient-to-r from-accent-secondary/40 to-accent/40 rounded-full blur-md" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Welcome text positioned on left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute left-4 sm:left-8 md:left-12 lg:left-16  transform -translate-y-1/2 hidden md:flex flex-col items-start"
          >
            <div className="flex items-center mb-4 mt-8">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white mr-2 animate-pulse" />
              <span className="text-base sm:text-lg lg:text-xl font-medium text-white">
                Welcome to my digital universe
              </span>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-2 animate-pulse" />
            </div>
          </motion.div>

          {/* Mobile welcome text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center mb-4 md:hidden"
          >
            <Sparkles className="w-4 h-4 text-white mr-2 animate-pulse" />
            <span className="text-sm font-medium text-white">
              Welcome to my digital universe
            </span>
            <Sparkles className="w-4 h-4 text-white ml-2 animate-pulse" />
          </motion.div>

          {/* Main heading */}
          <div className="space-y-4 sm:space-y-6">
            <motion.h1
              ref={titleRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-space leading-tight mt-8 sm:mt-12 md:mt-16"
            >
              <span className="block text-foreground mb-1">Hi, I'm</span>
              <span className="block gradient-text text-shadow-glow animate-gradient bg-gradient-primary bg-clip-text text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Ansh Modi
              </span>
            </motion.h1>

            <motion.div
              ref={subtitleRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-muted-foreground px-4"
            >
              <span className="font-jetbrains text-accent">
                {currentTitle}
                <span className="animate-pulse text-accent-secondary">|</span>
              </span>
            </motion.div>
          </div>

          {/* Enhanced description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4"
          >
            I'm a passionate developer creating{" "}
            <span className="text-accent font-semibold">
              innovative websites
            </span>{" "}
            with modern web technologies.Specializing in front-end and
            full-stack development with a focus on{" "}
            <span className="gradient-text-secondary font-semibold">
              cutting-edge solutions
            </span>
            .
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 px-4"
          >
            <Button
              className="liquid-button w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-medium hover-lift rounded-xl"
              onClick={() => scrollToSection("projects")}
            >
              <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
              View My Work
            </Button>

            <Button
              variant="outline"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-medium glow-border hover-lift rounded-xl"
              onClick={() => scrollToSection("contact")}
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
              Get In Touch
            </Button>
          </motion.div>

          {/* Enhanced Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex items-center justify-center space-x-6 sm:space-x-8 mt-6 sm:mt-8 px-4"
          >
            {[
              {
                icon: Github,
                href: "https://github.com/Anshmodi03",
                label: "GitHub",
                color: "text-foreground hover:text-accent",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/ansh-modi-/",
                label: "LinkedIn",
                color: "text-foreground hover:text-accent-secondary",
              },
              {
                icon: Mail,
                href: "mailto:modiaastha01@gmail.com",
                label: "Email",
                color: "text-foreground hover:text-accent",
              },
              {
                icon: Download,
                href: "../../Ansh-Modi-Resume.pdf",
                label: "Resume",
                color: "text-foreground hover:text-accent-secondary",
                download: "Ansh_Modi_Resume.pdf",
              },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto") ? "_self" : "_blank"}
                rel={
                  social.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
                download={social.download}
                whileHover={{ scale: 1.3, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="group relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-accent/20 to-accent-secondary/20 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:from-accent/30 group-hover:to-accent-secondary/30 transition-all duration-300 magnetic-effect glow-border">
                  <social.icon
                    className={`w-6 h-6 sm:w-7 sm:h-7 ${social.color} transition-all duration-300`}
                  />
                </div>
                <span className="absolute -bottom-8 sm:-bottom-10 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium whitespace-nowrap">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll indicator - Bottom Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 pointer-events-auto"
        onClick={() => scrollToSection("about")}
      >
        <motion.div
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="group cursor-pointer"
        >
          <div className="relative">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-accent/30 to-accent-secondary/30 backdrop-blur-sm rounded-xl flex items-center justify-center text-foreground group-hover:from-accent/50 group-hover:to-accent-secondary/50 transition-all duration-300 border border-accent/30 glow-border hover-lift"
            >
              <MoveDown className="w-6 h-6 sm:w-7 sm:h-7" />
            </motion.div>
            <span className="absolute -left-20 sm:-left-24 top-1/2 transform -translate-y-1/2 text-xs sm:text-sm font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap bg-background/80 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-lg border border-accent/20 hidden sm:block">
              Scroll down
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced Decorative elements - PC view (xl and above) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden xl:block">
        {/* Code-like decorative elements - Top right */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute top-24 right-8 font-jetbrains text-accent/60 text-xs backdrop-blur-sm bg-background/30 p-3 rounded-lg border border-accent/20 max-w-xs"
        >
          <div className="space-y-1">
            <div className="text-accent-secondary">
              const developer = &#123;
            </div>
            <div className="ml-2 text-foreground text-xs">
              name: <span className="text-accent">'Karthik'</span>,
            </div>
            <div className="ml-2 text-foreground text-xs">
              skills: <span className="text-accent">['React', 'Three.js']</span>
              ,
            </div>
            <div className="ml-2 text-foreground text-xs">
              passion: <span className="text-accent">'Innovation'</span>
            </div>
            <div className="text-accent-secondary">&#125;;</div>
          </div>
        </motion.div>

        {/* Bottom left decorative element */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="absolute bottom-24 left-8 font-jetbrains text-muted-foreground/60 text-xs backdrop-blur-sm bg-background/30 p-3 rounded-lg border border-accent-secondary/20 max-w-xs"
        >
          <div className="space-y-1">
            <div className="text-muted-foreground">// Building the future</div>
            <div className="text-muted-foreground">// One line at a time</div>
            <div className="text-accent-secondary">
              console.log(<span className="text-accent">'Hello World!'</span>);
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Decorative elements - Mobile view (below xl) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none block xl:hidden">
        {/* Code-like decorative elements - Top right for mobile */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute top-16 right-2 sm:right-4 font-jetbrains text-accent/60 text-xs backdrop-blur-sm bg-background/30 p-2 sm:p-3 rounded-lg border border-accent/20 max-w-[140px] sm:max-w-xs"
        >
          <div className="space-y-1">
            <div className="text-accent-secondary text-xs">
              const dev = &#123;
            </div>
            <div className="ml-1 text-foreground text-xs">
              name: <span className="text-accent">'Karthik'</span>,
            </div>
            <div className="ml-1 text-foreground text-xs">
              skills: <span className="text-accent">['React']</span>,
            </div>
            <div className="text-accent-secondary text-xs">&#125;;</div>
          </div>
        </motion.div>

        {/* Bottom left decorative element for mobile */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="absolute bottom-16 left-2 sm:left-4 font-jetbrains text-muted-foreground/60 text-xs backdrop-blur-sm bg-background/30 p-2 sm:p-3 rounded-lg border border-accent-secondary/20 max-w-[140px] sm:max-w-xs"
        >
          <div className="space-y-1">
            <div className="text-muted-foreground text-xs">
              // Future builder
            </div>
            <div className="text-accent-secondary text-xs">
              console.log(<span className="text-accent">'Hello!'</span>);
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
