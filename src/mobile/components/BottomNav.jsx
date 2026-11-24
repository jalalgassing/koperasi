import { NavLink } from "react-router-dom";
import MIcon from "./MIcons.jsx";
import useT from "../i18n.js";

const ITEMS = [
  { key: "nav.home", to: "/main", end: true, icon: "home", iconActive: "homeFill" },
  { key: "nav.workforce", to: "/main/shared-workforce", icon: "briefcase", iconActive: "briefcaseFill" },
  { key: "nav.memberId", to: "/main/member-card", icon: "card", iconActive: "cardFill" },
  { key: "nav.profile", to: "/main/profile", icon: "person", iconActive: "personFill" },
];

export default function BottomNav() {
  const t = useT();
  return (
    <nav className="m-nav" aria-label="Main navigation">
      {ITEMS.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `m-nav__item ${isActive ? "is-active" : ""}`}>
          {({ isActive }) => (
            <>
              <MIcon name={isActive ? item.iconActive : item.icon} size={26} />
              <span>{t(item.key)}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
