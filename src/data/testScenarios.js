// Pre-configured Test Benchmark Scenarios for Evaluators
// Covers Clearly Eligible, Clearly Ineligible, and Borderline / Manual Review cases

export const testScenarios = [
  {
    id: "case-clearly-eligible",
    title: "Scenario 1: Clearly Eligible (SC Artisan Woman Micro-Enterprise)",
    badge: "Clearly Eligible",
    badgeColor: "green",
    description: "Rural Scheduled Caste woman artisan running a tailoring micro-enterprise applying for PMEGP Capital Subsidy & NSFDC Mahila Samriddhi.",
    applicant: {
      name: "Sunita Das",
      entity_type: "individual",
      caste: "SC",
      hasCaste: "yes",
      gender: "female",
      age: 32,
      income: 140000,
      amount: 120000,
      turnover: 180000,
      area: "rural",
      purpose: "business",
      education: "10th_pass",
      artisan_trade: "tailor",
      has_electricity_bill: true,
      has_roof_access: true,
      has_vending_id: false,
      has_udyam: false,
      providedDocuments: [
        "caste_certificate",
        "income_certificate",
        "aadhaar_card",
        "bank_passbook",
        "educational_proof",
        "rural_area_certificate"
      ]
    },
    expectedTriage: "ELIGIBLE",
    primaryMatchedScheme: "pmegp-subsidy",
    secondaryMatchedScheme: "nsfdc-mahila-samriddhi",
    evaluatorNotes: "Qualifies 100% under rural special category criteria. All statutory ceilings (income <= ₹3L, age 18-65) satisfied. Verified revenue certificates on file. Receives maximum 35% non-repayable capital subsidy and ultra-concessional 4% loan."
  },
  {
    id: "case-clearly-ineligible",
    title: "Scenario 2: Clearly Ineligible (High-Income Urban Enterprise)",
    badge: "Clearly Ineligible",
    badgeColor: "red",
    description: "High-earning urban general-category IT consultancy attempting to apply for social concessional schemes (NSFDC / PM SVANidhi).",
    applicant: {
      name: "Vikram Malhotra (Acrobyte Solutions)",
      entity_type: "small_business",
      business_type: "Private Limited",
      caste: "General",
      hasCaste: "no",
      gender: "male",
      age: 42,
      income: 4500000, // ₹45 Lakhs
      turnover: 32000000, // ₹3.2 Crore (exceeds 44AD limit)
      amount: 15000000,
      area: "urban",
      purpose: "business",
      education: "post_graduate",
      artisan_trade: "none",
      has_electricity_bill: true,
      has_roof_access: false,
      has_vending_id: false,
      has_udyam: true,
      providedDocuments: [
        "pan_card",
        "gst_returns"
      ]
    },
    expectedTriage: "INELIGIBLE",
    failedRules: [
      { scheme: "NSFDC Term Loan", clause: "NSFDC Charter Para 2.1", reason: "Applicant does not belong to Scheduled Caste community" },
      { scheme: "NSFDC Mahila Samriddhi", clause: "NSFDC MSY Clause 3.4", reason: "Applicant must be female and SC" },
      { scheme: "Sec 44AD Presumptive Taxation", clause: "Section 44AD(1)", reason: "Turnover ₹3.2 Crore exceeds statutory ceiling of ₹3.0 Crore; Pvt Ltd structure disallowed under Sec 44AD(6)" },
      { scheme: "PM SVANidhi", clause: "Para 3.1", reason: "No Certificate of Vending or Urban Local Body recommendation" }
    ],
    evaluatorNotes: "Hard disqualification triggered with statutory clause references. Prevents false positive sanctions and transparently explains failure criteria."
  },
  {
    id: "case-borderline-review",
    title: "Scenario 3: Borderline / Manual Review Required (Near Threshold & Provisional Docs)",
    badge: "Manual Review Required",
    badgeColor: "amber",
    description: "Small woodcraft workshop where applicant's annual income (₹2,95,000) is within 2% of the statutory ceiling (₹3,00,000), using unverified self-declared accounts.",
    applicant: {
      name: "Mohd. Imran (Al-Madina Woodcrafts)",
      entity_type: "small_business",
      business_type: "Proprietorship",
      caste: "OBC",
      hasCaste: "yes",
      gender: "male",
      age: 29,
      income: 295000, // 98.3% of ₹3,00,000 ceiling!
      turnover: 1450000,
      amount: 850000,
      area: "semi-urban",
      purpose: "business",
      education: "8th_pass",
      artisan_trade: "carpenter",
      has_electricity_bill: true,
      has_roof_access: true,
      has_vending_id: false,
      has_udyam: false, // Missing Udyam certificate
      is_self_certified_only: true, // No third-party CA or revenue seal
      providedDocuments: [
        "aadhaar_card",
        "pan_card"
      ]
    },
    expectedTriage: "BORDERLINE_MANUAL_REVIEW",
    flaggedReasons: [
      "Income Proximity Risk: Applicant income ₹2,95,000 is within 2% margin of the ₹3,00,000 statutory limit under Clause 2.3.",
      "Missing Mandatory Document: Udyam MSME Registration Certificate not submitted.",
      "Provisional Financials: Self-declared revenue without formal Tehsildar income endorsement or GST portal reconciliation.",
      "Subjective Criterion: Detailed Project Feasibility Report (DPR) requires physical appraisal by District Industries Centre (DIC) inspector."
    ],
    evaluatorNotes: "Crucial for Problem Statement compliance! Flags case for human loan officer verification instead of returning an inaccurate automated approval."
  },
  {
    id: "case-small-business-tax",
    title: "Scenario 4: Small Business Tax Relief (Sec 44AD & CGTMSE)",
    badge: "Tax Relief & Credit Guarantee",
    badgeColor: "blue",
    description: "Proprietorship grocery store with ₹85 Lakh turnover (90% UPI/card payments) qualifying for presumptive taxation and collateral-free bank loan.",
    applicant: {
      name: "Anil Gupta (Gupta Provision Store)",
      entity_type: "small_business",
      business_type: "Proprietorship",
      caste: "General",
      hasCaste: "no",
      gender: "male",
      age: 44,
      income: 620000,
      turnover: 8500000, // ₹85 Lakhs (Well within ₹3 Cr)
      amount: 2500000, // ₹25 Lakh loan requested
      area: "urban",
      purpose: "business",
      education: "graduate",
      artisan_trade: "none",
      has_electricity_bill: true,
      has_roof_access: true,
      has_vending_id: false,
      has_udyam: true,
      digital_turnover_ratio: 0.90, // 90% digital
      providedDocuments: [
        "pan_card",
        "bank_statement",
        "sales_turnover_summary",
        "udyam_certificate"
      ]
    },
    expectedTriage: "ELIGIBLE",
    primaryMatchedScheme: "tax-sec-44ad",
    secondaryMatchedScheme: "cgtmse-guarantee",
    evaluatorNotes: "Eligible for Section 44AD presumptive tax regime, saving ~₹1,85,000 in income tax and mandatory CA audit fees. Also qualifies for CGTMSE 75% collateral-free credit guarantee."
  }
];
