import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultAvatar } from "./MIcons.jsx";
import useMe from "../useMe.js";
import useSettings from "../../hooks/useSettings.js";
import { addNotification } from "../../services/notifications.js";
import { findMember, MOBILE_MEMBERS } from "../../data/mobileMembers.js";
import { EVENT_TEXT, sendMemberEvent, subscribeMemberEvents } from "../../services/memberEvents.js";

const SHOW_MS = 5000;

// Notifikasi di atas layar. Muncul HANYA kalau anggota LAIN berinteraksi dengan
// kartu/member ID kita (lihat services/memberEvents.js) - tidak ada pemicu lain.
export default function EventBanner() {
  const me = useMe();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const timer = useRef(null);
  const [settings] = useSettings();
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const unsub = subscribeMemberEvents(me.memberId, (ev) => {
      const st = settingsRef.current;
      // Privasi: abaikan jenis interaksi yang dimatikan user
      if ((ev.type === "friend" && !st.allowFriend) || (ev.type === "collaborate" && !st.allowCollab)) return;
      // Selalu simpan ke daftar notifikasi; banner atas hanya kalau diizinkan
      addNotification({ id: ev.id, title: ev.from.name, text: EVENT_TEXT[ev.type], memberId: ev.from.memberId, memberName: ev.from.name, type: ev.type, at: ev.at });
      const typeKey = { friend: "pushFriend", favorite: "pushFavorite", collaborate: "pushCollab", sent_id: "pushSent" }[ev.type];
      if (!st.push || !st[typeKey]) return;
      setEvent(ev);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setEvent(null), SHOW_MS);
    });
    return () => {
      unsub();
      clearTimeout(timer.current);
    };
  }, [me.memberId]);

  // Helper demo (prototype): jalankan di console browser untuk simulasi anggota lain
  //   parakarsaDemo.simulateIncoming()                       -> Jenny Court "sent member ID"
  //   parakarsaDemo.simulateIncoming("Jane Cooper", "friend") -> type: friend | favorite | collaborate | sent_id
  useEffect(() => {
    window.parakarsaDemo = {
      simulateIncoming(name = "Jenny Court", type = "sent_id") {
        sendMemberEvent({ toMemberId: me.memberId, from: { memberId: (MOBILE_MEMBERS.find((m) => m.name === name) || { memberId: "029121021936" }).memberId, name }, type });
      },
    };
    return () => { delete window.parakarsaDemo; };
  }, [me.memberId]);

  if (!event) return null;

  const sender = findMember(event.from.memberId);
  const time = new Date(event.at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const open = () => {
    setEvent(null);
    const q = event.from.name ? `?name=${encodeURIComponent(event.from.name)}` : "";
    navigate(`/main/member-card/${event.from.memberId}${q}`);
  };

  return (
    <div className="m-notif-wrap">
      <button type="button" className="m-notif" onClick={open} role="status" aria-live="polite">
        {sender?.photo
          ? <img src={sender.photo} alt="" width="40" height="40" className="m-notif__avatar" />
          : <DefaultAvatar size={40} className="m-notif__avatar" />}
        <span className="m-notif__text">
          <strong>{event.from.name}</strong>
          <span>{EVENT_TEXT[event.type]}</span>
        </span>
        <time>{time}</time>
      </button>
    </div>
  );
}
