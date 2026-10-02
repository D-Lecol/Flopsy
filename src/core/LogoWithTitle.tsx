export default function LogoWithTitle() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 160"
      width="auto"
      height="70"
    >
      <defs>
        <linearGradient id="terracottaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff8c42" />
          <stop offset="100%" stop-color="#d96b27" />
        </linearGradient>
        <linearGradient id="mintGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00f2fe" />
          <stop offset="100%" stop-color="#0f9f75" />
        </linearGradient>
        <linearGradient id="bgIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e2538" />
          <stop offset="100%" stop-color="#0e1321" />
        </linearGradient>
        <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g transform="translate(18, 16)">
        <rect
          x="0"
          y="0"
          width="128"
          height="128"
          rx="28"
          fill="url(#bgIconGrad)"
          stroke="#38435d"
          stroke-width="2"
        />

        <path
          d="M64 24 L104 47 L64 70 L24 47 Z"
          fill="none"
          stroke="#2a354c"
          stroke-width="1.5"
        />
        <path
          d="M64 70 L104 93 L64 116 L24 93 Z"
          fill="none"
          stroke="#2a354c"
          stroke-width="1.5"
        />

        <path
          d="M36 68 L64 52 L92 68"
          fill="none"
          stroke="url(#mintGrad)"
          stroke-width="2.5"
          stroke-linecap="round"
          opacity="0.85"
        />

        <rect
          x="38"
          y="34"
          width="16"
          height="60"
          rx="4"
          fill="url(#terracottaGrad)"
        />

        <path
          d="M48 34 L90 34 C93 34 95 36 95 39 L95 47 C95 50 93 52 90 52 L54 52 Z"
          fill="url(#terracottaGrad)"
        />
        <circle cx="90" cy="43" r="3.5" fill="#ffffff" />

        <path
          d="M48 60 L78 60 C80 60 82 62 82 64 L82 72 C82 74 80 76 78 76 L54 76 Z"
          fill="url(#terracottaGrad)"
        />
        <circle
          cx="78"
          cy="68"
          r="3"
          fill="#00f2fe"
          filter="url(#subtleGlow)"
        />

        <rect
          x="28"
          y="44"
          width="6"
          height="4"
          rx="1"
          fill="#d96b27"
          opacity="0.9"
        />
        <rect
          x="28"
          y="56"
          width="6"
          height="4"
          rx="1"
          fill="#d96b27"
          opacity="0.9"
        />
        <rect
          x="28"
          y="68"
          width="6"
          height="4"
          rx="1"
          fill="#d96b27"
          opacity="0.9"
        />
        <rect
          x="28"
          y="80"
          width="6"
          height="4"
          rx="1"
          fill="#d96b27"
          opacity="0.9"
        />

        <circle cx="46" cy="94" r="2.5" fill="#00f2fe" />
        <path
          d="M46 94 L46 104 L68 104"
          fill="none"
          stroke="url(#mintGrad)"
          stroke-width="2"
          stroke-linecap="round"
        />
        <circle cx="68" cy="104" r="3" fill="#00f2fe" />
      </g>

      <g transform="translate(170, 0)">
        <text
          x="0"
          y="88"
          font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          font-size="64"
          font-weight="900"
          letter-spacing="4"
          fill="#161b2a"
        >
          FLOP
          <tspan fill="#d96b27">SY</tspan>
        </text>

        <rect
          x="2"
          y="104"
          width="138"
          height="24"
          rx="4"
          fill="#edf4fd"
          stroke="#d4dbe3"
          stroke-width="1"
        />
        <text
          x="10"
          y="120"
          font-family="'Space Grotesk', monospace"
          font-size="11"
          font-weight="700"
          letter-spacing="1.5"
          fill="#d96b27"
        >
          AI TYCOON // SIM
        </text>

        <text
          x="154"
          y="120"
          font-family="'Space Grotesk', sans-serif"
          font-size="12"
          font-weight="600"
          letter-spacing="2"
          fill="#5c6479"
        >
          GRID • COMPUTE • RESOURCES
        </text>
      </g>
    </svg>
  );
}
