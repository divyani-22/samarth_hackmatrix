import React from "react";
import { X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, ExternalLink } from "lucide-react";
import schemesData from "../data/schemesData.json";

export default function QuickEligibilityModal({ criteria, onClose, onSelectScheme }) {
  if (!criteria) return null;

  // Simple deterministic scoring match for display
  const matchedSchemes = schemesData.map((scheme) => {
    let score = 85;
    if (criteria.occupation && criteria.occupation.toLowerCase().includes("farmer") && scheme.category === "Agriculture") {
      score = 98;
    } else if (criteria.occupation && criteria.occupation.toLowerCase().includes("business") && scheme.category === "Employment") {
      score = 96;
    } else if (criteria.occupation && criteria.occupation.toLowerCase().includes("woman") && scheme.category === "Women & Child") {
      score = 99;
    } else if (criteria.occupation && criteria.occupation.toLowerCase().includes("student") && scheme.category === "Education") {
      score = 95;
    } else if (scheme.stateScope === "All India") {
      score = 88;
    }

    return {
      ...scheme,
      matchScore: score,
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  const topMatches = matchedSchemes.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-[32px] shadow-2xl border border-neutral-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#111111] text-white p-6 sm:p-8 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22C55E]/20 text-[#22C55E] text-xs font-bold mb-2">
              <ShieldCheck size={13} />
              <span>Eligibility Computed Successfully</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-['Urbanist',sans-serif]">
              Your Matching Schemes
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Based on profile: <span className="text-white font-semibold">{criteria.state || "All India"}</span> • {criteria.age || "Adult"} • {criteria.category || "General"} • <span className="text-[#FF6B3D] font-semibold">{criteria.occupation || "General"}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Matches List */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
          {topMatches.map((scheme) => (
            <div
              key={scheme.id}
              className="p-5 rounded-[24px] bg-[#F8F9FA] border border-neutral-200 hover:border-neutral-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 max-w-lg">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white text-neutral-800 text-[11px] font-bold border border-neutral-200">
                    {scheme.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                    <CheckCircle2 size={11} />
                    {scheme.matchScore}% Match
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#111111] font-['Urbanist',sans-serif]">
                  {scheme.name}
                </h4>
                <p className="text-xs text-neutral-500 line-clamp-1">
                  {scheme.shortBenefit}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => {
                    onClose();
                    onSelectScheme(scheme);
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#111111] hover:bg-[#FF6B3D] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <span>View Details</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-5 bg-neutral-50 border-t border-neutral-200 text-center">
          <p className="text-xs text-neutral-500">
            Want to explore all 500+ schemes?{" "}
            <a
              href="#explore-schemes"
              onClick={onClose}
              className="text-[#FF6B3D] font-bold hover:underline"
            >
              Browse Complete Directory
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
