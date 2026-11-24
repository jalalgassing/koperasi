import { IconUsers, IconHandshake, IconStar, IconEye, IconTarget } from "../../../components/MintIcons.jsx";
import office from "../../../assets/images/mockup/kantor-parakarsa.png";

const STATS = [
  { value: "100+", label: "Anggota Aktif", icon: <IconUsers size={22} /> },
  { value: "10+", label: "Mitra Strategis", icon: <IconHandshake size={22} /> },
  { value: "5+", label: "Tahun Berkarya", icon: <IconStar size={22} /> },
];

const VISI_MISI = [
  {
    label: "Visi",
    text: "Menjadi koperasi digital terdepan yang menginspirasi kolaborasi dan kesejahteraan anggota di Indonesia.",
    icon: <IconEye size={22} />,
  },
  {
    label: "Misi",
    text: "Menyediakan platform kolaboratif, memperkuat jaringan anggota, dan mendorong pertumbuhan bersama secara berkelanjutan.",
    icon: <IconTarget size={22} />,
  },
];

export default function AboutIntro() {
  return (
    <section className="section tki" id="siapa-kami">
      <div className="container">
        <div className="tki__top">
          <div className="mk-head tki__who">
            <h2>Siapa Kami?</h2>
            <p>
              Parakarsa merupakan koperasi industri kolektif yang berfokus pada
              pemberdayaan anggota melalui teknologi dan kolaborasi lintas
              sektor. Kami percaya bahwa dengan bekerja bersama, kita bisa
              mencapai lebih banyak hal.
            </p>
          </div>

          <ul className="tki-stats">
            {STATS.map((s) => (
              <li className="tki-stat" key={s.label}>
                <span className="mk-icon tki-stat__icon">{s.icon}</span>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="tki__bottom">
          <img className="tki__photo" src={office} alt="Suasana kerja tim Parakarsa" />

          <div className="mk-head tki-vm">
            <h2>Visi &amp; Misi</h2>
            <div className="tki-vm__list">
              {VISI_MISI.map((v) => (
                <div className="tki-vm__item" key={v.label}>
                  <span className="mk-icon tki-vm__icon">{v.icon}</span>
                  <div>
                    <h3>{v.label}</h3>
                    <p>{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
