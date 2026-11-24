// Ikon garis sederhana untuk section bergaya mockup (Layanan & Tentang Kami).
const Svg = ({ size = 24, children, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
);

export const IconCart = (p) => (
  <Svg {...p}>
    <circle cx="9" cy="20" r="1.4" />
    <circle cx="18" cy="20" r="1.4" />
    <path d="M2.5 3.5h2.8l2.2 11.2a1.5 1.5 0 001.5 1.2h8.2a1.5 1.5 0 001.5-1.1L20.5 8H6.2" />
  </Svg>
);

export const IconChart = (p) => (
  <Svg {...p}>
    <path d="M4 20V11M10 20V5M16 20v-6M3 20.5h18" />
  </Svg>
);

export const IconTrophy = (p) => (
  <Svg {...p}>
    <path d="M8 4h8v5a4 4 0 01-8 0V4zM8 6H4.5A2.5 2.5 0 007 10M16 6h3.5A2.5 2.5 0 0117 10M12 13v4M8.5 20h7M10 17h4" />
  </Svg>
);

export const IconShield = (p) => (
  <Svg {...p}>
    <path d="M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6L12 3z" />
    <path d="M8.7 12l2.4 2.4 4.3-4.6" />
  </Svg>
);

export const IconPuzzle = (p) => (
  <Svg {...p}>
    <path d="M10 4.5a2 2 0 114 0V6h3.5A1.5 1.5 0 0119 7.5V11h-1.5a2 2 0 100 4H19v3.5a1.5 1.5 0 01-1.5 1.5H14v-1.5a2 2 0 10-4 0V20H6.5A1.5 1.5 0 015 18.5V15h1.5a2 2 0 100-4H5V7.5A1.5 1.5 0 016.5 6H10V4.5z" />
  </Svg>
);

export const IconArrow = (p) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const IconUsers = (p) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5M15 14.5c2.6-.4 5 1.2 5.5 4" />
  </Svg>
);

export const IconHandshake = (p) => (
  <Svg {...p}>
    <path d="M2 12.5l3.5-3.5 4-1 2.5 1.5L14.5 8l4 1 3.5 3.5" />
    <path d="M5.5 9L2 12.5l4 4M18.5 9l3.5 3.5-4 4" />
    <path d="M6 16.5l2.5 2.3a1.4 1.4 0 002 0l.8-.8M9 14.5l2.5 2.3a1.4 1.4 0 002 0M12.5 12.5l2 1.8a1.3 1.3 0 001.8-1.8l-2.3-2" />
  </Svg>
);

export const IconStar = (p) => (
  <Svg {...p}>
    <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.7l1-5.9L3.5 9.7l5.9-.8L12 3.5z" />
  </Svg>
);

export const IconEye = (p) => (
  <Svg {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
);

export const IconTarget = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" />
  </Svg>
);

export const IconBulb = (p) => (
  <Svg {...p}>
    <path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0012 3z" />
  </Svg>
);

export const IconTrend = (p) => (
  <Svg {...p}>
    <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
  </Svg>
);
