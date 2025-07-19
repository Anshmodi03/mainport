import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  Zap,
  Target,
  BookOpen,
  Coffee,
  Sparkles,
  Rocket,
} from "lucide-react";
import { useScrollAnimation } from "../hooks/use-scroll-animation.jsx";

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  const stats = [
    { number: "40+", label: "Projects Completed", icon: Target },
    { number: "1+", label: "Years Experience", icon: Code2 },
    { number: "10K+", label: "Lines of Code", icon: Code2 },
    { number: "24/7", label: "Learning Mode", icon: BookOpen },
  ];

  const skills = [
    {
      name: "Full Stack Development",
      icon: Zap,
      description: "React, Node.js, MongoDB",
      color: "from-accent/20 to-accent-secondary/20",
    },
    {
      name: "Frontend Development",
      icon: Code2,
      description: "React, Javascript, Tailwind CSS",
      color: "from-accent/20 to-accent-secondary/20",
    },
    {
      name: "Backend Development",
      icon: Palette,
      description: "Node.js, Express, MongoDB",
      color: "from-accent-secondary/20 to-accent/20",
    },
    {
      name: "Problem Solving",
      icon: Target,
      description: "Competitive Programming, Algorithms",
      color: "from-accent-secondary/20 to-accent/20",
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Simplified floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 right-20 w-28 h-28 bg-accent/90 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-32 left-20 w-36 h-36 bg-accent-secondary/90 rounded-full blur-3xl animate-pulse" />
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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center justify-center mb-6"
          >
            <Sparkles className="w-6 h-6 text-white mr-3 animate-pulse" />
            <span className="text-lg font-medium text-white">
              Get to know me
            </span>
            <Sparkles className="w-6 h-6 text-white ml-3 animate-pulse" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Passionate about creating{" "}
            <span className="text-accent font-semibold">
              innovative digital experiences
            </span>{" "}
            and exploring the intersection of{" "}
            <span className="gradient-text-secondary font-semibold">
              design and technology
            </span>
            .
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-background/30 to-background-secondary/30 backdrop-blur-sm border border-accent/20 hover:border-accent/40 transition-all duration-300"
            >
              <stat.icon className="w-10 h-10 text-accent mx-auto mb-4" />
              <div className="text-4xl font-bold font-space gradient-text mb-2">
                {stat.number}
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Modern coding workspace setup"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/30 via-transparent to-accent-secondary/20 rounded-2xl" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-accent/30">
                  <div className="flex items-center space-x-3 text-sm font-jetbrains">
                    <Coffee className="w-5 h-5 text-black animate-pulse" />
                    <span className="text-black font-medium">
                      Currently coding...
                    </span>
                    <Rocket className="w-5 h-5 text-black animate-bounce" />
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className={`rounded-2xl p-6 bg-gradient-to-br ${skill.color} border border-accent/20 hover:border-accent/40 transition-all duration-300`}
                >
                  <skill.icon className="w-8 h-8 text-accent mb-3" />
                  <h4 className="font-semibold text-sm mb-2 text-foreground">
                    {skill.name}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
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
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="rounded-2xl p-8 bg-gradient-to-br from-background/30 to-background-secondary/30 backdrop-blur-sm border border-accent/20"
            >
              <h3 className="text-2xl font-bold font-space text-accent mb-6 flex items-center">
                <Code2 className="w-7 h-7 mr-3" />
                Who I Am
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-5">
                I'm <span className="text-accent font-semibold">Ansh Modi</span>
                , a Full Stack Developer from India, skilled in the MERN stack
                (MongoDB, Express.js, React, Node.js). I led the development of
                a scalable internship platform at MissionT5, delivering
                responsive front-end interfaces and robust backend systems.
                Certified by upGrad, I'm passionate about innovation and eager
                to contribute to impactful tech projects.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I believe in trying out new things and picking up challenges as
                it's always great to have knowledge in variety of subjects and
                various experiences to share. I'm more interested in{" "}
                <span className="gradient-text-secondary font-semibold">
                  developing my weaknesses into strengths
                </span>
                .
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="rounded-2xl p-8 bg-gradient-to-br from-background/30 to-background-secondary/30 backdrop-blur-sm border border-accent/20"
            >
              <h3 className="text-2xl font-bold font-space text-accent-secondary mb-6 flex items-center">
                <Palette className="w-7 h-7 mr-3" />
                What I Do
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-5">
                I'm <span className="text-accent font-semibold">Ansh Modi</span>
                , a Full Stack Developer from India, skilled in the MERN stack
                (MongoDB, Express.js, React, Node.js). I build scalable web
                applications, like the internship platform I led at MissionT5,
                creating responsive front-ends and robust backends. Certified by
                upGrad, I'm passionate about{" "}
                <span className="text-accent font-semibold">
                  innovative tech solutions
                </span>
                .
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                {[
                  "MERN Stack",
                  "HTML",
                  "CSS",
                  "Tailwind CSS",
                  "JavaScript",
                  "React",
                  "Express.js",
                  "MongoDB",
                  "Node.js",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm border border-accent/30 hover:scale-105 transition-transform"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="rounded-2xl p-8 bg-gradient-to-br from-background/30 to-background-secondary/30 backdrop-blur-sm border border-accent/20"
            >
              <h3 className="text-2xl font-bold font-space gradient-text mb-6 flex items-center">
                <Target className="w-7 h-7 mr-3" />
                My Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                As <span className="text-accent font-semibold">Ansh Modi</span>,
                a Full Stack Developer from India, my mission is to build
                innovative, user-focused web applications using the MERN stack.
                Leveraging my expertise from leading MissionT5's internship
                platform and upGrad certifications, I aim to deliver{" "}
                <span className="text-accent font-semibold">
                  impactful tech solutions
                </span>{" "}
                and drive meaningful change.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
