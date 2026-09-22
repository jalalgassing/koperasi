import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "./Footer.css";

const EXPLORE_LINKS = [
  { label: "Tentang Kami", to: "/tentang-kami" },
  { label: "Program", to: "/tentang-kami" },
  { label: "Galeri", to: "/tentang-kami" },
  { label: "Testimoni", to: "/#testimoni" },
];

const PROGRAM_LINKS = [
  { label: "Para Proven", to: "/tentang-kami" },
  { label: "Para Connect", to: "/tentang-kami" },
  { label: "Para Beyond", to: "/tentang-kami" },
];

const SOCIALS = [
  { label: "Facebook", href: "#" },
  { label: "X", href: "#" },
  { label: "WhatsApp", href: "https://wa.me/6282263839920" },
  { label: "Instagram", href: "#" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src={logo} alt="Parakarsa" className="footer__logo" />
        </div>

        <div className="footer__col">
          <h4>Explore</h4>
          <ul>
            {EXPLORE_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Program</h4>
          <ul>
            {PROGRAM_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Email</h4>
          <a className="footer__email" href="mailto:helloparakarsa@gmail.com">
            helloparakarsa@gmail.com
          </a>
          <h4 className="footer__wa-label">Hubungi Via WhatsApp</h4>
          <p>+6282263839920</p>
          <div className="footer__socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer">
                <SocialIcon name={s.label} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8 };
  switch (name) {
    case "Facebook":
      return (
        <svg {...common}>
          <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9z" />
        </svg>
      );
    case "X":
      return (
        <svg {...common}>
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      );
    case "WhatsApp":
      return (
        <svg {...common}>
          <path d="M20 12a8 8 0 1 1-3.8-6.8L20 4l-1 3.9A7.96 7.96 0 0 1 20 12z" />
          <path d="M9 10.5c.3 2 2.2 3.9 4.2 4.2" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="12" r="3.2" />
        </svg>
      );
  }
}
