/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0a0a1a",
        secondary: "#1a1a3a",
        accent: "#6366f1",
        "accent-secondary": "#8b5cf6",
        "accent-tertiary": "#06b6d4",
        background: "#0a0b14",
        "background-secondary": "#0f1127",
        "background-tertiary": "#151729",
        foreground: "#f8fafc",
        muted: "#6b7280",
        "muted-foreground": "#9ca3af",
        border: "#2d3748",
        input: "#2d3748",
        ring: "#6366f1",
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        surface: "#1e1f38",
        "surface-hover": "#1e1f38",
        "text-primary": "#f8fafc",
        "text-secondary": "#cbd5e1",
        "text-tertiary": "#94a3b8",
      },
      fontFamily: {
        jetbrains: ["JetBrains Mono", "monospace"],
        inter: ["Inter", "sans-serif"],
        space: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "float-slow": "float-slow 12s ease-in-out infinite",
        "float-fast": "float-fast 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite alternate",
        morphing: "morphing 4s ease-in-out infinite",
        wave: "wave 5s ease-in-out infinite",
        "gradient-shift": "gradient-shift 3s ease infinite",
        "parallax-float": "parallax-float 20s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-20px) rotate(120deg)" },
          "66%": { transform: "translateY(10px) rotate(240deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg) scale(1)" },
          "25%": { transform: "translateY(-30px) rotate(90deg) scale(1.1)" },
          "50%": { transform: "translateY(-10px) rotate(180deg) scale(0.9)" },
          "75%": { transform: "translateY(-20px) rotate(270deg) scale(1.05)" },
        },
        "float-fast": {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-25px) scale(1.15)" },
        },
        "pulse-glow": {
          from: {
            boxShadow:
              "0 0 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(124, 58, 237, 0.2)",
          },
          to: {
            boxShadow:
              "0 0 30px rgba(0, 212, 255, 0.6), 0 0 60px rgba(124, 58, 237, 0.4)",
          },
        },
        morphing: {
          "0%, 100%": { borderRadius: "50%", transform: "rotate(0deg)" },
          "25%": {
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            transform: "rotate(90deg)",
          },
          "50%": {
            borderRadius: "70% 30% 30% 70% / 70% 70% 30% 30%",
            transform: "rotate(180deg)",
          },
          "75%": {
            borderRadius: "40% 60% 60% 40% / 60% 40% 60% 40%",
            transform: "rotate(270deg)",
          },
        },
        wave: {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "33%": { transform: "translateY(-15px) scale(1.05)" },
          "66%": { transform: "translateY(10px) scale(0.95)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "parallax-float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(1deg)" },
        },
      },
      backgroundImage: {
        "subtle-gradient":
          "linear-gradient(180deg, var(--background) 0%, var(--background-secondary) 100%)",
      },
    },
  },
  plugins: [],
};
