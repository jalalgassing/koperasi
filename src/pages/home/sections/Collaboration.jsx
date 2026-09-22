import fotoKiri from "../../../assets/images/kolaborasi-kiri.png";
import fotoTengah from "../../../assets/images/kolaborasi-tengah.png";
import fotoKanan from "../../../assets/images/kolaborasi-kanan.png";
import { PARTNERS } from "../../../data/partners.js";
import "./Collaboration.css";

const PHOTOS = [
  { src: fotoKiri, alt: "Kegiatan FGD Upgrading UMKM bersama Dinas Koperasi" },
  { src: fotoTengah, alt: "Anggota UMKM menunjukkan produk dan aplikasi Parakarsa" },
  { src: fotoKanan, alt: "Penyerahan bantuan program pemberdayaan UMKM" },
];

export default function Collaboration() {
  // Duplikasi logo agar loop marquee terlihat mulus tanpa jeda.
  const marqueeLogos = [...PARTNERS, ...PARTNERS];

  return (
    <section className="section collaboration">
      <div className="container">
        <div className="section-heading">
          <h2>
            Kolaborasi &amp; Upgrading bersama
            <br />
            para <span className="collaboration__underline">Profesional dibidangnya</span>
          </h2>
          <p>
            Bertumbuh melalui kolaborasi dan berbagi pengetahuan. Kami menghubungkan
            UMKM dengan para profesional dan mitra dari berbagai bidang untuk membuka
            wawasan, membangun koneksi, dan menciptakan peluang baru.
          </p>
        </div>

        <div className="collaboration__photos">
          {PHOTOS.map((p) => (
            <div className="collaboration__photo" key={p.alt}>
              <img src={p.src} alt={p.alt} loading="lazy" />
            </div>
          ))}
        </div>

        <div className="collaboration__marquee" aria-hidden="true">
          <div className="collaboration__marquee-track">
            {marqueeLogos.map((logo, i) => (
              <div className="partner-chip" key={`${logo.id}-${i}`}>
                {logo.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
