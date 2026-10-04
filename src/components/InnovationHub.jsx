import React, { useState } from "react";
import { Layers, Compass, BrainCircuit, FileSearch, Sparkles } from "lucide-react";
import PolicyStackOptimizer from "./PolicyStackOptimizer";
import PathToEligibilitySimulator from "./PathToEligibilitySimulator";
import AIBusinessAnalyzer from "./AIBusinessAnalyzer";
import CertificateScanner from "./CertificateScanner";

export default function InnovationHub({ lang = "en" }) {
  const [activeTab, setActiveTab] = useState("optimizer");

  const tools = [
    {
      id: "optimizer",
      label: "Policy Stacker",
      tag: "Grant Maximizer",
      icon: Layers,
      description: "Combine non-conflicting central & state subsidies, credit guarantees, and tax exemptions.",
    },
    {
      id: "simulator",
      label: "Eligibility Simulator",
      tag: "Counterfactual",
      icon: Compass,
      description: "Interactive 'What-If' roadmap to turn borderline & rejected applications into 100% approvals.",
    },
    {
      id: "analyzer",
      label: "Business Idea AI",
      tag: "CAPEX & Grants",
      icon: BrainCircuit,
      description: "Speak or type your raw business idea to get instant CAPEX estimation and sector grant mapping.",
    },
    {
      id: "scanner",
      label: "Certificate OCR",
      tag: "Instant Extract",
      icon: FileSearch,
      description: "Upload Aadhaar, Caste, or Udyam certificates for instant verification & document gap audits.",
    },
  ];

  return (
    <section id="innovation-hub" className="w-full bg-[#F4F5F7] py-20 px-4 sm:px-6 lg:px-8 text-[#111827] border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E5E7EB] text-xs font-bold text-neutral-700 shadow-xs">
            <Sparkles size={13} className="text-[#FF6B3D]" />
            <span>AI Policy Innovation Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111827] font-['Urbanist',sans-serif]">
            Intelligent Policy Tools
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            Advanced convergence optimization, counterfactual simulation, and OCR verification for Bharat.
          </p>
        </div>

        {/* 4 Tool Selector Tabs in Bento Pill Format */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTab === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                className={`bento-card p-5 rounded-[24px] text-left transition-all duration-300 cursor-pointer border flex flex-col justify-between h-[150px] ${
                  isActive
                    ? "bg-[#FF6B3D] text-white border-transparent shadow-orange-glow scale-[1.02]"
                    : "bg-white text-neutral-700 border-[#E5E7EB] hover:border-neutral-300 hover:bg-neutral-50 shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isActive ? "bg-white/20 text-white" : "bg-orange-50 text-[#FF6B3D]"}`}>
                    <Icon size={18} />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-600"}`}>
                    {tool.tag}
                  </span>
                </div>

                <div>
                  <div className={`text-base font-bold font-['Urbanist',sans-serif] ${isActive ? "text-white" : "text-[#111827]"}`}>
                    {tool.label}
                  </div>
                  <p className={`text-xs line-clamp-1 mt-0.5 ${isActive ? "text-white/80" : "text-neutral-500"}`}>
                    {tool.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Tool Content Container (Bento Light Window) */}
        <div className="bg-white text-[#111827] p-6 sm:p-8 lg:p-10 rounded-[32px] border border-[#E5E7EB] shadow-bento-soft overflow-hidden animate-in fade-in duration-300">
          {activeTab === "optimizer" && <PolicyStackOptimizer lang={lang} />}
          {activeTab === "simulator" && <PathToEligibilitySimulator lang={lang} />}
          {activeTab === "analyzer" && <AIBusinessAnalyzer lang={lang} />}
          {activeTab === "scanner" && <CertificateScanner lang={lang} />}
        </div>

      </div>
    </section>
  );
}
