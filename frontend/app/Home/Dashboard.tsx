"use client";
import HeroSection from "../components/ui/HeroSection";
import Navbar from "../components/ui/Navbar";
import SubHeroSection from "../components/ui/SubHeroSection";
import Workshowcase from "../components/ui/Workshowcase";
const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col px-6">
        <Navbar />

        <main>
          <HeroSection />
          <SubHeroSection />
          <Workshowcase />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
