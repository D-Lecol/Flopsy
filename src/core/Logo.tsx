export default function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width="128"
      height="128"
    >
      <defs>
        <linearGradient id="favBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1c2336"></stop>
          <stop offset="100%" stop-color="#0a0e1a"></stop>
        </linearGradient>
        <linearGradient id="favTerracotta" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff934b"></stop>
          <stop offset="100%" stop-color="#d96b27"></stop>
        </linearGradient>
        <linearGradient id="favMint" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00f2fe"></stop>
          <stop offset="100%" stop-color="#0f9f75"></stop>
        </linearGradient>
        <filter id="favGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur"></feGaussianBlur>
          <feComposite
            in="SourceGraphic"
            in2="blur"
            operator="over"
          ></feComposite>
        </filter>
      </defs>

      <rect
        x="6"
        y="6"
        width="116"
        height="116"
        rx="26"
        fill="url(#favBg)"
        stroke="#394560"
        stroke-width="2"
      ></rect>

      <g transform="translate(11, 10) scale(0.83)">
        <path
          d="M18 64 L38 44 L86 44"
          fill="none"
          stroke="#2a354c"
          stroke-width="2.5"
          stroke-linecap="round"
        ></path>
        <path
          d="M64 104 L94 74 L106 74"
          fill="none"
          stroke="#2a354c"
          stroke-width="2.5"
          stroke-linecap="round"
        ></path>
        <circle cx="18" cy="64" r="3" fill="#2a354c"></circle>
        <circle cx="106" cy="74" r="3" fill="#2a354c"></circle>

        <rect
          x="36"
          y="28"
          width="18"
          height="68"
          rx="5"
          fill="url(#favTerracotta)"
        ></rect>

        <path
          d="M46 28 L92 28 C95 28 97.5 30.5 97.5 33.5 L97.5 43.5 C97.5 46.5 95 49 92 49 L54 49 Z"
          fill="url(#favTerracotta)"
        ></path>

        <circle cx="90" cy="38.5" r="3.5" fill="#ffffff"></circle>

        <path
          d="M46 57 L80 57 C83 57 85 59 85 62 L85 70 C85 73 83 75 80 75 L54 75 Z"
          fill="url(#favTerracotta)"
        ></path>

        <circle
          cx="78"
          cy="66"
          r="3"
          fill="#00f2fe"
          filter="url(#favGlow)"
        ></circle>

        <rect
          x="25"
          y="38"
          width="7"
          height="4.5"
          rx="1.5"
          fill="#ff934b"
        ></rect>
        <rect
          x="25"
          y="50"
          width="7"
          height="4.5"
          rx="1.5"
          fill="#ff934b"
        ></rect>
        <rect
          x="25"
          y="62"
          width="7"
          height="4.5"
          rx="1.5"
          fill="#ff934b"
        ></rect>
        <rect
          x="25"
          y="74"
          width="7"
          height="4.5"
          rx="1.5"
          fill="#ff934b"
        ></rect>

        <path
          d="M45 96 L45 105 L76 105"
          fill="none"
          stroke="url(#favMint)"
          stroke-width="3"
          stroke-linecap="round"
        ></path>
        <circle
          cx="76"
          cy="105"
          r="3.5"
          fill="#00f2fe"
          filter="url(#favGlow)"
        ></circle>
      </g>
    </svg>
  );
}
