import { useMemo, useState } from "react";
import {
  HAKI_TAGS,
  HAKI_SERVICES,
  HAKI_STEPS,
  HAKI_APPLICATIONS,
  HAKI_STATS,
  HAKI_FLOW,
} from "../../data/haki.js";
import { Icon } from "../../layouts/icons.jsx";
import "./HakiStudioPage.css";

const TAG_ICON = Object.fromEntries(HAKI_TAGS.map((t) => [t.label, t.icon]));

export default function HakiStudioPage() {
  const [activeTag, setActiveTag] = useState(null);
  const [saved, setSaved] = useState([]);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(null);

  const filtered = useMemo(() => {
    if (!activeTag) return HAKI_SERVICES;
    return HAKI_SERVICES.filter((s) => s.tag === activeTag);
  }, [activeTag]);

  const toggleTag = (label) => setActiveTag((cur) => (cur === label ? null : label));

  const toggleSaved = (e, id) => {
    e.stopPropagation();
    setSaved((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  };

  return (
    <div className="haki">
      <div className="haki__intro">
        <h2>Protect What You Build.</h2>
        <p>
          Daftarkan merek, hak cipta, dan desain usaha Anda tanpa proses yang rumit. Tim Parakarsa
          membantu pengajuan, memantau status, dan memastikan karya serta inovasi Anda terlindungi
          secara hukum, dengan biaya yang lebih terjangkau lewat skema kolektif.
        </p>
      </div>

      <div className="haki__stats">
        {HAKI_STATS.map((s) => (
          <article className="haki-stat" key={s.label}>
            <span className="haki-stat__label">{s.label}</span>
            <p className="haki-stat__value">{s.value}</p>
            <p className="haki-stat__sub">{s.sub}</p>
          </article>
        ))}
        <article className="haki-banner">
          <span className="haki-banner__icon">
            <Icon name="shield" />
          </span>
          <div>
            <h3>Pendampingan Legal</h3>
            <p>Konsultasi dengan tim legal Parakarsa sebelum mengajukan.</p>
          </div>
          <button type="button" className="haki-banner__btn">
            Konsultasi
          </button>
        </article>
      </div>

      <div className="haki__tags">
        <span className="haki__tags-label">Tag:</span>
        {HAKI_TAGS.map((tag) => (
          <button
            key={tag.label}
            type="button"
            className={`swf-tag ${activeTag === tag.label ? "swf-tag--active" : ""}`}
            onClick={() => toggleTag(tag.label)}
            aria-pressed={activeTag === tag.label}
          >
            <span className="swf-tag__icon">
              <Icon name={tag.icon} />
            </span>
            {tag.label}
          </button>
        ))}
      </div>

      <p className="haki__count">{filtered.length} layanan</p>

      <div className="haki__grid">
        {filtered.map((s) => {
          const isSaved = saved.includes(s.id);
          return (
            <article
              className="haki-card"
              key={s.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelected(s)}
              onKeyDown={(e) => e.key === "Enter" && setSelected(s)}
            >
              <div className={`haki-card__art haki-card__art--${s.tone}`}>
                <span className="haki-card__art-icon">
                  <Icon name={TAG_ICON[s.tag]} width={44} height={44} strokeWidth={1.4} />
                </span>
                {s.badge && <span className="swf-card__badge">{s.badge}</span>}
                <button
                  type="button"
                  className={`swf-card__fav ${isSaved ? "swf-card__fav--active" : ""}`}
                  onClick={(e) => toggleSaved(e, s.id)}
                  aria-pressed={isSaved}
                  aria-label={isSaved ? "Hapus dari simpanan" : "Simpan layanan"}
                >
                  <Icon name="heart" filled={isSaved} />
                </button>
              </div>
              <div className="swf-card__body">
                <h3>{s.name}</h3>
                <p className="swf-card__role">{s.tag}</p>
                <p className="haki-card__meta">
                  <Icon name="clock" width={14} height={14} /> {s.duration}
                </p>
                <p className="swf-card__price">Mulai {s.price}</p>
              </div>
            </article>
          );
        })}
        {filtered.length === 0 && <p className="swf__empty">Belum ada layanan untuk kategori ini.</p>}
      </div>

      <section className="haki__section">
        <h3 className="haki__section-title">Cara Kerja</h3>
        <ol className="haki-flow">
          {HAKI_FLOW.map((f, i) => (
            <li className="haki-flow__item" key={f.title}>
              <span className="haki-flow__num">{i + 1}</span>
              <h4>{f.title}</h4>
              <p>{f.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="haki__section">
        <h3 className="haki__section-title">Pengajuan Saya</h3>
        <div className="haki-apps">
          {HAKI_APPLICATIONS.map((a) => (
            <article className="haki-app" key={a.id}>
              <div className="haki-app__head">
                <div>
                  <h4>{a.title}</h4>
                  <p className="haki-app__sub">
                    {a.id} · {a.type} · {a.date}
                  </p>
                </div>
                <span className={`haki-status haki-status--${a.step === 3 ? "done" : a.step === 0 ? "wait" : "proc"}`}>
                  {a.status}
                </span>
              </div>
              <ol className="haki-track" aria-label="Progres pengajuan">
                {HAKI_STEPS.map((label, i) => (
                  <li key={label} className={i <= a.step ? "haki-track__step haki-track__step--on" : "haki-track__step"}>
                    <span className="haki-track__dot">{i <= a.step && <Icon name="check" width={12} height={12} strokeWidth={3} />}</span>
                    <span className="haki-track__label">{label}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      {selected && (
        <ServiceModal
          service={selected}
          isSaved={saved.includes(selected.id)}
          onToggleSaved={(e) => toggleSaved(e, selected.id)}
          onClose={() => setSelected(null)}
          onSubmit={() => {
            setSubmitted(selected.name);
            setSelected(null);
          }}
        />
      )}

      {submitted && (
        <div className="haki-toast" role="status">
          <Icon name="check" width={16} height={16} /> Permintaan “{submitted}” terkirim. Tim kami akan menghubungi Anda.
          <button type="button" onClick={() => setSubmitted(null)} aria-label="Tutup">
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

function ServiceModal({ service, isSaved, onToggleSaved, onClose, onSubmit }) {
  return (
    <div className="swf-modal__overlay" onClick={onClose}>
      <div className="swf-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="swf-modal__close" onClick={onClose} aria-label="Tutup">
          ✕
        </button>

        <div className={`haki-modal__art haki-card__art--${service.tone}`}>
          <span className="haki-card__art-icon">
            <Icon name={TAG_ICON[service.tag]} width={56} height={56} strokeWidth={1.3} />
          </span>
          <span className="swf-card__badge">{service.duration}</span>
        </div>

        <div className="swf-modal__body">
          <div className="swf-modal__heading">
            <div>
              <h3>{service.name}</h3>
              <p className="swf-card__role">{service.tag}</p>
            </div>
            <button
              type="button"
              className={`swf-card__fav swf-modal__fav ${isSaved ? "swf-card__fav--active" : ""}`}
              onClick={onToggleSaved}
              aria-label={isSaved ? "Hapus dari simpanan" : "Simpan layanan"}
            >
              <Icon name="heart" filled={isSaved} />
            </button>
          </div>

          <p className="swf-modal__bio">{service.desc}</p>

          <ul className="haki-modal__list">
            {service.includes.map((i) => (
              <li key={i}>
                <span>
                  <Icon name="check" width={12} height={12} strokeWidth={3} />
                </span>
                {i}
              </li>
            ))}
          </ul>

          <div className="swf-modal__footer">
            <span className="swf-modal__price">Mulai {service.price}</span>
            <div className="swf-modal__actions">
              <button type="button" className="btn btn-ghost" onClick={onClose}>
                Tutup
              </button>
              <button type="button" className="btn btn-primary" onClick={onSubmit}>
                Ajukan Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}