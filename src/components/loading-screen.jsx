import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [currentPhase, setCurrentPhase] = useState(0);

  const phases = [
    { label: "Initializing", icon: "⚡", duration: 800, target: 25 },
    { label: "Loading Assets", icon: "📦", duration: 600, target: 60 },
    { label: "Preparing UI", icon: "🎨", duration: 700, target: 85 },
    { label: "Almost Ready", icon: "🚀", duration: 500, target: 100 },
  ];

  useEffect(() => {
    let currentProgress = 0;
    let phaseIndex = 0;

    const runPhase = () => {
      if (phaseIndex >= phases.length) {
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => onLoadingComplete?.(), 800);
        }, 400);
        return;
      }

      const phase = phases[phaseIndex];
      setCurrentPhase(phaseIndex);

      const startProgress = currentProgress;
      const targetProgress = phase.target;
      const increment =
        (targetProgress - startProgress) / (phase.duration / 50);

      const progressInterval = setInterval(() => {
        currentProgress += increment;
        if (currentProgress >= targetProgress) {
          currentProgress = targetProgress;
          setProgress(currentProgress);
          clearInterval(progressInterval);
          phaseIndex++;
          setTimeout(runPhase, 200);
        } else {
          setProgress(currentProgress);
        }
      }, 50);
    };

    runPhase();
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.95,
            filter: "blur(20px)",
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 z-50 flex items-center justify-center overflow-hidden"
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.3) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
              animate={{
                backgroundPosition: ["0px 0px", "60px 60px"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* Floating orbs */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: `linear-gradient(45deg, ${
                    i % 2 === 0 ? "#00d4ff" : "#7c3aed"
                  }, ${i % 2 === 0 ? "#4ecdc4" : "#ff6b6b"})`,
                }}
                initial={{
                  x:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerWidth : 1000),
                  y:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerHeight : 600),
                  scale: 0,
                }}
                animate={{
                  x:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerWidth : 1000),
                  y:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerHeight : 600),
                  scale: [0, 1, 0.5, 1, 0],
                  opacity: [0, 0.8, 0.4, 0.8, 0],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Main content container */}
          <div className="relative z-10 text-center space-y-12 px-8">
            {/* Logo and brand */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 p-0.5"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
                  <motion.span
                    className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    AM
                  </motion.span>
                </div>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-3"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  background:
                    "linear-gradient(90deg, #00d4ff, #7c3aed, #ff6b6b, #4ecdc4, #00d4ff)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Ansh Modi
              </motion.h1>

              <motion.p
                className="text-gray-400 text-lg font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Full Stack Developer
              </motion.p>
            </motion.div>

            {/* Progress section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="space-y-8"
            >
              {/* Circular progress */}
              <div className="relative w-32 h-32 mx-auto">
                {/* Outer glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(0, 212, 255, 0.3)",
                      "0 0 40px rgba(124, 58, 237, 0.5)",
                      "0 0 20px rgba(0, 212, 255, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Progress ring */}
                <svg
                  className="w-32 h-32 transform -rotate-90"
                  viewBox="0 0 120 120"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="3"
                    fill="none"
                  />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="url(#progressGradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: progress / 100 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{ strokeDasharray: "314" }}
                  />
                  <defs>
                    <linearGradient
                      id="progressGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#00d4ff" />
                      <stop offset="50%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#4ecdc4" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    className="text-3xl mb-1"
                    key={phases[currentPhase]?.icon}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {phases[currentPhase]?.icon}
                  </motion.div>
                  <motion.span
                    className="text-xl font-bold text-cyan-400"
                    key={Math.round(progress)}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {Math.round(progress)}%
                  </motion.span>
                </div>
              </div>

              {/* Phase indicators */}
              <div className="flex justify-center space-x-4">
                {phases.map((phase, index) => (
                  <motion.div
                    key={index}
                    className={`flex flex-col items-center space-y-2 ${
                      index <= currentPhase ? "opacity-100" : "opacity-40"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: index <= currentPhase ? 1 : 0.4, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <motion.div
                      className={`w-3 h-3 rounded-full ${
                        index < currentPhase
                          ? "bg-green-400"
                          : index === currentPhase
                          ? "bg-cyan-400"
                          : "bg-gray-600"
                      }`}
                      animate={
                        index === currentPhase
                          ? {
                              scale: [1, 1.3, 1],
                              opacity: [0.7, 1, 0.7],
                            }
                          : {}
                      }
                      transition={{
                        duration: 1,
                        repeat: index === currentPhase ? Infinity : 0,
                      }}
                    />
                    {index === currentPhase && (
                      <motion.span
                        className="text-xs text-gray-300 font-medium"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {phase.label}
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Loading quote */}
              <motion.div
                className="max-w-md mx-auto"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-gray-400 text-sm italic">
                  "Building exceptional digital experiences..."
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              boxShadow: "0 0 20px rgba(0, 212, 255, 0.6)",
            }}
          />

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-400/50 rounded-tl-2xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-purple-400/50 rounded-br-2xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
