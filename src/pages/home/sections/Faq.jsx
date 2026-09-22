import { useState } from "react";
import { FAQS } from "../../../data/faqs.js";
import "./Faq.css";

const DEFAULT_OPEN = 0;

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(DEFAULT_OPEN);

  return (
    <section className="section faq">
      <div className="container faq__layout">
        <div className="faq__intro">
          <h2>Kami Punya Jawabannya.</h2>
          <p>
            Temukan informasi yang Anda butuhkan tentang Parakarsa, layanan kami, dan
            cara memulai perjalanan bersama kami.
          </p>
        </div>

        <div
          className="faq__list"
          onMouseLeave={() => setOpenIndex(DEFAULT_OPEN)}
        >
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                className={`faq-item ${isOpen ? "faq-item--open" : ""}`}
                key={item.question}
                onMouseEnter={() => setOpenIndex(i)}
                onFocus={() => setOpenIndex(i)}
              >
                <button
                  type="button"
                  className="faq-item__question"
                  aria-expanded={isOpen}
                  tabIndex={0}
                >
                  <span>{item.question}</span>
                  <span className="faq-item__icon">{isOpen ? "−" : "+"}</span>
                </button>

                <div className="faq-item__answer-wrap">
                  <div className="faq-item__answer">
                    {item.answer.split("\n\n").map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
