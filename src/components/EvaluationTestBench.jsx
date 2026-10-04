import { useState } from "react";
import { testScenarios } from "../data/testScenarios";
import { matchSchemes } from "../data/schemeMatcher";
import { schemes as defaultSchemes } from "../data/schemes";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  ShieldCheck,
  Scale,
  ArrowRight,
  TrendingUp,
  BookOpen,
  HelpCircle,
  ExternalLink,
  Layers,
  Sparkles
} from "lucide-react";

export default function EvaluationTestBench({ lang = "en" }) {
  const [selectedScenarioId, setSelectedScenarioId] = useState(testScenarios[0].id);
  const [activeFilter, setActiveFilter] = useState("ALL"); // ALL | ELIGIBLE | BORDERLINE_MANUAL_REVIEW | INELIGIBLE
  const [expandedSchemeId, setExpandedSchemeId] = useState(null);

  const activeScenario = testScenarios.find((s) => s.id === selectedScenarioId) || testScenarios[0];

  // Execute determination live
  const liveResults = matchSchemes(activeScenario.applicant, defaultSchemes, lang);

  const eligibleCount = liveResults.filter((r) => r.triage_status === "ELIGIBLE").length;
  const borderlineCount = liveResults.filter((r) => r.triage_status === "BORDERLINE_MANUAL_REVIEW").length;
  const ineligibleCount = liveResults.filter((r) => r.triage_status === "INELIGIBLE").length;

  const filteredResults = liveResults.filter((r) => {
    if (activeFilter === "ALL") return true;
    return r.triage_status === activeFilter;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Top Banner Bento Card */}
      <div className="bg-[#181C24] rounded-[32px] p-6 md:p-8 text-white shadow-sm mb-8 border border-white/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#FF6B3D]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF6B3D]/20 text-[#FF6B3D] text-xs font-bold uppercase tracking-wider mb-2 border border-[#FF6B3D]/30">
              <Scale className="w-3.5 h-3.5" /> Statutory Policy Evaluation Bench
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Test Harness & 3-State Triage Benchmark
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl leading-relaxed">
              Live automated test harness verifying determination logic against <strong>Clearly Eligible</strong>, <strong>Clearly Ineligible</strong>, and <strong>Borderline / Manual Review</strong> cases with statutory rule citations.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-4 py-1.5 rounded-full bg-white/10 text-white font-mono border border-white/10">
              Live Engine v2.5
            </span>
          </div>
        </div>

        {/* Scenario Selector Pills */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          {testScenarios.map((sc) => {
            const isSelected = sc.id === selectedScenarioId;
            let badgeStyle = "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
            if (sc.badgeColor === "red") badgeStyle = "bg-rose-500/20 text-rose-300 border-rose-500/40";
            if (sc.badgeColor === "amber") badgeStyle = "bg-amber-500/20 text-amber-300 border-amber-500/40";
            if (sc.badgeColor === "blue") badgeStyle = "bg-blue-500/20 text-blue-300 border-blue-500/40";

            return (
              <button
                key={sc.id}
                onClick={() => {
                  setSelectedScenarioId(sc.id);
                  setExpandedSchemeId(null);
                }}
                className={`p-4 rounded-[22px] text-left transition-all border flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? "bg-white text-[#111827] shadow-md scale-[1.02] border-white"
                    : "bg-white/5 text-slate-200 hover:bg-white/10 border-white/10"
                }`}
              >
                <div>
                  <span
                    className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border mb-2 ${
                      isSelected
                        ? sc.badgeColor === "red"
                          ? "bg-rose-100 text-rose-800 border-rose-300"
                          : sc.badgeColor === "amber"
                          ? "bg-amber-100 text-amber-800 border-amber-300"
                          : "bg-emerald-100 text-emerald-800 border-emerald-300"
                        : badgeStyle
                    }`}
                  >
                    {sc.badge}
                  </span>
                  <div className="font-bold text-sm leading-snug line-clamp-2">
                    {sc.applicant.name}
                  </div>
                </div>
                <div className={`text-xs mt-3 line-clamp-2 ${isSelected ? "text-slate-600" : "text-slate-400"}`}>
                  {sc.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Applicant Profile Card & Evaluation Audit Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Applicant Profile Card */}
        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-4 border-b border-[#E5E7EB] pb-3">
            <h3 className="font-bold text-[#111827] text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#FF6B3D]" />
              Applicant Profile Data
            </h3>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F4F5F7] text-slate-700 uppercase">
              {activeScenario.applicant.entity_type}
            </span>
          </div>

          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Applicant / Unit:</span>
              <span className="font-semibold text-slate-800">{activeScenario.applicant.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Social Category / Caste:</span>
              <span className="font-semibold text-slate-800">{activeScenario.applicant.caste} ({activeScenario.applicant.gender})</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Declared Annual Income:</span>
              <span className="font-semibold text-slate-800">₹{activeScenario.applicant.income.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Turnover / Project Outlay:</span>
              <span className="font-semibold text-slate-800">₹{(activeScenario.applicant.turnover || activeScenario.applicant.amount).toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Location & Area:</span>
              <span className="font-semibold text-slate-800 capitalize">{activeScenario.applicant.area}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Audit Status:</span>
              <span className={`font-semibold text-xs px-2 py-0.5 rounded ${activeScenario.applicant.is_self_certified_only ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>
                {activeScenario.applicant.is_self_certified_only ? "Unverified / Self-Certified" : "Gazette / CA Verified"}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-600 mb-2">Attached Document Proofs:</div>
            <div className="flex flex-wrap gap-1.5">
              {(activeScenario.applicant.providedDocuments || []).map((docId) => (
                <span key={docId} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                  ✓ {docId.replace(/_/g, " ")}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Expected vs Actual Evaluator Matrix */}
        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-[#E5E7EB] lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-[#E5E7EB] pb-3">
              <h3 className="font-bold text-[#111827] text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#FF6B3D]" />
                Evaluator Benchmark Assessment
              </h3>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500">Expected Triage:</span>
                <span className="font-bold px-3 py-1 rounded-full bg-[#FF6B3D]/10 text-[#FF6B3D] font-mono border border-[#FF6B3D]/20">
                  {activeScenario.expectedTriage}
                </span>
              </div>
            </div>

            <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl p-4 mb-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Official Benchmark Note:
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {activeScenario.evaluatorNotes}
              </p>
            </div>

            {activeScenario.flaggedReasons && (
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 mb-4">
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Borderline Review Triggers Detected:
                </div>
                <ul className="list-disc list-inside text-xs text-amber-900 space-y-1">
                  {activeScenario.flaggedReasons.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Triage Counts Bar */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E5E7EB]">
            <button
              onClick={() => setActiveFilter("ELIGIBLE")}
              className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                activeFilter === "ELIGIBLE"
                  ? "bg-emerald-500 text-white border-emerald-600 shadow-sm"
                  : "bg-emerald-50/80 text-emerald-900 border-emerald-200 hover:bg-emerald-100"
              }`}
            >
              <div className="text-2xl font-black">{eligibleCount}</div>
              <div className="text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Eligible
              </div>
            </button>

            <button
              onClick={() => setActiveFilter("BORDERLINE_MANUAL_REVIEW")}
              className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                activeFilter === "BORDERLINE_MANUAL_REVIEW"
                  ? "bg-amber-500 text-white border-amber-600 shadow-sm"
                  : "bg-amber-50/80 text-amber-900 border-amber-200 hover:bg-amber-100"
              }`}
            >
              <div className="text-2xl font-black">{borderlineCount}</div>
              <div className="text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 mt-0.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Manual Review
              </div>
            </button>

            <button
              onClick={() => setActiveFilter("INELIGIBLE")}
              className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                activeFilter === "INELIGIBLE"
                  ? "bg-rose-500 text-white border-rose-600 shadow-sm"
                  : "bg-rose-50/80 text-rose-900 border-rose-200 hover:bg-rose-100"
              }`}
            >
              <div className="text-2xl font-black">{ineligibleCount}</div>
              <div className="text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 mt-0.5">
                <XCircle className="w-3.5 h-3.5" /> Ineligible
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-slate-700 mr-1">Display Policy Determinations:</span>
          <button
            onClick={() => setActiveFilter("ALL")}
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
              activeFilter === "ALL"
                ? "bg-[#111827] text-white border-[#111827] shadow-xs"
                : "bg-white text-slate-700 border-[#E5E7EB] hover:bg-[#F4F5F7]"
            }`}
          >
            All Policies ({liveResults.length})
          </button>
          <button
            onClick={() => setActiveFilter("ELIGIBLE")}
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
              activeFilter === "ELIGIBLE"
                ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                : "bg-white text-emerald-800 border-[#E5E7EB] hover:bg-emerald-50"
            }`}
          >
            Eligible ({eligibleCount})
          </button>
          <button
            onClick={() => setActiveFilter("BORDERLINE_MANUAL_REVIEW")}
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
              activeFilter === "BORDERLINE_MANUAL_REVIEW"
                ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                : "bg-white text-amber-800 border-[#E5E7EB] hover:bg-amber-50"
            }`}
          >
            Manual Review Needed ({borderlineCount})
          </button>
          <button
            onClick={() => setActiveFilter("INELIGIBLE")}
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
              activeFilter === "INELIGIBLE"
                ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                : "bg-white text-rose-800 border-[#E5E7EB] hover:bg-rose-50"
            }`}
          >
            Ineligible ({ineligibleCount})
          </button>
        </div>
      </div>

      {/* List of Evaluated Policy Determinations */}
      <div className="space-y-4">
        {filteredResults.map((policy) => {
          const isExpanded = expandedSchemeId === policy.id;
          const isEligible = policy.triage_status === "ELIGIBLE";
          const isBorderline = policy.triage_status === "BORDERLINE_MANUAL_REVIEW";
          const isIneligible = policy.triage_status === "INELIGIBLE";

          return (
            <div
              key={policy.id}
              className={`bg-white rounded-[24px] border transition-all shadow-sm overflow-hidden ${
                isEligible
                  ? "border-emerald-200/80 hover:border-emerald-300"
                  : isBorderline
                  ? "border-amber-200/80 hover:border-amber-300"
                  : "border-[#E5E7EB] opacity-90"
              }`}
            >
              {/* Header Row */}
              <div className="p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {/* 3-State Triage Badge */}
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border ${
                        isEligible
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : isBorderline
                          ? "bg-amber-50 text-amber-800 border-amber-300"
                          : "bg-rose-50 text-rose-800 border-rose-300"
                      }`}
                    >
                      {isEligible && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      {isBorderline && <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
                      {isIneligible && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                      {policy.triage_badge.label}
                    </span>

                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F4F5F7] text-slate-700 font-medium capitalize">
                      {policy.policy_type ? policy.policy_type.replace(/_/g, " ") : "Concessional Loan"}
                    </span>

                    <span className="text-xs text-slate-500 font-mono">
                      Score: {policy.matchScore}%
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#111827] leading-snug">
                    {policy.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                    {policy.shortDesc || policy.description}
                  </p>
                </div>

                {/* Benefit Amount & Action */}
                <div className="flex md:flex-col items-end justify-between w-full md:w-auto gap-2 border-t md:border-t-0 pt-3 md:pt-0">
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Estimated Benefit:
                    </div>
                    <div className="text-2xl font-black text-[#FF6B3D]">
                      {policy.benefit_estimate?.formatted || "₹0"}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {policy.benefit_estimate?.label || "Financial Assistance"}
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedSchemeId(isExpanded ? null : policy.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F4F5F7] hover:bg-[#E5E7EB] text-[#111827] text-xs font-bold transition-colors cursor-pointer border border-[#E5E7EB]"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#FF6B3D]" />
                    {isExpanded ? "Hide Rule Audit" : "View Rule Clauses & Proofs"}
                  </button>
                </div>
              </div>

              {/* Collapsible Rule & Clause Audit Panel */}
              {isExpanded && (
                <div className="bg-slate-50/70 border-t border-slate-200 p-5 space-y-6 animate-in slide-in-from-top-2 duration-300">
                  {/* Statutory Document & Legal Source */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Scale className="w-4 h-4 text-indigo-600" />
                        Source Legal Gazette & Governing Authority
                      </div>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 font-semibold">
                        {policy.source_citation.authority}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-slate-800">
                      {policy.source_citation.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                      <span>Specific Clause: <strong className="text-slate-700">{policy.source_citation.clause}</strong></span>
                      {policy.source_citation.gazette_url && policy.source_citation.gazette_url !== "#" && (
                        <a
                          href={policy.source_citation.gazette_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-indigo-600 hover:underline font-medium"
                        >
                          Official Guidelines Link <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Rule-by-Rule Determination Audit Table */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                      Clause-by-Clause Evaluation Breakdown
                    </h4>
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                          <tr>
                            <th className="py-2.5 px-3">Statutory Clause</th>
                            <th className="py-2.5 px-3">Rule Mandate</th>
                            <th className="py-2.5 px-3">Applicant Value</th>
                            <th className="py-2.5 px-3">Evaluation Determination</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {(policy.rule_determinations || []).map((rule, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50">
                              <td className="py-2.5 px-3 font-mono font-medium text-slate-800">
                                {rule.clause}
                              </td>
                              <td className="py-2.5 px-3 text-slate-600">
                                {rule.rule_text}
                              </td>
                              <td className="py-2.5 px-3 font-semibold text-slate-700">
                                {rule.applicant_value || "N/A"}
                              </td>
                              <td className="py-2.5 px-3">
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                                    rule.status === "PASS"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : rule.status === "BORDERLINE"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-rose-100 text-rose-800"
                                  }`}
                                >
                                  {rule.status === "PASS" && <CheckCircle2 className="w-3 h-3" />}
                                  {rule.status === "BORDERLINE" && <AlertTriangle className="w-3 h-3" />}
                                  {rule.status === "FAIL" && <XCircle className="w-3 h-3" />}
                                  {rule.status}
                                </span>
                                <div className="text-[11px] text-slate-500 mt-1">
                                  {rule.explanation}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Benefit Breakdown & Document Gap Matrix */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Benefit Calculation Breakdown */}
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        Benefit Breakdown & Savings Estimate
                      </div>
                      <div className="text-lg font-black text-slate-900 mb-2">
                        {policy.benefit_estimate?.formatted}
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1.5">
                        {(policy.benefit_estimate?.breakdown || []).map((item, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-1.5">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Document Gap Analysis */}
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-indigo-600" />
                        Document Readiness Checklist
                      </div>
                      <div className="space-y-2 text-xs">
                        {(policy.document_analysis?.all_required || []).map((doc) => {
                          const isMissing = policy.document_analysis?.missing?.some((m) => m.id === doc.id);
                          return (
                            <div
                              key={doc.id}
                              className={`p-2 rounded-lg flex items-center justify-between border ${
                                isMissing
                                  ? "bg-rose-50 border-rose-200 text-rose-900"
                                  : "bg-emerald-50 border-emerald-200 text-emerald-900"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {isMissing ? (
                                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                                ) : (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                )}
                                <div>
                                  <span className="font-semibold">{doc.name}</span>
                                  {doc.where_to_get && (
                                    <div className="text-[10px] text-slate-500">
                                      Source: {doc.where_to_get}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isMissing ? "bg-rose-200 text-rose-800" : "bg-emerald-200 text-emerald-800"}`}>
                                {isMissing ? "Missing" : "Verified"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Application Guidance Steps */}
                  {policy.steps && policy.steps.length > 0 && (
                    <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100">
                      <div className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">
                        Next Application Steps & Official Channel
                      </div>
                      <ol className="list-decimal list-inside text-xs text-indigo-950 space-y-1.5">
                        {policy.steps.map((st, sIdx) => (
                          <li key={sIdx} className="leading-relaxed">
                            {st}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
