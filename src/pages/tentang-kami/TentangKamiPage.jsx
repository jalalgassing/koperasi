import Faq from "../home/sections/Faq.jsx";
import CtaBanner from "../home/sections/CtaBanner.jsx";
import logo from "../../assets/images/logo.png";
import "./TentangKamiPage.css";

const STATS = [
  { value: "2019", label: "Berdiri tahun", wide: true },
  { value: "98%", label: "Kepuasan Klien" },
  { value: "100+", label: "Jumlah client" },
];

export default function TentangKamiPage() {
  return (
    <>
      <section className="section tk-hero">
        <div className="container">
          <div className="tk-hero-banner">
            <img src={logo} alt="" className="tk-hero-banner__logo" aria-hidden="true" />
            <div className="tk-hero-banner__text">
              <h1 className="tk-hero__title">
                Solusi yang mendukung
                <br />
                pertumbuhan bisnis anda
              </h1>
              <p className="tk-hero__desc">
                Berbagai layanan dan teknologi yang dirancang untuk membantu
                UMKM, koperasi, dan badan usaha kecil-menengah berkembang
                lebih mudah.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section tk-quote">
        <div className="container tk-quote__grid">
          <div className="tk-quote__col">
            <div className="tk-quote__card">
              <p className="tk-quote__text">
                &ldquo;Kami percaya setiap usaha punya potensi untuk berkembang.
                Parakarsa hadir untuk membuka akses terhadap teknologi, data, dan
                kolaborasi agar lebih banyak bisnis dapat tumbuh.&rdquo;
              </p>
              <p className="tk-quote__attribution">— Founder Parakarsa</p>
            </div>
            <div className="tk-photo" aria-hidden="true">
              <span>Foto</span>
            </div>
          </div>
          <div className="tk-photo tk-photo--tall" aria-hidden="true">
            <span>Foto</span>
          </div>
        </div>
      </section>

      <section className="section tk-growth">
        <div className="container tk-growth__grid">
          <div className="tk-growth__copy">
            <h2 className="tk-growth__title">
              Bersama,
              <br />
              Kami Bertumbuh.
            </h2>
            <p className="tk-growth__desc">
              Di balik setiap langkah Parakarsa, ada kolaborasi, ide, dan
              orang-orang yang terus bergerak bersama. Saksikan berbagai momen
              yang menjadi bagian dari perjalanan kami dalam membangun ekosistem
              yang lebih terbuka dan penuh peluang.
            </p>

            <div className="tk-stats">
              {STATS.filter((s) => s.wide).map((s) => (
                <div className="tk-stat tk-stat--wide" key={s.label}>
                  <span className="tk-stat__value">{s.value}</span>
                  <span className="tk-stat__label">{s.label}</span>
                </div>
              ))}
              <div className="tk-stats__row">
                {STATS.filter((s) => !s.wide).map((s) => (
                  <div className="tk-stat" key={s.label}>
                    <span className="tk-stat__value">{s.value}</span>
                    <span className="tk-stat__label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="tk-photo tk-photo--tall" aria-hidden="true">
            <span>Foto</span>
          </div>
        </div>
      </section>

      <Faq />
      <CtaBanner />
    </>
  );
}