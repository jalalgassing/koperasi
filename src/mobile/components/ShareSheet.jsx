import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import MIcon, { Clover } from "./MIcons.jsx";
import { MOBILE_MEMBERS } from "../../data/mobileMembers.js";
import { logActivity } from "../../services/activityLog.js";
import { sendMemberEvent } from "../../services/memberEvents.js";

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try { // fallback untuk konteks non-HTTPS
      const ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch { return false; }
  }
}

const APP_ICONS = {
  airdrop: <svg viewBox="0 0 48 48" width="34" height="34" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round"><circle cx="24" cy="24" r="4.5" fill="#fff" stroke="none" /><path d="M16.5 31.5a10.6 10.6 0 010-15M31.5 16.5a10.6 10.6 0 010 15" /><path d="M11 37a18 18 0 010-26M37 11a18 18 0 010 26" /></svg>,
  messages: <svg viewBox="0 0 48 48" width="36" height="36"><ellipse cx="24" cy="22" rx="16" ry="13" fill="#fff" /><path d="M13 32l-3 8 10-5z" fill="#fff" /></svg>,
  mail: <svg viewBox="0 0 48 48" width="36" height="36" fill="none" stroke="#fff" strokeWidth="3" strokeLinejoin="round"><rect x="6" y="11" width="36" height="26" rx="4" /><path d="M7 14l17 13 17-13" /></svg>,
  notes: <svg viewBox="0 0 48 48" width="62" height="62"><rect width="48" height="48" rx="11" fill="#fff" /><path d="M0 11a11 11 0 0111-11h26a11 11 0 0111 11v7H0z" fill="#f7c948" /><path d="M10 28h28M10 35h28" stroke="#d8d8d8" strokeWidth="1.6" /></svg>,
  whatsapp: <svg viewBox="0 0 48 48" width="34" height="34" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 38l2.4-8A14.5 14.5 0 1118 35.6z" /><path d="M19 18.5c0 5 5 10 10 10l2-2.5-3.5-2-1.5 1.2c-1.8-.8-3.4-2.4-4.2-4.2l1.2-1.5-2-3.5z" fill="#fff" stroke="none" /></svg>,
  telegram: <svg viewBox="0 0 48 48" width="34" height="34"><path d="M8 23.5L38.5 11.8c1.4-.5 2.6.4 2.2 2.3l-5.2 24.4c-.4 1.7-1.4 2.1-2.8 1.3l-7.8-5.8-3.8 3.6c-.4.4-.8.8-1.6.8l.6-8L35 18.5c.6-.6-.1-.9-1-.3L16.2 29.7l-7.7-2.4c-1.7-.5-1.7-1.7.5-2.6z" fill="#fff" /></svg>,
  more: <svg viewBox="0 0 48 48" width="34" height="34" fill="#fff"><circle cx="12" cy="24" r="3.4" /><circle cx="24" cy="24" r="3.4" /><circle cx="36" cy="24" r="3.4" /></svg>,
};

export default function ShareSheet({ me, favorites, onClose, toast }) {
  const [mode, setMode] = useState("collaborate"); // collaborate | copy
  const [perm, setPerm] = useState("invited"); // invited | anyone
  const [showActions, setShowActions] = useState(false);
  const [closing, setClosing] = useState(false);

  const close = () => { setClosing(true); setTimeout(onClose, 220); };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden"; // kunci scroll halaman di belakang sheet
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const people = useMemo(
    () => [...MOBILE_MEMBERS].sort((a, b) => Number(favorites.includes(b.memberId)) - Number(favorites.includes(a.memberId))).slice(0, 8),
    [favorites]
  );

  const text = `${me.name}'s Parakarsa member ID: ${me.url}`;
  const shareData = { title: "Member card Parakarsa", text: `${me.name} - Member card Parakarsa`, url: me.url };

  const sendTo = (m) => {
    sendMemberEvent({ toMemberId: m.memberId, from: { memberId: me.memberId, name: me.name }, type: mode === "collaborate" ? "collaborate" : "sent_id" });
    logActivity(mode === "collaborate" ? `Invited ${m.name} to collaborate` : `Sent your member ID to ${m.name}`, "share");
    toast(mode === "collaborate" ? `Collaboration invite sent to ${m.name}` : `Member ID sent to ${m.name}`);
  };

  const nativeShare = async (fallbackMsg) => {
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* user menutup dialog */ }
    } else {
      toast((await copyText(me.url)) ? fallbackMsg : "Could not copy the link");
    }
  };

  const apps = [
    { id: "airdrop", label: "AirDrop", bg: "linear-gradient(#2a8cff,#0a63e0)", run: () => nativeShare("Sharing isn't available here - link copied") },
    { id: "messages", label: "Messages", bg: "linear-gradient(#5ee06a,#18b83a)", run: () => { window.location.href = `sms:?&body=${encodeURIComponent(text)}`; } },
    { id: "mail", label: "Mail", bg: "linear-gradient(#3da0ff,#0b6fe8)", run: () => { window.location.href = `mailto:?subject=${encodeURIComponent("My Parakarsa member ID")}&body=${encodeURIComponent(text)}`; } },
    { id: "notes", label: "Notes", bg: "#fff", run: async () => toast((await copyText(text)) ? "Copied - paste it into Notes" : "Could not copy") },
    { id: "whatsapp", label: "WhatsApp", bg: "#25d366", run: () => window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener") },
    { id: "telegram", label: "Telegram", bg: "#2aabee", run: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(me.url)}&text=${encodeURIComponent(shareData.text)}`, "_blank", "noopener") },
    { id: "more", label: "More", bg: "#8e8e93", run: () => nativeShare("Sharing isn't available here - link copied") },
  ];

  const saveQr = async () => {
    try {
      const url = await QRCode.toDataURL(me.url, { width: 1024, margin: 3, errorCorrectionLevel: "M", color: { dark: "#2f5a50", light: "#ffffff" } });
      const a = document.createElement("a");
      a.href = url; a.download = `parakarsa-member-${me.memberId}.png`;
      document.body.appendChild(a); a.click(); a.remove();
      toast("QR saved as image");
    } catch { toast("Could not save the QR"); }
  };

  return (
    <div className={`m-sheet-wrap ${closing ? "is-closing" : ""}`} onClick={close}>
      <div className="m-sheet" role="dialog" aria-modal="true" aria-label="Share member ID" onClick={(e) => e.stopPropagation()}>
        <div className="m-sheet__grab" />
        <div className="m-sheet__head">
          <span className="m-sheet__thumb"><Clover size={34} color="#fff" /></span>
          <div>
            <strong>{me.name}</strong>
            <span>Member card Parakarsa</span>
            <button type="button" className="m-sheet__collab" onClick={() => setMode((m) => (m === "collaborate" ? "copy" : "collaborate"))}>
              <MIcon name="team" size={18} />
              {mode === "collaborate" ? "Collaborate" : "Send Copy"}
              <MIcon name="chevron" size={14} />
            </button>
          </div>
        </div>
        {mode === "collaborate" ? (
          <button type="button" className="m-sheet__perm" onClick={() => setPerm((p) => (p === "invited" ? "anyone" : "invited"))}>
            {perm === "invited" ? "Only invited people can edit." : "Anyone with the link can edit."}
            <MIcon name="chevron" size={14} />
          </button>
        ) : (
          <p className="m-sheet__perm m-sheet__perm--static">Recipients get their own copy of your member ID.</p>
        )}

        <div className="m-sheet__row" role="list" aria-label="People">
          {people.map((m) => (
            <button type="button" key={m.memberId} className="m-sheet__person" role="listitem" onClick={() => sendTo(m)}>
              <span className="m-sheet__avatar"><img src={m.photo} alt="" width="66" height="66" /></span>
              <span>{m.name}</span>
              {favorites.includes(m.memberId) && <em>Favorite</em>}
            </button>
          ))}
        </div>

        <div className="m-sheet__row m-sheet__row--apps" role="list" aria-label="Apps">
          {apps.map((a) => (
            <button type="button" key={a.id} className="m-sheet__app" role="listitem" onClick={a.run}>
              <span className="m-sheet__icon" style={{ background: a.bg }}>{APP_ICONS[a.id]}</span>
              <span>{a.label}</span>
            </button>
          ))}
        </div>

        {showActions && (
          <div className="m-sheet__actions">
            <button type="button" onClick={async () => toast((await copyText(me.url)) ? "Link copied" : "Could not copy")}><MIcon name="link" size={18} /> Copy link</button>
            <button type="button" onClick={saveQr}><MIcon name="image" size={18} /> Save QR as image</button>
            <button type="button" onClick={() => window.print()}><MIcon name="report" size={18} /> Print</button>
          </div>
        )}
        <button type="button" className="m-sheet__edit" onClick={() => setShowActions((v) => !v)} aria-expanded={showActions}>Edit Actions</button>
      </div>
    </div>
  );
}
