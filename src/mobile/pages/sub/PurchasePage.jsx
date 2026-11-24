import SubPage, { rupiah } from "../../components/SubPage.jsx";
import useToast from "../../components/Toast.jsx";
import useT from "../../i18n.js";
import usePersistentState from "../../../hooks/usePersistentState.js";
import { PURCHASES } from "../../../data/mobileSample.js";
import { logActivity } from "../../../services/activityLog.js";

export default function PurchasePage() {
  const t = useT();
  const [toastNode, toast] = useToast();
  const [joined, setJoined] = usePersistentState("parakarsa_purchases", []);
  const mine = PURCHASES.filter((p) => joined.includes(p.id));
  const total = mine.reduce((a, p) => a + p.price, 0);

  const toggle = (p) => {
    const on = !joined.includes(p.id);
    setJoined((cur) => (on ? [...cur, p.id] : cur.filter((x) => x !== p.id)));
    logActivity(on ? `Joined purchase: ${p.name}` : `Left purchase: ${p.name}`, "cart");
    toast(on ? `You joined “${p.name}”` : "You left this purchase");
  };

  return (
    <SubPage title={t("title.cart")}>
      <section className="m-summary">
        <div><small>Joined</small><strong>{mine.length}</strong></div>
        <div><small>Your commitment</small><strong>{rupiah(total)}</strong></div>
      </section>
      <ul className="m-feed">
        {PURCHASES.map((p) => {
          const on = joined.includes(p.id);
          const count = p.joined + (on ? 1 : 0);
          const pct = Math.min(100, Math.round((count / p.target) * 100));
          return (
            <li key={p.id} className="m-buy">
              <div className="m-buy__top"><div><strong>{p.name}</strong><small>{p.supplier} · {p.ends}</small></div><b>{rupiah(p.price)}<small>/{p.unit}</small></b></div>
              <div className="m-progress" role="progressbar" aria-valuenow={pct} aria-valuemin="0" aria-valuemax="100"><i style={{ width: `${pct}%` }} /></div>
              <div className="m-buy__foot"><small>{count}/{p.target} members joined</small>
                <button type="button" className={`m-btn ${on ? "m-btn--ghost" : "m-btn--primary"} m-btn--sm`} onClick={() => toggle(p)}>{on ? "Leave" : "Join"}</button></div>
            </li>
          );
        })}
      </ul>
      {toastNode}
    </SubPage>
  );
}
