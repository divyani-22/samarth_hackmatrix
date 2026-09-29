import { getLocalizedScheme } from "./schemeTranslations";
import { financialPolicies } from "./policiesData";

/**
 * 3-State Triage Matching & Determination Engine
 * Evaluates applicant against verified statutory rules and outputs:
 * - Triage Status: ELIGIBLE | BORDERLINE_MANUAL_REVIEW | INELIGIBLE
 * - Rule Determinations: Explicit pass/fail/borderline breakdown per clause
 * - Benefit Estimates: Exact subsidies, tax deductions, grants, interest savings
 * - Document Gap Analysis: Missing documents checklist with source links
 */

export function matchSchemes(formData, schemesList = [], lang = "en", t = {}) {
  if (!formData) return [];

  // Combine standard schemes with broader financial policies (tax, subsidies, guarantees)
  const allCandidatePolicies = [...financialPolicies];
  (schemesList || []).forEach((s) => {
    if (!allCandidatePolicies.some((p) => p.id === s.id)) {
      allCandidatePolicies.push(s);
    }
  });

  const userAmt = Number(formData.amount || 0);
  const userInc = Number(formData.income || 0);
  const userAge = Number(formData.age || 28);
  const userTurnover = Number(formData.turnover || (userAmt > 500000 ? userAmt * 1.5 : userInc * 2));
  const purpose = formData.purpose || "business";
  const gender = (formData.gender || "male").toLowerCase();
  const hasCaste = formData.hasCaste || (formData.caste && formData.caste !== "General" ? "yes" : "no");
  const caste = (formData.caste || "Any").toLowerCase();
  const urbanRural = (formData.area || "urban").toLowerCase();
  const entityType = formData.entity_type || (userTurnover > 1000000 ? "small_business" : "individual");
  const providedDocs = (formData.providedDocuments || []).map((d) => d.toLowerCase());
  const isSelfCertifiedOnly = Boolean(formData.is_self_certified_only);

  const evaluatedResults = allCandidatePolicies.map((policy) => {
    const ruleDeterminations = [];
    let isHardDisqualified = false;
    let isBorderlineFlagged = false;
    let borderlineReasons = [];
    let disqualificationReasons = [];
    let passedReasons = [];

    // --- 1. Purpose Check ---
    if (purpose === "edu" && !policy.education_eligibility && policy.policy_type !== "grant") {
      isHardDisqualified = true;
      disqualificationReasons.push("Scheme is exclusively designed for commercial enterprise or self-employment, not educational expenditure.");
      ruleDeterminations.push({
        clause: "Charter Clause 1.2 - Purpose Mandate",
        rule_text: "Assistance is earmarked for business/productive asset creation.",
        status: "FAIL",
        explanation: "Education purpose not covered under this specific guideline.",
        source_title: policy.source_document?.title || "Operational Guidelines"
      });
    }

    // --- 2. Income Limit & Proximity Rule ---
    if (policy.annual_family_income_limit && policy.annual_family_income_limit > 0) {
      const ceiling = policy.annual_family_income_limit;
      const marginBorderline = ceiling * 0.10; // Within 10% of ceiling triggers borderline

      if (userInc > ceiling) {
        isHardDisqualified = true;
        const msg = `Annual family income ₹${userInc.toLocaleString("en-IN")} exceeds the statutory ceiling of ₹${ceiling.toLocaleString("en-IN")}.`;
        disqualificationReasons.push(msg);
        ruleDeterminations.push({
          clause: policy.source_document?.clause_reference || "Clause 2.3 - Income Ceiling",
          rule_text: `Family annual income must not exceed ₹${ceiling.toLocaleString("en-IN")}.`,
          status: "FAIL",
          applicant_value: `₹${userInc.toLocaleString("en-IN")}`,
          required_value: `≤ ₹${ceiling.toLocaleString("en-IN")}`,
          explanation: msg,
          source_title: policy.source_document?.title || "Gazette Guidelines"
        });
      } else if (userInc >= (ceiling - marginBorderline)) {
        isBorderlineFlagged = true;
        const note = `Income of ₹${userInc.toLocaleString("en-IN")} is within 10% margin of the ₹${ceiling.toLocaleString("en-IN")} ceiling. Mandates official Tehsildar endorsement to prevent counter rejection.`;
        borderlineReasons.push(note);
        ruleDeterminations.push({
          clause: policy.source_document?.clause_reference || "Clause 2.3 - Income Ceiling",
          rule_text: `Family annual income must not exceed ₹${ceiling.toLocaleString("en-IN")}.`,
          status: "BORDERLINE",
          applicant_value: `₹${userInc.toLocaleString("en-IN")}`,
          required_value: `≤ ₹${ceiling.toLocaleString("en-IN")}`,
          explanation: note,
          source_title: policy.source_document?.title || "Gazette Guidelines"
        });
      } else {
        passedReasons.push(`Income ₹${userInc.toLocaleString("en-IN")} is well within statutory threshold of ₹${ceiling.toLocaleString("en-IN")}.`);
        ruleDeterminations.push({
          clause: policy.source_document?.clause_reference || "Clause 2.3 - Income Ceiling",
          rule_text: `Family annual income must not exceed ₹${ceiling.toLocaleString("en-IN")}.`,
          status: "PASS",
          applicant_value: `₹${userInc.toLocaleString("en-IN")}`,
          required_value: `≤ ₹${ceiling.toLocaleString("en-IN")}`,
          explanation: `Fully compliant. Margin to ceiling: ₹${(ceiling - userInc).toLocaleString("en-IN")}.`,
          source_title: policy.source_document?.title || "Gazette Guidelines"
        });
      }
    }

    // --- 3. Turnover Limit Check (for Small Business Tax / Grants) ---
    if (policy.max_turnover_limit && policy.max_turnover_limit > 0) {
      if (userTurnover > policy.max_turnover_limit) {
        isHardDisqualified = true;
        const msg = `Business turnover of ₹${userTurnover.toLocaleString("en-IN")} exceeds the maximum eligibility limit of ₹${policy.max_turnover_limit.toLocaleString("en-IN")}.`;
        disqualificationReasons.push(msg);
        ruleDeterminations.push({
          clause: policy.source_document?.clause_reference || "Statutory Turnover Limit",
          rule_text: `Turnover must not exceed ₹${policy.max_turnover_limit.toLocaleString("en-IN")}.`,
          status: "FAIL",
          applicant_value: `₹${userTurnover.toLocaleString("en-IN")}`,
          required_value: `≤ ₹${policy.max_turnover_limit.toLocaleString("en-IN")}`,
          explanation: msg,
          source_title: policy.source_document?.title || "Income Tax Act / MSME Act"
        });
      } else if (userTurnover >= policy.max_turnover_limit * 0.92) {
        isBorderlineFlagged = true;
        const note = `Turnover (₹${userTurnover.toLocaleString("en-IN")}) is above 92% of the statutory threshold. Requires strict audit reconciliation of digital vs non-digital transactions.`;
        borderlineReasons.push(note);
        ruleDeterminations.push({
          clause: policy.source_document?.clause_reference || "Turnover Ceiling",
          rule_text: `Turnover must not exceed ₹${policy.max_turnover_limit.toLocaleString("en-IN")}.`,
          status: "BORDERLINE",
          applicant_value: `₹${userTurnover.toLocaleString("en-IN")}`,
          required_value: `≤ ₹${policy.max_turnover_limit.toLocaleString("en-IN")}`,
          explanation: note,
          source_title: policy.source_document?.title || "Income Tax Act"
        });
      } else {
        passedReasons.push(`Turnover ₹${userTurnover.toLocaleString("en-IN")} is within admissible boundary.`);
        ruleDeterminations.push({
          clause: policy.source_document?.clause_reference || "Turnover Ceiling",
          rule_text: `Turnover must not exceed ₹${policy.max_turnover_limit.toLocaleString("en-IN")}.`,
          status: "PASS",
          applicant_value: `₹${userTurnover.toLocaleString("en-IN")}`,
          required_value: `≤ ₹${policy.max_turnover_limit.toLocaleString("en-IN")}`,
          explanation: "Admissible turnover within prescribed ceiling.",
          source_title: policy.source_document?.title || "Income Tax Act"
        });
      }
    }

    // --- 4. Caste & Category Check ---
    const schemeCat = (policy.beneficiary_category || "").toLowerCase();
    const schemeTg = (policy.target_groups || []).map((g) => g.toLowerCase());
    const isGeneralAllowed =
      schemeCat.includes("all") ||
      schemeCat.includes("general") ||
      policy.id.startsWith("tax-") ||
      ["pmegp", "pmegp-subsidy", "pm-surya-ghar", "pm-vishwakarma", "pm-vishwakarma-grant", "cgtmse-guarantee", "mudra-pmmy"].includes(policy.id);

    if (!isGeneralAllowed) {
      if (hasCaste === "no" || caste === "general") {
        isHardDisqualified = true;
        const msg = `Scheme mandates applicant membership in target social category: ${policy.beneficiary_category}.`;
        disqualificationReasons.push(msg);
        ruleDeterminations.push({
          clause: "Mandate Para 2.1 - Social Target Group",
          rule_text: `Beneficiary must belong to: ${policy.beneficiary_category}`,
          status: "FAIL",
          applicant_value: "General Category",
          required_value: policy.beneficiary_category,
          explanation: msg,
          source_title: policy.source_document?.title || "Statutory Corporation Guidelines"
        });
      } else {
        const matchesCategory =
          schemeCat.includes(caste) ||
          schemeTg.some((t) => t.includes(caste)) ||
          schemeCat.includes("special category") ||
          caste === "any";

        if (!matchesCategory) {
          isHardDisqualified = true;
          const msg = `Applicant category '${caste.toUpperCase()}' does not qualify for ${policy.beneficiary_category}.`;
          disqualificationReasons.push(msg);
          ruleDeterminations.push({
            clause: "Target Group Criterion",
            rule_text: `Must belong to ${policy.beneficiary_category}`,
            status: "FAIL",
            applicant_value: caste.toUpperCase(),
            required_value: policy.beneficiary_category,
            explanation: msg,
            source_title: policy.source_document?.title || "Statutory Guidelines"
          });
        } else {
          passedReasons.push(`Meets social category requirement (${policy.beneficiary_category}).`);
          ruleDeterminations.push({
            clause: "Target Group Criterion",
            rule_text: `Target: ${policy.beneficiary_category}`,
            status: "PASS",
            applicant_value: caste.toUpperCase(),
            required_value: policy.beneficiary_category,
            explanation: "Target social group matched.",
            source_title: policy.source_document?.title || "Statutory Guidelines"
          });
        }
      }
    }

    // --- 5. Gender Check ---
    const isWomenOnly = (schemeCat.includes("women") || schemeTg.includes("women")) && !schemeCat.includes("sc / st / women") && !schemeCat.includes("all");
    if (isWomenOnly && gender !== "female") {
      isHardDisqualified = true;
      const msg = "Exclusive policy benefit restricted to women entrepreneurs / beneficiaries.";
      disqualificationReasons.push(msg);
      ruleDeterminations.push({
        clause: "Target Beneficiary Mandate - Gender",
        rule_text: "Applicant must be Female.",
        status: "FAIL",
        applicant_value: gender,
        required_value: "Female",
        explanation: msg,
        source_title: policy.source_document?.title || "Operational Guidelines"
      });
    }

    // --- 6. Age Check ---
    if (policy.minimum_age && userAge < policy.minimum_age) {
      isHardDisqualified = true;
      const msg = `Age ${userAge} is below statutory minimum age of ${policy.minimum_age}.`;
      disqualificationReasons.push(msg);
      ruleDeterminations.push({
        clause: "Legal Capacity / Minimum Age Clause",
        rule_text: `Must be ≥ ${policy.minimum_age} years.`,
        status: "FAIL",
        applicant_value: `${userAge} years`,
        required_value: `≥ ${policy.minimum_age} years`,
        explanation: msg,
        source_title: policy.source_document?.title || "Guidelines"
      });
    }
    if (policy.maximum_age && userAge > policy.maximum_age) {
      isHardDisqualified = true;
      const msg = `Age ${userAge} exceeds maximum permissible age of ${policy.maximum_age}.`;
      disqualificationReasons.push(msg);
      ruleDeterminations.push({
        clause: "Maximum Age Ceiling Clause",
        rule_text: `Must be ≤ ${policy.maximum_age} years.`,
        status: "FAIL",
        applicant_value: `${userAge} years`,
        required_value: `≤ ${policy.maximum_age} years`,
        explanation: msg,
        source_title: policy.source_document?.title || "Guidelines"
      });
    }

    // --- 7. Verification Proof & Self-Declaration Check (Borderline Trigger) ---
    if (isSelfCertifiedOnly) {
      isBorderlineFlagged = true;
      borderlineReasons.push("Provisional / Self-Certified documents detected without official Gazette revenue seal or CA attestation.");
    }

    // --- 8. Document Gap Analysis ---
    const policyDocs = policy.required_documents || [
      { id: "aadhaar_card", name: "Aadhaar Card", mandatory: true },
      { id: "income_certificate", name: "Income Certificate", mandatory: true }
    ];

    const missingMandatoryDocs = [];
    policyDocs.forEach((doc) => {
      const isProvided = providedDocs.some((d) => d.includes(doc.id) || doc.id.includes(d));
      if (!isProvided && doc.mandatory) {
        missingMandatoryDocs.push(doc);
      }
    });

    if (missingMandatoryDocs.length > 0 && !isHardDisqualified) {
      isBorderlineFlagged = true;
      borderlineReasons.push(`Missing ${missingMandatoryDocs.length} mandatory supporting document(s): ${missingMandatoryDocs.map((d) => d.name).join(", ")}`);
    }

    // --- 9. Final Triage Status Decision ---
    let triageStatus = "ELIGIBLE";
    let triageBadge = {
      label: "Clearly Eligible",
      color: "green",
      bgClass: "bg-emerald-50 text-emerald-800 border-emerald-300",
      icon: "CheckCircle2"
    };

    if (isHardDisqualified) {
      triageStatus = "INELIGIBLE";
      triageBadge = {
        label: "Clearly Ineligible",
        color: "red",
        bgClass: "bg-rose-50 text-rose-800 border-rose-300",
        icon: "XCircle"
      };
    } else if (isBorderlineFlagged) {
      triageStatus = "BORDERLINE_MANUAL_REVIEW";
      triageBadge = {
        label: "Manual Review Required",
        color: "amber",
        bgClass: "bg-amber-50 text-amber-800 border-amber-300",
        icon: "AlertTriangle"
      };
    }

    // --- 10. Quantified Benefit Calculation ---
    let benefitEstimate = null;
    if (policy.benefit_formula?.calculateBenefit) {
      benefitEstimate = policy.benefit_formula.calculateBenefit({
        ...formData,
        amount: userAmt,
        income: userInc,
        turnover: userTurnover,
        area: urbanRural,
        gender,
        caste
      });
    } else {
      // Default loan / subsidy benefit calculation
      const subsidyPct = policy.subsidy_percentage || 0;
      const subAmt = subsidyPct > 0 ? Math.round((userAmt * subsidyPct) / 100) : 0;
      const interestRate = policy.interest_rate_min || 4;
      const commercialRate = 12;
      const annualInterestSaved = Math.round(userAmt * ((commercialRate - interestRate) / 100));

      benefitEstimate = {
        amount: subAmt > 0 ? subAmt : userAmt,
        formatted: subAmt > 0 ? `₹${subAmt.toLocaleString("en-IN")}` : `₹${userAmt.toLocaleString("en-IN")}`,
        label: subAmt > 0 ? `${subsidyPct}% Capital Subsidy` : `Concessional Loan at ${interestRate}% p.a.`,
        breakdown: [
          subAmt > 0 ? `Government Direct Subsidy: ₹${subAmt.toLocaleString("en-IN")}` : `Subsidized credit limit up to ${policy.maxAmount || "₹5 Lakh"}`,
          `Interest Rate: ${interestRate}% p.a. vs commercial ~12% (Saves ~₹${annualInterestSaved.toLocaleString("en-IN")}/yr)`,
          `Moratorium grace period: ${policy.moratorium_period || 6} months`,
        ]
      };
    }

    // Match Score
    let score = 50;
    if (triageStatus === "ELIGIBLE") score = 92;
    if (triageStatus === "BORDERLINE_MANUAL_REVIEW") score = 68;
    if (triageStatus === "INELIGIBLE") score = 15;

    // Rural bonus
    if (urbanRural === "rural" && (policy.subsidy_percentage > 0 || policy.id === "pmegp-subsidy")) {
      score += 5;
    }

    return {
      ...getLocalizedScheme(policy, lang),
      ...policy,
      triage_status: triageStatus,
      triage_badge: triageBadge,
      matchScore: Math.min(score, 99),
      match: `${Math.min(score, 99)}%`,
      rule_determinations: ruleDeterminations,
      passed_reasons: passedReasons,
      disqualification_reasons: disqualificationReasons,
      borderline_reasons: borderlineReasons,
      why: triageStatus === "ELIGIBLE"
        ? passedReasons.join(" ") || "All statutory criteria satisfied."
        : triageStatus === "BORDERLINE_MANUAL_REVIEW"
        ? borderlineReasons.join(" ")
        : disqualificationReasons.join(" "),
      benefit_estimate: benefitEstimate,
      estimatedSubsidy: benefitEstimate?.formatted || "Nil",
      document_analysis: {
        all_required: policyDocs,
        missing: missingMandatoryDocs,
        provided_count: policyDocs.length - missingMandatoryDocs.length,
        total_count: policyDocs.length,
        completeness_percent: Math.round(((policyDocs.length - missingMandatoryDocs.length) / Math.max(1, policyDocs.length)) * 100)
      },
      source_citation: {
        title: policy.source_document?.title || "Statutory Operational Guidelines",
        clause: policy.source_document?.clause_reference || "Eligibility Provisions",
        notification_no: policy.source_document?.notification_no || "Official Gazette",
        gazette_url: policy.source_document?.gazette_url || policy.link || "#",
        authority: policy.authority || "Government of India"
      }
    };
  });

  // Sort: Eligible first, then Borderline, then Ineligible
  return evaluatedResults.sort((a, b) => {
    const order = { ELIGIBLE: 0, BORDERLINE_MANUAL_REVIEW: 1, INELIGIBLE: 2 };
    if (order[a.triage_status] !== order[b.triage_status]) {
      return order[a.triage_status] - order[b.triage_status];
    }
    return b.matchScore - a.matchScore;
  });
}
