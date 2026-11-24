// Data contoh untuk halaman-halaman mobile. Ganti dengan data backend nanti.

export const SHORTCUTS = [
  { id: "roles", icon: "roles", to: "/main/roles-permissions" },
  { id: "cart", icon: "cart", to: "/main/collective-purchase" },
  { id: "report", icon: "report", to: "/main/financial-report" },
  { id: "team", icon: "team", to: "/main/team-performance" },
  { id: "integration", icon: "integration", to: "/main/integrations" },
  { id: "history", icon: "history", to: "/main/history" },
  { id: "notifications", icon: "bell", to: "/main/notifications" },
  { id: "support", icon: "headset", to: "/main/support" },
  { id: "favorites", icon: "heart", to: "/main/shared-workforce", state: { onlyFav: true } },
  { id: "scan", icon: "scan", to: "/main/member-card", state: { scan: true } },
  { id: "upworth", icon: "flash", to: "/main/upworth" },
];
export const DEFAULT_SHORTCUTS = ["roles", "cart", "report", "team", "integration", "history"];

// Fitur lain (tidak di grid) untuk halaman "More".
export const MORE_LINKS = [
  { label: "Trending", icon: "trending", to: "/main/trending" },
  { label: "AI Generative Studio", icon: "flash", to: "/main/ai-generative-studio" },
  { label: "Haki Studio", icon: "report", to: "/main/haki-studio" },
];

export const ROLE_OPTIONS = ["Owner", "Admin", "Manager", "Member", "Viewer"];
export const ROLE_PERMS = {
  Owner: "Full access, billing, and role management",
  Admin: "Manage members, purchases, and integrations",
  Manager: "Create purchases and view financial reports",
  Member: "Join purchases, hire workforce, share member ID",
  Viewer: "Read-only access to reports and members",
};

export const PURCHASES = [
  { id: "p1", name: "Rice 25 kg (bulk)", supplier: "Tani Makmur", price: 285000, unit: "sack", joined: 14, target: 20, ends: "5 days left" },
  { id: "p2", name: "Packaging boxes (500 pcs)", supplier: "KemasKita", price: 640000, unit: "pack", joined: 9, target: 15, ends: "8 days left" },
  { id: "p3", name: "Cooking oil 5 L", supplier: "Sawit Jaya", price: 98000, unit: "pcs", joined: 22, target: 30, ends: "2 days left" },
  { id: "p4", name: "Printer paper A4 (10 reams)", supplier: "Kertas Nusantara", price: 410000, unit: "box", joined: 5, target: 12, ends: "12 days left" },
];

export const REPORT = {
  Month: { income: 48200000, expense: 31750000, bars: [["W1", 9.4, 7.1], ["W2", 12.8, 8.0], ["W3", 11.6, 7.9], ["W4", 14.4, 8.7]] },
  Quarter: { income: 141500000, expense: 96300000, bars: [["Jul", 44.1, 30.2], ["Aug", 49.2, 33.6], ["Sep", 48.2, 31.8]] },
  Year: { income: 538900000, expense: 371200000, bars: [["Q1", 118.4, 82.5], ["Q2", 131.0, 91.3], ["Q3", 141.5, 96.3], ["Q4", 148.0, 101.1]] },
};
export const TRANSACTIONS = [
  { id: "t1", type: "income", title: "Member contribution", date: "08 Nov", amount: 12500000 },
  { id: "t2", type: "expense", title: "Collective purchase - Rice", date: "07 Nov", amount: 5700000 },
  { id: "t3", type: "income", title: "Workforce project fee", date: "05 Nov", amount: 8000000 },
  { id: "t4", type: "expense", title: "Operational costs", date: "03 Nov", amount: 3200000 },
  { id: "t5", type: "income", title: "HAKI service fee", date: "01 Nov", amount: 4300000 },
  { id: "t6", type: "expense", title: "Software subscriptions", date: "30 Oct", amount: 1850000 },
];

export const TEAM_SCORES = {
  "029121021931": 92, "029121021932": 88, "029121021933": 81, "029121021934": 95,
  "029121021935": 74, "029121021936": 86, "029121021937": 69, "029121021938": 90,
};

export const INTEGRATIONS = [
  { id: "gdrive", name: "Google Drive", text: "Store contracts and reports", color: "#3b82f6" },
  { id: "whatsapp", name: "WhatsApp Business", text: "Send order updates to members", color: "#22c55e" },
  { id: "slack", name: "Slack", text: "Team announcements and alerts", color: "#a855f7" },
  { id: "accounting", name: "Accounting software", text: "Sync income and expenses", color: "#f59e0b" },
  { id: "calendar", name: "Google Calendar", text: "Meetings and deadlines", color: "#ef4444" },
];

export const FAQ = [
  { q: "How do I share my member ID?", a: "Open the Member ID tab and tap Share, or let another member scan your QR code with the scanner icon." },
  { q: "How do favorites work?", a: "Tap the heart on any member in Workforce. Use the Favorites chip to see only the members you saved." },
  { q: "How do I earn Upworth points?", a: "Contribute to collective purchases, connect integrations, and invite members. See the Upworth page for tasks." },
  { q: "Can I change my member ID?", a: "Your member ID is generated from your name and cannot be edited. Contact support if it needs correction." },
];
