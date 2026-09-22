import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HERO_PHRASES } from "../../../data/heroWords.js";
import "./Hero.css";

const ROTATE_MS = 4200;

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_PHRASES.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  const phrase = HERO_PHRASES[index];

  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 className="hero__title">
            <span className="hero__title-line">Satu Platform untuk Menghubungkan</span>
            <span className="hero__title-line hero__title-line--rotator">
              <span aria-hidden="true">&amp;&nbsp;</span>
              <span className="hero__rotator" key={index}>
                <span className="hero__rotator-text">{phrase}</span>
                <span className="hero__sweep" aria-hidden="true" />
              </span>
            </span>
          </h1>

          <p className="hero__subtitle">
            Akses berbagai kebutuhan bisnis, kelola informasi, dan terhubung dengan
            peluang dalam satu ekosistem digital yang terintegrasi.
          </p>

          <Link to="/daftar" className="btn btn-primary hero__cta">
            Bergabunglah Sekarang <span className="btn-icon" aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="hero__art" aria-hidden="true">
          <span>Illustrasi</span>
        </div>
      </div>
    </section>
  );
}
