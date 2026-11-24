// Ikon inline untuk tampilan mobile (tanpa dependency tambahan).
const base = {
  width: 24, height: 24, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round",
  "aria-hidden": true,
};

const paths = {
  headset: <><path d="M4 14v-2a8 8 0 0116 0v2" /><rect x="3" y="13" width="4" height="6" rx="1.5" /><rect x="17" y="13" width="4" height="6" rx="1.5" /><path d="M19 19c0 1.5-2 2.5-5 2.5" /></>,
  bell: <><path d="M6 10a6 6 0 1112 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10z" /><path d="M10 19a2 2 0 004 0" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>,
  edit: <><path d="M4 20h4l10.5-10.5a2.1 2.1 0 00-3-3L5 17v3z" /><path d="M13.5 8.5l3 3" /></>,
  home: <path d="M3.5 11L12 3.5 20.5 11M5.5 9.5V20h13V9.5M10 20v-5.5h4V20" />,
  homeFill: <path d="M12 3.2l9 8h-2.5V20.5h-5v-6h-3v6h-5V11.2H3z" fill="currentColor" stroke="none" />,
  briefcase: <><rect x="3" y="7.5" width="18" height="12.5" rx="2" /><path d="M9 7.5V6a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0115 6v1.5" /></>,
  briefcaseFill: <><path d="M9 7.5V6a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0115 6v1.5h-1.5V6h-3v1.5z" fill="currentColor" stroke="none" /><rect x="3" y="7.5" width="18" height="12.5" rx="2.2" fill="currentColor" stroke="none" /></>,
  card: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3 10h18M7 15h4" /></>,
  cardFill: <><rect x="3" y="5" width="18" height="14" rx="2.5" fill="currentColor" stroke="none" /><path d="M3 10h18" stroke="#fff" /><path d="M7 15h4" stroke="#fff" /></>,
  person: <><circle cx="12" cy="8" r="3.6" /><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" /></>,
  personFill: <><circle cx="12" cy="8" r="4" fill="currentColor" stroke="none" /><path d="M4.5 20.5c0-3.8 3.3-6.2 7.5-6.2s7.5 2.4 7.5 6.2z" fill="currentColor" stroke="none" /></>,
  link: <><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 00-5.7 0l-3 3A4 4 0 0011 18.7l1-1" /></>,
  share: <><path d="M12 15V3.5M8 7l4-4 4 4" /><path d="M5 11v8.5h14V11" /></>,
  scan: <><path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2" /><path d="M8 12h8" /></>,
  heart: <path d="M12 20s-7-4.4-9.5-9A5.5 5.5 0 0112 5.2 5.5 5.5 0 0121.5 11c-2.5 4.6-9.5 9-9.5 9z" />,
  chevron: <path d="M9 5l7 7-7 7" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="M21 16l-5-5-8 8" /></>,
  flash: <path d="M13 3L5 13.5h6L10 21l8-10.5h-6z" />,
  // ikon grid menu Home
  roles: <><circle cx="12" cy="12" r="3" /><path d="M12 3.5l1.8 2.2 2.8-.6.9 2.7 2.6 1.2-.8 2.8 1.6 2.4-2.3 1.8-.1 2.9-2.9.3-1.6 2.4L12 19l-2.5 1.2-1.6-2.4-2.9-.3-.1-2.9L2.6 12.8l1.6-2.4-.8-2.8 2.6-1.2.9-2.7 2.8.6z" strokeWidth="1.4" /></>,
  cart: <><circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /><path d="M3 4h2.2l2.3 11.2a2 2 0 002 1.8h7.2a2 2 0 002-1.6L20 8H6.2" /></>,
  report: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4" /><ellipse cx="12" cy="13" rx="3" ry="1.4" /><path d="M9 13v3c0 .8 1.3 1.4 3 1.4s3-.6 3-1.4v-3" /></>,
  team: <><circle cx="12" cy="7.5" r="2.8" /><circle cx="5.5" cy="9.5" r="2.2" /><circle cx="18.5" cy="9.5" r="2.2" /><path d="M7.5 19c0-3 2-5 4.5-5s4.5 2 4.5 5z" /><path d="M2.5 17c0-2.2 1.4-3.6 3-3.6M21.5 17c0-2.2-1.4-3.6-3-3.6" /></>,
  integration: <><circle cx="12" cy="12" r="2.4" /><circle cx="5" cy="6" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="5" cy="18" r="2" /><circle cx="19" cy="18" r="2" /><path d="M6.5 7.5l3.6 3M17.5 7.5l-3.6 3M6.5 16.5l3.6-3M17.5 16.5l-3.6-3" /></>,
  history: <><rect x="3" y="7.5" width="18" height="12.5" rx="2" /><path d="M9 7.5V6a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0115 6v1.5" /><circle cx="17" cy="16.5" r="3.6" fill="#b8dfe0" stroke="currentColor" /><path d="M17 14.8v1.9l1.2.8" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  lock: <><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V8a4 4 0 018 0v2.5" /></>,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  user: <><circle cx="12" cy="8" r="3.6" /><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 114 2c-.9.6-1.5 1-1.5 2M12 17v.01" /></>,
  logout: <><path d="M9 4H6a2 2 0 00-2 2v12a2 2 0 002 2h3M16 8l4 4-4 4M20 12H9" /></>,
  camera: <><path d="M4 8h3l1.5-2h7L17 8h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></>,
  phone: <path d="M6 3h3l1.5 4-2 1.5a11 11 0 006 6L16 12.5l4 1.5v3a2 2 0 01-2 2A15 15 0 013 5a2 2 0 013-2z" />,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  trash: <><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></>,
  trending: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  grid: <><rect x="4" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" /></>,
  more: <path d="M6 9l6 6 6-6" />,
  hex: <><path d="M12 2.8l7.7 4.4v8.9L12 20.5l-7.7-4.4V7.2z" /><circle cx="12" cy="11.7" r="2.6" /></>,
  mail: <><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="M3.5 7l8.5 6 8.5-6" /></>,
};

export default function MIcon({ name, size = 24, ...rest }) {
  return (
    <svg {...base} width={size} height={size} {...rest}>
      {paths[name]}
    </svg>
  );
}

// Logo "clover" Parakarsa (4 kelopak) dipakai di dekorasi & kartu Upworth.
export function Clover({ size = 24, color = "currentColor", ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill={color} aria-hidden="true" {...rest}>
      <circle cx="16" cy="16" r="11" />
      <circle cx="32" cy="16" r="11" />
      <circle cx="16" cy="32" r="11" />
      <circle cx="32" cy="32" r="11" />
      <rect x="13" y="13" width="22" height="22" />
    </svg>
  );
}

// Foto profil default (siluet) seperti Instagram / WhatsApp.
export function DefaultAvatar({ size = 48, className = "", ...rest }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="Foto profil default" {...rest}>
      <rect width="48" height="48" fill="#dfe4e2" />
      <circle cx="24" cy="18.5" r="8" fill="#a7b2ae" />
      <path d="M7 48c0-10 7.6-16 17-16s17 6 17 16z" fill="#a7b2ae" />
    </svg>
  );
}
