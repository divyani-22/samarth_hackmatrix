import React from "react";

export default function FinanceLogo({ className = "w-9 h-9", size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFA048" />
          <stop offset="50%" stopColor="#FF6B3D" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>

        <linearGradient id="coinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        <linearGradient id="vectorGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B3D" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>

        <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#FF6B3D" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Protective Financial Shield Contour */}
      <path
        d="M 24 5 L 40 11 C 40 26 33 37 24 43 C 15 37 8 26 8 11 L 24 5 Z"
        stroke="url(#shieldGrad)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Central Currency Coin Node */}
      <circle
        cx="24"
        cy="24"
        r="10"
        fill="url(#coinGrad)"
        filter="url(#shadowFilter)"
      />

      {/* Inner Coin Rim */}
      <circle
        cx="24"
        cy="24"
        r="7.5"
        stroke="#FFFFFF"
        strokeWidth="1.2"
        strokeOpacity="0.6"
        fill="none"
      />

      {/* Inner Prosperity Star / Capital Spark */}
      <path
        d="M 24 19.5 L 25.2 22.8 L 28.5 24 L 25.2 25.2 L 24 28.5 L 22.8 25.2 L 19.5 24 L 22.8 22.8 Z"
        fill="#FFFFFF"
        fillOpacity="0.9"
      />

      {/* Dynamic Breakout Surge Arrow Vector */}
      <path
        d="M 12 30 L 22 20 L 29 25 L 39 12"
        stroke="url(#vectorGrad)"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Surge Arrow Apex Head */}
      <path
        d="M 31 11 L 41 11 L 41 21 Z"
        fill="url(#vectorGrad)"
        stroke="url(#vectorGrad)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
