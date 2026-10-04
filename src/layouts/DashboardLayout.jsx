import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { SIDEBAR_NAV } from "../data/sidebarNav.js";
import { Icon } from "./icons.jsx";
import logo from "../assets/images/logo.png";
import "./DashboardLayout.css";

/**
 * Shell aplikasi untuk semua halaman "Main" (setelah login): sidebar kiri +
 * topbar atas, kontennya di-render lewat <Outlet /> (diisi oleh route anak
 * di App.jsx). Dipakai untuk Home, AI Generative Studio, Shared Workforce,
 * dan seluruh halaman "Segera Hadir" lain di sidebar.
 */
export default function DashboardLayout({ pageTitle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = (user?.name || "P")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dash">
      <aside className="dash-sidebar">
        <div className="dash-sidebar__brand">
          <img src={logo} alt="Parakarsa" />
        </div>

        <nav className="dash-sidebar__nav">
          {SIDEBAR_NAV.map((group) => (
            <div className="dash-sidebar__group" key={group.group}>
              <p className="dash-sidebar__group-label">{group.group}</p>
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/main"}
                  className={({ isActive }) =>
                    `dash-sidebar__link ${isActive ? "dash-sidebar__link--active" : ""}`
                  }
                >
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <button type="button" className="dash-sidebar__profile" onClick={handleLogout} title="Klik untuk logout">
          <span className="dash-sidebar__avatar">{initials}</span>
          <span className="dash-sidebar__profile-text">
            <strong>{user?.name || "Pengguna"}</strong>
            <small>{user?.role || "Anggota"}</small>
          </span>
        </button>
      </aside>

      <div className="dash-main">
        <header className="dash-topbar">
          <h1 className="dash-topbar__title">{pageTitle}</h1>

          <div className="dash-topbar__search">
            <Icon name="search" />
            <input type="text" placeholder="Search" />
          </div>

          <div className="dash-topbar__actions">
            <button type="button" className="dash-icon-btn dash-icon-btn--round" aria-label="Tambah">
              <Icon name="plus" />
            </button>
            <div className="dash-avatar-group" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <button type="button" className="btn btn-primary dash-invite-btn">
              Invite
            </button>
            <button type="button" className="dash-icon-btn" aria-label="Notifikasi">
              <Icon name="bell" />
            </button>
            <button type="button" className="dash-icon-btn dash-icon-btn--dark" aria-label="Pesan">
              <Icon name="chat" />
            </button>
          </div>
        </header>

        <main className="dash-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
