import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ExternalLink,
  Github,
  Zap,
  Play,
  Star,
  TrendingUp,
  Calendar,
  Users,
  Sparkles,
} from "lucide-react";
import { useScrollAnimation } from "../hooks/use-scroll-animation.jsx";
import { Button } from "./ui/button.jsx";
import { Badge } from "./ui/badge.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const projectCardsRef = useRef([]);
  const projectImageRef = useRef([]);

  useEffect(() => {
    // 3D tilt effect on project cards
    projectCardsRef.current.forEach((card, index) => {
      if (card) {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;

          gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
          });
        });

        // Image reveal animation
        const img = projectImageRef.current[index];
        if (img) {
          ScrollTrigger.create({
            trigger: card,
            start: "top 85%",
            onEnter: () => {
              gsap.fromTo(
                img,
                {
                  clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
                },
                {
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                  duration: 1.5,
                  ease: "power2.out",
                }
              );
            },
          });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const projects = [
    {
      title: "EldoraUI",
      description:
        "Open-source animated components built with React, TypeScript, Tailwind CSS, and Framer Motion. 100% open-source and customizable component library.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/karthikmudunuri/eldoraui",
      live: "https://www.eldoraui.site/",
      featured: ["React", "TypeScript", "Tailwind"],
      stats: { stars: "⭐ 150+", users: "👥 1k+", status: "🟢 Active" },
      category: "Open Source Library",
      year: "2024",
    },
    {
      title: "VR MALL",
      description:
        "Developed a virtual mall experience using Three.js and TypeScript. An immersive 3D environment showcasing advanced WebGL techniques.",
      image:
        "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      technologies: ["Three.js", "WebGL", "TypeScript", "React"],
      github: "https://github.com/karthikmudunuri/VRMALL",
      live: "https://vrmalldemo.netlify.app/",
      featured: ["Three.js", "WebGL", "TypeScript"],
      stats: { stars: "⭐ 85+", users: "👥 500+", status: "🟢 Active" },
      category: "3D Web Experience",
      year: "2024",
    },
  ];

  const otherProjects = [
    {
      title: "Portfolio Website",
      description: "Modern 3D portfolio with advanced animations",
      tech: ["React", "Three.js", "Framer Motion"],
      github: "#",
      live: "#",
    },
    {
      title: "Task Management App",
      description: "Full-stack productivity application",
      tech: ["Next.js", "PostgreSQL", "Prisma"],
      github: "#",
      live: "#",
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather tracking with charts",
      tech: ["React", "Chart.js", "OpenWeather API"],
      github: "#",
      live: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="parallax-bg" />

      {/* Enhanced floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element-slow absolute top-20 left-10 w-44 h-44 bg-accent/8 rounded-full blur-3xl" />
        <div className="floating-element-fast absolute bottom-20 right-10 w-36 h-36 bg-accent-secondary/8 rounded-full blur-2xl" />
        <div className="floating-element absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-accent/10 to-accent-secondary/10 rounded-full blur-xl" />
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
              My latest creations
            </span>
            <Zap className="w-6 h-6 text-accent ml-3 animate-pulse" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space gradient-text mb-6 text-shadow-glow"
          >
            Featured Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Check out some of my recent projects showcasing{" "}
            <span className="text-accent font-semibold">
              modern web development
            </span>{" "}
            and{" "}
            <span className="gradient-text-secondary font-semibold">
              creative problem-solving
            </span>
            .
          </motion.p>
        </motion.div>

        {/* Enhanced Featured Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              ref={(el) => (projectCardsRef.current[index] = el)}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="project-card glow-border rounded-3xl overflow-hidden hover-lift bg-gradient-to-br from-background/50 to-background-secondary/50 backdrop-blur-sm"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative mb-6 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  ref={(el) => (projectImageRef.current[index] = el)}
                  className="w-full h-56 object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />

                {/* Project Category */}
                <div className="absolute top-4 left-4">
                  <Badge className="badge-secondary text-xs bg-accent/20 text-accent border-accent/30">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {project.category}
                  </Badge>
                </div>

                {/* Project Year */}
                <div className="absolute top-4 right-4">
                  <Badge
                    variant="outline"
                    className="text-xs bg-background/50 backdrop-blur-sm border-accent-secondary/30 text-accent-secondary"
                  >
                    <Calendar className="w-3 h-3 mr-1" />
                    {project.year}
                  </Badge>
                </div>

                {/* Featured Technologies */}
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  {project.featured.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="badge-secondary text-xs bg-accent-secondary/20 text-accent-secondary border-accent-secondary/30"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold font-space gradient-text">
                    {project.title}
                  </h3>
                  <TrendingUp className="w-6 h-6 text-accent animate-pulse" />
                </div>

                <p className="text-muted-foreground leading-relaxed text-base">
                  {project.description}
                </p>

                {/* Project Stats */}
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-accent" />
                    {project.stats.stars.replace("⭐ ", "")}
                  </span>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1 text-accent-secondary" />
                    {project.stats.users.replace("👥 ", "")}
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                    Active
                  </span>
                </div>

                {/* All Technologies */}
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="text-xs badge-outline hover:bg-accent/10 hover:border-accent/50 transition-all"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1 glow-border"
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  </Button>
                  <Button size="sm" asChild className="flex-1 liquid-button">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold font-space text-center mb-12 gradient-text-secondary">
            Other Notable Projects
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="glass-effect rounded-2xl p-8 hover-lift magnetic-effect bg-gradient-to-br from-background/30 to-background-secondary/30 backdrop-blur-sm border border-accent/20"
              >
                <h4 className="text-xl font-semibold font-space text-accent mb-3">
                  {project.title}
                </h4>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="text-xs badge-outline"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    className="text-muted-foreground hover:text-accent transition-colors duration-300 hover:scale-110 transform"
                    title="View Code"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={project.live}
                    className="text-muted-foreground hover:text-accent-secondary transition-colors duration-300 hover:scale-110 transform"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced View More Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-16"
        >
          <Button
            variant="outline"
            size="lg"
            className="glow-border px-12 py-6 hover-lift rounded-2xl text-lg"
            asChild
          >
            <a
              href="https://github.com/karthikmudunuri"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3"
            >
              <Github className="w-6 h-6" />
              <span>View All Projects</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
