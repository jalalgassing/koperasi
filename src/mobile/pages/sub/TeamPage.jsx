import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubPage from "../../components/SubPage.jsx";
import useT from "../../i18n.js";
import { MOBILE_MEMBERS } from "../../../data/mobileMembers.js";
import { TEAM_SCORES } from "../../../data/mobileSample.js";

export default function TeamPage() {
  const t = useT();
  const navigate = useNavigate();
  const [sort, setSort] = useState("score");
  const list = useMemo(() => [...MOBILE_MEMBERS].sort((a, b) => (sort === "score" ? TEAM_SCORES[b.memberId] - TEAM_SCORES[a.memberId] : a.name.localeCompare(b.name))), [sort]);
  const avg = Math.round(MOBILE_MEMBERS.reduce((a, m) => a + TEAM_SCORES[m.memberId], 0) / MOBILE_MEMBERS.length);

  return (
    <SubPage title={t("title.team")}>
      <section className="m-summary"><div><small>Team average</small><strong>{avg}%</strong></div><div><small>Members</small><strong>{MOBILE_MEMBERS.length}</strong></div></section>
      <div className="m-chips m-chips--tight">
        {[["score", "Top score"], ["name", "A–Z"]].map(([k, l]) => <button type="button" key={k} className={`m-chip ${sort === k ? "is-active" : ""}`} aria-pressed={sort === k} onClick={() => setSort(k)}>{l}</button>)}
      </div>
      <ul className="m-feed">
        {list.map((m, i) => {
          const s = TEAM_SCORES[m.memberId];
          return (
            <li key={m.memberId}>
              <button type="button" className="m-feed__item" onClick={() => navigate(`/main/member-card/${m.memberId}`)}>
                <span className="m-rank">{i + 1}</span>
                <img src={m.photo} alt="" width="44" height="44" />
                <span className="m-feed__text"><strong>{m.name}</strong><small>{m.role}</small>
                  <span className="m-progress"><i style={{ width: `${s}%` }} /></span></span>
                <b>{s}%</b>
              </button>
            </li>
          );
        })}
      </ul>
    </SubPage>
  );
}
