import React, { useState, useEffect, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  User,
  Code,
  Mail,
  Briefcase,
  Award,
  Sparkles,
} from "lucide-react";
import { usePerformanceOptimization } from "../hooks/use-performance.jsx";
import { useIsMobile } from "../hooks/use-mobile.jsx";

const Navigation = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { throttle } = usePerformanceOptimization();
  const isMobile = useIsMobile();

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "projects", label: "Projects", icon: Code },
    { id: "skills", label: "Skills", icon: Award },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const handleScroll = useCallback(
    throttle(() => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.id);
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    }, 16),
    [throttle, navItems]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = useCallback((sectionId) => {
    // Close mobile menu first
    setIsMobileMenuOpen(false);

    // Small delay to allow menu to close
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 80;
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Update active section
        setActiveSection(sectionId);
      }
    }, 100);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "nav-blur border-b border-accent/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center cursor-pointer group"
            onClick={() => scrollToSection("home")}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-accent to-accent-secondary rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-white font-bold font-jetbrains text-xl">
                K
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold font-space gradient-text">
                Karthik
              </span>
              <Sparkles className="w-5 h-5 text-accent ml-2 animate-pulse" />
            </div>
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-6 py-3 text-sm font-medium transition-all duration-300 group rounded-2xl ${
                  activeSection === item.id
                    ? "text-accent bg-accent/10 border border-accent/30"
                    : "text-muted-foreground hover:text-accent hover:bg-accent/5"
                }`}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </span>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent-secondary/20 rounded-2xl border border-accent/30"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-accent-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            ))}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:hidden p-3 text-muted-foreground hover:text-accent transition-colors duration-300 z-50 relative rounded-2xl hover:bg-accent/10 border border-accent/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-t border-accent/20 fixed top-20 left-0 right-0 z-40 shadow-2xl"
          >
            <div className="px-6 py-8 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-4 w-full px-6 py-5 text-left rounded-2xl transition-all duration-300 touch-manipulation min-h-[56px] ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-accent/20 to-accent-secondary/20 text-accent border border-accent/30"
                      : "text-muted-foreground hover:bg-accent/10 hover:text-accent active:bg-accent/30"
                  }`}
                >
                  <item.icon size={22} />
                  <span className="font-medium text-lg">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
});

Navigation.displayName = "Navigation";

export default Navigation;
