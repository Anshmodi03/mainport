import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  Send,
  MessageCircle,
  Coffee,
  Zap,
  Heart,
  Sparkles,
  Phone,
} from "lucide-react";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { Textarea } from "./ui/textarea.jsx";
import { Label } from "./ui/label.jsx";
import { useScrollAnimation } from "../hooks/use-scroll-animation.jsx";
import { useToast } from "../hooks/use-toast.jsx";

export default function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const reasons = [
    { icon: Coffee, text: "Easy to Work With", color: "text-accent" },
    { icon: Zap, text: "Fast & Quality Code", color: "text-accent-secondary" },
    { icon: Heart, text: "Passionate About Innovation", color: "text-accent" },
    {
      icon: MessageCircle,
      text: "Clear Communication",
      color: "text-accent-secondary",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create mailto link
    const mailtoLink = `mailto:karthikmudunuri999@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    )}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    toast({
      title: "Message sent!",
      description:
        "Your email client should open now. Thank you for reaching out!",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Simplified floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-20 w-36 h-36 bg-accent/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-20 w-44 h-44 bg-accent-secondary/8 rounded-full blur-3xl animate-pulse" />
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
            <Sparkles className="w-6 h-6 text-white mr-3 animate-pulse" />
            <span className="text-lg font-medium text-white">
              Let's build something amazing
            </span>
            <Sparkles className="w-6 h-6 text-white ml-3 animate-pulse" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
          >
            Let's Connect
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Got a question, proposal, project, or want to work together on
            something?{" "}
            <span className="text-accent font-semibold">
              Let's make it happen!
            </span>
          </motion.p>
        </motion.div>

        {/* Why Work With Me Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold font-space text-center mb-12 gradient-text-secondary">
            Why Work With Me?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.text}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="rounded-2xl p-8 text-center bg-gradient-to-br from-background/30 to-background-secondary/30 backdrop-blur-sm border border-accent/20 hover:border-accent/40 transition-all duration-300"
              >
                <reason.icon
                  className={`w-10 h-10 ${reason.color} mx-auto mb-4`}
                />
                <p className="text-sm font-medium text-foreground">
                  {reason.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="rounded-3xl p-10 bg-gradient-to-br from-background/30 to-background-secondary/30 backdrop-blur-sm border border-accent/20">
              <h3 className="text-3xl font-bold font-space text-accent mb-8 flex items-center">
                <MessageCircle className="w-8 h-8 mr-3" />
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Label
                    htmlFor="name"
                    className="text-foreground text-base font-medium"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-3 bg-background/30 border-accent/30 focus:border-accent transition-all duration-300 rounded-xl"
                    placeholder="Your name"
                    required
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Label
                    htmlFor="email"
                    className="text-foreground text-base font-medium"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-3 bg-background/30 border-accent/30 focus:border-accent transition-all duration-300 rounded-xl"
                    placeholder="your@email.com"
                    required
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Label
                    htmlFor="subject"
                    className="text-foreground text-base font-medium"
                  >
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-3 bg-background/30 border-accent/30 focus:border-accent transition-all duration-300 rounded-xl"
                    placeholder="Let's work together!"
                    required
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Label
                    htmlFor="message"
                    className="text-foreground text-base font-medium"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="mt-3 bg-background/30 border-accent/30 focus:border-accent resize-none transition-all duration-300 rounded-xl"
                    placeholder="Tell me about your project..."
                    required
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Button
                    type="submit"
                    className="w-full px-8 py-6 text-white rounded-xl font-medium bg-gradient-to-r from-accent to-accent-secondary hover:from-accent/90 hover:to-accent-secondary/90 transition-all duration-300 transform hover:scale-105 text-lg"
                  >
                    <Send className="w-6 h-6 mr-3" />
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="rounded-3xl p-10 bg-gradient-to-br from-background/30 to-background-secondary/30 backdrop-blur-sm border border-accent/20">
              <h3 className="text-3xl font-bold font-space text-accent-secondary mb-6">
                Get in Touch
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                Ready to collaborate on your next project? I'm always open to
                discussing{" "}
                <span className="text-accent font-semibold">
                  new opportunities
                </span>{" "}
                and exciting challenges. Let's create something amazing
                together!
              </p>

              <div className="space-y-6">
                {[
                  {
                    href: "mailto:karthikmudunuri999@gmail.com",
                    icon: Mail,
                    title: "Email",
                    subtitle: "karthikmudunuri999@gmail.com",
                    color: "text-accent",
                  },
                  {
                    href: "https://www.linkedin.com/in/karthikmudunuri/",
                    icon: Linkedin,
                    title: "LinkedIn",
                    subtitle: "Connect with me",
                    color: "text-accent-secondary",
                  },
                  {
                    href: "https://github.com/karthikmudunuri",
                    icon: Github,
                    title: "GitHub",
                    subtitle: "Check out my code",
                    color: "text-accent",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={social.title}
                    href={social.href}
                    target={
                      social.href.startsWith("mailto") ? "_self" : "_blank"
                    }
                    rel={
                      social.href.startsWith("mailto")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-center space-x-4 text-foreground hover:text-accent transition-all duration-300 group p-4 rounded-2xl hover:bg-accent/5"
                    onMouseEnter={() => setHoveredSocial(index)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-r from-accent/20 to-accent-secondary/20 rounded-2xl flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent-secondary/30 transition-all duration-300 border border-accent/30">
                        <social.icon
                          className={`w-7 h-7 ${social.color} group-hover:scale-110 transition-transform duration-300`}
                        />
                      </div>
                      {hoveredSocial === index && (
                        <div className="absolute -inset-2 bg-accent/20 rounded-2xl blur-lg" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{social.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {social.subtitle}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="rounded-3xl p-10 bg-gradient-to-br from-background/30 to-background-secondary/30 backdrop-blur-sm border border-accent/20"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                  alt="Modern office meeting space for collaboration"
                  className="w-full h-56 object-cover rounded-2xl mb-6 hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/30 via-transparent to-accent-secondary/20 rounded-2xl" />
              </div>
              <h4 className="text-2xl font-bold font-space gradient-text mb-4 flex items-center">
                <Coffee className="w-6 h-6 mr-3" />
                Let's Collaborate
              </h4>
              <p className="text-muted-foreground text-base leading-relaxed">
                I'm always excited to work on{" "}
                <span className="text-accent font-semibold">
                  innovative projects
                </span>{" "}
                and help bring creative ideas to life. Whether it's a small
                feature or a complete application, let's discuss how we can work
                together.
              </p>
            </motion.div>

            {/* Thank You Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="rounded-3xl p-8 text-center bg-gradient-to-br from-background/30 to-background-secondary/30 backdrop-blur-sm border border-accent/20"
            >
              <h4 className="text-2xl font-bold font-space gradient-text-secondary mb-4">
                Thank You for Visiting!
              </h4>
              <p className="text-muted-foreground">
                I appreciate you taking the time to explore my portfolio.{" "}
                <span className="text-accent font-semibold">
                  Let's create something amazing together!
                </span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
