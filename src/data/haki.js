// Data halaman Haki Studio (dashboard). Semua masih data contoh (mock).

export const HAKI_TAGS = [
  { label: "Merek", icon: "brand" },
  { label: "Hak Cipta", icon: "copyright" },
  { label: "Desain Industri", icon: "designer" },
  { label: "Paten", icon: "bulb" },
];

// "tag" harus sama persis dengan label di HAKI_TAGS.
export const HAKI_SERVICES = [
  {
    id: "merek-dagang",
    name: "Pendaftaran Merek Dagang",
    tag: "Merek",
    duration: "± 12–18 Bulan",
    price: "Rp1.800.000",
    badge: "Paling Dicari",
    tone: "green",
    desc: "Lindungi nama, logo, dan identitas produk usaha Anda agar tidak dipakai atau ditiru pihak lain.",
    includes: ["Pengecekan ketersediaan merek", "Pengisian & pengajuan formulir DJKI", "Pemantauan status pemeriksaan", "Pendampingan tanggapan substantif"],
  },
  {
    id: "hak-cipta-karya",
    name: "Pencatatan Hak Cipta",
    tag: "Hak Cipta",
    duration: "± 1–2 Bulan",
    price: "Rp650.000",
    badge: "Cepat",
    tone: "amber",
    desc: "Catatkan karya seperti desain kemasan, ilustrasi, konten, buku, dan perangkat lunak sebagai bukti kepemilikan.",
    includes: ["Penyusunan uraian ciptaan", "Unggah berkas karya", "Pembayaran PNBP dibantu tim", "Surat pencatatan resmi"],
  },
  {
    id: "desain-industri",
    name: "Pendaftaran Desain Industri",
    tag: "Desain Industri",
    duration: "± 8–12 Bulan",
    price: "Rp2.400.000",
    badge: null,
    tone: "teal",
    desc: "Amankan bentuk, pola, atau konfigurasi produk Anda yang punya nilai estetika dan dapat diproduksi massal.",
    includes: ["Penyiapan gambar & uraian desain", "Pengajuan ke DJKI", "Pemantauan pemeriksaan formal", "Sertifikat desain industri"],
  },
  {
    id: "paten-sederhana",
    name: "Paten Sederhana",
    tag: "Paten",
    duration: "± 18–24 Bulan",
    price: "Rp4.500.000",
    badge: null,
    tone: "navy",
    desc: "Perlindungan untuk inovasi produk atau alat yang baru dan punya nilai guna praktis bagi usaha Anda.",
    includes: ["Konsultasi kelayakan invensi", "Penyusunan deskripsi & klaim", "Pengajuan & pemantauan", "Pendampingan legal tim ahli"],
  },
];

export const HAKI_STEPS = ["Diajukan", "Pemeriksaan", "Pengumuman", "Terbit"];

// "step" 0–3 = index di HAKI_STEPS
export const HAKI_APPLICATIONS = [
  { id: "HK-2026-014", title: "Merek “Kopi Parakarsa”", type: "Merek", date: "12 Agu 2026", step: 1, status: "Dalam Pemeriksaan" },
  { id: "HK-2026-009", title: "Ilustrasi Kemasan Batik Series", type: "Hak Cipta", date: "28 Jul 2026", step: 3, status: "Terbit" },
  { id: "HK-2026-017", title: "Desain Botol Sambal Rumahan", type: "Desain Industri", date: "01 Okt 2026", step: 0, status: "Menunggu Berkas" },
];

export const HAKI_STATS = [
  { label: "Total pengajuan", value: "3", sub: "tahun ini" },
  { label: "Sudah terlindungi", value: "1", sub: "karya & merek" },
  { label: "Dalam proses", value: "2", sub: "sedang dipantau" },
];

export const HAKI_FLOW = [
  { title: "Pilih layanan", text: "Tentukan jenis perlindungan yang sesuai dengan usaha Anda." },
  { title: "Lengkapi berkas", text: "Unggah data dan dokumen, tim kami bantu memeriksanya." },
  { title: "Kami ajukan", text: "Pendaftaran diajukan ke DJKI dan statusnya dipantau." },
  { title: "Terlindungi", text: "Sertifikat terbit dan tersimpan di akun Anda." },
];