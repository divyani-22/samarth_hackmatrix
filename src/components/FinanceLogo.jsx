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
        <linearGradient id="finGradPrimary" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B3D" />
          <stop offset="100%" stopColor="#FFA048" />
        </linearGradient>
        <linearGradient id="finGradArrow" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF5722" />
          <stop offset="50%" stopColor="#FF8A48" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="finGradGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Growth Bar 1 */}
      <rect
        x="6"
        y="26"
        width="8"
        height="16"
        rx="4"
        fill="url(#finGradPrimary)"
      />

      {/* Growth Bar 2 */}
      <rect
        x="18"
        y="18"
        width="8"
        height="24"
        rx="4"
        fill="url(#finGradPrimary)"
      />

      {/* Growth Bar 3 */}
      <rect
        x="30"
        y="10"
        width="8"
        height="32"
        rx="4"
        fill="url(#finGradPrimary)"
      />

      {/* Dynamic Rising Trajectory Curve / Arrow */}
      <path
        d="M 6 30 C 14 26, 26 18, 38 7"
        stroke="url(#finGradArrow)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Arrowhead */}
      <path
        d="M 29 6 L 40 6 L 40 17 Z"
        fill="url(#finGradArrow)"
        strokeLinejoin="round"
      />

      {/* Sparkle Node */}
      <circle cx="40" cy="6" r="2.5" fill="#FBBF24" />
    </svg>
  );
}
