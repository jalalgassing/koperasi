import { useMemo, useState } from "react";
import SubPage, { timeAgo } from "../../components/SubPage.jsx";
import MIcon from "../../components/MIcons.jsx";
import useT from "../../i18n.js";
import usePersistentState from "../../../hooks/usePersistentState.js";
import useNotifications from "../../../hooks/useNotifications.js";
import { ACTIVITY_KEY } from "../../../services/activityLog.js";

export default function HistoryPage() {
  const t = useT();
  const [activity, setActivity] = usePersistentState(ACTIVITY_KEY, []);
  const { items: notifs } = useNotifications();
  const [filter, setFilter] = useState("all");

  const rows = useMemo(() => {
    const a = activity.map((x) => ({ id: x.id, kind: "activity", text: x.text, icon: x.icon || "check", at: x.at }));
    const n = notifs.filter((x) => x.memberId).map((x) => ({ id: x.id, kind: "incoming", text: `${x.title} ${x.text}`, icon: "bell", at: x.at }));
    return [...a, ...n].filter((r) => filter === "all" || r.kind === filter).sort((p, q) => q.at - p.at);
  }, [activity, notifs, filter]);

  return (
    <SubPage title={t("title.history")} right={activity.length > 0 && <button type="button" className="m-btn m-btn--ghost m-btn--sm" onClick={() => setActivity([])}>Clear</button>}>
      <div className="m-chips m-chips--tight">
        {[["all", "All"], ["activity", "My activity"], ["incoming", "From members"]].map(([k, l]) => <button type="button" key={k} className={`m-chip ${filter === k ? "is-active" : ""}`} aria-pressed={filter === k} onClick={() => setFilter(k)}>{l}</button>)}
      </div>
      {rows.length === 0 ? (
        <p className="m-empty">No activity yet. Favorite a member, join a purchase or share your ID and it will show up here.</p>
      ) : (
        <ul className="m-feed">
          {rows.map((r) => (
            <li key={`${r.kind}-${r.id}`} className="m-hist"><span className="m-feed__icon"><MIcon name={MIcon_OK[r.icon] ? r.icon : "check"} size={18} /></span><span className="m-feed__text"><strong>{r.text}</strong><small>{timeAgo(r.at)}</small></span></li>
          ))}
        </ul>
      )}
    </SubPage>
  );
}
const MIcon_OK = { check: 1, heart: 1, link: 1, share: 1, person: 1, bell: 1, cart: 1, integration: 1, roles: 1, lock: 1, camera: 1, user: 1, help: 1 };
