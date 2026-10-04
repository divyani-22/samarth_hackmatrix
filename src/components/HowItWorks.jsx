import React from "react";
import { UserCheck, Sparkles, FileCheck, ArrowRight } from "lucide-react";

export default function HowItWorks({ onGetStarted }) {
  const steps = [
    {
      number: "01",
      title: "Tell us about you",
      description: "Answer a few simple questions about your age, location, occupation, and financial goals in under 60 seconds.",
      icon: UserCheck,
      badge: "Step 1",
    },
    {
      number: "02",
      title: "See matching schemes",
      description: "Our deterministic rule engine compares your profile against 500+ verified statutory guidelines to calculate exact eligibility.",
      icon: Sparkles,
      badge: "Step 2",
    },
    {
      number: "03",
      title: "Apply with the right documents",
      description: "Get a verified document checklist, download an official bank application dossier, and apply directly without middleman friction.",
      icon: FileCheck,
      badge: "Step 3",
    },
  ];

  return (
    <section id="how-it-works" className="w-full bg-[#111111] py-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E1E1E] border border-white/10 text-xs font-semibold text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-[#FF6B3D]"></span>
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-['Urbanist',sans-serif]">
            How Samarth Works
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-normal">
            From policy discovery to verified bank submission in three easy steps.
          </p>
        </div>

        {/* 3 Step Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bento-card bg-[#1E1E1E] border border-white/10 p-8 rounded-[32px] shadow-bento-dark flex flex-col justify-between hover:border-white/20 transition-all hover:scale-[1.02] group"
              >
                <div>
                  {/* Top Row: Number & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-4xl sm:text-5xl font-black text-neutral-500/50 group-hover:text-[#FF6B3D] transition-colors font-['Urbanist',sans-serif]">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10 group-hover:bg-[#FF6B3D] group-hover:border-transparent transition-all">
                      <Icon size={20} className="group-hover:text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-['Urbanist',sans-serif]">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center text-xs font-bold text-[#FF6B3D] gap-1">
                  <span>{step.badge}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
