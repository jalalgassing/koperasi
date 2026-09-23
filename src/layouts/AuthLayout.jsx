import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "./AuthLayout.css";

/**
 * Layout dua kolom untuk halaman autentikasi (Masuk / Daftar).
 * - imageSide="left"  -> panel visual grey di kiri, form di kanan (Login)
 * - imageSide="right" -> panel visual grey di kanan, form di kiri (Daftar)
 */
export default function AuthLayout({ children, imageSide = "left", pageLabel }) {
  return (
    <section className="auth">
      <div className={`auth__card auth__card--image-${imageSide}`}>
        <div className="auth__visual">
          <Link to="/" className="auth__logo">
            <img src={logo} alt="Parakarsa" />
          </Link>
        </div>

        <div className="auth__panel">
          <Link to="/" className="btn btn-primary auth__back">
            Kembali
          </Link>

          {pageLabel && <p className="auth__page-label">{pageLabel}</p>}

          {children}
        </div>
      </div>
    </section>
  );
}