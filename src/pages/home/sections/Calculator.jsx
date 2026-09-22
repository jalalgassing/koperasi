import { useState } from "react";
import "./Calculator.css";

const FIELDS = [
  { key: "ai", placeholder: "Biaya token AI dan software lainnya" },
  { key: "bahan", placeholder: "Biaya bahan baku dan distribusi" },
  { key: "lainnya", placeholder: "Biaya lainnya" },
];

// Lebar bar bersifat ilustratif (mengikuti mockup): "Tanpa Parakarsa" selalu
// berada di ujung "Mahal", sedangkan "Parakarsa" jauh lebih hemat.
const TANPA_WIDTH = 96;
const PARAKARSA_WIDTH = 38;

export default function Calculator() {
  const [values, setValues] = useState({ ai: "", bahan: "", lainnya: "" });

  const handleChange = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
  };

  return (
    <section className="section calculator">
      <div className="container">
        <div className="calc-heading">
          <h2>Memangnya jadi lebih murah?</h2>
          <p>
            Hitung sendiri dan lihat perbedaannya. Masukkan kebutuhan cloud dan AI
            Anda untuk mengetahui estimasi biaya yang dapat dihemat dengan menggunakan{" "}
            <strong>Parakarsa</strong>.
          </p>
        </div>

        <div className="calc-panel">
          <div className="calc-panel__left">
            <h4 className="calc-label">Proyeksi kehematan</h4>

            <div className="calc-bars">
              <div className="calc-bar-row">
                <div className="calc-bar-track">
                  <div
                    className="calc-bar calc-bar--parakarsa"
                    style={{ width: `${PARAKARSA_WIDTH}%` }}
                  >
                    <span>Parakarsa</span>
                  </div>
                </div>
              </div>
              <div className="calc-bar-row">
                <div className="calc-bar-track">
                  <div
                    className="calc-bar calc-bar--tanpa"
                    style={{ width: `${TANPA_WIDTH}%` }}
                  >
                    <span>Tanpa Parakarsa</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="calc-scale">
              <span>Hemat</span>
              <span>Sedang</span>
              <span>Mahal</span>
            </div>

            <h4 className="calc-label calc-label--spaced">Hitung penghematan</h4>
            <div className="calc-fields">
              {FIELDS.map((f) => (
                <input
                  key={f.key}
                  type="text"
                  inputMode="numeric"
                  placeholder={f.placeholder}
                  value={values[f.key]}
                  onChange={handleChange(f.key)}
                  className="calc-input"
                />
              ))}
            </div>
          </div>

          <div className="calc-panel__art" aria-hidden="true">
            <span>Illustrasi</span>
          </div>
        </div>
      </div>
    </section>
  );
}
