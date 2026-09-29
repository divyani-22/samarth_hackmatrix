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
    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-400/30">
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Simulation</span>
          </button>
        </div>

        {/* Live Transformation Scoreboard */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
          {/* Status Badge */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center justify-between">
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
            <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-white/10 text-slate-200">
              {simulationOutcome.score}% Score
            </span>
          </div>

          {/* Unlocked Financial Assistance */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Unlocked Financial Value
            </div>
            <div className="text-2xl font-black text-amber-300 mt-1">
              ₹{simulationOutcome.unlockedBenefits.toLocaleString("en-IN")}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Across {simulationOutcome.unlockedPolicies.length} unlocked programs
            </div>
          </div>

          {/* Action Progress */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
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
      <div className="p-6 md:p-8">
        <h3 className="text-base font-bold text-slate-900 mb-4">
          Interactive Counterfactual Levers (Toggle simulated actions):
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Lever 1: Udyam Registration */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              hasUdyam
                ? "bg-emerald-50/50 border-emerald-300"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-indigo-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  MSME Udyam Registration
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setHasUdyam(!hasUdyam)}
                className={`text-xs font-bold px-3 py-1 rounded-xl transition-all ${
                  hasUdyam
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {hasUdyam ? "✓ Simulated Registered" : "+ Simulate Registering"}
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Free 5-minute Aadhaar registration on Ministry of MSME portal. Unlocks CGTMSE ₹50 Lakh collateral-free loan.
            </p>
            <a
              href="https://udyamregistration.gov.in/"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-semibold text-indigo-600 hover:underline inline-flex items-center gap-1"
            >
              Open Official Udyam Portal <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Lever 2: Digital Payment Ratio Slider */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              digitalRatio >= 95
                ? "bg-emerald-50/50 border-emerald-300"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-indigo-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  Digital / UPI Transaction Ratio
                </h4>
              </div>
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-800">
                {digitalRatio}% Digital
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-2">
              Route sales via UPI QR / PoS. Reaching ≥ 95% unlocks Section 44AD deemed profit drop from 8% to 6%.
            </p>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={digitalRatio}
              onChange={(e) => setDigitalRatio(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Lever 3: Official Revenue Seal */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              hasOfficialRevenueSeal
                ? "bg-emerald-50/50 border-emerald-300"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-indigo-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  Tehsildar / SDO Revenue Seal
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setHasOfficialRevenueSeal(!hasOfficialRevenueSeal)}
                className={`text-xs font-bold px-3 py-1 rounded-xl transition-all ${
                  hasOfficialRevenueSeal
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {hasOfficialRevenueSeal ? "✓ Verified Endorsement" : "+ Simulate Verification"}
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Upgrades provisional self-declaration to a digitally authenticated income certificate, preventing bank counter rejection.
            </p>
            <span className="text-[11px] text-slate-500">
              Eliminates income threshold proximity warning under Clause 2.3.
            </span>
          </div>

          {/* Lever 4: Detailed Project Report (DPR) */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              projectReportPrepared
                ? "bg-emerald-50/50 border-emerald-300"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  Detailed Project Report (DPR)
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setProjectReportPrepared(!projectReportPrepared)}
                className={`text-xs font-bold px-3 py-1 rounded-xl transition-all ${
                  projectReportPrepared
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {projectReportPrepared ? "✓ DPR Prepared" : "+ Simulate DPR Ready"}
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              3-year cash flow forecast with Debt Service Coverage Ratio (DSCR &gt; 1.5). Unlocks PMEGP 35% capital grant.
            </p>
            <span className="text-[11px] text-slate-500">
              Template available through District Industries Centre (DIC).
            </span>
          </div>
        </div>

        {/* Live Unlocked Benefits Summary Card */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
          <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Policies Unlocked through Counterfactual Simulation:
            </h4>
            <span className="text-xs font-bold text-indigo-700 font-mono">
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
                <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">{p.authority}</div>
                  <div className="font-bold text-slate-900 mt-0.5">{p.title}</div>
                  <div className="text-emerald-700 font-black mt-1">{p.value}</div>
                </div>
              ))}
            </div>
          )}

          {onApplyPath && (
            <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => onApplyPath({
                  has_udyam: hasUdyam,
                  digital_turnover_ratio: digitalRatio / 100,
                  is_self_certified_only: !hasOfficialRevenueSeal
                })}
                className="btn-primary text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm"
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
