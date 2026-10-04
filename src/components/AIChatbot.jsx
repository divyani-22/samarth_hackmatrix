import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, Volume2, VolumeX, ShieldCheck } from "lucide-react";
import { uiTranslations } from "../data/uiTranslations";

// Multilingual Offline Knowledge Engine for Government Schemes & Policies
const getSchemeAssistantResponse = (query, lang) => {
  const q = (query || "").toLowerCase();

  // 1. Marathi Responses
  if (lang === "mr") {
    if (q.includes("tax") || q.includes("कर") || q.includes("कपात") || q.includes("44ad") || q.includes("80jjaa")) {
      return "लहान व्यवसाय आणि MSME साठी प्रमुख कर सवलती:\n1. कलम 44AD: ₹3 कोटींपर्यंतच्या उलाढालीवर 6% (डिजिटल) किंवा 8% गृहीत नफा जाहीर करून ऑडिटपासून मुक्ती.\n2. कलम 80JJAA: नवीन कर्मचाऱ्यांच्या वेतनावर सलग 3 वर्षे 30% अतिरिक्त कर वजावट.\n3. कलम 44ADA: व्यावसायिकांसाठी 50% कर सवलत.";
    }
    if (q.includes("कागद") || q.includes("दस्तऐवज") || q.includes("doc") || q.includes("प्रमाणपत्र") || q.includes("दस्तावेज")) {
      return "अर्जासाठी आवश्यक मुख्य कागदपत्रे:\n1. ओळख व पत्ता: आधार कार्ड व पॅन कार्ड\n2. उत्पन्नाचा दाखला / Form 16 / ITR\n3. व्यवसाय नोंदणी: MSME उद्यम प्रमाणपत्र\n4. सामाजिक प्रवर्ग दाखला (लागू असल्यास)\n5. मागील 6 महिन्यांचे बँक स्टेटमेंट.";
    }
    if (q.includes("msme") || q.includes("व्यवसाय") || q.includes("कर्ज") || q.includes("loan") || q.includes("pmegp") || q.includes("सबसिडी")) {
      return "प्रमुख व्यवसाय व MSME योजना:\n1. PMEGP सबसिडी: नवीन उद्योगासाठी 15% ते 35% शासकीय भांडवली अनुदान (उत्पादन ₹50 लाख, सेवा ₹20 लाख).\n2. CGTMSE गॅरंटी: ₹5 कोटींपर्यंत विनातारण (Collateral-Free) बँक कर्ज हमी.\n3. PM स्वनिधी: फेरीवाल्यांसाठी ₹50,000 पर्यंत खेळते भांडवल व 7% व्याज सवलत.";
    }
    if (q.includes("महिला") || q.includes("women") || q.includes("msy") || q.includes("स्त्री")) {
      return "महिला उद्योजकांसाठी विशेष योजना:\n1. महिला समृद्धी योजना (MSY): ₹1.40 लाख पर्यंतचे कर्ज फक्त 4% वार्षिक व्याजाने (नियमित परतफेडीवर 3.5%).\n2. स्टँड-अप इंडिया: ₹10 लाख ते ₹1 कोटी विनातारण कर्ज.\n3. PMEGP विशेष: ग्रामीण भागात कमाल 35% भांडवली सबसिडी.";
    }
    if (q.includes("कारीगर") || q.includes("कारागीर") || q.includes("artisan") || q.includes("vishwakarma") || q.includes("ssy")) {
      return "पारंपारिक कारागिरांसाठी योजना:\n1. PM विश्वकर्मा: ₹15,000 टूलकिट अनुदान + 5% सवलतीच्या दरात कर्ज.\n2. शिल्पी समृद्धी योजना: ₹1.40 लाख पर्यंतचे सूक्ष्म कर्ज 5% दराने.";
    }
    if (q.includes("पात्रता") || q.includes("eligible") || q.includes("नियम")) {
      return "पात्रतेचे मुख्य निकष: वय (18 ते 65 वर्षे), वार्षिक कौटुंबिक उत्पन्न, सामाजिक प्रवर्ग, व्यवसाय प्रकार आणि वैध कागदपत्रे. 'योजना शोधा' पर्यायावर क्लिक करून आपण थेट पडताळणी करू शकता.";
    }
    if (q.includes("व्याज") || q.includes("emi") || q.includes("दर") || q.includes("कॅल्क्युलेटर")) {
      return "शासकीय योजनांमध्ये व्याजदर 4% ते 8% दरम्यान असतात. सोबतच 6 ते 12 महिन्यांची मुदत सवलत (Grace Period) आणि 15% ते 35% भांडवली सबसिडी उपलब्ध असते.";
    }
    return "नमस्कार! मी समर्थ AI धोरण सहाय्यक आहे. मी तुम्हाला शासकीय कर्ज योजना, भांडवली सबसिडी, कर सवलती (44AD / 80JJAA), पात्रता निकष आणि बँक अर्जांमध्ये मार्गदर्शन करू शकतो.";
  }

  // 2. Hindi Responses
  if (lang === "hi") {
    if (q.includes("tax") || q.includes("कर") || q.includes("टैक्स") || q.includes("80jjaa") || q.includes("44ad") || q.includes("deduction")) {
      return "छोटे व्यवसायों और एमएसएमई के लिए मुख्य कर छूट योजनाएं:\n1. धारा 44AD अनुमानित कराधान: ₹3 करोड़ तक के टर्नओवर पर बिना ऑडिट के 6% (डिजिटल) या 8% लाभ घोषित करने की छूट।\n2. धारा 80JJAA: नए कर्मचारियों के वेतन पर 3 साल तक 30% अतिरिक्त टैक्स छूट।";
    }
    if (q.includes("दस्तावेज़") || q.includes("कागजात") || q.includes("document") || q.includes("doc")) {
      return "आवेदन के लिए आवश्यक मुख्य दस्तावेज़:\n1. आधार कार्ड और पैन कार्ड\n2. आय प्रमाण पत्र / ITR\n3. एमएसएमई उद्यम पंजीकरण\n4. जाति प्रमाण पत्र (संबद्ध योजनाओं हेतु)\n5. बैंक स्टेटमेंट। आप 'Upload / Scan Document' विकल्प से तत्काल डेटा निकाल सकते हैं।";
    }
    if (q.includes("msme") || q.includes("व्यापार") || q.includes("दुकान") || q.includes("business") || q.includes("cgtmse") || q.includes("pmegp")) {
      return "सूक्ष्म एवं लघु उद्यमों के लिए प्रमुख योजनाएं:\n1. PMEGP: 15% से 35% गैर-वापसी योग्य पूंजीगत सब्सिडी।\n2. CGTMSE: ₹5 करोड़ तक का बिना किसी जमानत (Collateral-Free) का बैंक ऋण गारंटी कवर।\n3. PM SVANidhi: रेहड़ी-पटरी विक्रेताओं के लिए ₹50,000 तक का कार्यशील पूंजी ऋण एवं 7% ब्याज सब्सिडी।";
    }
    if (q.includes("महिला") || q.includes("women") || q.includes("msy")) {
      return "महिला उद्यमियों के लिए 'महिला समृद्धि योजना (MSY)' में ₹1.40 लाख तक का ऋण केवल 4% वार्षिक ब्याज पर मिलता है। इसके अतिरिक्त स्टैंड-अप इंडिया में ₹10 लाख से ₹1 करोड़ तक का संपार्श्विक-मुक्त ऋण उपलब्ध है।";
    }
    if (q.includes("कारीगर") || q.includes("artisan") || q.includes("vishwakarma") || q.includes("ssy")) {
      return "पारंपरिक कारीगरों के लिए 'PM विश्वकर्मा' एवं 'शिल्पी समृद्धि योजना (SSY)' के तहत ₹15,000 टूलकिट प्रोत्साहन एवं 5% रियायती ब्याज दर पर ऋण उपलब्ध है।";
    }
    if (q.includes("पात्रता") || q.includes("eligible") || q.includes("eligibility")) {
      return "पात्रता 5 मुख्य कारकों पर निर्भर करती है: आयु (18-65 वर्ष), वार्षिक पारिवारिक आय / टर्नओवर, सामाजिक श्रेणी, व्यवसाय प्रकार, और वैध दस्तावेज़। आप 'Find Schemes' विज़ार्ड से अपनी पात्रता जांच सकते हैं।";
    }
    if (q.includes("ब्याज") || q.includes("emi") || q.includes("rate") || q.includes("calculator")) {
      return "सरकारी योजनाओं में ब्याज दरें 4% से 8% प्रति वर्ष के बीच होती हैं। साथ ही 6 से 12 महीने का मोरेटोरियम (Grace Period) और 15%-35% तक की पूंजीगत सब्सिडी मिलती है।";
    }
    return "नमस्ते! मैं Samarth AI नीति सहायक हूँ। मैं आपको सरकारी ऋण योजनाओं, पूंजी सब्सिडी, कर कटौती (Sec 44AD / 80JJAA), पात्रता नियमों और बैंक आवेदन में सहायता कर सकता हूँ।";
  }

  // 3. English & Default responses
  if (q.includes("tax") || q.includes("deduction") || q.includes("80jjaa") || q.includes("44ad") || q.includes("exemption") || q.includes("itr")) {
    return "Key Tax Deductions & Relief for Small Businesses:\n1. Section 44AD Presumptive Taxation: Exempts small businesses up to ₹3 Cr turnover from maintaining audited books; declare deemed profit at 6% (digital) or 8%.\n2. Section 80JJAA: 30% additional tax deduction on new employee wages for 3 consecutive assessment years.\n3. Section 44ADA: 50% presumptive profit taxation for eligible professionals.";
  }
  if (q.includes("msme") || q.includes("business") || q.includes("cgtmse") || q.includes("pmegp") || q.includes("subsidy") || q.includes("loan")) {
    return "Flagship Business & MSME Programs:\n1. PMEGP Capital Subsidy: 15% to 35% non-repayable government subsidy for new manufacturing (up to ₹50L) and service (up to ₹20L) units.\n2. CGTMSE Guarantee: Collateral-free credit up to ₹5 Crore with 75%–85% sovereign guarantee cover.\n3. PM SVANidhi: Micro-credit up to ₹50,000 for vendors with 7% annual interest subsidy.";
  }
  if (q.includes("document") || q.includes("doc") || q.includes("paper") || q.includes("certificate") || q.includes("proof")) {
    return "Mandatory Application Documents:\n1. Identity & Address: Aadhaar Card & PAN Card\n2. Income Proof: Income Certificate / Form 16 / ITR\n3. Business Proof: MSME Udyam Registration Certificate\n4. Category Proof: Caste / Category Certificate (where applicable)\n5. Bank Details: 6-month bank statement.";
  }
  if (q.includes("women") || q.includes("female") || q.includes("msy") || q.includes("mahila")) {
    return "Special Programs for Women Entrepreneurs:\n1. Mahila Samriddhi Yojana (MSY): Loans up to ₹1,40,000 at 4% p.a. (3.5% with timely rebate).\n2. Stand-Up India: Collateral-free credit from ₹10 Lakhs to ₹1 Crore.\n3. PMEGP Special: Receives maximum 35% capital subsidy rate in rural areas.";
  }
  if (q.includes("artisan") || q.includes("craft") || q.includes("vishwakarma") || q.includes("ssy")) {
    return "Artisan & Traditional Craftsmen Programs:\n1. PM Vishwakarma: ₹15,000 modern toolkit grant + 5% collateral-free credit.\n2. Shilpi Samriddhi Yojana (SSY): Micro-loans up to ₹1,40,000 at 5% p.a.";
  }
  if (q.includes("stack") || q.includes("optimize") || q.includes("convergence") || q.includes("combine")) {
    return "Policy Stacking (Convergence):\nYou can combine non-conflicting central and state benefits (e.g. PMEGP 35% capital grant + CGTMSE collateral-free guarantee + Section 44AD presumptive tax relief) to maximize total financial assistance legally. Check our 'Policy Stacking Optimizer' page for live calculations.";
  }

  return "Hello! I am Samarth AI, your National Policy & Subsidy Assistant. I can help you discover verified central and state schemes, check exact statutory eligibility rules, calculate capital subsidies, and guide your bank application. How can I help you today?";
};

export default function AIChatbot({ lang = "en" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);

  const t = uiTranslations[lang]?.chatbot || uiTranslations.en.chatbot;

  const quickChips = [
    t.quickPrompt1,
    t.quickPrompt2,
    t.quickPrompt3,
    t.quickPrompt4,
  ].filter(Boolean);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "msg-welcome",
          role: "model",
          content: t.greeting,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  }, [isOpen, lang, t.greeting]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userQuery = input.trim();
    const userMsg = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userQuery,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Generate response
    setTimeout(() => {
      const botResponse = getSchemeAssistantResponse(userQuery, lang);
      const botMsg = {
        id: `bot-${Date.now()}`,
        role: "model",
        content: botResponse,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);

      // Voice output if speech is supported and enabled
      if (isSpeaking && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(botResponse);
        utterance.lang = lang === "hi" ? "hi-IN" : lang === "mr" ? "mr-IN" : "en-IN";
        window.speechSynthesis.speak(utterance);
      }
    }, 300);
  };

  const handlePromptChip = (chipText) => {
    setInput(chipText);
  };

  return (
    <>
      {/* Floating AI Chatbot Button in Bento Dark Style with Orange Glow */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#111111] hover:bg-[#1E1E1E] text-white border border-white/15 shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
        aria-label="Toggle AI Chatbot"
      >
        <div className="w-8 h-8 rounded-full bg-[#FF6B3D] flex items-center justify-center text-white shadow-orange-glow group-hover:scale-110 transition-transform">
          <Bot size={18} />
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <span>Samarth AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
          </div>
          <div className="text-[10px] text-neutral-400 font-medium">
            {lang === "mr" ? "धोरण सहाय्यक" : lang === "hi" ? "नीति सहायक" : "Policy Assistant"}
          </div>
        </div>
      </button>

      {/* Chatbot Window Modal in Clean Bento Grid Style */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[620px] h-[80vh] bg-white rounded-[32px] border border-neutral-200 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Chat Header (Dark Bento Card) */}
          <div className="bg-[#111111] text-white p-5 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#FF6B3D] flex items-center justify-center text-white shadow-orange-glow">
                <Bot size={19} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white font-['Urbanist',sans-serif]">
                    {t.botName || "Samarth AI"}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#22C55E]/20 text-[#22C55E] text-[10px] font-bold">
                    {lang === "mr" ? "सक्रिय" : lang === "hi" ? "सक्रिय" : "Online"}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  {t.onlineStatus || "Verified Statutory Knowledge Engine"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsSpeaking(!isSpeaking)}
                className={`p-2 rounded-full text-xs transition-colors ${
                  isSpeaking ? "bg-[#FF6B3D] text-white" : "text-neutral-400 hover:text-white"
                }`}
                title={isSpeaking ? "Voice Output Active" : "Enable Voice Output"}
              >
                {isSpeaking ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Quick Prompt Chips */}
          <div className="bg-[#F8F9FA] px-4 py-2.5 border-b border-neutral-200 flex items-center gap-2 overflow-x-auto scrollbar-none text-[11px]">
            <span className="text-neutral-400 font-bold shrink-0">
              {lang === "mr" ? "जलद:" : lang === "hi" ? "त्वरित:" : "Quick:"}
            </span>
            {quickChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handlePromptChip(chip)}
                className="px-3 py-1 rounded-full bg-white hover:bg-neutral-100 text-neutral-700 font-semibold border border-neutral-200 whitespace-nowrap shadow-2xs transition-colors cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F2F2F2]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "model" && (
                  <div className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center shrink-0 mt-1">
                    <Sparkles size={13} className="text-[#FF6B3D]" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-4 rounded-[22px] text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                    msg.role === "user"
                      ? "bg-[#FF6B3D] text-white rounded-tr-sm font-medium shadow-orange-glow/30"
                      : "bg-white text-neutral-800 rounded-tl-sm border border-neutral-200"
                  }`}
                >
                  {msg.content}
                  <div
                    className={`text-[9px] mt-1.5 text-right font-medium ${
                      msg.role === "user" ? "text-white/80" : "text-neutral-400"
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>

                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-neutral-300 text-neutral-800 flex items-center justify-center shrink-0 mt-1">
                    <User size={13} />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3.5 bg-white border-t border-neutral-200 flex items-center gap-2">
            <input
              type="text"
              placeholder={t.placeholder || "Ask about subsidies, eligibility, tax relief..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-full bg-[#F8F9FA] border border-neutral-200 text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#FF6B3D] transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-10 h-10 rounded-full bg-[#FF6B3D] hover:bg-[#ff5722] disabled:opacity-40 text-white flex items-center justify-center shadow-orange-glow transition-all shrink-0 cursor-pointer"
            >
              <Send size={15} />
            </button>
          </form>

        </div>
      )}
    </>
  );
}

