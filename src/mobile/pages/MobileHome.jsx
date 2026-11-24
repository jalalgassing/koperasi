import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MIcon from "../components/MIcons.jsx";
import MemberQR from "../components/MemberQR.jsx";
import BannerCarousel from "../components/BannerCarousel.jsx";
import { BANNER_SLIDES } from "../../data/bannerSlides.js";
import { DEFAULT_SHORTCUTS, SHORTCUTS } from "../../data/mobileSample.js";
import { MOBILE_MEMBERS } from "../../data/mobileMembers.js";
import usePersistentState from "../../hooks/usePersistentState.js";
import useMe from "../useMe.js";
import useT from "../i18n.js";
import upworth from "../../assets/images/mobile/upworth.png";
import logo from "../../assets/images/logo.png";

export default function MobileHome() {
  const me = useMe();
  const t = useT();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(false);
  const [chosen, setChosen] = usePersistentState("parakarsa_shortcuts", DEFAULT_SHORTCUTS);

  const go = (item) => navigate(item.to, item.state ? { state: item.state } : undefined);
  const label = (id) => t(`menu.${id}`);
  const visible = editing ? SHORTCUTS : SHORTCUTS.filter((s) => chosen.includes(s.id)).sort((a, b) => chosen.indexOf(a.id) - chosen.indexOf(b.id));
  const toggleChosen = (id) => setChosen((cur) => (cur.includes(id) ? (cur.length > 1 ? cur.filter((x) => x !== id) : cur) : [...cur, id]));

  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!q) return null;
    const features = SHORTCUTS.filter((s) => label(s.id).replace("\n", " ").toLowerCase().includes(q)).map((s) => ({ key: s.id, kind: "feature", title: label(s.id).replace("\n", " "), icon: s.icon, go: () => go(s) }));
    const members = MOBILE_MEMBERS.filter((m) => `${m.name} ${m.role}`.toLowerCase().includes(q)).map((m) => ({ key: m.memberId, kind: "member", title: m.name, sub: m.role, photo: m.photo, go: () => navigate(`/main/member-card/${m.memberId}`) }));
    return [...features, ...members];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <div className="m-home">
      <section className="m-home__top">
        <div role="button" tabIndex={0} className="m-idcard" aria-label="Open my member ID" onClick={() => navigate("/main/member-card")} onKeyDown={(e) => e.key === "Enter" && navigate("/main/member-card")}>
          <div className="m-idcard__strip">
            <img src={logo} alt="Parakarsa" />
            <span>Member Card</span>
          </div>
          <div className="m-idcard__body">
            <h2>{me.name}</h2>
            <p>{me.display}</p>
            <small>Expired 2030</small>
            <div className="m-idcard__qr"><MemberQR value={me.url} size={56} quiet={1} dark="#2f5a50" /></div>
          </div>
        </div>

        <BannerCarousel slides={BANNER_SLIDES} />
      </section>

      <section className="m-home__menu">
        <div className="m-searchrow">
          <label className="m-search">
            <MIcon name="search" size={18} />
            <input type="search" placeholder={t("search")} aria-label={t("search")} value={query} onChange={(e) => setQuery(e.target.value)} />
            {query && <button type="button" className="m-search__clear" aria-label="Clear search" onClick={() => setQuery("")}><MIcon name="close" size={16} /></button>}
          </label>
          <button type="button" className={`m-square-btn ${editing ? "is-active" : ""}`} aria-label={editing ? t("done") : t("edit")} aria-pressed={editing} onClick={() => { setEditing((v) => !v); setQuery(""); }}>
            <MIcon name={editing ? "check" : "edit"} size={22} />
          </button>
        </div>

        {results ? (
          <ul className="m-results">
            {results.length === 0 && <li className="m-results__empty">No results for “{query}”.</li>}
            {results.map((r) => (
              <li key={`${r.kind}-${r.key}`}>
                <button type="button" onClick={r.go}>
                  {r.kind === "member" ? <img src={r.photo} alt="" width="36" height="36" /> : <span className="m-results__icon"><MIcon name={r.icon} size={18} /></span>}
                  <span><strong>{r.title}</strong>{r.sub && <small>{r.sub}</small>}</span>
                  <MIcon name="chevron" size={16} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <>
            {editing && <p className="m-edit-hint">Tap + / − to add or remove shortcuts, then press ✓.</p>}
            <div className="m-grid" role="list">
              {visible.map((m) => {
                const on = chosen.includes(m.id);
                return (
                  <button
                    type="button" role="listitem" key={m.id} className={`m-grid__item ${editing && !on ? "is-off" : ""}`}
                    onClick={() => (editing ? toggleChosen(m.id) : go(m))}
                  >
                    <span className="m-grid__icon">
                      <MIcon name={m.icon} size={24} />
                      {editing && <span className={`m-grid__badge ${on ? "is-on" : ""}`}><MIcon name={on ? "minus" : "plus"} size={12} strokeWidth={3} /></span>}
                    </span>
                    <span className="m-grid__label">{label(m.id)}</span>
                  </button>
                );
              })}
            </div>
            <button type="button" className="m-more" onClick={() => navigate("/main/more")}><span>{t("more")}</span></button>
          </>
        )}
      </section>

      <section className="m-upworth" aria-label="Upworth">
        <img src={upworth} alt="Upworth - Your contribution moves us forward. 846 points, earn 154 more points to reach 1,000" width="402" height="551" />
        {/* area kartu poin pada gambar dibuat bisa diklik */}
        <button type="button" className="m-upworth__hit" aria-label="Open Upworth details" onClick={() => navigate("/main/upworth")} />
      </section>
    </div>
  );
}
