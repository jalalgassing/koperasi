import { useNavigate } from "react-router-dom";
import SubPage from "../../components/SubPage.jsx";
import MIcon, { Clover } from "../../components/MIcons.jsx";
import useT from "../../i18n.js";
import useMemberRelations from "../../../hooks/useMemberRelations.js";
import usePersistentState from "../../../hooks/usePersistentState.js";

const POINTS = 846, TARGET = 1000;

export default function UpworthPage() {
  const t = useT();
  const navigate = useNavigate();
  const { favorites, friends } = useMemberRelations();
  const [purchases] = usePersistentState("parakarsa_purchases", []);
  const [integrations] = usePersistentState("parakarsa_integrations", []);
  const [profile] = usePersistentState("parakarsa_profile", {});

  const tasks = [
    { title: "Add a favorite member", text: "Save someone in Workforce", to: "/main/shared-workforce", done: favorites.length > 0 },
    { title: "Invite a member", text: "Send a friend request via QR", to: "/main/member-card", done: friends.length > 0 },
    { title: "Join a collective purchase", text: "Buy together, save together", to: "/main/collective-purchase", done: purchases.length > 0 },
    { title: "Connect an integration", text: "Link a tool your team uses", to: "/main/integrations", done: integrations.length > 0 },
    { title: "Complete your profile", text: "Add phone, email or a photo", to: "/main/profile/manage", done: Boolean(profile.phone || profile.email || profile.photo) },
  ];
  const left = tasks.filter((x) => !x.done).length;

  return (
    <SubPage title={t("title.upworth")}>
      <section className="m-uw">
        <Clover size={30} color="#fff" />
        <strong>{POINTS}</strong>
        <small>Earn {TARGET - POINTS} more points to reach {TARGET.toLocaleString("en-US")}</small>
        <div className="m-progress m-progress--light"><i style={{ width: `${(POINTS / TARGET) * 100}%` }} /></div>
      </section>
      <h2 className="m-h2">Ways to contribute <small>({left} to do)</small></h2>
      <ul className="m-feed">
        {tasks.map((x) => (
          <li key={x.title}>
            <button type="button" className="m-feed__item" onClick={() => navigate(x.to)}>
              <span className={`m-feed__icon ${x.done ? "is-done" : ""}`}><MIcon name={x.done ? "check" : "flash"} size={18} /></span>
              <span className="m-feed__text"><strong>{x.title}</strong><small>{x.done ? "Done" : x.text}</small></span>
              <MIcon name="chevron" size={16} />
            </button>
          </li>
        ))}
      </ul>
    </SubPage>
  );
}
