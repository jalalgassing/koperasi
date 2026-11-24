import { useNavigate } from "react-router-dom";
import MIcon from "../components/MIcons.jsx";
import useT from "../i18n.js";
import { useAuth } from "../../context/AuthContext.jsx";
import usePersistentState from "../../hooks/usePersistentState.js";
import defaultPhoto from "../../assets/images/mobile/profile-andika.png";

const GROUPS = [
  { title: "profile.account", items: [
    { key: "profile.manage", to: "/main/profile/manage" },
    { key: "profile.settings", to: "/main/profile/settings" },
    { key: "profile.security", to: "/main/profile/security" },
    { key: "profile.language", to: "/main/profile/language" },
  ] },
  { title: "profile.preferences", items: [
    { key: "profile.notifications", to: "/main/profile/notifications" },
    { key: "profile.favorites", to: "/main/shared-workforce", state: { onlyFav: true } },
    { key: "profile.privacy", to: "/main/profile/privacy" },
    { key: "profile.help", to: "/main/support" },
  ] },
];

export default function MobileProfile() {
  const t = useT();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [profile] = usePersistentState("parakarsa_profile", {});

  const onLogout = () => { logout(); navigate("/masuk", { replace: true }); };

  return (
    <div className="m-profile">
      <button type="button" className="m-profile__avatar" aria-label={t("profile.manage")} onClick={() => navigate("/main/profile/manage")}>
        <img src={profile.photo || defaultPhoto} alt="Profile photo" width="230" height="230" />
        <span className="m-profile__cam"><MIcon name="camera" size={16} /></span>
      </button>

      {GROUPS.map((g) => (
        <section className="m-panel" key={g.title}>
          <h3 className="m-panel__title">{t(g.title)}</h3>
          <div className="m-panel__list">
            {g.items.map((it) => (
              <button type="button" className="m-panel__row" key={it.key} onClick={() => navigate(it.to, it.state ? { state: it.state } : undefined)}>
                <MIcon name="hex" size={26} strokeWidth={1.6} />
                <span>{t(it.key)}</span>
                <MIcon name="chevron" size={16} className="m-panel__chev" />
              </button>
            ))}
          </div>
        </section>
      ))}

      <button type="button" className="m-logout" onClick={onLogout}>
        <MIcon name="logout" size={20} /> {t("profile.logout")}
      </button>
    </div>
  );
}
