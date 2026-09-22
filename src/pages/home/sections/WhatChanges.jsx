import { useState } from "react";
import { WHAT_CHANGES } from "../../../data/whatChanges.js";
import "./WhatChanges.css";

export default function WhatChanges() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="section what-changes">
      <div className="container">
        <div className="section-heading">
          <h2>
            Apa yang berubah jika
            <br />
            Anda bergabung dengan kami?
          </h2>
        </div>

        <div className="what-changes__cards">
          {WHAT_CHANGES.map((card, i) => {
            const isActive = hovered === i;
            return (
              <div
                key={card.title}
                className={`wc-card ${isActive ? "wc-card--active" : ""}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
              >
                {isActive ? (
                  <>
                    <h3 className="wc-card__title">{card.title}</h3>
                    <p className="wc-card__desc">{card.long}</p>
                  </>
                ) : (
                  <>
                    <div className="wc-card__art" aria-hidden="true">
                      illustration
                    </div>
                    <div className="wc-card__footer">
                      <h3 className="wc-card__title">{card.title}</h3>
                      <p className="wc-card__desc">{card.short}</p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
