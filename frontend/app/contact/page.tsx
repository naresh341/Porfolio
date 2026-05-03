"use client";

import Contact from "../components/ui/Contact";
import Footer from "../components/ui/Footer";
import { SectionHero } from "../components/ui/DashboardWidgets";

export default function ContactPage() {
  return (
    <div className="bg-background w-full overflow-x-hidden">
      <SectionHero 
        title="CONTACT" 
        label="LET'S BUILD SOMETHING" 
        tagline="Say Hello."
        description="Available for Collaborations"
      />
      <div className="w-full">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
