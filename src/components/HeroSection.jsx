import React, { useState } from "react";
import { ArrowRight, Search, ShieldCheck, Sparkles, Filter, CheckCircle2 } from "lucide-react";

export default function HeroSection({ onFilterSubmit, onExploreClick }) {
  const [formData, setFormData] = useState({
    state: "Maharashtra",
    age: "26-35",
    category: "General",
    occupation: "Small Business / MSME",
  });

  const states = [
    "All India",
    "Maharashtra",
    "Uttar Pradesh",
    "Tamil Nadu",
    "Karnataka",
    "Delhi",
    "Gujarat",
    "Rajasthan",
    "Bihar",
    "Madhya Pradesh",
    "West Bengal",
  ];

  const ageRanges = ["Below 18", "18-25", "26-35", "36-50", "50+"];
  const categories = ["General", "OBC", "SC", "ST", "EWS", "Divyangjan / PwD"];
  const occupations = [
    "Small Business / MSME",
    "Farmer / Agriculture",
    "Student / Higher Studies",
    "Artisan / Traditional Crafts",
    "Woman Entrepreneur",
    "Street Vendor / Micro Trader",
    "Senior Citizen / Retired",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onFilterSubmit) {
      onFilterSubmit(formData);
    }
  };

  return (
    <section id="eligibility" className="relative w-full bg-[#111111] text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#FF6B3D]/10 blur-[130px] rounded-full pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Bento Hero Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Hero Typography & Primary CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E1E1E] border border-white/10 text-xs font-semibold text-neutral-300 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
              <span>National Welfare & Subsidy Engine @2026</span>
            </div>

            {/* Main Headline (48-64px bold, tight tracking) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black leading-[1.08] tracking-tight text-white font-['Urbanist',sans-serif]">
              Know Your Schemes. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-neutral-400">
                Claim Your Rights.
              </span>
            </h1>

            {/* One short line of subtext */}
            <p className="text-base sm:text-lg text-neutral-400 max-w-xl font-normal leading-relaxed">
              Discover verified central and state subsidies, check exact statutory eligibility rules, and download bank-ready application dossiers in minutes.
            </p>

            {/* CTAs & Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FF6B3D] hover:bg-[#ff5722] text-white text-base font-bold shadow-orange-glow transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <span>Find my schemes</span>
                <ArrowRight size={18} />
              </button>

              <a
                href="#how-it-works"
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-transparent hover:bg-white/5 text-neutral-200 hover:text-white text-base font-semibold border border-white/20 transition-colors"
              >
                <span>How it works</span>
              </a>
            </div>

            {/* Value Props Checklist */}
            <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-neutral-400 border-t border-white/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#22C55E]" />
                <span>500+ Central & State Schemes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#22C55E]" />
                <span>Zero Hallucination Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#22C55E]" />
                <span>100% Free for Citizens</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Bento Quick Eligibility Card */}
          <div className="lg:col-span-5 w-full">
            <div className="bento-card bg-[#1E1E1E] border border-white/10 p-7 sm:p-8 rounded-[32px] shadow-bento-dark relative">
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-bold text-white font-['Urbanist',sans-serif]">
                    Quick Eligibility Checker
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Match with government benefits in 30 seconds
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FF6B3D]/10 flex items-center justify-center text-[#FF6B3D]">
                  <Filter size={15} />
                </div>
              </div>

              {/* Eligibility Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* State Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    State / Union Territory
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#111111] border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF6B3D] transition-colors cursor-pointer"
                  >
                    {states.map((st) => (
                      <option key={st} value={st} className="bg-[#1E1E1E] text-white">
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Age & Category in 2-column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                      Age Range
                    </label>
                    <select
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#111111] border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF6B3D] transition-colors cursor-pointer"
                    >
                      {ageRanges.map((age) => (
                        <option key={age} value={age} className="bg-[#1E1E1E] text-white">
                          {age}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                      Social Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#111111] border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF6B3D] transition-colors cursor-pointer"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className="bg-[#1E1E1E] text-white">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Occupation Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Primary Occupation / Activity
                  </label>
                  <select
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#111111] border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF6B3D] transition-colors cursor-pointer"
                  >
                    {occupations.map((occ) => (
                      <option key={occ} value={occ} className="bg-[#1E1E1E] text-white">
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Pill Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#FF6B3D] hover:bg-[#ff5722] text-white text-sm font-bold shadow-orange-glow transition-all duration-300 cursor-pointer"
                  >
                    <Search size={16} />
                    <span>Show schemes</span>
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
