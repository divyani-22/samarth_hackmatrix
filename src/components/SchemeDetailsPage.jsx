import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, ShieldCheck, FileText, Download, Building2, Sparkles, CheckCircle2 } from "lucide-react";
import schemesData from "../data/schemesData.json";
import { schemes as rawSchemes } from "../data/schemes";

export default function SchemeDetailsPage({ onDownloadDossier, lang = "en" }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find scheme in json or full schemes array
  const scheme =
    schemesData.find((s) => s.id === id) ||
    rawSchemes.find((s) => s.id === id) ||
    schemesData[0];

  return (
    <div className="w-full min-h-[85vh] bg-[#F2F2F2] py-10 px-4 sm:px-6 lg:px-8 text-[#111111]">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-[#111111] transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Directory</span>
        </button>

        {/* Scheme Hero Bento Card */}
        <div className="bento-card bg-[#111111] text-white p-8 sm:p-10 rounded-[32px] shadow-bento-dark space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#FF6B3D] text-white text-xs font-bold">
              {scheme.category || "Government Policy"}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium flex items-center gap-1">
              <Building2 size={13} />
              {scheme.stateScope || "All India"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight font-['Urbanist',sans-serif]">
            {scheme.name}
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
            {scheme.shortBenefit || scheme.shortDesc}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div className="bg-[#1E1E1E] p-4 rounded-2xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Max Benefit</span>
              <div className="text-lg font-black text-white mt-1">
                {scheme.maxBenefit || scheme.maxAmount || "₹50 Lakhs"}
              </div>
            </div>
            <div className="bg-[#1E1E1E] p-4 rounded-2xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Interest / Grant</span>
              <div className="text-lg font-black text-[#FF6B3D] mt-1">
                {scheme.interestRate || scheme.interest || "Concessional"}
              </div>
            </div>
            <div className="bg-[#1E1E1E] p-4 rounded-2xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Authority</span>
              <div className="text-xs font-bold text-neutral-200 mt-1 line-clamp-1">
                {scheme.department || scheme.implementing_agency || "Central Ministry"}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections (White Bento Card) */}
        <div className="bento-card bg-white p-8 rounded-[32px] border border-[#E5E5E5] shadow-bento-soft space-y-8">
          
          {/* Statutory Eligibility Criteria */}
          <div>
            <h3 className="text-lg font-bold text-[#111111] uppercase tracking-wider mb-4 flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#22C55E]" />
              <span>Statutory Eligibility Guidelines</span>
            </h3>
            <ul className="space-y-3">
              {(scheme.eligibilityCriteria || scheme.eligibility || [
                "Age between 18 to 65 years.",
                "Annual family income within statutory limits.",
                "Valid identification documents."
              ]).map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-neutral-700">
                  <CheckCircle2 size={16} className="text-[#22C55E] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mandatory Documents Required */}
          <div>
            <h3 className="text-lg font-bold text-[#111111] uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileText size={18} className="text-[#4C7CF3]" />
              <span>Required Application Documents</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(scheme.documentsRequired || [
                "Aadhaar Card",
                "Income Certificate",
                "Category / Caste Certificate (if applicable)",
                "Bank Account Passbook",
                "Passport size photographs"
              ]).map((doc, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-neutral-200 text-xs font-semibold text-neutral-800 flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B3D]"></span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => {
                if (onDownloadDossier) onDownloadDossier(scheme);
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#111111] hover:bg-neutral-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Download size={15} />
              <span>Download Bank Application Dossier</span>
            </button>

            <a
              href={scheme.officialLink || scheme.official_application_portal || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FF6B3D] hover:bg-[#ff5722] text-white text-xs font-bold shadow-orange-glow flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Apply on Official Portal</span>
              <ExternalLink size={15} />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
