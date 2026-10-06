// Ikon sederhana (inline SVG) untuk sidebar & topbar dashboard, supaya tidak
// perlu tambah dependency ikon baru.
const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };

export const icons = {
  home: (p) => <svg {...common} {...p}><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></svg>,
  trending: (p) => <svg {...common} {...p}><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></svg>,
  studio: (p) => <svg {...common} {...p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="2.5" /></svg>,
  workforce: (p) => <svg {...common} {...p}><circle cx="8" cy="8" r="3" /><circle cx="16" cy="8" r="3" /><path d="M2 20c0-3 3-5 6-5s6 2 6 5" /><path d="M14 15c3 0 6 2 6 5" /></svg>,
  haki: (p) => <svg {...common} {...p}><path d="M12 3v18" /><path d="M5 7l-3 5a3 3 0 006 0z" /><path d="M19 7l-3 5a3 3 0 006 0z" /><path d="M5 7h14" /><path d="M9 21h6" /></svg>,
  cart: (p) => <svg {...common} {...p}><circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /><path d="M3 4h2l2.4 11.2a2 2 0 002 1.8h7.2a2 2 0 002-1.6L20 8H6" /></svg>,
  report: (p) => <svg {...common} {...p}><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h6" /></svg>,
  team: (p) => <svg {...common} {...p}><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.4" /><path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" /><path d="M15.5 15.2c2.5.3 4.5 2 4.5 4.8" /></svg>,
  roles: (p) => <svg {...common} {...p}><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" /><path d="M17.5 3.5L19 5l2.5-2.5" /></svg>,
  integration: (p) => <svg {...common} {...p}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><path d="M10 6.5h4a3.5 3.5 0 013.5 3.5v4" /></svg>,
  search: (p) => <svg {...common} {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>,
  bell: (p) => <svg {...common} {...p}><path d="M6 10a6 6 0 1112 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10z" /><path d="M10 19a2 2 0 004 0" /></svg>,
  chat: (p) => <svg {...common} {...p}><path d="M4 5h16v11H8l-4 4V5z" /></svg>,
  plus: (p) => <svg {...common} {...p}><path d="M12 5v14M5 12h14" /></svg>,
  mic: (p) => <svg {...common} {...p}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0014 0" /><path d="M12 18v3" /></svg>,
  chevronDown: (p) => <svg {...common} {...p}><path d="M6 9l6 6 6-6" /></svg>,
  arrowUp: (p) => <svg {...common} {...p}><path d="M12 19V5M6 11l6-6 6 6" /></svg>,
  designer: (p) => <svg {...common} {...p}><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>,
  legal: (p) => <svg {...common} {...p}><path d="M12 3v18" /><path d="M5 7l-3 5a3 3 0 006 0z" /><path d="M19 7l-3 5a3 3 0 006 0z" /><path d="M5 7h14" /><path d="M9 21h6" /></svg>,
  camera: (p) => <svg {...common} {...p}><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13.5" r="3.5" /></svg>,
  code: (p) => <svg {...common} {...p}><path d="M9 18l-6-6 6-6" /><path d="M15 6l6 6-6 6" /></svg>,
  brand: (p) => <svg {...common} {...p}><path d="M3 12l9-9h8v8l-9 9z" /><circle cx="15.5" cy="8.5" r="1.5" /></svg>,
  copyright: (p) => <svg {...common} {...p}><circle cx="12" cy="12" r="9" /><path d="M15 9.5a4 4 0 100 5" /></svg>,
  bulb: (p) => <svg {...common} {...p}><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z" /></svg>,
  check: (p) => <svg {...common} {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>,
  clock: (p) => <svg {...common} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  shield: (p) => <svg {...common} {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></svg>,
  upload: (p) => <svg {...common} {...p}><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v4h16v-4" /></svg>,
  heart: (p) => <svg {...common} {...p} fill={p?.filled ? "currentColor" : "none"}><path d="M12 20s-7-4.4-9.5-9A5.5 5.5 0 0112 5a5.5 5.5 0 019.5 6c-2.5 4.6-9.5 9-9.5 9z" /></svg>,
};

export function Icon({ name, ...rest }) {
  const Cmp = icons[name];
  return Cmp ? Cmp(rest) : null;
}
