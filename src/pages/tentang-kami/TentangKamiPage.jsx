import AboutIntro from "./sections/AboutIntro.jsx";
import AboutPrinciples from "./sections/AboutPrinciples.jsx";
import AboutValues from "./sections/AboutValues.jsx";
import AboutContact from "./sections/AboutContact.jsx";
import { IconArrow } from "../../components/MintIcons.jsx";
import gedung from "../../assets/images/mockup/gedung-parakarsa.png";
import "../../styles/mint.css";
import "./TentangKamiPage.css";
import "./sections/TentangKamiSections.css";
import "./sections/TentangKamiMockup.css";

const STATS = [
  { value: "2019", label: "Berdiri tahun", wide: true },
  { value: "98%", label: "Kepuasan Klien" },
  { value: "100+", label: "Jumlah client" },
];

export default function TentangKamiPage() {
  const goKenali = () => {
    document.getElementById("siapa-kami")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section className="mk-hero tkh">
        <div className="container tkh__inner">
          <div className="tkh__copy">
            <span className="mk-pill">Tentang Kami</span>
            <h1 className="mk-hero__title">
              Mengenal Parakarsa,
              <br />
              tempat usaha kecil bertumbuh bersama
            </h1>
            <p className="mk-hero__desc">
              Parakarsa adalah startup yang memberdayakan UMKM, koperasi,
              dan badan usaha kecil-menengah lewat teknologi, data, dan
              ekosistem yang kolaboratif.
            </p>
            <button type="button" className="btn btn-primary mk-hero__cta" onClick={goKenali}>
              Kenali Lebih Lanjut <IconArrow size={16} />
            </button>
          </div>
        </div>
        <img className="tkh__photo" src={gedung} alt="Gedung kantor Parakarsa" />
      </section>

      <AboutIntro />
      <AboutPrinciples />

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

      <AboutValues />
      <AboutContact />
    </>
  );
}