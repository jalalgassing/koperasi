import { Link } from "react-router-dom";
import "./PlaceholderPage.css";

export default function PlaceholderPage({ title }) {
  return (
    <section className="placeholder-page">
      <div className="container placeholder-page__inner">
        <p className="placeholder-page__eyebrow">Segera Hadir</p>
        <h1>{title}</h1>
        <p className="placeholder-page__desc">
          Halaman ini masih dalam pengembangan. Sementara itu, kembali ke beranda
          untuk melihat halaman yang sudah tersedia.
        </p>
        <Link to="/" className="btn btn-primary">
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  );
}
