import React from "react";
import { Sparkles, ArrowRight, Mail, Shield } from "lucide-react";
import FinanceLogo from "./FinanceLogo";
import { uiTranslations } from "../data/uiTranslations";

export default function FooterBento({ onGetStarted, lang = "en" }) {
  const t = uiTranslations[lang]?.footer || uiTranslations.en.footer;

  return (
    <footer className="w-full bg-[#111111] text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Footer Bento Grid (Directly mirroring the screenshot's 4-card bottom layout) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Card 1: Large "Get started!" Card (Left Column, span 5) */}
          <div className="md:col-span-5 bento-card bg-[#1E1E1E] p-8 rounded-[32px] border border-white/10 shadow-bento-dark flex flex-col justify-between h-[260px] sm:h-[280px]">
            <div>
              <div className="flex items-center gap-2 mb-3 text-neutral-400 text-xs font-semibold">
                <FinanceLogo size={16} className="w-4 h-4" />
                <span className="text-white font-bold">Samarth Welfare AI</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-white font-['Urbanist',sans-serif]">
                {t.getStarted}
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                {t.getStartedSub}
              </p>
            </div>

            <div>
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FF6B3D] hover:bg-[#ff5722] text-white text-sm font-bold shadow-orange-glow transition-all duration-300 hover:scale-[1.02] cursor-pointer text-center"
              >
                {t.startForFree}
              </button>
            </div>
          </div>

          {/* Right Column Grid: Support, Links & Social Cards (span 7) */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-5">
            
            {/* Card 2: Support Card (span 8) */}
            <div className="sm:col-span-8 bento-card bg-[#1E1E1E] p-7 rounded-[32px] border border-white/10 shadow-bento-dark flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-white mb-2">{t.support}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {t.supportDesc}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-neutral-300">
                  <Mail size={13} className="text-[#FF6B3D]" />
                  <span>{t.helpEmail}</span>
                </div>
              </div>

              {/* Sub-links row */}
              <div className="flex flex-wrap items-center gap-4 pt-4 mt-4 border-t border-white/5 text-[11px] text-neutral-400">
                <a href="#explore-schemes" className="hover:text-white transition-colors">{t.schemes}</a>
                <a href="#eligibility" className="hover:text-white transition-colors">{t.eligibility}</a>
                <a href="#how-it-works" className="hover:text-white transition-colors">{t.howItWorks}</a>
                <a href="#faq" className="hover:text-white transition-colors">{t.faq}</a>
              </div>
            </div>

            {/* Card 3: Social Card (span 4) */}
            <div className="sm:col-span-4 bento-card bg-[#1E1E1E] p-7 rounded-[32px] border border-white/10 shadow-bento-dark flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-white mb-2">{t.social}</h4>
                <p className="text-xs text-neutral-400">Follow our national outreach updates.</p>
              </div>

              <div className="flex items-center gap-3 pt-4">
                {/* Instagram Icon */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#FF6B3D] text-neutral-300 hover:text-white flex items-center justify-center transition-all border border-white/10"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Facebook Icon */}
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#FF6B3D] text-neutral-300 hover:text-white flex items-center justify-center transition-all border border-white/10"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>

                {/* LinkedIn Icon */}
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#FF6B3D] text-neutral-300 hover:text-white flex items-center justify-center transition-all border border-white/10"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright & Accessibility Notice */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-[#22C55E]" />
            <span>© 2026 Samarth National Welfare Infrastructure. Government Open Data Compliant.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-neutral-300 transition-colors">{t.privacyPolicy}</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">{t.terms}</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Security Audit</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

