import { useNavigate } from "react-router-dom";
import SubPage, { timeAgo } from "../../components/SubPage.jsx";
import MIcon, { DefaultAvatar } from "../../components/MIcons.jsx";
import useT from "../../i18n.js";
import useNotifications from "../../../hooks/useNotifications.js";
import { clearNotifications, markAllRead, markRead } from "../../../services/notifications.js";
import { findMember } from "../../../data/mobileMembers.js";

export default function NotificationsPage() {
  const t = useT();
  const navigate = useNavigate();
  const { items, unread } = useNotifications();

  const open = (n) => {
    markRead(n.id);
    if (n.memberId) navigate(`/main/member-card/${n.memberId}${n.memberName ? `?name=${encodeURIComponent(n.memberName)}` : ""}`);
  };

  return (
    <SubPage title={t("title.notifications")}>
      <div className="m-toolbar">
        <button type="button" className="m-btn m-btn--ghost" disabled={unread === 0} onClick={markAllRead}><MIcon name="check" size={16} /> Mark all as read</button>
        <button type="button" className="m-btn m-btn--ghost" disabled={items.length === 0} onClick={clearNotifications}><MIcon name="trash" size={16} /> Clear</button>
      </div>
      {items.length === 0 ? (
        <p className="m-empty">You’re all caught up. New notifications will show up here.</p>
      ) : (
        <ul className="m-feed">
          {items.map((n) => {
            const sender = n.memberId ? findMember(n.memberId) : null;
            return (
              <li key={n.id}>
                <button type="button" className={`m-feed__item ${n.read ? "" : "is-unread"}`} onClick={() => open(n)}>
                  {n.memberId
                    ? (sender?.photo ? <img src={sender.photo} alt="" width="44" height="44" /> : <DefaultAvatar size={44} />)
                    : <span className="m-feed__icon"><MIcon name="bell" size={20} /></span>}
                  <span className="m-feed__text"><strong>{n.title}</strong><span>{n.text}</span><small>{timeAgo(n.at)}</small></span>
                  {!n.read && <i className="m-dot" aria-label="Unread" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </SubPage>
  );
}
