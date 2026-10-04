import React from "react";
import { X, ExternalLink, CheckCircle2, FileText, Building2, ShieldCheck, Download, Sparkles } from "lucide-react";

export default function SchemeDrawerModal({ scheme, onClose, onDownloadDossier }) {
  if (!scheme) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-[32px] shadow-2xl border border-neutral-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#111111] text-white p-6 sm:p-8 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#FF6B3D] text-white text-[11px] font-bold">
                {scheme.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-medium flex items-center gap-1">
                <Building2 size={12} />
                {scheme.stateScope}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug font-['Urbanist',sans-serif]">
              {scheme.name}
            </h3>
            <p className="text-xs text-neutral-400">
              {scheme.department}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#111111]">
          
          {/* Key Metrics Highlight Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-neutral-200">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Max Benefit / Loan</span>
              <div className="text-lg font-black text-[#111111] mt-0.5">{scheme.maxBenefit}</div>
            </div>
            <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-neutral-200">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Interest / Grant Type</span>
              <div className="text-lg font-black text-[#FF6B3D] mt-0.5">{scheme.interestRate}</div>
            </div>
            <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-neutral-200">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Target Group</span>
              <div className="text-xs font-bold text-[#111111] mt-1 line-clamp-1">{scheme.targetAudience}</div>
            </div>
          </div>

          {/* Scheme Summary */}
          <div>
            <h4 className="text-sm font-bold text-[#111111] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#FF6B3D]" />
              <span>Scheme Overview</span>
            </h4>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {scheme.shortBenefit}
            </p>
          </div>

          {/* Statutory Eligibility Criteria */}
          <div>
            <h4 className="text-sm font-bold text-[#111111] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-[#22C55E]" />
              <span>Statutory Eligibility Rules</span>
            </h4>
            <ul className="space-y-2.5">
              {scheme.eligibilityCriteria.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                  <CheckCircle2 size={16} className="text-[#22C55E] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Documents Checklist */}
          <div>
            <h4 className="text-sm font-bold text-[#111111] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <FileText size={15} className="text-[#4C7CF3]" />
              <span>Mandatory Documents Checklist</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scheme.documentsRequired.map((doc, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B3D]"></span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Application Guidance */}
          <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200 text-xs text-neutral-700">
            <span className="font-bold text-[#111111] block mb-1">Application Route:</span>
            <span>{scheme.applicationProcess}</span>
          </div>

        </div>

        {/* Modal Actions Footer */}
        <div className="p-5 sm:p-6 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              if (onDownloadDossier) onDownloadDossier(scheme);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-neutral-100 text-[#111111] text-xs font-bold border border-neutral-300 shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Download size={14} />
            <span>Download Bank Dossier</span>
          </button>

          <a
            href={scheme.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#FF6B3D] hover:bg-[#ff5722] text-white text-xs font-bold shadow-orange-glow flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Apply on Official Portal</span>
            <ExternalLink size={14} />
          </a>
        </div>

      </div>
    </div>
  );
}
