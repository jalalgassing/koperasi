const AUDIENCE = [
  { mark: "U", title: "UMKM", text: "Pelaku usaha yang ingin naik kelas tanpa investasi teknologi besar.", points: ["Gambar produk dengan AI", "Pendaftaran merek usaha", "Belanja bahan baku bersama"] },
  { mark: "K", title: "Koperasi", text: "Pengurus dan anggota yang butuh pengelolaan lebih rapi dan terhubung.", points: ["Kartu anggota digital", "Laporan dan peran anggota", "Jaringan koperasi lain"] },
  { mark: "B", title: "Badan usaha kecil-menengah", text: "Bisnis yang sedang tumbuh dan membutuhkan tenaga ahli sesuai kebutuhan.", points: ["Desainer, legal, dan akuntan", "Infrastruktur Cloud fleksibel", "Peluang mitra strategis"] },
];

export default function ForWhom() {
  return (
    <section className="section lyn-audience">
      <div className="container">
        <div className="lyn-audience__box">
          <div className="lyn-audience__head">
            <p className="lyn-eyebrow lyn-eyebrow--amber">Untuk siapa</p>
            <h2>Layanan yang menyesuaikan skala usaha Anda</h2>
          </div>
          <div className="lyn-audience__cards">
            {AUDIENCE.map((a) => (
              <article className="lyn-aud-card" key={a.title}>
                <span className="lyn-aud-card__mark" aria-hidden="true">{a.mark}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                <ul>{a.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
