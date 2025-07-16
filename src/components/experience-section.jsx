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
} from "lucide-react";
import { useScrollAnimation } from "../hooks/use-scroll-animation.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation();
  const timelineRef = useRef(null);
  const experienceCardsRef = useRef([]);

  useEffect(() => {
    if (isVisible && timelineRef.current) {
      // Timeline animation
      gsap.fromTo(
        timelineRef.current,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Experience cards stagger animation
      experienceCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: index % 2 === 0 ? -100 : 100,
              rotateY: index % 2 === 0 ? -15 : 15,
            },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
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
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -10,
              scale: 1.02,
              rotateX: 5,
              duration: 0.4,
              ease: "power2.out",
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: 0.4,
              ease: "power2.out",
            });
          });
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
        "Architected and built 5 enterprise-level applications from scratch",
        "Improved application performance by 60% through optimization",
        "Led a team of 8 developers in agile environment",
        "Reduced deployment time by 75% with automated CI/CD pipelines",
      ],
      icon: Rocket,
      color: "from-accent/20 to-accent-secondary/20",
      highlight: true,
    },
    {
      title: "Full Stack Developer",
      company: "Creative Web Solutions",
      location: "Hyderabad, India",
      duration: "Jan 2023 - May 2023",
      type: "Contract",
      description:
        "Developed responsive, modern websites for diverse clients using React, Next.js, and Node.js. Focused on creating seamless user experiences and implementing cutting-edge web technologies.",
      technologies: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "Node.js",
        "PostgreSQL",
      ],
      achievements: [
        "Delivered 12+ high-quality client projects on schedule",
        "Achieved 98% client satisfaction rate with exceptional feedback",
        "Reduced page load times by 70% through advanced optimization",
        "Implemented responsive designs across all device types",
      ],
      icon: Code,
      color: "from-accent-secondary/20 to-accent/20",
      highlight: false,
    },
    {
      title: "Technical Lead & Mentor",
      company: "University Tech Club",
      location: "Woxsen University",
      duration: "Sep 2022 - Dec 2022",
      type: "Leadership",
      description:
        "Spearheaded technical initiatives and mentored junior developers. Led the development of university's comprehensive event management system and organized skill-building workshops.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
      achievements: [
        "Successfully managed and mentored team of 10 developers",
        "Organized 6 comprehensive technical workshops",
        "Built scalable event management system serving 5000+ users",
        "Improved team productivity by 45% through effective leadership",
      ],
      icon: Users,
      color: "from-accent/20 to-accent-secondary/20",
      highlight: false,
    },
  ];

  const stats = [
    { number: "25+", label: "Projects Completed", icon: Briefcase },
    { number: "3+", label: "Years Experience", icon: Calendar },
    { number: "98%", label: "Client Satisfaction", icon: Star },
    { number: "15+", label: "Technologies", icon: Code },
  ];

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background-secondary/95 to-background/95" />

      {/* Enhanced floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element-slow absolute top-32 right-20 w-32 h-32 bg-accent/8 rounded-full blur-3xl" />
        <div className="floating-element-fast absolute bottom-32 left-20 w-40 h-40 bg-accent-secondary/8 rounded-full blur-3xl" />
        <div className="floating-element absolute top-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-accent/10 to-accent-secondary/10 rounded-full blur-2xl" />
        <div className="floating-element absolute bottom-1/4 right-1/4 w-28 h-28 bg-gradient-to-r from-accent-secondary/10 to-accent/10 rounded-full blur-2xl" />
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
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
          >
            Experience & Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Building innovative solutions and leading teams through{" "}
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

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="text-center glow-border rounded-2xl p-6 bg-gradient-to-br from-background/50 to-background-secondary/50 backdrop-blur-sm hover-lift"
            >
              <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
              <div className="text-3xl font-bold text-accent mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div
            ref={timelineRef}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent-secondary to-accent transform md:-translate-x-0.5 rounded-full"
          />

          <div className="space-y-16">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                ref={(el) => (experienceCardsRef.current[index] = el)}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 w-6 h-6 bg-gradient-to-r from-accent to-accent-secondary rounded-full transform md:-translate-x-3 border-4 border-background shadow-lg z-10">
                  <div className="w-full h-full bg-gradient-to-r from-accent to-accent-secondary rounded-full animate-pulse" />
                </div>

                {/* Content */}
                <div
                  className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                    index % 2 === 0 ? "md:pr-16" : "md:pl-16"
                  }`}
                >
                  <div
                    className={`relative glow-border rounded-3xl p-8 bg-gradient-to-br from-background/60 to-background-secondary/60 backdrop-blur-sm ${
                      experience.highlight ? "ring-2 ring-accent/50" : ""
                    }`}
                  >
                    {experience.highlight && (
                      <div className="absolute -top-3 -right-3 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-background" />
                      </div>
                    )}

                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent-secondary/20 rounded-2xl flex items-center justify-center border border-accent/30">
                          <experience.icon className="w-8 h-8 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-1">
                            {experience.title}
                          </h3>
                          <p className="text-lg text-accent font-semibold">
                            {experience.company}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium border border-accent/30">
                          {experience.type}
                        </span>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-wrap gap-6 mb-6 text-sm text-muted-foreground">
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
                    <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                      {experience.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-accent mb-4 flex items-center">
                        <Award className="w-5 h-5 mr-2" />
                        Key Achievements
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {experience.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-accent-secondary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground leading-relaxed">
                              {achievement}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-lg font-semibold text-accent-secondary mb-4 flex items-center">
                        <Code className="w-5 h-5 mr-2" />
                        Technologies & Tools
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {experience.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-4 py-2 bg-background/50 text-foreground rounded-full text-sm border border-accent/20 hover:border-accent/50 transition-all hover:scale-105"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
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
          className="text-center mt-20"
        >
          <div className="glow-border rounded-3xl p-10 bg-gradient-to-br from-background/60 to-background-secondary/60 backdrop-blur-sm max-w-3xl mx-auto">
            <TrendingUp className="w-12 h-12 text-accent mx-auto mb-6" />
            <h3 className="text-3xl font-bold font-space gradient-text mb-6">
              Ready for New Challenges
            </h3>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              I'm always excited to take on innovative projects and collaborate
              with talented teams. Let's connect and explore how we can create
              something amazing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-accent to-accent-secondary text-background font-semibold rounded-2xl hover:scale-105 transition-transform flex items-center justify-center space-x-2">
                <ExternalLink className="w-5 h-5" />
                <span>View My Resume</span>
              </button>
              <button className="px-8 py-4 border-2 border-accent text-accent font-semibold rounded-2xl hover:bg-accent hover:text-background transition-all flex items-center justify-center space-x-2">
                <Building className="w-5 h-5" />
                <span>Let's Connect</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
