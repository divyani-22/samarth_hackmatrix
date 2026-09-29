// In-memory persistent state for serverless lifetime
let dossierStore = [
  {
    id: "SAMARTH-SC-2026-84912",
    applicant: "Pooja Shinde",
    purpose: "Tailoring Boutique",
    scheme: "Mahila Samriddhi Yojana (MSY)",
    branch: "SBI Pune Camp Branch",
    district: "Pune",
    state: "Maharashtra",
    amount: "₹1,40,000",
    date: "20 Sep 2026",
    status: "Dossier Downloaded & Verified",
  },
  {
    id: "SAMARTH-SC-2026-58219",
    applicant: "Rohit Gaikwad",
    purpose: "Electronics Repair Kiosk",
    scheme: "Suvidha Loan",
    branch: "Bank of Maharashtra Shivajinagar",
    district: "Pune",
    state: "Maharashtra",
    amount: "₹3,00,000",
    date: "19 Sep 2026",
    status: "Dossier Downloaded & Verified",
  },
  {
    id: "SAMARTH-OBC-2026-39144",
    applicant: "Mintu Jadhav",
    purpose: "Brass & Metal Artisan Workshop",
    scheme: "NBCFDC Shilp Sampada Scheme",
    branch: "Maharashtra Gramin Bank Hadapsar",
    district: "Pune",
    state: "Maharashtra",
    amount: "₹4,50,000",
    date: "19 Sep 2026",
    status: "Branch Pre-Screening Passed",
  },
  {
    id: "SAMARTH-SC-2026-21804",
    applicant: "Anjali Kamble",
    purpose: "Organic Vermicompost Unit",
    scheme: "NSFDC Green Business Scheme",
    branch: "Canara Bank Kothrud",
    district: "Pune",
    state: "Maharashtra",
    amount: "₹2,50,000",
    date: "18 Sep 2026",
    status: "Dossier Downloaded & Verified",
  },
];

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    const { id } = req.query || {};
    if (id) {
      const match = dossierStore.find((d) => d.id === id);
      if (!match) {
        return res
          .status(404)
          .json({ success: false, error: "Dossier not found" });
      }
      return res.status(200).json({ success: true, dossier: match });
    }
    return res.status(200).json({
      success: true,
      count: dossierStore.length,
      dossiers: dossierStore,
    });
  }

  if (req.method === "POST") {
    try {
      const body = req.body || {};
      const generatedId =
        body.id ||
        `SAMARTH-${body.category || "SC"}-2026-${Math.floor(10000 + Math.random() * 90000)}`;

      const newRecord = {
        id: generatedId,
        applicant: body.applicant || "Beneficiary Applicant",
        purpose: body.purpose || "Self-Employment Enterprise",
        scheme: body.scheme || "NSFDC Term Loan Scheme",
        branch: body.branch || "Designated Public Sector Bank",
        district: body.district || "Pune",
        state: body.state || "Maharashtra",
        amount: body.amount
          ? `₹${Number(body.amount).toLocaleString("en-IN")}`
          : "₹3,00,000",
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        status: "Dossier Downloaded & Verified",
        checklistComplete: true,
      };

      dossierStore.unshift(newRecord);
      if (dossierStore.length > 50) dossierStore.pop();

      return res.status(201).json({
        success: true,
        message:
          "Application Dossier registered successfully in National Telemetry Audit Trail",
        dossier: newRecord,
      });
    } catch (err) {
      console.error("Error in /api/dossier POST:", err);
      return res
        .status(500)
        .json({
          success: false,
          error: "Failed to record application dossier",
        });
    }
  }

  return res.status(405).json({ success: false, error: "Method not allowed" });
}
