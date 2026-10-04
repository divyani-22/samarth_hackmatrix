import React, { useState } from "react";
import { Calculator, Sparkles, TrendingUp, HelpCircle, ShieldCheck } from "lucide-react";

export default function CalculatorPage({ lang = "en" }) {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(5.0);
  const [tenureYears, setTenureYears] = useState(5);
  const [moratorium, setMoratorium] = useState(6);

  const p = Number(loanAmount);
  const r = Number(interestRate) / 12 / 100;
  const emiMonths = Number(tenureYears) * 12 - Number(moratorium);
  let emi = 0;

  if (p > 0 && r > 0 && emiMonths > 0) {
    const accruedInterest = p * r * Number(moratorium);
    const adjustedPrincipal = p + accruedInterest;
    emi =
      (adjustedPrincipal * r * Math.pow(1 + r, emiMonths)) /
      (Math.pow(1 + r, emiMonths) - 1);
  }

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="w-full min-h-[85vh] bg-[#F2F2F2] py-12 px-4 sm:px-6 lg:px-8 text-[#111111]">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E5E5E5] text-xs font-bold text-neutral-600 shadow-xs">
            <Sparkles size={13} className="text-[#FF6B3D]" />
            <span>Statutory Concessional Rates</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#111111] font-['Urbanist',sans-serif]">
            Loan & Concessional Subsidy Calculator
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto">
            Calculate accurate monthly EMIs incorporating government interest subventions, capital subsidies, and moratorium grace periods.
          </p>
        </div>

        {/* Bento Grid Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Controls Column (Left, span 7) */}
          <div className="lg:col-span-7 bento-card bg-white p-7 sm:p-8 rounded-[32px] border border-[#E5E5E5] shadow-bento-soft space-y-6">
            
            {/* Loan Amount */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Loan Amount Required
                </label>
                <span className="text-xl font-black text-[#111111] bg-neutral-100 px-3.5 py-1 rounded-xl">
                  {formatCurrency(loanAmount)}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="5000000"
                step="25000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#FF6B3D]"
              />
            </div>

            {/* Interest Rate */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Concessional Interest Rate (p.a.)
                </label>
                <span className="text-xl font-black text-[#FF6B3D] bg-orange-50 px-3.5 py-1 rounded-xl">
                  {interestRate}%
                </span>
              </div>
              <input
                type="range"
                min="3.5"
                max="12.0"
                step="0.5"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#FF6B3D]"
              />
              <div className="flex justify-between text-[11px] text-neutral-400">
                <span>3.5% (Women MSY)</span>
                <span>5.0% (Vishwakarma)</span>
                <span>8.0% (PMEGP Bank)</span>
              </div>
            </div>

            {/* Tenure Years */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Total Loan Tenure
                </label>
                <span className="text-xl font-black text-[#111111] bg-neutral-100 px-3.5 py-1 rounded-xl">
                  {tenureYears} Years
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#111111]"
              />
            </div>

            {/* Moratorium Grace Period */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Moratorium (Grace Period)
                </label>
                <span className="text-sm font-bold text-neutral-800 bg-neutral-100 px-3 py-1 rounded-xl">
                  {moratorium} Months
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="24"
                step="3"
                value={moratorium}
                onChange={(e) => setMoratorium(Number(e.target.value))}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#111111]"
              />
            </div>

          </div>

          {/* Results Summary Bento Card (Right, span 5) */}
          <div className="lg:col-span-5 bento-card bg-[#111111] text-white p-7 sm:p-8 rounded-[32px] shadow-bento-dark flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#FF6B3D] text-xs font-bold">
                <Calculator size={16} />
                <span>Monthly Repayment Summary</span>
              </div>

              <div>
                <span className="text-xs text-neutral-400">Estimated Monthly EMI</span>
                <div className="text-4xl sm:text-5xl font-black text-white font-['Urbanist',sans-serif] mt-1">
                  {formatCurrency(emi)}
                </div>
                <span className="text-[11px] text-[#22C55E] font-semibold mt-1 block">
                  ✓ After {moratorium} months interest moratorium
                </span>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-neutral-300">
                <div className="flex justify-between">
                  <span>Total Repayment Amount:</span>
                  <span className="font-bold text-white">
                    {formatCurrency(emi * emiMonths)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Total Interest:</span>
                  <span className="font-bold text-[#FF6B3D]">
                    {formatCurrency(Math.max(0, emi * emiMonths - p))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Effective Subsidy Value:</span>
                  <span className="font-bold text-[#22C55E]">
                    {formatCurrency(p * 0.35)} (up to 35%)
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1E1E1E] border border-white/10 text-[11px] text-neutral-400 leading-relaxed">
              💡 Government schemes waive third-party mortgage through CGTMSE and offer 6-12 months moratorium where principal payments are deferred during project setup.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
