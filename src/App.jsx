import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ExploreSchemes from "./components/ExploreSchemes";
import FindSchemePage from "./components/FindSchemePage";
import SchemeDetailsPage from "./components/SchemeDetailsPage";
import CalculatorPage from "./components/CalculatorPage";
import PartnersPage from "./components/PartnersPage";
import PolicyStackOptimizer from "./components/PolicyStackOptimizer";
import PathToEligibilitySimulator from "./components/PathToEligibilitySimulator";
import AIBusinessAnalyzer from "./components/AIBusinessAnalyzer";
import CertificateScanner from "./components/CertificateScanner";
import EvaluationTestBench from "./components/EvaluationTestBench";
import FooterBento from "./components/FooterBento";
import SchemeDrawerModal from "./components/SchemeDrawerModal";
import QuickEligibilityModal from "./components/QuickEligibilityModal";
import AIChatbot from "./components/AIChatbot";

export default function App() {
  const [lang, setLang] = useState("en");
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [eligibilityCriteria, setEligibilityCriteria] = useState(null);
  const [dossierNotice, setDossierNotice] = useState(null);
  const navigate = useNavigate();

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
    setDossierNotice(`Official Bank Application Dossier for "${scheme.name}" generated.`);
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#111111] font-sans selection:bg-[#FF6B3D] selection:text-white flex flex-col">
      
      {/* 1. Global Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenEligibility={handleOpenEligibility}
      />

      {/* 2. Main Router View */}
      <main className="flex-grow">
        <Routes>
          {/* Landing / Home View */}
          <Route
            path="/"
            element={
              <Home
                onFilterSubmit={handleFilterSubmit}
                onSelectScheme={(scheme) => setSelectedScheme(scheme)}
                filterState={eligibilityCriteria?.state}
                lang={lang}
              />
            }
          />

          {/* 7-Step Scheme Discovery Wizard */}
          <Route
            path="/find"
            element={<FindSchemePage lang={lang} />}
          />

          {/* Explore Schemes Directory */}
          <Route
            path="/explore"
            element={
              <ExploreSchemes
                onSelectScheme={(scheme) => setSelectedScheme(scheme)}
                filterState={eligibilityCriteria?.state}
              />
            }
          />

          {/* Scheme Details Page */}
          <Route
            path="/scheme/:id"
            element={
              <SchemeDetailsPage
                onDownloadDossier={handleDownloadDossier}
                lang={lang}
              />
            }
          />

          {/* Loan & Subsidy Moratorium Calculator */}
          <Route
            path="/calculator"
            element={<CalculatorPage lang={lang} />}
          />

          {/* Channel Partner & SCA Locator */}
          <Route
            path="/partners"
            element={<PartnersPage lang={lang} />}
          />

          {/* Policy Stacking & Grant Convergence Optimizer */}
          <Route
            path="/optimizer"
            element={
              <div className="w-full min-h-[85vh] bg-[#F2F2F2] py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto bg-white p-8 rounded-[32px] border border-[#E5E5E5] shadow-bento-soft">
                  <PolicyStackOptimizer lang={lang} />
                </div>
              </div>
            }
          />

          {/* Path to Eligibility Counterfactual Simulator */}
          <Route
            path="/simulator"
            element={
              <div className="w-full min-h-[85vh] bg-[#F2F2F2] py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto bg-white p-8 rounded-[32px] border border-[#E5E5E5] shadow-bento-soft">
                  <PathToEligibilitySimulator lang={lang} />
                </div>
              </div>
            }
          />

          {/* AI Business Idea & Grants Analyzer */}
          <Route
            path="/analyze"
            element={
              <div className="w-full min-h-[85vh] bg-[#F2F2F2] py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto bg-white p-8 rounded-[32px] border border-[#E5E5E5] shadow-bento-soft">
                  <AIBusinessAnalyzer lang={lang} />
                </div>
              </div>
            }
          />

          {/* Certificate OCR & Document Gap Scanner */}
          <Route
            path="/scan"
            element={
              <div className="w-full min-h-[85vh] bg-[#F2F2F2] py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto bg-white p-8 rounded-[32px] border border-[#E5E5E5] shadow-bento-soft">
                  <CertificateScanner lang={lang} />
                </div>
              </div>
            }
          />

          {/* 3-State Evaluation Test Bench */}
          <Route
            path="/testbench"
            element={
              <div className="w-full min-h-[85vh] bg-[#F2F2F2] py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto bg-white p-8 rounded-[32px] border border-[#E5E5E5] shadow-bento-soft">
                  <EvaluationTestBench lang={lang} />
                </div>
              </div>
            }
          />

          {/* 404 Fallback */}
          <Route
            path="*"
            element={
              <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center text-white space-y-4">
                <h2 className="text-6xl font-black text-[#FF6B3D] font-['Urbanist',sans-serif]">404</h2>
                <p className="text-neutral-400">Page not found</p>
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-3 rounded-full bg-[#FF6B3D] text-white text-xs font-bold"
                >
                  Return Home
                </button>
              </div>
            }
          />
        </Routes>
      </main>

      {/* 3. Global Bento Footer */}
      <FooterBento onGetStarted={handleOpenEligibility} />

      {/* 4. Global Floating AI Chatbot */}
      <AIChatbot lang={lang} />

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
        <div className="fixed bottom-24 left-6 z-50 bg-[#1E1E1E] text-white px-5 py-3 rounded-full border border-white/10 shadow-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
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
