import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Beranda", to: "/" },
  { label: "Layanan", to: "/layanan" },
  { label: "Tentang Kami", to: "/tentang-kami" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={() => setIsOpen(false)}>
          <img src={logo} alt="Parakarsa" />
        </Link>

        <nav className={`navbar__links ${isOpen ? "navbar__links--open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `navbar__link ${isActive ? "navbar__link--active" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}

          <div className="navbar__actions navbar__actions--mobile">
            <Link to="/masuk" className="btn btn-ghost" onClick={() => setIsOpen(false)}>
              Masuk
            </Link>
            <Link to="/daftar" className="btn btn-amber" onClick={() => setIsOpen(false)}>
              Daftar <span aria-hidden="true">→</span>
            </Link>
          </div>
        </nav>

        <div className="navbar__actions">
          <Link to="/masuk" className="btn btn-ghost">
            Masuk
          </Link>
          <Link to="/daftar" className="btn btn-amber">
            Daftar <span aria-hidden="true">→</span>
          </Link>
        </div>

        <button
          className={`navbar__toggle ${isOpen ? "navbar__toggle--open" : ""}`}
          aria-label="Buka menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
