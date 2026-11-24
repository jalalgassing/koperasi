import { useState } from "react";
import SubPage from "../../components/SubPage.jsx";
import useToast from "../../components/Toast.jsx";
import useT from "../../i18n.js";
import usePersistentState from "../../../hooks/usePersistentState.js";
import { INTEGRATIONS } from "../../../data/mobileSample.js";
import { logActivity } from "../../../services/activityLog.js";

export default function IntegrationsPage() {
  const t = useT();
  const [toastNode, toast] = useToast();
  const [on, setOn] = usePersistentState("parakarsa_integrations", []);
  const [busy, setBusy] = useState(null);

  const toggle = (it) => {
    if (busy) return;
    const connecting = !on.includes(it.id);
    setBusy(it.id);
    // Prototype: simulasi proses koneksi (belum ada OAuth/backend).
    setTimeout(() => {
      setOn((cur) => (connecting ? [...cur, it.id] : cur.filter((x) => x !== it.id)));
      logActivity(connecting ? `Connected ${it.name}` : `Disconnected ${it.name}`, "integration");
      toast(connecting ? `${it.name} connected` : `${it.name} disconnected`);
      setBusy(null);
    }, 700);
  };

  return (
    <SubPage title={t("title.integration")}>
      <p className="m-note m-note--top">{on.length} of {INTEGRATIONS.length} connected</p>
      <ul className="m-feed">
        {INTEGRATIONS.map((it) => {
          const connected = on.includes(it.id);
          return (
            <li key={it.id} className="m-int">
              <span className="m-int__logo" style={{ background: it.color }}>{it.name[0]}</span>
              <span className="m-feed__text"><strong>{it.name}</strong><small>{it.text}</small></span>
              <button type="button" disabled={busy === it.id} className={`m-btn m-btn--sm ${connected ? "m-btn--ghost" : "m-btn--primary"}`} onClick={() => toggle(it)}>
                {busy === it.id ? "…" : connected ? "Disconnect" : "Connect"}
              </button>
            </li>
          );
        })}
      </ul>
      {toastNode}
    </SubPage>
  );
}
