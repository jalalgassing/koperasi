import useSettings from "../hooks/useSettings.js";

// Terjemahan UI mobile (English / Bahasa Indonesia). Key yang belum ada di
// bahasa Indonesia otomatis jatuh ke English.
const D = {
  en: {
    "greet.morning": "Good morning,", "greet.afternoon": "Good afternoon,", "greet.evening": "Good evening,", "greet.night": "Good night,",
    "nav.home": "Home", "nav.workforce": "Workforce", "nav.memberId": "Member ID", "nav.profile": "Profile",
    "search": "Search", "more": "More", "back": "Back", "save": "Save", "cancel": "Cancel", "done": "Done", "edit": "Edit",
    "menu.roles": "Roles &\nPermissions", "menu.cart": "Collective\nPurchase", "menu.report": "Financial\nReport", "menu.team": "Team\nPerformance",
    "menu.integration": "Integrations", "menu.history": "History", "menu.notifications": "Notifications", "menu.support": "Support",
    "menu.favorites": "Favorites", "menu.scan": "Scan QR", "menu.upworth": "Upworth",
    "title.roles": "Roles & Permissions", "title.cart": "Collective Purchase", "title.report": "Financial Report", "title.team": "Team Performance",
    "title.integration": "Integrations", "title.history": "History", "title.notifications": "Notifications", "title.support": "Support", "title.upworth": "Upworth", "title.more": "All features",
    "chip.All": "All", "chip.Favorites": "Favorites", "chip.Designer": "Designer", "chip.Legal team": "Legal team", "chip.Accountant": "Accountant", "chip.Programming": "Programming",
    "mid.copy": "Copy", "mid.share": "Share", "mid.copied": "Copied",
    "profile.account": "Account", "profile.preferences": "Preferences", "profile.manage": "Manage Profile", "profile.settings": "Settings",
    "profile.security": "Password & Security", "profile.language": "Language", "profile.notifications": "Notifications", "profile.favorites": "Favorites",
    "profile.privacy": "Privacy", "profile.help": "Help & About", "profile.logout": "Log out",
  },
  id: {
    "greet.morning": "Selamat pagi,", "greet.afternoon": "Selamat siang,", "greet.evening": "Selamat sore,", "greet.night": "Selamat malam,",
    "nav.home": "Beranda", "nav.workforce": "Tenaga Kerja", "nav.memberId": "ID Anggota", "nav.profile": "Profil",
    "search": "Cari", "more": "Lainnya", "back": "Kembali", "save": "Simpan", "cancel": "Batal", "done": "Selesai", "edit": "Ubah",
    "menu.roles": "Peran &\nIzin", "menu.cart": "Pembelian\nKolektif", "menu.report": "Laporan\nKeuangan", "menu.team": "Performa\nTim",
    "menu.integration": "Integrasi", "menu.history": "Riwayat", "menu.notifications": "Notifikasi", "menu.support": "Bantuan",
    "menu.favorites": "Favorit", "menu.scan": "Scan QR", "menu.upworth": "Upworth",
    "title.roles": "Peran & Izin", "title.cart": "Pembelian Kolektif", "title.report": "Laporan Keuangan", "title.team": "Performa Tim",
    "title.integration": "Integrasi", "title.history": "Riwayat", "title.notifications": "Notifikasi", "title.support": "Bantuan", "title.upworth": "Upworth", "title.more": "Semua fitur",
    "chip.All": "Semua", "chip.Favorites": "Favorit", "chip.Designer": "Desainer", "chip.Legal team": "Tim hukum", "chip.Accountant": "Akuntan", "chip.Programming": "Pemrograman",
    "mid.copy": "Salin", "mid.share": "Bagikan", "mid.copied": "Tersalin",
    "profile.account": "Akun", "profile.preferences": "Preferensi", "profile.manage": "Kelola Profil", "profile.settings": "Pengaturan",
    "profile.security": "Kata Sandi & Keamanan", "profile.language": "Bahasa", "profile.notifications": "Notifikasi", "profile.favorites": "Favorit",
    "profile.privacy": "Privasi", "profile.help": "Bantuan & Tentang", "profile.logout": "Keluar",
  },
};

export default function useT() {
  const [s] = useSettings();
  return (key) => D[s.lang]?.[key] ?? D.en[key] ?? key;
}
