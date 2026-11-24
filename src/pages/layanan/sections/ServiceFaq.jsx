import { useState } from "react";
import { SERVICE_FAQS } from "../../../data/serviceFaqs.js";

const DEFAULT_OPEN = 0;

export default function ServiceFaq() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(DEFAULT_OPEN);
  const group = SERVICE_FAQS[tab];

  const pick = (i) => { setTab(i); setOpen(DEFAULT_OPEN); };

  return (
    <section className="section lyn-faq">
      <div className="container">
        <div className="lyn-faq__head">
          <p className="lyn-eyebrow">Seputar layanan</p>
          <h2>Pertanyaan yang sering diajukan</h2>
        </div>
        <div className="lyn-faq__tabs" role="tablist">
          {SERVICE_FAQS.map((g, i) => (
            <button type="button" key={g.tab} role="tab" aria-selected={tab === i} className={`lyn-faq__tab ${tab === i ? "is-active" : ""}`} onClick={() => pick(i)}>{g.tab}</button>
          ))}
        </div>

        {/* Seperti FAQ di Beranda: jawaban terbuka otomatis saat kursor diarahkan ke pertanyaan */}
        <div className="lyn-faq__list" onMouseLeave={() => setOpen(DEFAULT_OPEN)}>
          {group.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div
                className={`lyn-faq__item ${isOpen ? "is-open" : ""}`}
                key={it.q}
                onMouseEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
              >
                <button type="button" aria-expanded={isOpen} onClick={() => setOpen(i)}>
                  <span>{it.q}</span>
                  <i aria-hidden="true" />
                </button>
                <div className="lyn-faq__wrap">
                  <div className="lyn-faq__answer"><p>{it.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
