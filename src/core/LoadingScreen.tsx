export default function LoadingScreen() {
  return (
    <>
      <div
        className="w-full h-screen flex items-center justify-center"
        id="animated-svg-ANIMATION_29"
      >
        <svg
          height="240"
          viewBox="0 0 600 240"
          width="600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="animTerracotta"
              x1="0%"
              x2="100%"
              y1="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ff9d5c"></stop>
              <stop offset="50%" stopColor="#e86b24"></stop>
              <stop offset="100%" stopColor="#b84d14"></stop>
            </linearGradient>
            <linearGradient id="animMint" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe"></stop>
              <stop offset="100%" stopColor="#05c48f"></stop>
            </linearGradient>
            <linearGradient id="animBgGrad" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#1c2336"></stop>
              <stop offset="100%" stopColor="#0a0f1d"></stop>
            </linearGradient>
            <linearGradient
              id="pulseGlowGrad"
              x1="0%"
              x2="100%"
              y1="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#00f2fe" stop-opacity="0"></stop>
              <stop offset="50%" stopColor="#00f2fe" stop-opacity="0.9"></stop>
              <stop offset="100%" stopColor="#05c48f" stop-opacity="0"></stop>
            </linearGradient>

            <filter
              height="160%"
              id="loaderGlow"
              width="160%"
              x="-30%"
              y="-30%"
            >
              <feGaussianBlur result="blur" stdDeviation="3.5"></feGaussianBlur>
              <feMerge>
                <feMergeNode in="blur"></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
              </feMerge>
            </filter>
            <filter
              height="140%"
              id="softShadow"
              width="140%"
              x="-20%"
              y="-20%"
            >
              <feDropShadow
                dx="0"
                dy="8"
                flood-color="#000000"
                flood-opacity="0.35"
                stdDeviation="8"
              ></feDropShadow>
            </filter>
          </defs>

          <rect
            fill="url(#animBgGrad)"
            filter="url(#softShadow)"
            height="220"
            rx="20"
            stroke="#2b364e"
            stroke-width="2"
            width="580"
            x="10"
            y="10"
          ></rect>

          <g transform="translate(36, 32)">
            <rect
              fill="#131927"
              height="128"
              rx="26"
              stroke="#36435f"
              stroke-width="1.8"
              width="128"
              x="0"
              y="0"
            ></rect>

            <g opacity="0.35">
              <path
                d="M64 22 L106 46 L64 70 L22 46 Z"
                fill="none"
                stroke="#2c374e"
                stroke-width="1.5"
              ></path>
              <path
                d="M64 70 L106 94 L64 118 L22 94 Z"
                fill="none"
                stroke="#2c374e"
                stroke-width="1.5"
              ></path>
              <circle
                cx="64"
                cy="64"
                fill="none"
                r="44"
                stroke="#222b3d"
                stroke-dasharray="4 4"
                stroke-width="1"
              ></circle>
            </g>

            <g className="orbit-scan" opacity="0.35">
              <line
                stroke="url(#pulseGlowGrad)"
                stroke-linecap="round"
                stroke-width="2"
                x1="64"
                x2="64"
                y1="64"
                y2="20"
              ></line>
            </g>

            <path
              d="M30 68 L64 50 L98 68"
              fill="none"
              stroke="#1d303b"
              stroke-linecap="round"
              stroke-width="3"
            ></path>
            <path
              className="wire-stream"
              d="M30 68 L64 50 L98 68"
              fill="none"
              filter="url(#loaderGlow)"
              stroke="url(#animMint)"
              stroke-linecap="round"
              stroke-width="2.5"
            ></path>

            <rect
              className="bus-pin-1"
              fill="#ff9d5c"
              height="4.5"
              rx="1.5"
              width="7"
              x="26"
              y="44"
            ></rect>
            <rect
              className="bus-pin-2"
              fill="#ff9d5c"
              height="4.5"
              rx="1.5"
              width="7"
              x="26"
              y="56"
            ></rect>
            <rect
              className="bus-pin-3"
              fill="#ff9d5c"
              height="4.5"
              rx="1.5"
              width="7"
              x="26"
              y="68"
            ></rect>
            <rect
              className="bus-pin-4"
              fill="#ff9d5c"
              height="4.5"
              rx="1.5"
              width="7"
              x="26"
              y="80"
            ></rect>

            <rect
              fill="url(#animTerracotta)"
              height="60"
              rx="4.5"
              width="17"
              x="36"
              y="34"
            ></rect>

            <path
              d="M46 34 L90 34 C93.5 34 96 36.5 96 40 L96 48 C96 51.5 93.5 54 90 54 L52 54 Z"
              fill="url(#animTerracotta)"
            ></path>

            <circle cx="90.5" cy="44" fill="#ffffff" r="3.5"></circle>

            <path
              d="M46 60 L78 60 C81 60 83 62 83 65 L83 73 C83 75 81 77 78 77 L52 77 Z"
              fill="url(#animTerracotta)"
            ></path>

            <circle
              className="pulse-node-center"
              cx="78"
              cy="68.5"
              fill="#00f2fe"
              r="3.5"
            ></circle>

            <path
              d="M45 94 L45 106 L68 106"
              fill="none"
              stroke="#163836"
              stroke-linecap="round"
              stroke-width="2.5"
            ></path>
            <path
              className="wire-stream"
              d="M45 94 L45 106 L68 106"
              fill="none"
              stroke="url(#animMint)"
              stroke-linecap="round"
              stroke-width="2.2"
            ></path>
            <circle
              className="pulse-node-bottom"
              cx="68"
              cy="106"
              fill="#00f2fe"
              r="3.5"
            ></circle>
          </g>

          <g transform="translate(196, 44)">
            <text
              fill="#f6f9ff"
              font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              font-size="56"
              font-weight="900"
              letter-spacing="3"
              x="0"
              y="58"
            >
              FLOP
              <tspan className="flopsy-sy" fill="#e86b24">
                SY
              </tspan>
            </text>

            <g transform="translate(0, 74)">
              <rect
                fill="#182030"
                height="24"
                rx="4"
                stroke="#2d3850"
                stroke-width="1"
                width="154"
                x="0"
                y="0"
              ></rect>
              <circle cx="12" cy="12" fill="#00f2fe" r="3.5">
                <animate
                  attributeName="opacity"
                  dur="1.2s"
                  repeatCount="indefinite"
                  values="0.3;1;0.3"
                ></animate>
              </circle>
              <text
                fill="#00f2fe"
                font-family="'Space Grotesk', monospace"
                font-size="10.5"
                font-weight="700"
                letter-spacing="1.5"
                x="22"
                y="16.5"
              >
                CHARGEMENT DU SYSTÈME
              </text>
              <text
                fill="#75829d"
                font-family="'Space Grotesk', sans-serif"
                font-size="11"
                font-weight="600"
                letter-spacing="1.8"
                x="170"
                y="16.5"
              >
                GRID • COMPUTE • RESOURCES
              </text>
            </g>

            <g transform="translate(0, 114)">
              <rect
                fill="#171e2c"
                height="7"
                rx="3.5"
                stroke="#29344c"
                stroke-width="1"
                width="345"
                x="0"
                y="0"
              ></rect>

              <rect
                fill="url(#animTerracotta)"
                height="5"
                rx="2.5"
                width="110"
                x="0"
                y="1"
              >
                <animate
                  attributeName="x"
                  calcMode="spline"
                  dur="2.4s"
                  keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
                  repeatCount="indefinite"
                  values="0;235;0"
                ></animate>
              </rect>

              <rect
                fill="url(#animMint)"
                height="5"
                opacity="0.85"
                rx="2.5"
                width="40"
                x="0"
                y="1"
              >
                <animate
                  attributeName="x"
                  calcMode="spline"
                  dur="1.8s"
                  keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
                  repeatCount="indefinite"
                  values="20;305;20"
                ></animate>
              </rect>

              <text
                fill="#586580"
                font-family="'Space Grotesk', monospace"
                font-size="9.5"
                font-weight="600"
                letter-spacing="1.2"
                x="0"
                y="24"
              >
                INITIALISATION DES MATRICES DE SIMULATION
              </text>

              <text
                fill="#e86b24"
                font-family="'Space Grotesk', monospace"
                font-size="9.5"
                font-weight="700"
                letter-spacing="1"
                text-anchor="end"
                x="345"
                y="24"
              >
                MOD: v0.8.4
              </text>
            </g>
          </g>
        </svg>
      </div>

      <style>
        {`
        @keyframes energyDash {
    0% {
        stroke-dashoffset: 200;
    }
    100% {
        stroke-dashoffset: 0;
    }
}

@keyframes pulseNode {
    0%, 100% {
        transform: scale(1);
        opacity: 0.85;
        filter: drop-shadow(0 0 2px #00f2fe);
    }
    50% {
        transform: scale(1.35);
        opacity: 1;
        filter: drop-shadow(0 0 8px #00f2fe);
    }
}

@keyframes computeBlink1 {
    0%, 100% {
        opacity: 0.3;
    }
    25% {
        opacity: 1;
    }
}

@keyframes computeBlink2 {
    0%, 100% {
        opacity: 0.3;
    }
    50% {
        opacity: 1;
    }
}

@keyframes computeBlink3 {
    0%, 100% {
        opacity: 0.3;
    }
    75% {
        opacity: 1;
    }
}

@keyframes computeBlink4 {
    0%, 100% {
        opacity: 0.3;
    }
    90% {
        opacity: 1;
    }
}

@keyframes radarSpin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes letterPulse {
    0%, 100% {
        opacity: 0.85;
    }
    50% {
        opacity: 1;
        filter: drop-shadow(0 0 6px rgba(232, 107, 36, 0.45));
    }
}

@keyframes loadingDots {
    0% {
        content: '.';
    }
    33% {
        content: '..';
    }
    66% {
        content: '...';
    }
}

.pulse-node-center {
    transform-origin: 78px 84px;
    animation: pulseNode 1.8s ease-in-out infinite;
}

.pulse-node-bottom {
    transform-origin: 68px 120px;
    animation: pulseNode 2.2s ease-in-out infinite 0.5s;
}

.bus-pin-1 {
    animation: computeBlink1 1.6s ease-in-out infinite;
}

.bus-pin-2 {
    animation: computeBlink2 1.6s ease-in-out infinite 0.2s;
}

.bus-pin-3 {
    animation: computeBlink3 1.6s ease-in-out infinite 0.4s;
}

.bus-pin-4 {
    animation: computeBlink4 1.6s ease-in-out infinite 0.6s;
}

.wire-stream {
    stroke-dasharray: 12, 12;
    animation: energyDash 1.4s linear infinite;
}

.orbit-scan {
    transform-origin: 64px 64px;
    animation: radarSpin 6s linear infinite;
}

.flopsy-sy {
    animation: letterPulse 2.4s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
    *, .wire-stream, .orbit-scan, .pulse-node-center, .pulse-node-bottom, .bus-pin-1, .bus-pin-2, .bus-pin-3, .bus-pin-4 {
        animation: none !important;
    }
}
        `}
      </style>
    </>
  );
}
