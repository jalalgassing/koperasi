import { IconCart, IconUsers, IconTrend, IconShield, IconArrow } from "../../../components/MintIcons.jsx";

// Ilustrasi laptop + ikon melayang (dibuat dengan SVG/CSS, mengikuti mockup).
function HeroArt() {
  return (
    <div className="lyh-art" aria-hidden="true">
      <svg className="lyh-art__blob" viewBox="0 0 480 400" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lyhBlob" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#dff2e8" />
            <stop offset="1" stopColor="#bfe3d0" />
          </linearGradient>
        </defs>
        <path
          d="M70 120C90 40 210 10 300 40c90 30 170 90 160 190-10 100-110 150-210 140C140 360 40 330 30 240c-4-45 10-85 40-120z"
          fill="url(#lyhBlob)"
        />
      </svg>

      <svg className="lyh-art__laptop" viewBox="0 0 320 230">
        <rect x="42" y="10" width="236" height="156" rx="12" fill="#fff" stroke="#1d2b27" strokeWidth="5" />
        <g fill="none" stroke="#0a453b" strokeWidth="9" strokeLinejoin="round">
          <rect x="132" y="52" width="46" height="46" rx="5" />
          <rect x="152" y="72" width="46" height="46" rx="5" />
        </g>
        <path d="M14 172h292l-14 24a10 10 0 01-9 5H37a10 10 0 01-9-5z" fill="#2a3532" />
        <rect x="130" y="172" width="60" height="6" rx="3" fill="#46524e" />
      </svg>

      <span className="lyh-tile lyh-tile--cart"><IconCart size={30} /></span>
      <span className="lyh-tile lyh-tile--users"><IconUsers size={30} /></span>
      <span className="lyh-tile lyh-tile--trend"><IconTrend size={30} /></span>
      <span className="lyh-tile lyh-tile--shield"><IconShield size={30} /></span>

      <svg className="lyh-art__spark lyh-art__spark--a" viewBox="0 0 40 40">
        <path d="M6 30l6-8M18 14l2-12M30 18l8-5" fill="none" stroke="#0a453b" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function LayananHero() {
  const goExplore = () => {
    document.getElementById("layanan-unggulan")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="mk-hero lyh">
      <div className="container lyh__grid">
        <div className="lyh__copy">
          <span className="mk-pill">Layanan Kami</span>
          <h1 className="mk-hero__title">
            Solusi yang mendukung
            <br />
            pertumbuhan bisnis anda
          </h1>
          <p className="mk-hero__desc">
            Berbagai layanan dan teknologi yang dirancang untuk membantu UMKM,
            koperasi, dan badan usaha kecil-menengah berkembang lebih mudah.
          </p>
          <button type="button" className="btn btn-primary mk-hero__cta" onClick={goExplore}>
            Jelajahi Layanan <IconArrow size={16} />
          </button>
        </div>
        <HeroArt />
      </div>
    </section>
  );
}
