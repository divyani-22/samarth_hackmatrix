import React, { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { uiTranslations } from "../data/uiTranslations";

export default function FaqAccordion({ lang = "en" }) {
  const [openIndex, setOpenIndex] = useState(0);
  const t = uiTranslations[lang]?.faq || uiTranslations.en.faq;

  const faqs = [
    {
      question: t.q1,
      answer: t.a1,
    },
    {
      question: t.q2,
      answer: t.a2,
    },
    {
      question: t.q3,
      answer: t.a3,
    },
    {
      question: t.q4,
      answer: t.a4,
    },
    {
      question: t.q5,
      answer: t.a5,
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="w-full bg-[#F2F2F2] py-20 px-4 sm:px-6 lg:px-8 text-[#111111] border-t border-[#E5E5E5]">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header matching reference screenshot */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E5E5E5] text-xs font-bold text-neutral-600 shadow-xs">
            <Sparkles size={13} className="text-[#FF6B3D]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111] font-['Urbanist',sans-serif]">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-[24px] border border-[#E5E5E5] shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left gap-4 hover:bg-neutral-50/70 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-[#111111] font-['Urbanist',sans-serif]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-600 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#FF6B3D] text-white" : ""
                    }`}
                  >
                    <ChevronDown size={15} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-1 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

