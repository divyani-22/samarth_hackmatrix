import { useState, useRef, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { schemes as allSchemesData } from "./data/schemes";
import { getLocalizedScheme } from "./data/schemeTranslations";
import { matchSchemes } from "./data/schemeMatcher";
import { partners } from "./data/partners";
import {
  Landmark,
  Calculator,
  MapPin,
  Search,
  BrainCircuit,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Globe,
  Bot,
  X,
  Send,
  FileText,
  ShieldAlert,
  Menu,
  Scale,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Building2,
  Sparkles,
  Compass,
  Layers,
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ApplicationDossier from "./components/ApplicationDossier";
import { SpeakButton, VoiceInputButton } from "./components/VoiceAssistant";
import CertificateScanner from "./components/CertificateScanner";
import EvaluationTestBench from "./components/EvaluationTestBench";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// --- TRANSLATIONS DICTIONARY ---
// --- TRANSLATIONS DICTIONARY ---
const translations = {
  en: {
    schemeEdu: "Education Loan Scheme",
    descEdu: "Up to ₹20L for studies in India at 4% p.a. (3.5% for women).",
    schemeSSY: "Shilpi Samriddhi Yojana (SSY)",
    descSSY:
      "Financial assistance up to ₹1.4L for traditional artisans and craftsmen at 5% p.a.",
    schemeMSY: "Mahila Samriddhi Yojana (MSY)",
    descMSY:
      "Highly subsidized loan at 4% p.a. specifically for female entrepreneurs.",
    schemeTerm: "Term Loan & Credit Scheme",
    descTerm: "Large scale business funding up to ₹50 Lakhs at 6-10% p.a.",
    schemeNone: "Eligibility Criteria Review Required",
    descNone:
      "The applicant details or documents did not satisfy all mandatory statutory clauses for this particular scheme. Review alternative matched financial policies and tax deductions below.",
    qAge: "What is your age?",
    qLoc: "Where are you located?",
    rural: "Rural (Village)",
    urban: "Urban (City)",
    qSkill: "Current Skill Level / Business Type?",
    unskilled: "Unskilled / Individual",
    skilled: "Skilled Artisan / Trade",
    professional: "Small Business / MSME / Professional",
    qDocs: "Eligibility Checks",
    hasCaste: "Do you have a valid Category / Caste Certificate?",
    yes: "Yes",
    no: "No",
    isDisabled: "Do you have a certified disability (Divyangjan)?",
    eduLabel: "Education Status",
    edu1: "Below 10th",
    edu2: "10th / 12th Pass",
    edu3: "Graduate / Post-Graduate",
    resultsTitle: "Your Policy Matches & Benefit Estimates",
    resultsSub: "Matched and ranked against verified statutory rules with benefit estimates.",
    matchText: "MATCH",
    mcfTitle: "Micro Credit & Working Capital",
    mcfDesc: "Perfect for micro-enterprises and small income-generating activities.",
    subtitle:
      "Discover government subsidies, tax deductions, and financial assistance. Match verified eligibility rules, estimate benefits, extract document details, and generate bank-ready application dossiers.",
    findBtn: "Find Your Schemes",
    emiBtn: "Loan & Subsidy Calculator",
    navFind: "Find Schemes",
    navLocate: "Locate Partner",
    calcTitle: "Loan & Concessional Subsidy Calculator",
    calcSub: "Includes Concessional Interest, Subsidies & Moratorium (Grace Period) Calculations",
    loanAmt: "Loan Amount",
    intRate: "Interest Rate (p.a.)",
    tenure: "Total Loan Tenure",
    moratorium: "Moratorium Period (Grace Period)",
    monthlyEmi: "Your Monthly EMI",
    findTitle: "Find Your Perfect Scheme",
    findSub: "Answer a few questions to get AI-matched recommendations.",
    mapTitle: "Find a Channel Partner",
    mapSub: "Locate SCAs and Banks near you to apply for schemes.",
    search: "Search by city...",
    qPurpose: "Funding Purpose?",
    startBiz: "Start Business",
    expBiz: "Expand Business",
    edu: "Education",
    artisan: "Artisan",
    nextBtn: "Next",
    backBtn: "Back",
    matchBtn: "Find Matches",
    qAmt: "Funding Amount?",
    qInc: "Family Income?",
    qFinal: "Final Details",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    state: "State",
    purchaseEq: "Purchase Equipment",
    workingCap: "Working Capital",
    continueBtn: "Continue",
    step: "STEP",
    of: "OF",
    tellUs: "Tell us what you need",
    smartMatchBoxTitle: "Smart Matching",
    smartMatchBoxDesc:
      "Your answers help us find the exact scheme you qualify for. We match against 27 verified government schemes based on these parameters.",
    matchString: "MATCH",
    whyMatch: "WHY IT'S A MATCH",
    maxLoanAmt: "MAX LOAN AMOUNT",
    interestRate: "INTEREST RATE",
    viewDetailsApply: "View Details & Apply",
    findPartnerBtn: "Find Partner",
    emiCalcTitle: "Estimated EMI Calculator",
    emiCalcDesc:
      "Quickly see how different amounts affect your monthly payments based on typical scheme rates.",
    years: "Years",
    adjustCalc: "Adjust Calculator",
    homeTitle: "Find the Right Financial Scheme for Your Business",
    howItWorks: "How It Works",
    hwNeeds: "Your Needs",
    hwNeedsDesc: "Tell us about your business profile.",
    hwMatch: "Smart Matching",
    hwMatchDesc: "AI matches your profile against 27 verified schemes.",
    hwBest: "Best Scheme",
    hwBestDesc: "Review tailored financing options.",
    hwPartner: "Nearest Partner",
    hwPartnerDesc: "Connect with local application centers.",
    exploreSchemes: "Explore Schemes",
    exploreTitle: "Explore Government Schemes",
    exploreSub:
      "Browse through all available financial assistance programs for marginalized communities.",
    schemeDetailsTitle: "Scheme Details",
    eligibilityCriteria: "Eligibility Criteria",
    keyBenefits: "Key Benefits",
    targetAudience: "Target Audience",
    noMatchTitle: "No Direct Matches Found",
    noMatchDesc:
      "Your profile doesn't strictly match the available specialized schemes. Consider browsing all schemes or adjusting your loan amount.",
    notEligibleTitle: "Eligibility Requirements Not Met",
    editProfileBtn: "Edit Profile",
    resultsVoiceLabel: "Listen to Results",
    resultsVoiceText: (count, name, amount, interest) =>
      `You have ${count} matched schemes. Your top recommended scheme is ${name}, with maximum funding of ${amount} at ${interest} interest rate.`,
    onlineApp: "Online Application",
    dossierBtn: "Print Bank Dossier",
    applyOnlineBtn: "Apply Online Portal",
    getDossierBtn: "Get Application Dossier",
    needGuidanceTitle: "Need Guidance?",
    needGuidanceDesc:
      "Navigating schemes can be complex. Connect with an official partner for free assistance.",
    findLocalPartner: "Find a local partner",
    ineligNoCaste:
      "NSFDC schemes strictly require a valid Scheduled Caste (SC) certificate. Based on your input, you do not meet this mandatory criteria.",
    ineligHighIncome:
      "Your family income exceeds the ₹3.00 Lakh limit for NSFDC schemes. These schemes are strictly targeted at marginalized entrepreneurs.",
    reasonBase: "Meets base eligibility criteria.",
    reasonAmountWithin: (amt, max) =>
      `Amount (₹${amt}) is within the scheme limit of ₹${max}.`,
    reasonAmountExceed: (max) =>
      `Note: Requested amount exceeds scheme limit of ₹${max}.`,
    reasonWomen: "Specialized scheme for female entrepreneurs.",
    estEmi: "Est. EMI",
    interestRateLabel: "Interest Rate",
    listenScheme: "Listen in Voice",
    downloadDossier: "Download Application Dossier (Print Slip)",
    appProvenance: "Application & Provenance",
    appRoute: "Application Route",
    officialPortal: "Official Portal",
    offlineApp: "Offline Application",
    mustApplyChannel: "Must apply via authorized channel partners:",
    dataSource: "Data Source (Provenance)",
    statusVerified: "Status: Verified",
    lastVerified: "Last Verified",
    schemeNotFound: "Scheme not found",
    backToExplore: "Back to Explore",
    tabQuestionnaire: "7-Step Questionnaire",
    tabAiIdea: "AI Idea Analyzer",
    tabScanCert: "Scan Certificate",
    bankAll: "All Banks",
    bankPublic: "Public Sector",
    bankPrivate: "Private Sector",
    bankRural: "Rural Banks",
    numberingSystem: "latn",
    months: "Months",
    stateAssam: "Assam",
    stateDelhi: "Delhi",
    stateMaharashtra: "Maharashtra",
    partnerLocatorTitle: "Partner Locator",
    partnerLocatorSub: "Find authorized financial institutions near you.",
    eligibleForScheme: "Eligible for my scheme",
    showOnlyEligible: "Show only eligible for my scheme",
    eligiblePartnersNear: "ELIGIBLE PARTNERS FOUND NEAR YOU",
    noPartnersFound: "No authorized financial partners match your filter or search criteria.",
    offlineApplyAlert: (name) => `Please visit ${name} branch with your KYC, SC Certificate, and Business Plan to apply offline.`,
    offlineApplicationBtn: "Offline Application",
    getDirections: "Get Directions",
    searchByLocOrName: "Search by Location or Name",
    youAreHere: "📍 You are here!",
    acceptingApps: "✅ Accepting Applications",
    generalLoansOnly: "❌ General Loans Only",
    aboutTitle: "About Samarth",
    aboutDesc1: "Samarth is an innovative AI-driven platform designed to bridge the gap between citizens, entrepreneurs, and government welfare schemes.",
    aboutDesc2: "We simplify the discovery and application process for government loans, grants, and credit assistance options across key sectors.",
    ourMissionTitle: "Our Mission",
    ourMissionDesc: "To empower communities by ensuring accessible, transparent, and efficient financial assistance through smart automation and personalized recommendations.",
    aboutDisclaimer: "Disclaimer: This platform is an enterprise-grade AI policy discovery system. Data provided is for informational purposes.",
    reachOutTitle: "Reach Out to Us",
    contactInfoTitle: "Contact Information",
    refOfficeTitle: "Reference Office",
    refOfficeNote: "(National Public Administration Reference Address)",
    navContact: "Contact",
    contactEmail: "Email: (coming soon)",
    contactSihProto: "Samarth is an AI Policy Discovery & Application Assistant @2026",
    sendUsMessage: "Send us a message",
    messageSentAlert: "Message Sent!",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    formSubmit: "Submit",
    botGreeting: "Hello! I am Samarth AI. How can I help you understand government financial schemes today?",
    botError: "I am ready to help. You can ask any question regarding government loan schemes, eligibility, or application steps.",
    botPlaceholder: "Ask or speak a question...",
    privacyTitle: "Privacy Notice",
    privacyIntro: "Samarth is an AI Policy Discovery platform @2026. This notice describes how your information is used.",
    privacyCollectTitle: "What We Collect",
    privacyCollect1: "Scheme matching questionnaire: age, gender, state, income, caste status, education, skill level",
    privacyCollect2: "AI Business Analyzer: your business description text",
    privacyCollect3: "AI Chatbot: chat messages",
    privacyStorageTitle: "Data Storage",
    privacyStorageDesc: "This prototype has no persistent data storage. Server functions use ephemeral memory that clears after each session. No cookies or tracking are used.",
    privacyThirdTitle: "Third-Party Services",
    privacyThird1: "Google Gemini API: used for business idea AI analysis and chatbot. Text you enter is sent to Google for processing.",
    privacyThird2: "OpenStreetMap: for loading map tiles on the partner locator.",
    privacyThird3: "Google Fonts: for loading the Inter typeface.",
    navHome: "Home",
    navAbout: "About",
    footerTagline: "Know Your Schemes. Claim Your Rights.",
    footerLinks: "Links",
    footerInfo: "Info",
    footerMinistry: "Initiative",
    footerPortal: "National Citizen Welfare & Schemes Portal",
    footerDisclaimer: "This is a competition project, not an official government service.",
    navAdmin: "Admin Portal",
  },
  hi: {
    schemeEdu: "शिक्षा ऋण योजना",
    descEdu:
      "भारत में पढ़ाई के लिए ₹20 लाख तक 4% प्रति वर्ष (महिलाओं के लिए 3.5%)।",
    schemeSSY: "शिल्पी समृद्धि योजना (SSY)",
    descSSY:
      "पारंपरिक कारीगरों और शिल्पकारों के लिए 5% प्रति वर्ष पर ₹1.4 लाख तक की सहायता।",
    schemeMSY: "महिला समृद्धि योजना (MSY)",
    descMSY:
      "विशेष रूप से महिला उद्यमियों के लिए 4% प्रति वर्ष पर अत्यधिक रियायती ऋण।",
    schemeTerm: "टर्म लोन योजना",
    descTerm:
      "6-10% प्रति वर्ष पर ₹50 लाख तक का बड़े पैमाने पर व्यापार वित्तपोषण।",
    schemeNone: "NSFDC के लिए पात्र नहीं",
    descNone:
      "NSFDC योजनाओं के लिए वैध एससी जाति प्रमाण पत्र और पारिवारिक आय ₹5 लाख से कम होना अनिवार्य है।",
    qAge: "आपकी आयु क्या है?",
    qLoc: "आप कहाँ स्थित हैं?",
    rural: "ग्रामीण (गाँव)",
    urban: "शहरी (शहर)",
    qSkill: "वर्तमान कौशल स्तर?",
    unskilled: "अकुशल",
    skilled: "कुशल कारीगर",
    professional: "पेशेवर / डिग्री",
    qDocs: "पात्रता जांच",
    hasCaste: "क्या आपके पास वैध एससी जाति प्रमाण पत्र है?",
    yes: "हाँ",
    no: "नहीं",
    isDisabled: "क्या आपके पास प्रमाणित विकलांगता (दिव्यांगजन) है?",
    eduLabel: "शिक्षा की स्थिति",
    edu1: "10वीं से नीचे",
    edu2: "10वीं / 12वीं पास",
    edu3: "स्नातक / स्नातकोत्तर",
    resultsTitle: "आपके अनुशंसित योजनाएँ",
    resultsSub: "आपकी आवश्यकताओं के आधार पर, यहाँ सर्वश्रेष्ठ योजनाएँ हैं।",
    matchText: "98% मिलान",
    mcfTitle: "माइक्रो क्रेडिट फाइनेंस (MCF)",
    mcfDesc: "छोटे आय-सृजन गतिविधियों के लिए बिल्कुल सही।",
    subtitle:
      "बुद्धिमान एआई-संचालित योजना मिलान के माध्यम से एससी समुदायों और वित्तीय सशक्तिकरण के बीच की खाई को पाटना।",
    findBtn: "अपनी योजना खोजें",
    emiBtn: "ईएमआई कैलकुलेटर",
    navFind: "योजना खोजें",
    navLocate: "पार्टनर खोजें",
    calcTitle: "ऋण ईएमआई कैलकुलेटर",
    calcSub: "NSFDC मोरेटोरियम (रियायती अवधि) गणना शामिल है",
    loanAmt: "ऋण राशि",
    intRate: "ब्याज दर (प्रति वर्ष)",
    tenure: "कुल ऋण अवधि",
    moratorium: "मोरेटोरियम अवधि",
    monthlyEmi: "आपकी मासिक ईएमआई",
    findTitle: "अपनी आदर्श योजना खोजें",
    findSub: "AI अनुशंसाएं प्राप्त करने के लिए कुछ प्रश्नों के उत्तर दें।",
    mapTitle: "चैनल पार्टनर खोजें",
    mapSub: "योजनाओं के लिए आवेदन करने के लिए अपने आस-पास SCA और बैंक खोजें।",
    search: "शहर से खोजें...",
    qPurpose: "फंडिंग का उद्देश्य?",
    startBiz: "व्यवसाय शुरू करें",
    expBiz: "व्यवसाय बढ़ाएं",
    edu: "शिक्षा",
    artisan: "शिल्पकार",
    nextBtn: "अगला",
    backBtn: "पीछे",
    matchBtn: "मिलान खोजें",
    qAmt: "फंडिंग राशि?",
    qInc: "पारिवारिक आय?",
    qFinal: "अंतिम विवरण",
    gender: "लिंग",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
    state: "राज्य",
    purchaseEq: "उपकरण खरीदें",
    workingCap: "कार्यशील पूंजी",
    continueBtn: "जारी रखें",
    step: "चरण",
    of: "/",
    tellUs: "हमें बताएं कि आपको क्या चाहिए",
    smartMatchBoxTitle: "स्मार्ट मिलान",
    smartMatchBoxDesc:
      "आपके उत्तर हमें उस सटीक योजना को खोजने में मदद करते हैं जिसके लिए आप योग्य हैं। हम इन मापदंडों के आधार पर 27 सत्यापित सरकारी योजनाओं से मिलान करते हैं।",
    matchString: "मिलान",
    whyMatch: "यह एक मिलान क्यों है",
    maxLoanAmt: "अधिकतम ऋण राशि",
    interestRate: "ब्याज दर",
    viewDetailsApply: "विवरण देखें और आवेदन करें",
    findPartnerBtn: "पार्टनर खोजें",
    emiCalcTitle: "अनुमानित ईएमआई कैलकुलेटर",
    emiCalcDesc:
      "जल्दी से देखें कि विभिन्न राशियाँ विशिष्ट योजना दरों के आधार पर आपके मासिक भुगतान को कैसे प्रभावित करती हैं।",
    years: "वर्ष",
    adjustCalc: "कैलकुलेटर समायोजित करें",
    homeTitle: "अपने व्यवसाय के लिए सही वित्तीय योजना खोजें",
    howItWorks: "यह कैसे काम करता है",
    hwNeeds: "आपकी ज़रूरतें",
    hwNeedsDesc: "हमें अपने व्यावसायिक प्रोफ़ाइल के बारे में बताएं।",
    hwMatch: "स्मार्ट मिलान",
    hwMatchDesc: "एआई आपकी प्रोफ़ाइल को 27 सत्यापित योजनाओं से मिलाता है।",
    hwBest: "सर्वश्रेष्ठ योजना",
    hwBestDesc: "अनुकूलित वित्तपोषण विकल्पों की समीक्षा करें।",
    hwPartner: "निकटतम पार्टनर",
    hwPartnerDesc: "स्थानीय आवेदन केंद्रों से जुड़ें।",
    exploreSchemes: "योजनाओं का अन्वेषण करें",
    exploreTitle: "सरकारी योजनाओं का अन्वेषण करें",
    exploreSub:
      "हाशिए पर रहने वाले समुदायों के लिए उपलब्ध सभी वित्तीय सहायता कार्यक्रमों को ब्राउज़ करें।",
    schemeDetailsTitle: "योजना का विवरण",
    eligibilityCriteria: "पात्रता मापदंड",
    keyBenefits: "प्रमुख लाभ",
    targetAudience: "लक्षित दर्शक",
    noMatchTitle: "कोई सीधा मिलान नहीं मिला",
    noMatchDesc:
      "आपकी प्रोफ़ाइल उपलब्ध विशेष योजनाओं से पूरी तरह मेल नहीं खाती। सभी योजनाओं को ब्राउज़ करने या अपनी ऋण राशि को समायोजित करने पर विचार करें।",
    notEligibleTitle: "पात्रता आवश्यकताएँ पूरी नहीं हुईं",
    editProfileBtn: "प्रोफ़ाइल संपादित करें",
    resultsVoiceLabel: "परिणाम सुनें",
    resultsVoiceText: (count, name, amount, interest) =>
      `आपके लिए ${count} योजनाएं उपयुक्त पाई गई हैं। आपकी शीर्ष अनुशंसित योजना ${name} है, जिसमें ${interest} ब्याज दर पर अधिकतम ${amount} का ऋण उपलब्ध है।`,
    onlineApp: "ऑनलाइन आवेदन",
    dossierBtn: "बैंक डॉसियर प्रिंट करें",
    applyOnlineBtn: "ऑनलाइन पोर्टल पर आवेदन करें",
    getDossierBtn: "आवेदन डॉसियर प्राप्त करें",
    needGuidanceTitle: "मार्गदर्शन चाहिए?",
    needGuidanceDesc:
      "सरकारी योजनाओं को समझना जटिल हो सकता है। निःशुल्क सहायता के लिए किसी आधिकारिक पार्टनर से जुड़ें।",
    findLocalPartner: "स्थानीय पार्टनर खोजें",
    ineligNoCaste:
      "NSFDC योजनाओं के लिए वैध अनुसूचित जाति (SC) प्रमाण पत्र अनिवार्य है। आपके इनपुट के आधार पर, आप इस अनिवार्य मानदंड को पूरा नहीं करते हैं।",
    ineligHighIncome:
      "आपकी पारिवारिक आय NSFDC योजनाओं की ₹3.00 लाख की सीमा से अधिक है। ये योजनाएं केवल हाशिए पर रहने वाले उद्यमियों के लिए हैं।",
    reasonBase: "मूल पात्रता मानदंड पूरा करता है।",
    reasonAmountWithin: (amt, max) =>
      `ऋण राशि (₹${amt}) योजना की अधिकतम सीमा ₹${max} के भीतर है।`,
    reasonAmountExceed: (max) =>
      `ध्यान दें: मांगी गई राशि योजना की सीमा ₹${max} से अधिक है।`,
    reasonWomen: "महिला उद्यमियों के लिए विशेष योजना।",
    estEmi: "अनुमानित ईएमआई",
    interestRateLabel: "ब्याज दर",
    listenScheme: "योजना सुनें",
    downloadDossier: "बैंक आवेदन डॉसियर (प्रिंट स्लिप)",
    appProvenance: "आवेदन एवं स्रोत सत्यापन",
    appRoute: "आवेदन का तरीका",
    officialPortal: "आधिकारिक पोर्टल",
    offlineApp: "ऑफलाइन आवेदन",
    mustApplyChannel: "अधिकृत चैनल पार्टनर्स के माध्यम से आवेदन करना होगा:",
    dataSource: "डेटा स्रोत (सत्यापन)",
    statusVerified: "स्थिति: सत्यापित",
    lastVerified: "अंतिम सत्यापन",
    schemeNotFound: "योजना नहीं मिली",
    backToExplore: "योजनाएं देखने वापस जाएं",
    tabQuestionnaire: "7-चरण प्रोफाइलर",
    tabAiIdea: "AI व्यापार विश्लेषण",
    tabScanCert: "प्रमाण पत्र स्कैन",
    bankAll: "सभी बैंक",
    bankPublic: "सार्वजनिक क्षेत्र",
    bankPrivate: "निजी क्षेत्र",
    bankRural: "ग्रामीण बैंक",
    numberingSystem: "deva",
    months: "महीने",
    stateAssam: "असम",
    stateDelhi: "दिल्ली",
    stateMaharashtra: "महाराष्ट्र",
    partnerLocatorTitle: "पार्टनर लोकेटर",
    partnerLocatorSub: "अपने आस-पास अधिकृत वित्तीय संस्थान खोजें।",
    eligibleForScheme: "मेरी योजना के लिए योग्य",
    showOnlyEligible: "केवल मेरी योजना के लिए योग्य दिखाएं",
    eligiblePartnersNear: "योग्य पार्टनर आस-पास मिले",
    noPartnersFound: "आपके खोज या फ़िल्टर से मेल खाने वाला कोई अधिकृत वित्तीय संस्थान नहीं मिला।",
    offlineApplyAlert: () => "कृपया अपनी केवाईसी, जाति प्रमाण पत्र और व्यवसाय योजना के साथ इस शाखा पर जाएं।",
    offlineApplicationBtn: "ऑफ़लाइन आवेदन",
    getDirections: "दिशा-निर्देश",
    searchByLocOrName: "स्थान या नाम से खोजें",
    youAreHere: "📍 आप यहाँ हैं!",
    acceptingApps: "✅ आवेदन स्वीकार कर रहे हैं",
    generalLoansOnly: "❌ केवल सामान्य ऋण",
    aboutTitle: "हमारे बारे में",
    aboutDesc1: "समर्थ एक अभिनव AI-संचालित मंच है जिसे नागरिकों, उद्यमियों और सरकारी कल्याणकारी योजनाओं के बीच की खाई को पाटने के लिए डिज़ाइन किया गया है।",
    aboutDesc2: "हम उद्यमियों के लिए सरकारी ऋण, अनुदान और वित्तीय सहायता विकल्पों की खोज और आवेदन प्रक्रिया को सरल बनाते हैं।",
    ourMissionTitle: "हमारा मिशन",
    ourMissionDesc: "स्मार्ट ऑटोमेशन के माध्यम से सुलभ वित्तीय सहायता सुनिश्चित करना।",
    aboutDisclaimer: "डिस्क्लेमर: यह एक प्रोटोटाइप परियोजना है और इसे एक आधिकारिक सरकारी सेवा के रूप में उपयोग नहीं किया जाना चाहिए।",
    reachOutTitle: "हमसे संपर्क करें",
    contactInfoTitle: "संपर्क जानकारी",
    refOfficeTitle: "संदर्भ कार्यालय",
    refOfficeNote: "(सार्वजनिक प्रशासनिक संदर्भ पता)",
    navContact: "संपर्क करें",
    contactEmail: "ईमेल: (जल्द ही उपलब्ध)",
    contactSihProto: "Samarth एक उन्नत AI पॉलिसी डिस्कवरी और एप्लीकेशन सहायक @2026 है",
    sendUsMessage: "हमें एक संदेश भेजें",
    messageSentAlert: "संदेश भेजा गया!",
    formName: "नाम",
    formEmail: "ईमेल",
    formMessage: "संदेश",
    formSubmit: "सबमिट करें",
    botGreeting: "नमस्ते! मैं Samarth AI हूँ। मैं आपको सरकारी योजनाओं को समझने में कैसे मदद कर सकता हूँ?",
    botError: "मैं आपकी सहायता के लिए तैयार हूँ। आप सरकारी ऋण योजनाओं, पात्रता या आवेदन चरणों के बारे में कोई भी प्रश्न पूछ सकते हैं।",
    botPlaceholder: "प्रश्न पूछें या माइक दबाएं...",
    privacyTitle: "गोपनीयता सूचना",
    privacyIntro: "Samarth एक उन्नत AI पॉलिसी डिस्कवरी प्लेटफॉर्म @2026 है। यह सूचना बताती है कि हम आपकी जानकारी का उपयोग कैसे करते हैं।",
    privacyCollectTitle: "हम क्या एकत्र करते हैं",
    privacyCollect1: "योजना मिलान प्रश्नावली: आयु, लिंग, राज्य, आय, जाति स्थिति, शिक्षा, कौशल स्तर",
    privacyCollect2: "AI व्यापार विश्लेषक: आपका व्यापार विवरण पाठ",
    privacyCollect3: "AI चैटबॉट: चैट संदेश",
    privacyStorageTitle: "डेटा भंडारण",
    privacyStorageDesc: "इस प्रोटोटाइप में कोई स्थायी डेटा संग्रहण नहीं है। सर्वर फ़ंक्शन अस्थायी मेमोरी का उपयोग करते हैं जो प्रत्येक सत्र के बाद साफ़ हो जाती है। कोई कुकीज़ या ट्रैकिंग का उपयोग नहीं किया जाता है।",
    privacyThirdTitle: "तृतीय-पक्ष सेवाएँ",
    privacyThird1: "Google Gemini API: व्यापार विचार AI विश्लेषण और चैटबॉट के लिए उपयोग किया जाता है। आपके द्वारा दर्ज किया गया पाठ Google को भेजा जाता है।",
    privacyThird2: "OpenStreetMap: मानचित्र टाइल्स लोड करने के लिए।",
    privacyThird3: "Google Fonts: Inter फ़ॉन्ट लोड करने के लिए।",
    navHome: "होम",
    navAbout: "हमारे बारे में",
    footerTagline: "अपनी योजनाएं जानें। अपने अधिकार पाएं।",
    footerLinks: "लिंक",
    footerInfo: "जानकारी",
    footerMinistry: "पहल",
    footerPortal: "राष्ट्रीय नागरिक कल्याण एवं योजना पोर्टल",
    footerDisclaimer: "यह एक प्रतियोगिता परियोजना है, आधिकारिक सरकारी सेवा नहीं।",
    navAdmin: "व्यवस्थापक पोर्टल",
  },
  as: {
    schemeEdu: "শিক্ষা ঋণ আঁচনি",
    descEdu:
      "ভাৰতত অধ্যয়নৰ বাবে বাৰ্ষিক ৪% হাৰত (মহিলাৰ বাবে ৩.৫%) ২০ লাখ টকালৈকে।",
    schemeSSY: "শিল্পী সমৃদ্ধি যোজনা (SSY)",
    descSSY:
      "পৰম্পৰাগত শিল্পী আৰু কাৰিকৰসকলৰ বাবে বাৰ্ষিক ৫% হাৰত ১.৪ লাখ টকালৈকে সাহায্য।",
    schemeMSY: "মহিলা সমৃদ্ধি যোজনা (MSY)",
    descMSY:
      "বিশেষকৈ মহিলা উদ্যোগীসকলৰ বাবে বাৰ্ষিক ৪% হাৰত ৰাজসাহায্য যুক্ত ঋণ।",
    schemeTerm: "ম্যাদী ঋণ আঁচনি",
    descTerm: "বাৰ্ষিক ৬-১০% হাৰত ৫০ লাখ টকালৈকে বৃহৎ ব্যৱসায়িক পুঁজি।",
    schemeNone: "NSFDC ৰ বাবে যোগ্য নহয়",
    descNone:
      "NSFDC আঁচনিসমূহৰ বাবে বৈধ অনুসূচিত জাতিৰ প্ৰমাণপত্ৰ আৰু আয় ৫ লাখতকৈ কম হোৱাটো অপৰিহাৰ্য।",
    qAge: "আপোনাৰ বয়স কিমান?",
    qLoc: "আপুনি ক'ত অৱস্থিত?",
    rural: "গ্ৰাম্য (গাওঁ)",
    urban: "নগৰীয়া (চহৰ)",
    qSkill: "বৰ্তমানৰ দক্ষতাৰ স্তৰ?",
    unskilled: "অদক্ষ",
    skilled: "দক্ষ শিল্পী",
    professional: "পেছাদাৰী / ডিগ্ৰী",
    qDocs: "যোগ্যতা পৰীক্ষা",
    hasCaste: "আপোনাৰ বৈধ অনুসূচিত জাতিৰ প্ৰমাণপত্ৰ আছে নেকি?",
    yes: "হয়",
    no: "নহয়",
    isDisabled: "আপোনাৰ প্ৰমাণিত অক্ষমতা আছে নেকি?",
    eduLabel: "শিক্ষাৰ অৱস্থা",
    edu1: "দশম শ্ৰেণীৰ তলত",
    edu2: "দশম / দ্বাদশ উত্তীৰ্ণ",
    edu3: "স্নাতক / স্নাতকোত্তৰ",
    resultsTitle: "আপোনাৰ পৰামৰ্শপ্ৰাপ্ত আঁচনিসমূহ",
    resultsSub: "আপোনাৰ প্ৰয়োজনৰ ভিত্তিত, ইয়াত শ্ৰেষ্ঠ আঁচনিসমূহ দিয়া হ'ল।",
    matchText: "৯৮% মেচ",
    mcfTitle: "মাইক্ৰ' ক্ৰেডিট ফাইনেঞ্চ (MCF)",
    mcfDesc: "সৰু আয়-উপাৰ্জনমূলক কাৰ্যকলাপৰ বাবে নিখুঁত।",
    subtitle:
      "এআইৰ জৰিয়তে অনুসূচিত জাতিৰ লোকসকলক বিত্তীয়ভাৱে সৱলীকৰণ কৰা আৰু ব্যৱধান দূৰ কৰা।",
    findBtn: "আপোনাৰ আঁচনি বিচাৰক",
    emiBtn: "ইএমআই কেলকুলেটৰ",
    navFind: "আঁচনি বিচাৰক",
    navLocate: "অংশীদাৰ বিচাৰক",
    calcTitle: "ঋণ ইএমআই কেলকুলেটৰ",
    calcSub: "NSFDC মৰেটৰিয়াম (গ্ৰেছ পিৰিয়ড) গণনা অন্তৰ্ভুক্ত",
    loanAmt: "ঋণৰ পৰিমাণ",
    intRate: "সুদৰ হাৰ",
    tenure: "মুঠ ঋণৰ ম্যাদ",
    moratorium: "মৰেটৰিয়ামৰ ম্যাদ",
    monthlyEmi: "আপোনাৰ মাহেকীয়া ইএমআই",
    findTitle: "আপোনাৰ নিখুঁত আঁচনি বিচাৰক",
    findSub: "AI পৰামৰ্শ পাবলৈ কেইটামান প্ৰশ্নৰ উত্তৰ দিয়ক।",
    mapTitle: "চেনেল অংশীদাৰ বিচাৰক",
    mapSub: "আঁচনিৰ বাবে আবেদন কৰিবলৈ আপোনাৰ ওচৰৰ SCA আৰু বেংক বিচাৰক।",
    search: "চহৰ অনুসৰি বিচাৰক...",
    qPurpose: "পুঁজিৰ উদ্দেশ্য?",
    startBiz: "ব্যৱসায় আৰম্ভ কৰক",
    expBiz: "ব্যৱসায় সম্প্ৰসাৰণ কৰক",
    edu: "শিক্ষা",
    artisan: "শিল্পকাৰ",
    nextBtn: "পৰৱৰ্তী",
    backBtn: "উভতি যাওক",
    matchBtn: "মিলন বিচাৰক",
    qAmt: "পুঁজিৰ পৰিমাণ?",
    qInc: "পৰিয়ালৰ আয়?",
    qFinal: "চূড়ান্ত বিৱৰণ",
    gender: "লিংগ",
    male: "পুৰুষ",
    female: "মহিলা",
    other: "অন্য",
    state: "ৰাজ্য",
    purchaseEq: "সঁজুলি ক্ৰয় কৰক",
    workingCap: "কাৰ্যকৰী মূলধন",
    continueBtn: "অব্যাহত ৰাখক",
    step: "পদক্ষেপ",
    of: "/",
    tellUs: "আপোনাক কি প্ৰয়োজন আমাক জনাওক",
    smartMatchBoxTitle: "স্মাৰ্ট মেচিং",
    smartMatchBoxDesc:
      "আপোনাৰ উত্তৰসমূহে আপুনি যোগ্য হোৱা সঠিক আঁচনিখন বিচাৰি উলিওৱাত আমাক সহায় কৰে। আমি এই পেৰামিটাৰসমূহৰ ওপৰত ভিত্তি কৰি ২৭ খন সত্যাপিত চৰকাৰী আঁচনিৰ সৈতে মিলান কৰোঁ।",
    matchString: "মেচ",
    whyMatch: "এয়া কিয় এটা মেচ",
    maxLoanAmt: "সৰ্বোচ্চ ঋণৰ পৰিমাণ",
    interestRate: "সুদৰ হাৰ",
    viewDetailsApply: "বিৱৰণ চাওক আৰু আবেদন কৰক",
    findPartnerBtn: "অংশীদাৰ বিচাৰক",
    emiCalcTitle: "আনুমানিক ইএমআই কেলকুলেটৰ",
    emiCalcDesc:
      "সাধাৰণ আঁচনিৰ হাৰৰ ওপৰত ভিত্তি কৰি বিভিন্ন পৰিমাণে আপোনাৰ মাহেকীয়া পৰিশোধত কেনেদৰে প্ৰভাৱ পেলায় সেয়া সোনকালে চাওক।",
    years: "বছৰ",
    adjustCalc: "কেলকুলেটৰ সামঞ্জস্য কৰক",
    homeTitle: "আপোনাৰ ব্যৱসায়ৰ বাবে সঠিক বিত্তীয় আঁচনি বিচাৰক",
    howItWorks: "ই কেনেদৰে কাম কৰে",
    hwNeeds: "আপোনাৰ প্ৰয়োজনসমূহ",
    hwNeedsDesc: "আপোনাৰ ব্যৱসায়িক প্ৰফাইলৰ বিষয়ে আমাক জনাওক।",
    hwMatch: "স্মাৰ্ট মেচিং",
    hwMatchDesc: "এআইয়ে আপোনাৰ প্ৰফাইলক ২৭ খন সত্যাপিত আঁচনিৰ সৈতে মিলান কৰে।",
    hwBest: "শ্ৰেষ্ঠ আঁচনি",
    hwBestDesc: "অনুকূলিত বিত্তীয় বিকল্পসমূহ পৰ্যালোচনা কৰক।",
    hwPartner: "নিকটতম অংশীদাৰ",
    hwPartnerDesc: "স্থানীয় আবেদন কেন্দ্ৰসমূহৰ সৈতে সংযোগ কৰক।",
    exploreSchemes: "আঁচনিসমূহ অন্বেষণ কৰক",
    exploreTitle: "চৰকাৰী আঁচনিসমূহ অন্বেষণ কৰক",
    exploreSub:
      "প্ৰান্তীয় সম্প্ৰদায়সমূহৰ বাবে উপলব্ধ সকলো বিত্তীয় সাহায্য কাৰ্যসূচী ব্ৰাউজ কৰক।",
    schemeDetailsTitle: "আঁচনিৰ বিৱৰণ",
    eligibilityCriteria: "যোগ্যতাৰ মাপকাঠী",
    keyBenefits: "প্ৰধান লাভালাভ",
    targetAudience: "লক্ষ্য দৰ্শক",
    noMatchTitle: "কোনো পোনপটীয়া মেচ পোৱা নগ'ল",
    noMatchDesc:
      "আপোনাৰ প্ৰফাইল উপলব্ধ বিশেষ আঁচনিসমূহৰ সৈতে সম্পূৰ্ণৰূপে মিলি নাযায়। সকলো আঁচনি ব্ৰাউজ কৰা বা আপোনাৰ ঋণৰ পৰিমাণ সামঞ্জস্য কৰাৰ কথা বিবেচনা কৰক।",
    notEligibleTitle: "যোগ্যতাৰ প্ৰয়োজনীয়তা পূৰণ হোৱা নাই",
    editProfileBtn: "প্ৰফাইল সম্পাদনা কৰক",
    resultsVoiceLabel: "ফলাফল শুনক",
    resultsVoiceText: (count, name, amount, interest) =>
      `আপোনাৰ বাবে ${count} খন উপযুক্ত আঁচনি পোৱা গৈছে। আপোনাৰ শীৰ্ষ পৰামৰ্শপ্ৰাপ্ত আঁচনি হৈছে ${name}, য'ত ${interest} সুদৰ হাৰত সৰ্বোচ্চ ${amount} পুঁজি উপলব্ধ।`,
    onlineApp: "অনলাইন আবেদন",
    dossierBtn: "বেংক ডচিয়েৰ প্ৰিন্ট কৰক",
    applyOnlineBtn: "অনলাইন প'ৰ্টেলত আবেদন কৰক",
    getDossierBtn: "আবেদন ডচিয়েৰ প্ৰাপ্ত কৰক",
    needGuidanceTitle: "পথপ্ৰদৰ্শনৰ প্ৰয়োজন নেকি?",
    needGuidanceDesc:
      "আঁচনিসমূহ বুজাটো জটিল হ'ব পাৰে। বিনামূলীয়া সাহায্যৰ বাবে এজন কৰ্তৃত্বপ্ৰাপ্ত অংশীদাৰৰ সৈতে সংযোগ কৰক।",
    findLocalPartner: "স্থানীয় অংশীদাৰ বিচাৰক",
    ineligNoCaste:
      "NSFDC আঁচনিসমূহৰ বাবে বৈধ অনুসূচীত জাতিৰ প্ৰমাণপত্ৰ বাধ্যতামূলক। আপোনাৰ তথ্য অনুসৰি, আপুনি এই মাপকাঠী পূৰণ নকৰে।",
    ineligHighIncome:
      "আপোনাৰ পাৰিবাৰিক আয় NSFDC আঁচনিসমূহৰ ৩.০০ লাখ টকাৰ সীমা অতিক্ৰম কৰিছে। এই আঁচনিসমূহ প্ৰান্তীয় উদ্যোগীসকলৰ বাবে লক্ষ্য নিৰ্ধাৰিত।",
    reasonBase: "মূল যোগ্যতাৰ মাপকাঠী পূৰণ কৰে।",
    reasonAmountWithin: (amt, max) =>
      `ঋণৰ পৰিমাণ (₹${amt}) আঁচনিৰ সৰ্বোচ্চ সীমা ₹${max} ৰ ভিতৰত আছে।`,
    reasonAmountExceed: (max) =>
      `মন কৰিব: বিচৰা পৰিমাণ আঁচনিৰ সীমা ₹${max} তকৈ বেছি।`,
    reasonWomen: "মহিলা উদ্যোগীসকলৰ বাবে বিশেষ আঁচনি।",
    estEmi: "আনুমানিক ইএমআই",
    interestRateLabel: "সুদৰ হাৰ",
    listenScheme: "আঁচনি শুনক",
    downloadDossier: "বেংক আবেদন ডচিয়েৰ (প্ৰিন্ট শ্লিপ)",
    appProvenance: "আবেদন আৰু উৎস সত্যপন",
    appRoute: "আবেদনৰ মাধ্যম",
    officialPortal: "কৰ্তৃত্বপ্ৰাপ্ত প'ৰ্টেল",
    offlineApp: "অফলাইন আবেদন",
    mustApplyChannel:
      "কৰ্তৃত্বপ্ৰাপ্ত চেনেল অংশীদাৰৰ জৰিয়তে আবেদন কৰিব লাগিব:",
    dataSource: "তথ্যৰ উৎস (সত্যপন)",
    statusVerified: "স্থিতি: সত্যাাপিত",
    lastVerified: "অন্তিম সত্যপন",
    schemeNotFound: "আঁচনি বিচাৰি পোৱা নগ'ল",
    backToExplore: "আঁচনিসমূহলৈ উভতি যাওক",
    tabQuestionnaire: "৭-পদক্ষেপৰ প্ৰশ্নাৱলী",
    tabAiIdea: "AI ব্যৱসায়িক বিশ্লেষণ",
    tabScanCert: "প্ৰমাণপত্ৰ স্কেন",
    bankAll: "সকলো বেংক",
    bankPublic: "ৰাজহুৱা খণ্ড",
    bankPrivate: "ব্যক্তিগত খণ্ড",
    bankRural: "গ্ৰাম্য বেংক",
    numberingSystem: "beng",
    months: "মাহ",
    stateAssam: "অসম",
    stateDelhi: "দিল্লী",
    stateMaharashtra: "মহাৰাষ্ট্ৰ",
    partnerLocatorTitle: "অংশীদাৰ লোকেটৰ",
    partnerLocatorSub: "আপোনাৰ ওচৰৰ কৰ্তৃত্বপ্ৰাপ্ত বিত্তীয় প্ৰতিষ্ঠানসমূহ বিচাৰক।",
    eligibleForScheme: "মোৰ আঁচনিৰ বাবে যোগ্য",
    showOnlyEligible: "কেৱল মোৰ আঁচনিৰ বাবে যোগ্য দেখুৱাওক",
    eligiblePartnersNear: "ওচৰত পোৱা যোগ্য অংশীদাৰ",
    noPartnersFound: "আপোনাৰ সন্ধান বা ফিল্টাৰৰ সৈতে মিল থকা কোনো কৰ্তৃত্বপ্ৰাপ্ত বিত্তীয় প্ৰতিষ্ঠান পোৱা নগ'ল।",
    offlineApplyAlert: () => "অনুগ্ৰহ কৰি আপোনাৰ কেৱাইচি, জাতিগত প্ৰমাণপত্ৰ আৰু ব্যৱসায়িক পৰিকল্পনাৰ সৈতে এই শাখাত উপস্থিত হওক।",
    offlineApplicationBtn: "অফলাইন আৱেদন",
    getDirections: "নিৰ্দেশনা",
    searchByLocOrName: "স্থান বা নামৰ দ্বাৰা বিচাৰক",
    youAreHere: "📍 আপুনি ইয়াতে আছে!",
    acceptingApps: "✅ আবেদন গ্ৰহণ কৰি আছে",
    generalLoansOnly: "❌ কেৱল সাধাৰণ ঋণ",
    aboutTitle: "আমাৰ বিষয়ে",
    aboutDesc1: "Samarth হৈছে এক উদ্ভাৱনীমূলক AI-চালিত মঞ্চ যিটো নাগৰিক, উদ্যোগী আৰু চৰকাৰী কল্যাণমূলক আঁচনিসমূহৰ মাজৰ ব্যৱধান দূৰ কৰিবলৈ নিৰ্মাণ কৰা হৈছে।",
    aboutDesc2: "আমি বিভিন্ন খণ্ডৰ উদ্যোগীসকলৰ বাবে চৰকাৰী ঋণ, অনুদান আৰু বিত্তীয় সাহায্যৰ সন্ধান আৰু আবেদন প্ৰক্ৰিয়া সৰল কৰোঁ।",
    ourMissionTitle: "আমাৰ মিছন",
    ourMissionDesc: "স্মাৰ্ট অট'মেচনৰ জৰিয়তে সুলভ বিত্তীয় সাহায্য নিশ্চিত কৰা।",
    aboutDisclaimer: "অস্বীকাৰ: এইটো এটা উন্নত AI নীতি সন্ধান ব্যৱস্থা @2026।",
    reachOutTitle: "আমাৰ সৈতে যোগাযোগ কৰক",
    contactInfoTitle: "যোগাযোগৰ তথ্য",
    refOfficeTitle: "সন্দৰ্ভ কাৰ্যালয়",
    refOfficeNote: "(ৰাজহুৱা প্ৰশাসনিক সন্দৰ্ভ ঠিকনা)",
    navContact: "যোগাযোগ",
    contactEmail: "ইমেইল: (সোনকালে উপলব্ধ)",
    contactSihProto: "Samarth হৈছে এক AI নীতি সন্ধান আৰু আবেদন সহায়ক @2026",
    sendUsMessage: "আমালৈ বাৰ্তা প্ৰেৰণ কৰক",
    messageSentAlert: "বাৰ্তা প্ৰেৰণ কৰা হ'ল!",
    formName: "নাম",
    formEmail: "ইমেইল",
    formMessage: "বাৰ্তা",
    formSubmit: "জমা দিয়ক",
    botGreeting: "নমস্কাৰ! মই Samarth AI। মই আপোনাক চৰকাৰী আঁচনিসমূহ বুজাত কেনেকৈ সহায় কৰিব পাৰোঁ?",
    botError: "মই আপোনাক সহায় কৰিবলৈ সাজু। আপুনি চৰকাৰী ঋণ আঁচনি, যোগ্যতা বা আবেদনৰ পদক্ষেপসমূহৰ বিষয়ে যিকোনো প্ৰশ্ন সুধিব পাৰে।",
    botPlaceholder: "প্ৰশ্ন সোধক বা মাইক ব্যৱহাৰ কৰক...",
    privacyTitle: "গোপনীয়তা জাননী",
    privacyIntro: "Samarth হৈছে এক AI নীতি সন্ধান মঞ্চ @2026। এই জাননীয়ে আপোনাৰ তথ্য কেনেদৰে ব্যৱহাৰ কৰা হয় সেয়া বৰ্ণনা কৰে।",
    privacyCollectTitle: "আমি কি সংগ্ৰহ কৰোঁ",
    privacyCollect1: "আঁচনি মিলান প্ৰশ্নাৱলী: বয়স, লিংগ, ৰাজ্য, আয়, জাতি স্থিতি, শিক্ষা, দক্ষতাৰ স্তৰ",
    privacyCollect2: "AI ব্যৱসায়িক বিশ্লেষক: আপোনাৰ ব্যৱসায়িক বিৱৰণ পাঠ",
    privacyCollect3: "AI চেটবট: চেট বাৰ্তা",
    privacyStorageTitle: "তথ্য সংৰক্ষণ",
    privacyStorageDesc: "এই প্ৰ'ট'টাইপত কোনো স্থায়ী তথ্য সংৰক্ষণ নাই। চাৰ্ভাৰ ফাংচনে ক্ষণস্থায়ী মেম'ৰি ব্যৱহাৰ কৰে যিটো প্ৰতিটো অধিৱেশনৰ পিছত পৰিষ্কাৰ হয়। কোনো কুকিজ বা ট্ৰেকিং ব্যৱহাৰ কৰা নহয়।",
    privacyThirdTitle: "তৃতীয়-পক্ষৰ সেৱা",
    privacyThird1: "Google Gemini API: ব্যৱসায়িক ধাৰণা AI বিশ্লেষণ আৰু চেটবটৰ বাবে ব্যৱহাৰ কৰা হয়। আপুনি প্ৰৱেশ কৰোৱা পাঠ Google লৈ পঠিওৱা হয়।",
    privacyThird2: "OpenStreetMap: মানচিত্ৰৰ টাইলছ ল'ড কৰিবলৈ।",
    privacyThird3: "Google Fonts: Inter ফণ্ট ল'ড কৰিবলৈ।",
    navHome: "হোম",
    navAbout: "আমাৰ বিষয়ে",
    footerTagline: "আপোনাৰ আঁচনিসমূহ জানক। আপোনাৰ অধিকাৰ দাবী কৰক।",
    footerLinks: "লিংক",
    footerInfo: "তথ্য",
    footerMinistry: "উদ্যোগ",
    footerPortal: "ৰাষ্ট্ৰীয় নাগৰিক কল্যাণ আৰু আঁচনি প'ৰ্টেল",
    footerDisclaimer: "এইটো এটা প্ৰতিযোগিতা প্ৰকল্প, চৰকাৰী সেৱা নহয়।",
    navAdmin: "ন'ডেল প'ৰ্টেল",
  },
};

// --- INITIAL LANGUAGE MODAL ---
const LanguageModal = ({ setLang }) => (
  <dialog
    open
    aria-label="Select Language"
    className="fixed inset-0 bg-surface/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300"
  >
    <div className="card-ambient max-w-md w-full text-center border border-surface-container">
      <div className="w-16 h-16 bg-surface-container-highest text-primary rounded-full flex items-center justify-center mx-auto mb-6">
        <Globe size={32} />
      </div>
      <h2 className="headline-lg text-primary mb-2">Welcome to Samarth</h2>
      <p className="body-lg text-on-surface-variant mb-8">
        Please select your preferred language to continue
      </p>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => setLang("en")}
          className="p-4 rounded-xl border border-surface-container hover:border-secondary hover:bg-surface-container-lowest font-semibold text-lg text-on-surface transition-all flex justify-between items-center group"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇺🇸</span> English
          </div>{" "}
          <ChevronRight className="text-outline group-hover:text-secondary" />
        </button>
        <button
          onClick={() => setLang("hi")}
          className="p-4 rounded-xl border border-surface-container hover:border-secondary hover:bg-surface-container-lowest font-semibold text-lg text-on-surface transition-all flex justify-between items-center group"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇮🇳</span> हिन्दी
          </div>{" "}
          <ChevronRight className="text-outline group-hover:text-secondary" />
        </button>
        <button
          onClick={() => setLang("as")}
          className="p-4 rounded-xl border border-surface-container hover:border-secondary hover:bg-surface-container-lowest font-semibold text-lg text-on-surface transition-all flex justify-between items-center group"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🦏</span> অসমীয়া
          </div>{" "}
          <ChevronRight className="text-outline group-hover:text-secondary" />
        </button>
      </div>
    </div>
  </dialog>
);

// --- HOME COMPONENT ---
const Home = ({ lang }) => {
  const t = translations[lang] || translations.en;
  return (
    <section className="relative pt-12 pb-24 px-4 overflow-hidden animate-in fade-in duration-700 w-full">
      <div
        className="absolute inset-0 z-[-1] opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 100% 0%, rgba(214, 227, 255, 0.5) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(216, 226, 255, 0.4) 0%, transparent 50%)",
        }}
      ></div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Hero Text */}
        <div className="lg:col-span-6 flex flex-col gap-6 z-10 text-left">
          <div className="inline-flex items-center gap-2 bg-secondary-fixed text-secondary px-3 py-1.5 rounded-full w-max text-xs font-semibold tracking-wide uppercase shadow-sm">
            <BrainCircuit size={16} />
            {t.smartMatchBoxTitle}
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight tracking-tight">
            {t.homeTitle}
          </h1>

          <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            {t.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              to="/find"
              className="bg-primary text-on-primary font-bold px-6 py-3 rounded-lg shadow-sm hover:shadow-md hover:bg-opacity-90 transition-all duration-200 flex items-center justify-center"
            >
              {t.findBtn} <ChevronRight className="ml-2" size={18} />
            </Link>
            <Link
              to="/explore"
              className="bg-transparent border border-outline-variant text-on-surface font-bold px-6 py-3 rounded-lg hover:bg-surface-container-low transition-colors duration-200 flex items-center justify-center"
            >
              {t.exploreSchemes}
            </Link>
          </div>
        </div>

        {/* Hero Visual / Journey Graphic */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
          <div className="card-ambient w-full max-w-md rounded-2xl p-8 shadow-ambient relative z-10 border-l-2 border-secondary-container hover:-translate-y-1 transition-all duration-300">
            <h2 className="text-2xl font-bold text-primary mb-6">
              {t.howItWorks}
            </h2>

            <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[19px] before:w-[2px] before:bg-surface-variant">
              {/* Step 1 */}
              <div className="flex gap-4 relative group cursor-default">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center z-10 border-2 border-surface-container-lowest shrink-0 text-on-surface-variant group-hover:scale-110 group-hover:bg-primary-container group-hover:text-on-primary transition-all duration-300">
                  <Search size={20} />
                </div>
                <div className="pt-2 group-hover:translate-x-1 transition-transform duration-300">
                  <h4 className="font-bold text-primary">{t.hwNeeds}</h4>
                  <p className="text-sm text-on-surface-variant mt-1">
                    {t.hwNeedsDesc}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 relative group cursor-default">
                <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center z-10 border-2 border-surface-container-lowest shrink-0 text-secondary relative group-hover:scale-110 transition-all duration-300">
                  <div className="absolute inset-0 border-2 border-secondary rounded-full animate-ping opacity-20"></div>
                  <BrainCircuit size={20} />
                </div>
                <div className="pt-2 group-hover:translate-x-1 transition-transform duration-300">
                  <h4 className="font-bold text-secondary">{t.hwMatch}</h4>
                  <p className="text-sm text-on-surface-variant mt-1">
                    {t.hwMatchDesc}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 relative group cursor-default">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center z-10 border-2 border-surface-container-lowest shrink-0 text-on-surface-variant group-hover:scale-110 group-hover:bg-primary-container group-hover:text-on-primary transition-all duration-300">
                  <ShieldCheck size={20} />
                </div>
                <div className="pt-2 group-hover:translate-x-1 transition-transform duration-300">
                  <h4 className="font-bold text-primary">{t.hwBest}</h4>
                  <p className="text-sm text-on-surface-variant mt-1">
                    {t.hwBestDesc}
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4 relative group cursor-default">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center z-10 border-2 border-surface-container-lowest shrink-0 text-on-surface-variant group-hover:scale-110 group-hover:bg-primary-container group-hover:text-on-primary transition-all duration-300">
                  <MapPin size={20} />
                </div>
                <div className="pt-2 group-hover:translate-x-1 transition-transform duration-300">
                  <h4 className="font-bold text-primary">{t.hwPartner}</h4>
                  <p className="text-sm text-on-surface-variant mt-1">
                    {t.hwPartnerDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- ADVANCED EMI CALCULATOR ---
const CalculatorPage = ({ lang }) => {
  const t = translations[lang] || translations.en;
  const [loanAmount, setLoanAmount] = useState(140000);
  const [interestRate, setInterestRate] = useState(6.5);
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

  const formatCurrency = (amount) =>
    new Intl.NumberFormat(lang + "-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
      numberingSystem: t.numberingSystem,
    }).format(amount);

  return (
    <div className="max-w-5xl mx-auto py-8 animate-in fade-in duration-500 px-4">
      <div className="text-center mb-10">
        <h2 className="headline-lg text-primary">{t.calcTitle}</h2>
        <p className="body-lg text-on-surface-variant mt-2">{t.calcSub}</p>
      </div>
      <div className="card-ambient p-0 overflow-hidden flex flex-col md:flex-row border border-surface-container">
        <div className="p-8 md:w-3/5 bg-surface-container-lowest space-y-8">
          <div>
            <div className="flex justify-between mb-2">
              <label className="label-md text-on-surface">{t.loanAmt}</label>
              <span className="font-bold text-primary bg-surface-container px-3 py-1 rounded-md">
                {formatCurrency(loanAmount)}
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="5000000"
              step="10000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-secondary"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="label-md text-on-surface">{t.intRate}</label>
              <span className="font-bold text-primary bg-surface-container px-3 py-1 rounded-md">
                {interestRate}%
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="15"
              step="0.5"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-secondary"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="label-md text-on-surface">{t.tenure}</label>
              <span className="font-bold text-primary bg-surface-container px-3 py-1 rounded-md">
                {tenureYears}{" "}
                {t.years}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(e.target.value)}
              className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-secondary"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="label-md text-on-surface">{t.moratorium}</label>
              <span className="font-bold text-primary bg-surface-container px-3 py-1 rounded-md">
                {moratorium}{" "}
                {t.months}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="12"
              step="3"
              value={moratorium}
              onChange={(e) => setMoratorium(e.target.value)}
              className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-secondary"
            />
          </div>
        </div>
        <div className="p-8 md:w-2/5 bg-primary-container text-on-primary-container flex flex-col justify-center">
          <div className="text-center mb-8">
            <p className="body-md mb-1">{t.monthlyEmi}</p>
            <h3 className="display-lg text-on-primary drop-shadow-md">
              {formatCurrency(emi)}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MULTI-STEP SCHEME FINDER ---
// --- MULTI-STEP SCHEME FINDER ---
// --- MULTI-STEP SCHEME FINDER ---
// --- MULTI-STEP SCHEME FINDER ---
// --- MULTI-STEP SCHEME FINDER ---
const FindScheme = ({ lang }) => {
  const t = translations[lang] || translations.en;
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [discoveryMode, setDiscoveryMode] = useState("form"); // 'form' | 'ai-idea' | 'scan'
  const [verifiedNotice, setVerifiedNotice] = useState(null);

  // Expanded Data Model for the AI Engine
  const [formData, setFormData] = useState({
    purpose: "",
    age: "25",
    gender: "male",
    state: "Maharashtra",
    district: "Pune",
    area: "rural",
    amount: "100000",
    income: "200000",
    education: "edu2",
    skill: "unskilled",
    hasCaste: "yes",
    isDisabled: "no",
  });

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 h-full flex flex-col items-center">
      {/* Discovery Mode Selector Tabs */}
      <div className="w-full max-w-xl mb-8 bg-surface-container p-1.5 rounded-2xl flex border border-surface-container-high shadow-sm">
        <button
          type="button"
          onClick={() => setDiscoveryMode("form")}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            discoveryMode === "form"
              ? "bg-surface text-primary shadow-sm"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <FileText size={16} />
          <span>{t.tabQuestionnaire}</span>
        </button>

        <button
          type="button"
          onClick={() => setDiscoveryMode("scan")}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            discoveryMode === "scan"
              ? "bg-emerald-700 text-white shadow-sm"
              : "text-on-surface-variant hover:text-emerald-700"
          }`}
        >
          <ShieldCheck size={16} className={discoveryMode === "scan" ? "text-emerald-200" : "text-emerald-600"} />
          <span>Upload / Scan Document</span>
        </button>
      </div>

      {verifiedNotice && (
        <div className="w-full max-w-2xl mb-6 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
            <span className="font-medium">{verifiedNotice}</span>
          </div>
          <button
            onClick={() => setVerifiedNotice(null)}
            className="text-emerald-700 font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {(() => {
        if (discoveryMode === "scan") return (
        <div className="w-full max-w-4xl">
          <CertificateScanner
            lang={lang}
            onApplyExtractedData={(data) => {
              setFormData((prev) => ({
                ...prev,
                hasCaste: data.hasCaste || (data.caste === "SC" || data.caste === "OBC" ? "yes" : "no"),
                caste: data.caste || "SC",
                income: String(data.income || data.annualIncome || "140000"),
                turnover: String(data.turnover || data.annualTurnover || "1500000"),
                entity_type: data.entity_type || "individual",
                has_udyam: Boolean(data.has_udyam),
                providedDocuments: data.providedDocuments || ["caste_certificate"],
                age: "28",
              }));
              setVerifiedNotice(
                `Verified ${data.name || data.applicantName}'s document (${data.caste || "Category"}). Annual Income/Turnover pre-filled to ₹${Number(data.income || data.annualIncome || 140000).toLocaleString("en-IN")}.`,
              );
              setDiscoveryMode("form");
            }}
          />
        </div>
        );

        return (
        <>
          {/* Progress Header */}
          <div className="w-full max-w-3xl mb-8">
            <div className="flex justify-between items-center mb-2 relative">
              <button
                onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}
                className="absolute -left-16 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors flex items-center font-semibold text-sm hidden md:flex"
                title="Go Back"
              >
                <ChevronLeft size={20} /> {t.backBtn}
              </button>
              <span className="text-sm font-medium text-on-surface-variant uppercase tracking-wider">
                {t.step} {step} {t.of} 7
              </span>
              <span className="text-sm font-medium text-secondary">
                {t.tellUs}
              </span>
            </div>
            <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-container to-secondary rounded-full transition-all duration-500"
                style={{ width: `${(step / 7) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
            <div className="w-full flex flex-col gap-6">
              <div className="min-h-[400px]">
                {/* STEP 1: PURPOSE */}
                {step === 1 && (
                  <div className="animate-in fade-in duration-300">
                    <h3 className="text-3xl font-bold text-on-surface mb-8">
                      {t.qPurpose}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        {
                          id: "startBiz",
                          label: t.startBiz,
                          icon: <Landmark size={24} />,
                        },
                        {
                          id: "expBiz",
                          label: t.expBiz,
                          icon: <BrainCircuit size={24} />,
                        },
                        {
                          id: "purchaseEq",
                          label: t.purchaseEq,
                          icon: <MapPin size={24} />,
                        },
                        {
                          id: "workingCap",
                          label: t.workingCap,
                          icon: <ShieldCheck size={24} />,
                        },
                        {
                          id: "edu",
                          label: t.edu,
                          icon: <Calculator size={24} />,
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() =>
                            setFormData({ ...formData, purpose: opt.id })
                          }
                          className={`p-6 rounded-xl border flex flex-col items-start gap-4 transition-all text-left ${formData.purpose === opt.id ? "border-secondary bg-surface text-on-surface shadow-sm ring-1 ring-secondary" : "border-surface-container text-on-surface hover:border-outline-variant hover:bg-surface-container-lowest bg-surface-container-lowest shadow-sm"}`}
                        >
                          <div
                            className={`p-2 rounded-lg ${formData.purpose === opt.id ? "bg-secondary-fixed text-secondary" : "bg-surface-container text-on-surface-variant"}`}
                          >
                            {opt.icon}
                          </div>
                          <span className="font-semibold text-lg">
                            {opt.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: AGE & GENDER */}
                {step === 2 && (
                  <div className="animate-in fade-in duration-300">
                    <h3 className="text-3xl font-bold text-on-surface mb-8">
                      {t.qAge}
                    </h3>
                    <div className="mb-4 text-center display-lg text-primary">
                      {formData.age}
                    </div>
                    <input
                      type="range"
                      min="18"
                      max="65"
                      step="1"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                      className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-secondary mb-12"
                    />

                    <h3 className="text-3xl font-bold text-on-surface mb-8">
                      {t.gender}
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: "male", label: t.male },
                        { id: "female", label: t.female },
                        { id: "other", label: t.other },
                      ].map((g) => (
                        <button
                          key={g.id}
                          onClick={() =>
                            setFormData({ ...formData, gender: g.id })
                          }
                          className={`p-4 rounded-xl border flex justify-center items-center font-semibold transition-all ${formData.gender === g.id ? "border-secondary bg-surface text-on-surface shadow-sm ring-1 ring-secondary" : "border-surface-container text-on-surface hover:border-outline-variant hover:bg-surface-container-lowest bg-surface-container-lowest shadow-sm"}`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: LOCATION */}
                {step === 3 && (
                  <div className="animate-in fade-in duration-300">
                    <h3 className="text-3xl font-bold text-on-surface mb-8">
                      {t.qLoc}
                    </h3>

                    <label className="block label-md text-on-surface mb-2">
                      {t.state}
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                      className="form-input w-full p-4 text-on-surface mb-8 bg-surface-container-lowest shadow-sm"
                    >
                      <option value="Maharashtra">
                        {t.stateMaharashtra}
                      </option>
                      <option value="Delhi">
                        {t.stateDelhi}
                      </option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Gujarat">Gujarat</option>
                    </select>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { id: "rural", label: t.rural },
                        { id: "urban", label: t.urban },
                      ].map((a) => (
                        <button
                          key={a.id}
                          onClick={() =>
                            setFormData({ ...formData, area: a.id })
                          }
                          className={`p-6 rounded-xl border flex justify-center items-center font-semibold text-lg transition-all ${formData.area === a.id ? "border-secondary bg-surface text-on-surface shadow-sm ring-1 ring-secondary" : "border-surface-container text-on-surface hover:border-outline-variant hover:bg-surface-container-lowest bg-surface-container-lowest shadow-sm"}`}
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 4: AMOUNT */}
                {step === 4 && (
                  <div className="animate-in fade-in duration-300">
                    <h3 className="text-3xl font-bold text-on-surface mb-8">
                      {t.qAmt}
                    </h3>
                    <div className="mb-4 text-center display-lg text-primary">
                      ₹{" "}
                      {new Intl.NumberFormat(lang + "-IN", {
                        numberingSystem: t.numberingSystem,
                      }).format(formData.amount)}
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="5000000"
                      step="10000"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                      className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-secondary mb-8"
                    />
                  </div>
                )}

                {/* STEP 5: INCOME */}
                {step === 5 && (
                  <div className="animate-in fade-in duration-300">
                    <h3 className="text-3xl font-bold text-on-surface mb-8">
                      {t.qInc}
                    </h3>
                    <div className="mb-4 text-center display-lg text-primary">
                      ₹{" "}
                      {new Intl.NumberFormat(lang + "-IN", {
                        numberingSystem: t.numberingSystem,
                      }).format(formData.income)}
                    </div>
                    <input
                      type="range"
                      min="50000"
                      max="500000"
                      step="10000"
                      value={formData.income}
                      onChange={(e) =>
                        setFormData({ ...formData, income: e.target.value })
                      }
                      className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-secondary mb-8"
                    />
                  </div>
                )}

                {/* STEP 6: EDUCATION & SKILL */}
                {step === 6 && (
                  <div className="animate-in fade-in duration-300">
                    <h3 className="text-3xl font-bold text-on-surface mb-8">
                      {t.eduLabel}
                    </h3>
                    <select
                      value={formData.education}
                      onChange={(e) =>
                        setFormData({ ...formData, education: e.target.value })
                      }
                      className="form-input w-full p-4 text-on-surface mb-8 bg-surface-container-lowest shadow-sm"
                    >
                      <option value="edu1">{t.edu1}</option>
                      <option value="edu2">{t.edu2}</option>
                      <option value="edu3">{t.edu3}</option>
                    </select>

                    {formData.purpose !== "edu" && (
                      <>
                        <h3 className="text-3xl font-bold text-on-surface mb-8">
                          {t.qSkill}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {[
                            { id: "unskilled", label: t.unskilled },
                            { id: "skilled", label: t.skilled },
                            { id: "professional", label: t.professional },
                          ].map((s) => (
                            <button
                              key={s.id}
                              onClick={() =>
                                setFormData({ ...formData, skill: s.id })
                              }
                              className={`p-4 rounded-xl border flex justify-center items-center font-semibold text-center transition-all ${formData.skill === s.id ? "border-secondary bg-surface text-on-surface shadow-sm ring-1 ring-secondary" : "border-surface-container text-on-surface hover:border-outline-variant hover:bg-surface-container-lowest bg-surface-container-lowest shadow-sm"}`}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* STEP 7: DOCUMENTS / ELIGIBILITY */}
                {step === 7 && (
                  <div className="animate-in fade-in duration-300">
                    <h3 className="text-3xl font-bold text-on-surface mb-8">
                      {t.qDocs}
                    </h3>

                    <label className="block text-lg font-bold text-on-surface mb-4">
                      {t.hasCaste}
                    </label>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {[
                        { id: "yes", label: t.yes },
                        { id: "no", label: t.no },
                      ].map((ans) => (
                        <button
                          key={ans.id}
                          onClick={() =>
                            setFormData({ ...formData, hasCaste: ans.id })
                          }
                          className={`p-4 rounded-xl border font-semibold text-center transition-all ${formData.hasCaste === ans.id ? "border-secondary bg-surface text-on-surface shadow-sm ring-1 ring-secondary" : "border-surface-container text-on-surface hover:border-outline-variant hover:bg-surface-container-lowest bg-surface-container-lowest shadow-sm"}`}
                        >
                          {ans.label}
                        </button>
                      ))}
                    </div>

                    <label className="block text-lg font-bold text-on-surface mb-4">
                      {t.isDisabled}
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { id: "yes", label: t.yes },
                        { id: "no", label: t.no },
                      ].map((ans) => (
                        <button
                          key={ans.id}
                          onClick={() =>
                            setFormData({ ...formData, isDisabled: ans.id })
                          }
                          className={`p-4 rounded-xl border font-semibold text-center transition-all ${formData.isDisabled === ans.id ? "border-secondary bg-surface text-on-surface shadow-sm ring-1 ring-secondary" : "border-surface-container text-on-surface hover:border-outline-variant hover:bg-surface-container-lowest bg-surface-container-lowest shadow-sm"}`}
                        >
                          {ans.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-end items-center w-full mt-6">
                {step < 7 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    disabled={step === 1 && !formData.purpose}
                    className="px-6 py-3 rounded-lg bg-primary-container text-white font-medium hover:bg-primary transition-colors flex items-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50"
                  >
                    {t.continueBtn}
                    <ChevronRight size={20} />
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      navigate("/results", { state: { formData } })
                    }
                    className="px-6 py-3 rounded-lg bg-primary-container text-white font-medium hover:bg-primary transition-colors flex items-center gap-2 shadow-sm hover:shadow-md"
                  >
                    {t.matchBtn}
                    <ChevronRight size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
        );
      })()}
    </div>
  );
};

// --- RESULTS PAGE ---
const ResultsPage = ({ lang }) => {
  const t = translations[lang] || translations.en;
  const location = useLocation();
  const formData = location.state?.formData;
  const navigate = useNavigate();

  // SMART MATCHING ENGINE (AI / Rules-based)
  let engineMatches = formData ? matchSchemes(formData, allSchemesData, lang, t) : [];
  let isEligible = engineMatches.length > 0;
  let ineligibilityReason = "";
  if (!isEligible && formData) {
    ineligibilityReason = formData.hasCaste === "no" ? t.ineligNoCaste : t.ineligHighIncome;
  }

  const matchedSchemes = engineMatches;
  const topRawScheme = matchedSchemes[0];
  const topScheme = topRawScheme
    ? getLocalizedScheme(topRawScheme, lang)
    : null;

  // Mini EMI Calculator State
  const [loanAmt, setLoanAmt] = useState(formData?.amount || "300000");
  const [tenure, setTenure] = useState("5");
  const [dossierScheme, setDossierScheme] = useState(null);
  const [resultsMode, setResultsMode] = useState("schemes");

  const p = Number(loanAmt);
  const r = (topScheme?.calcInterest || 4) / 12 / 100;
  const emiMonths = Number(tenure) * 12;
  const emi =
    p > 0 && emiMonths > 0
      ? (p * r * Math.pow(1 + r, emiMonths)) / (Math.pow(1 + r, emiMonths) - 1)
      : 0;

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            {t.resultsTitle}
          </h1>
          {isEligible && matchedSchemes.length > 0 ? (
            <p className="text-lg text-on-surface-variant">{t.resultsSub}</p>
          ) : (
            <p className="text-lg text-red-600">{t.noMatchDesc}</p>
          )}
        </div>

        {isEligible && matchedSchemes.length > 0 && (
          <div className="flex items-center gap-3">
            <SpeakButton
              text={t.resultsVoiceText(
                matchedSchemes.length,
                topScheme?.name || "",
                topScheme?.maxAmount || topScheme?.amount || "",
                topScheme?.interest || "",
              )}
              lang={lang}
              label={t.resultsVoiceLabel}
            />
          </div>
        )}
      </div>

      {/* 3-View Switcher Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-slate-100/90 rounded-2xl w-fit border border-slate-200">
        <button
          type="button"
          onClick={() => setResultsMode("schemes")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            resultsMode === "schemes"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <FileText size={14} className="text-indigo-600" />
          <span>Matched Schemes ({matchedSchemes.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setResultsMode("stacker")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            resultsMode === "stacker"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Sparkles size={14} className="text-amber-500" />
          <span>Scheme Stacking & Convergence</span>
        </button>

        <button
          type="button"
          onClick={() => setResultsMode("simulator")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            resultsMode === "simulator"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Compass size={14} className="text-emerald-600" />
          <span>Path to Eligibility Simulator</span>
        </button>
      </div>

      {resultsMode === "stacker" && (
        <PolicyStackOptimizer
          applicant={formData}
          lang={lang}
          onSelectPolicy={() => {
            if (topScheme) setDossierScheme(topScheme);
          }}
        />
      )}

      {resultsMode === "simulator" && (
        <PathToEligibilitySimulator
          initialApplicant={formData}
          lang={lang}
          onApplyPath={(simData) => {
            navigate("/results", {
              state: {
                formData: {
                  ...formData,
                  ...simData,
                  providedDocuments: [
                    ...(formData?.providedDocuments || []),
                    "udyam_certificate",
                    "bank_statement",
                  ],
                },
              },
            });
            setResultsMode("schemes");
          }}
        />
      )}

      {resultsMode === "schemes" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Recommended Schemes */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {!isEligible && (
            <div className="p-8 bg-red-50 text-red-900 rounded-xl border border-red-200">
              <h3 className="text-2xl font-bold mb-4 text-red-800">
                {t.notEligibleTitle}
              </h3>
              <p className="text-lg mb-6">{ineligibilityReason}</p>
              <button
                onClick={() => navigate("/find")}
                className="btn-primary px-6 py-2.5 font-bold"
              >
                {t.editProfileBtn}
              </button>
            </div>
          )}
          {isEligible && matchedSchemes.length === 0 && (
            <div className="p-8 bg-surface-container rounded-xl border border-outline-variant">
              <h3 className="text-2xl font-bold mb-4">{t.noMatchTitle}</h3>
              <p className="text-lg mb-6">{t.noMatchDesc}</p>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => navigate("/find")}
                  className="btn-primary px-6 py-2.5 font-bold"
                >
                  {t.editProfileBtn}
                </button>
                <button
                  onClick={() => navigate("/explore")}
                  className="btn-ghost px-6 py-2.5 font-bold"
                >
                  {t.exploreSchemes}
                </button>
              </div>
            </div>
          )}
          {isEligible && matchedSchemes.length > 0 && (
            matchedSchemes.map((rawS, idx) => {
              const s = getLocalizedScheme(rawS, lang);
              const applicationAction = s.online_application_available ? (
                <a
                  href={s.official_application_portal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex-1 py-2.5 bg-green-50 hover:bg-green-100 text-green-800 border border-green-200 text-center font-bold"
                >
                  {t.applyOnlineBtn}
                </a>
              ) : (
                <button
                  onClick={() =>
                    navigate("/partners", {
                      state: { topSchemeId: s.id },
                    })
                  }
                  className="btn-ghost flex-1 py-2.5 bg-surface-container hover:bg-surface-container-high border border-outline-variant font-bold"
                >
                  <MapPin size={16} className="mr-2 inline" />{" "}
                  {t.findPartnerBtn}
                </button>
              );
              return (
                <div
                  key={rawS.id}
                  className={`card-ambient border bg-surface-container-lowest ${
                    rawS.triage_status === "BORDERLINE_MANUAL_REVIEW"
                      ? "border-amber-300 shadow-md"
                      : idx === 0
                      ? "border-secondary shadow-md"
                      : "border-surface-container"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {/* 3-State Triage Badge */}
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                            rawS.triage_status === "BORDERLINE_MANUAL_REVIEW"
                              ? "bg-amber-50 text-amber-800 border-amber-300"
                              : rawS.triage_status === "INELIGIBLE"
                              ? "bg-rose-50 text-rose-800 border-rose-300"
                              : "bg-emerald-50 text-emerald-800 border-emerald-300"
                          }`}
                        >
                          {rawS.triage_status === "BORDERLINE_MANUAL_REVIEW" && <AlertTriangle size={13} className="text-amber-600" />}
                          {rawS.triage_status === "INELIGIBLE" && <XCircle size={13} className="text-rose-600" />}
                          {(!rawS.triage_status || rawS.triage_status === "ELIGIBLE") && <CheckCircle2 size={13} className="text-emerald-600" />}
                          {rawS.triage_badge?.label || "Eligible"}
                        </span>

                        {rawS.policy_type && (
                          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[11px] font-semibold rounded-md border border-indigo-200 capitalize">
                            {rawS.policy_type.replace(/_/g, " ")}
                          </span>
                        )}

                        {s.online_application_available && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[11px] font-bold rounded-md">
                            {t.onlineApp}
                          </span>
                        )}
                      </div>

                      <h3 className="headline-md text-on-surface">{s.name}</h3>
                      <p className="text-on-surface-variant text-sm mt-1">
                        {s.desc}
                      </p>

                      {/* Statutory Legal Citation */}
                      {rawS.source_citation && (
                        <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                          <Scale size={13} className="text-indigo-600 flex-shrink-0" />
                          <span>Statutory Authority: <strong>{rawS.source_citation.authority}</strong> — <em>{rawS.source_citation.clause}</em></span>
                        </div>
                      )}
                    </div>

                    <div
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        rawS.triage_status === "BORDERLINE_MANUAL_REVIEW"
                          ? "bg-amber-100 text-amber-900 border-amber-300"
                          : idx === 0
                          ? "bg-secondary-fixed text-secondary border-secondary/30"
                          : "bg-surface-container text-on-surface border-outline"
                      }`}
                    >
                      <BrainCircuit size={12} className="inline mr-1" />{" "}
                      {s.matchScore}% {t.matchString}
                    </div>
                  </div>

                  {/* Benefit Estimate Highlight Banner */}
                  {rawS.benefit_estimate && (
                    <div className="mb-4 p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={18} className="text-emerald-700" />
                        <div>
                          <div className="text-xs text-emerald-800 font-semibold">{rawS.benefit_estimate.label}</div>
                          <div className="text-base font-black text-emerald-900">{rawS.benefit_estimate.formatted}</div>
                        </div>
                      </div>
                      <span className="text-[11px] text-emerald-700 font-medium hidden sm:inline">
                        Verified Non-Repayable / Savings Benefit
                      </span>
                    </div>
                  )}

                  {/* Missing Documents Alert */}
                  {rawS.document_analysis?.missing?.length > 0 && (
                    <div className="mb-4 p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                      <AlertTriangle size={15} className="text-amber-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Document Gap Detected (Action Required):</strong> Missing {rawS.document_analysis.missing.map(d => d.name).join(", ")}.
                      </div>
                    </div>
                  )}

                  {/* detailed match reason for top match */}
                  {s.why && (
                    <div className="mb-6 p-4 bg-surface-container-lowest border border-outline-variant rounded-lg">
                      <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                        {t.whyMatch}
                      </p>
                      <p className="text-sm text-on-surface flex items-start gap-2">
                        <ShieldCheck
                          size={16}
                          className="text-status-eligible flex-shrink-0 mt-0.5"
                        />
                        {s.why}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-surface-container-lowest p-3 rounded-lg border border-surface-container">
                      <p className="text-xs text-on-surface-variant mb-1 uppercase">
                        {t.maxLoanAmt}
                      </p>
                      <p className="font-bold text-on-surface">{s.amount}</p>
                    </div>
                    <div className="bg-surface-container-lowest p-3 rounded-lg border border-surface-container">
                      <p className="text-xs text-on-surface-variant mb-1 uppercase">
                        {t.interestRateLabel}
                      </p>
                      <p className="font-bold text-on-surface">
                        {s.interest || "Varies"}
                      </p>
                    </div>
                    {s.emi && (
                      <div className="bg-surface-container-lowest p-3 rounded-lg border border-surface-container">
                        <p className="text-xs text-on-surface-variant mb-1 uppercase">
                          {t.estEmi}
                        </p>
                        <p className="font-bold text-on-surface">{s.emi}</p>
                      </div>
                    )}
                    <div className="bg-surface-container-lowest p-3 rounded-lg border border-surface-container">
                      <p className="text-xs text-on-surface-variant mb-1 uppercase">
                        {t.interestRate}
                      </p>
                      <p className="font-bold text-on-surface">{s.interest}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {idx === 0 ? (
                      <>
                        <button
                          onClick={() => s.id && navigate(`/scheme/${s.id}`)}
                          className="btn-primary flex-1 py-2.5 font-bold"
                        >
                          {t.viewDetailsApply}
                        </button>
                        <button
                          type="button"
                          onClick={() => setDossierScheme(s)}
                          className="btn-ghost flex-1 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-center font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <FileText size={16} /> {t.dossierBtn}
                        </button>
                        {applicationAction}
                      </>
                    ) : (
                      <div className="flex items-center justify-between w-full">
                        <button
                          type="button"
                          onClick={() => setDossierScheme(s)}
                          className="text-xs font-bold text-blue-800 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <FileText size={14} /> {t.getDossierBtn}
                        </button>
                        <button
                          onClick={() => s.id && navigate(`/scheme/${s.id}`)}
                          className="text-secondary font-bold hover:underline flex items-center ml-auto"
                        >
                          {t.viewDetailsApply} <ChevronRight size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Side: Calculator & Guidance */}
        <aside className="lg:col-span-4 flex flex-col gap-6 mt-6 lg:mt-0">
          {/* Dark EMI Calculator Card */}
          <div className="bg-primary text-on-primary rounded-xl p-6 shadow-sm relative overflow-hidden">
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Calculator size={24} className="text-secondary-fixed" />
                <h3 className="text-lg font-bold">
                  {t.emiCalcTitle || "Estimated EMI Calculator"}
                </h3>
              </div>
              <p className="text-sm text-primary-container-light opacity-80 leading-relaxed">
                {t.emiCalcDesc ||
                  "Quickly see how different amounts affect your monthly payments based on typical scheme rates."}
              </p>

              <div className="bg-surface/10 rounded-lg p-4 mt-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-primary-container-light uppercase tracking-wider">
                    {t.loanAmt || "Loan Amount"}
                  </span>
                  <span className="font-bold">
                    ₹{new Intl.NumberFormat(lang + "-IN").format(loanAmt)}
                  </span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="5000000"
                  step="10000"
                  value={loanAmt}
                  onChange={(e) => setLoanAmt(e.target.value)}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-secondary-fixed"
                />
              </div>

              <div className="bg-surface/10 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-primary-container-light uppercase tracking-wider">
                    {t.tenure || "Tenure"}
                  </span>
                  <span className="font-bold">
                    {tenure} {t.years || "Years"}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-secondary-fixed"
                />
              </div>

              <div className="mt-2 flex justify-between items-end border-t border-white/20 pt-4">
                <span className="text-sm opacity-90">
                  {t.monthlyEmi || "Monthly EMI"}
                </span>
                <span className="text-3xl font-bold tracking-tight">
                  ₹
                  {new Intl.NumberFormat(lang + "-IN", {
                    maximumFractionDigits: 0,
                  }).format(emi)}
                </span>
              </div>

              <button
                onClick={() => navigate("/calculator")}
                className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors mt-2 text-center"
              >
                {t.adjustCalc || "Adjust Calculator"}
              </button>
            </div>
          </div>

          {/* Support Callout */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-ambient flex flex-col gap-3 border border-outline-variant/30">
            <div className="flex items-center gap-2 text-primary">
              <MessageCircle size={24} />
              <h3 className="text-lg font-bold">{t.needGuidanceTitle}</h3>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {t.needGuidanceDesc}
            </p>
            <button
              onClick={() => navigate("/partners")}
              className="text-secondary font-bold text-sm mt-2 flex items-center gap-1 hover:underline"
            >
              {t.findLocalPartner} <ChevronRight size={16} />
            </button>
          </div>
        </aside>
      </div>
      )}

      {dossierScheme && (
        <ApplicationDossier
          scheme={dossierScheme}
          userData={formData}
          lang={lang}
          onClose={() => setDossierScheme(null)}
        />
      )}
    </main>
  );
};

// --- EXPLORE SCHEMES PAGE ---
const ExploreSchemes = ({ lang }) => {
  const t = translations[lang] || translations.en;
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          {t.exploreTitle}
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl">
          {t.exploreSub}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allSchemesData.map((rawScheme) => {
          const scheme = getLocalizedScheme(rawScheme, lang);
          return (
            <div
              key={scheme.id}
              className="card-ambient border border-surface-container bg-surface-container-lowest rounded-xl p-6 flex flex-col hover:shadow-md transition-all duration-300"
            >
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-secondary-fixed text-secondary text-xs font-bold rounded-full">
                    {scheme.target}
                  </span>
                  {scheme.online_application_available && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                      {t.onlineApp}
                    </span>
                  )}
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                    {scheme.implementing_agency}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-2 leading-tight">
                  {scheme.name}
                </h3>
                <p className="text-sm text-on-surface-variant line-clamp-2">
                  {scheme.shortDesc}
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-surface-container grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">
                    {t.maxLoanAmt}
                  </p>
                  <p className="font-bold text-primary">{scheme.maxAmount}</p>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">
                    {t.interestRate}
                  </p>
                  <p className="font-bold text-primary">{scheme.interest}</p>
                </div>
              </div>

              <Link
                to={`/scheme/${scheme.id}`}
                className="w-full bg-primary-container text-primary font-bold py-2.5 rounded-lg text-center hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                {t.viewDetailsApply} <ChevronRight size={16} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SchemeDetails = ({ lang }) => {
  const t = translations[lang] || translations.en;
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDossier, setShowDossier] = useState(false);
  const rawScheme = allSchemesData.find((s) => s.id === id);
  const scheme = rawScheme ? getLocalizedScheme(rawScheme, lang) : null;

  if (!scheme) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-on-surface">
          {t.schemeNotFound}
        </h2>
        <button
          onClick={() => navigate("/explore")}
          className="mt-4 text-secondary hover:underline"
        >
          {t.backToExplore}
        </button>
      </div>
    );
  }

  const schemePartners = partners.filter(
    (p) => p.supported_schemes?.includes(scheme.id) && p.eligible,
  );
  const uniquePartnerNames = [
    ...new Set(schemePartners.map((p) => p.name)),
  ].join(", ");

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={() => navigate("/explore")}
        className="flex items-center text-sm font-bold text-on-surface-variant hover:text-primary mb-6 transition-colors"
      >
        <ChevronLeft size={16} className="mr-1" /> {t.backBtn}
      </button>

      <div className="card-ambient bg-surface-container-lowest border border-surface-container rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-primary p-8 text-on-primary">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full">
              {scheme.target}
            </span>
            <SpeakButton
              text={`${scheme.name}. ${scheme.shortDesc}. ${t.maxLoanAmt}: ${scheme.maxAmount}. ${t.interestRate}: ${scheme.interest}.`}
              lang={lang}
              label={t.listenScheme}
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{scheme.name}</h1>
          <p className="text-primary-container-light text-lg leading-relaxed max-w-2xl">
            {scheme.shortDesc}
          </p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/30">
              <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">
                {t.maxLoanAmt}
              </p>
              <p className="text-xl font-bold text-primary">
                {scheme.maxAmount}
              </p>
            </div>
            <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/30">
              <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">
                {t.interestRate}
              </p>
              <p className="text-xl font-bold text-primary">
                {scheme.interest}
              </p>
            </div>
            <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/30 flex items-center justify-center">
              <button
                onClick={() => navigate("/calculator")}
                className="text-secondary font-bold hover:underline flex items-center gap-1"
              >
                <Calculator size={16} /> {t.emiBtn}
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold text-on-surface mb-4 flex items-center gap-2">
                <ShieldCheck className="text-secondary" />{" "}
                {t.eligibilityCriteria}
              </h3>
              <ul className="space-y-3">
                {scheme.eligibility.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-on-surface"
                  >
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0"></div>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-on-surface mb-4 flex items-center gap-2">
                <Landmark className="text-secondary" /> {t.keyBenefits}
              </h3>
              <ul className="space-y-3">
                {scheme.benefits.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-on-surface"
                  >
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0"></div>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-surface-container-highest p-6 rounded-xl border border-outline-variant/30 mt-8">
              <h3 className="text-lg font-bold text-on-surface mb-4">
                {t.appProvenance}
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">
                    {t.appRoute}
                  </span>
                  <span className="text-on-surface">
                    {scheme.application_method}
                  </span>
                </div>
                {scheme.online_application_available ? (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">
                      {t.officialPortal}
                    </span>
                    <a
                      href={scheme.official_application_portal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:underline break-all"
                    >
                      {scheme.official_application_portal}
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">
                      {t.offlineApp}
                    </span>
                    <span className="text-on-surface">
                      {t.mustApplyChannel}{" "}
                      <span className="font-bold">
                        {uniquePartnerNames || scheme.implementing_agency}
                      </span>
                    </span>
                  </div>
                )}
                <div className="flex flex-col gap-1 pt-4 border-t border-outline-variant/30">
                  <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">
                    {t.dataSource}
                  </span>
                  <a
                    href={scheme.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:underline break-all"
                  >
                    {scheme.source_url}
                  </a>
                  <span className="text-xs text-on-surface-variant mt-1">
                    {t.statusVerified} | {t.lastVerified}:{" "}
                    {new Date(scheme.last_verified_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-10 pt-8 border-t border-surface-container flex flex-col sm:flex-row gap-4 items-center justify-between">
            <button
              type="button"
              onClick={() => setShowDossier(true)}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-on-primary font-bold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <FileText size={18} /> {t.downloadDossier}
            </button>
            <button
              onClick={() => navigate("/partners")}
              className="w-full sm:w-auto bg-secondary text-white font-bold px-8 py-3 rounded-xl hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              {t.findPartnerBtn} <MapPin size={18} />
            </button>
          </div>
        </div>
      </div>

      {showDossier && (
        <ApplicationDossier
          scheme={scheme}
          userData={{
            income: "200000",
            purpose: scheme.business_eligibility ? "biz" : "edu",
            age: 28,
          }}
          lang={lang}
          onClose={() => setShowDossier(false)}
        />
      )}
    </div>
  );
};

// --- PARTNERS MAP PAGE ---
const PartnersPage = ({ lang }) => {
  const t = translations[lang] || translations.en;
  const [searchTerm, setSearchTerm] = useState("");
  const [userLoc] = useState(null);
  const [eligibleOnly, setEligibleOnly] = useState(true);
  const [partnerType, setPartnerType] = useState("");

  const filteredPartners = partners
    .filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.type.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((p) => (eligibleOnly ? p.eligible : true))
    .filter((p) =>
      partnerType === "" ? true : p.partner_type === partnerType,
    );

  return (
    <div className="max-w-7xl mx-auto h-[85vh] flex flex-col animate-in fade-in duration-500">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="headline-lg text-primary">
            {t.partnerLocatorTitle}
          </h2>
          <p className="body-lg text-on-surface-variant mt-1">
            {t.partnerLocatorSub}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-full rounded-2xl shadow-ambient overflow-hidden border border-surface-container bg-surface">
        {/* Left Side: Smart Partner List */}
        <div className="w-full md:w-[400px] flex flex-col bg-surface border-r border-surface-container z-10">
          <div className="p-4 border-b border-surface-container bg-surface-container-lowest space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-on-surface text-sm flex items-center gap-2">
                <ShieldCheck size={16} className="text-secondary" />{" "}
                {t.eligibleForScheme}
              </span>
              <button
                role="switch"
                aria-checked={eligibleOnly}
                aria-label={
                  t.showOnlyEligible
                }
                onClick={() => setEligibleOnly(!eligibleOnly)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${eligibleOnly ? "bg-secondary" : "bg-surface-container-high"}`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute transition-transform ${eligibleOnly ? "translate-x-7" : "translate-x-1"}`}
                ></div>
              </button>
            </div>
          </div>

          <div className="overflow-y-auto flex-grow p-4 space-y-4 bg-surface-container-lowest/50">
            <h3 className="text-xs font-bold text-on-surface-variant tracking-wider uppercase mb-2">
              {filteredPartners.length}{" "}
              {t.eligiblePartnersNear}
            </h3>

            {filteredPartners.length === 0 ? (
              <div className="p-6 text-center text-on-surface-variant bg-surface rounded-xl border border-dashed border-outline-variant my-4">
                <p className="text-sm font-medium">{t.noPartnersFound}</p>
              </div>
            ) : (
              filteredPartners.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-xl border border-surface-container bg-surface shadow-sm hover:border-outline-variant transition-colors"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-on-surface text-lg">
                      {p.name}
                    </h4>
                    <span className="bg-surface-container px-2 py-0.5 rounded text-xs font-medium text-on-surface-variant flex items-center gap-1">
                      <MapPin size={10} /> {p.dist}
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant mb-3">{p.type}</p>

                  <div className="mb-4">
                    <span
                      className={`inline-flex items-center text-xs font-bold px-2 py-1 rounded-md ${p.eligible ? "bg-secondary-fixed text-secondary" : "bg-surface-container-high text-on-surface-variant"}`}
                    >
                      {p.eligible ? (
                        <ShieldCheck size={12} className="mr-1" />
                      ) : null}
                      {p.badge}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        alert(
                          t.offlineApplyAlert(p.name),
                        )
                      }
                      className="btn-primary flex-1 py-2 text-sm text-center"
                    >
                      {t.offlineApplicationBtn}
                    </button>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost flex-1 py-2 text-sm border border-outline-variant hover:bg-surface-container text-center flex items-center justify-center no-underline"
                    >
                      {t.getDirections}
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Map */}
        <div className="w-full flex-grow bg-surface-container-lowest relative z-0">
          <div className="absolute top-4 left-4 right-4 z-[400] flex gap-2">
            <div className="relative flex-grow shadow-md">
              <Search
                className="absolute left-3 top-3 text-on-surface-variant"
                size={18}
              />
              <input
                type="text"
                aria-label={t.searchByLocOrName}
                placeholder={t.searchByLocOrName}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface rounded-lg border-none focus:ring-2 focus:ring-secondary text-sm font-medium"
              />
            </div>
            <select
              aria-label={t.bankAll}
              value={partnerType}
              onChange={(e) => setPartnerType(e.target.value)}
              className="bg-surface px-4 py-2.5 rounded-lg shadow-md text-sm font-bold text-on-surface-variant flex items-center border-none focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
            >
              <option value="">{t.bankAll}</option>
              <option value="Public Sector Bank">{t.bankPublic}</option>
              <option value="Private Sector Bank">{t.bankPrivate}</option>
              <option value="Regional Rural Bank">{t.bankRural}</option>
            </select>
          </div>

          {/* We use a 'key' here so the map instantly recenters if the user clicks Find My Location */}
          <MapContainer
            key={userLoc ? userLoc.join(",") : "default"}
            center={userLoc || [18.5204, 73.8567]}
            zoom={userLoc ? 12 : 12}
            style={{ height: "100%", width: "100%", zIndex: 0 }}
            zoomControl={false}
          >
            <ZoomControl position="bottomright" />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Blue pin for User's real location */}
            {userLoc && (
              <Marker position={userLoc}>
                <Popup>
                  <strong>
                    {t.youAreHere}
                  </strong>
                </Popup>
              </Marker>
            )}

            {/* Pins for Channel Partners */}
            {filteredPartners.map((p) => (
              <Marker key={p.id} position={[p.lat, p.lng]}>
                <Popup>
                  <strong className="text-sm">{p.name}</strong>
                  <br />
                  <span className="text-xs text-gray-600">
                    {p.type} • {p.dist}
                  </span>
                  <br />
                  <br />
                  {p.eligible ? t.acceptingApps : t.generalLoansOnly}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

// --- ABOUT PAGE ---
const AboutPage = ({ lang }) => {
  const t = translations[lang] || translations.en;
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-500">
      <h2 className="display-md text-primary mb-6 text-center">
        {t.aboutTitle}
      </h2>
      <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-surface-container space-y-6">
        <p className="body-lg text-on-surface">
          {t.aboutDesc1}
        </p>
        <p className="body-lg text-on-surface">
          {t.aboutDesc2}
        </p>
        <div className="mt-8 pt-8 border-t border-surface-container">
          <h3 className="headline-sm text-secondary mb-4">
            {t.ourMissionTitle}
          </h3>
          <p className="body-md text-on-surface-variant mb-6">
            {t.ourMissionDesc}
          </p>

          <div className="bg-primary-container/20 border border-primary-container/30 p-4 rounded-lg">
            <h4 className="font-bold text-primary mb-2">
              National Policy Engine @2026
            </h4>
            <p className="text-sm text-on-surface-variant">
              {t.aboutDisclaimer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- CONTACT PAGE ---
const ContactPage = ({ lang }) => {
  const t = translations[lang] || translations.en;
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-500">
      <h2 className="display-md text-primary mb-6 text-center">
        {t.reachOutTitle}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-surface-container">
          <h3 className="headline-sm text-on-surface mb-6">
            {t.contactInfoTitle}
          </h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary-container text-on-primary-container rounded-full">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-on-surface">
                  {t.refOfficeTitle}
                </h4>
                <p className="text-on-surface-variant mt-1">
                  Ministry of Social Justice & Empowerment
                  <br />
                  Shastri Bhawan, New Delhi - 110001
                </p>
                <p className="text-xs text-on-surface-variant mt-1 italic">
                  {t.refOfficeNote}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary-container text-on-secondary-container rounded-full">
                <MessageCircle size={24} />
              </div>
              <div>
                <h4 className="font-bold text-on-surface">
                  {t.navContact}
                </h4>
                <p className="text-on-surface-variant mt-1">
                  {t.contactEmail}
                </p>
                <p className="text-xs text-on-surface-variant mt-1 italic">
                  {t.contactSihProto}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-surface-container">
          <h3 className="headline-sm text-on-surface mb-6">
            {t.sendUsMessage}
          </h3>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                t.messageSentAlert,
              );
            }}
          >
            <div>
              <label htmlFor="contact-form-name" className="block label-md text-on-surface mb-1">
                {t.formName}
              </label>
              <input
                id="contact-form-name"
                name="name"
                type="text"
                required
                className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label htmlFor="contact-form-email" className="block label-md text-on-surface mb-1">
                {t.formEmail}
              </label>
              <input
                id="contact-form-email"
                name="email"
                type="email"
                required
                className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label htmlFor="contact-form-message" className="block label-md text-on-surface mb-1">
                {t.formMessage}
              </label>
              <textarea
                id="contact-form-message"
                name="message"
                required
                rows="4"
                className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              ></textarea>
            </div>
            <button type="submit" className="w-full btn-primary py-3">
              {t.formSubmit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- KNOWLEDGE ASSISTANT RESPONSE ENGINE ---
const getSchemeAssistantResponse = (query, lang) => {
  const q = (query || "").toLowerCase();

  // Hindi responses
  if (lang === "hi") {
    if (q.includes("tax") || q.includes("कर") || q.includes("टैक्स") || q.includes("80jjaa") || q.includes("44ad") || q.includes("deduction")) {
      return "छोटे व्यवसायों और एमएसएमई के लिए मुख्य कर छूट योजनाएं:\n1. धारा 44AD अनुमानित कराधान: ₹3 करोड़ तक के टर्नओवर पर बिना ऑडिट के 6% (डिजिटल) या 8% लाभ घोषित करने की छूट।\n2. धारा 80JJAA: नए कर्मचारियों के वेतन पर 3 साल तक 30% अतिरिक्त टैक्स छूट।";
    }
    if (q.includes("दस्तावेज़") || q.includes("कागजात") || q.includes("document") || q.includes("doc")) {
      return "आवेदन के लिए आवश्यक मुख्य दस्तावेज़:\n1. आधार कार्ड और पैन कार्ड,\n2. आय प्रमाण पत्र / ITR-4 / फॉर्म 16,\n3. एमएसएमई उद्यम पंजीकरण (व्यापारियों के लिए),\n4. जाति प्रमाण पत्र (संबद्ध योजनाओं हेतु), और\n5. बैंक स्टेटमेंट। आप 'Upload / Scan Document' टैब पर प्रमाणपत्र अपलोड करके तत्काल डेटा निकाल सकते हैं।";
    }
    if (q.includes("msme") || q.includes("व्यापार") || q.includes("दुकान") || q.includes("business") || q.includes("cgtmse") || q.includes("pmegp")) {
      return "सूक्ष्म एवं लघु उद्यमों के लिए प्रमुख योजनाएं:\n1. PMEGP: 15% से 35% गैर-वापसी योग्य पूंजीगत सब्सिडी।\n2. CGTMSE: ₹5 करोड़ तक का बिना किसी जमानत (Collateral-Free) का बैंक ऋण गारंटी कवर।\n3. PM SVANidhi: रेहड़ी-पटरी विक्रेताओं के लिए ₹50,000 तक का कार्यशील पूंजी ऋण एवं 7% ब्याज सब्सिडी।";
    }
    if (q.includes("borderline") || q.includes("गारंटी") || q.includes("पक्का") || q.includes("स्वीकृत") || q.includes("approve") || q.includes("manual")) {
      return "⚠️ ध्यान दें: वित्तीय नीतियों की पात्रता वैधानिक नियमों पर आधारित होती है। यदि आपकी पारिवारिक आय सीमा के 10% के भीतर है या स्व-प्रमाणित दस्तावेज हैं, तो सिस्टम इसे 'मैनुअल समीक्षा आवश्यक (Borderline Review)' के रूप में चिह्नित करता है। नोडल अधिकारी भौतिक सत्यापन के बाद ही अंतिम स्वीकृति देते हैं।";
    }
    if (q.includes("महिला") || q.includes("aurat") || q.includes("women") || q.includes("msy")) {
      return "महिला उद्यमियों के लिए 'महिला समृद्धि योजना (MSY)' में ₹1.40 लाख तक का ऋण केवल 4% वार्षिक ब्याज पर मिलता है। इसके अतिरिक्त स्टैंड-अप इंडिया में ₹10 लाख से ₹1 करोड़ तक का संपार्श्विक-मुक्त ऋण उपलब्ध है।";
    }
    if (q.includes("कारीगर") || q.includes("artisan") || q.includes("vishwakarma") || q.includes("ssy")) {
      return "पारंपरिक कारीगरों के लिए 'PM विश्वकर्मा' एवं 'शिल्पी समृद्धि योजना (SSY)' के तहत ₹15,000 टूलकिट प्रोत्साहन एवं 5% रियायती ब्याज दर पर ऋण उपलब्ध है।";
    }
    if (q.includes("पात्रता") || q.includes("eligible") || q.includes("eligibility") || q.includes("income")) {
      return "पात्रता 5 मुख्य कारकों पर निर्भर करती है: आयु (18-65 वर्ष), वार्षिक पारिवारिक आय / टर्नओवर, सामाजिक श्रेणी, व्यवसाय प्रकार (व्यक्तिगत/MSME), और वैध दस्तावेज़। 'Find Schemes' पर जाकर या 'Evaluation Bench' पर अपनी पात्रता जांचें।";
    }
    if (q.includes("ब्याज") || q.includes("emi") || q.includes("rate") || q.includes("calculator")) {
      return "सरकारी योजनाओं में ब्याज दरें 4% से 8% प्रति वर्ष के बीच होती हैं। साथ ही 6 से 12 महीने का मोरेटोरियम (Grace Period) और 15%-35% तक की पूंजीगत सब्सिडी मिलती है।";
    }
    if (q.includes("नमस्ते") || q.includes("hello") || q.includes("hi") || q.includes("help") || q.includes("मदद")) {
      return "नमस्ते! मैं Samarth AI नीति सहायक हूँ। मैं आपको सरकारी ऋण योजनाओं, पूंजी सब्सिडी, कर कटौती (Tax Deductions जैसे 44AD / 80JJAA), पात्रता नियमों और आवश्यक दस्तावेजों में सहायता कर सकता हूँ।";
    }
    return "Samarth वित्तीय नीतियों, सब्सिडी और कर छूटों की खोज में सहायता करता है। आप 'Find Schemes' टैब से तुरंत अपनी पात्रता जांच सकते हैं और आधिकारिक बैंक डोजियर डाउनलोड कर सकते हैं।";
  }

  // English & Default responses
  if (q.includes("tax") || q.includes("deduction") || q.includes("80jjaa") || q.includes("44ad") || q.includes("exemption") || q.includes("itr")) {
    return "Key Tax Deductions & Relief Schemes for Small Businesses:\n1. Section 44AD Presumptive Taxation: Exempts small enterprises with turnover up to ₹3 Crore from maintaining audited books; declare deemed profit at just 6% (digital) or 8%.\n2. Section 80JJAA Employment Deduction: 30% additional tax deduction on new employee emoluments for 3 consecutive assessment years.\n3. Section 44ADA: 50% presumptive profit taxation for eligible professionals.";
  }
  if (q.includes("msme") || q.includes("business") || q.includes("cgtmse") || q.includes("pmegp") || q.includes("subsidy") || q.includes("enterprise") || q.includes("shop")) {
    return "Flagship Schemes for Small Businesses & MSMEs:\n1. PMEGP Capital Subsidy: 15% to 35% non-repayable government subsidy for new manufacturing (up to ₹50L) and service (up to ₹20L) projects.\n2. CGTMSE Guarantee: Collateral-free credit facility up to ₹5 Crore with 75%–85% sovereign guarantee cover.\n3. PM SVANidhi: Micro-credit up to ₹50,000 for vendors with 7% annual interest subsidy and monthly digital cashbacks.";
  }
  if (q.includes("borderline") || q.includes("guarantee") || q.includes("sure") || q.includes("approve") || q.includes("manual") || q.includes("review")) {
    return "⚠️ Statutory Triage Notice: This assistant does not give false-confident yes/no decisions. When your income or turnover is within 10% of statutory ceilings, or when documentation relies on unverified self-declaration, your application is classified as 'Borderline / Manual Review Required' for human nodal officer verification.";
  }
  if (q.includes("document") || q.includes("doc") || q.includes("paper") || q.includes("certificate") || q.includes("proof") || q.includes("upload")) {
    return "Mandatory Verification Documents:\n1. Identity & Address Proof: Aadhaar Card / PAN Card,\n2. Financial Proof: Income Certificate / Form 16 / ITR-4 Ack,\n3. Business Proof: MSME Udyam Certificate / GST Returns (GSTR-3B),\n4. Category Proof: Caste Certificate (where applicable),\n5. Bank Details: 6-month bank statement / passbook. You can upload these in the 'Upload / Scan Document' tab for instant OCR field extraction.";
  }
  if (q.includes("women") || q.includes("female") || q.includes("msy") || q.includes("mahila")) {
    return "Special Provisions for Women Entrepreneurs:\n1. Mahila Samriddhi Yojana (MSY): Concessional loans up to ₹1,40,000 at 4% p.a. (3.5% with timely rebate).\n2. Stand-Up India: Collateral-free credit from ₹10 Lakhs to ₹1 Crore for greenfield enterprises.\n3. PMEGP: Receives maximum 35% special category subsidy.";
  }
  if (q.includes("artisan") || q.includes("craft") || q.includes("vishwakarma") || q.includes("ssy")) {
    return "Artisan & Traditional Craftsmen Programs:\n1. PM Vishwakarma: ₹15,000 toolkit incentive, 5% collateral-free credit, and skill stipend.\n2. Shilpi Samriddhi Yojana (SSY): Micro-loans up to ₹1,40,000 at 5% p.a. for raw materials and modern tools.";
  }
  if (q.includes("eligible") || q.includes("eligibility") || q.includes("criteria") || q.includes("income") || q.includes("qualify")) {
    return "Verified Eligibility Factors:\n1. Age: 18 to 65 years,\n2. Financial Metric: Income / turnover within scheme limits,\n3. Target Group: Individual / MSME / Woman / SC / OBC / General,\n4. Documentation: Verified government certificates on file. Use the 'Find Schemes' questionnaire or 'Evaluation Bench' to see exact rule clause determinations.";
  }
  if (q.includes("interest") || q.includes("emi") || q.includes("rate") || q.includes("calculator")) {
    return "Government schemes feature deeply concessional interest rates (3.5% to 8% p.a.) compared to commercial bank rates (11%–15%), along with 6–12 months moratorium periods. You can compute exact payments on our 'Loan & Subsidy Calculator' page.";
  }
  if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("help")) {
    return "Hello! I am Samarth AI, your Financial Policy Discovery & Application Assistant. I can help you find government subsidies, tax deductions (Sec 44AD / 80JJAA), collateral-free credit guarantees, check statutory eligibility rules, and generate bank application dossiers. What assistance do you need today?";
  }
  return "Samarth helps individuals and small businesses discover verified government subsidies, tax deductions, and concessional credit programs. You can use 'Find Schemes' to check eligibility or explore the 'Evaluation Bench' for 3-state test benchmarks.";
};

// --- AI CHATBOT COMPONENT ---
const AIChatbot = ({ lang }) => {
  const t = translations[lang] || translations.en;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            id: "msg-initial",
            role: "model",
            content: t.botGreeting || "Hello! I am Samarth AI. How can I help you understand government financial schemes today?",
          },
        ]);
      }, 0);
    }
  }, [isOpen, lang, messages.length, t.botGreeting]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: `msg-user-${Date.now()}`, role: "user", content: userMessage },
    ]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (
        apiKey &&
        apiKey !== "your_gemini_api_key_here" &&
        !apiKey.includes("your_") &&
        apiKey.length > 20
      ) {
        try {
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction:
              "You are Samarth AI, an expert, helpful assistant for citizens and entrepreneurs in India. You help users understand central and state government financial schemes, grants, subsidies, and loans from public welfare bodies and partner banks. Provide direct, friendly answers in plain text without markdown formatting.",
          });

          const contents = [];
          if (messages.length > 0 && messages[0].role === "model") {
            contents.push({ role: "user", parts: [{ text: "Hello" }] });
          }
          messages.forEach((m) => {
            contents.push({ role: m.role, parts: [{ text: m.content }] });
          });
          contents.push({ role: "user", parts: [{ text: userMessage }] });

          const result = await model.generateContent({ contents });
          const text = result.response.text();
          if (text && text.trim()) {
            setMessages((prev) => [
              ...prev,
              { id: `msg-model-${Date.now()}`, role: "model", content: text.trim() },
            ]);
            return;
          }
        } catch (apiErr) {
          console.warn("Gemini API call failed, falling back to local policy engine:", apiErr);
        }
      }

      // Intelligent Domain Policy Assistant (Offline / Instant fallback)
      const assistantReply = getSchemeAssistantResponse(userMessage, lang);
      setMessages((prev) => [
        ...prev,
        { id: `msg-model-${Date.now()}`, role: "model", content: assistantReply },
      ]);
    } catch (error) {
      console.error(error);
      const fallbackReply = getSchemeAssistantResponse(userMessage, lang);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-fallback-${Date.now()}`,
          role: "model",
          content: fallbackReply,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Assistant"
        className={`fixed bottom-6 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-50 ${isOpen ? "hidden" : "block"}`}
      >
        <Bot size={28} />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] max-h-[80vh] bg-surface border border-surface-container shadow-xl rounded-2xl flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-primary p-4 text-on-primary flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-bold">Samarth AI</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="hover:bg-primary-container/20 p-1 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-grow p-4 overflow-y-auto bg-surface-container-lowest space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${m.role === "user" ? "bg-secondary text-on-secondary rounded-br-none" : "bg-surface-container text-on-surface rounded-bl-none"}`}
                >
                  <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                  {m.role === "model" && (
                    <div className="mt-2 flex justify-end">
                      <SpeakButton
                        text={m.content}
                        lang={lang}
                        label=""
                        className="!py-0.5 !px-1.5 !text-[10px] !bg-surface-container-high"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-surface-container text-on-surface max-w-[80%] p-3 rounded-2xl rounded-bl-none flex gap-1">
                  <div
                    className="w-2 h-2 rounded-full bg-on-surface-variant animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-on-surface-variant animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-on-surface-variant animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSend}
            className="p-3 bg-surface border-t border-surface-container flex items-center gap-2"
          >
            <input
              type="text"
              aria-label={t.botPlaceholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.botPlaceholder}
              className="flex-grow bg-surface-container-lowest border border-outline-variant rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <VoiceInputButton
              lang={lang}
              onTranscript={(transcript) => {
                setInput((prev) =>
                  prev ? `${prev} ${transcript}` : transcript,
                );
              }}
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 shrink-0 rounded-full bg-primary text-on-primary flex items-center justify-center disabled:opacity-50 hover:bg-primary/90 transition-colors cursor-pointer"
            >
              <Send size={16} className="-ml-0.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

// --- PRIVACY NOTICE PAGE ---
const PrivacyPage = ({ lang }) => {
  const t = translations[lang] || translations.en;
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-500">
      <h2 className="display-md text-primary mb-6">
        {t.privacyTitle}
      </h2>
      <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-surface-container space-y-6">
        <p className="body-lg text-on-surface">
          {t.privacyIntro}
        </p>
        <div>
          <h3 className="headline-sm text-on-surface mb-3">
            {t.privacyCollectTitle}
          </h3>
          <ul className="list-disc list-inside space-y-2 text-on-surface-variant body-md">
            <li>
              {t.privacyCollect1}
            </li>
            <li>
              {t.privacyCollect2}
            </li>
            <li>
              {t.privacyCollect3}
            </li>
          </ul>
        </div>
        <div>
          <h3 className="headline-sm text-on-surface mb-3">
            {t.privacyStorageTitle}
          </h3>
          <p className="body-md text-on-surface-variant">
            {t.privacyStorageDesc}
          </p>
        </div>
        <div>
          <h3 className="headline-sm text-on-surface mb-3">
            {t.privacyThirdTitle}
          </h3>
          <ul className="list-disc list-inside space-y-2 text-on-surface-variant body-md">
            <li>
              {t.privacyThird1}
            </li>
            <li>
              {t.privacyThird2}
            </li>
            <li>
              {t.privacyThird3}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- OPTIMIZER & CONVERGENCE PAGE ---
const OptimizerPage = ({ lang }) => {
  const [activeTab, setActiveTab] = useState("stacker");
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab("stacker")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "stacker"
                ? "bg-indigo-700 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Sparkles size={15} className={activeTab === "stacker" ? "text-amber-400" : "text-amber-500"} />
            <span>Scheme Stacking & Convergence</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("simulator")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "simulator"
                ? "bg-indigo-700 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Compass size={15} className={activeTab === "simulator" ? "text-emerald-300" : "text-emerald-600"} />
            <span>Path to Eligibility Simulator</span>
          </button>
        </div>
      </div>

      {activeTab === "stacker" ? (
        <PolicyStackOptimizer lang={lang} />
      ) : (
        <PathToEligibilitySimulator lang={lang} />
      )}
    </div>
  );
};

// --- NAVBAR COMPONENT ---
const Navbar = ({ lang, setLang, t, mobileMenuOpen, setMobileMenuOpen }) => (
  <nav className="bg-surface/80 backdrop-blur-md shadow-sm border-b border-surface-container sticky top-0 z-50 transition-all">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 sm:h-20">
        <div className="flex items-center">
          <Link
            to="/"
            className="flex items-center text-primary font-extrabold text-2xl sm:text-3xl tracking-tight"
          >
            <Landmark className="mr-2 text-primary" size={28} />
            Samarth
          </Link>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hidden lg:block font-semibold transition-colors text-sm ${isActive ? "text-secondary underline underline-offset-8 decoration-2" : "text-on-surface hover:text-secondary"}`
            }
          >
            {t.navHome}
          </NavLink>
          <NavLink
            to="/find"
            className={({ isActive }) =>
              `hidden sm:block font-semibold transition-colors text-sm ${isActive ? "text-secondary underline underline-offset-8 decoration-2" : "text-on-surface hover:text-secondary"}`
            }
          >
            {t.navFind}
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `hidden lg:block font-semibold transition-colors text-sm ${isActive ? "text-secondary underline underline-offset-8 decoration-2" : "text-on-surface hover:text-secondary"}`
            }
          >
            {t.exploreSchemes}
          </NavLink>
          <NavLink
            to="/calculator"
            className={({ isActive }) =>
              `hidden sm:block font-semibold transition-colors text-sm ${isActive ? "text-secondary underline underline-offset-8 decoration-2" : "text-on-surface hover:text-secondary"}`
            }
          >
            {t.emiBtn}
          </NavLink>
          <NavLink
            to="/partners"
            className={({ isActive }) =>
              `hidden md:flex font-semibold items-center text-sm px-3.5 py-1.5 rounded-lg transition-colors text-on-secondary-fixed bg-secondary-fixed hover:bg-secondary-fixed-dim ${isActive ? "ring-2 ring-primary ring-offset-2" : ""}`
            }
          >
            <MapPin className="mr-1.5" size={16} /> {t.navLocate}
          </NavLink>
          <NavLink
            to="/testbench"
            className={({ isActive }) =>
              `hidden sm:flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-lg border text-xs transition-all shadow-sm ${
                isActive
                  ? "bg-indigo-900 text-white border-indigo-900 shadow-md ring-2 ring-indigo-400"
                  : "bg-indigo-50 text-indigo-800 border-indigo-200 hover:bg-indigo-100"
              }`
            }
            title="Statutory Policy Evaluation Bench (3-State Triage & Test Scenarios)"
          >
            <Scale size={14} className="text-indigo-600" />
            <span>⚖️ Evaluation Bench</span>
          </NavLink>

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            aria-label="Select language"
            className="ml-2 sm:ml-3 bg-surface border border-surface-container text-on-surface font-bold py-1.5 px-2 sm:px-3 rounded-lg focus:outline-none focus:border-secondary text-xs sm:text-sm"
          >
            <option value="en">EN</option>
            <option value="hi">हि</option>
            <option value="as">অस</option>
          </select>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile navigation panel */}
    {mobileMenuOpen && (
      <div className="sm:hidden border-t border-surface-container bg-surface animate-in slide-in-from-top-2 duration-200">
        <div className="px-4 py-3 space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-3 py-2.5 rounded-lg font-semibold text-sm ${isActive ? "bg-secondary-fixed text-secondary" : "text-on-surface hover:bg-surface-container"}`
            }
          >
            {t.navHome}
          </NavLink>
          <NavLink
            to="/find"
            className={({ isActive }) =>
              `block px-3 py-2.5 rounded-lg font-semibold text-sm ${isActive ? "bg-secondary-fixed text-secondary" : "text-on-surface hover:bg-surface-container"}`
            }
          >
            {t.navFind}
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `block px-3 py-2.5 rounded-lg font-semibold text-sm ${isActive ? "bg-secondary-fixed text-secondary" : "text-on-surface hover:bg-surface-container"}`
            }
          >
            {t.exploreSchemes}
          </NavLink>
          <NavLink
            to="/calculator"
            className={({ isActive }) =>
              `block px-3 py-2.5 rounded-lg font-semibold text-sm ${isActive ? "bg-secondary-fixed text-secondary" : "text-on-surface hover:bg-surface-container"}`
            }
          >
            {t.emiBtn}
          </NavLink>
          <NavLink
            to="/partners"
            className={({ isActive }) =>
              `block px-3 py-2.5 rounded-lg font-semibold text-sm ${isActive ? "bg-secondary-fixed text-secondary" : "text-on-surface hover:bg-surface-container"}`
            }
          >
            {t.navLocate}
          </NavLink>
          <NavLink
            to="/testbench"
            className={({ isActive }) =>
              `block px-3 py-2.5 rounded-lg font-bold text-sm ${isActive ? "bg-indigo-900 text-white" : "bg-indigo-50 text-indigo-800 hover:bg-indigo-100"}`
            }
          >
            ⚖️ Evaluation Test Bench (3-State Triage)
          </NavLink>
        </div>
      </div>
    )}
  </nav>
);

// --- FOOTER COMPONENT ---
const Footer = ({ t }) => (
  <footer className="bg-primary text-on-primary mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Landmark size={22} />
            <span className="font-bold text-lg">Samarth</span>
          </div>
          <p className="text-sm opacity-80 leading-relaxed">
            {t.footerTagline}
          </p>
          <p className="text-xs opacity-60 mt-2">
            AI Policy Discovery & Eligibility Assistant @2026
          </p>
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-3 ">
            {t.footerLinks}
          </h4>
          <div className="flex flex-col gap-2">
            <Link
              to="/find"
              className="text-sm opacity-80 hover:opacity-100 transition-opacity"
            >
              {t.navFind}
            </Link>
            <Link
              to="/explore"
              className="text-sm opacity-80 hover:opacity-100 transition-opacity"
            >
              {t.exploreSchemes}
            </Link>
            <Link
              to="/calculator"
              className="text-sm opacity-80 hover:opacity-100 transition-opacity"
            >
              {t.emiBtn}
            </Link>
            <Link
              to="/partners"
              className="text-sm opacity-80 hover:opacity-100 transition-opacity"
            >
              {t.navLocate}
            </Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-3 ">
            {t.footerInfo}
          </h4>
          <div className="flex flex-col gap-2">
            <Link
              to="/privacy"
              className="text-sm opacity-80 hover:opacity-100 transition-opacity"
            >
              {t.privacyTitle}
            </Link>
            <Link
              to="/testbench"
              className="text-sm opacity-80 hover:opacity-100 transition-opacity"
            >
              Evaluation Bench
            </Link>
            <Link
              to="/optimizer"
              className="text-sm opacity-80 hover:opacity-100 transition-opacity"
            >
              Stacking Optimizer
            </Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-3 ">
            {t.footerMinistry}
          </h4>
          <p className="text-sm opacity-80 leading-relaxed">
            {t.footerPortal}
          </p>
          <p className="text-xs opacity-60 mt-2">
            National Concessional Finance Network @2026
          </p>
        </div>
      </div>
      <div className="border-t border-primary-container/30 mt-8 pt-6 text-center">
        <p className="text-xs opacity-60">
          © 2026 Samarth. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

// --- APP SHELL ---
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [lang, setLang] = useState(() => {
    try {
      return sessionStorage.getItem("samarthLang") || "en";
    } catch {
      return "en";
    }
  });

  const [showLangModal, setShowLangModal] = useState(() => {
    try {
      return !sessionStorage.getItem("samarthLang");
    } catch {
      return false;
    }
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (lang) {
      try {
        sessionStorage.setItem("samarthLang", lang);
      } catch (e) {
        console.warn("SessionStorage write error:", e);
      }
    }
  }, [lang]);

  const t = translations[lang] || translations.en;

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-secondary selection:text-on-secondary">
      {showLangModal && (
        <LanguageModal
          setLang={(selectedLang) => {
            setLang(selectedLang);
            setShowLangModal(false);
          }}
        />
      )}
      <Navbar
        lang={lang}
        setLang={setLang}
        t={t}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/about" element={<AboutPage lang={lang} />} />
          <Route path="/contact" element={<ContactPage lang={lang} />} />
          <Route path="/explore" element={<ExploreSchemes lang={lang} />} />
          <Route path="/scheme/:id" element={<SchemeDetails lang={lang} />} />
          <Route path="/find" element={<FindScheme lang={lang} />} />
          <Route path="/results" element={<ResultsPage lang={lang} />} />
          <Route path="/calculator" element={<CalculatorPage lang={lang} />} />
          <Route path="/partners" element={<PartnersPage lang={lang} />} />
          <Route path="/admin" element={<AdminDashboard lang={lang} />} />
          <Route path="/testbench" element={<EvaluationTestBench lang={lang} />} />
          <Route path="/optimizer" element={<OptimizerPage lang={lang} />} />
          <Route path="/privacy" element={<PrivacyPage lang={lang} />} />
          <Route
            path="/ai-analyzer"
            element={
              <div className="max-w-4xl mx-auto py-4">
                <AIBusinessAnalyzer
                  lang={lang}
                  onSelectScheme={(s) => navigate("/scheme/" + s.id)}
                />
              </div>
            }
          />
          <Route
            path="*"
            element={
              <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
                <h1 className="display-lg text-primary mb-4">404</h1>
                <p className="body-lg text-on-surface-variant mb-8">
                  Page Not Found
                </p>
                <Link to="/" className="btn-primary px-6 py-3">
                  Return Home
                </Link>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer t={t} />

      <AIChatbot lang={lang} />
    </div>
  );
}

export default App;
