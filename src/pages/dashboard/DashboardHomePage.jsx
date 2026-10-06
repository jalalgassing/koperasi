import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { Icon } from "../../layouts/icons.jsx";
import { FREELANCERS } from "../../data/freelancers.js";
import { HAKI_APPLICATIONS, HAKI_STEPS } from "../../data/haki.js";
import "./DashboardHomePage.css";

// Pintasan cepat ke fitur utama.
const QUICK_ACTIONS = [
  { label: "Ajukan HAKI", desc: "Daftarkan merek & karya usaha", to: "/main/haki-studio", icon: "brand" },
  { label: "Cari Talent", desc: "Legal, desainer, akuntan", to: "/main/shared-workforce", icon: "workforce" },
  { label: "Tanya AI Studio", desc: "Buat ide & konten bisnis", to: "/main/ai-generative-studio", icon: "studio" },
];

// Timeline aktivitas (data contoh, ganti dengan data backend nanti).
const ACTIVITIES = [
  { text: "Merek “Kopi Parakarsa” masuk tahap pemeriksaan", time: "2 jam lalu", tone: "green" },
  { text: "Grace menerima permintaan pembukuan Q3", time: "Kemarin", tone: "amber" },
  { text: "Pembelian kolektif kemasan mencapai 80%", time: "2 hari lalu", tone: "teal" },
  { text: "Sertifikat hak cipta Batik Series telah terbit", time: "1 minggu lalu", tone: "green" },
];

// Data isi modal "Details" (data contoh, ganti dengan data backend nanti).
const EQUITY_DETAIL = {
  score: 846,
  max: 1000,
  level: "Gold Member",
  breakdown: [
    { label: "Simpanan & iuran rutin", value: 92 },
    { label: "Partisipasi pembelian kolektif", value: 85 },
    { label: "Pemanfaatan layanan", value: 78 },
    { label: "Kolaborasi & kontribusi", value: 81 },
  ],
  tips: [
    "Ikut batch pembelian kolektif berikutnya untuk menambah poin partisipasi.",
    "Gunakan AI Studio & Haki Studio lebih sering untuk menaikkan skor pemanfaatan layanan.",
  ],
};

const PURCHASE_DETAIL = {
  batch: "Batch #12 · Bahan Baku & Kemasan",
  percent: 80,
  joined: 16,
  total: 20,
  deadline: "12 Okt 2026",
  saving: "± 18%",
  items: [
    { name: "Kemasan Kraft Box", percent: 100 },
    { name: "Biji Kopi Arabika (50 kg)", percent: 85 },
    { name: "Label & Stiker Produk", percent: 55 },
  ],
};

const RING_R = 52;
const RING_C = 2 * Math.PI * RING_R;

export default function DashboardHomePage() {
  const { user } = useAuth();
  const [detail, setDetail] = useState(null); // null | "equity" | "purchase"

  // Tutup modal dengan tombol Esc.
  useEffect(() => {
    if (!detail) return;
    const onKey = (e) => e.key === "Escape" && setDetail(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [detail]);

  const totalSteps = HAKI_STEPS.length;
  const inProgress = HAKI_APPLICATIONS.filter((a) => a.step < totalSteps - 1).length;

  return (
    <div className="dhp">
      <h2 className="dhp__greeting">Good Morning, {user?.name || "Pengguna"}</h2>

      <div className="dhp__cards">
        <article className="dhp-card">
          <div className="dhp-card__top">
            <span className="dhp-card__label">Equity score</span>
            <span className="dhp-card__trend">
              <Icon name="arrowUp" />
            </span>
          </div>
          <p className="dhp-card__value">
            846 <span>Score</span>
          </p>
          <p className="dhp-card__sub">
            <span className="dhp-card__delta">+10%</span> last year
          </p>
          <button type="button" className="dhp-card__footer" onClick={() => setDetail("equity")}>
            Details
          </button>
        </article>

        <article className="dhp-card">
          <div className="dhp-card__top">
            <span className="dhp-card__label">Active purchase</span>
            <span className="dhp-card__trend">
              <Icon name="arrowUp" />
            </span>
          </div>
          <p className="dhp-card__value">80%</p>
          <p className="dhp-card__sub">
            <span className="dhp-card__delta">+10% contributes</span> 20 members
          </p>
          <button type="button" className="dhp-card__footer" onClick={() => setDetail("purchase")}>
            Details
          </button>
        </article>

        <article className="dhp-card dhp-card--resources">
          <span className="dhp-card__label">Shared resources</span>
          <div className="dhp-card__resource-row">
            <div>
              <p className="dhp-card__value dhp-card__value--sm">67%</p>
              <p className="dhp-card__sub">AI usage</p>
            </div>
            <div>
              <p className="dhp-card__value dhp-card__value--sm">30%</p>
              <p className="dhp-card__sub">Cloud usage</p>
            </div>
          </div>
          <div className="dhp-card__chart" aria-hidden="true" />
        </article>
      </div>

      {/* Quick actions */}
      <div className="dhp-qa">
        {QUICK_ACTIONS.map((q) => (
          <Link to={q.to} className="dhp-qa__item" key={q.label}>
            <span className="dhp-qa__icon">
              <Icon name={q.icon} />
            </span>
            <span className="dhp-qa__text">
              <strong>{q.label}</strong>
              <small>{q.desc}</small>
            </span>
            <span className="dhp-qa__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        ))}
      </div>

      <div className="dhp-grid">
        <div className="dhp-col">
          {/* Progress Haki Studio */}
          <section className="dhp-panel">
            <header className="dhp-panel__head">
              <div>
                <h3>Progress Haki Studio</h3>
                <p>{inProgress} pengajuan sedang diproses</p>
              </div>
              <Link to="/main/haki-studio" className="dhp-panel__link">
                Lihat semua →
              </Link>
            </header>

            <div className="dhp-haki">
              {HAKI_APPLICATIONS.map((a) => {
                const percent = Math.round(((a.step + 1) / totalSteps) * 100);
                const kind = a.step === totalSteps - 1 ? "done" : a.step === 0 ? "wait" : "proc";
                return (
                  <article className="dhp-haki__item" key={a.id}>
                    <div className="dhp-haki__row">
                      <span className="dhp-haki__badge">
                        <Icon name={a.type === "Hak Cipta" ? "copyright" : a.type === "Merek" ? "brand" : "designer"} />
                      </span>
                      <div className="dhp-haki__info">
                        <h4>{a.title}</h4>
                        <p>
                          {a.id} · {a.type}
                        </p>
                      </div>
                      <span className={`dhp-pill dhp-pill--${kind}`}>{a.status}</span>
                    </div>

                    <div className="dhp-bar" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
                      <span style={{ width: `${percent}%` }} />
                    </div>
                    <div className="dhp-haki__meta">
                      <span>Tahap: {HAKI_STEPS[a.step]}</span>
                      <span>{percent}%</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Aktivitas terbaru */}
          <section className="dhp-panel">
            <header className="dhp-panel__head">
              <div>
                <h3>Aktivitas Terbaru</h3>
                <p>Yang terjadi di koperasi Anda</p>
              </div>
            </header>
            <ul className="dhp-act">
              {ACTIVITIES.map((a) => (
                <li className="dhp-act__item" key={a.text}>
                  <span className={`dhp-act__dot dhp-act__dot--${a.tone}`} />
                  <div>
                    <p>{a.text}</p>
                    <small>{a.time}</small>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="dhp-col">
          {/* Shared Workforce */}
          <section className="dhp-panel">
            <header className="dhp-panel__head">
              <div>
                <h3>Shared Workforce</h3>
                <p>Talent yang siap membantu</p>
              </div>
              <Link to="/main/shared-workforce" className="dhp-panel__link">
                Lihat semua →
              </Link>
            </header>

            <div className="dhp-talent">
              {FREELANCERS.map((f, i) => {
                const busy = i === 2;
                return (
                  <article className="dhp-talent__item" key={f.name}>
                    <img src={f.photo} alt={f.name} className="dhp-talent__photo" />
                    <div className="dhp-talent__info">
                      <h4>{f.name}</h4>
                      <p>{f.role}</p>
                      <span className={`dhp-talent__status ${busy ? "dhp-talent__status--busy" : ""}`}>
                        <i /> {busy ? "Sedang sibuk" : "Tersedia"}
                      </span>
                    </div>
                    <div className="dhp-talent__side">
                      <strong>{f.price.replace("/Project", "")}</strong>
                      <Link to="/main/shared-workforce" className="dhp-talent__btn">
                        Ajak
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Kartu tips */}
          <section className="dhp-tip">
            <span className="dhp-tip__icon">
              <Icon name="shield" />
            </span>
            <div>
              <h3>Lindungi karya sebelum diluncurkan</h3>
              <p>Daftarkan merek dan desain kemasan produk Anda lebih awal agar tidak ditiru pihak lain.</p>
            </div>
            <Link to="/main/haki-studio" className="dhp-tip__btn">
              Mulai
            </Link>
          </section>
        </div>
      </div>

      {detail && <DetailModal type={detail} onClose={() => setDetail(null)} />}
    </div>
  );
}

function DetailModal({ type, onClose }) {
  const isEquity = type === "equity";

  return (
    <div className="dhp-modal__overlay" onClick={onClose}>
      <div className="dhp-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button type="button" className="dhp-modal__close" onClick={onClose} aria-label="Tutup">
          ✕
        </button>

        {isEquity ? (
          <>
            <div className="dhp-modal__hero">
              <div className="dhp-ring">
                <svg viewBox="0 0 120 120" width="132" height="132">
                  <circle cx="60" cy="60" r={RING_R} className="dhp-ring__track" />
                  <circle
                    cx="60"
                    cy="60"
                    r={RING_R}
                    className="dhp-ring__value"
                    strokeDasharray={RING_C}
                    strokeDashoffset={RING_C * (1 - EQUITY_DETAIL.score / EQUITY_DETAIL.max)}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="dhp-ring__text">
                  <strong>{EQUITY_DETAIL.score}</strong>
                  <span>/ {EQUITY_DETAIL.max}</span>
                </div>
              </div>
              <div>
                <span className="dhp-modal__badge">{EQUITY_DETAIL.level}</span>
                <h3>Equity Score Anda</h3>
                <p>Naik 10% dibanding tahun lalu. Skor ini mencerminkan seberapa aktif Anda di ekosistem Parakarsa.</p>
              </div>
            </div>

            <h4 className="dhp-modal__sub">Rincian skor</h4>
            <div className="dhp-modal__bars">
              {EQUITY_DETAIL.breakdown.map((b) => (
                <div key={b.label}>
                  <div className="dhp-modal__bar-row">
                    <span>{b.label}</span>
                    <strong>{b.value}%</strong>
                  </div>
                  <div className="dhp-bar">
                    <span style={{ width: `${b.value}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <h4 className="dhp-modal__sub">Cara menaikkan skor</h4>
            <ul className="dhp-modal__tips">
              {EQUITY_DETAIL.tips.map((t) => (
                <li key={t}>
                  <span>
                    <Icon name="check" width={12} height={12} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="dhp-modal__footer">
              <button type="button" className="btn btn-ghost" onClick={onClose}>
                Tutup
              </button>
              <Link to="/main/collective-purchase" className="btn btn-primary" onClick={onClose}>
                Tingkatkan Skor
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="dhp-modal__hero">
              <div className="dhp-ring">
                <svg viewBox="0 0 120 120" width="132" height="132">
                  <circle cx="60" cy="60" r={RING_R} className="dhp-ring__track" />
                  <circle
                    cx="60"
                    cy="60"
                    r={RING_R}
                    className="dhp-ring__value dhp-ring__value--amber"
                    strokeDasharray={RING_C}
                    strokeDashoffset={RING_C * (1 - PURCHASE_DETAIL.percent / 100)}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="dhp-ring__text">
                  <strong>{PURCHASE_DETAIL.percent}%</strong>
                  <span>terkumpul</span>
                </div>
              </div>
              <div>
                <span className="dhp-modal__badge">Sedang berjalan</span>
                <h3>Active Purchase</h3>
                <p>{PURCHASE_DETAIL.batch}</p>
              </div>
            </div>

            <div className="dhp-modal__stats">
              <div>
                <strong>
                  {PURCHASE_DETAIL.joined}/{PURCHASE_DETAIL.total}
                </strong>
                <span>Anggota ikut</span>
              </div>
              <div>
                <strong>{PURCHASE_DETAIL.deadline}</strong>
                <span>Tenggat</span>
              </div>
              <div>
                <strong className="dhp-modal__green">{PURCHASE_DETAIL.saving}</strong>
                <span>Estimasi hemat</span>
              </div>
            </div>

            <h4 className="dhp-modal__sub">Barang dalam batch ini</h4>
            <div className="dhp-modal__bars">
              {PURCHASE_DETAIL.items.map((it) => (
                <div key={it.name}>
                  <div className="dhp-modal__bar-row">
                    <span>{it.name}</span>
                    <strong>{it.percent}%</strong>
                  </div>
                  <div className="dhp-bar">
                    <span style={{ width: `${it.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="dhp-modal__footer">
              <button type="button" className="btn btn-ghost" onClick={onClose}>
                Tutup
              </button>
              <Link to="/main/collective-purchase" className="btn btn-primary" onClick={onClose}>
                Buka Collective Purchase
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}