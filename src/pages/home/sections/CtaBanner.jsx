import { Link } from "react-router-dom";
import "./CtaBanner.css";

export default function CtaBanner() {
  return (
    <section className="section cta-banner-section">
      <div className="container">
        <div className="cta-banner">
          <p className="cta-banner__eyebrow">#THENEXTSTAGETOGETHER</p>
          <h2 className="cta-banner__title">
            Siap Naik ke <span className="cta-banner__accent">Level Berikutnya?</span>
          </h2>
          <p className="cta-banner__desc">
            Mulai langkahmu hari ini dan kembangkan bisnismu bersama ekosistem
            kolaboratif yang tepat untuk bertumbuh, terhubung, dan mencapai scale-up
            yang berkelanjutan bersama Parakarsa.
          </p>

          <div className="cta-banner__actions">
            <Link to="/daftar" className="btn cta-banner__btn-white">
              Gabung Sekarang
            </Link>
            <Link to="/tentang-kami" className="btn cta-banner__btn-outline">
              Konsultasi Gratis
            </Link>
          </div>

          <div className="cta-banner__social-proof">
            <div className="cta-banner__avatars" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p>10++ founder telah join dan rasakan manfaatnya</p>
          </div>
        </div>
      </div>
    </section>
  );
}
