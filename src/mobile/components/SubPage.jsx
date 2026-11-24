import { useNavigate } from "react-router-dom";
import MIcon from "./MIcons.jsx";
import useT from "../i18n.js";

// Kerangka halaman turunan: tombol kembali + judul.
export default function SubPage({ title, right = null, children, className = "" }) {
  const navigate = useNavigate();
  const t = useT();
  const back = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate("/main"));
  return (
    <div className={`m-sub ${className}`}>
      <div className="m-sub__bar">
        <button type="button" className="m-sub__back" onClick={back} aria-label={t("back")}>
          <MIcon name="chevron" size={20} style={{ transform: "rotate(180deg)" }} />
        </button>
        <h1>{title}</h1>
        <div className="m-sub__right">{right}</div>
      </div>
      {children}
    </div>
  );
}

// Switch on/off yang dipakai di Settings, Privacy, dll.
export function Switch({ checked, onChange, label }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} className={`m-switch ${checked ? "is-on" : ""}`} onClick={() => onChange(!checked)}>
      <i />
    </button>
  );
}

export function timeAgo(ts) {
  const m = Math.round((Date.now() - ts) / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} h ago`;
  return `${Math.round(h / 24)} d ago`;
}

export const rupiah = (n) => "Rp " + Math.round(n).toLocaleString("id-ID");

export const rupiahShort = (n) => `Rp ${(n / 1e6).toLocaleString("id-ID", { maximumFractionDigits: 1 })} jt`;
