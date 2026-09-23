import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout.jsx";
import { EyeIcon, EyeOffIcon } from "./icons.jsx";
import "./AuthForm.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.identifier.trim() || !form.password.trim()) {
      setError("NIK/NIB dan password wajib diisi.");
      return;
    }

    // TODO: hubungkan ke service autentikasi saat backend tersedia.
    console.log("Masuk:", form);
    navigate("/");
  };

  return (
    <AuthLayout imageSide="left" pageLabel="Masuk">
      <div className="auth-heading">
        <p className="auth-heading__eyebrow">Parakarsa</p>
        <h1 className="auth-heading__title">Smart Aggregator Hub</h1>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-field">
          <input
            type="text"
            name="identifier"
            className="auth-field__input"
            placeholder="Masukkan NIK/NIB"
            value={form.identifier}
            onChange={handleChange}
            autoComplete="username"
          />
        </div>

        <div className="auth-field auth-field--password">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="auth-field__input"
            placeholder="Masukkan Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <button
            type="button"
            className="auth-field__toggle"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        {error && <p className="auth-form__error">{error}</p>}

        <Link to="/lupa-password" className="auth-form__forgot">
          Lupa password?
        </Link>

        <button type="submit" className="btn btn-primary auth-form__submit">
          Masuk
        </button>
      </form>

      <p className="auth-form__switch">
        Belum memiliki akun? <Link to="/daftar">Daftar</Link>
      </p>
    </AuthLayout>
  );
}