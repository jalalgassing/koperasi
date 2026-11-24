import { useState } from "react";
import SubPage from "../../components/SubPage.jsx";
import MIcon from "../../components/MIcons.jsx";
import useToast from "../../components/Toast.jsx";
import useT from "../../i18n.js";
import { FAQ } from "../../../data/mobileSample.js";
import { logActivity } from "../../../services/activityLog.js";

// Kontak di bawah ini PLACEHOLDER - ganti dengan kontak resmi koperasi.
const CONTACT = { whatsapp: "6281234567890", email: "support@parakarsa.id", phone: "+6281234567890" };

export default function SupportPage() {
  const t = useT();
  const [toastNode, toast] = useToast();
  const [open, setOpen] = useState(0);
  const [msg, setMsg] = useState("");

  const send = () => {
    if (msg.trim().length < 5) return toast("Please write a short message first");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Parakarsa support request")}&body=${encodeURIComponent(msg)}`;
    logActivity("Contacted support", "help");
    setMsg("");
  };

  return (
    <SubPage title={t("title.support")}>
      <div className="m-contact">
        <a className="m-contact__btn" href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer"><MIcon name="phone" size={22} />WhatsApp</a>
        <a className="m-contact__btn" href={`mailto:${CONTACT.email}`}><MIcon name="mail" size={22} />Email</a>
        <a className="m-contact__btn" href={`tel:${CONTACT.phone}`}><MIcon name="headset" size={22} />Call</a>
      </div>

      <h2 className="m-h2">Frequently asked</h2>
      <section className="m-card">
        {FAQ.map((f, i) => (
          <div key={f.q} className="m-faq">
            <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              {f.q}<MIcon name="more" size={18} style={{ transform: open === i ? "rotate(180deg)" : "none" }} />
            </button>
            {open === i && <p>{f.a}</p>}
          </div>
        ))}
      </section>

      <h2 className="m-h2">Send us a message</h2>
      <div className="m-form">
        <textarea rows="4" placeholder="How can we help?" value={msg} onChange={(e) => setMsg(e.target.value)} aria-label="Message" />
        <button type="button" className="m-btn m-btn--primary" onClick={send}>Send message</button>
      </div>
      {toastNode}
    </SubPage>
  );
}
