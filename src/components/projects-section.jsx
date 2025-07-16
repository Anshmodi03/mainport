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
  Code,
  Layers,
  Globe,
  Award,
  Eye,
  Heart,
  Download,
  Filter,
} from "lucide-react";
import { useScrollAnimation } from "../hooks/use-scroll-animation.jsx";
import { Button } from "./ui/button.jsx";
import { Badge } from "./ui/badge.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState(null);
  const projectCardsRef = useRef([]);
  const projectImageRef = useRef([]);
  const filterRef = useRef(null);

  useEffect(() => {
    // Enhanced project cards animation
    projectCardsRef.current.forEach((card, index) => {
      if (card) {
        // Entrance animation
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 100,
            rotateX: 30,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Hover effects
        const handleMouseEnter = () => {
          gsap.to(card, {
            y: -15,
            scale: 1.03,
            rotateX: 5,
            rotateY: 5,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);

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
                  scale: 1.2,
                },
                {
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                  scale: 1,
                  duration: 1.5,
                  ease: "power2.out",
                }
              );
            },
          });
        }

        // Cleanup
        return () => {
          card.removeEventListener("mouseenter", handleMouseEnter);
          card.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const categories = [
    "All",
    "Web Apps",
    "Open Source",
    "3D/AR",
    "Mobile",
    "Tools",
  ];

  const projects = [
    {
      id: 1,
      title: "EldoraUI",
      description:
        "A comprehensive open-source animated component library built with React, TypeScript, and Framer Motion. Features 50+ customizable components with smooth animations and modern design patterns.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Storybook",
      ],
      github: "https://github.com/karthikmudunuri/eldoraui",
      live: "https://www.eldoraui.site/",
      stats: { stars: "⭐ 250+", downloads: "📦 5k+", contributors: "👥 15+" },
      category: "Open Source",
      year: "2024",
      status: "Active",
      impact: "Used by 100+ developers worldwide",
      featured: true,
      color: "from-accent/30 to-accent-secondary/30",
    },
    {
      id: 2,
      title: "VR MALL",
      description:
        "An immersive 3D virtual reality mall experience built with Three.js and WebGL. Features realistic lighting, interactive product displays, and smooth navigation through virtual spaces.",
      image:
        "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      technologies: ["Three.js", "WebGL", "TypeScript", "React", "GSAP"],
      github: "https://github.com/karthikmudunuri/VRMALL",
      live: "https://vrmalldemo.netlify.app/",
      stats: { stars: "⭐ 120+", views: "👀 2k+", likes: "❤️ 85+" },
      category: "3D/AR",
      year: "2024",
      status: "Active",
      impact: "Featured in 3D development showcases",
      featured: true,
      color: "from-accent-secondary/30 to-accent/30",
    },
    {
      id: 3,
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with advanced features including real-time inventory, payment integration, and admin dashboard. Built with modern stack for optimal performance.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      technologies: ["Next.js", "Node.js", "MongoDB", "Stripe", "Redis"],
      github: "https://github.com/karthikmudunuri/ecommerce",
      live: "https://ecommerce-demo.netlify.app/",
      stats: { stars: "⭐ 95+", users: "👥 500+", revenue: "💰 $10k+" },
      category: "Web Apps",
      year: "2024",
      status: "Complete",
      impact: "Processing 500+ orders monthly",
      featured: false,
      color: "from-accent/20 to-accent-secondary/20",
    },
  ];

  const otherProjects = [
    {
      id: 4,
      title: "Portfolio Website",
      description:
        "Modern 3D portfolio with advanced animations and interactive elements",
      tech: ["React", "Three.js", "Framer Motion", "GSAP"],
      github: "#",
      live: "#",
      category: "Web Apps",
    },
    {
      id: 5,
      title: "Task Management App",
      description:
        "Full-stack productivity application with team collaboration features",
      tech: ["Next.js", "PostgreSQL", "Prisma", "Socket.io"],
      github: "#",
      live: "#",
      category: "Tools",
    },
    {
      id: 6,
      title: "Weather Dashboard",
      description:
        "Real-time weather tracking with interactive charts and forecasts",
      tech: ["React", "Chart.js", "OpenWeather API", "PWA"],
      github: "#",
      live: "#",
      category: "Web Apps",
    },
    {
      id: 7,
      title: "Mobile Fitness App",
      description:
        "Cross-platform fitness tracking with workout plans and progress monitoring",
      tech: ["React Native", "Firebase", "Redux", "Expo"],
      github: "#",
      live: "#",
      category: "Mobile",
    },
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const filteredOtherProjects =
    selectedCategory === "All"
      ? otherProjects
      : otherProjects.filter(
          (project) => project.category === selectedCategory
        );

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="parallax-bg" />

      {/* Enhanced floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element-slow absolute top-32 right-20 w-36 h-36 bg-accent/10 rounded-full blur-3xl" />
        <div className="floating-element-fast absolute bottom-32 left-20 w-44 h-44 bg-accent-secondary/10 rounded-full blur-3xl" />
        <div className="floating-element absolute top-1/4 right-1/3 w-28 h-28 bg-gradient-to-r from-accent/15 to-accent-secondary/15 rounded-full blur-xl" />
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30"
        ref={ref}
      >
        {/* Header */}
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
            <Zap className="w-6 h-6 text-white mr-3 animate-pulse" />
            <span className="text-lg font-medium text-white">
              My latest creations
            </span>
            <Zap className="w-6 h-6 text-white ml-3 animate-pulse" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Showcasing innovative solutions built with{" "}
            <span className="text-accent font-semibold">
              cutting-edge technologies
            </span>{" "}
            and{" "}
            <span className="gradient-text-secondary font-semibold">
              creative problem-solving
            </span>
            .
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
          ref={filterRef}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center space-x-2 hover-lift ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-accent/30 to-accent-secondary/30 text-accent border-2 border-accent/50 shadow-lg"
                  : "bg-background/50 text-muted-foreground hover:text-accent hover:bg-accent/10 border-2 border-accent/20"
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>{category}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Projects */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                ref={(el) => (projectCardsRef.current[index] = el)}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-background/60 to-background-secondary/60 backdrop-blur-sm border-2 border-accent/20 hover:border-accent/40 transition-all duration-500"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    ref={(el) => (projectImageRef.current[index] = el)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />

                  {/* Project badges */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    {project.featured && (
                      <Badge className="bg-accent/20 text-accent border-accent/30">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    <Badge className="bg-accent-secondary/20 text-accent-secondary border-accent-secondary/30">
                      <Calendar className="w-3 h-3 mr-1" />
                      {project.year}
                    </Badge>
                  </div>

                  {/* Status indicator */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-2 bg-background/50 backdrop-blur-sm rounded-full px-3 py-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          project.status === "Active"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                      />
                      <span className="text-xs text-foreground">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent hover:text-background transition-all"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent-secondary hover:text-background transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8 space-y-6">
                  <div className="flex items-start justify-between">
                    <h3 className="text-2xl font-bold font-space text-foreground group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <TrendingUp className="w-6 h-6 text-accent animate-pulse" />
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Project Impact */}
                  <div className="flex items-center space-x-2 text-sm text-accent">
                    <Award className="w-4 h-4" />
                    <span>{project.impact}</span>
                  </div>

                  {/* Project Stats */}
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <span key={key} className="flex items-center">
                        {value}
                      </span>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs hover:bg-accent/10 hover:border-accent/50 transition-all hover:scale-105"
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
                      className="flex-1 border-accent/30 hover:bg-accent/10"
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="flex-1 bg-gradient-to-r from-accent to-accent-secondary"
                    >
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2"
                      >
                        <Play className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Other Projects */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`other-${selectedCategory}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20"
          >
            <h3 className="text-3xl font-bold font-space text-center mb-12 gradient-text-secondary">
              Other Notable Projects
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredOtherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="group rounded-2xl p-8 bg-gradient-to-br from-background/50 to-background-secondary/50 backdrop-blur-sm border border-accent/20 hover:border-accent/40 transition-all duration-300 hover-lift"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-semibold font-space text-accent group-hover:text-accent-secondary transition-colors">
                      {project.title}
                    </h4>
                    <Layers className="w-6 h-6 text-accent-secondary" />
                  </div>

                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs hover:scale-105 transition-transform"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
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
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* View More Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-20"
        >
          <Button
            variant="outline"
            size="lg"
            className="px-12 py-6 border-2 border-accent/30 hover:bg-accent/10 rounded-2xl text-lg hover-lift"
            asChild
          >
            <a
              href="https://github.com/karthikmudunuri"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3"
            >
              <Github className="w-6 h-6" />
              <span>Explore All Projects</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
