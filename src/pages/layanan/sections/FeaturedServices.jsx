import { Link } from "react-router-dom";
import { IconCart, IconChart, IconTrophy, IconShield, IconPuzzle, IconArrow } from "../../../components/MintIcons.jsx";

const FEATURES = [
  { title: "Collective Purchase", text: "Pembelian bersama dengan harga lebih hemat.", icon: <IconCart size={26} /> },
  { title: "Financial Report", text: "Laporan keuangan koperasi secara transparan.", icon: <IconChart size={26} /> },
  { title: "Team Performance", text: "Pantau kinerja tim dengan mudah.", icon: <IconTrophy size={26} /> },
  { title: "Roles & Permissions", text: "Atur peran dan akses pengguna.", icon: <IconShield size={26} /> },
  { title: "Integrations", text: "Hubungkan dengan berbagai layanan pihak ketiga.", icon: <IconPuzzle size={26} /> },
];

export default function FeaturedServices() {
  return (
    <section className="section lyf" id="layanan-unggulan">
      <div className="container">
        <div className="mk-head">
          <h2>Layanan Unggulan Kami</h2>
          <p>Dari kolaborasi hingga pengelolaan, semua dalam satu platform.</p>
        </div>

        <div className="lyf__grid">
          {FEATURES.map((f) => (
            <Link to="/daftar" className="lyf-card" key={f.title}>
              <span className="mk-icon lyf-card__icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
              <span className="lyf-card__go" aria-hidden="true">
                <IconArrow size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
