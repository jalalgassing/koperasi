import adit from "../assets/images/adit-putranto.png";
import yusio from "../assets/images/yusio-iando.png";
import grace from "../assets/images/grace.png";
import sumia from "../assets/images/sumia-adi.png";

// Data kartu talent di Shared Workforce. "tag" dipakai untuk filter —
// harus sama persis dengan salah satu "label" di workforceTags.js.
// "bio" dan "skills" dipakai di modal detail (muncul saat kartu diklik).
// Konten bio/skills masih karangan sementara — belum ada desain lanjutan
// dari tim, jadi dibuat mengikuti gaya & warna yang sudah ada.
export const FREELANCERS = [
  {
    name: "Adit Putranto",
    role: "Product Designer",
    price: "Rp1.000.000/Project",
    experience: "1+ Year Experience",
    tag: "Designer",
    photo: adit,
    bio: "Fokus membantu UMKM membangun identitas visual dan kemasan produk yang terlihat profesional, dari label produk sampai desain katalog digital.",
    skills: ["Packaging Design", "Branding", "Adobe Illustrator", "Figma"],
  },
  {
    name: "Yusio Iando",
    role: "Junior Legal Counsel",
    price: "Rp8.000.000/Project",
    experience: "10+ Year Experience",
    tag: "Legal Team",
    photo: yusio,
    bio: "Berpengalaman mendampingi koperasi dan UMKM dalam penyusunan kontrak kerja sama, perizinan usaha, dan pendaftaran badan hukum.",
    skills: ["Kontrak Bisnis", "Perizinan Usaha", "Mediasi", "Badan Hukum"],
  },
  {
    name: "Grace",
    role: "Accountant Staff",
    price: "Rp6.000.000/Project",
    experience: "5+ Year Experience",
    tag: "Accountant",
    photo: grace,
    bio: "Membantu pembukuan, laporan keuangan bulanan, dan perhitungan pajak UMKM agar lebih rapi dan sesuai standar akuntansi.",
    skills: ["Pembukuan", "Laporan Keuangan", "Pajak UMKM", "Excel/Spreadsheet"],
  },
  {
    name: "Sumia adi",
    role: "Product designer",
    price: "Rp3.000.000/Project",
    experience: "1+ Year Experience",
    tag: "Designer",
    photo: sumia,
    bio: "Terbiasa membuat sketsa dan ilustrasi desain produk fashion, mulai dari konsep awal hingga siap dipresentasikan ke klien.",
    skills: ["Fashion Illustration", "Sketching", "Procreate", "Mood Board"],
  },
];