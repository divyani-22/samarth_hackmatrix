import React from "react";
import HeroSection from "./HeroSection";
import InnovationHub from "./InnovationHub";
import ExploreSchemes from "./ExploreSchemes";
import WhySamarthBento from "./WhySamarthBento";
import HowItWorks from "./HowItWorks";
import AppPreviewMockup from "./AppPreviewMockup";
import FaqAccordion from "./FaqAccordion";

export default function Home({ onFilterSubmit, onSelectScheme, filterState, lang = "en" }) {
  const scrollToExplore = () => {
    const el = document.getElementById("explore-schemes");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        onFilterSubmit={onFilterSubmit}
        onExploreClick={scrollToExplore}
      />

      {/* AI Innovation Suite (Stacking Optimizer, Eligibility Simulator, Business AI, Certificate OCR) */}
      <InnovationHub lang={lang} />

      {/* Explore Schemes Directory */}
      <ExploreSchemes
        onSelectScheme={onSelectScheme}
        filterState={filterState}
      />

      {/* Why Samarth Bento Stats (90%, 55%, 30%, 100%) */}
      <WhySamarthBento />

      {/* How It Works (3 Steps) */}
      <HowItWorks onGetStarted={scrollToExplore} />

      {/* App Preview / Dashboard Mockup with Charts */}
      <AppPreviewMockup />

      {/* FAQ Accordion */}
      <FaqAccordion />
    </div>
  );
}
