import { Link } from "react-router-dom";

const WA = "https://wa.me/6282263839920?text=" + encodeURIComponent("Halo Parakarsa, saya ingin berkonsultasi tentang usaha saya.");
const EMAIL = "helloparakarsa@gmail.com";

const Icon = ({ children }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

const CHANNELS = [
  { label: "WhatsApp", value: "Chat dengan tim kami", href: WA, external: true,
    icon: <Icon><path d="M4 20l1.4-4.6A8 8 0 1110 19z" /><path d="M9.5 9.5c0 3 2 5 5 5l1-1.5-2-1-.8.7a3.5 3.5 0 01-1.6-1.6l.7-.8-1-2z" /></Icon> },
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`,
    icon: <Icon><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="M3.5 7l8.5 6 8.5-6" /></Icon> },
  { label: "Daftar anggota", value: "Buat akun dan mulai bergabung", to: "/daftar",
    icon: <Icon><circle cx="10" cy="8" r="3.5" /><path d="M3.5 20c0-3.5 3-6 6.5-6M18 12v6M15 15h6" /></Icon> },
];

export default function AboutContact() {
  return (
    <section className="section tks-contact">
      <div className="container">
        <div className="tks-contact__box">
          <span className="tks-contact__ring tks-contact__ring--a" aria-hidden="true" />
          <span className="tks-contact__ring tks-contact__ring--b" aria-hidden="true" />

          <div className="tks-contact__copy">
            <span className="tks-contact__badge">Konsultasi gratis</span>
            <h2>Mari ngobrol tentang <span>usaha Anda.</span></h2>
            <p>Punya pertanyaan, ide kolaborasi, atau ingin tahu cara bergabung? Pilih jalur yang paling nyaman untuk Anda.</p>
          </div>

          <div className="tks-contact__list">
            {CHANNELS.map((c) => {
              const inner = (
                <>
                  <span className="tks-channel__icon">{c.icon}</span>
                  <span className="tks-channel__text"><small>{c.label}</small><strong>{c.value}</strong></span>
                  <i aria-hidden="true">→</i>
                </>
              );
              return c.to ? (
                <Link key={c.label} to={c.to} className="tks-channel">{inner}</Link>
              ) : (
                <a key={c.label} href={c.href} className="tks-channel" {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}</a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
