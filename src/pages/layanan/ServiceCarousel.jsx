import { useState } from "react";
import { Link } from "react-router-dom";
import { SERVICES } from "../../data/services.js";
import "./ServiceCarousel.css";

export default function ServiceCarousel() {
  const [index, setIndex] = useState(0);
  const [flipPrev, setFlipPrev] = useState(0);
  const [flipNext, setFlipNext] = useState(0);
  const maxIndex = SERVICES.length - 1;

  const goPrev = () => {
    setIndex((i) => Math.max(0, i - 1));
    setFlipPrev((k) => k + 1);
  };

  const goNext = () => {
    setIndex((i) => Math.min(maxIndex, i + 1));
    setFlipNext((k) => k + 1);
  };

  return (
    <section className="svc-carousel">
      <div className="container">
        <div
          className="svc-carousel__track"
          style={{ transform: `translateX(calc(-${index} * (100% + 20px)))` }}
        >
          {SERVICES.map((s) => (
            <article className="svc-slide" key={s.tag}>
              <div className="svc-slide__card">
                <span className="svc-slide__tag">{s.tag}</span>
                <h2 className="svc-slide__title">{s.title}</h2>
                <p className="svc-slide__desc">{s.description}</p>
                <h3 className="svc-slide__tech-title">{s.techTitle}</h3>
                <ul className="svc-slide__chips">
                  {s.techs.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>

              <Link to="/daftar" className="svc-slide__cta">
                Bergabung
              </Link>

              <div className="svc-slide__art" aria-hidden="true" />
            </article>
          ))}
        </div>

        <div className="svc-carousel__nav">
          <button
            type="button"
            className="wc-arrow"
            onClick={goPrev}
            disabled={index === 0}
            aria-label="Layanan sebelumnya"
          >
            <span key={flipPrev} className="wc-arrow__icon wc-arrow__icon--flip">
              ←
            </span>
          </button>
          <button
            type="button"
            className="wc-arrow"
            onClick={goNext}
            disabled={index === maxIndex}
            aria-label="Layanan berikutnya"
          >
            <span key={flipNext} className="wc-arrow__icon wc-arrow__icon--flip">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}