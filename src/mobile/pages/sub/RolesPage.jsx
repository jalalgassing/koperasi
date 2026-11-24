import { useNavigate } from "react-router-dom";
import SubPage from "../../components/SubPage.jsx";
import useT from "../../i18n.js";
import useMe from "../../useMe.js";
import usePersistentState from "../../../hooks/usePersistentState.js";
import { MOBILE_MEMBERS } from "../../../data/mobileMembers.js";
import { ROLE_OPTIONS, ROLE_PERMS } from "../../../data/mobileSample.js";
import { logActivity } from "../../../services/activityLog.js";

export default function RolesPage() {
  const t = useT();
  const me = useMe();
  const navigate = useNavigate();
  const [roles, setRoles] = usePersistentState("parakarsa_roles", {});
  const roleOf = (id) => roles[id] || "Member";

  const change = (m, role) => {
    setRoles((cur) => ({ ...cur, [m.memberId]: role }));
    logActivity(`Changed ${m.name}'s role to ${role}`, "roles");
  };

  return (
    <SubPage title={t("title.roles")}>
      <section className="m-card m-me">
        <strong>{me.name}</strong>
        <span className="m-pill">Owner</span>
        <small>{ROLE_PERMS.Owner}</small>
      </section>

      <h2 className="m-h2">Members ({MOBILE_MEMBERS.length})</h2>
      <ul className="m-feed">
        {MOBILE_MEMBERS.map((m) => (
          <li key={m.memberId} className="m-role">
            <button type="button" className="m-role__who" onClick={() => navigate(`/main/member-card/${m.memberId}`)}>
              <img src={m.photo} alt="" width="44" height="44" />
              <span><strong>{m.name}</strong><small>{m.role}</small></span>
            </button>
            <select value={roleOf(m.memberId)} onChange={(e) => change(m, e.target.value)} aria-label={`Role for ${m.name}`}>
              {ROLE_OPTIONS.filter((r) => r !== "Owner").map((r) => <option key={r}>{r}</option>)}
            </select>
            <p>{ROLE_PERMS[roleOf(m.memberId)]}</p>
          </li>
        ))}
      </ul>
    </SubPage>
  );
}
