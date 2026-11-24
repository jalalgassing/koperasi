import { useState } from "react";
import SubPage, { rupiah, rupiahShort } from "../../components/SubPage.jsx";
import useT from "../../i18n.js";
import { REPORT, TRANSACTIONS } from "../../../data/mobileSample.js";

export default function ReportPage() {
  const t = useT();
  const [period, setPeriod] = useState("Month");
  const [filter, setFilter] = useState("all");
  const [picked, setPicked] = useState(null);
  const r = REPORT[period];
  const max = Math.max(...r.bars.flatMap((b) => [b[1], b[2]]));
  const tx = TRANSACTIONS.filter((x) => filter === "all" || x.type === filter);
  const net = r.income - r.expense;

  return (
    <SubPage title={t("title.report")}>
      <div className="m-chips m-chips--tight" role="tablist">
        {Object.keys(REPORT).map((p) => <button type="button" key={p} role="tab" aria-selected={period === p} className={`m-chip ${period === p ? "is-active" : ""}`} onClick={() => { setPeriod(p); setPicked(null); }}>{p}</button>)}
      </div>
      <section className="m-summary m-summary--3">
        <div><small>Income</small><strong className="is-up">{rupiahShort(r.income)}</strong></div>
        <div><small>Expense</small><strong className="is-down">{rupiahShort(r.expense)}</strong></div>
        <div><small>Net</small><strong>{rupiahShort(net)}</strong></div>
      </section>

      <section className="m-card m-chart">
        <h2 className="m-h2 m-h2--in">Income vs expense <small>(Rp million)</small></h2>
        <div className="m-bars">
          {r.bars.map(([label, inc, exp], i) => (
            <button type="button" key={label} className={`m-bars__col ${picked === i ? "is-picked" : ""}`} onClick={() => setPicked(picked === i ? null : i)} aria-label={`${label}: income ${inc} million, expense ${exp} million`}>
              <span className="m-bars__pair"><i className="is-inc" style={{ height: `${(inc / max) * 100}%` }} /><i className="is-exp" style={{ height: `${(exp / max) * 100}%` }} /></span>
              <small>{label}</small>
            </button>
          ))}
        </div>
        <p className="m-bars__info">{picked == null ? "Tap a bar to see the details" : `${r.bars[picked][0]}: income Rp ${r.bars[picked][1]} M · expense Rp ${r.bars[picked][2]} M`}</p>
        <div className="m-legend"><span><i className="is-inc" />Income</span><span><i className="is-exp" />Expense</span></div>
      </section>

      <h2 className="m-h2">Transactions</h2>
      <div className="m-chips m-chips--tight">
        {[["all", "All"], ["income", "Income"], ["expense", "Expense"]].map(([k, l]) => <button type="button" key={k} className={`m-chip ${filter === k ? "is-active" : ""}`} onClick={() => setFilter(k)}>{l}</button>)}
      </div>
      <ul className="m-feed">
        {tx.map((x) => (
          <li key={x.id} className="m-tx"><span><strong>{x.title}</strong><small>{x.date}</small></span><b className={x.type === "income" ? "is-up" : "is-down"}>{x.type === "income" ? "+" : "−"}{rupiah(x.amount)}</b></li>
        ))}
      </ul>
    </SubPage>
  );
}
