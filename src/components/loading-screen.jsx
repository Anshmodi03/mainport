import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Sparkles, Zap } from "lucide-react";

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("loading"); // loading, complete, exit

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setStage("complete");
          setTimeout(() => {
            setStage("exit");
            setTimeout(onLoadingComplete, 500);
          }, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const logoVariants = {
    initial: { scale: 0, rotate: -180, opacity: 0 },
    animate: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.8,
      },
    },
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const progressBarVariants = {
    initial: { width: "0%" },
    animate: {
      width: `${progress}%`,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const sparkleVariants = {
    animate: {
      rotate: 360,
      scale: [1, 1.2, 1],
      transition: {
        rotate: { duration: 3, repeat: Infinity, ease: "linear" },
        scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
      },
    },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3, duration: 0.6 },
    },
  };

  const percentageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.5, duration: 0.4 },
    },
  };

  return (
    <AnimatePresence>
      {stage !== "exit" && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut",
                  },
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="text-center relative z-10">
            {/* Logo container with animated background */}
            <motion.div
              className="relative mx-auto mb-8"
              variants={logoVariants}
              initial="initial"
              animate={stage === "complete" ? "pulse" : "animate"}
            >
              <div className="relative">
                {/* Glowing background */}
                <motion.div
                  className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur-xl opacity-60"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                    transition: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                />

                {/* Main logo */}
                <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-white to-gray-100 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Code2 className="w-10 h-10 text-gray-800" />

                  {/* Floating sparkles */}
                  <motion.div
                    variants={sparkleVariants}
                    animate="animate"
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </motion.div>

                  <motion.div
                    variants={sparkleVariants}
                    animate="animate"
                    className="absolute -bottom-2 -left-2"
                    style={{ animationDelay: "1s" }}
                  >
                    <Zap className="w-4 h-4 text-blue-400" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Loading text */}
            <motion.div
              variants={textVariants}
              initial="initial"
              animate="animate"
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {stage === "complete"
                  ? "Ready to Launch!"
                  : "Loading Portfolio"}
              </h2>
              <p className="text-gray-300 text-sm">
                {stage === "complete"
                  ? "Preparing your experience..."
                  : "Crafting something amazing..."}
              </p>
            </motion.div>

            {/* Progress bar container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative mb-6"
            >
              {/* Background bar */}
              <div className="w-80 h-2 bg-white/10 rounded-full mx-auto overflow-hidden backdrop-blur-sm border border-white/20">
                {/* Progress fill */}
                <motion.div
                  variants={progressBarVariants}
                  initial="initial"
                  animate="animate"
                  className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full relative"
                >
                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  />
                </motion.div>
              </div>

              {/* Progress dots */}
              <div className="flex justify-center mt-4 space-x-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-cyan-400 rounded-full"
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.5, 1, 0.5],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      },
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Percentage */}
            <motion.div
              variants={percentageVariants}
              initial="initial"
              animate="animate"
              className="text-white/80 text-lg font-mono"
            >
              <motion.span
                key={progress}
                initial={{ scale: 1.2, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {progress}%
              </motion.span>
            </motion.div>

            {/* Completion message */}
            <AnimatePresence>
              {stage === "complete" && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6"
                >
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-full text-green-300 text-sm font-medium backdrop-blur-sm">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className="mr-2"
                    >
                      ✨
                    </motion.div>
                    Loading Complete
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-10 left-10 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5],
              transition: { duration: 2, repeat: Infinity },
            }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-8 h-8 border-r-2 border-b-2 border-purple-400/50"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5],
              transition: { duration: 2, repeat: Infinity, delay: 1 },
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
