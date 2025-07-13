import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Code2, Palette, Zap, Target, BookOpen, Coffee } from "lucide-react";
import { useScrollAnimation } from "../hooks/use-scroll-animation.jsx";

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();
  const statsRef = useRef(null);

  const stats = [
    { number: "50+", label: "Projects Completed", icon: Target },
    { number: "2+", label: "Years Experience", icon: Code2 },
    { number: "100+", label: "Commits This Month", icon: Zap },
    { number: "24/7", label: "Learning Mode", icon: BookOpen },
  ];

  const skills = [
    {
      name: "Frontend Development",
      icon: Code2,
      description: "React, Next.js, TypeScript",
    },
    {
      name: "UI/UX Design",
      icon: Palette,
      description: "Figma, Adobe XD, Prototyping",
    },
    {
      name: "3D Development",
      icon: Zap,
      description: "Three.js, WebGL, Blender",
    },
    {
      name: "Problem Solving",
      icon: Target,
      description: "Algorithms, Data Structures",
    },
  ];

  useEffect(() => {
    if (isVisible && statsRef.current) {
      const numbers = statsRef.current.querySelectorAll(".stat-number");
      numbers.forEach((number, index) => {
        const finalValue = stats[index].number;
        const numericValue = parseInt(finalValue.replace(/\D/g, ""));
        let currentValue = 0;
        const increment = numericValue / 30;

        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
          }

          const element = number;
          element.textContent =
            Math.floor(currentValue) + finalValue.replace(/\d/g, "");
        }, 50);
      });
    }
  }, [isVisible, stats]);

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="parallax-bg" />

      {/* Enhanced floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element-slow absolute top-32 right-20 w-24 h-24 bg-accent/5 rounded-full blur-2xl" />
        <div className="floating-element-fast absolute bottom-32 left-20 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30"
        ref={ref}
      >
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
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Passionate about creating innovative digital experiences and
            exploring the intersection of design and technology.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          ref={statsRef}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="text-center glow-border p-6 hover-lift"
            >
              <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
              <div className="stat-number text-3xl font-bold font-space gradient-text">
                0
              </div>
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Modern coding workspace setup"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover hover-lift"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent rounded-2xl" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass-effect rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-sm font-jetbrains">
                    <Coffee className="w-4 h-4 text-accent" />
                    <span className="text-accent">Currently coding...</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="glass-effect rounded-xl p-4 hover-lift magnetic-effect"
                >
                  <skill.icon className="w-6 h-6 text-accent mb-2" />
                  <h4 className="font-semibold text-sm mb-1">{skill.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {skill.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glow-border rounded-2xl p-6 hover-lift"
            >
              <h3 className="text-2xl font-bold font-space text-accent mb-4 flex items-center">
                <Code2 className="w-6 h-6 mr-2" />
                Who I Am
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm{" "}
                <span className="text-accent font-semibold">
                  Mudunuri Bhaskara Karthikeya Varma
                </span>
                , currently pursuing{" "}
                <span className="text-accent font-semibold">
                  B.Tech at Woxsen University
                </span>
                . I'm passionate about Front-end & Full Stack Development with
                expertise in JavaScript, Next.js, React.js, and modern web
                technologies.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I believe in trying out new things and picking up challenges as
                it's always great to have knowledge in variety of subjects and
                various experiences to share. I'm more interested in{" "}
                <span className="text-accent font-semibold">
                  developing my weaknesses into strengths
                </span>
                .
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glow-border rounded-2xl p-6 hover-lift"
            >
              <h3 className="text-2xl font-bold font-space text-accent mb-4 flex items-center">
                <Palette className="w-6 h-6 mr-2" />
                What I Do
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Whether I'm designing a sleek user interface or coding a complex
                application, I'm always striving to create something{" "}
                <span className="text-accent font-semibold">
                  unique and innovative
                </span>
                . I love experimenting with new technologies and staying
                up-to-date with the latest trends in the tech world.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  "React",
                  "Three.js",
                  "TypeScript",
                  "Next.js",
                  "Figma",
                  "Node.js",
                ].map((tech) => (
                  <span key={tech} className="badge badge-secondary">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="glow-border rounded-2xl p-6 hover-lift"
            >
              <h3 className="text-2xl font-bold font-space text-accent mb-4 flex items-center">
                <Target className="w-6 h-6 mr-2" />
                My Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To bridge the gap between{" "}
                <span className="text-accent font-semibold">
                  design and technology
                </span>
                , creating digital experiences that are not only functional but
                also beautiful and meaningful. I'm committed to continuous
                learning and pushing the boundaries of what's possible on the
                web.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
