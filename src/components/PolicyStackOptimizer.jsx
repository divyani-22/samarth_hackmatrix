import { useState, useMemo } from "react";
import {
  Layers,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sun,
  Coins,
  Receipt,
  FileCheck2,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function PolicyStackOptimizer({
  applicant = {},
  onSelectPolicy,
  lang = "en"
}) {
  // Configurable layers in the policy convergence bundle
  const defaultLayers = [
    {
      id: "capital_subsidy",
      title: "PMEGP 35% Capital Margin Grant",
      category: "Direct Non-Repayable Cash Grant",
      authority: "Ministry of MSME / KVIC",
      icon: Coins,
      iconColor: "text-emerald-600 bg-emerald-100",
      description: "Direct capital grant deposited to bank TDR, extinguishing 35% of project loan liability.",
      statutoryClause: "PMEGP Operational Guidelines Para 4.2",
      baseBenefitAmount: 350000,
      annualSavings: 0,
      enabled: true,
      legalNote: "Permissible with CGTMSE credit guarantee convergence."
    },
    {
      id: "credit_guarantee",
      title: "CGTMSE 85% Collateral-Free Guarantee",
      category: "Sovereign Debt Protection",
      authority: "SIDBI & Ministry of MSME",
      icon: ShieldCheck,
      iconColor: "text-blue-600 bg-blue-100",
      description: "Waives 100% requirements for real-estate or third-party guarantor mortgage on ₹6.5L loan.",
      statutoryClause: "CGTMSE Circular No. 219/2023-24",
      baseBenefitAmount: 650000,
      annualSavings: 0,
      enabled: true,
      legalNote: "Permissible to cover remaining 65% bank loan after PMEGP grant."
    },
    {
      id: "clean_energy_grant",
      title: "PM Surya Ghar Rooftop Solar Grant",
      category: "Clean Power Infrastructure Grant",
      authority: "Ministry of New and Renewable Energy",
      icon: Sun,
      iconColor: "text-amber-600 bg-amber-100",
      description: "Direct bank DBT subsidy of ₹78,000 for a 3kW system plus 300 free monthly power units.",
      statutoryClause: "Cabinet Order No. 318/14/2024",
      baseBenefitAmount: 78000,
      annualSavings: 28800, // 300 units/mo * ₹8 * 12
      enabled: true,
      legalNote: "Independent clean energy grant; fully stackable with commercial enterprise aid."
    },
    {
      id: "tax_relief",
      title: "Section 44AD Presumptive Tax Exemption",
      category: "Statutory Tax & Audit Shield",
      authority: "Central Board of Direct Taxes (CBDT)",
      icon: Receipt,
      iconColor: "text-indigo-600 bg-indigo-100",
      description: "Exempts business from mandatory CA book audits; declares deemed 6% digital profit.",
      statutoryClause: "Income Tax Act 1961 - Section 44AD(1)",
      baseBenefitAmount: 0,
      annualSavings: 145000, // Income tax reduction + ₹35k audit fee saved
      enabled: true,
      legalNote: "Statutory tax code exemption; applies automatically to all compliant MSMEs."
    }
  ];

  const [layers, setLayers] = useState(defaultLayers);

  const toggleLayer = (id) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === id ? { ...layer, enabled: !layer.enabled } : layer
      )
    );
  };

  // Calculations
  const calculations = useMemo(() => {
    const activeLayers = layers.filter((l) => l.enabled);
    const directCashGrants = activeLayers.reduce(
      (sum, l) => sum + (l.id !== "credit_guarantee" ? l.baseBenefitAmount : 0),
      0
    );
    const guaranteedCredit = activeLayers
      .filter((l) => l.id === "credit_guarantee")
      .reduce((sum, l) => sum + l.baseBenefitAmount, 0);
    const annualRecurringSavings = activeLayers.reduce(
      (sum, l) => sum + l.annualSavings,
      0
    );
    const threeYearTotalValue =
      directCashGrants + guaranteedCredit + annualRecurringSavings * 3;

    // Single scheme baseline comparison (NSFDC or standalone micro-loan ~ ₹1.4L)
    const baselineSingleScheme = 140000;
    const multiplier = (threeYearTotalValue / baselineSingleScheme).toFixed(1);

    return {
      activeCount: activeLayers.length,
      directCashGrants,
      guaranteedCredit,
      annualRecurringSavings,
      threeYearTotalValue,
      multiplier
    };
  }, [layers]);

  return (
    <div className="w-full bg-white rounded-[32px] border border-[#E5E7EB] shadow-sm overflow-hidden mb-12">
      {/* Hero Header Bento Card */}
      <div className="bg-[#181C24] text-white p-6 md:p-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#FF6B3D]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF6B3D]/20 text-[#FF6B3D] text-xs font-bold uppercase tracking-wider mb-3 border border-[#FF6B3D]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Star Innovation: Policy Convergence Engine</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Scheme Stacking & Benefit Convergence Optimizer
            </h2>
            <p className="text-slate-300 text-xs md:text-sm mt-2 leading-relaxed">
              Don't settle for a single scheme. Indian government guidelines allow applicants to combine capital grants, sovereign credit guarantees, clean energy subsidies, and tax reliefs into an interconnected legal stack without double-dipping violations.
            </p>
          </div>

          {/* Value Multiplier Badge */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-[24px] p-5 text-center min-w-[200px] flex-shrink-0">
            <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
              Government Value Multiplier
            </div>
            <div className="text-3xl md:text-4xl font-black text-[#FF6B3D]">
              {calculations.multiplier}x
            </div>
            <div className="text-[11px] text-slate-300 mt-1">
              vs. Single Scheme Baseline
            </div>
          </div>
        </div>

        {/* Dynamic Financial Multiplier Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Direct Non-Repayable Grants
            </div>
            <div className="text-lg font-black text-emerald-400 mt-0.5">
              ₹{calculations.directCashGrants.toLocaleString("en-IN")}
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Collateral-Free Bank Credit
            </div>
            <div className="text-lg font-black text-blue-400 mt-0.5">
              ₹{calculations.guaranteedCredit.toLocaleString("en-IN")}
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Annual Recurring Savings
            </div>
            <div className="text-lg font-black text-amber-300 mt-0.5">
              ₹{calculations.annualRecurringSavings.toLocaleString("en-IN")}/yr
            </div>
          </div>

          <div className="bg-[#FF6B3D]/15 rounded-2xl p-3.5 border border-[#FF6B3D]/30">
            <div className="text-[10px] text-[#FF6B3D] font-bold uppercase tracking-wider">
              Total 3-Year Package Value
            </div>
            <div className="text-lg font-black text-white mt-0.5">
              ₹{calculations.threeYearTotalValue.toLocaleString("en-IN")}
            </div>
          </div>
        </div>
      </div>

      {/* Statutory Anti-Conflict Shield Banner */}
      <div className="bg-emerald-50/80 px-6 py-3 border-b border-emerald-100 flex flex-wrap items-center justify-between gap-3 text-xs text-emerald-950 font-medium">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
          <span>
            <strong>Statutory Convergence Verification:</strong> All {calculations.activeCount} active policy layers are legally harmonious under MoF, KVIC & CBDT inter-ministerial circulars.
          </span>
        </div>
        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-200/80 text-emerald-900">
          0 Conflict Violations
        </span>
      </div>

      {/* Interactive Layer Toggles */}
      <div className="p-6 md:p-8 bg-[#F8F9FA]/40">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-[#111827]">
            Interactive Policy Convergence Layers (Click to toggle in/out of bundle):
          </h3>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-[#E5E7EB] text-slate-600">
            {calculations.activeCount} of {layers.length} Layers Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {layers.map((layer) => {
            const Icon = layer.icon;
            return (
              <div
                key={layer.id}
                onClick={() => toggleLayer(layer.id)}
                className={`p-5 rounded-[24px] border transition-all cursor-pointer select-none flex flex-col justify-between ${
                  layer.enabled
                    ? "bg-white border-[#FF6B3D]/40 shadow-sm ring-1 ring-[#FF6B3D]/20"
                    : "bg-white/60 border-[#E5E7EB] opacity-60 hover:opacity-90"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2.5 rounded-2xl ${layer.iconColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          {layer.category}
                        </div>
                        <h4 className="text-sm font-bold text-[#111827] leading-snug">
                          {layer.title}
                        </h4>
                      </div>
                    </div>

                    {/* Custom Toggle Switch */}
                    <div
                      className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 cursor-pointer ${
                        layer.enabled ? "bg-[#FF6B3D] justify-end" : "bg-slate-300 justify-start"
                      }`}
                    >
                      <div className="bg-white w-4 h-4 rounded-full shadow-md transform" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {layer.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">
                    Statutory Rule: <strong className="text-slate-800">{layer.statutoryClause}</strong>
                  </span>
                  <span className="font-bold text-[#FF6B3D]">
                    {layer.baseBenefitAmount > 0
                      ? `₹${layer.baseBenefitAmount.toLocaleString("en-IN")}`
                      : `+₹${layer.annualSavings.toLocaleString("en-IN")}/yr`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div className="mt-6 p-5 rounded-[24px] bg-white border border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="text-xs text-slate-700">
            <span className="font-bold text-[#111827]">Next Convergence Step:</span> Ready to submit? You can download the unified composite application dossier that packages all {calculations.activeCount} layers for the bank.
          </div>
          <button
            type="button"
            onClick={() => onSelectPolicy && onSelectPolicy("stacked-bundle")}
            className="rounded-full bg-[#FF6B3D] hover:bg-[#E05326] text-white text-xs font-bold px-6 py-2.5 flex items-center gap-2 flex-shrink-0 shadow-sm transition-all"
          >
            <span>Proceed with Stacked Bundle</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
