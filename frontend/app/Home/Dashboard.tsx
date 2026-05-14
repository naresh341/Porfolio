"use client";

import AboutMe from "../components/ui/AboutMe";
import Contact from "../components/ui/Contact";
import {
  BentoWidgets,
  GithubActivity,
} from "../components/ui/DashboardWidgets";
import ExperienceSection from "../components/ui/ExperienceSkills";
import Footer from "../components/ui/Footer";
import HeroSection from "../components/ui/HeroSection";
import SkillsSection from "../components/ui/SkillsSection";
import SubHeroSection from "../components/ui/SubHeroSection";
import Workshowcase from "../components/ui/Workshowcase";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Dashboard = () => {
  useEffect(() => {
    // Initial refresh
    ScrollTrigger.refresh();

    // Secondary refresh after a short delay for font/image loading
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <main className="flex flex-col bg-background">
        <HeroSection />
        <SubHeroSection />
        <Workshowcase />
        <ExperienceSection />
        <SkillsSection />
        <AboutMe />
        <BentoWidgets />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Dashboard;
