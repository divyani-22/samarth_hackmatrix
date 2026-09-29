import { schemes } from "../src/data/schemes.js";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const districtData = [
    {
      district: "Pune Urban (Shivajinagar)",
      applicants: 540,
      sanctioned: 412,
      absorption: "76.3%",
      topScheme: "Mahila Samriddhi Yojana (MSY)",
      state: "Maharashtra",
    },
    {
      district: "Pimpri-Chinchwad (Auto Hub)",
      applicants: 468,
      sanctioned: 355,
      absorption: "75.8%",
      topScheme: "PMEGP Capital Subsidy",
      state: "Maharashtra",
    },
    {
      district: "Haveli / Hadapsar",
      applicants: 384,
      sanctioned: 274,
      absorption: "71.3%",
      topScheme: "NSFDC Term Loan",
      state: "Maharashtra",
    },
    {
      district: "Baramati (Agri-Cluster)",
      applicants: 312,
      sanctioned: 228,
      absorption: "73.1%",
      topScheme: "PMEGP Rural Enterprise",
      state: "Maharashtra",
    },
    {
      district: "Shirur / Ranjangaon",
      applicants: 245,
      sanctioned: 182,
      absorption: "74.2%",
      topScheme: "CGTMSE Credit Guarantee",
      state: "Maharashtra",
    },
    {
      district: "Khed / Chakan Industrial Area",
      applicants: 218,
      sanctioned: 156,
      absorption: "71.5%",
      topScheme: "Section 44AD Presumptive",
      state: "Maharashtra",
    },
    {
      district: "Maval / Talegaon",
      applicants: 195,
      sanctioned: 138,
      absorption: "70.7%",
      topScheme: "PM Vishwakarma Traditional Trades",
      state: "Maharashtra",
    },
    {
      district: "Daund / Indapur",
      applicants: 174,
      sanctioned: 115,
      absorption: "66.1%",
      topScheme: "Micro-Credit Finance (MCF)",
      state: "Maharashtra",
    },
  ];

  const intermediaryAbsorption = [
    {
      channel: "Public Sector Banks (PSBs)",
      allocation: "₹65.0 Cr",
      absorbed: "₹52.8 Cr",
      rate: 81.2,
    },
    {
      channel: "Maharashtra Gramin Bank & Lead Bank",
      allocation: "₹38.0 Cr",
      absorbed: "₹29.6 Cr",
      rate: 77.9,
    },
    {
      channel: "State Channelizing Agencies (SCAs)",
      allocation: "₹18.5 Cr",
      absorbed: "₹12.4 Cr",
      rate: 67.0,
    },
    {
      channel: "Urban / District Co-op Banks",
      allocation: "₹8.5 Cr",
      absorbed: "₹5.2 Cr",
      rate: 61.2,
    },
  ];

  return res.status(200).json({
    success: true,
    timestamp: new Date().toISOString(),
    system: {
      platform: "Samarth National Telemetry System",
      nodal_ministry: "National Citizen Welfare",
      scheme_count: schemes.length,
    },
    kpis: {
      activePartners: 38,
      verifiedDossiers: 1958,
      qualificationRate: "88.4%",
      totalPipelineCr: "₹24.8 Cr",
      avgProcessingDays: 3.2,
    },
    districtDemand: districtData,
    intermediaryAbsorption,
  });
}
