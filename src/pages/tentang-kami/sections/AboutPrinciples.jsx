import { IconHandshake, IconBulb, IconShield, IconTrend } from "../../../components/MintIcons.jsx";

const PRINCIPLES = [
  { title: "Kolaboratif", text: "Bersama lebih kuat", icon: <IconHandshake size={24} /> },
  { title: "Inovatif", text: "Selalu beradaptasi", icon: <IconBulb size={24} /> },
  { title: "Transparan", text: "Terbuka dan akuntabel", icon: <IconShield size={24} /> },
  { title: "Berkelanjutan", text: "Untuk masa depan", icon: <IconTrend size={24} /> },
];

export default function AboutPrinciples() {
  return (
    <section className="section tkp">
      <span className="tkp__wave" aria-hidden="true" />
      <div className="container">
        <div className="mk-head">
          <h2>Nilai-Nilai Kami</h2>
          <p>Prinsip yang selalu kami pegang dalam setiap langkah.</p>
        </div>

        <div className="tkp__grid">
          {PRINCIPLES.map((p) => (
            <article className="tkp-card" key={p.title}>
              <span className="mk-icon tkp-card__icon">{p.icon}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
