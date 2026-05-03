"use client";

import ExperienceSection from "../components/ui/ExperienceSkills";
import Footer from "../components/ui/Footer";
import { SectionHero } from "../components/ui/DashboardWidgets";

export default function ExperiencePage() {
  return (
    <div className="bg-background w-full overflow-x-hidden">
      <SectionHero 
        title="EXPERIENCE" 
        label="MY TECHNICAL EVOLUTION" 
        tagline="What I've Built."
        description="Engineering Enterprise Solutions"
      />
      <div className="w-full">
        <ExperienceSection />
      </div>
      <Footer />
    </div>
  );
}
