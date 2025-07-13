import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, MessageCircle, Coffee, Zap, Heart } from 'lucide-react';
import { Button } from './ui/button.jsx';
import { Input } from './ui/input.jsx';
import { Textarea } from './ui/textarea.jsx';
import { Label } from './ui/label.jsx';
import { useScrollAnimation } from '../hooks/use-scroll-animation.jsx';
import { useToast } from '../hooks/use-toast.jsx';

export default function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const reasons = [
    { icon: Coffee, text: "Easy to Work With" },
    { icon: Zap, text: "Fast & Quality Code" },
    { icon: Heart, text: "Passionate About Innovation" },
    { icon: MessageCircle, text: "Clear Communication" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link
    const mailtoLink = `mailto:karthikmudunuri999@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    toast({
      title: "Message sent!",
      description: "Your email client should open now. Thank you for reaching out!",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="parallax-bg" />
      
      {/* Enhanced floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element-slow absolute top-32 left-20 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
        <div className="floating-element-fast absolute bottom-32 right-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl" />
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
            Let's Connect
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Got a question, proposal, project, or want to work together on something? Let's make it happen!
          </motion.p>
        </motion.div>
        
        {/* Why Work With Me Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold font-space text-center mb-8 gradient-text">
            Why Work With Me?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.text}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="glass-effect rounded-xl p-6 text-center hover-lift magnetic-effect"
              >
                <reason.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground">{reason.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glow-border rounded-2xl p-8 hover-lift">
              <h3 className="text-2xl font-bold font-space text-accent mb-6 flex items-center">
                <MessageCircle className="w-6 h-6 mr-2" />
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Label htmlFor="name" className="text-foreground">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 bg-muted/20 border-accent/30 focus:border-accent transition-all duration-300"
                    placeholder="Your name"
                    required
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Label htmlFor="email" className="text-foreground">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 bg-muted/20 border-accent/30 focus:border-accent transition-all duration-300"
                    placeholder="your@email.com"
                    required
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Label htmlFor="subject" className="text-foreground">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-2 bg-muted/20 border-accent/30 focus:border-accent transition-all duration-300"
                    placeholder="Let's work together!"
                    required
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Label htmlFor="message" className="text-foreground">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="mt-2 bg-muted/20 border-accent/30 focus:border-accent resize-none transition-all duration-300"
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
                    className="w-full liquid-button px-8 py-4 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    <Send className="w-5 h-5 mr-2" />
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
            <div className="glow-border rounded-2xl p-6 hover-lift">
              <h3 className="text-2xl font-bold font-space text-accent mb-4">Get in Touch</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Ready to collaborate on your next project? I'm always open to discussing new opportunities 
                and exciting challenges. Let's create something amazing together!
              </p>
              
              <div className="space-y-4">
                {[
                  { 
                    href: "mailto:karthikmudunuri999@gmail.com", 
                    icon: Mail, 
                    title: "Email", 
                    subtitle: "karthikmudunuri999@gmail.com" 
                  },
                  { 
                    href: "https://www.linkedin.com/in/karthikmudunuri/", 
                    icon: Linkedin, 
                    title: "LinkedIn", 
                    subtitle: "Connect with me" 
                  },
                  { 
                    href: "https://github.com/karthikmudunuri", 
                    icon: Github, 
                    title: "GitHub", 
                    subtitle: "Check out my code" 
                  }
                ].map((social, index) => (
                  <motion.a
                    key={social.title}
                    href={social.href}
                    target={social.href.startsWith('mailto') ? '_self' : '_blank'}
                    rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-center space-x-3 text-foreground hover:text-accent transition-all duration-300 group magnetic-effect"
                    onMouseEnter={() => setHoveredSocial(index)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-all duration-300">
                        <social.icon className="w-5 h-5 text-accent group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      {hoveredSocial === index && (
                        <div className="absolute -inset-2 bg-accent/20 rounded-full blur-lg" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{social.title}</p>
                      <p className="text-sm text-muted-foreground">{social.subtitle}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glow-border rounded-2xl p-6 hover-lift"
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Modern office meeting space for collaboration" 
                  className="w-full h-48 object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent rounded-lg" />
              </div>
              <h4 className="text-lg font-bold font-space text-accent mb-2 flex items-center">
                <Coffee className="w-5 h-5 mr-2" />
                Let's Collaborate
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I'm always excited to work on innovative projects and help bring creative ideas to life. 
                Whether it's a small feature or a complete application, let's discuss how we can work together.
              </p>
            </motion.div>
            
            {/* Thank You Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="glass-effect rounded-2xl p-6 text-center"
            >
              <h4 className="text-lg font-bold font-space text-accent mb-2">
                Thank You for Visiting!
              </h4>
              <p className="text-muted-foreground text-sm">
                I appreciate you taking the time to explore my portfolio. Let's create something amazing together!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}