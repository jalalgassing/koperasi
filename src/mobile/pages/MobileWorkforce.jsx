import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MIcon from "../components/MIcons.jsx";
import useMemberRelations from "../../hooks/useMemberRelations.js";
import useMe from "../useMe.js";
import useT from "../i18n.js";
import { logActivity } from "../../services/activityLog.js";
import { sendMemberEvent } from "../../services/memberEvents.js";
import { MOBILE_FILTERS, MOBILE_MEMBERS } from "../../data/mobileMembers.js";

export default function MobileWorkforce() {
  const navigate = useNavigate();
  const location = useLocation();
  const t = useT();
  const me = useMe();
  const { favorites, toggleFavorite } = useMemberRelations();
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [onlyFav, setOnlyFav] = useState(Boolean(location.state?.onlyFav));

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MOBILE_MEMBERS.filter((m) => {
      if (onlyFav && !favorites.includes(m.memberId)) return false;
      if (tag !== "All" && m.tag !== tag) return false;
      if (q && !`${m.name} ${m.role} ${m.tag}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, tag, onlyFav, favorites]);

  const onHeart = (e, m) => {
    e.stopPropagation(); // klik hati tidak ikut membuka kartu anggota
    const willFav = !favorites.includes(m.memberId);
    toggleFavorite(m.memberId, willFav);
    logActivity(willFav ? `Added ${m.name} to favorites` : `Removed ${m.name} from favorites`, "heart");
    if (willFav) sendMemberEvent({ toMemberId: m.memberId, from: { memberId: me.memberId, name: me.name }, type: "favorite" });
  };

  const open = (m) => navigate(`/main/member-card/${m.memberId}`);

  return (
    <div className="m-wf">
      <label className="m-search m-search--full">
        <MIcon name="search" size={18} />
        <input type="search" placeholder={t("search")} value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search members" />
      </label>

      <div className="m-chips" role="toolbar" aria-label="Filter">
        <button type="button" className={`m-chip m-chip--fav ${onlyFav ? "is-active" : ""}`} aria-pressed={onlyFav} onClick={() => setOnlyFav((v) => !v)}>
          <MIcon name="heart" size={16} fill={onlyFav ? "currentColor" : "none"} />
          {t("chip.Favorites")}
        </button>
        {["All", ...MOBILE_FILTERS].map((f) => (
          <button type="button" key={f} className={`m-chip ${tag === f ? "is-active" : ""}`} aria-pressed={tag === f} onClick={() => setTag(f)}>
            {t(`chip.${f}`)}
          </button>
        ))}
      </div>

      <ul className="m-list">
        {list.map((m) => {
          const fav = favorites.includes(m.memberId);
          return (
            <li key={m.memberId}>
              <div className="m-person" role="button" tabIndex={0} onClick={() => open(m)} onKeyDown={(e) => e.key === "Enter" && open(m)}>
                <img src={m.photo} alt="" className="m-person__photo" width="70" height="70" loading="lazy" />
                <div className="m-person__info">
                  <h3>{m.name}</h3>
                  <p>{m.role} · {m.experience}</p>
                  <strong>{m.price}</strong>
                </div>
                <button type="button" className={`m-heart ${fav ? "is-on" : ""}`} aria-pressed={fav} aria-label={fav ? `Remove ${m.name} from favorites` : `Add ${m.name} to favorites`} onClick={(e) => onHeart(e, m)}>
                  <MIcon name="heart" size={18} fill={fav ? "currentColor" : "none"} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {list.length === 0 && (
        <p className="m-empty">
          {onlyFav && favorites.length === 0
            ? "No favorites yet. Tap the heart on a member to save them here."
            : "No members match your search."}
        </p>
      )}
    </div>
  );
}
