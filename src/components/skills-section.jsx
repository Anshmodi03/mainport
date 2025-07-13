import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/use-scroll-animation.jsx';

export default function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const skillsRef = useRef(null);

  const skillCategories = [
    {
      title: "Frontend",
      icon: "💻",
      skills: [
        { name: "React", icon: "⚛️" },
        { name: "Next.js", icon: "🔗" },
        { name: "TypeScript", icon: "🔷" },
        { name: "JavaScript", icon: "🟨" },
        { name: "Tailwind", icon: "🎨" },
        { name: "HTML/CSS", icon: "🌐" }
      ]
    },
    {
      title: "Backend",
      icon: "🛠️",
      skills: [
        { name: "Node.js", icon: "🟢" },
        { name: "Express", icon: "🚀" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "MongoDB", icon: "🍃" },
        { name: "Prisma", icon: "🔺" },
        { name: "REST APIs", icon: "🔌" }
      ]
    },
    {
      title: "Tools & Design",
      icon: "🎯",
      skills: [
        { name: "Three.js", icon: "🎮" },
        { name: "Figma", icon: "🎨" },
        { name: "Git", icon: "📦" },
        { name: "Docker", icon: "🐳" },
        { name: "Framer Motion", icon: "✨" },
        { name: "Blender", icon: "🎲" }
      ]
    }
  ];

  const skillLevels = [
    { name: "React/Next.js", level: 95, color: "from-blue-500 to-blue-600" },
    { name: "TypeScript", level: 90, color: "from-blue-600 to-blue-700" },
    { name: "Tailwind CSS", level: 92, color: "from-teal-500 to-teal-600" },
    { name: "Three.js/WebGL", level: 85, color: "from-green-500 to-green-600" },
    { name: "Node.js", level: 88, color: "from-green-600 to-green-700" },
    { name: "UI/UX Design", level: 80, color: "from-purple-500 to-purple-600" }
  ];

  useEffect(() => {
    if (isVisible && skillsRef.current) {
      const skillFills = skillsRef.current.querySelectorAll('.skills-fill');
      skillFills.forEach((fill, index) => {
        const level = skillLevels[index].level;
        setTimeout(() => {
          fill.style.transform = `scaleX(${level / 100})`;
        }, 200 + index * 100);
      });
    }
  }, [isVisible, skillLevels]);

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="parallax-bg" />
      
      {/* Enhanced floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element-slow absolute top-20 right-20 w-36 h-36 bg-accent/5 rounded-full blur-3xl" />
        <div className="floating-element-fast absolute bottom-20 left-20 w-28 h-28 bg-blue-500/5 rounded-full blur-2xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl font-bold font-space gradient-text mb-4 text-shadow-glow"
          >
            Skills & Tools
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Technologies and tools I use to bring ideas to life.
          </motion.p>
        </motion.div>
        
        {/* Skills Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glow-border rounded-2xl p-6 hover-lift"
            >
              <div className="flex items-center mb-6">
                <div className="text-3xl mr-3">{category.icon}</div>
                <h3 className="text-2xl font-bold font-space text-accent">{category.title}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: (index * 0.2) + (skillIndex * 0.1) }}
                    className="text-center p-3 rounded-lg hover:bg-accent/10 transition-all duration-300 cursor-pointer group magnetic-effect"
                  >
                    <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                      {skill.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Enhanced Skill Bars */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glow-border rounded-2xl p-8 hover-lift"
          ref={skillsRef}
        >
          <h3 className="text-2xl font-bold font-space text-accent mb-8 text-center flex items-center justify-center">
            <span className="text-3xl mr-3">📊</span>
            Proficiency Levels
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillLevels.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 + (index * 0.1) }}
                className="group"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-foreground font-medium group-hover:text-accent transition-colors duration-300">
                    {skill.name}
                  </span>
                  <span className="text-accent font-bold text-lg">{skill.level}%</span>
                </div>
                <div className="relative">
                  <div className="skills-bar bg-muted/20 rounded-full h-3 overflow-hidden">
                    <div 
                      className="skills-fill h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        transform: 'scaleX(0)',
                        background: `linear-gradient(90deg, hsl(348, 83%, 47%), hsl(217, 67%, 22%))`
                      }}
                    />
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Additional Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold font-space text-accent mb-6">Currently Learning</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "AI/ML", icon: "🤖" },
              { name: "Blockchain", icon: "⛓️" },
              { name: "AR/VR", icon: "🥽" },
              { name: "Mobile Dev", icon: "📱" },
              { name: "DevOps", icon: "🚀" },
              { name: "Cybersecurity", icon: "🔐" }
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="glass-effect rounded-full px-6 py-3 hover-lift magnetic-effect"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{skill.icon}</span>
                  <span className="text-sm font-medium text-foreground">{skill.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}