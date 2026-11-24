import { useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import MIcon, { DefaultAvatar } from "../components/MIcons.jsx";
import useMe from "../useMe.js";
import useMemberRelations from "../../hooks/useMemberRelations.js";
import { sendMemberEvent } from "../../services/memberEvents.js";
import { logActivity } from "../../services/activityLog.js";
import { findMember } from "../../data/mobileMembers.js";
import { formatMemberId } from "../../utils/memberId.js";
import "./memberScan.css";

/**
 * Halaman kartu anggota versi web - tujuan saat QR member ID di-scan.
 * Dari sini user bisa menambahkan teman, memfavoritkan, atau mengajak
 * kolaborasi. Tiap aksi mengirim event ke pemilik kartu (muncul sebagai
 * notifikasi di atas layar HP-nya kalau ia sedang online).
 */
export default function MemberScanPage() {
  const { memberId } = useParams();
  const [params] = useSearchParams();
  const me = useMe();
  const rel = useMemberRelations();

  const member = useMemo(() => {
    const known = findMember(memberId);
    if (known) return known;
    return { memberId, name: params.get("name") || "Parakarsa Member", role: "Koperasi member" };
  }, [memberId, params]);

  const isMe = memberId === me.memberId;
  const isFriend = rel.friends.includes(memberId);
  const isFav = rel.favorites.includes(memberId);
  const isCollab = rel.collaborations.includes(memberId);

  const fire = (type) => {
    logActivity({ friend: `Sent a friend request to ${member.name}`, favorite: `Added ${member.name} to favorites`, collaborate: `Asked ${member.name} to collaborate` }[type], type === "favorite" ? "heart" : "person");
    sendMemberEvent({ toMemberId: memberId, from: { memberId: me.memberId, name: me.name }, type });
  };
  const onFriend = () => { if (!isFriend) { rel.toggleFriend(memberId, true); fire("friend"); } };
  const onFav = () => { const on = !isFav; rel.toggleFavorite(memberId, on); if (on) fire("favorite"); };
  const onCollab = () => { if (!isCollab) { rel.toggleCollab(memberId, true); fire("collaborate"); } };

  if (!/^\d{12}$/.test(memberId)) {
    return <div className="msp"><p className="msp__note">Invalid member ID.</p></div>;
  }

  return (
    <section className="msp">
      <article className="msp__card">
        <div className="msp__strip"><span>Parakarsa</span><span>Member Card</span></div>
        <div className="msp__body">
          {member.photo
            ? <img src={member.photo} alt="" width="96" height="96" className="msp__avatar" />
            : <DefaultAvatar size={96} className="msp__avatar" />}
          <h2>{member.name}</h2>
          {member.role && <p className="msp__role">{member.role}{member.experience ? ` · ${member.experience}` : ""}</p>}
          <p className="msp__number">{formatMemberId(member.memberId)}</p>
          {member.price && <p className="msp__price">{member.price}</p>}
        </div>
      </article>

      {isMe ? (
        <div className="msp__note">
          This is your own member card.{" "}
          <Link to="/main/member-card">Back to my Member ID</Link>
        </div>
      ) : (
        <div className="msp__actions">
          <button type="button" className={`msp__btn ${isFriend ? "is-done" : ""}`} onClick={onFriend} disabled={isFriend}>
            <MIcon name={isFriend ? "check" : "person"} size={20} />
            {isFriend ? "Friend request sent" : "Add friend"}
          </button>
          <button type="button" className={`msp__btn ${isFav ? "is-done" : ""}`} onClick={onFav} aria-pressed={isFav}>
            <MIcon name="heart" size={20} fill={isFav ? "currentColor" : "none"} />
            {isFav ? "In your favorites" : "Add to favorites"}
          </button>
          <button type="button" className={`msp__btn msp__btn--primary ${isCollab ? "is-done" : ""}`} onClick={onCollab} disabled={isCollab}>
            <MIcon name={isCollab ? "check" : "team"} size={20} />
            {isCollab ? "Collaboration requested" : "Collaborate"}
          </button>
        </div>
      )}
    </section>
  );
}
