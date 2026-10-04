import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Sparkles, Globe, ChevronDown, Check, Menu, X, ArrowRight, Layers, Compass, BrainCircuit, Calculator, MapPin, Scale } from "lucide-react";
import FinanceLogo from "./FinanceLogo";

export default function Navbar({ lang, setLang, onOpenEligibility }) {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const languages = [
    { code: "en", label: "English", native: "English" },
    { code: "hi", label: "Hindi", native: "हिंदी" },
    { code: "mr", label: "Marathi", native: "मराठी" },
  ];

  const currentLangObj = languages.find((l) => l.code === lang) || languages[0];

  const innovationTools = [
    { label: "Policy Stacker & Optimizer", path: "/optimizer", icon: Layers, desc: "Combine multiple grants" },
    { label: "Path to Eligibility Simulator", path: "/simulator", icon: Compass, desc: "What-If approval roadmap" },
    { label: "Business Idea AI Analyzer", path: "/analyze", icon: BrainCircuit, desc: "Instant CAPEX & grants" },
    { label: "Loan & Subsidy Calculator", path: "/calculator", icon: Calculator, desc: "Moratorium & EMI math" },
    { label: "Channel Partner Locator", path: "/partners", icon: MapPin, desc: "Find nearest SCAs & Banks" },
    { label: "3-State Evaluation Test Bench", path: "/testbench", icon: Scale, desc: "Deterministic benchmark" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-neutral-200/80 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Wordmark with Pure Finance Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-center p-1.5 transition-transform duration-300 group-hover:scale-105">
            <FinanceLogo size={28} className="w-full h-full" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black tracking-tight text-[#111827] font-['Urbanist',sans-serif]">
              Samarth
            </span>
            <span className="w-2 h-2 rounded-full bg-[#FF6B3D] inline-block animate-pulse"></span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-semibold transition-colors ${isActive ? "text-[#FF6B3D]" : "text-neutral-600 hover:text-[#111827]"}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/find"
            className={({ isActive }) =>
              `text-sm font-semibold transition-colors ${isActive ? "text-[#FF6B3D]" : "text-neutral-600 hover:text-[#111827]"}`
            }
          >
            Find Schemes
          </NavLink>

          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `text-sm font-semibold transition-colors ${isActive ? "text-[#FF6B3D]" : "text-neutral-600 hover:text-[#111827]"}`
            }
          >
            Explore
          </NavLink>

          {/* AI Tools Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              className="flex items-center gap-1.5 text-sm font-semibold text-neutral-600 hover:text-[#111827] transition-colors cursor-pointer"
            >
              <span>AI Innovation Suite</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${toolsDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {toolsDropdownOpen && (
              <div 
                className="absolute left-0 mt-3 w-72 rounded-2xl bg-white border border-neutral-200 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setToolsDropdownOpen(false)}
              >
                <div className="text-[10px] uppercase font-bold text-neutral-400 px-3 py-1.5 border-b border-neutral-100">
                  Intelligence Tools
                </div>
                {innovationTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      onClick={() => setToolsDropdownOpen(false)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors text-left group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#FF6B3D] flex items-center justify-center shrink-0 group-hover:bg-[#FF6B3D] group-hover:text-white transition-all">
                        <Icon size={14} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#111827] group-hover:text-[#FF6B3D] transition-colors">
                          {tool.label}
                        </div>
                        <div className="text-[10px] text-neutral-500">{tool.desc}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <NavLink
            to="/calculator"
            className={({ isActive }) =>
              `text-sm font-semibold transition-colors ${isActive ? "text-[#FF6B3D]" : "text-neutral-600 hover:text-[#111827]"}`
            }
          >
            Calculator
          </NavLink>

          <NavLink
            to="/partners"
            className={({ isActive }) =>
              `text-sm font-semibold transition-colors ${isActive ? "text-[#FF6B3D]" : "text-neutral-600 hover:text-[#111827]"}`
            }
          >
            Locator
          </NavLink>
        </nav>

        {/* Right Actions: Language Switcher & Pill Button */}
        <div className="hidden sm:flex items-center gap-3">
          
          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-neutral-100 text-[#111827] text-xs font-semibold border border-neutral-200 hover:border-neutral-300 transition-colors cursor-pointer"
              aria-label="Select Language"
            >
              <Globe size={13} className="text-[#FF6B3D]" />
              <span>{currentLangObj.native}</span>
              <ChevronDown size={12} className={`text-neutral-500 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-white border border-neutral-200 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl font-medium transition-colors cursor-pointer ${
                      lang === l.code ? "bg-[#FF6B3D] text-white font-bold" : "text-neutral-700 hover:bg-neutral-100"
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
            onClick={() => {
              if (onOpenEligibility) onOpenEligibility();
              else navigate("/find");
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#FF6B3D] hover:bg-[#ff5722] text-white text-xs font-bold shadow-orange-glow transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <span>Check eligibility</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-neutral-100 text-[#111827] border border-neutral-200 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-neutral-800 hover:text-[#FF6B3D] py-2"
            >
              Home
            </Link>
            <Link
              to="/find"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-neutral-800 hover:text-[#FF6B3D] py-2"
            >
              Find Schemes (7-Step Wizard)
            </Link>
            <Link
              to="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-neutral-800 hover:text-[#FF6B3D] py-2"
            >
              Explore Schemes Directory
            </Link>
            <Link
              to="/optimizer"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-neutral-800 hover:text-[#FF6B3D] py-2"
            >
              Policy Stacking Optimizer
            </Link>
            <Link
              to="/simulator"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-neutral-800 hover:text-[#FF6B3D] py-2"
            >
              Path to Eligibility Simulator
            </Link>
            <Link
              to="/analyze"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-neutral-800 hover:text-[#FF6B3D] py-2"
            >
              Business Idea AI Analyzer
            </Link>
            <Link
              to="/calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-neutral-800 hover:text-[#FF6B3D] py-2"
            >
              Loan & Subsidy Calculator
            </Link>
            <Link
              to="/partners"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-neutral-800 hover:text-[#FF6B3D] py-2"
            >
              Channel Partner Locator
            </Link>
            <Link
              to="/testbench"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-neutral-800 hover:text-[#FF6B3D] py-2"
            >
              Evaluation Test Bench
            </Link>
          </nav>

          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
            <span className="text-xs text-neutral-500">Language:</span>
            <div className="flex gap-1.5">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1 text-xs rounded-full cursor-pointer ${
                    lang === l.code ? "bg-[#FF6B3D] text-white font-bold" : "bg-neutral-100 text-neutral-700"
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
