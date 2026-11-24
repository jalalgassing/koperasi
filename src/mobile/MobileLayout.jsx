import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BottomNav from "./components/BottomNav.jsx";
import EventBanner from "./components/EventBanner.jsx";
import MIcon from "./components/MIcons.jsx";
import useMe, { greetingKey } from "./useMe.js";
import useT from "./i18n.js";
import useNotifications from "../hooks/useNotifications.js";
import "./mobile.css";

// Halaman web lama yang ditampilkan apa adanya di dalam shell mobile.
const WEB_PAGES = ["/main/haki-studio", "/main/ai-generative-studio", "/main/trending"];

/**
 * Shell tampilan mobile (<= 820px) setelah login: header sapaan (tombol
 * bantuan & notifikasi), konten yang scroll biasa, dan bottom nav fixed.
 * Konten diberi padding-bottom setinggi nav supaya tidak tertimpa.
 */
export default function MobileLayout() {
  const me = useMe();
  const t = useT();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { unread } = useNotifications();
  const theme = pathname === "/main/member-card" ? "m-app--green" : "";
  const web = WEB_PAGES.includes(pathname) ? "m-content--web" : "";

  return (
    <div className={`m-app ${theme}`}>
      <header className="m-header">
        <div className="m-header__hello">
          <span>{t(greetingKey())}</span>
          <strong>{me.name}</strong>
        </div>
        <div className="m-header__actions">
          <button type="button" className="m-round-btn" aria-label={t("menu.support")} onClick={() => navigate("/main/support")}>
            <MIcon name="headset" size={20} />
          </button>
          <button type="button" className="m-round-btn" aria-label={t("menu.notifications")} onClick={() => navigate("/main/notifications")}>
            <MIcon name="bell" size={20} />
            {unread > 0 && <span className="m-badge">{unread > 9 ? "9+" : unread}</span>}
          </button>
        </div>
      </header>

      <div className={`m-content ${web}`}>
        <Outlet />
      </div>

      <BottomNav />
      <EventBanner />
    </div>
  );
}
