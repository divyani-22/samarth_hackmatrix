import { useState, useMemo } from "react";
import {
  Compass,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  FileCheck,
  Building,
  QrCode,
  RotateCcw,
  ExternalLink
} from "lucide-react";

export default function PathToEligibilitySimulator({
  initialApplicant = {},
  onApplyPath,
  lang = "en"
}) {
  // Simulator state: adjustable counterfactual parameters
  const [hasUdyam, setHasUdyam] = useState(Boolean(initialApplicant.has_udyam || false));
  const [digitalRatio, setDigitalRatio] = useState(
    initialApplicant.digital_turnover_ratio ? Math.round(initialApplicant.digital_turnover_ratio * 100) : 60
  );
  const [hasOfficialRevenueSeal, setHasOfficialRevenueSeal] = useState(
    !Boolean(initialApplicant.is_self_certified_only)
  );
  const [projectReportPrepared, setProjectReportPrepared] = useState(false);

  const resetSimulation = () => {
    setHasUdyam(Boolean(initialApplicant.has_udyam || false));
    setDigitalRatio(60);
    setHasOfficialRevenueSeal(!Boolean(initialApplicant.is_self_certified_only));
    setProjectReportPrepared(false);
  };

  // Live evaluation of counterfactual state
  const simulationOutcome = useMemo(() => {
    let unlockedBenefits = 0;
    let unlockedPolicies = [];
    let remainingBarriers = [];

    // Barrier 1: Udyam MSME Registration
    if (hasUdyam) {
      unlockedBenefits += 500000; // CGTMSE collateral-free debt unlocked
      unlockedPolicies.push({
        title: "CGTMSE Collateral-Free Credit Guarantee",
        value: "₹5,00,000 Loan Guarantee",
        authority: "Ministry of MSME"
      });
    } else {
      remainingBarriers.push({
        id: "udyam",
        title: "Missing MSME Udyam Registration",
        description: "Banks cannot extend collateral-free MSME credit without an active 19-digit Udyam number.",
        timeToResolve: "5 Minutes (Free)",
        portalUrl: "https://udyamregistration.gov.in/",
        portalName: "Udyam Official Portal"
      });
    }

    // Barrier 2: Digital Transaction Split (Sec 44AD)
    if (digitalRatio >= 95) {
      unlockedBenefits += 45000;
      unlockedPolicies.push({
        title: "Section 44AD Concessional 6% Deemed Profit",
        value: "₹45,000 Annual Tax Savings",
        authority: "CBDT Income Tax Department"
      });
    } else {
      remainingBarriers.push({
        id: "digital",
        title: "Digital Payment Ratio Below 95%",
        description: `Current: ${digitalRatio}% digital. Reaching ≥ 95% via UPI/PoS drops deemed taxable rate from 8% to 6%.`,
        timeToResolve: "Immediate (QR Setup)",
        portalUrl: "https://www.npci.org.in/",
        portalName: "UPI Merchant Terminal"
      });
    }

    // Barrier 3: Revenue Endorsement vs Self-Declaration
    if (hasOfficialRevenueSeal) {
      unlockedBenefits += 140000;
      unlockedPolicies.push({
        title: "Concessional Lending (NSFDC / SCA Clearance)",
        value: "4% Concessional Interest Rate",
        authority: "National Statutory Corporations & Banks"
      });
    } else {
      remainingBarriers.push({
        id: "revenue_seal",
        title: "Income Certificate Proximity Risk",
        description: "Declared income near statutory threshold requires Sub-Divisional Officer (SDM) digital QR endorsement.",
        timeToResolve: "3-5 Working Days",
        portalUrl: "https://serviceonline.gov.in/",
        portalName: "National ServicePlus Portal"
      });
    }

    // Barrier 4: Detailed Project Report
    if (projectReportPrepared) {
      unlockedBenefits += 350000;
      unlockedPolicies.push({
        title: "PMEGP 35% Capital Margin Grant",
        value: "₹3,50,000 Direct Cash Grant",
        authority: "KVIC Ministry of MSME"
      });
    } else {
      remainingBarriers.push({
        id: "dpr",
        title: "Detailed Project Report (DPR) Required",
        description: "Projects exceeding ₹5 Lakh require a standard 3-year cashflow feasibility appraisal.",
        timeToResolve: "1-2 Days",
        portalUrl: "https://www.kviconline.gov.in/",
        portalName: "KVIC Model DPR Library"
      });
    }

    // Overall triage status
    let triageStatus = "ELIGIBLE";
    let score = 96;
    if (remainingBarriers.length >= 3) {
      triageStatus = "INELIGIBLE";
      score = 35;
    } else if (remainingBarriers.length > 0) {
      triageStatus = "BORDERLINE";
      score = 72;
    }

    return {
      triageStatus,
      score,
      unlockedBenefits,
      unlockedPolicies,
      remainingBarriers,
      actionsCompleted: 4 - remainingBarriers.length
    };
  }, [hasUdyam, digitalRatio, hasOfficialRevenueSeal, projectReportPrepared]);

  return (
    <div className="w-full bg-white rounded-[32px] border border-[#E5E7EB] shadow-sm overflow-hidden mb-12">
      {/* Top Banner Bento Card */}
      <div className="bg-[#181C24] text-white p-6 md:p-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#FF6B3D]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF6B3D]/20 text-[#FF6B3D] text-xs font-bold uppercase tracking-wider mb-2 border border-[#FF6B3D]/30">
              <Compass className="w-3.5 h-3.5" />
              <span>Counterfactual AI: Path to Eligibility</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Prescriptive Roadmaps — Turn Rejections into Clear Approvals
            </h2>
            <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl leading-relaxed">
              Don't accept a cold rejection. Test actionable steps below (like 1-click free Udyam registration or digital transaction shifts) to watch your status dynamically transform into <strong>100% Eligible</strong>.
            </p>
          </div>

          <button
            type="button"
            onClick={resetSimulation}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition-colors border border-white/10"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Simulation</span>
          </button>
        </div>

        {/* Live Transformation Scoreboard */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
          {/* Status Badge */}
          <div className="bg-white/5 rounded-[22px] p-4 border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Simulated Triage Status
              </div>
              <div className="flex items-center gap-2 mt-1">
                {simulationOutcome.triageStatus === "ELIGIBLE" && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                )}
                {simulationOutcome.triageStatus === "BORDERLINE" && (
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                )}
                {simulationOutcome.triageStatus === "INELIGIBLE" && (
                  <XCircle className="w-5 h-5 text-rose-400" />
                )}
                <span
                  className={`text-lg font-black ${
                    simulationOutcome.triageStatus === "ELIGIBLE"
                      ? "text-emerald-400"
                      : simulationOutcome.triageStatus === "BORDERLINE"
                      ? "text-amber-400"
                      : "text-rose-400"
                  }`}
                >
                  {simulationOutcome.triageStatus === "ELIGIBLE"
                    ? "Clearly Eligible"
                    : simulationOutcome.triageStatus === "BORDERLINE"
                    ? "Manual Review"
                    : "Ineligible"}
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-white/10 text-slate-200">
              {simulationOutcome.score}% Score
            </span>
          </div>

          {/* Unlocked Financial Assistance */}
          <div className="bg-white/5 rounded-[22px] p-4 border border-white/10">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Unlocked Financial Value
            </div>
            <div className="text-2xl font-black text-[#FF6B3D] mt-1">
              ₹{simulationOutcome.unlockedBenefits.toLocaleString("en-IN")}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Across {simulationOutcome.unlockedPolicies.length} unlocked programs
            </div>
          </div>

          {/* Action Progress */}
          <div className="bg-white/5 rounded-[22px] p-4 border border-white/10">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Prescriptive Roadblocks Cleared
            </div>
            <div className="text-2xl font-black text-white mt-1">
              {simulationOutcome.actionsCompleted} of 4 Actions
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {simulationOutcome.remainingBarriers.length === 0
                ? "All requirements satisfied!"
                : `${simulationOutcome.remainingBarriers.length} remaining recommendations`}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Levers Section */}
      <div className="p-6 md:p-8 bg-[#F8F9FA]/40">
        <h3 className="text-base font-bold text-[#111827] mb-4">
          Interactive Counterfactual Levers (Toggle simulated actions):
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Lever 1: Udyam Registration */}
          <div
            className={`p-5 rounded-[24px] border transition-all ${
              hasUdyam
                ? "bg-white border-emerald-300 ring-1 ring-emerald-200 shadow-sm"
                : "bg-white border-[#E5E7EB]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-[#FF6B3D]" />
                <h4 className="text-sm font-bold text-[#111827]">
                  MSME Udyam Registration
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setHasUdyam(!hasUdyam)}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all ${
                  hasUdyam
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-[#F4F5F7] border border-[#E5E7EB] text-slate-700 hover:bg-slate-200"
                }`}
              >
                {hasUdyam ? "✓ Simulated Registered" : "+ Simulate Registering"}
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Free 5-minute Aadhaar registration on Ministry of MSME portal. Unlocks CGTMSE ₹50 Lakh collateral-free loan.
            </p>
            <a
              href="https://udyamregistration.gov.in/"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-bold text-[#FF6B3D] hover:underline inline-flex items-center gap-1"
            >
              Open Official Udyam Portal <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Lever 2: Digital Payment Ratio Slider */}
          <div
            className={`p-5 rounded-[24px] border transition-all ${
              digitalRatio >= 95
                ? "bg-white border-emerald-300 ring-1 ring-emerald-200 shadow-sm"
                : "bg-white border-[#E5E7EB]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-[#FF6B3D]" />
                <h4 className="text-sm font-bold text-[#111827]">
                  Digital / UPI Transaction Ratio
                </h4>
              </div>
              <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-full bg-[#F4F5F7] border border-[#E5E7EB] text-slate-800">
                {digitalRatio}% Digital
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Route sales via UPI QR / PoS. Reaching ≥ 95% unlocks Section 44AD deemed profit drop from 8% to 6%.
            </p>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={digitalRatio}
              onChange={(e) => setDigitalRatio(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF6B3D]"
            />
          </div>

          {/* Lever 3: Official Revenue Seal */}
          <div
            className={`p-5 rounded-[24px] border transition-all ${
              hasOfficialRevenueSeal
                ? "bg-white border-emerald-300 ring-1 ring-emerald-200 shadow-sm"
                : "bg-white border-[#E5E7EB]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#FF6B3D]" />
                <h4 className="text-sm font-bold text-[#111827]">
                  Tehsildar / SDO Revenue Seal
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setHasOfficialRevenueSeal(!hasOfficialRevenueSeal)}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all ${
                  hasOfficialRevenueSeal
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-[#F4F5F7] border border-[#E5E7EB] text-slate-700 hover:bg-slate-200"
                }`}
              >
                {hasOfficialRevenueSeal ? "✓ Verified Endorsement" : "+ Simulate Verification"}
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Upgrades provisional self-declaration to a digitally authenticated income certificate, preventing bank counter rejection.
            </p>
            <span className="text-[11px] text-slate-500">
              Eliminates income threshold proximity warning under Clause 2.3.
            </span>
          </div>

          {/* Lever 4: Detailed Project Report (DPR) */}
          <div
            className={`p-5 rounded-[24px] border transition-all ${
              projectReportPrepared
                ? "bg-white border-emerald-300 ring-1 ring-emerald-200 shadow-sm"
                : "bg-white border-[#E5E7EB]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#FF6B3D]" />
                <h4 className="text-sm font-bold text-[#111827]">
                  Detailed Project Report (DPR)
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setProjectReportPrepared(!projectReportPrepared)}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all ${
                  projectReportPrepared
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-[#F4F5F7] border border-[#E5E7EB] text-slate-700 hover:bg-slate-200"
                }`}
              >
                {projectReportPrepared ? "✓ DPR Prepared" : "+ Simulate DPR Ready"}
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              3-year cash flow forecast with Debt Service Coverage Ratio (DSCR &gt; 1.5). Unlocks PMEGP 35% capital grant.
            </p>
            <span className="text-[11px] text-slate-500">
              Template available through District Industries Centre (DIC).
            </span>
          </div>
        </div>

        {/* Live Unlocked Benefits Summary Card */}
        <div className="bg-white rounded-[24px] p-6 border border-[#E5E7EB] shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 border-b border-[#E5E7EB] pb-3">
            <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FF6B3D]" />
              Policies Unlocked through Counterfactual Simulation:
            </h4>
            <span className="text-xs font-bold text-[#FF6B3D] font-mono">
              Total Unlocked: ₹{simulationOutcome.unlockedBenefits.toLocaleString("en-IN")}
            </span>
          </div>

          {simulationOutcome.unlockedPolicies.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-2">
              Toggle any simulated action above to see policies become unlocked in real-time.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {simulationOutcome.unlockedPolicies.map((p, idx) => (
                <div key={idx} className="bg-[#F8F9FA] p-3.5 rounded-2xl border border-[#E5E7EB] text-xs">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">{p.authority}</div>
                  <div className="font-bold text-[#111827] mt-0.5">{p.title}</div>
                  <div className="text-emerald-600 font-black mt-1">{p.value}</div>
                </div>
              ))}
            </div>
          )}

          {onApplyPath && (
            <div className="mt-5 pt-4 border-t border-[#E5E7EB] flex justify-end">
              <button
                type="button"
                onClick={() => onApplyPath({
                  has_udyam: hasUdyam,
                  digital_turnover_ratio: digitalRatio / 100,
                  is_self_certified_only: !hasOfficialRevenueSeal
                })}
                className="rounded-full bg-[#FF6B3D] hover:bg-[#E05326] text-white text-xs font-bold px-6 py-2.5 flex items-center gap-2 shadow-sm transition-all"
              >
                <span>Apply Simulation to Active Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
