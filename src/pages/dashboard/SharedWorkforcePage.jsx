import { useMemo, useState } from "react";
import { FREELANCERS } from "../../data/freelancers.js";
import { WORKFORCE_TAGS } from "../../data/workforceTags.js";
import { Icon } from "../../layouts/icons.jsx";
import "./SharedWorkforcePage.css";

export default function SharedWorkforcePage() {
  const [activeTag, setActiveTag] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    if (!activeTag) return FREELANCERS;
    return FREELANCERS.filter((f) => f.tag === activeTag);
  }, [activeTag]);

  const toggleTag = (label) => {
    setActiveTag((cur) => (cur === label ? null : label));
  };

  const toggleFavorite = (e, name) => {
    e.stopPropagation(); // supaya klik hati tidak ikut membuka modal
    setFavorites((cur) =>
      cur.includes(name) ? cur.filter((n) => n !== name) : [...cur, name]
    );
  };

  return (
    <div className="swf">
      <div className="swf__intro">
        <h2>The Right Talent, When You Need It.</h2>
        <p>
          Access skilled professionals and talent across the Parakarsa
          ecosystem to support your business needs. Find the right expertise,
          collaborate with ease, and get things done without building a full
          team from scratch.
        </p>
      </div>

      <div className="swf__tags">
        <span className="swf__tags-label">Tag:</span>
        {WORKFORCE_TAGS.map((tag) => (
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

      <p className="swf__count">{filtered.length} results</p>

      <div className="swf__grid">
        {filtered.map((f) => {
          const isFav = favorites.includes(f.name);
          return (
            <article
              className="swf-card"
              key={f.name}
              onClick={() => setSelected(f)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelected(f)}
            >
              <div className="swf-card__photo">
                <img src={f.photo} alt={f.name} />
                <span className="swf-card__badge">{f.experience}</span>
                <button
                  type="button"
                  className={`swf-card__fav ${isFav ? "swf-card__fav--active" : ""}`}
                  onClick={(e) => toggleFavorite(e, f.name)}
                  aria-pressed={isFav}
                  aria-label={isFav ? "Hapus dari favorit" : "Tambah ke favorit"}
                >
                  <Icon name="heart" filled={isFav} />
                </button>
              </div>
              <div className="swf-card__body">
                <h3>{f.name}</h3>
                <p className="swf-card__role">{f.role}</p>
                <p className="swf-card__price">{f.price}</p>
              </div>
            </article>
          );
        })}

        {filtered.length === 0 && (
          <p className="swf__empty">Belum ada talent untuk kategori ini.</p>
        )}
      </div>

      {selected && (
        <TalentModal
          talent={selected}
          isFavorite={favorites.includes(selected.name)}
          onToggleFavorite={(e) => toggleFavorite(e, selected.name)}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function TalentModal({ talent, isFavorite, onToggleFavorite, onClose }) {
  return (
    <div className="swf-modal__overlay" onClick={onClose}>
      <div className="swf-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="swf-modal__close" onClick={onClose} aria-label="Tutup">
          ✕
        </button>

        <div className="swf-modal__photo">
          <img src={talent.photo} alt={talent.name} />
          <span className="swf-card__badge">{talent.experience}</span>
        </div>

        <div className="swf-modal__body">
          <div className="swf-modal__heading">
            <div>
              <h3>{talent.name}</h3>
              <p className="swf-card__role">{talent.role}</p>
            </div>
            <button
              type="button"
              className={`swf-card__fav swf-modal__fav ${isFavorite ? "swf-card__fav--active" : ""}`}
              onClick={onToggleFavorite}
              aria-label={isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}
            >
              <Icon name="heart" filled={isFavorite} />
            </button>
          </div>

          <p className="swf-modal__bio">{talent.bio}</p>

          <div className="swf-modal__skills">
            {talent.skills.map((s) => (
              <span key={s} className="swf-modal__skill">
                {s}
              </span>
            ))}
          </div>

          <div className="swf-modal__footer">
            <span className="swf-modal__price">{talent.price}</span>
            <div className="swf-modal__actions">
              <button type="button" className="btn btn-ghost" onClick={onClose}>
                Tutup
              </button>
              <button type="button" className="btn btn-primary">
                Ajak Diskusi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}