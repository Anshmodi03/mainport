import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  Database,
  Globe,
  Server,
  Smartphone,
  Sparkles,
  Zap,
  Star,
  Award,
  TrendingUp,
} from "lucide-react";
import { useScrollAnimation } from "../hooks/use-scroll-animation.jsx";

export default function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState("frontend");

  const skillCategories = {
    frontend: {
      title: "Frontend Development",
      icon: Globe,
      color: "from-blue-500/20 via-purple-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      accentColor: "text-blue-400",
      skills: [
        {
          name: "React",
          icon: "⚛️",
          color: "from-blue-400 to-cyan-400",
          proficiency: "Expert",
          years: "2+ years",
          description: "Advanced hooks, context, and state management",
          tags: ["Hooks", "Context", "Redux"],
        },
        {
          name: "Next.js",
          icon: "🔥",
          color: "from-purple-400 to-blue-400",
          proficiency: "Advanced",
          years: "1+ years",
          description: "SSR, SSG, API routes, and performance optimization",
          tags: ["SSR", "API Routes", "Performance"],
        },
        {
          name: "TypeScript",
          icon: "📘",
          color: "from-blue-500 to-indigo-500",
          proficiency: "Advanced",
          years: "1+ years",
          description: "Type safety, interfaces, and advanced patterns",
          tags: ["Types", "Interfaces", "Generics"],
        },
        {
          name: "Tailwind CSS",
          icon: "🎨",
          color: "from-cyan-400 to-teal-400",
          proficiency: "Expert",
          years: "2+ years",
          description: "Responsive design and custom component styling",
          tags: ["Responsive", "Components", "Utilities"],
        },
        {
          name: "Three.js",
          icon: "🎮",
          color: "from-purple-500 to-pink-500",
          proficiency: "Intermediate",
          years: "6 months",
          description: "3D graphics, animations, and interactive experiences",
          tags: ["3D", "WebGL", "Animation"],
        },
        {
          name: "Framer Motion",
          icon: "✨",
          color: "from-indigo-400 to-purple-400",
          proficiency: "Advanced",
          years: "1+ years",
          description: "Complex animations and gesture-based interactions",
          tags: ["Animation", "Gestures", "Transitions"],
        },
      ],
    },
    backend: {
      title: "Backend Development",
      icon: Server,
      color: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
      borderColor: "border-green-500/30",
      accentColor: "text-green-400",
      skills: [
        {
          name: "Node.js",
          icon: "🟢",
          color: "from-green-400 to-emerald-400",
          proficiency: "Advanced",
          years: "1+ years",
          description: "Server-side JavaScript and async programming",
          tags: ["Express", "Async", "APIs"],
        },
        {
          name: "Express.js",
          icon: "🚀",
          color: "from-emerald-500 to-green-500",
          proficiency: "Advanced",
          years: "1+ years",
          description: "RESTful APIs, middleware, and authentication",
          tags: ["REST", "Middleware", "Auth"],
        },
        {
          name: "PostgreSQL",
          icon: "🐘",
          color: "from-blue-500 to-blue-600",
          proficiency: "Intermediate",
          years: "6 months",
          description: "Complex queries, relationships, and optimization",
          tags: ["SQL", "Relations", "Optimization"],
        },
        {
          name: "MongoDB",
          icon: "🍃",
          color: "from-green-500 to-lime-500",
          proficiency: "Intermediate",
          years: "8 months",
          description: "NoSQL database design and aggregation pipelines",
          tags: ["NoSQL", "Aggregation", "Indexing"],
        },
        {
          name: "GraphQL",
          icon: "📊",
          color: "from-pink-500 to-rose-500",
          proficiency: "Beginner",
          years: "3 months",
          description: "Query language and schema design",
          tags: ["Queries", "Schema", "Resolvers"],
        },
        {
          name: "REST APIs",
          icon: "🔌",
          color: "from-teal-400 to-cyan-400",
          proficiency: "Advanced",
          years: "1+ years",
          description: "API design, documentation, and best practices",
          tags: ["Design", "Documentation", "Testing"],
        },
      ],
    },
    design: {
      title: "Design & Tools",
      icon: Palette,
      color: "from-pink-500/20 via-rose-500/20 to-red-500/20",
      borderColor: "border-pink-500/30",
      accentColor: "text-pink-400",
      skills: [
        {
          name: "Figma",
          icon: "🎯",
          color: "from-purple-400 to-pink-400",
          proficiency: "Expert",
          years: "2+ years",
          description: "UI/UX design, prototyping, and design systems",
          tags: ["Prototyping", "Components", "Design Systems"],
        },
        {
          name: "Adobe XD",
          icon: "🔷",
          color: "from-blue-500 to-purple-500",
          proficiency: "Advanced",
          years: "1+ years",
          description: "Interactive prototypes and user flows",
          tags: ["Prototypes", "User Flows", "Interactions"],
        },
        {
          name: "Photoshop",
          icon: "🖼️",
          color: "from-blue-600 to-indigo-600",
          proficiency: "Intermediate",
          years: "1+ years",
          description: "Photo editing and digital art creation",
          tags: ["Photo Editing", "Digital Art", "Compositing"],
        },
        {
          name: "Blender",
          icon: "🎭",
          color: "from-orange-500 to-yellow-500",
          proficiency: "Beginner",
          years: "4 months",
          description: "3D modeling and rendering for web projects",
          tags: ["3D Modeling", "Rendering", "Animation"],
        },
        {
          name: "UI/UX Design",
          icon: "✨",
          color: "from-pink-400 to-rose-400",
          proficiency: "Advanced",
          years: "2+ years",
          description: "User research, wireframing, and usability testing",
          tags: ["User Research", "Wireframing", "Testing"],
        },
        {
          name: "Prototyping",
          icon: "🔧",
          color: "from-indigo-500 to-purple-500",
          proficiency: "Advanced",
          years: "1+ years",
          description: "Interactive prototypes and user testing",
          tags: ["Interactive", "User Testing", "Iteration"],
        },
      ],
    },
    mobile: {
      title: "Mobile & Other",
      icon: Smartphone,
      color: "from-orange-500/20 via-amber-500/20 to-yellow-500/20",
      borderColor: "border-orange-500/30",
      accentColor: "text-orange-400",
      skills: [
        {
          name: "React Native",
          icon: "📱",
          color: "from-blue-400 to-cyan-400",
          proficiency: "Intermediate",
          years: "8 months",
          description: "Cross-platform mobile app development",
          tags: ["Cross-platform", "Navigation", "Native APIs"],
        },
        {
          name: "Flutter",
          icon: "🦋",
          color: "from-blue-500 to-blue-600",
          proficiency: "Beginner",
          years: "3 months",
          description: "Dart language and widget-based development",
          tags: ["Dart", "Widgets", "State Management"],
        },
        {
          name: "Git & GitHub",
          icon: "🐙",
          color: "from-gray-600 to-gray-700",
          proficiency: "Expert",
          years: "2+ years",
          description: "Version control, branching, and collaboration",
          tags: ["Branching", "Merging", "Collaboration"],
        },
        {
          name: "Docker",
          icon: "🐳",
          color: "from-blue-500 to-cyan-500",
          proficiency: "Beginner",
          years: "4 months",
          description: "Containerization and deployment workflows",
          tags: ["Containers", "Images", "Orchestration"],
        },
        {
          name: "AWS",
          icon: "☁️",
          color: "from-orange-400 to-yellow-400",
          proficiency: "Beginner",
          years: "3 months",
          description: "Cloud services and deployment infrastructure",
          tags: ["EC2", "S3", "Lambda"],
        },
        {
          name: "Linux",
          icon: "🐧",
          color: "from-yellow-500 to-orange-500",
          proficiency: "Intermediate",
          years: "1+ years",
          description: "Command line, system administration, and scripting",
          tags: ["Command Line", "Bash", "System Admin"],
        },
      ],
    },
  };

  const otherSkills = [
    {
      name: "Machine Learning",
      icon: "🤖",
      color: "from-violet-500 to-purple-500",
      status: "Learning",
    },
    {
      name: "Blockchain",
      icon: "⛓️",
      color: "from-yellow-500 to-orange-500",
      status: "Exploring",
    },
    {
      name: "AR/VR",
      icon: "🥽",
      color: "from-cyan-500 to-blue-500",
      status: "Interested",
    },
    {
      name: "DevOps",
      icon: "🚀",
      color: "from-green-500 to-teal-500",
      status: "Learning",
    },
    {
      name: "Cybersecurity",
      icon: "🔐",
      color: "from-red-500 to-rose-500",
      status: "Exploring",
    },
    {
      name: "Game Development",
      icon: "🎮",
      color: "from-purple-500 to-pink-500",
      status: "Interested",
    },
  ];

  const getProficiencyColor = (proficiency) => {
    switch (proficiency) {
      case "Expert":
        return "text-green-400 bg-green-400/20 border-green-400/30";
      case "Advanced":
        return "text-blue-400 bg-blue-400/20 border-blue-400/30";
      case "Intermediate":
        return "text-yellow-400 bg-yellow-400/20 border-yellow-400/30";
      case "Beginner":
        return "text-orange-400 bg-orange-400/20 border-orange-400/30";
      default:
        return "text-gray-400 bg-gray-400/20 border-gray-400/30";
    }
  };

  const getProficiencyIcon = (proficiency) => {
    switch (proficiency) {
      case "Expert":
        return <Award className="w-4 h-4" />;
      case "Advanced":
        return <Star className="w-4 h-4" />;
      case "Intermediate":
        return <TrendingUp className="w-4 h-4" />;
      case "Beginner":
        return <Zap className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="skills"
      className="py-20 relative overflow-hidden"
      style={{ zIndex: 25 }}
    >
      {/* Simplified floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 right-20 w-36 h-36 bg-accent/90 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 left-20 w-44 h-44 bg-accent-secondary/90 rounded-full blur-3xl animate-pulse" />
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
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
            <Sparkles className="w-6 h-6 text-blue-400 mr-3 animate-pulse" />
            <span className="text-lg font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              My technical expertise
            </span>
            <Sparkles className="w-6 h-6 text-purple-400 ml-3 animate-pulse" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
          >
            Skills & Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Constantly learning and mastering{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
              cutting-edge technologies
            </span>{" "}
            to build{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
              exceptional digital experiences
            </span>
            .
          </motion.p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {Object.entries(skillCategories).map(([key, category], index) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              onClick={() => setActiveCategory(key)}
              className={`px-8 py-4 rounded-2xl font-medium transition-all duration-300 flex items-center space-x-3 relative group ${
                activeCategory === key
                  ? `bg-gradient-to-r ${category.color} ${category.borderColor} border backdrop-blur-sm shadow-lg shadow-current/20`
                  : `bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600/30 hover:border-gray-500/50`
              }`}
            >
              <category.icon
                className={`w-5 h-5 ${
                  activeCategory === key
                    ? category.accentColor
                    : "text-gray-400"
                }`}
              />
              <span
                className={activeCategory === key ? category.accentColor : ""}
              >
                {category.title}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Display */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`relative rounded-3xl p-10 mb-16 bg-gradient-to-br from-gray-800/25 to-gray-900/25 backdrop-blur-sm border ${skillCategories[activeCategory].borderColor} shadow-2xl shadow-current/90`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${skillCategories[activeCategory].color} rounded-3xl opacity-30`}
          />
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="group relative bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  {/* Skill Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-xl bg-gradient-to-r ${skill.color} bg-opacity-20`}
                      >
                        <span className="text-2xl">{skill.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">
                          {skill.name}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 rounded-lg text-xs font-medium border flex items-center space-x-1 ${getProficiencyColor(
                              skill.proficiency
                            )}`}
                          >
                            {getProficiencyIcon(skill.proficiency)}
                            <span>{skill.proficiency}</span>
                          </span>
                          <span className="text-xs text-gray-400">
                            {skill.years}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                    {skill.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-gray-700/50 text-gray-300 rounded-lg border border-gray-600/30 hover:border-gray-500/50 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 pointer-events-none`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Other Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold font-space text-center mb-12 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Currently Exploring
          </h3>

          <div className="flex flex-wrap justify-center gap-6">
            {otherSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="group relative"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-xl`}
                />
                <div className="relative bg-gray-800/40 backdrop-blur-sm rounded-2xl px-6 py-4 border border-gray-600/30 group-hover:border-gray-500/50 transition-all">
                  <div className="flex items-center justify-between space-x-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <span className="text-base font-medium text-gray-200 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-gray-700/50 text-gray-400 rounded-lg">
                      {skill.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
