import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            onLoadingComplete?.();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-background z-50 flex items-center justify-center overflow-hidden"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-secondary/10" />

            {/* Enhanced floating particles with accent colors */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${
                  i % 3 === 0
                    ? "bg-accent/40"
                    : i % 3 === 1
                    ? "bg-accent-secondary/30"
                    : "bg-foreground/20"
                }`}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>

          {/* Main loading content */}
          <div className="relative z-10 text-center">
            {/* Logo/Name with gradient text */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <h1 className="text-4xl sm:text-6xl font-bold font-space mb-2">
                <span className="gradient-text bg-gradient-primary bg-clip-text text-transparent animate-gradient">
                  Karthik
                </span>
              </h1>
              <p className="text-muted-foreground font-jetbrains text-sm sm:text-base">
                Building the future, one line at a time
              </p>
            </motion.div>

            {/* Enhanced loading indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-6"
            >
              {/* Glass effect circular progress */}
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 glass-effect rounded-full border border-accent/20" />
                <svg
                  className="w-24 h-24 transform -rotate-90 relative z-10"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-accent/20"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: progress / 100 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      strokeDasharray: "283",
                      strokeDashoffset: 283 - (283 * progress) / 100,
                    }}
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#00d4ff" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Progress percentage with accent color */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <span className="text-xl font-bold text-accent font-jetbrains">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>

              {/* Enhanced loading dots with staggered animation */}
              <div className="flex justify-center space-x-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full bg-gradient-to-r from-accent to-accent-secondary"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              {/* Loading text with coding theme */}
              <motion.div
                className="space-y-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-muted-foreground font-jetbrains text-sm">
                  Initializing portfolio...
                </p>
                <div className="font-jetbrains text-xs text-accent-secondary/60">
                  <span className="text-accent">console.log(</span>
                  <span className="text-accent-secondary">
                    'Loading amazing content...'
                  </span>
                  <span className="text-accent">);</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced bottom progress bar with gradient */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent via-accent-secondary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />

          {/* Subtle corner decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-accent/30 rounded-tl-2xl" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-accent-secondary/30 rounded-br-2xl" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
