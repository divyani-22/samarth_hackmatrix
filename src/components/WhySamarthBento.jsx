import React, { useState, useEffect } from "react";
import { Sparkles, Shield, Zap, TrendingUp, Layers, CheckCircle2 } from "lucide-react";
import { uiTranslations } from "../data/uiTranslations";

export default function WhySamarthBento({ lang = "en" }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const t = uiTranslations[lang]?.whySamarth || uiTranslations.en.whySamarth;

  useEffect(() => {
    setHasAnimated(true);
  }, []);

  return (
    <section className="w-full bg-[#F2F2F2] py-20 px-4 sm:px-6 lg:px-8 text-[#111111] border-t border-[#E5E5E5]/60">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E5E5E5] text-xs font-bold text-neutral-600 shadow-xs">
            <Sparkles size={13} className="text-[#FF6B3D]" />
            <span>{t.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111] font-['Urbanist',sans-serif]">
            {t.subtitle}
          </h2>
        </div>

        {/* 4 Bento Advantage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Dark Bento Card */}
          <div className="bento-card bg-[#1E1E1E] text-white p-8 rounded-[32px] shadow-bento-dark flex flex-col justify-between h-[280px] sm:h-[320px] transition-all hover:scale-[1.02]">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white mb-4">
                <Zap size={16} className="text-[#FF6B3D]" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-300 leading-relaxed">
                {t.stat1Desc}
              </p>
            </div>
            <div>
              <div className="text-5xl sm:text-6xl font-black tracking-tight text-white font-['Urbanist',sans-serif]">
                {t.stat1Number}
              </div>
              <div className="text-xs font-bold text-[#FF6B3D] mt-1">{t.stat1Title}</div>
            </div>
          </div>

          {/* Card 2: White Bento Card */}
          {/* Card 2: White Bento Card */}
          <div className="bento-card bg-white text-[#111111] p-8 rounded-[32px] border border-[#E5E5E5] shadow-bento-soft flex flex-col justify-between h-[280px] sm:h-[320px] transition-all hover:scale-[1.02]">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800 mb-4">
                <TrendingUp size={16} className="text-neutral-800" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-600 leading-relaxed">
                {t.stat2Desc}
              </p>
            </div>
            <div>
              <div className="text-5xl sm:text-6xl font-black tracking-tight text-[#111111] font-['Urbanist',sans-serif]">
                {t.stat2Number}
              </div>
              <div className="text-xs font-bold text-neutral-700 mt-1">{t.stat2Title}</div>
            </div>
          </div>

          {/* Card 3: Orange Bento Card */}
          <div className="bento-card bg-[#FF6B3D] text-white p-8 rounded-[32px] shadow-orange-glow flex flex-col justify-between h-[280px] sm:h-[320px] transition-all hover:scale-[1.02]">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white mb-4">
                <Layers size={16} className="text-white" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-white/95 leading-relaxed">
                {t.stat3Desc}
              </p>
            </div>
            <div>
              <div className="text-5xl sm:text-6xl font-black tracking-tight text-white font-['Urbanist',sans-serif]">
                {t.stat3Number}
              </div>
              <div className="text-xs font-bold text-white/90 mt-1">{t.stat3Title}</div>
            </div>
          </div>

          {/* Card 4: White Bento Card */}
          <div className="bento-card bg-white text-[#111111] p-8 rounded-[32px] border border-[#E5E5E5] shadow-bento-soft flex flex-col justify-between h-[280px] sm:h-[320px] transition-all hover:scale-[1.02]">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-[#22C55E] mb-4">
                <Shield size={16} />
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-600 leading-relaxed">
                {t.stat4Desc}
              </p>
            </div>
            <div>
              <div className="text-5xl sm:text-6xl font-black tracking-tight text-[#111111] font-['Urbanist',sans-serif]">
                {t.stat4Number}
              </div>
              <div className="text-xs font-bold text-[#22C55E] mt-1">{t.stat4Title}</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
