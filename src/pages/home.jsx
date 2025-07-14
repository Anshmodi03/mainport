import React, { memo } from "react";
import Navigation from "../components/navigation.jsx";
import HeroSection from "../components/hero-section.jsx";
import AboutSection from "../components/about-section.jsx";
import ExperienceSection from "../components/experience-section.jsx";
import ProjectsSection from "../components/projects-section.jsx";
import SkillsSection from "../components/skills-section.jsx";
import ContactSection from "../components/contact-section.jsx";
import ThreeDScene from "../components/three-d-scene.jsx";

const Home = memo(() => {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ThreeDScene />
      <Navigation />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <section id="about">
          <AboutSection />
        </section>
        <section id="experience">
          <ExperienceSection />
        </section>
        <section id="projects">
          <ProjectsSection />
        </section>
        <section id="skills">
          <SkillsSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
    </div>
  );
});

Home.displayName = "Home";

export default Home;
