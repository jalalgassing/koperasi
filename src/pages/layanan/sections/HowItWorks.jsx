import { useState } from "react";

const STEPS = [
  { title: "Daftar & verifikasi", text: "Buat akun Parakarsa dan lengkapi profil usaha Anda. Prosesnya singkat dan bisa dilakukan dari ponsel.", points: ["Isi data usaha atau koperasi", "Dapatkan kartu anggota digital", "Akses dashboard anggota"] },
  { title: "Pilih layanan", text: "Tentukan kebutuhan Anda: teknologi Cloud & AI, perlindungan HAKI, atau kolaborasi dan belanja kolektif.", points: ["Mulai dari satu layanan", "Tambah layanan kapan saja", "Tanpa biaya infrastruktur awal"] },
  { title: "Dapatkan pendampingan", text: "Tim dan para profesional dalam ekosistem membantu Anda memulai, dari penyiapan hingga penggunaan pertama.", points: ["Panduan langkah demi langkah", "Tenaga ahli lintas bidang", "Dukungan lewat WhatsApp dan email"] },
  { title: "Pantau & berkembang", text: "Lihat progres layanan, laporan, dan peluang baru di satu tempat, lalu kembangkan usaha bersama anggota lain.", points: ["Pantau status pengajuan dan pembelian", "Kumpulkan poin kontribusi", "Terhubung dengan anggota baru"] },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];
  return (
    <section className="section lyn-steps">
      <div className="container">
        <div className="lyn-steps__head">
          <p className="lyn-eyebrow">Cara kerja</p>
          <h2>Mulai dalam 4 langkah sederhana</h2>
        </div>
        <div className="lyn-steps__grid">
          <ol className="lyn-steps__list" role="tablist" aria-label="Langkah bergabung">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <button type="button" role="tab" aria-selected={active === i} className={`lyn-step ${active === i ? "is-active" : ""} ${i < active ? "is-done" : ""}`} onClick={() => setActive(i)}>
                  <span className="lyn-step__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="lyn-step__title">{s.title}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="lyn-steps__panel" role="tabpanel" key={active}>
            <span className="lyn-steps__badge">Langkah {active + 1} dari {STEPS.length}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            <ul>{step.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
