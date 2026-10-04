import React, { useState } from "react";
import { ArrowRight, Search, ShieldCheck, Sparkles, Filter, CheckCircle2 } from "lucide-react";
import { uiTranslations } from "../data/uiTranslations";

export default function HeroSection({ onFilterSubmit, onExploreClick, lang = "en" }) {
  const t = uiTranslations[lang]?.hero || uiTranslations.en.hero;

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
    <section id="eligibility" className="relative w-full bg-gradient-to-b from-[#FFF5F1] via-[#F8F9FB] to-[#F4F5F7] text-[#111827] pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#E5E7EB]/80">
      
      {/* Subtle Warm Orange Glow Backdrop */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-[#FF6B3D]/10 blur-[140px] rounded-full pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Bento Hero Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Hero Typography & Primary CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-xs font-bold text-neutral-700 w-fit shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
              <span>{t.badge}</span>
            </div>

            {/* Main Headline (48-64px bold, tight tracking) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-black leading-[1.08] tracking-tight text-[#111827] font-['Urbanist',sans-serif]">
              {t.headline}
            </h1>

            {/* One short line of subtext */}
            <p className="text-base sm:text-lg text-neutral-600 max-w-xl font-normal leading-relaxed">
              {t.subtext}
            </p>

            {/* CTAs & Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FF6B3D] hover:bg-[#ff5722] text-white text-base font-bold shadow-orange-glow transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <span>{t.findMySchemes}</span>
                <ArrowRight size={18} />
              </button>

              <a
                href="#how-it-works"
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-neutral-100 text-neutral-800 text-base font-semibold border border-neutral-300 shadow-xs transition-colors"
              >
                <span>{t.howItWorksCta}</span>
              </a>
            </div>

            {/* Value Props Checklist */}
            <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-neutral-600 border-t border-neutral-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#22C55E]" />
                <span className="font-semibold">500+ Central & State Schemes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#22C55E]" />
                <span className="font-semibold">Zero Hallucination Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#22C55E]" />
                <span className="font-semibold">100% Free for Citizens</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Bento Quick Eligibility Card (Pure White) */}
          <div className="lg:col-span-5 w-full">
            <div className="bento-card bg-white border border-[#E5E7EB] p-7 sm:p-8 rounded-[32px] shadow-bento-soft relative">
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
                <div>
                  <h3 className="text-xl font-bold text-[#111827] font-['Urbanist',sans-serif]">
                    {t.quickCheckTitle}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {t.quickCheckSub}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-[#FF6B3D]">
                  <Filter size={16} />
                </div>
              </div>

              {/* Eligibility Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* State Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-neutral-600 uppercase tracking-wider mb-1.5">
                    {t.stateLabel}
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F9FA] border border-neutral-200 text-[#111827] text-sm font-semibold focus:outline-none focus:border-[#FF6B3D] focus:bg-white transition-colors cursor-pointer"
                  >
                    {states.map((st) => (
                      <option key={st} value={st} className="bg-white text-[#111827]">
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Age & Category in 2-column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-600 uppercase tracking-wider mb-1.5">
                      {t.ageLabel}
                    </label>
                    <select
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#F8F9FA] border border-neutral-200 text-[#111827] text-sm font-semibold focus:outline-none focus:border-[#FF6B3D] focus:bg-white transition-colors cursor-pointer"
                    >
                      {ageRanges.map((age) => (
                        <option key={age} value={age} className="bg-white text-[#111827]">
                          {age}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-600 uppercase tracking-wider mb-1.5">
                      {t.categoryLabel}
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#F8F9FA] border border-neutral-200 text-[#111827] text-sm font-semibold focus:outline-none focus:border-[#FF6B3D] focus:bg-white transition-colors cursor-pointer"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className="bg-white text-[#111827]">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Occupation Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-neutral-600 uppercase tracking-wider mb-1.5">
                    {t.occupationLabel}
                  </label>
                  <select
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F9FA] border border-neutral-200 text-[#111827] text-sm font-semibold focus:outline-none focus:border-[#FF6B3D] focus:bg-white transition-colors cursor-pointer"
                  >
                    {occupations.map((occ) => (
                      <option key={occ} value={occ} className="bg-white text-[#111827]">
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
                    <span>{t.showSchemes}</span>
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
