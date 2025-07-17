import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
} from "lucide-react";
import { useScrollAnimation } from "../hooks/use-scroll-animation.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation();
  const timelineRef = useRef(null);
  const experienceCardsRef = useRef([]);
  const statsRef = useRef([]);
  const headerRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Stats animation
      if (statsRef.current && Array.isArray(statsRef.current)) {
        statsRef.current.forEach((stat, index) => {
          if (stat) {
            gsap.fromTo(
              stat,
              { scale: 0.8, opacity: 0, rotateY: 180 },
              {
                scale: 1,
                opacity: 1,
                rotateY: 0,
                duration: 0.6,
                delay: index * 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                  trigger: stat,
                  start: "top 90%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });
      }

      // Timeline animation
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current,
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Experience cards animation
      experienceCardsRef.current.forEach((card, index) => {
        if (card) {
          const isEven = index % 2 === 0;

          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: isEven ? -100 : 100,
              y: 50,
              rotateX: 15,
              scale: 0.9,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotateX: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              delay: index * 0.3,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Enhanced hover effects
          const handleMouseEnter = () => {
            gsap.to(card, {
              y: -8,
              scale: 1.02,
              rotateX: 2,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          card.addEventListener("mouseenter", handleMouseEnter);
          card.addEventListener("mouseleave", handleMouseLeave);

          return () => {
            card.removeEventListener("mouseenter", handleMouseEnter);
            card.removeEventListener("mouseleave", handleMouseLeave);
          };
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isVisible]);

  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Innovators Inc.",
      location: "Remote",
      duration: "Jun 2023 - Present",
      type: "Full-time",
      description:
        "Leading development of scalable web applications using React.js and Node.js. Architecting microservices and implementing CI/CD pipelines for improved deployment efficiency.",
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "TypeScript",
        "Docker",
        "AWS",
      ],
      achievements: [
        "Architected 5+ enterprise applications from scratch",
        "Improved performance by 60% through optimization",
        "Led team of 8 developers in agile environment",
        "Reduced deployment time by 75% with CI/CD",
      ],
      icon: Rocket,
      gradient: "from-cyan-500/20 via-blue-500/20 to-indigo-500/20",
      iconGradient: "from-cyan-400 to-blue-500",
      highlight: true,
    },
    {
      title: "Full Stack Developer",
      company: "Creative Web Solutions",
      location: "Hyderabad, India",
      duration: "Jan 2023 - May 2023",
      type: "Contract",
      description:
        "Developed responsive, modern websites for diverse clients using React, Next.js, and Node.js. Focused on creating seamless user experiences.",
      technologies: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "Node.js",
        "PostgreSQL",
      ],
      achievements: [
        "Delivered 12+ client projects on schedule",
        "Achieved 98% client satisfaction rate",
        "Reduced page load times by 70%",
        "Implemented responsive designs",
      ],
      icon: Code,
      gradient: "from-purple-500/20 via-pink-500/20 to-rose-500/20",
      iconGradient: "from-purple-400 to-pink-500",
      highlight: false,
    },
    {
      title: "Technical Lead & Mentor",
      company: "University Tech Club",
      location: "Woxsen University",
      duration: "Sep 2022 - Dec 2022",
      type: "Leadership",
      description:
        "Spearheaded technical initiatives and mentored junior developers. Led development of university's event management system.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
      achievements: [
        "Mentored team of 10 developers",
        "Organized 6 technical workshops",
        "Built system serving 5000+ users",
        "Improved team productivity by 45%",
      ],
      icon: Users,
      gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
      iconGradient: "from-emerald-400 to-teal-500",
      highlight: false,
    },
  ];

  const stats = [
    {
      number: "25+",
      label: "Projects Completed",
      icon: Target,
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      number: "3+",
      label: "Years Experience",
      icon: Calendar,
      gradient: "from-purple-400 to-pink-500",
    },
    {
      number: "98%",
      label: "Client Satisfaction",
      icon: Star,
      gradient: "from-amber-400 to-orange-500",
    },
    {
      number: "15+",
      label: "Technologies",
      icon: Code,
      gradient: "from-emerald-400 to-teal-500",
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
              Professional Journey
            </span>
            <Sparkles className="w-6 h-6 text-white ml-3 animate-pulse" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space modern-heading section-heading mb-6 text-shadow-glow bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
          >
            Experience & Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Building innovative solutions through{" "}
            <span className="text-accent font-semibold">
              cutting-edge technology
            </span>{" "}
            and{" "}
            <span className="gradient-text-secondary font-semibold">
              collaborative excellence
            </span>
            .
          </motion.p>
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              ref={(el) => {
                if (el && statsRef.current) {
                  statsRef.current[index] = el;
                }
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="text-center glow-border p-8 hover-lift rounded-2xl bg-gradient-to-br from-background/50 to-background-secondary/50 backdrop-blur-sm"
            >
              <stat.icon className="w-10 h-10 text-accent mx-auto mb-4" />
              <div className="stat-number text-4xl font-bold font-space gradient-text mb-2">
                {stat.number}
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line - Hidden on mobile */}
          <div
            ref={timelineRef}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-blue-500 transform -translate-x-0.5 rounded-full"
          />

          {/* Mobile Timeline Line */}
          <div className="lg:hidden absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-blue-500 rounded-full" />

          <div className="space-y-6 sm:space-y-8 lg:space-y-12 xl:space-y-16">
            {experiences.map((experience, index) => (
              <div
                key={index}
                ref={(el) => (experienceCardsRef.current[index] = el)}
                className={`relative flex flex-col lg:flex-row lg:items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 lg:left-1/2 w-4 h-4 lg:w-6 lg:h-6 transform -translate-x-1/2 lg:-translate-x-3 z-20">
                  <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full border-2 lg:border-4 border-slate-900"></div>
                  {experience.highlight && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-amber-500 rounded-full flex items-center justify-center">
                      <Star className="w-1.5 h-1.5 lg:w-2 lg:h-2 text-slate-900" />
                    </div>
                  )}
                </div>

                {/* Content Card */}
                <div
                  className={`w-full lg:w-5/12 ml-8 lg:ml-0 ${
                    index % 2 === 0 ? "lg:pr-8 xl:pr-12" : "lg:pl-8 xl:pl-12"
                  }`}
                >
                  <div
                    className={`relative group bg-gradient-to-br ${experience.gradient} p-0.5 rounded-2xl sm:rounded-3xl`}
                  >
                    <div className="glow-border rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 hover-lift bg-gradient-to-br from-background/50 to-background-secondary/50 backdrop-blur-sm">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
                        <div className="flex items-start space-x-3 sm:space-x-4">
                          <div
                            className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${experience.iconGradient} flex items-center justify-center shadow-lg flex-shrink-0`}
                          >
                            <experience.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-white mb-1 leading-tight">
                              {experience.title}
                            </h3>
                            <p className="text-sm sm:text-base lg:text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                              {experience.company}
                            </p>
                          </div>
                        </div>
                        <div className="flex-shrink-0 self-start">
                          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-700/50 text-cyan-300 rounded-full text-xs sm:text-sm font-medium border border-cyan-500/30">
                            {experience.type}
                          </span>
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-col sm:flex-row sm:gap-6 gap-2 sm:gap-3 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
                          <span>{experience.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0" />
                          <span>{experience.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 lg:mb-8 text-xs sm:text-sm lg:text-base">
                        {experience.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-4 sm:mb-6 lg:mb-8">
                        <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-cyan-300 mb-3 sm:mb-4 flex items-center">
                          <Award className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2 flex-shrink-0" />
                          Key Achievements
                        </h4>
                        <div className="grid grid-cols-1 gap-2 sm:gap-3">
                          {experience.achievements.map((achievement, i) => (
                            <div
                              key={i}
                              className="flex items-start space-x-2 sm:space-x-3"
                            >
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                              <span className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                                {achievement}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-purple-300 mb-3 sm:mb-4 flex items-center">
                          <Code className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2 flex-shrink-0" />
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-3">
                          {experience.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 bg-slate-700/50 text-gray-300 rounded-full text-xs sm:text-sm border border-slate-600/50 hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacer for desktop */}
                <div className="hidden lg:block w-2/12" />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-12 sm:mt-16 lg:mt-20"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent-secondary/20 to-accent/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative glow-border rounded-3xl p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto hover-lift bg-gradient-to-br from-background/50 to-background-secondary/50 backdrop-blur-sm">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-accent to-accent-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                <span className="gradient-text">Ready for New Challenges</span>
              </h3>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto">
                I'm excited to take on innovative projects and collaborate with
                talented teams. Let's connect and create something amazing
                together!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-accent to-accent-secondary text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center space-x-2">
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">View Resume</span>
                  </div>
                </button>

                <button className="group px-6 py-3 sm:px-8 sm:py-4 border-2 border-accent text-accent font-semibold rounded-2xl hover:bg-accent hover:text-background transition-all duration-300 flex items-center justify-center space-x-2">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
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
