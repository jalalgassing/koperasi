import { useState } from "react";
import { TESTIMONIALS } from "../../../data/testimonials.js";
import "./Testimonials.css";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [flipPrev, setFlipPrev] = useState(0);
  const [flipNext, setFlipNext] = useState(0);
  const maxIndex = TESTIMONIALS.length - 1;

  const goPrev = () => {
    setIndex((i) => Math.max(0, i - 1));
    setFlipPrev((k) => k + 1);
  };

  const goNext = () => {
    setIndex((i) => Math.min(maxIndex, i + 1));
    setFlipNext((k) => k + 1);
  };

  return (
    <section className="section testimonials" id="testimoni">
      <div className="container">
        <div className="section-heading">
          <h2>
            Kata mereka
            <br />
            tentang <span className="testimonials__brand">Parakarsa</span>
          </h2>
        </div>

        <div className="testimonials__viewport">
          <div
            className="testimonials__track"
            style={{ transform: `translateX(calc(-${index} * (min(480px, 86vw) + 20px)))` }}
          >
            {TESTIMONIALS.map((t) => (
              <article className="testi-card" key={t.name}>
                <div className="testi-card__photo" aria-hidden="true" />
                <div className="testi-card__body">
                  <p className="testi-card__quote">&ldquo;{t.quote}&rdquo;</p>
                  <div className="testi-card__who">
                    <p className="testi-card__name">{t.name}</p>
                    <p className="testi-card__role">{t.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="testimonials__nav testimonials__nav--right">
          <button
            type="button"
            className="wc-arrow"
            onClick={goPrev}
            disabled={index === 0}
            aria-label="Testimoni sebelumnya"
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
            aria-label="Testimoni berikutnya"
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
