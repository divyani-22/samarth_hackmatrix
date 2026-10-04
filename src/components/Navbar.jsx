import React, { useState } from "react";
import { Sparkles, Globe, ChevronDown, Check, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar({ lang, setLang, onOpenEligibility }) {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages = [
    { code: "en", label: "English", native: "English" },
    { code: "hi", label: "Hindi", native: "हिंदी" },
    { code: "mr", label: "Marathi", native: "मराठी" },
  ];

  const currentLangObj = languages.find((l) => l.code === lang) || languages[0];

  const navLinks = [
    { label: "Schemes", href: "#explore-schemes" },
    { label: "Eligibility", href: "#eligibility" },
    { label: "How it works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#111111]/90 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Wordmark with Small Orange Icon */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#FF6B3D] flex items-center justify-center text-white shadow-orange-glow transition-transform duration-300 group-hover:scale-105">
            <Sparkles size={18} className="text-white fill-white" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black tracking-tight text-white font-['Urbanist',sans-serif]">
              Samarth
            </span>
            <span className="w-2 h-2 rounded-full bg-[#FF6B3D] inline-block animate-pulse"></span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Language Switcher & Pill Button */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1E1E1E] text-white text-xs font-semibold border border-white/10 hover:border-white/20 transition-colors"
              aria-label="Select Language"
            >
              <Globe size={14} className="text-[#FF6B3D]" />
              <span>{currentLangObj.native}</span>
              <ChevronDown size={13} className={`text-neutral-400 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-[#1E1E1E] border border-white/10 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl font-medium transition-colors ${
                      lang === l.code ? "bg-[#FF6B3D] text-white font-bold" : "text-neutral-300 hover:bg-white/5"
                    }`}
                  >
                    <span>{l.native}</span>
                    {lang === l.code && <Check size={12} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Orange Pill Button */}
          <button
            onClick={onOpenEligibility}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF6B3D] hover:bg-[#ff5722] text-white text-xs font-bold shadow-orange-glow transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <span>Check eligibility</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={onOpenEligibility}
            className="px-3.5 py-1.5 rounded-full bg-[#FF6B3D] text-white text-xs font-bold shadow-sm"
          >
            Check
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#1E1E1E] text-white border border-white/10"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111111] border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-base font-semibold text-neutral-200 hover:text-[#FF6B3D] py-2"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-neutral-400">Language:</span>
            <div className="flex gap-2">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-3 py-1 text-xs rounded-full ${
                    lang === l.code ? "bg-[#FF6B3D] text-white font-bold" : "bg-[#1E1E1E] text-neutral-300"
                  }`}
                >
                  {l.native}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
