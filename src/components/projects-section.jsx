import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, Calendar, Users, TrendingUp } from 'lucide-react';
import { Button } from './ui/button.jsx';
import { Badge } from './ui/badge.jsx';
import { useScrollAnimation } from '../hooks/use-scroll-animation.jsx';

export default function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      title: "EldoraUI",
      description: "Open-source animated components built with React, TypeScript, Tailwind CSS, and Framer Motion. 100% open-source and customizable component library.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/karthikmudunuri/eldoraui",
      live: "https://www.eldoraui.site/",
      featured: ["React", "TypeScript", "Tailwind"],
      stats: { stars: "⭐ 150+", users: "👥 1k+", status: "🟢 Active" },
      category: "Open Source Library",
      year: "2024"
    },
    {
      title: "VR MALL",
      description: "Developed a virtual mall experience using Three.js and TypeScript. An immersive 3D environment showcasing advanced WebGL techniques.",
      image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      technologies: ["Three.js", "WebGL", "TypeScript", "React"],
      github: "https://github.com/karthikmudunuri/VRMALL",
      live: "https://vrmalldemo.netlify.app/",
      featured: ["Three.js", "WebGL", "TypeScript"],
      stats: { stars: "⭐ 85+", users: "👥 500+", status: "🟢 Active" },
      category: "3D Web Experience",
      year: "2024"
    }
  ];

  const otherProjects = [
    { 
      title: "Portfolio Website", 
      description: "Modern 3D portfolio with advanced animations",
      tech: ["React", "Three.js", "Framer Motion"],
      github: "#",
      live: "#"
    },
    { 
      title: "Task Management App", 
      description: "Full-stack productivity application",
      tech: ["Next.js", "PostgreSQL", "Prisma"],
      github: "#",
      live: "#"
    },
    { 
      title: "Weather Dashboard", 
      description: "Real-time weather tracking with charts",
      tech: ["React", "Chart.js", "OpenWeather API"],
      github: "#",
      live: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="parallax-bg" />
      
      {/* Enhanced floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element-slow absolute top-20 left-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
        <div className="floating-element-fast absolute bottom-20 right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl" />
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
            Featured Work
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Check out some of my recent projects showcasing modern web development and creative problem-solving.
          </motion.p>
        </motion.div>
        
        {/* Featured Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="project-card glow-border rounded-2xl overflow-hidden hover-lift"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative mb-6 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                
                {/* Project Category */}
                <div className="absolute top-4 left-4">
                  <Badge className="badge-secondary text-xs">
                    {project.category}
                  </Badge>
                </div>
                
                {/* Project Year */}
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {project.year}
                  </Badge>
                </div>
                
                {/* Featured Technologies */}
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  {project.featured.map((tech) => (
                    <Badge key={tech} variant="secondary" className="badge-secondary text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold font-space text-accent">{project.title}</h3>
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                
                {/* Project Stats */}
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{project.stats.stars}</span>
                  <span>{project.stats.users}</span>
                  <span>{project.stats.status}</span>
                </div>
                
                {/* All Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs badge-outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <Button variant="outline" size="sm" asChild className="flex-1">
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
        
        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold font-space text-center mb-8 gradient-text">
            Other Notable Projects
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="glass-effect rounded-xl p-6 hover-lift magnetic-effect"
              >
                <h4 className="text-lg font-semibold font-space text-accent mb-2">{project.title}</h4>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs badge-outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <a 
                    href={project.github} 
                    className="text-muted-foreground hover:text-accent transition-colors"
                    title="View Code"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a 
                    href={project.live} 
                    className="text-muted-foreground hover:text-accent transition-colors"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* View More Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-12"
        >
          <Button 
            variant="outline" 
            size="lg" 
            className="glow-border px-8 py-4 hover-lift"
            asChild
          >
            <a 
              href="https://github.com/karthikmudunuri" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <Github className="w-5 h-5" />
              <span>View All Projects</span>
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}