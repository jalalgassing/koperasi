import { useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import SubPage, { Switch } from "../../components/SubPage.jsx";
import MIcon from "../../components/MIcons.jsx";
import useToast from "../../components/Toast.jsx";
import useT from "../../i18n.js";
import useMe from "../../useMe.js";
import useSettings from "../../../hooks/useSettings.js";
import usePersistentState from "../../../hooks/usePersistentState.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { logActivity } from "../../../services/activityLog.js";
import defaultPhoto from "../../../assets/images/mobile/profile-andika.png";

function Row({ title, text, children }) {
  return (
    <div className="m-set-row">
      <div><strong>{title}</strong>{text && <small>{text}</small>}</div>
      {children}
    </div>
  );
}

// Foto dipotong persegi & dikecilkan (400px) sebelum disimpan di browser.
function resizeImage(file, size = 400) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const side = Math.min(img.width, img.height);
      c.getContext("2d").drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, size, size);
      URL.revokeObjectURL(img.src);
      resolve(c.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

function ManageProfile() {
  const me = useMe();
  const t = useT();
  const [toastNode, toast] = useToast();
  const [profile, setProfile] = usePersistentState("parakarsa_profile", {});
  const [form, setForm] = useState({ phone: profile.phone || "", email: profile.email || "", bio: profile.bio || "" });
  const fileRef = useRef(null);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onPhoto = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const photo = await resizeImage(file);
      setProfile((p) => ({ ...p, photo }));
      logActivity("Changed profile photo", "camera");
      toast("Profile photo updated");
    } catch { toast("Could not read that image"); }
  };
  const emailOk = !form.email || /^\S+@\S+\.\S+$/.test(form.email);
  const save = () => {
    if (!emailOk) return toast("Please enter a valid email");
    setProfile((p) => ({ ...p, ...form }));
    logActivity("Updated profile details", "user");
    toast("Profile saved");
  };

  return (
    <SubPage title={t("profile.manage")}>
      <div className="m-edit-avatar">
        <img src={profile.photo || defaultPhoto} alt="" width="120" height="120" />
        <div className="m-edit-avatar__btns">
          <button type="button" className="m-btn" onClick={() => fileRef.current?.click()}><MIcon name="camera" size={18} /> Change photo</button>
          {profile.photo && <button type="button" className="m-btn m-btn--ghost" onClick={() => { setProfile((p) => ({ ...p, photo: "" })); toast("Photo removed"); }}>Remove</button>}
        </div>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPhoto} />
      </div>
      <div className="m-form">
        <label>Full name<input value={me.name} readOnly /><small>Your name and member ID ({me.display}) are linked and can’t be edited here.</small></label>
        <label>Phone<input inputMode="tel" placeholder="+62 ..." value={form.phone} onChange={set("phone")} /></label>
        <label>Email<input type="email" inputMode="email" placeholder="name@email.com" value={form.email} onChange={set("email")} aria-invalid={!emailOk} />{!emailOk && <small className="is-err">Enter a valid email address.</small>}</label>
        <label>About you<textarea rows="4" maxLength="200" placeholder="Tell other members what you do…" value={form.bio} onChange={set("bio")} /><small>{form.bio.length}/200</small></label>
        <button type="button" className="m-btn m-btn--primary" onClick={save}>{t("save")}</button>
      </div>
      {toastNode}
    </SubPage>
  );
}

function SettingsPage() {
  const t = useT();
  const navigate = useNavigate();
  const [s, update] = useSettings();
  const [toastNode, toast] = useToast();
  const reset = () => {
    if (!window.confirm("Reset all saved data on this device (favorites, notifications, history, settings)? You will stay logged in.")) return;
    Object.keys(localStorage).filter((k) => k.startsWith("parakarsa_") && k !== "parakarsa_session").forEach((k) => localStorage.removeItem(k));
    window.location.assign("/main/profile");
  };
  return (
    <SubPage title={t("profile.settings")}>
      <section className="m-card">
        <Row title="Auto-slide banner" text="Home highlights move every 6 seconds"><Switch checked={s.autoSlide} onChange={(v) => update({ autoSlide: v })} label="Auto-slide banner" /></Row>
        <Row title="Show online status" text="Let members see when you are online"><Switch checked={s.showOnline} onChange={(v) => update({ showOnline: v })} label="Show online status" /></Row>
        <Row title="Notification banners" text="Pop-ups at the top of the screen"><Switch checked={s.push} onChange={(v) => update({ push: v })} label="Notification banners" /></Row>
      </section>
      <section className="m-card">
        <button type="button" className="m-link-row" onClick={() => navigate("/main/profile/language")}><MIcon name="globe" size={20} /> {t("profile.language")}<MIcon name="chevron" size={16} /></button>
        <button type="button" className="m-link-row" onClick={() => navigate("/main/profile/privacy")}><MIcon name="lock" size={20} /> {t("profile.privacy")}<MIcon name="chevron" size={16} /></button>
        <button type="button" className="m-link-row is-danger" onClick={reset}><MIcon name="trash" size={20} /> Reset saved data on this device</button>
      </section>
      {toastNode}
    </SubPage>
  );
}

function SecurityPage() {
  const t = useT();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [toastNode, toast] = useToast();
  const [f, setF] = useState({ cur: "", next: "", again: "" });
  const [show, setShow] = useState(false);
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  const err = !f.cur ? "Enter your current password." : f.next.length < 8 ? "New password must be at least 8 characters." : !/\d/.test(f.next) || !/[A-Za-z]/.test(f.next) ? "Use letters and numbers." : f.next !== f.again ? "Passwords don’t match." : "";
  const [tried, setTried] = useState(false);
  const submit = () => {
    setTried(true);
    if (err) return;
    // Prototype: belum ada backend, jadi password tidak dikirim ke server mana pun.
    logActivity("Changed password", "lock");
    setF({ cur: "", next: "", again: "" }); setTried(false);
    toast("Password updated (demo - no server yet)");
  };
  const type = show ? "text" : "password";
  return (
    <SubPage title={t("profile.security")}>
      <div className="m-form">
        <label>Current password<input type={type} autoComplete="current-password" value={f.cur} onChange={set("cur")} /></label>
        <label>New password<input type={type} autoComplete="new-password" value={f.next} onChange={set("next")} /></label>
        <label>Confirm new password<input type={type} autoComplete="new-password" value={f.again} onChange={set("again")} /></label>
        <button type="button" className="m-btn m-btn--ghost" onClick={() => setShow((v) => !v)}><MIcon name="eye" size={18} /> {show ? "Hide" : "Show"} passwords</button>
        {tried && err && <p className="m-form__err">{err}</p>}
        <button type="button" className="m-btn m-btn--primary" onClick={submit}>Update password</button>
      </div>
      <section className="m-card">
        <button type="button" className="m-link-row is-danger" onClick={() => { logout(); navigate("/masuk", { replace: true }); }}><MIcon name="logout" size={20} /> {t("profile.logout")}</button>
      </section>
      {toastNode}
    </SubPage>
  );
}

function LanguagePage() {
  const t = useT();
  const [s, update] = useSettings();
  const opts = [["en", "English"], ["id", "Bahasa Indonesia"]];
  return (
    <SubPage title={t("profile.language")}>
      <section className="m-card">
        {opts.map(([code, name]) => (
          <button type="button" key={code} className="m-link-row" role="radio" aria-checked={s.lang === code} onClick={() => update({ lang: code })}>
            {name}
            <span className={`m-radio ${s.lang === code ? "is-on" : ""}`}>{s.lang === code && <MIcon name="check" size={14} strokeWidth={3} />}</span>
          </button>
        ))}
      </section>
      <p className="m-note">Menus, navigation and main screens switch language right away. Detail pages are still partly in English.</p>
    </SubPage>
  );
}

function NotificationPrefs() {
  const t = useT();
  const [s, update] = useSettings();
  const rows = [
    ["pushFriend", "Friend requests", "Someone added your member ID"],
    ["pushFavorite", "Favorites", "Someone added you to favorites"],
    ["pushCollab", "Collaboration", "Someone wants to work with you"],
    ["pushSent", "Member ID received", "Someone sent you their member ID"],
  ];
  return (
    <SubPage title={t("profile.notifications")}>
      <section className="m-card">
        <Row title="Show banners" text="Pop-up at the top when someone interacts with your card"><Switch checked={s.push} onChange={(v) => update({ push: v })} label="Show banners" /></Row>
      </section>
      <section className="m-card" style={{ opacity: s.push ? 1 : 0.5 }}>
        {rows.map(([k, title, text]) => <Row key={k} title={title} text={text}><Switch checked={s[k]} onChange={(v) => update({ [k]: v })} label={title} /></Row>)}
      </section>
      <p className="m-note">Notifications are always saved in the bell inbox, even when banners are off.</p>
    </SubPage>
  );
}

function PrivacyPage() {
  const t = useT();
  const [s, update] = useSettings();
  return (
    <SubPage title={t("profile.privacy")}>
      <section className="m-card">
        <Row title="Allow friend requests" text="Turn off to ignore friend requests from your QR"><Switch checked={s.allowFriend} onChange={(v) => update({ allowFriend: v })} label="Allow friend requests" /></Row>
        <Row title="Allow collaboration requests" text="Turn off to ignore collaboration invites"><Switch checked={s.allowCollab} onChange={(v) => update({ allowCollab: v })} label="Allow collaboration requests" /></Row>
        <Row title="Show my photo to members" text="Saved preference (applies once the backend is connected)"><Switch checked={s.showPhoto} onChange={(v) => update({ showPhoto: v })} label="Show my photo" /></Row>
      </section>
    </SubPage>
  );
}

const SECTIONS = { manage: ManageProfile, settings: SettingsPage, security: SecurityPage, language: LanguagePage, notifications: NotificationPrefs, privacy: PrivacyPage };

export default function ProfileSection() {
  const { section } = useParams();
  const Page = SECTIONS[section];
  return Page ? <Page /> : <Navigate to="/main/profile" replace />;
}
