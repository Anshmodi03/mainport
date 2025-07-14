import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  ExternalLink,
  Award,
  Sparkles,
  Building,
  Users,
} from "lucide-react";
import { useScrollAnimation } from "../hooks/use-scroll-animation.jsx";

export default function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation();

  const experiences = [
    {
      title: "Full Stack Developer Intern",
      company: "Tech Innovators Inc.",
      location: "Remote",
      duration: "Jun 2023 - Present",
      type: "Internship",
      description:
        "Developed responsive web applications using React.js and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
      achievements: [
        "Built 3 full-stack applications from scratch",
        "Improved application performance by 40%",
        "Collaborated with 5+ team members on agile projects",
      ],
      icon: Briefcase,
      color: "from-accent/20 to-accent-secondary/20",
    },
    {
      title: "Frontend Developer",
      company: "Creative Web Solutions",
      location: "Hyderabad, India",
      duration: "Jan 2023 - May 2023",
      type: "Freelance",
      description:
        "Created modern, responsive websites for local businesses using React and Next.js. Focused on user experience and performance optimization.",
      technologies: ["React", "Next.js", "Tailwind CSS", "Figma", "JavaScript"],
      achievements: [
        "Delivered 8+ client projects on time",
        "Achieved 95% client satisfaction rate",
        "Reduced page load times by 60%",
      ],
      icon: Building,
      color: "from-accent-secondary/20 to-accent/20",
    },
    {
      title: "Web Development Team Lead",
      company: "University Tech Club",
      location: "Woxsen University",
      duration: "Sep 2022 - Dec 2022",
      type: "Leadership",
      description:
        "Led a team of 6 developers in creating the university's event management system. Organized workshops and mentored junior developers.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      achievements: [
        "Managed team of 6 developers",
        "Organized 4 technical workshops",
        "Built university event management system",
      ],
      icon: Users,
      color: "from-accent/20 to-accent-secondary/20",
    },
  ];

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="parallax-bg" />

      {/* Enhanced floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element-slow absolute top-32 right-20 w-28 h-28 bg-accent/10 rounded-full blur-2xl" />
        <div className="floating-element-fast absolute bottom-32 left-20 w-36 h-36 bg-accent-secondary/10 rounded-full blur-3xl" />
        <div className="floating-element absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-r from-accent/15 to-accent-secondary/15 rounded-full blur-xl" />
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
              My professional journey
            </span>
            <Sparkles className="w-6 h-6 text-white ml-3 animate-pulse" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space modern-heading section-heading mb-6 text-shadow-glow bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
          >
            Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            My journey through{" "}
            <span className="text-accent font-semibold">
              professional development
            </span>{" "}
            and{" "}
            <span className="gradient-text-secondary font-semibold">
              meaningful contributions
            </span>
            .
          </motion.p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent-secondary to-accent opacity-30 transform md:-translate-x-0.5" />

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-gradient-to-r from-accent to-accent-secondary rounded-full transform md:-translate-x-2 md:-translate-y-2 border-4 border-background shadow-lg" />

                {/* Content */}
                <div
                  className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className={`glow-border rounded-2xl p-8 hover-lift bg-gradient-to-br from-background/50 to-background-secondary/50 backdrop-blur-sm ${experience.color}`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-accent/20 to-accent-secondary/20 rounded-xl flex items-center justify-center border border-accent/30">
                          <experience.icon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">
                            {experience.title}
                          </h3>
                          <p className="text-accent font-semibold">
                            {experience.company}
                          </p>
                        </div>
                      </div>
                      <span className="badge badge-secondary text-xs">
                        {experience.type}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{experience.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {experience.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-accent mb-3 flex items-center">
                        <Award className="w-4 h-4 mr-2" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {experience.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground flex items-start"
                          >
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-sm font-semibold text-accent-secondary mb-3">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="badge badge-outline text-xs hover:scale-105 transition-transform"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Spacer for desktop */}
                <div className="hidden md:block w-2/12" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glow-border rounded-2xl p-8 bg-gradient-to-br from-background/50 to-background-secondary/50 backdrop-blur-sm max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold font-space gradient-text mb-4">
              Ready for New Opportunities
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I'm always excited to take on new challenges and contribute to
              innovative projects. Let's connect and explore how we can work
              together!
            </p>
            <button className="btn btn-primary hover:scale-105 transition-transform">
              <ExternalLink className="w-4 h-4 mr-2" />
              View My Resume
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
