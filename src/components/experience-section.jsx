import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  ExternalLink,
  Award,
  Sparkles,
  Building,
  Users,
  TrendingUp,
  Code,
  Rocket,
  Star,
  CheckCircle,
  Zap,
  Target,
  Globe,
  Clock,
  ChevronRight,
  ArrowRight,
  Trophy,
  Lightbulb,
  Filter,
  Play,
} from "lucide-react";
import { useScrollAnimation } from "../hooks/use-scroll-animation.jsx";

export default function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [activeTab, setActiveTab] = useState("experience");

  const experiences = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "Tech Innovators Inc.",
      location: "Remote",
      duration: "Jun 2023 - Present",
      period: "8 months",
      type: "Full-time",
      status: "Current",
      description:
        "Leading development of scalable web applications and architecting microservices for enterprise-level solutions.",
      keyProjects: [
        "Built 5 enterprise applications from scratch",
        "Implemented CI/CD pipelines reducing deployment time by 75%",
        "Led cross-functional team of 8 developers",
        "Architected microservices handling 10M+ requests daily",
      ],
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "TypeScript",
        "Docker",
        "AWS",
        "GraphQL",
      ],
      achievements: [
        "60% performance improvement",
        "99.9% uptime achieved",
        "$2M revenue impact",
      ],
      icon: Rocket,
      accentColor: "cyan-400",
      featured: true,
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Creative Web Solutions",
      location: "Hyderabad, India",
      duration: "Jan 2023 - May 2023",
      period: "5 months",
      type: "Contract",
      status: "Completed",
      description:
        "Developed responsive, modern websites for diverse clients using cutting-edge technologies.",
      keyProjects: [
        "Delivered 12+ client projects on schedule",
        "Built responsive e-commerce platforms",
        "Created custom CMS solutions",
        "Integrated payment gateways and APIs",
      ],
      technologies: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "Node.js",
        "PostgreSQL",
        "Stripe",
      ],
      achievements: [
        "98% client satisfaction",
        "70% page speed improvement",
        "Zero critical bugs",
      ],
      icon: Code,
      accentColor: "purple-400",
      featured: false,
    },
    {
      id: 3,
      title: "Technical Lead & Mentor",
      company: "University Tech Club",
      location: "Woxsen University",
      duration: "Sep 2022 - Dec 2022",
      period: "4 months",
      type: "Leadership",
      status: "Completed",
      description:
        "Spearheaded technical initiatives and mentored junior developers in modern web technologies.",
      keyProjects: [
        "Led development of university event management system",
        "Organized 6 technical workshops",
        "Mentored team of 10 developers",
        "Built real-time collaboration platform",
      ],
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "Socket.io",
        "Redis",
      ],
      achievements: [
        "5000+ active users",
        "45% team productivity increase",
        "100% project delivery",
      ],
      icon: Users,
      accentColor: "emerald-400",
      featured: false,
    },
  ];

  const tabs = [
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "stats", label: "Stats", icon: Target },
  ];

  const achievements = [
    {
      title: "Open Source Contributions",
      value: "50+",
      description: "Contributions to popular repositories",
      icon: Code,
      color: "from-blue-400 to-cyan-400",
    },
    {
      title: "Projects Delivered",
      value: "25+",
      description: "Successfully completed projects",
      icon: Rocket,
      color: "from-purple-400 to-pink-400",
    },
    {
      title: "Team Members Mentored",
      value: "15+",
      description: "Developers guided and trained",
      icon: Users,
      color: "from-emerald-400 to-teal-400",
    },
    {
      title: "Technologies Mastered",
      value: "20+",
      description: "Programming languages and frameworks",
      icon: Zap,
      color: "from-amber-400 to-orange-400",
    },
  ];

  const stats = [
    { label: "Years of Experience", value: "3+", icon: Calendar },
    { label: "Client Satisfaction", value: "98%", icon: Star },
    { label: "Code Quality Score", value: "A+", icon: CheckCircle },
    { label: "Response Time", value: "<24h", icon: Clock },
  ];

  return (
    <section
      id="experience"
      className="py-12 sm:py-16 md:py-20 relative overflow-hidden"
    >
      {/* Simplified floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 sm:top-32 right-4 sm:right-20 w-24 sm:w-36 h-24 sm:h-36 bg-accent/90 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 sm:bottom-32 left-4 sm:left-20 w-28 sm:w-44 h-28 sm:h-44 bg-accent-secondary/90 rounded-full blur-3xl animate-pulse" />
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
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center justify-center mb-4 sm:mb-6"
          >
            <Sparkles className="w-4 sm:w-6 h-4 sm:h-6 text-white mr-2 sm:mr-3 animate-pulse" />
            <span className="text-sm sm:text-lg font-medium text-white">
              Professional Journey
            </span>
            <Sparkles className="w-4 sm:w-6 h-4 sm:h-6 text-white ml-2 sm:ml-3 animate-pulse" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-space mb-4 sm:mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
          >
            Experience & Growth
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4"
          >
            Crafting innovative solutions through{" "}
            <span className="text-accent font-semibold">
              continuous learning
            </span>{" "}
            and{" "}
            <span className="gradient-text-secondary font-semibold">
              collaborative excellence
            </span>
            .
          </motion.p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-8 sm:mb-12 md:mb-16 px-4"
        >
          <div className="flex bg-background/30 backdrop-blur-sm rounded-2xl p-1 sm:p-2 border border-accent/20 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-accent/30 to-accent-secondary/30 text-accent border border-accent/30"
                    : "text-muted-foreground hover:text-accent hover:bg-accent/90"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm sm:text-base">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "experience" && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
                {experiences.map((experience, index) => (
                  <motion.div
                    key={experience.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-background/40 to-background-secondary/40 backdrop-blur-sm border-2 border-accent/20 hover:border-accent/40 transition-all duration-500"
                  >
                    {/* Status Badge */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                      <div
                        className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                          experience.status === "Current"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        }`}
                      >
                        <div
                          className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${
                            experience.status === "Current"
                              ? "bg-green-500"
                              : "bg-blue-500"
                          }`}
                        />
                        <span className="hidden sm:inline">
                          {experience.status}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6 md:p-8">
                      {/* Header */}
                      <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                        <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shadow-lg flex-shrink-0">
                          <experience.icon className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 leading-tight">
                            {experience.title}
                          </h3>
                          <p className="text-base sm:text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-1">
                            {experience.company}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-gray-400 space-y-1 sm:space-y-0">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{experience.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{experience.period}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm">
                        {experience.description}
                      </p>

                      {/* Key Projects */}
                      <div className="mb-4 sm:mb-6">
                        <h4 className="text-sm font-semibold text-accent mb-2 sm:mb-3 flex items-center">
                          <Lightbulb className="w-4 h-4 mr-2" />
                          Key Projects
                        </h4>
                        <div className="space-y-1 sm:space-y-2">
                          {experience.keyProjects
                            .slice(0, 2)
                            .map((project, i) => (
                              <div
                                key={i}
                                className="flex items-start space-x-2"
                              >
                                <ChevronRight className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                                <span className="text-xs text-gray-300">
                                  {project}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="mb-4 sm:mb-6">
                        <h4 className="text-sm font-semibold text-purple-300 mb-2 sm:mb-3 flex items-center">
                          <Code className="w-4 h-4 mr-2" />
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
                          {experience.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-slate-700/50 text-gray-300 rounded-full text-xs border border-slate-600/50 hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-200"
                            >
                              {tech}
                            </span>
                          ))}
                          {experience.technologies.length > 4 && (
                            <span className="px-2 py-1 bg-slate-700/50 text-gray-400 rounded-full text-xs">
                              +{experience.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="space-y-1 sm:space-y-2">
                        {experience.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <Award className="w-3 h-3 text-amber-400" />
                            <span className="text-xs text-amber-300">
                              {achievement}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* View More Button */}
                      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-700/50">
                        <button className="flex items-center space-x-2 text-accent hover:text-accent-secondary transition-colors text-sm font-medium">
                          <span>View Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "achievements" && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-background/30 to-background-secondary/30 backdrop-blur-sm border-2 border-accent/20 hover:border-accent/40 transition-all duration-300 group"
                  >
                    <div
                      className={`w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-xl sm:rounded-2xl bg-gradient-to-r ${achievement.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <achievement.icon className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                    </div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-space gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                      {achievement.value}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "stats" && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-background/30 to-background-secondary/30 backdrop-blur-sm border-2 border-accent/20 hover:border-accent/40 transition-all duration-300 group"
                  >
                    <stat.icon className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-accent mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-2xl sm:text-3xl font-bold font-space gradient-text mb-2">
                      {stat.value}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-12 sm:mt-16 md:mt-20"
        >
          <div className="relative group max-w-4xl mx-auto">
            <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-background/30 to-background-secondary/30 backdrop-blur-sm border-2 border-accent/20 hover:border-accent/40 transition-all duration-300">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-accent to-accent-secondary rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <Rocket className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                <span className="gradient-text">
                  Let's Build Something Amazing
                </span>
              </h3>

              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                Ready to take on exciting challenges and create innovative
                solutions. Let's connect and turn ideas into reality!
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-accent to-accent-secondary text-white font-semibold rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg">
                  <div className="relative flex items-center justify-center space-x-2">
                    <ExternalLink className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span className="text-sm sm:text-base">
                      Download Resume
                    </span>
                  </div>
                </button>

                <button className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-accent text-accent font-semibold rounded-xl sm:rounded-2xl hover:bg-accent hover:text-background transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg">
                  <Globe className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="text-sm sm:text-base">Let's Connect</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
