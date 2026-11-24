import { useNavigate } from "react-router-dom";
import SubPage from "../../components/SubPage.jsx";
import MIcon from "../../components/MIcons.jsx";
import useT from "../../i18n.js";
import { MORE_LINKS, SHORTCUTS } from "../../../data/mobileSample.js";

export default function MorePage() {
  const t = useT();
  const navigate = useNavigate();
  const items = [
    ...SHORTCUTS.map((s) => ({ label: t(`menu.${s.id}`).replace("\n", " "), icon: s.icon, to: s.to, state: s.state })),
    ...MORE_LINKS,
  ];
  return (
    <SubPage title={t("title.more")}>
      <section className="m-card">
        {items.map((it) => (
          <button type="button" key={it.to + it.label} className="m-link-row" onClick={() => navigate(it.to, it.state ? { state: it.state } : undefined)}>
            <MIcon name={it.icon} size={20} /> {it.label}<MIcon name="chevron" size={16} />
          </button>
        ))}
      </section>
    </SubPage>
  );
}
