// Financial Policy & Scheme Database
// Covers Subsidies, Tax Deductions, Grants, Credit Guarantees, and Concessional Loans
// Annotated with statutory authorities, verified gazette clauses, and benefit estimation logic.

export const financialPolicies = [
  // ==========================================
  // TAX DEDUCTIONS & EXEMPTIONS
  // ==========================================
  {
    id: "tax-sec-44ad",
    name: "Section 44AD Presumptive Taxation for Small Businesses",
    official_name: "Presumptive Taxation Scheme under Section 44AD of the Income Tax Act, 1961",
    short_name: "Sec 44AD Tax Relief",
    policy_type: "tax_deduction",
    target_entity: ["small_business", "individual"],
    beneficiary_category: "All Categories (MSME & Small Retailers)",
    authority: "Central Board of Direct Taxes (CBDT), Ministry of Finance",
    source_document: {
      title: "Income Tax Act, 1961 - Section 44AD read with CBDT Circular No. 3/2017",
      clause_reference: "Section 44AD(1) & Section 44AD(2)",
      notification_no: "CBDT Notification 33/2016",
      gazette_url: "https://incometaxindia.gov.in/Pages/acts/income-tax-act.aspx",
    },
    shortDesc: "Exempts small businesses with turnover up to ₹3 Crore from maintaining audited books, declaring deemed income at just 6% (digital) or 8%.",
    description: "Section 44AD allows eligible small businesses with gross receipts up to ₹2 Crore (₹3 Crore if cash receipts <= 5%) to declare income on a presumptive basis, avoiding mandatory accounting audits under Sec 44AB and saving significant compliance and tax expenditure.",
    max_turnover_limit: 30000000, // ₹3 Crore
    min_turnover_limit: 100000,
    annual_family_income_limit: null,
    minimum_age: 18,
    maximum_age: 75,
    eligible_activities: ["Retail Trade", "Wholesale Trade", "Manufacturing", "Civil Construction", "Service Units (Non-44ADA)"],
    ineligible_activities: ["Agency Business", "Commission / Brokerage", "Professionals under 44AA(1)"],
    eligibility_rules: [
      {
        id: "turnover_ceiling",
        clause: "Section 44AD(1) - Gross Turnover Ceiling",
        rule_text: "Total annual business turnover must not exceed ₹300,00,000 (₹3 Crore) if digital transactions exceed 95%, or ₹200,00,000 otherwise.",
        field: "turnover",
        operator: "lte",
        threshold: 30000000,
        borderline_margin_percent: 5, // Within 5% of ₹3Cr needs CA verification of cash vs digital split
      },
      {
        id: "entity_structure",
        clause: "Section 44AD(6) - Ineligible Entities",
        rule_text: "Must be a Resident Individual, HUF, or Partnership Firm (excluding Limited Liability Partnerships LLP).",
        field: "business_type",
        operator: "not_in",
        disallowed: ["LLP", "Private Limited", "Public Limited"],
      },
      {
        id: "age_requirement",
        clause: "Indian Contract Act & Income Tax Provisions",
        rule_text: "Applicant / Managing Partner must be at least 18 years of age.",
        field: "age",
        operator: "gte",
        threshold: 18,
      }
    ],
    required_documents: [
      { id: "pan_card", name: "PAN Card of Business / Proprietor", mandatory: true, where_to_get: "NSDL / UTIITSL Portal" },
      { id: "bank_statement", name: "12-Month Bank Statement (Digital Transaction Ratio Proof)", mandatory: true, where_to_get: "Issuing Bank Branch / Netbanking" },
      { id: "sales_turnover_summary", name: "Annual Sales / Gross Receipts Register", mandatory: true, where_to_get: "Self-certified or GST Portal GSTR-1 / GSTR-3B" },
      { id: "itr_ack", name: "Prior Year ITR-4 or ITR-3 Acknowledgment", mandatory: false, where_to_get: "Income Tax e-Filing Portal" },
    ],
    benefit_formula: {
      type: "tax_deduction",
      unit: "₹ / year saved",
      calculateBenefit: (data) => {
        const turnover = Number(data.turnover || data.amount || 2500000);
        const deemedProfit = Math.round(turnover * 0.06); // 6% digital
        const standardBookProfit = Math.round(turnover * 0.15); // Avg standard 15% margin
        const taxableDifference = Math.max(0, standardBookProfit - deemedProfit);
        const taxSaved = Math.round(taxableDifference * 0.20 + 35000); // 20% tax bracket + audit fee saving ₹35k
        return {
          amount: taxSaved,
          formatted: `₹${taxSaved.toLocaleString("en-IN")}`,
          label: "Estimated Annual Tax & Audit Savings",
          breakdown: [
            `Presumptive profit rate: 6% (₹${deemedProfit.toLocaleString("en-IN")}) vs traditional book rate ~15%`,
            `Estimated income tax reduction: ₹${(taxSaved - 35000).toLocaleString("en-IN")}`,
            `Statutory Section 44AB CA Audit fee waiver: ₹35,000`,
            `Zero book-keeping compliance penalty exposure under Section 271A`,
          ]
        };
      }
    },
    application_portal: "https://www.incometax.gov.in/iec/fposervices/#/login",
    application_type: "Online (ITR-4 Sugam Form)",
    steps: [
      "Aggregate annual bank credits and UPI/PoS settlements for digital turnover percentage calculation.",
      "Confirm turnover is within the ₹2 Cr (cash) or ₹3 Cr (digital) statutory threshold.",
      "Log into Income Tax e-Filing Portal and select Form ITR-4 (Sugam).",
      "Declare gross receipts under Section 44AD Schedule BP and file with Aadhaar OTP e-verification."
    ]
  },
  {
    id: "tax-sec-80jjaa",
    name: "Section 80JJAA Tax Incentive for New Employment Generation",
    official_name: "Deduction in Respect of Employment of New Employees under Section 80JJAA",
    short_name: "Sec 80JJAA Jobs Incentive",
    policy_type: "tax_deduction",
    target_entity: ["small_business", "msme"],
    beneficiary_category: "All MSMEs & Employers Generating New Jobs",
    authority: "Central Board of Direct Taxes (CBDT), Ministry of Finance",
    source_document: {
      title: "Finance Act, 2016 & Income Tax Act, 1961 - Section 80JJAA",
      clause_reference: "Sub-section (1) & Sub-section (2)(b)",
      notification_no: "Rule 19AB - Form 10DA Audit Report",
      gazette_url: "https://incometaxindia.gov.in/Pages/acts/income-tax-act.aspx",
    },
    shortDesc: "Provides a 30% additional tax deduction on employee wages for 3 consecutive financial years for businesses hiring new workers.",
    description: "To incentivize formal job creation, Section 80JJAA grants employers a deduction equal to 30% of additional employee cost paid to new regular employees (earning up to ₹25,000/month) for three consecutive assessment years.",
    max_turnover_limit: 500000000,
    min_turnover_limit: 1000000,
    annual_family_income_limit: null,
    minimum_age: 18,
    maximum_age: 70,
    eligibility_rules: [
      {
        id: "tax_audit_applicability",
        clause: "Section 80JJAA(1) - Tax Audit Applicability",
        rule_text: "Business profits must be derived from an enterprise whose accounts are required to be audited under Section 44AB.",
        field: "turnover",
        operator: "gte",
        threshold: 10000000, // ₹1 Cr+ turnover
        borderline_margin_percent: 10,
      },
      {
        id: "employee_wage_ceiling",
        clause: "Section 80JJAA(2)(c) - Emolument Cap",
        rule_text: "New employees must draw total emoluments not exceeding ₹25,000 per month and must participate in the Employees' Provident Fund (EPFO).",
        field: "has_epf",
        operator: "eq",
        threshold: true,
      }
    ],
    required_documents: [
      { id: "form_10da", name: "Form 10DA Chartered Accountant Verification Report", mandatory: true, where_to_get: "Practicing CA / Income Tax Portal" },
      { id: "epfo_ecr", name: "EPFO Electronic Challan cum Return (ECR) Monthly Filings", mandatory: true, where_to_get: "EPFO Unified Employer Portal" },
      { id: "wage_register", name: "New Employee Wage Register (<₹25k/mo)", mandatory: true, where_to_get: "Company Payroll Software" },
    ],
    benefit_formula: {
      type: "tax_deduction",
      unit: "₹ across 3 years",
      calculateBenefit: (data) => {
        const newWorkers = Number(data.new_employees || 5);
        const avgMonthlySalary = Math.min(25000, Number(data.avg_salary || 18000));
        const annualWageBill = newWorkers * avgMonthlySalary * 12;
        const annualDeduction = Math.round(annualWageBill * 0.30);
        const threeYearDeduction = annualDeduction * 3;
        const taxBenefitAt25Percent = Math.round(threeYearDeduction * 0.25);
        return {
          amount: taxBenefitAt25Percent,
          formatted: `₹${taxBenefitAt25Percent.toLocaleString("en-IN")}`,
          label: "3-Year Cumulative Corporate Tax Cash Benefit",
          breakdown: [
            `Eligible new workforce: ${newWorkers} employees (wage ≤ ₹25,000/mo)`,
            `Total 30% additional tax deduction claim: ₹${threeYearDeduction.toLocaleString("en-IN")} across 3 Assessment Years`,
            `Effective net corporate tax savings (at 25% corporate tax rate): ₹${taxBenefitAt25Percent.toLocaleString("en-IN")}`,
          ]
        };
      }
    },
    application_portal: "https://www.incometax.gov.in/iec/fposervices/#/login",
    application_type: "Tax Return Filing (Form 10DA with ITR-6 / ITR-5)",
    steps: [
      "Enroll all newly recruited workers with UAN on the EPFO portal.",
      "Track minimum 240 days (or 150 days for apparel/footwear) of active service.",
      "Obtain Form 10DA certification from a Chartered Accountant prior to filing return.",
      "Claim deduction in Schedule 80JJAA of ITR."
    ]
  },

  // ==========================================
  // GOVERNMENT CAPITAL SUBSIDIES & GRANTS
  // ==========================================
  {
    id: "pmegp-subsidy",
    name: "PMEGP Credit Linked Capital Subsidy Scheme",
    official_name: "Prime Minister's Employment Generation Programme (PMEGP) Margin Money Subsidy",
    short_name: "PMEGP Capital Subsidy",
    policy_type: "subsidy",
    target_entity: ["individual", "small_business"],
    beneficiary_category: "SC / ST / OBC / Women / Minority / General",
    authority: "Khadi and Village Industries Commission (KVIC), Ministry of MSME",
    source_document: {
      title: "Operational Guidelines of PMEGP Scheme (Revised May 2022)",
      clause_reference: "Paragraph 4.2 - Rates of Margin Money Subsidy & Project Ceilings",
      notification_no: "KVIC/PMEGP/Policy/2022-23",
      gazette_url: "https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp",
    },
    shortDesc: "Provides up to 35% non-repayable capital subsidy (margin money) up to ₹17.50 Lakh for manufacturing and ₹7 Lakh for service projects.",
    description: "PMEGP is a flagship credit-linked subsidy program aimed at generating self-employment opportunities through micro-enterprises in non-farm sectors. The Government provides direct non-refundable capital subsidy credited to a bank term deposit receipt (TDR) for 3 years, after which it adjusts against loan principal.",
    max_project_cost: 5000000, // ₹50 Lakh for manufacturing
    max_service_cost: 2000000, // ₹20 Lakh for service
    annual_family_income_limit: null, // No ceiling
    minimum_age: 18,
    maximum_age: 65,
    eligible_activities: ["Manufacturing Units", "Agro Processing", "Rural Engineering", "Service Enterprises", "Handicrafts & Textiles"],
    ineligible_activities: ["Meat/Slaughterhouse", "Alcohol/Tobacco", "Pashmina Shawls outside J&K", "Single-use Plastic packaging"],
    eligibility_rules: [
      {
        id: "min_education_qualification",
        clause: "PMEGP Guidelines Para 3.1(b) - Educational Mandate",
        rule_text: "For projects exceeding ₹10 Lakh in manufacturing or ₹5 Lakh in service, beneficiary must have passed at least 8th standard.",
        field: "education",
        operator: "gte_education",
        threshold: "8th_pass",
      },
      {
        id: "age_criteria",
        clause: "PMEGP Guidelines Para 3.1(a)",
        rule_text: "Applicant must be at least 18 years old at the time of application.",
        field: "age",
        operator: "gte",
        threshold: 18,
      },
      {
        id: "project_cost_ceiling",
        clause: "PMEGP Guidelines Para 4.1",
        rule_text: "Maximum admissible project cost is ₹50 Lakh for manufacturing units and ₹20 Lakh for service units.",
        field: "amount",
        operator: "lte",
        threshold: 5000000,
        borderline_margin_percent: 5,
      }
    ],
    required_documents: [
      { id: "project_report", name: "Detailed Project Report (DPR) with 3-Year Cash Flows", mandatory: true, where_to_get: "District Industries Centre (DIC) or Chartered Accountant" },
      { id: "caste_special_category", name: "Caste / Special Category Certificate (for 25-35% subsidy)", mandatory: false, where_to_get: "Tehsildar / District Magistrate" },
      { id: "educational_proof", name: "8th Standard or Higher Marksheet", mandatory: true, where_to_get: "State Board of Education" },
      { id: "rural_area_certificate", name: "Rural Area Certificate (Panchayat verified)", mandatory: false, where_to_get: "Gram Panchayat / Block Development Officer" },
      { id: "edp_certificate", name: "Entrepreneurship Development Training (EDP) Certificate", mandatory: true, where_to_get: "KVIC / RSETI / MSME-DI" },
    ],
    benefit_formula: {
      type: "capital_subsidy",
      unit: "₹ Direct Non-Repayable Grant",
      calculateBenefit: (data) => {
        const amount = Math.min(5000000, Number(data.amount || 1500000));
        const isRural = data.area === "rural";
        const isSpecialCategory = ["sc", "st", "obc", "women", "minority", "ph"].includes((data.caste || "").toLowerCase()) || data.gender === "female";
        let subsidyRate = 15; // General Urban
        if (!isSpecialCategory && isRural) subsidyRate = 25; // General Rural
        if (isSpecialCategory && !isRural) subsidyRate = 25; // Special Urban
        if (isSpecialCategory && isRural) subsidyRate = 35; // Special Rural (Max)

        const subsidyAmount = Math.round((amount * subsidyRate) / 100);
        const ownContributionRate = isSpecialCategory ? 5 : 10;
        const ownContribution = Math.round((amount * ownContributionRate) / 100);
        const bankLoan = amount - subsidyAmount - ownContribution;

        return {
          amount: subsidyAmount,
          formatted: `₹${subsidyAmount.toLocaleString("en-IN")}`,
          label: `${subsidyRate}% Non-Repayable Margin Money Subsidy`,
          breakdown: [
            `Total Project Outlay: ₹${amount.toLocaleString("en-IN")}`,
            `Government Capital Subsidy (${subsidyRate}%): ₹${subsidyAmount.toLocaleString("en-IN")}`,
            `Beneficiary Own Equity (${ownContributionRate}%): ₹${ownContribution.toLocaleString("en-IN")}`,
            `Bank Term Loan / Working Capital: ₹${bankLoan.toLocaleString("en-IN")}`,
            `Zero collateral required up to ₹10 Lakh under CGTMSE linkage`,
          ]
        };
      }
    },
    application_portal: "https://www.kviconline.gov.in/pmegpeportal/jsp/pmegponline.jsp",
    application_type: "Online (KVIC e-Portal)",
    steps: [
      "Prepare your Detailed Project Report (DPR) with equipment cost estimates.",
      "Fill online application on KVIC e-Portal and select your preferred Financing Bank.",
      "District Level Task Force Committee (DLTFC) scrutinizes and forwards application to bank.",
      "Complete mandatory 5-10 day online EDP training module upon in-principle sanction."
    ]
  },
  {
    id: "pm-surya-ghar",
    name: "PM Surya Ghar: Muft Bijli Yojana Solar Rooftop Subsidy",
    official_name: "PM Surya Ghar: Muft Bijli Yojana (Cabinet Approved Feb 2024)",
    short_name: "Surya Ghar Solar Subsidy",
    policy_type: "grant",
    target_entity: ["individual", "small_business"],
    beneficiary_category: "All Residential Households & Small Commercial Establishments",
    authority: "Ministry of New and Renewable Energy (MNRE), Government of India",
    source_document: {
      title: "MNRE National Portal for Rooftop Solar Guidelines (Order No. 318/14/2024)",
      clause_reference: "Section 3.1 - Direct Benefit Transfer (DBT) Subsidy Matrix",
      notification_no: "MNRE-Solar/Rooftop/2024/01",
      gazette_url: "https://pmsuryaghar.gov.in/",
    },
    shortDesc: "Provides direct non-repayable bank cash subsidy of up to ₹78,000 for residential/micro rooftop solar systems plus up to 300 free electricity units.",
    description: "Approved by the Union Cabinet with an outlay of ₹75,021 Crore, this scheme provides direct cash subsidies straight into the applicant's bank account within 30 days of rooftop solar installation, cutting household electricity bills to zero.",
    max_subsidy_amount: 78000,
    annual_family_income_limit: null,
    minimum_age: 18,
    maximum_age: 80,
    eligibility_rules: [
      {
        id: "grid_electricity_connection",
        clause: "MNRE Para 2.1 - Connection Mandate",
        rule_text: "Applicant must possess an active domestic/commercial DISCOM electricity connection in their name.",
        field: "has_electricity_bill",
        operator: "eq",
        threshold: true,
      },
      {
        id: "roof_ownership",
        clause: "MNRE Para 2.2 - Roof Rights",
        rule_text: "Applicant must have clear ownership or unencumbered legal rooftop rights for solar panel installation.",
        field: "has_roof_access",
        operator: "eq",
        threshold: true,
      }
    ],
    required_documents: [
      { id: "electricity_bill", name: "Latest Electricity Bill with Consumer Account (CA) Number", mandatory: true, where_to_get: "Local Power Distribution Company (DISCOM)" },
      { id: "roof_photo", name: "Photograph of Shadow-Free Rooftop Area", mandatory: true, where_to_get: "Applicant Mobile Camera" },
      { id: "cancelled_cheque", name: "Cancelled Cheque / Bank Passbook for Direct DBT Deposit", mandatory: true, where_to_get: "Bank Account Branch" },
    ],
    benefit_formula: {
      type: "grant",
      unit: "₹ Direct Bank Transfer",
      calculateBenefit: (data) => {
        const kw = Number(data.solar_capacity_kw || 3);
        let subsidy = 30000; // 1 kW
        if (kw === 2) subsidy = 60000;
        if (kw >= 3) subsidy = 78000;
        const annualElectricitySaved = kw * 120 * 8 * 12; // ~120 units/kW/mo * ₹8/unit * 12 months
        return {
          amount: subsidy,
          formatted: `₹${subsidy.toLocaleString("en-IN")}`,
          label: "Direct Cash Subsidy (DBT into Bank)",
          breakdown: [
            `Solar Capacity: ${kw} kW Grid-Interactive System`,
            `Direct Central Govt Subsidy: ₹${subsidy.toLocaleString("en-IN")}`,
            `Estimated Monthly Electricity Generation: ~${kw * 120} Units`,
            `Estimated Annual Electricity Cost Savings: ~₹${annualElectricitySaved.toLocaleString("en-IN")}/year`,
            `Concessional collateral-free bank loans available at ~7% interest rate`,
          ]
        };
      }
    },
    application_portal: "https://pmsuryaghar.gov.in/",
    application_type: "Online (National Portal)",
    steps: [
      "Register on pmsuryaghar.gov.in with your State and DISCOM Consumer Account Number.",
      "Submit technical feasibility application online (DISCOM issues approval within 15 days).",
      "Get installation completed via an MNRE-registered empanelled vendor.",
      "Vendor applies for net-metering inspection; subsidy credited directly via DBT within 30 days."
    ]
  },
  {
    id: "pm-vishwakarma-grant",
    name: "PM Vishwakarma Scheme (Toolkits Grant & Subsidized Credit)",
    official_name: "PM Vishwakarma Scheme for Traditional Artisans and Craftspeople",
    short_name: "PM Vishwakarma",
    policy_type: "grant",
    target_entity: ["individual", "small_business"],
    beneficiary_category: "18 Traditional Trades (Blacksmiths, Carpenters, Tailors, Potters, etc.)",
    authority: "Ministry of Micro, Small and Medium Enterprises (MSME)",
    source_document: {
      title: "PM Vishwakarma Operational Guidelines (September 2023)",
      clause_reference: "Section 5.2 - Skill Upgrade & Modern Toolkit Incentive",
      notification_no: "MSME-DC/Vishwakarma/2023",
      gazette_url: "https://pmvishwakarma.gov.in/",
    },
    shortDesc: "Provides ₹15,000 free toolkit e-voucher grant, ₹500/day training stipend, and collateral-free enterprise credit up to ₹3 Lakh at just 5% interest.",
    description: "Designed to provide holistic end-to-end support to traditional artisans and craftspersons engaged in 18 recognized family-based trades. The scheme offers digital empowerment, brand building, modern toolkits, and subsidized credit.",
    max_loan_tranche_1: 100000,
    max_loan_tranche_2: 200000,
    annual_family_income_limit: null,
    minimum_age: 18,
    maximum_age: 65,
    eligible_activities: ["Carpenter", "Boat Maker", "Armourer", "Blacksmith", "Hammer & Tool Kit Maker", "Locksmith", "Sculptor", "Gold Smith", "Potter", "Cobbler", "Mason", "Basket/Mat/Broom Maker", "Doll & Toy Maker", "Barber", "Garland Maker", "Washerman", "Tailor", "Fishing Net Maker"],
    eligibility_rules: [
      {
        id: "family_tradition_mandate",
        clause: "PM Vishwakarma Guidelines Para 3.1 - Trade Engagement",
        rule_text: "Beneficiary must be hands-on engaged in one of the 18 recognized traditional artisan/craftsperson trades.",
        field: "artisan_trade",
        operator: "in_list",
        allowed_trades: ["tailor", "carpenter", "blacksmith", "potter", "barber", "cobbler", "mason", "sculptor", "weaver", "craftsman"],
      },
      {
        id: "one_per_family",
        clause: "PM Vishwakarma Guidelines Para 3.3 - Family Cap",
        rule_text: "The benefit is restricted to one member of the family (husband, wife, and unmarried children).",
        field: "family_availing",
        operator: "eq",
        threshold: false,
      }
    ],
    required_documents: [
      { id: "aadhaar_linked_mobile", name: "Aadhaar Card linked with active mobile number", mandatory: true, where_to_get: "UIDAI" },
      { id: "bank_passbook", name: "Bank Passbook with IFSC code", mandatory: true, where_to_get: "Any Commercial Bank" },
      { id: "panchayat_verification", name: "Gram Panchayat / ULB Ward Committee Verification Endorsement", mandatory: true, where_to_get: "Village Panchayat Secretary / Municipal Officer" },
    ],
    benefit_formula: {
      type: "grant",
      unit: "₹ Cash Grant + Subsidized Loan",
      calculateBenefit: (data) => {
        const toolkitGrant = 15000;
        const trainingStipend = 500 * 7; // 7 days basic training
        const loanAmount = 300000;
        const interestSubventionSavings = Math.round(loanAmount * (0.12 - 0.05) * 2); // 7% interest subvention savings for 2 yrs
        const totalDirectBenefit = toolkitGrant + trainingStipend + interestSubventionSavings;

        return {
          amount: totalDirectBenefit,
          formatted: `₹${totalDirectBenefit.toLocaleString("en-IN")}`,
          label: "Total Value of Grants, Stipend & Interest Relief",
          breakdown: [
            `Digital Toolkit Cash e-Voucher: ₹15,000 (100% Free Grant)`,
            `Skill Training Daily Stipend (7 days @ ₹500/day): ₹3,500`,
            `Collateral-free enterprise credit: Up to ₹3,00,000 (Tranche 1: ₹1L, Tranche 2: ₹2L)`,
            `Subsidized Interest Rate: 5% p.a. (Govt pays up to 8% interest subvention, saving ~₹${interestSubventionSavings.toLocaleString("en-IN")})`,
            `PM Vishwakarma Certificate & National Digital ID Card issued`,
          ]
        };
      }
    },
    application_portal: "https://pmvishwakarma.gov.in/",
    application_type: "Online (via Common Service Centres - CSC)",
    steps: [
      "Visit any Common Service Centre (CSC) with Aadhaar and bank details for biometric registration.",
      "Gram Panchayat or Urban Local Body (ULB) conducts Tier-1 verification of your trade skills.",
      "District Implementation Committee (DIC) conducts Tier-2 scrutiny.",
      "Undergo 5-7 days basic skill upgrading and receive ₹15,000 toolkit digital voucher."
    ]
  },

  // ==========================================
  // CREDIT GUARANTEES & CONCESSIONAL LENDING
  // ==========================================
  {
    id: "cgtmse-guarantee",
    name: "CGTMSE Collateral-Free Credit Guarantee Scheme",
    official_name: "Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)",
    short_name: "CGTMSE Loan Guarantee",
    policy_type: "credit_guarantee",
    target_entity: ["small_business", "msme"],
    beneficiary_category: "All Micro & Small Enterprises (New and Existing)",
    authority: "SIDBI & Ministry of MSME, Government of India",
    source_document: {
      title: "CGTMSE Operational Guidelines Circular No. 219/2023-24",
      clause_reference: "Section 3 - Extent of Guarantee Coverage & Ceiling",
      notification_no: "CGTMSE/MLI/2023-55",
      gazette_url: "https://www.cgtmse.in/",
    },
    shortDesc: "Provides up to 85% credit guarantee to banks on loans up to ₹500 Lakh, allowing MSMEs to secure business loans with zero mortgage or collateral.",
    description: "CGTMSE was set up by the Government of India and SIDBI to make collateral-free credit available to first-generation entrepreneurs and MSMEs. Member Lending Institutions (commercial banks, RRBs, NBFCs) are provided guarantee coverage up to 85% in case of default.",
    max_project_cost: 50000000, // ₹500 Lakh (₹5 Crore)
    annual_family_income_limit: null,
    minimum_age: 18,
    maximum_age: 70,
    eligibility_rules: [
      {
        id: "msme_udyam_registration",
        clause: "CGTMSE Circular Para 2.1 - Udyam Mandate",
        rule_text: "Enterprise must be officially registered as a Micro or Small Enterprise on the Ministry of MSME Udyam Portal.",
        field: "has_udyam",
        operator: "eq",
        threshold: true,
      },
      {
        id: "loan_ceiling_cgtmse",
        clause: "CGTMSE Circular Para 3.1 - Maximum Coverage",
        rule_text: "Credit facility requested must not exceed ₹500 Lakh (₹5 Crore) per borrowing unit.",
        field: "amount",
        operator: "lte",
        threshold: 50000000,
      }
    ],
    required_documents: [
      { id: "udyam_certificate", name: "Udyam Registration Certificate", mandatory: true, where_to_get: "Udyamregistration.gov.in" },
      { id: "detailed_project_report", name: "Business Plan & CMA Data (Credit Monitoring Arrangement)", mandatory: true, where_to_get: "Chartered Accountant / Financial Consultant" },
      { id: "kyc_promoters", name: "KYC Documents of Partners / Directors (PAN & Aadhaar)", mandatory: true, where_to_get: "UIDAI / NSDL" },
      { id: "gst_returns", name: "GSTR-3B & GSTR-1 Filings for past 12 months", mandatory: true, where_to_get: "GST Common Portal" },
    ],
    benefit_formula: {
      type: "credit_guarantee",
      unit: "₹ Collateral-Free Credit Unlocked",
      calculateBenefit: (data) => {
        const amount = Math.min(50000000, Number(data.amount || 3000000));
        const isWomenOrSC = ["sc", "st", "women"].includes((data.caste || "").toLowerCase()) || data.gender === "female";
        const guaranteePercentage = isWomenOrSC ? 85 : 75;
        const guaranteedAmount = Math.round((amount * guaranteePercentage) / 100);
        return {
          amount: guaranteedAmount,
          formatted: `₹${guaranteedAmount.toLocaleString("en-IN")}`,
          label: `${guaranteePercentage}% Sovereign Credit Guarantee Cover`,
          breakdown: [
            `Total Bank Loan Sanctioned: ₹${amount.toLocaleString("en-IN")}`,
            `Govt Guarantee Backing Bank: ₹${guaranteedAmount.toLocaleString("en-IN")} (${guaranteePercentage}%)`,
            `Zero physical real estate / gold collateral required`,
            `Reduced guarantee fee capped at 0.37% for loans up to ₹1 Crore`,
          ]
        };
      }
    },
    application_portal: "https://www.cgtmse.in/",
    application_type: "Bank-Integrated (Apply at any PSB / Private Bank / SIDBI)",
    steps: [
      "Obtain free Udyam Registration on udyamregistration.gov.in.",
      "Prepare your Detailed Project Report (DPR) showing debt-service coverage ratio (DSCR > 1.5).",
      "Approach any Member Lending Institution (SBI, PNB, Canara Bank, HDFC) for MSME credit.",
      "Bank sanctions loan and directly enrolls it in the CGTMSE portal."
    ]
  },
  {
    id: "standup-india",
    name: "Stand-Up India Scheme for SC, ST & Women Entrepreneurs",
    official_name: "Stand-Up India Scheme for Financing SC/ST and Women Entrepreneurs",
    short_name: "Stand-Up India",
    policy_type: "concessional_loan",
    target_entity: ["individual", "small_business"],
    beneficiary_category: "SC / ST / Women Entrepreneurs",
    authority: "Department of Financial Services (DFS), Ministry of Finance",
    source_document: {
      title: "Stand-Up India Scheme Operational Guidelines (Extended up to 2025)",
      clause_reference: "Section 2.1 - Borrower Eligibility & Margin Money",
      notification_no: "DFS/StandUp/2021/Policy",
      gazette_url: "https://www.standupmitra.in/",
    },
    shortDesc: "Provides bank loans between ₹10 Lakh and ₹1 Crore to at least one SC/ST borrower and one woman borrower per bank branch for greenfield enterprises.",
    description: "Stand-Up India facilitates bank loans between ₹10 Lakh and ₹100 Lakh to Scheduled Caste, Scheduled Tribe, and Women borrowers for setting up greenfield (first-time) enterprises in manufacturing, services, agri-allied, or trading sectors.",
    loan_amount_min: 1000000,
    loan_amount_max: 10000000,
    annual_family_income_limit: null,
    minimum_age: 18,
    maximum_age: 70,
    eligibility_rules: [
      {
        id: "caste_or_gender",
        clause: "Stand-Up India Guidelines Para 2.1",
        rule_text: "Borrower must belong to Scheduled Caste (SC), Scheduled Tribe (ST), or be a Woman entrepreneur.",
        field: "caste_or_gender",
        operator: "custom_standup",
      },
      {
        id: "greenfield_enterprise",
        clause: "Stand-Up India Guidelines Para 2.2 - Greenfield Mandate",
        rule_text: "The enterprise must be a greenfield project (first-time venture in manufacturing, services, or trading sector).",
        field: "is_greenfield",
        operator: "eq",
        threshold: true,
      },
      {
        id: "shareholding_control",
        clause: "Stand-Up India Guidelines Para 2.3 - Non-individual Units",
        rule_text: "In case of non-individual enterprises, at least 51% of shareholding and controlling stake must be held by SC/ST or Woman entrepreneur.",
        field: "shareholding_sc_st_women",
        operator: "gte",
        threshold: 51,
      }
    ],
    required_documents: [
      { id: "caste_certificate_women_id", name: "SC/ST Certificate or Proof of Woman Entrepreneurship", mandatory: true, where_to_get: "Revenue Authority / Aadhaar" },
      { id: "greenfield_project_report", name: "Greenfield Project Report with Machinery Quotations", mandatory: true, where_to_get: "Technical Consultant / DIC" },
      { id: "rent_lease_deed", name: "Proof of Factory / Shop Premises (Lease or Ownership)", mandatory: true, where_to_get: "Sub-Registrar Office / Landlord" },
      { id: "pollution_noc", name: "Pollution Control Board NOC (if manufacturing)", mandatory: false, where_to_get: "State PCB Portal" },
    ],
    benefit_formula: {
      type: "concessional_loan",
      unit: "₹ Greenfield Financing",
      calculateBenefit: (data) => {
        const loan = Math.min(10000000, Math.max(1000000, Number(data.amount || 2500000)));
        const marginMoneyAssistance = Math.round(loan * 0.15); // Up to 15% convergence margin
        return {
          amount: loan,
          formatted: `₹${loan.toLocaleString("en-IN")}`,
          label: "Composite Term Loan & Working Capital",
          breakdown: [
            `Total Sanctioned Greenfield Credit: ₹${loan.toLocaleString("en-IN")}`,
            `Borrower minimum equity reduced to just 10% (rest covered by State subsidies)`,
            `Interest rate: Lowest applicable rate (MCLR + 3% + Tenor Premium)`,
            `Repayment tenure up to 7 years with 18-month moratorium period`,
          ]
        };
      }
    },
    application_portal: "https://www.standupmitra.in/",
    application_type: "Online (StandUpMitra Portal)",
    steps: [
      "Register on standupmitra.in as a 'Trainee' or 'Ready Borrower'.",
      "Connect with Lead District Manager (LDM) or preferred commercial bank branch.",
      "Upload verified project proposal and quote for capital assets.",
      "Sanction letter issued and margin money convergence facilitated with State schemes."
    ]
  },
  {
    id: "nsfdc-mahila-samriddhi",
    name: "NSFDC Mahila Samriddhi Yojana (Micro-credit for SC Women)",
    official_name: "Mahila Samriddhi Yojana under National Scheduled Castes Finance & Development Corporation",
    short_name: "Mahila Samriddhi",
    policy_type: "concessional_loan",
    target_entity: ["individual"],
    beneficiary_category: "Scheduled Caste Women",
    authority: "National Scheduled Castes Finance and Development Corporation (NSFDC)",
    source_document: {
      title: "NSFDC Lending Policy Guidelines 2023-24",
      clause_reference: "Clause 3.4 - Concessional Micro Credit for SC Women",
      notification_no: "NSFDC/OPS/MSY-2023",
      gazette_url: "https://nsfdc.nic.in/en/mahila-samriddhi-yojana",
    },
    shortDesc: "Provides micro-credit up to ₹1,40,000 directly to Scheduled Caste women entrepreneurs at an ultra-low interest rate of 4% per annum.",
    description: "Mahila Samriddhi Yojana is tailored specifically to financially liberate SC women by funding micro-enterprises such as tailoring, grocery, dairy farming, and handicrafts with no collateral requirement and nominal interest.",
    annual_family_income_limit: 300000,
    minimum_age: 18,
    maximum_age: 65,
    loan_amount_max: 140000,
    eligibility_rules: [
      {
        id: "caste_mandate",
        clause: "NSFDC Charter Para 2.1 - Beneficiary Definition",
        rule_text: "Applicant must belong to the Scheduled Caste (SC) community.",
        field: "caste",
        operator: "eq_ci",
        threshold: "SC",
      },
      {
        id: "gender_mandate",
        clause: "NSFDC MSY Guidelines Clause 3.4(a)",
        rule_text: "Applicant must be female.",
        field: "gender",
        operator: "eq_ci",
        threshold: "female",
      },
      {
        id: "income_ceiling",
        clause: "NSFDC Guidelines Clause 2.3 - Income Ceiling",
        rule_text: "Total annual family income from all sources must not exceed ₹3,00,000.",
        field: "income",
        operator: "lte",
        threshold: 300000,
        borderline_margin_percent: 8, // Between ₹2.76L and ₹3.0L triggers borderline warning
      }
    ],
    required_documents: [
      { id: "caste_certificate", name: "Scheduled Caste Certificate issued by Competent Authority", mandatory: true, where_to_get: "Tehsildar / SDO Civil / State Portal" },
      { id: "income_certificate", name: "Family Income Certificate (not exceeding ₹3 Lakh)", mandatory: true, where_to_get: "Circle Officer / Revenue Officer" },
      { id: "aadhaar_card", name: "Aadhaar Card", mandatory: true, where_to_get: "UIDAI" },
      { id: "bank_passbook", name: "Savings Bank Account Passbook", mandatory: true, where_to_get: "Local Bank / RRB" },
    ],
    benefit_formula: {
      type: "concessional_loan",
      unit: "₹ Concessional Micro-Loan",
      calculateBenefit: (data) => {
        const loan = Math.min(140000, Number(data.amount || 100000));
        const commercialRate = 0.14;
        const nsfdcRate = 0.04;
        const interestSavedPerYear = Math.round(loan * (commercialRate - nsfdcRate));
        const totalSavedOver3Years = interestSavedPerYear * 3;
        return {
          amount: loan,
          formatted: `₹${loan.toLocaleString("en-IN")}`,
          label: "Concessional Micro-Loan at 4% Interest",
          breakdown: [
            `Total Concessional Loan Sanction: ₹${loan.toLocaleString("en-IN")}`,
            `Ultra-low interest rate: 4.0% p.a. vs ~14% microfinance / commercial rates`,
            `Estimated Interest Saved: ₹${totalSavedOver3Years.toLocaleString("en-IN")} over 3-year term`,
            `Zero collateral or third-party guarantor required`,
          ]
        };
      }
    },
    application_portal: "https://nsfdc.nic.in/",
    application_type: "State Channelizing Agency (SCA) / Regional Rural Bank (RRB)",
    steps: [
      "Obtain official SC certificate and Income certificate from local Revenue Department.",
      "Submit application form to your State Scheduled Castes Development Corporation (SCA).",
      "Field verification conducted by SCA Welfare Inspector.",
      "Loan disbursed directly to beneficiary's Aadhaar-seeded bank account."
    ]
  },
  {
    id: "pm-svanidhi",
    name: "PM SVANidhi Scheme (Street Vendor's Micro-Credit)",
    official_name: "PM Street Vendor's AtmaNirbhar Nidhi (PM SVANidhi)",
    short_name: "PM SVANidhi",
    policy_type: "subsidy",
    target_entity: ["individual"],
    beneficiary_category: "Urban / Peri-Urban Street Vendors",
    authority: "Ministry of Housing and Urban Affairs (MoHUA)",
    source_document: {
      title: "PM SVANidhi Scheme Guidelines (MoHUA Notification June 2020 & Extensions)",
      clause_reference: "Paragraph 4 - Interest Subsidy & Digital Cashback Incentives",
      notification_no: "MoHUA/SVANidhi/2020-01",
      gazette_url: "https://pmsvanidhi.mohua.gov.in/",
    },
    shortDesc: "Working capital loan starting at ₹10,000 up to ₹50,000 for street vendors with a 7% interest subsidy and ₹1,200 annual digital cashbacks.",
    description: "Empowers street vendors who were adversely impacted by economic disruptions. Provides collateral-free working capital in escalating tranches (₹10k -> ₹20k -> ₹50k) with full interest subvention of 7% deposited directly via DBT.",
    loan_amount_min: 10000,
    loan_amount_max: 50000,
    annual_family_income_limit: null,
    minimum_age: 18,
    maximum_age: 70,
    eligibility_rules: [
      {
        id: "vendor_id_lor",
        clause: "PM SVANidhi Guidelines Para 3.1 - Vending Proof",
        rule_text: "Vendor must possess a Certificate of Vending (CoV) / ID Card issued by Urban Local Body (ULB), or a Letter of Recommendation (LoR).",
        field: "has_vending_id",
        operator: "eq",
        threshold: true,
      }
    ],
    required_documents: [
      { id: "vending_card_lor", name: "Certificate of Vending / Letter of Recommendation (LoR)", mandatory: true, where_to_get: "Town Vending Committee (TVC) / Municipal Corporation" },
      { id: "aadhaar_card", name: "Aadhaar Card", mandatory: true, where_to_get: "UIDAI" },
      { id: "bank_account", name: "Bank Account Details", mandatory: true, where_to_get: "Any Commercial Bank" },
    ],
    benefit_formula: {
      type: "subsidy",
      unit: "₹ Interest Subvention + Cashback",
      calculateBenefit: (data) => {
        const loan = Math.min(50000, Number(data.amount || 20000));
        const interestSubsidy = Math.round(loan * 0.07);
        const cashback = 1200;
        const total = interestSubsidy + cashback;
        return {
          amount: total,
          formatted: `₹${total.toLocaleString("en-IN")}`,
          label: "Annual Subsidy & Cashback Reward",
          breakdown: [
            `Collateral-free working capital loan: ₹${loan.toLocaleString("en-IN")}`,
            `7% Direct Interest Subvention via DBT: ₹${interestSubsidy.toLocaleString("en-IN")}`,
            `Digital transactions cashback incentive: Up to ₹1,200/year (₹100/mo)`,
            `Automatic eligibility for next higher loan tranche upon timely repayment`,
          ]
        };
      }
    },
    application_portal: "https://pmsvanidhi.mohua.gov.in/",
    application_type: "Online (SVANidhi Portal / Mobile App)",
    steps: [
      "Check vending status on the ULB Town Vending Committee (TVC) portal.",
      "If name is not found, apply for a Letter of Recommendation (LoR) from Municipal Ward Officer.",
      "Submit Aadhaar-linked application online on pmsvanidhi.mohua.gov.in.",
      "Bank disburses funds and issues QR code for digital transaction cashbacks."
    ]
  }
];
