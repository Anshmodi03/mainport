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
      color: "from-accent/20 to-accent-secondary/20",
      skills: [
        { name: "React", level: 95, icon: "⚛️" },
        { name: "Next.js", level: 90, icon: "🔥" },
        { name: "TypeScript", level: 88, icon: "📘" },
        { name: "Tailwind CSS", level: 92, icon: "🎨" },
        { name: "Three.js", level: 85, icon: "🎮" },
        { name: "Framer Motion", level: 87, icon: "✨" },
      ],
    },
    backend: {
      title: "Backend Development",
      icon: Server,
      color: "from-accent-secondary/20 to-accent/20",
      skills: [
        { name: "Node.js", level: 85, icon: "🟢" },
        { name: "Express.js", level: 82, icon: "🚀" },
        { name: "PostgreSQL", level: 80, icon: "🐘" },
        { name: "MongoDB", level: 78, icon: "🍃" },
        { name: "GraphQL", level: 75, icon: "📊" },
        { name: "REST APIs", level: 88, icon: "🔌" },
      ],
    },
    design: {
      title: "Design & Tools",
      icon: Palette,
      color: "from-accent/20 to-accent-secondary/20",
      skills: [
        { name: "Figma", level: 90, icon: "🎯" },
        { name: "Adobe XD", level: 85, icon: "🔷" },
        { name: "Photoshop", level: 80, icon: "🖼️" },
        { name: "Blender", level: 75, icon: "🎭" },
        { name: "UI/UX Design", level: 88, icon: "✨" },
        { name: "Prototyping", level: 87, icon: "🔧" },
      ],
    },
    mobile: {
      title: "Mobile & Other",
      icon: Smartphone,
      color: "from-accent-secondary/20 to-accent/20",
      skills: [
        { name: "React Native", level: 80, icon: "📱" },
        { name: "Flutter", level: 70, icon: "🦋" },
        { name: "Git & GitHub", level: 92, icon: "🐙" },
        { name: "Docker", level: 75, icon: "🐳" },
        { name: "AWS", level: 72, icon: "☁️" },
        { name: "Linux", level: 85, icon: "🐧" },
      ],
    },
  };

  const otherSkills = [
    { name: "Machine Learning", icon: "🤖" },
    { name: "Blockchain", icon: "⛓️" },
    { name: "AR/VR", icon: "🥽" },
    { name: "DevOps", icon: "🚀" },
    { name: "Cybersecurity", icon: "🔐" },
    { name: "Game Development", icon: "🎮" },
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
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="parallax-bg" />

      {/* Enhanced floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element-slow absolute top-20 right-20 w-40 h-40 bg-accent/8 rounded-full blur-3xl" />
        <div className="floating-element-fast absolute bottom-20 left-20 w-48 h-48 bg-accent-secondary/8 rounded-full blur-3xl" />
        <div className="floating-element absolute top-1/3 left-1/3 w-28 h-28 bg-gradient-to-r from-accent/10 to-accent-secondary/10 rounded-full blur-xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
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
            <Zap className="w-6 h-6 text-accent mr-3 animate-pulse" />
            <span className="text-lg font-medium text-accent">
              My technical expertise
            </span>
            <Zap className="w-6 h-6 text-accent ml-3 animate-pulse" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space gradient-text mb-6 text-shadow-glow"
          >
            Skills & Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Constantly learning and mastering{" "}
            <span className="text-accent font-semibold">
              cutting-edge technologies
            </span>{" "}
            to build{" "}
            <span className="gradient-text-secondary font-semibold">
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
              className={`px-8 py-4 rounded-2xl font-medium transition-all duration-300 flex items-center space-x-3 hover-lift ${
                activeCategory === key
                  ? "bg-gradient-to-r from-accent/30 to-accent-secondary/30 text-accent border border-accent/50 shadow-lg"
                  : "bg-background/50 text-muted-foreground hover:text-accent hover:bg-accent/10 border border-accent/20"
              }`}
            >
              <category.icon className="w-5 h-5" />
              <span>{category.title}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Skills Display */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glow-border rounded-3xl p-10 mb-16 bg-gradient-to-br from-background/50 to-background-secondary/50 backdrop-blur-sm"
          ref={skillsRef}
        >
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
                    <h4 className="text-lg font-semibold text-foreground">
                      {skill.name}
                    </h4>
                  </div>
                  <span className="text-accent font-bold text-lg">
                    {skill.level}%
                  </span>
                </div>
                <div className="skill-bar skills-bar relative">
                  <div
                    className="skills-fill absolute top-0 left-0 h-full bg-gradient-to-r from-accent to-accent-secondary rounded-xl transform origin-left scale-x-0 transition-transform duration-1000 ease-out"
                    style={{ width: "100%" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Other Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold font-space text-center mb-12 gradient-text-secondary">
            Currently Exploring
          </h3>

          <div className="flex flex-wrap justify-center gap-6">
            {otherSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="glass-effect rounded-full px-8 py-4 hover-lift magnetic-effect bg-gradient-to-r from-background/30 to-background-secondary/30 backdrop-blur-sm border border-accent/20"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="text-base font-medium text-foreground">
                    {skill.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
