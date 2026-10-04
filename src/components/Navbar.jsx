import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
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
  const { user, isLoggedIn, logout } = useAuth();

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
            {isLoggedIn ? (
              <ProfileMenu user={user} logout={logout} onNavigate={() => setIsOpen(false)} mobile />
            ) : (
              <>
                <Link to="/masuk" className="btn btn-ghost" onClick={() => setIsOpen(false)}>
                  Masuk
                </Link>
                <Link to="/daftar" className="btn btn-amber" onClick={() => setIsOpen(false)}>
                  Daftar <span aria-hidden="true">→</span>
                </Link>
              </>
            )}
          </div>
        </nav>

        <div className="navbar__actions">
          {isLoggedIn ? (
            <ProfileMenu user={user} logout={logout} />
          ) : (
            <>
              <Link to="/masuk" className="btn btn-ghost">
                Masuk
              </Link>
              <Link to="/daftar" className="btn btn-amber">
                Daftar <span aria-hidden="true">→</span>
              </Link>
            </>
          )}
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

function ProfileMenu({ user, logout, onNavigate, mobile = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const initials = (user?.name || "P")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const goToMain = () => {
    setOpen(false);
    onNavigate?.();
    navigate("/main");
  };

  const handleLogout = () => {
    setOpen(false);
    onNavigate?.();
    logout();
    navigate("/");
  };

  return (
    <div className={`profile-menu ${mobile ? "profile-menu--mobile" : ""}`} ref={ref}>
      <button
        type="button"
        className="profile-menu__trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="profile-menu__avatar" aria-hidden="true">
          {initials}
        </span>
        <span className="profile-menu__name">{user?.name || "Pengguna"}</span>
        <span className={`profile-menu__chevron ${open ? "profile-menu__chevron--up" : ""}`} aria-hidden="true">
          ⌄
        </span>
      </button>

      {open && (
        <div className="profile-menu__dropdown">
          <button type="button" className="profile-menu__item" onClick={goToMain}>
            Main
          </button>
          <button type="button" className="profile-menu__item profile-menu__item--danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
