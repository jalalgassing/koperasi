const MISI = [
  { title: "Teknologi yang terjangkau", text: "Membuka akses Cloud dan AI yang masuk akal bagi usaha kecil." },
  { title: "Karya yang terlindungi", text: "Memudahkan proses HAKI agar merek dan karya usaha aman secara hukum." },
  { title: "Ekosistem yang terhubung", text: "Mempertemukan UMKM, koperasi, dan profesional dalam satu jaringan." },
];

const Icon = ({ children }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

const VALUES = [
  { n: "01", title: "Kolaborasi", text: "Bertumbuh lebih jauh saat berjalan bersama, bukan sendirian.",
    icon: <Icon><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.4" /><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5M15 14.5c2.6-.4 5 1.2 5.5 4" /></Icon> },
  { n: "02", title: "Keterjangkauan", text: "Teknologi dan layanan yang masuk akal untuk skala usaha kecil.",
    icon: <Icon><path d="M4 12l8-8h7v7l-8 8z" /><circle cx="15.5" cy="8.5" r="1.2" /></Icon> },
  { n: "03", title: "Keterbukaan", text: "Informasi, proses, dan peluang yang jelas dan dapat diakses semua anggota.",
    icon: <Icon><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></Icon> },
  { n: "04", title: "Dampak", text: "Ukuran keberhasilan kami adalah usaha anggota yang nyata berkembang.",
    icon: <Icon><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></Icon> },
];

export default function AboutValues() {
  return (
    <section className="section tks-values">
      <div className="container">
        <div className="tks-panel">
          {/* dekorasi latar */}
          <svg className="tks-panel__rings" viewBox="0 0 400 400" aria-hidden="true">
            <circle cx="300" cy="100" r="60" /><circle cx="300" cy="100" r="110" /><circle cx="300" cy="100" r="165" /><circle cx="300" cy="100" r="225" />
          </svg>
          <span className="tks-panel__dots" aria-hidden="true" />

          <div className="tks-panel__vision">
            <span className="tks-pill">Visi</span>
            <h2>
              Ekosistem usaha yang terbuka, di mana <em>setiap bisnis</em> punya kesempatan bertumbuh.
            </h2>
          </div>

          <div className="tks-panel__mission">
            <span className="tks-pill tks-pill--teal">Misi</span>
            <ol className="tks-mission">
              {MISI.map((m, i) => (
                <li className="tks-mission__item" key={m.title}>
                  <span className="tks-mission__num">{i + 1}</span>
                  <div><strong>{m.title}</strong><p>{m.text}</p></div>
                </li>
              ))}
            </ol>
          </div>

          <p className="tks-panel__foot"><span />Nilai yang kami pegang</p>
        </div>

        <div className="tks-cards">
          {VALUES.map((v) => (
            <article className="tks-card" key={v.title}>
              <span className="tks-card__n" aria-hidden="true">{v.n}</span>
              <span className="tks-card__icon">{v.icon}</span>
              <h4>{v.title}</h4>
              <p>{v.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
