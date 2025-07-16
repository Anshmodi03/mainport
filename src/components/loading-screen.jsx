import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [loadingText, setLoadingText] = useState("Initializing...");

  const loadingStages = [
    "Initializing...",
    "Loading components...",
    "Preparing portfolio...",
    "Almost ready...",
    "Welcome!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + Math.random() * 8 + 5; // Faster loading

        // Update loading text based on progress
        if (nextProgress > 80) setLoadingText(loadingStages[4]);
        else if (nextProgress > 60) setLoadingText(loadingStages[3]);
        else if (nextProgress > 40) setLoadingText(loadingStages[2]);
        else if (nextProgress > 20) setLoadingText(loadingStages[1]);
        else setLoadingText(loadingStages[0]);

        if (nextProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            onLoadingComplete?.();
          }, 500); // Faster transition
          return 100;
        }
        return nextProgress;
      });
    }, 80); // Faster updates

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 bg-gradient-to-br from-background via-background-secondary to-background z-50 flex items-center justify-center overflow-hidden"
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
          </div>

          {/* Dynamic floating particles */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${
                  i % 4 === 0
                    ? "bg-accent"
                    : i % 4 === 1
                    ? "bg-accent-secondary"
                    : i % 4 === 2
                    ? "bg-accent/60"
                    : "bg-accent-secondary/60"
                }`}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 0,
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Morphing background shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-accent/20 to-accent-secondary/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.5, 1],
                x: [0, 100, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-accent-secondary/20 to-accent/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, -80, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>

          {/* Main loading content */}
          <div className="relative z-10 text-center max-w-md mx-auto px-4">
            {/* Animated logo/name */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                ease: "back.out(1.7)",
                type: "spring",
              }}
              className="mb-12"
            >
              <motion.h1
                className="text-5xl sm:text-7xl font-bold font-space mb-4"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  background:
                    "linear-gradient(45deg, #00d4ff, #7c3aed, #00d4ff, #7c3aed)",
                  backgroundSize: "400% 400%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Ansh Modi
              </motion.h1>
              <motion.p
                className="text-muted-foreground font-jetbrains text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Full Stack Developer
              </motion.p>
            </motion.div>

            {/* Enhanced progress indicator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="space-y-8"
            >
              {/* Circular progress with multiple rings */}
              <div className="relative w-32 h-32 mx-auto">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-accent/20" />

                {/* Middle ring */}
                <div className="absolute inset-2 rounded-full border border-accent-secondary/30" />

                {/* Progress ring */}
                <svg
                  className="w-32 h-32 transform -rotate-90 absolute inset-0"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-accent/10"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#progressGradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: progress / 100 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{
                      strokeDasharray: "283",
                      filter: "drop-shadow(0 0 8px rgba(0, 212, 255, 0.5))",
                    }}
                  />
                  <defs>
                    <linearGradient
                      id="progressGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#00d4ff" />
                      <stop offset="50%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#00d4ff" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    className="text-2xl font-bold text-accent font-jetbrains"
                    key={Math.round(progress)}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {Math.round(progress)}%
                  </motion.span>
                  <div className="text-xs text-muted-foreground mt-1">
                    Loading
                  </div>
                </div>

                {/* Pulsing glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/20 to-accent-secondary/20 blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Enhanced loading dots */}
              <div className="flex justify-center space-x-3">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full bg-gradient-to-r from-accent to-accent-secondary"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3],
                      backgroundColor: [
                        "rgb(0, 212, 255)",
                        "rgb(124, 58, 237)",
                        "rgb(0, 212, 255)",
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              {/* Dynamic loading text */}
              <motion.div
                className="space-y-3"
                key={loadingText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-foreground font-jetbrains text-base font-medium">
                  {loadingText}
                </p>

                {/* Code snippet animation */}
                <motion.div
                  className="font-jetbrains text-sm space-y-1"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="text-accent-secondary/80">
                    <span className="text-accent">const</span> portfolio ={" "}
                    <span className="text-accent">await</span> loadPortfolio();
                  </div>
                  <div className="text-muted-foreground/60">
                    <span className="text-accent">console.log(</span>
                    <span className="text-accent-secondary">
                      'Welcome to my world!'
                    </span>
                    <span className="text-accent">);</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Animated progress bar at bottom */}
          <motion.div
            className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-accent via-accent-secondary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)",
            }}
          />

          {/* Corner decorative elements */}
          <motion.div
            className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-accent/40 rounded-tl-3xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-accent-secondary/40 rounded-br-3xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          />

          {/* Scanning line effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
