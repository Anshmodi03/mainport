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
  ChevronDown,
} from "lucide-react";
import { usePerformanceOptimization } from "../hooks/use-performance.jsx";
import { useIsMobile } from "../hooks/use-mobile.jsx";

const Navigation = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { throttle } = usePerformanceOptimization();
  const isMobile = useIsMobile();

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "about",
      label: "About",
      icon: User,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "experience",
      label: "Experience",
      icon: Briefcase,
      color: "from-orange-500 to-red-500",
    },
    {
      id: "projects",
      label: "Projects",
      icon: Code,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "skills",
      label: "Skills",
      icon: Award,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "contact",
      label: "Contact",
      icon: Mail,
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const handleScroll = useCallback(
    throttle(() => {
      const currentScrollY = window.scrollY;

      // Keep navigation always visible
      setIsVisible(true);

      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);

      // Update active section with improved detection
      const sections = navItems.map((item) => item.id);
      let currentSection = null;
      let minDistance = Infinity;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top - 100);

          if (rect.top <= 200 && rect.bottom >= 0 && distance < minDistance) {
            minDistance = distance;
            currentSection = section;
          }
        }
      });

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    }, 16),
    [throttle, navItems, lastScrollY]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = useCallback((sectionId) => {
    setIsMobileMenuOpen(false);

    // Immediately update active section for better responsiveness
    setActiveSection(sectionId);

    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerHeight;

      // Use requestAnimationFrame for smoother animation
      requestAnimationFrame(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      });
    }
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: isVisible ? 0 : -100,
      opacity: isVisible ? 1 : 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "backdrop-blur-2xl bg-background/80 border-b border-white/10 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo with Animation */}
            <motion.div
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center cursor-pointer group z-50"
              onClick={() => scrollToSection("home")}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mr-4 shadow-2xl overflow-hidden relative">
                  <div className="absolute inset-0 "></div>
                  <img
                    src="/logo.png"
                    alt="Ansh Modi"
                    className="w-full h-full object-cover rounded-2xl relative z-10"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-full h-full hidden items-center justify-center text-white font-bold text-lg bg-gradient-to-br from-cyan-400 to-purple-600"
                    style={{ display: "none" }}
                  >
                    AM
                  </div>
                </div>

                {/* Floating particles around logo */}
                <div className="absolute -top-1 -right-1">
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: { duration: 2, repeat: Infinity },
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </motion.div>
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-2xl font-bold font-space bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 bg-clip-text text-transparent">
                  Ansh Modi
                </span>
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="ml-2"
                >
                  <Sparkles className="w-5 h-5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent" />
                </motion.div>
              </div>
            </motion.div>

            {/* Desktop Navigation - Clean Static Design */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 flex items-center space-x-2 ${
                      isActive
                        ? "bg-white/15 text-white border border-white/20 backdrop-blur-sm shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>

                    {/* Simple active indicator */}
                    {isActive && (
                      <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Enhanced Mobile Menu Button */}
            <motion.button
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="md:hidden p-3 text-gray-300 hover:text-white transition-colors duration-300 z-50 relative rounded-2xl hover:bg-white/10 border border-white/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-20 left-4 right-4 z-50 md:hidden"
            >
              <div className="bg-background/95 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
                {/* Menu Header */}
                <div className="px-6 py-4 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                      Navigation
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Menu Items */}
                <div className="px-4 py-6 space-y-2">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        variants={mobileItemVariants}
                        onClick={() => scrollToSection(item.id)}
                        className={`flex items-center space-x-4 w-full px-6 py-4 text-left rounded-2xl ${
                          isActive
                            ? "bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-white border border-cyan-400/30"
                            : "text-gray-300 hover:bg-white/10 hover:text-white active:bg-white/20"
                        }`}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        animate={{
                          backgroundColor: isActive
                            ? "rgba(6, 182, 212, 0.1)"
                            : "transparent",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className={`p-2 rounded-xl bg-gradient-to-r ${item.color}`}
                          animate={{
                            rotate: isActive ? 360 : 0,
                            scale: isActive ? 1.1 : 1,
                          }}
                          transition={{
                            duration: 0.6,
                            ease: "easeInOut",
                          }}
                        >
                          <item.icon size={20} className="text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <span className="font-medium text-lg">
                            {item.label}
                          </span>
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: "100%", opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.4,
                                  ease: "easeInOut",
                                }}
                                className="h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 mt-1 rounded-full"
                              />
                            )}
                          </AnimatePresence>
                        </div>
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                              }}
                              className="w-2 h-2 bg-cyan-400 rounded-full"
                            />
                          )}
                        </AnimatePresence>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Menu Footer */}
                <div className="px-6 py-4 border-t border-white/10 bg-white/5">
                  <p className="text-sm text-gray-400 text-center">
                    Swipe up to close or tap outside
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

Navigation.displayName = "Navigation";

export default Navigation;
