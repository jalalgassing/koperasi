import { Link } from "react-router-dom";

const WA = "https://wa.me/6282263839920?text=";
const PICKS = [
  { label: "Cloud & AI", msg: "Halo Parakarsa, saya ingin tahu lebih lanjut tentang layanan Cloud & AI." },
  { label: "Perlindungan HAKI", msg: "Halo Parakarsa, saya ingin tahu lebih lanjut tentang layanan HAKI." },
  { label: "Kolaborasi & belanja kolektif", msg: "Halo Parakarsa, saya ingin tahu lebih lanjut tentang kolaborasi dan belanja kolektif." },
];

export default function ServiceCta() {
  return (
    <section className="section lyn-cta">
      <div className="container">
        <div className="lyn-cta__card">
          <div className="lyn-cta__copy">
            <h2>Belum yakin layanan mana yang paling cocok?</h2>
            <p>Ceritakan kebutuhan usaha Anda. Tim Parakarsa akan membantu memilih layanan yang tepat, tanpa biaya konsultasi.</p>
            <Link to="/daftar" className="btn btn-primary">Daftar sekarang <span className="btn-icon" aria-hidden="true">↗</span></Link>
          </div>
          <div className="lyn-cta__picks">
            <p>Tanya langsung via WhatsApp tentang:</p>
            {PICKS.map((p) => (
              <a key={p.label} className="lyn-cta__pick" href={`${WA}${encodeURIComponent(p.msg)}`} target="_blank" rel="noopener noreferrer">
                {p.label}<span aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
