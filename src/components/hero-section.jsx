import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Download,
  Play,
} from "lucide-react";
import { useTypingAnimation } from "../hooks/use-typing-animation.jsx";
import { Button } from "./ui/button.jsx";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const titles = [
    "Full Stack Developer",
    "React Specialist",
    "Three.js Enthusiast",
    "UI/UX Designer",
    "Problem Solver",
  ];

  const currentTitle = useTypingAnimation(titles, {
    typeSpeed: 100,
    deleteSpeed: 50,
    delaySpeed: 2000,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden z-10"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary to-secondary opacity-90" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          style={{
            left: mousePosition.x * 0.05,
            top: mousePosition.y * 0.05,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-2xl"
          style={{
            right: mousePosition.x * 0.03,
            bottom: mousePosition.y * 0.03,
            transform: "translate(50%, 50%)",
          }}
        />

        {/* Floating elements */}
        <div className="floating-element absolute top-10 right-10 w-20 h-20 bg-accent/20 rounded-full blur-xl pulse-glow" />
        <div className="floating-element-slow absolute bottom-10 left-10 w-16 h-16 bg-blue-500/20 rounded-full blur-xl morphing-shape" />
        <div className="floating-element-fast absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-accent/10 rounded-full blur-xl wave-animation" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Main heading */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold font-space leading-tight"
            >
              <span className="block text-foreground">Hi, I'm</span>
              <span className="block gradient-text text-shadow-glow">
                Karthik Mudunuri
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl sm:text-2xl lg:text-3xl font-medium text-muted-foreground"
            >
              <span className="font-jetbrains">
                {currentTitle}
                <span className="animate-pulse">|</span>
              </span>
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            I'm a passionate developer creating innovative digital experiences
            with modern web technologies. Currently pursuing B.Tech at Woxsen
            University, specializing in front-end and full-stack development.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Button
              className="liquid-button px-8 py-4 text-lg font-medium hover-lift"
              onClick={() => scrollToSection("projects")}
            >
              <Play className="w-5 h-5 mr-2" />
              View My Work
            </Button>

            <Button
              variant="outline"
              className="px-8 py-4 text-lg font-medium glow-border hover-lift"
              onClick={() => scrollToSection("contact")}
            >
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex items-center justify-center space-x-6"
          >
            {[
              {
                icon: Github,
                href: "https://github.com/karthikmudunuri",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/karthikmudunuri/",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: "mailto:karthikmudunuri999@gmail.com",
                label: "Email",
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
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="group relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
              >
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-muted-foreground group-hover:text-accent transition-all duration-300 group-hover:bg-accent/30 magnetic-effect">
                  <social.icon className="w-6 h-6" />
                </div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => scrollToSection("about")}
        >
          <div className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-accent transition-colors duration-300">
            <span className="text-sm font-medium">Scroll down</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-6 border-2 border-current rounded-full flex items-center justify-center"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Code-like decorative elements */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute top-20 right-20 font-jetbrains text-accent/40 text-sm"
        >
          <div className="space-y-1">
            <div>const developer = &#123;</div>
            <div className="ml-4">name: 'Karthik',</div>
            <div className="ml-4">skills: ['React', 'Three.js'],</div>
            <div className="ml-4">passion: 'Innovation'</div>
            <div>&#125;;</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="absolute bottom-20 left-20 font-jetbrains text-muted-foreground/40 text-sm"
        >
          <div className="space-y-1">
            <div>// Building the future</div>
            <div>// One line at a time</div>
            <div className="text-accent/60">console.log('Hello World!');</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
