import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Palette,
  Database,
  Globe,
  Server,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import { useScrollAnimation } from "../hooks/use-scroll-animation.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState("frontend");
  const skillsRef = useRef(null);

  const skillCategories = {
    frontend: {
      title: "Frontend Development",
      icon: Globe,
      color: "from-blue-500/20 via-purple-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      accentColor: "text-blue-400",
      skills: [
        {
          name: "React",
          level: 95,
          icon: "⚛️",
          color: "from-blue-400 to-cyan-400",
        },
        {
          name: "Next.js",
          level: 90,
          icon: "🔥",
          color: "from-purple-400 to-blue-400",
        },
        {
          name: "TypeScript",
          level: 88,
          icon: "📘",
          color: "from-blue-500 to-indigo-500",
        },
        {
          name: "Tailwind CSS",
          level: 92,
          icon: "🎨",
          color: "from-cyan-400 to-teal-400",
        },
        {
          name: "Three.js",
          level: 85,
          icon: "🎮",
          color: "from-purple-500 to-pink-500",
        },
        {
          name: "Framer Motion",
          level: 87,
          icon: "✨",
          color: "from-indigo-400 to-purple-400",
        },
      ],
    },
    backend: {
      title: "Backend Development",
      icon: Server,
      color: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
      borderColor: "border-green-500/30",
      accentColor: "text-green-400",
      skills: [
        {
          name: "Node.js",
          level: 85,
          icon: "🟢",
          color: "from-green-400 to-emerald-400",
        },
        {
          name: "Express.js",
          level: 82,
          icon: "🚀",
          color: "from-emerald-500 to-green-500",
        },
        {
          name: "PostgreSQL",
          level: 80,
          icon: "🐘",
          color: "from-blue-500 to-blue-600",
        },
        {
          name: "MongoDB",
          level: 78,
          icon: "🍃",
          color: "from-green-500 to-lime-500",
        },
        {
          name: "GraphQL",
          level: 75,
          icon: "📊",
          color: "from-pink-500 to-rose-500",
        },
        {
          name: "REST APIs",
          level: 88,
          icon: "🔌",
          color: "from-teal-400 to-cyan-400",
        },
      ],
    },
    design: {
      title: "Design & Tools",
      icon: Palette,
      color: "from-pink-500/20 via-rose-500/20 to-red-500/20",
      borderColor: "border-pink-500/30",
      accentColor: "text-pink-400",
      skills: [
        {
          name: "Figma",
          level: 90,
          icon: "🎯",
          color: "from-purple-400 to-pink-400",
        },
        {
          name: "Adobe XD",
          level: 85,
          icon: "🔷",
          color: "from-blue-500 to-purple-500",
        },
        {
          name: "Photoshop",
          level: 80,
          icon: "🖼️",
          color: "from-blue-600 to-indigo-600",
        },
        {
          name: "Blender",
          level: 75,
          icon: "🎭",
          color: "from-orange-500 to-yellow-500",
        },
        {
          name: "UI/UX Design",
          level: 88,
          icon: "✨",
          color: "from-pink-400 to-rose-400",
        },
        {
          name: "Prototyping",
          level: 87,
          icon: "🔧",
          color: "from-indigo-500 to-purple-500",
        },
      ],
    },
    mobile: {
      title: "Mobile & Other",
      icon: Smartphone,
      color: "from-orange-500/20 via-amber-500/20 to-yellow-500/20",
      borderColor: "border-orange-500/30",
      accentColor: "text-orange-400",
      skills: [
        {
          name: "React Native",
          level: 80,
          icon: "📱",
          color: "from-blue-400 to-cyan-400",
        },
        {
          name: "Flutter",
          level: 70,
          icon: "🦋",
          color: "from-blue-500 to-blue-600",
        },
        {
          name: "Git & GitHub",
          level: 92,
          icon: "🐙",
          color: "from-gray-600 to-gray-700",
        },
        {
          name: "Docker",
          level: 75,
          icon: "🐳",
          color: "from-blue-500 to-cyan-500",
        },
        {
          name: "AWS",
          level: 72,
          icon: "☁️",
          color: "from-orange-400 to-yellow-400",
        },
        {
          name: "Linux",
          level: 85,
          icon: "🐧",
          color: "from-yellow-500 to-orange-500",
        },
      ],
    },
  };

  const otherSkills = [
    {
      name: "Machine Learning",
      icon: "🤖",
      color: "from-violet-500 to-purple-500",
    },
    { name: "Blockchain", icon: "⛓️", color: "from-yellow-500 to-orange-500" },
    { name: "AR/VR", icon: "🥽", color: "from-cyan-500 to-blue-500" },
    { name: "DevOps", icon: "🚀", color: "from-green-500 to-teal-500" },
    { name: "Cybersecurity", icon: "🔐", color: "from-red-500 to-rose-500" },
    {
      name: "Game Development",
      icon: "🎮",
      color: "from-purple-500 to-pink-500",
    },
  ];

  useEffect(() => {
    if (isVisible && skillsRef.current) {
      const skillBars = skillsRef.current.querySelectorAll(".skill-bar");
      skillBars.forEach((bar, index) => {
        const skillLevel = skillCategories[activeCategory].skills[index].level;
        const fillElement = bar.querySelector(".skills-fill");
        if (fillElement) {
          setTimeout(() => {
            fillElement.style.transform = `scaleX(${skillLevel / 100})`;
          }, index * 100);
        }
      });
    }
  }, [isVisible, activeCategory]);

  return (
    <section
      id="skills"
      className="py-20 relative overflow-hidden"
      style={{ zIndex: 25 }}
    >
      <div className="parallax-bg" />

      {/* Enhanced floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element-slow absolute top-32 right-20 w-36 h-36 bg-accent/10 rounded-full blur-3xl" />
        <div className="floating-element-fast absolute bottom-32 left-20 w-44 h-44 bg-accent-secondary/10 rounded-full blur-3xl" />
        <div className="floating-element absolute top-1/4 right-1/3 w-28 h-28 bg-gradient-to-r from-accent/15 to-accent-secondary/15 rounded-full blur-xl" />
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
        ref={ref}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center justify-center mb-6"
          >
            <Sparkles className="w-6 h-6 text-blue-400 mr-3 animate-pulse" />
            <span className="text-lg font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              My technical expertise
            </span>
            <Sparkles className="w-6 h-6 text-purple-400 ml-3 animate-pulse" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
          >
            Skills & Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Constantly learning and mastering{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
              cutting-edge technologies
            </span>{" "}
            to build{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
              exceptional digital experiences
            </span>
            .
          </motion.p>
        </motion.div>

        {/* Enhanced Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {Object.entries(skillCategories).map(([key, category], index) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              onClick={() => setActiveCategory(key)}
              className={`px-8 py-4 rounded-2xl font-medium transition-all duration-300 flex items-center space-x-3 hover-lift relative group ${
                activeCategory === key
                  ? `bg-gradient-to-r ${category.color} ${category.borderColor} border backdrop-blur-sm shadow-lg shadow-current/20`
                  : `bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600/30 hover:border-gray-500/50`
              }`}
            >
              <category.icon
                className={`w-5 h-5 ${
                  activeCategory === key
                    ? category.accentColor
                    : "text-gray-400"
                }`}
              />
              <span
                className={activeCategory === key ? category.accentColor : ""}
              >
                {category.title}
              </span>
              {activeCategory === key && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl" />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Skills Display */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`relative rounded-3xl p-10 mb-16 bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border ${skillCategories[activeCategory].borderColor} shadow-2xl shadow-current/10`}
          ref={skillsRef}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${skillCategories[activeCategory].color} rounded-3xl opacity-30`}
          />
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <h4 className="text-lg font-semibold text-white">
                        {skill.name}
                      </h4>
                    </div>
                    <span
                      className={`font-bold text-lg ${skillCategories[activeCategory].accentColor}`}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <div className="skill-bar skills-bar relative bg-gray-700/50 rounded-xl h-3 overflow-hidden">
                    <div
                      className={`skills-fill absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-xl transform origin-left scale-x-0 transition-transform duration-1000 ease-out shadow-lg`}
                      style={{ width: "100%" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Other Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold font-space text-center mb-12 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Currently Exploring
          </h3>

          <div className="flex flex-wrap justify-center gap-6">
            {otherSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="group relative hover-lift"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-full opacity-20 group-hover:opacity-30 transition-opacity blur-xl`}
                />
                <div className="relative bg-gray-800/60 backdrop-blur-sm rounded-full px-8 py-4 border border-gray-600/30 group-hover:border-gray-500/50 transition-all">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="text-base font-medium text-gray-200 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
