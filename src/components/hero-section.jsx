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
  FileText,
  Eye,
  X,
} from "lucide-react";
import { useTypingAnimation } from "../hooks/use-typing-animation.jsx";
import { Button } from "./ui/button.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showResumePopup, setShowResumePopup] = useState(false);
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
    // Initialize GSAP animations
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 1,
      y: 0,
    });

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
        if (titleRef.current) {
          gsap.set(titleRef.current, {
            y: progress * 100,
            opacity: 1 - progress * 0.5,
          });
        }
        if (subtitleRef.current) {
          gsap.set(subtitleRef.current, {
            y: progress * 150,
            opacity: 1 - progress * 0.3,
          });
        }
      },
    });

    // Floating particles animation
    particlesRef.current.forEach((particle, i) => {
      if (particle) {
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
      }
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8"
      style={{ zIndex: 10 }}
    >
      {/* Enhanced background gradient with parallax */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background opacity-95 parallax-bg"
        data-speed="0.1"
      />

      {/* Additional atmospheric layers with parallax */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent-secondary/5 parallax-bg"
        data-speed="0.2"
      />
      <div
        className="absolute inset-0 bg-radial-gradient from-accent/10 via-transparent to-transparent parallax-bg"
        data-speed="0.15"
      />

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

        {/* Enhanced floating elements with GSAP and parallax */}
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
            } rounded-full blur-xl parallax-element`}
            data-speed={0.3 + (i % 3) * 0.1}
            data-intensity={30 + (i % 3) * 10}
            style={{
              left: `${10 + (i % 4) * 20}%`,
              top: `${10 + (i % 3) * 25}%`,
            }}
          />
        ))}

        {/* Additional decorative elements with parallax */}
        <div
          className="floating-element absolute top-20 left-20 w-16 h-16 bg-gradient-to-r from-accent/30 to-accent-secondary/30 rounded-full blur-lg parallax-element"
          data-speed="0.4"
          data-intensity="25"
        />
        <div
          className="floating-element-slow absolute bottom-20 right-20 w-12 h-12 bg-gradient-to-r from-accent-secondary/40 to-accent/40 rounded-full blur-md parallax-element"
          data-speed="0.6"
          data-intensity="35"
        />
      </div>

      <div
        className="relative z-10 w-full max-w-7xl mx-auto text-center hero-content parallax-content"
        data-speed="0.1"
      >
        {/* Mobile welcome text - moved to the very top */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center mb-8 mt-4 md:hidden"
        >
          <Sparkles className="w-4 h-4 text-white mr-2 animate-pulse" />
          <span className="text-sm font-medium text-white">
            Welcome to my digital universe
          </span>
          <Sparkles className="w-4 h-4 text-white ml-2 animate-pulse" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Desktop welcome text positioned on left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute left-4 sm:left-8 md:left-12 lg:left-16 transform -translate-y-1/2 hidden md:flex flex-col items-start"
          >
            <div className="flex items-center mb-4 mt-8">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white mr-2 animate-pulse" />
              <span className="text-base sm:text-lg lg:text-xl font-medium text-white">
                Welcome to my digital universe
              </span>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-2 animate-pulse" />
            </div>
          </motion.div>

          {/* Main heading */}
          <div className="space-y-4 sm:space-y-6">
            <motion.h1
              ref={titleRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-space leading-tight mt-8 sm:mt-12 md:mt-16 animate-text parallax-element"
              data-speed="0.2"
            >
              <motion.span
                className="block text-foreground mb-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Hi, I'm
              </motion.span>
              <motion.div
                className="relative text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl flex items-center justify-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.7,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
              >
                <motion.span
                  className="relative inline-block font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  {/* Split text into individual letters for staggered animation */}
                  {"Ansh Modi".split("").map((letter, index) => (
                    <motion.span
                      key={index}
                      className="inline-block text-foreground hover:text-accent transition-colors duration-200 cursor-default will-change-transform"
                      initial={{ opacity: 0, y: 20, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.4, // Reduced duration
                        delay: 1 + index * 0.08, // Reduced delay
                        type: "spring",
                        stiffness: 300, // Increased for snappier animation
                        damping: 15,
                      }}
                      whileHover={{
                        y: -6, // Reduced movement
                        transition: { duration: 0.2, ease: "easeOut" },
                      }}
                      style={{
                        display: letter === " " ? "inline" : "inline-block",
                        width: letter === " " ? "0.5em" : "auto",
                        transform: "translateZ(0)", // Force hardware acceleration
                      }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}

                  {/* Subtle underline accent */}
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-accent to-accent-secondary rounded-full"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 2.5,
                      ease: "easeOut",
                    }}
                  />

                  {/* Decorative elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-3 h-3 bg-accent rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 3,
                      type: "spring",
                      stiffness: 300,
                    }}
                  />

                  <motion.div
                    className="absolute -bottom-6 -left-2 w-2 h-2 bg-accent-secondary rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 3.2,
                      type: "spring",
                      stiffness: 300,
                    }}
                  />
                </motion.span>
              </motion.div>
            </motion.h1>

            <motion.div
              ref={subtitleRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-muted-foreground px-4 animate-text parallax-element"
              data-speed="0.3"
            >
              <span className="font-jetbrains text-accent text-reveal">
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
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button
                className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-medium rounded-xl relative overflow-hidden group bg-gradient-to-r from-accent via-accent-secondary to-accent bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 text-white shadow-2xl shadow-accent/30 border-0"
                onClick={() => scrollToSection("projects")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/80 via-accent-secondary/80 to-accent/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 relative z-10" />
                <span className="relative z-10">View My Work</span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-medium rounded-xl relative overflow-hidden group border-2 border-accent/40 bg-transparent hover:bg-gradient-to-r hover:from-accent/10 hover:to-accent-secondary/10 text-white hover:border-accent transition-all duration-300 shadow-lg shadow-accent-secondary/20"
                onClick={() => scrollToSection("contact")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 relative z-10 text-accent group-hover:text-white transition-colors duration-300" />
                <span className="relative z-10 text-accent group-hover:text-white transition-colors duration-300">
                  Get In Touch
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex items-center justify-center space-x-6 sm:space-x-8 mt-8 sm:mt-10 px-4"
          >
            {[
              {
                icon: Github,
                href: "https://github.com/Anshmodi03",
                label: "GitHub",
                color: "from-gray-400 to-gray-200",
                hoverColor: "from-accent to-accent-secondary",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/ansh-modi-/",
                label: "LinkedIn",
                color: "from-blue-400 to-blue-200",
                hoverColor: "from-accent-secondary to-accent",
              },
              {
                icon: Mail,
                href: "mailto:modiaastha01@gmail.com",
                label: "Email",
                color: "from-green-400 to-green-200",
                hoverColor: "from-accent to-accent-secondary",
              },
              {
                icon: FileText,
                label: "Resume",
                color: "from-purple-400 to-purple-200",
                hoverColor: "from-accent-secondary to-accent",
                isResumeButton: true,
              },
            ].map((social, index) => (
              <motion.div
                key={social.label}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="group relative cursor-pointer"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 1.5 + index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                onClick={
                  social.isResumeButton
                    ? () => setShowResumePopup(true)
                    : undefined
                }
              >
                {social.isResumeButton ? (
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${social.color} group-hover:bg-gradient-to-br group-hover:${social.hoverColor} rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm transition-all duration-500 shadow-lg shadow-accent/20 group-hover:shadow-2xl group-hover:shadow-accent/40 border border-white/10 group-hover:border-accent/30`}
                  >
                    <social.icon className="w-7 h-7 sm:w-8 sm:h-8 text-background transition-all duration-300 group-hover:scale-110" />
                  </div>
                ) : (
                  <a
                    href={social.href}
                    target={
                      social.href.startsWith("mailto") ? "_self" : "_blank"
                    }
                    rel={
                      social.href.startsWith("mailto")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="block"
                  >
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${social.color} group-hover:bg-gradient-to-br group-hover:${social.hoverColor} rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm transition-all duration-500 shadow-lg shadow-accent/20 group-hover:shadow-2xl group-hover:shadow-accent/40 border border-white/10 group-hover:border-accent/30`}
                    >
                      <social.icon className="w-7 h-7 sm:w-8 sm:h-8 text-background transition-all duration-300 group-hover:scale-110" />
                    </div>
                  </a>
                )}
                <motion.span
                  className="absolute -bottom-10 sm:-bottom-12 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 font-medium whitespace-nowrap bg-background/80 backdrop-blur-sm px-3 py-1 rounded-lg border border-accent/20"
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  {social.label}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator for mobile - positioned below social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex md:hidden justify-center mt-8 px-4"
          >
            <motion.div
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="group cursor-pointer"
              onClick={() => scrollToSection("about")}
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-10 h-10 bg-gradient-to-r from-accent/30 to-accent-secondary/30 backdrop-blur-sm rounded-xl flex items-center justify-center text-foreground group-hover:from-accent/50 group-hover:to-accent-secondary/50 transition-all duration-300 border border-accent/30"
                >
                  <MoveDown className="w-5 h-5" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll indicator - Bottom Right (Desktop only) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 pointer-events-auto hidden md:block"
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
              name: <span className="text-accent">'Ansh Modi'</span>,
            </div>
            <div className="ml-2 text-foreground text-xs">
              skills: <span className="text-accent">['React', 'Node.js']</span>,
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
        {/* Code-like decorative elements - positioned to the right of Ansh Modi for mobile */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.9 }}
          className="absolute top-40 right-4 transform -translate-y-1/2 font-jetbrains text-accent/60 text-xs backdrop-blur-sm bg-background/30 p-2 rounded-lg border border-accent/20 max-w-[120px]"
        >
          <div className="space-y-1">
            <div className="text-accent-secondary text-xs">
              const dev = &#123;
            </div>
            <div className="ml-1 text-foreground text-xs">
              name: <span className="text-accent">'Ansh'</span>,
            </div>
            <div className="ml-1 text-foreground text-xs">
              passion: <span className="text-accent">'Code'</span>,
            </div>
            <div className="text-accent-secondary text-xs">&#125;;</div>
          </div>
        </motion.div>
      </div>

      {/* Resume Popup */}
      {showResumePopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowResumePopup(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gradient-to-br from-background/95 to-background-secondary/95 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full mx-4 glow-border relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowResumePopup(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-accent/20 hover:bg-accent/30 rounded-full flex items-center justify-center transition-all duration-300 group"
            >
              <X className="w-4 h-4 text-foreground group-hover:text-accent transition-colors duration-300" />
            </button>

            {/* Popup Content */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent/30 to-accent-secondary/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-accent" />
              </div>

              <h3 className="text-2xl font-bold font-space gradient-text mb-2">
                Ansh Modi's Resume
              </h3>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                Choose how you'd like to view my resume
              </p>

              {/* Action Buttons */}
              <div className="space-y-4">
                <motion.a
                  href="../../Ansh-Modi-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-accent/20 to-accent-secondary/20 hover:from-accent/30 hover:to-accent-secondary/30 rounded-xl transition-all duration-300 glow-border hover-lift group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Eye className="w-5 h-5 mr-3 text-accent group-hover:text-accent-secondary transition-colors duration-300" />
                  <span className="text-foreground font-medium">
                    Open Resume
                  </span>
                </motion.a>

                <motion.a
                  href="../../Ansh-Modi-Resume.pdf"
                  download="Ansh_Modi_Resume.pdf"
                  className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-accent-secondary/20 to-accent/20 hover:from-accent-secondary/30 hover:to-accent/30 rounded-xl transition-all duration-300 glow-border hover-lift group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-5 h-5 mr-3 text-accent-secondary group-hover:text-accent transition-colors duration-300" />
                  <span className="text-foreground font-medium">
                    Download Resume
                  </span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
