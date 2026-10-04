import React, { useState } from "react";
import { Sparkles, ArrowUpRight, TrendingUp, Filter, Calendar, CheckCircle2 } from "lucide-react";

export default function AppPreviewMockup() {
  const [activeTab, setActiveTab] = useState("Month");
  const [hoveredBar, setHoveredBar] = useState(4);

  const barData = [
    { label: "Jan", height: 40, value: "₹8.2K" },
    { label: "Feb", height: 55, value: "₹12.4K" },
    { label: "Mar", height: 75, value: "₹16.8K" },
    { label: "Apr", height: 60, value: "₹14.2K" },
    { label: "May", height: 92, value: "₹19.5K" },
    { label: "Jun", height: 80, value: "₹17.1K" },
    { label: "Jul", height: 65, value: "₹15.0K" },
  ];

  return (
    <section className="w-full bg-[#F2F2F2] py-20 px-4 sm:px-6 lg:px-8 text-[#111111]">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111] font-['Urbanist',sans-serif]">
            Your key to convenience and innovation
          </h2>
          <p className="text-sm sm:text-base text-neutral-500">
            Real-time policy analytics, eligibility tracking, and verified portal routing in one unified dashboard.
          </p>

          {/* App Store Pill Badges (Directly matching screenshot) */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-[#111111] text-xs font-bold border border-[#E5E5E5] shadow-xs transition-all cursor-pointer">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186c-.198-.198-.31-.47-.31-.762V2.576c0-.293.112-.564.31-.762zm10.89 10.893l2.302-2.302-12.06-6.96 9.758 9.262zm0 .586l-9.758 9.262 12.06-6.96-2.302-2.302zm1.414-1.414l2.87 1.657c.78.45.78 1.187 0 1.637l-2.87 1.657-1.92-1.92 1.92-1.92z" />
              </svg>
              <span>Google Play</span>
            </button>

            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-[#111111] text-xs font-bold border border-[#E5E5E5] shadow-xs transition-all cursor-pointer">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.09 1.73-.95 2.76.99.08 2.06-.51 2.68-1.26z" />
              </svg>
              <span>Apple Store</span>
            </button>
          </div>
        </div>

        {/* Tablet Mockup Container (Faithfully recreated from reference screenshot) */}
        <div className="bg-white p-4 sm:p-6 rounded-[36px] border border-[#E5E5E5] shadow-2xl overflow-hidden">
          
          {/* Inner Dashboard Frame */}
          <div className="bg-[#F8F9FA] p-5 sm:p-8 rounded-[28px] border border-[#EBEBEB] space-y-6">
            
            {/* Mockup Dashboard Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-200/70">
              <div>
                <h4 className="text-xl font-bold text-[#111111] font-['Urbanist',sans-serif]">
                  Scheme Overview
                </h4>
                <p className="text-xs text-neutral-500">Live Citizen Analytics & Grant Routing</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-neutral-200 text-xs font-semibold text-neutral-600">
                  <Calendar size={13} className="text-[#FF6B3D]" />
                  <span>01 Dec - 31 Dec 2026</span>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-full border border-neutral-200 text-xs font-semibold text-neutral-600 flex items-center gap-1">
                  <Filter size={13} />
                  <span>Filter</span>
                </div>
              </div>
            </div>

            {/* Mockup 3 Metrics Cards (Dark + White + White) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Card 1: Dark Sales/Scheme Card */}
              <div className="bg-[#1E1E1E] text-white p-5 rounded-[22px] shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Subsidies Disbursed</span>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-white">This month</span>
                </div>
                <div className="my-3">
                  <div className="text-2xl sm:text-3xl font-black text-white font-['Urbanist',sans-serif]">
                    ₹45,786 Cr
                  </div>
                  <div className="text-xs text-[#22C55E] flex items-center gap-1 font-semibold mt-1">
                    <ArrowUpRight size={13} />
                    <span>+21% from last month</span>
                  </div>
                </div>
              </div>

              {/* Card 2: White Average Card */}
              <div className="bg-white p-5 rounded-[22px] border border-neutral-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>Average Grant Value</span>
                  <span className="text-[10px] bg-neutral-100 px-2 py-0.5 rounded-full text-neutral-700">Per Family</span>
                </div>
                <div className="my-3">
                  <div className="text-2xl sm:text-3xl font-black text-[#111111] font-['Urbanist',sans-serif]">
                    ₹1,23,000
                  </div>
                  <div className="text-xs text-[#22C55E] flex items-center gap-1 font-semibold mt-1">
                    <ArrowUpRight size={13} />
                    <span>+15% higher accuracy</span>
                  </div>
                </div>
              </div>

              {/* Card 3: White Applications Card */}
              <div className="bg-white p-5 rounded-[22px] border border-neutral-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>Active Schemes Tracked</span>
                  <span className="text-[10px] bg-neutral-100 px-2 py-0.5 rounded-full text-neutral-700">Central + State</span>
                </div>
                <div className="my-3">
                  <div className="text-2xl sm:text-3xl font-black text-[#111111] font-['Urbanist',sans-serif]">
                    982
                  </div>
                  <div className="text-xs text-[#22C55E] flex items-center gap-1 font-semibold mt-1">
                    <CheckCircle2 size={13} />
                    <span>100% Verified Gazette</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Mockup Charts Grid (Orange Vertical Bars + Donut Chart) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left Chart: Orange Vertical Bar Chart */}
              <div className="lg:col-span-7 bg-white p-6 rounded-[24px] border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-[#111111]">Scheme Applications Analytics</h5>
                    <p className="text-[11px] text-neutral-400">Total verified citizen matches</p>
                  </div>
                  <div className="flex gap-1 bg-neutral-100 p-1 rounded-full text-[11px] font-bold">
                    {["Week", "Month", "Year"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1 rounded-full transition-colors ${
                          activeTab === tab ? "bg-white text-[#111111] shadow-xs" : "text-neutral-500 hover:text-[#111111]"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SVG / HTML Bar Visualizer matching screenshot */}
                <div className="h-44 pt-6 flex items-end justify-between gap-3 px-2">
                  {barData.map((bar, idx) => (
                    <div
                      key={bar.label}
                      className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                      onMouseEnter={() => setHoveredBar(idx)}
                    >
                      {/* Hover Tooltip Callout */}
                      {hoveredBar === idx && (
                        <div className="text-[10px] font-black bg-[#111111] text-white px-2 py-0.5 rounded-md shadow-md animate-in fade-in zoom-in-95">
                          {bar.value}
                        </div>
                      )}

                      {/* Bar Fill (Dominant Orange) */}
                      <div
                        style={{ height: `${bar.height}%` }}
                        className={`w-full max-w-[32px] rounded-t-xl transition-all duration-300 ${
                          hoveredBar === idx ? "bg-[#FF6B3D] shadow-orange-glow" : "bg-[#FF6B3D]/80 hover:bg-[#FF6B3D]"
                        }`}
                      ></div>
                      <span className="text-[11px] font-semibold text-neutral-500">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Chart: Doughnut Segment Chart matching screenshot */}
              <div className="lg:col-span-5 bg-white p-6 rounded-[24px] border border-neutral-200 shadow-xs flex flex-col justify-between">
                <div>
                  <h5 className="text-sm font-bold text-[#111111]">Category Distribution</h5>
                  <p className="text-[11px] text-neutral-400">Applications across sectors</p>
                </div>

                {/* Donut graphic */}
                <div className="py-4 flex items-center justify-center">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      {/* Base Circle */}
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#F5F5F5" strokeWidth="5"></circle>
                      {/* Orange Segment 60% */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#FF6B3D"
                        strokeWidth="5"
                        strokeDasharray="52.7 88"
                        strokeLinecap="round"
                      ></circle>
                      {/* Yellow Segment 25% */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#F5E51B"
                        strokeWidth="5"
                        strokeDasharray="22 88"
                        strokeDashoffset="-54"
                        strokeLinecap="round"
                      ></circle>
                      {/* Dark Segment 15% */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#111111"
                        strokeWidth="5"
                        strokeDasharray="13.2 88"
                        strokeDashoffset="-77"
                        strokeLinecap="round"
                      ></circle>
                    </svg>

                    <div className="absolute text-center">
                      <span className="text-xs font-semibold text-neutral-400">Total</span>
                      <div className="text-lg font-black text-[#111111]">100%</div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-neutral-100 text-[11px] font-semibold">
                  <div className="flex items-center gap-1.5 justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B3D]"></span>
                    <span className="text-neutral-600">Agri 60%</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F5E51B]"></span>
                    <span className="text-neutral-600">MSME 25%</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#111111]"></span>
                    <span className="text-neutral-600">Edu 15%</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
