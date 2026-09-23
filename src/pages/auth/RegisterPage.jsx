import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout.jsx";
import { EyeIcon, EyeOffIcon } from "./icons.jsx";
import "./AuthForm.css";

const INITIAL_FORM = {
  fullName: "",
  identifier: "",
  address: "",
  password: "",
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { fullName, identifier, address, password } = form;
    if (!fullName.trim() || !identifier.trim() || !address.trim() || !password.trim()) {
      setError("Semua kolom wajib diisi.");
      return;
    }

    // TODO: hubungkan ke service autentikasi saat backend tersedia.
    console.log("Daftar:", form);
    navigate("/masuk");
  };

  return (
    <AuthLayout imageSide="right" pageLabel="Daftar">
      <div className="auth-heading">
        <p className="auth-heading__eyebrow">Parakarsa</p>
        <h1 className="auth-heading__title">Smart Aggregator Hub</h1>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-field">
          <input
            type="text"
            name="fullName"
            className="auth-field__input"
            placeholder="Masukkan Nama Lengkap"
            value={form.fullName}
            onChange={handleChange}
            autoComplete="name"
          />
        </div>

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

        <div className="auth-field">
          <input
            type="text"
            name="address"
            className="auth-field__input"
            placeholder="Alamat"
            value={form.address}
            onChange={handleChange}
            autoComplete="street-address"
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
            autoComplete="new-password"
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

        <button type="submit" className="btn btn-primary auth-form__submit">
          Daftar
        </button>
      </form>

      <p className="auth-form__switch">
        Sudah memiliki akun? <Link to="/masuk">Masuk</Link>
      </p>
    </AuthLayout>
  );
}