"use client";

import Workshowcase from "../components/ui/Workshowcase";
import Footer from "../components/ui/Footer";
import { SectionHero } from "../components/ui/DashboardWidgets";

export default function ProjectsPage() {
  return (
    <div className="bg-background w-full overflow-x-hidden">
      <SectionHero 
        title="PROJECTS" 
        label="EXPLORE MY PORTFOLIO" 
        tagline="Selected Work."
        description="Innovative Engineering & Design"
      />
      <div className="w-full">
        <Workshowcase />
      </div>
      <Footer />
    </div>
  );
}
