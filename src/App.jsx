import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ExploreSchemes from "./components/ExploreSchemes";
import WhySamarthBento from "./components/WhySamarthBento";
import HowItWorks from "./components/HowItWorks";
import AppPreviewMockup from "./components/AppPreviewMockup";
import FaqAccordion from "./components/FaqAccordion";
import FooterBento from "./components/FooterBento";
import SchemeDrawerModal from "./components/SchemeDrawerModal";
import QuickEligibilityModal from "./components/QuickEligibilityModal";

export default function App() {
  const [lang, setLang] = useState("en");
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [eligibilityCriteria, setEligibilityCriteria] = useState(null);
  const [dossierNotice, setDossierNotice] = useState(null);

  // Handle quick eligibility check from Hero
  const handleFilterSubmit = (formData) => {
    setEligibilityCriteria(formData);
  };

  // Open eligibility modal directly from Nav CTA
  const handleOpenEligibility = () => {
    setEligibilityCriteria({
      state: "Maharashtra",
      age: "26-35",
      category: "General",
      occupation: "Small Business / MSME",
    });
  };

  // Handle download / print bank dossier
  const handleDownloadDossier = (scheme) => {
    setDossierNotice(`Official Bank Application Dossier for "${scheme.name}" generated successfully.`);
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const scrollToExplore = () => {
    const el = document.getElementById("explore-schemes");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#111111] font-sans selection:bg-[#FF6B3D] selection:text-white">
      
      {/* 1. Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenEligibility={handleOpenEligibility}
      />

      {/* 2. Hero Section (Dark #111111) */}
      <HeroSection
        onFilterSubmit={handleFilterSubmit}
        onExploreClick={scrollToExplore}
      />

      {/* 3. Explore Schemes Section (Light #F2F2F2) */}
      <ExploreSchemes
        onSelectScheme={(scheme) => setSelectedScheme(scheme)}
        filterState={eligibilityCriteria?.state}
      />

      {/* 4. Why Samarth (Bento Stats Section matching screenshot) */}
      <WhySamarthBento />

      {/* 5. How It Works (3 Simple Steps in Bento Cards) */}
      <HowItWorks onGetStarted={handleOpenEligibility} />

      {/* 6. App Preview / Innovation Mockup Section matching screenshot */}
      <AppPreviewMockup />

      {/* 7. FAQ ("Have a question?" Accordion) */}
      <FaqAccordion />

      {/* 8. Footer (Dark Bento Cards) */}
      <FooterBento onGetStarted={handleOpenEligibility} />

      {/* Scheme Details Drawer / Modal */}
      {selectedScheme && (
        <SchemeDrawerModal
          scheme={selectedScheme}
          onClose={() => setSelectedScheme(null)}
          onDownloadDossier={handleDownloadDossier}
        />
      )}

      {/* Quick Eligibility Matches Modal */}
      {eligibilityCriteria && (
        <QuickEligibilityModal
          criteria={eligibilityCriteria}
          onClose={() => setEligibilityCriteria(null)}
          onSelectScheme={(scheme) => {
            setEligibilityCriteria(null);
            setSelectedScheme(scheme);
          }}
        />
      )}

      {/* Toast Feedback Notification */}
      {dossierNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E1E1E] text-white px-5 py-3 rounded-full border border-white/10 shadow-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
          <span>{dossierNotice}</span>
          <button
            onClick={() => setDossierNotice(null)}
            className="ml-2 text-neutral-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

    </div>
  );
}
