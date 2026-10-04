import React, { useState } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  Coins, 
  Building2, 
  ExternalLink, 
  RefreshCw,
  Sliders
} from "lucide-react";
import { schemes as allSchemes } from "../data/schemes";
import { matchSchemes } from "../data/schemeMatcher";
import ApplicationDossier from "./ApplicationDossier";

export default function FindSchemePage({ lang = "en" }) {
  const [step, setStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [selectedDossierScheme, setSelectedDossierScheme] = useState(null);

  const [formData, setFormData] = useState({
    purpose: "biz",
    bizType: "start",
    age: 28,
    gender: "female",
    state: "Maharashtra",
    location: "rural",
    amount: 500000,
    income: 200000,
    skill: "skilled",
    hasCasteCert: true,
    category: "OBC",
    hasUdyam: true,
    isDisabled: false,
    education: "10th",
  });

  const totalSteps = 7;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const matchedResults = matchSchemes(formData, allSchemes, lang);

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="w-full min-h-[85vh] bg-[#F2F2F2] py-12 px-4 sm:px-6 lg:px-8 text-[#111111]">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E5E5E5] text-xs font-bold text-neutral-600 shadow-xs">
            <Sparkles size={13} className="text-[#FF6B3D]" />
            <span>AI-Driven Statutory Policy Matching</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#111111] font-['Urbanist',sans-serif]">
            Find Your Eligible Schemes
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto">
            Answer 7 targeted questions to determine your statutory eligibility across 27+ central and state policies.
          </p>
        </div>

        {!showResults ? (
          /* Step Wizard Bento Card */
          <div className="bento-card bg-white p-7 sm:p-10 rounded-[32px] border border-[#E5E5E5] shadow-bento-soft space-y-8">
            
            {/* Progress Bar & Step Indicator */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#FF6B3D] uppercase tracking-wider">
                  Step {step} of {totalSteps}
                </span>
                <span className="text-neutral-400">
                  {Math.round((step / totalSteps) * 100)}% Completed
                </span>
              </div>
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF6B3D] rounded-full transition-all duration-300"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step 1: Funding Purpose */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in">
                <h3 className="text-xl font-bold text-[#111111] font-['Urbanist',sans-serif]">
                  What is the primary purpose of your funding requirement?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: "start", label: "Start New Business", desc: "For new ventures, shop setups, equipment" },
                    { id: "expand", label: "Expand Existing Business", desc: "Working capital, machinery upgrade" },
                    { id: "edu", label: "Higher Education Loan", desc: "Studies in India or Abroad" },
                    { id: "artisan", label: "Artisan / Traditional Craft", desc: "Handicrafts, weaving, pottery, tools" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, bizType: item.id })}
                      className={`p-5 rounded-[22px] border text-left transition-all cursor-pointer ${
                        formData.bizType === item.id
                          ? "bg-[#111111] text-white border-transparent shadow-md"
                          : "bg-[#F8F9FA] text-[#111111] border-[#E5E5E5] hover:border-neutral-400"
                      }`}
                    >
                      <div className="font-bold text-base">{item.label}</div>
                      <div className={`text-xs mt-1 ${formData.bizType === item.id ? "text-neutral-300" : "text-neutral-500"}`}>
                        {item.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Demographics */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in">
                <h3 className="text-xl font-bold text-[#111111] font-['Urbanist',sans-serif]">
                  What is your age and gender?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                      Applicant Age: <span className="text-[#111111] text-sm">{formData.age} Years</span>
                    </label>
                    <input
                      type="range"
                      min="18"
                      max="70"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                      className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#FF6B3D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                      Gender
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["female", "male", "other"].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setFormData({ ...formData, gender: g })}
                          className={`py-3 px-3 rounded-2xl border text-xs font-bold capitalize transition-all cursor-pointer ${
                            formData.gender === g
                              ? "bg-[#FF6B3D] text-white border-transparent shadow-orange-glow/30"
                              : "bg-[#F8F9FA] text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in">
                <h3 className="text-xl font-bold text-[#111111] font-['Urbanist',sans-serif]">
                  Where is your project or residence located?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                      State / UT
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-[#F8F9FA] border border-neutral-200 text-sm font-semibold focus:outline-none focus:border-[#FF6B3D]"
                    >
                      {["Maharashtra", "Uttar Pradesh", "Tamil Nadu", "Karnataka", "Delhi", "Gujarat", "Rajasthan", "Bihar", "West Bengal"].map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                      Area Type (Affects Subsidy Rate)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["rural", "urban"].map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => setFormData({ ...formData, location: loc })}
                          className={`py-3 px-3 rounded-2xl border text-xs font-bold capitalize transition-all cursor-pointer ${
                            formData.location === loc
                              ? "bg-[#111111] text-white border-transparent shadow-md"
                              : "bg-[#F8F9FA] text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                          }`}
                        >
                          {loc === "rural" ? "Rural (35% Grant)" : "Urban (25% Grant)"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Loan Amount Requirement */}
            {step === 4 && (
              <div className="space-y-5 animate-in fade-in">
                <h3 className="text-xl font-bold text-[#111111] font-['Urbanist',sans-serif]">
                  How much funding / loan assistance do you require?
                </h3>
                <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-neutral-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-neutral-500 uppercase">Estimated Project Cost</span>
                    <span className="text-2xl font-black text-[#FF6B3D] font-['Urbanist',sans-serif]">
                      {formatCurrency(formData.amount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="5000000"
                    step="25000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#FF6B3D]"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-400 font-semibold">
                    <span>₹50,000</span>
                    <span>₹25 Lakhs</span>
                    <span>₹50 Lakhs</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Annual Income */}
            {step === 5 && (
              <div className="space-y-5 animate-in fade-in">
                <h3 className="text-xl font-bold text-[#111111] font-['Urbanist',sans-serif]">
                  What is your total annual family income?
                </h3>
                <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-neutral-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-neutral-500 uppercase">Annual Income</span>
                    <span className="text-2xl font-black text-[#111111] font-['Urbanist',sans-serif]">
                      {formatCurrency(formData.income)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    step="20000"
                    value={formData.income}
                    onChange={(e) => setFormData({ ...formData, income: Number(e.target.value) })}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#111111]"
                  />
                  <p className="text-xs text-neutral-500">
                    💡 Concessional schemes like MSY & SSY require income below ₹3.0 Lakhs.
                  </p>
                </div>
              </div>
            )}

            {/* Step 6: Skill Level & Activity */}
            {step === 6 && (
              <div className="space-y-5 animate-in fade-in">
                <h3 className="text-xl font-bold text-[#111111] font-['Urbanist',sans-serif]">
                  What is your current trade or enterprise type?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "unskilled", label: "Unskilled / Individual", desc: "First-time entrepreneur" },
                    { id: "skilled", label: "Skilled Artisan / Trade", desc: "Recognized craft or trade" },
                    { id: "msme", label: "Registered Small MSME", desc: "Existing micro-enterprise" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, skill: item.id })}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        formData.skill === item.id
                          ? "bg-[#111111] text-white border-transparent shadow-md"
                          : "bg-[#F8F9FA] text-[#111111] border-neutral-200 hover:bg-neutral-100"
                      }`}
                    >
                      <div className="font-bold text-sm">{item.label}</div>
                      <div className={`text-xs mt-1 ${formData.skill === item.id ? "text-neutral-300" : "text-neutral-500"}`}>
                        {item.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 7: Documents Checklist */}
            {step === 7 && (
              <div className="space-y-5 animate-in fade-in">
                <h3 className="text-xl font-bold text-[#111111] font-['Urbanist',sans-serif]">
                  Which official documents do you currently possess?
                </h3>
                <div className="space-y-3">
                  {[
                    { key: "hasCasteCert", label: "Valid Category / Caste Certificate (SC / ST / OBC)", desc: "Enables concessional interest and special 35% subsidies" },
                    { key: "hasUdyam", label: "MSME Udyam Registration Certificate", desc: "Unlocks collateral-free credit guarantee covers" },
                    { key: "isDisabled", label: "Certified Disability Proof (Divyangjan)", desc: "Eligible for NHFDC concessional lending" },
                  ].map((doc) => (
                    <label
                      key={doc.key}
                      className="p-4 rounded-2xl bg-[#F8F9FA] border border-neutral-200 hover:border-neutral-300 flex items-start gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData[doc.key]}
                        onChange={(e) => setFormData({ ...formData, [doc.key]: e.target.checked })}
                        className="w-5 h-5 rounded accent-[#FF6B3D] mt-0.5"
                      />
                      <div>
                        <div className="text-sm font-bold text-[#111111]">{doc.label}</div>
                        <div className="text-xs text-neutral-500">{doc.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </button>
              ) : <div></div>}

              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3.5 rounded-full bg-[#FF6B3D] hover:bg-[#ff5722] text-white text-xs font-bold shadow-orange-glow transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{step === totalSteps ? "Compute Matches" : "Continue"}</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        ) : (
          /* Results View in Bento Cards */
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-[#111111] font-['Urbanist',sans-serif]">
                Matched Financial Policies ({matchedResults.length})
              </h2>
              <button
                onClick={() => {
                  setShowResults(false);
                  setStep(1);
                }}
                className="px-4 py-2 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-xs font-bold text-neutral-700 flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <RefreshCw size={13} />
                <span>Recalculate</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {matchedResults.map((scheme, idx) => (
                <div
                  key={scheme.id || idx}
                  className="bento-card bg-white p-6 sm:p-8 rounded-[28px] border border-[#E5E5E5] shadow-bento-soft space-y-5"
                >
                  {/* Top Row: Tag, Authority & Score */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-100">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                        {scheme.target || "Central Policy"}
                      </span>
                      {scheme.source_citation && (
                        <span className="text-xs text-neutral-500 font-medium">
                          Authority: <strong>{scheme.source_citation.authority}</strong>
                        </span>
                      )}
                    </div>

                    <div className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                      <ShieldCheck size={13} />
                      <span>{scheme.matchScore}% Match Score</span>
                    </div>
                  </div>

                  {/* Name & Desc */}
                  <div>
                    <h3 className="text-xl font-bold text-[#111111] font-['Urbanist',sans-serif]">
                      {scheme.name}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      {scheme.desc || scheme.shortDesc}
                    </p>
                  </div>

                  {/* Benefit Estimate Highlight */}
                  {scheme.benefit_estimate && (
                    <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                          {scheme.benefit_estimate.label}
                        </div>
                        <div className="text-xl font-black text-emerald-950 font-['Urbanist',sans-serif]">
                          {scheme.benefit_estimate.formatted}
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-white px-3 py-1 rounded-full border border-emerald-200">
                        Non-Repayable Benefit
                      </span>
                    </div>
                  )}

                  {/* Document Gap Alert */}
                  {scheme.document_analysis?.missing?.length > 0 && (
                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                      <AlertTriangle size={15} className="text-amber-700 shrink-0" />
                      <span>
                        <strong>Action Needed:</strong> Missing {scheme.document_analysis.missing.map(d => d.name).join(", ")}.
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedDossierScheme(scheme)}
                      className="px-6 py-3 rounded-full bg-[#111111] hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
                    >
                      <FileText size={14} />
                      <span>Download Bank Application Dossier</span>
                    </button>

                    <a
                      href={scheme.official_application_portal || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full bg-[#FF6B3D] hover:bg-[#ff5722] text-white text-xs font-bold shadow-orange-glow flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Apply on Official Portal</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Application Dossier Modal */}
      {selectedDossierScheme && (
        <ApplicationDossier
          scheme={selectedDossierScheme}
          userData={formData}
          lang={lang}
          onClose={() => setSelectedDossierScheme(null)}
        />
      )}
    </div>
  );
}
