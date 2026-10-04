import React, { useState } from "react";
import { Search, MapPin, Building2, Phone, ExternalLink, ShieldCheck, Sparkles, Navigation } from "lucide-react";
import { partners } from "../data/partners";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function PartnersPage({ lang = "en" }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [partnerType, setPartnerType] = useState("");
  const [selectedPartner, setSelectedPartner] = useState(null);

  const filteredPartners = partners.filter((p) => {
    const matchSearch =
      searchTerm === "" ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchType = partnerType === "" || p.partner_type === partnerType;

    return matchSearch && matchType;
  });

  return (
    <div className="w-full min-h-[85vh] bg-[#F2F2F2] py-8 px-4 sm:px-6 lg:px-8 text-[#111111]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E5] text-xs font-bold text-neutral-600 shadow-xs mb-2">
              <Sparkles size={13} className="text-[#FF6B3D]" />
              <span>Geo-Spatial Nodal Routing</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#111111] font-['Urbanist',sans-serif]">
              Locate Channel Partners & SCAs
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500">
              Find verified State Channelizing Agencies, Public Banks, and CSC centers near you.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search size={15} className="text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search city, district, branch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2.5 rounded-full bg-white border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-[#FF6B3D]"
              />
            </div>

            <select
              value={partnerType}
              onChange={(e) => setPartnerType(e.target.value)}
              className="px-4 py-2.5 rounded-full bg-white border border-neutral-300 text-xs font-bold text-neutral-700 cursor-pointer focus:outline-none"
            >
              <option value="">All Institutions</option>
              <option value="Public Sector Bank">Public Sector Bank</option>
              <option value="Private Sector Bank">Private Sector Bank</option>
              <option value="Regional Rural Bank">Regional Rural Bank</option>
            </select>
          </div>
        </div>

        {/* Map & List Bento Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[72vh]">
          
          {/* Partners Scrollable List (Left, span 5) */}
          <div className="lg:col-span-5 bg-white p-4 rounded-[28px] border border-[#E5E5E5] shadow-bento-soft flex flex-col overflow-hidden">
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3 px-2">
              Verified Centers ({filteredPartners.length})
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {filteredPartners.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPartner(p)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedPartner?.id === p.id
                      ? "bg-[#111111] text-white border-transparent shadow-md"
                      : "bg-[#F8F9FA] text-[#111111] border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold font-['Urbanist',sans-serif]">{p.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      selectedPartner?.id === p.id ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-800"
                    }`}>
                      {p.type}
                    </span>
                  </div>

                  <div className={`text-[11px] mt-1.5 flex items-center justify-between ${
                    selectedPartner?.id === p.id ? "text-neutral-300" : "text-neutral-500"
                  }`}>
                    <span>{p.dist} away</span>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF6B3D] font-bold hover:underline flex items-center gap-1"
                    >
                      <Navigation size={11} />
                      <span>Directions</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaflet Map (Right, span 7) */}
          <div className="lg:col-span-7 rounded-[28px] overflow-hidden border border-[#E5E5E5] shadow-bento-soft relative">
            <MapContainer
              center={selectedPartner ? [selectedPartner.lat, selectedPartner.lng] : [18.5204, 73.8567]}
              zoom={selectedPartner ? 13 : 11}
              style={{ height: "100%", width: "100%" }}
              zoomControl={false}
            >
              <ZoomControl position="bottomright" />
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {filteredPartners.map((p) => (
                <Marker key={p.id} position={[p.lat, p.lng]}>
                  <Popup>
                    <div className="text-xs font-sans">
                      <strong className="text-sm font-bold">{p.name}</strong>
                      <div className="text-neutral-500 mt-1">{p.type} • {p.dist}</div>
                      <div className="mt-2 text-emerald-700 font-bold">✓ Accepting Scheme Applications</div>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block bg-[#FF6B3D] text-white px-3 py-1 rounded-full text-[10px] font-bold"
                      >
                        Get Directions
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

        </div>

      </div>
    </div>
  );
}
