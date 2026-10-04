import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Sparkles, Building2, CheckCircle2, ChevronRight, SlidersHorizontal, Eye } from "lucide-react";
import schemesData from "../data/schemesData.json";

export default function ExploreSchemes({ onSelectScheme, filterState }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState(filterState || "All");
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = [
    { key: "all", label: "All Schemes" },
    { key: "education", label: "Education" },
    { key: "health", label: "Health" },
    { key: "agriculture", label: "Agriculture" },
    { key: "women-child", label: "Women & Child" },
    { key: "employment", label: "Employment" },
    { key: "housing", label: "Housing" },
    { key: "senior-citizens", label: "Senior Citizens" },
  ];

  // Category Tag Colors mapping
  const categoryStyles = {
    "Education": "bg-blue-50 text-blue-700 border-blue-200",
    "Health": "bg-purple-50 text-purple-700 border-purple-200",
    "Agriculture": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Women & Child": "bg-rose-50 text-rose-700 border-rose-200",
    "Employment": "bg-orange-50 text-orange-700 border-orange-200",
    "Housing": "bg-amber-50 text-amber-700 border-amber-200",
    "Senior Citizens": "bg-indigo-50 text-indigo-700 border-indigo-200",
  };

  // Filter schemes
  const filteredSchemes = useMemo(() => {
    return schemesData.filter((scheme) => {
      const matchCategory =
        selectedCategory === "all" || scheme.categoryKey === selectedCategory;

      const matchSearch =
        searchTerm === "" ||
        scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.shortBenefit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchState =
        selectedState === "All" ||
        scheme.stateScope === "All India" ||
        scheme.stateScope.toLowerCase().includes(selectedState.toLowerCase());

      return matchCategory && matchSearch && matchState;
    });
  }, [selectedCategory, searchTerm, selectedState]);

  const displayedSchemes = filteredSchemes.slice(0, visibleCount);

  return (
    <section id="explore-schemes" className="w-full bg-[#F2F2F2] py-20 px-4 sm:px-6 lg:px-8 text-[#111111]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E5E5E5] text-xs font-bold text-neutral-600 mb-3 shadow-xs">
              <Sparkles size={13} className="text-[#FF6B3D]" />
              <span>Verified Statutory Directory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111] font-['Urbanist',sans-serif]">
              Explore Government Schemes
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 mt-2 max-w-xl">
              Browse official central & state welfare programs categorized by sector and target beneficiary group.
            </p>
          </div>

          {/* Search Input Filter */}
          <div className="w-full md:w-80 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={17} />
            <input
              type="text"
              placeholder="Search by scheme name or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-[#E5E5E5] text-sm text-[#111111] placeholder:text-neutral-400 focus:outline-none focus:border-[#FF6B3D] shadow-xs transition-all"
            />
          </div>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  setSelectedCategory(cat.key);
                  setVisibleCount(6);
                }}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#111111] text-white shadow-md scale-[1.02]"
                    : "bg-white text-neutral-600 hover:text-[#111111] hover:bg-neutral-100 border border-[#E5E5E5]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Scheme Cards Bento Grid */}
        {displayedSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bento-card bg-white p-7 rounded-[28px] border border-[#E5E5E5] shadow-bento-soft hover:shadow-xl hover:border-neutral-300 flex flex-col justify-between transition-all group"
              >
                <div>
                  {/* Category Tag & Top Pill */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
                        categoryStyles[scheme.category] || "bg-neutral-100 text-neutral-700 border-neutral-200"
                      }`}
                    >
                      {scheme.category}
                    </span>
                    <span className="text-[11px] font-medium text-neutral-400 flex items-center gap-1">
                      <Building2 size={12} />
                      {scheme.stateScope}
                    </span>
                  </div>

                  {/* Scheme Name */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#111111] leading-snug group-hover:text-[#FF6B3D] transition-colors mb-2 font-['Urbanist',sans-serif]">
                    {scheme.name}
                  </h3>

                  {/* One-line Benefit */}
                  <p className="text-xs sm:text-sm text-neutral-500 line-clamp-2 leading-relaxed mb-6 font-normal">
                    {scheme.shortBenefit}
                  </p>
                </div>

                {/* Card Bottom: Metric Highlight & Pill Action */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400">
                      Primary Benefit
                    </div>
                    <div className="text-sm font-bold text-[#111111]">
                      {scheme.benefitHighlight}
                    </div>
                  </div>

                  <Link
                    to={`/scheme/${scheme.id}`}
                    onClick={(e) => {
                      if (onSelectScheme) {
                        e.preventDefault();
                        onSelectScheme(scheme);
                      }
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111111] hover:bg-[#FF6B3D] text-white text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs"
                  >
                    <span>View details</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-[28px] border border-[#E5E5E5] space-y-3">
            <p className="text-base font-bold text-[#111111]">No schemes match your filter criteria.</p>
            <p className="text-xs text-neutral-500">Try clearing the search query or selecting "All Schemes".</p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchTerm("");
              }}
              className="px-5 py-2 rounded-full bg-[#111111] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {displayedSchemes.length < filteredSchemes.length && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-8 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-[#111111] text-sm font-bold border border-[#E5E5E5] shadow-xs hover:border-neutral-300 transition-all cursor-pointer"
            >
              Load more schemes ({filteredSchemes.length - displayedSchemes.length} remaining)
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
