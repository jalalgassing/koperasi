// Kanal interaksi antar-anggota (mis. "Jenny menambahkan member ID Anda").
//
// PROTOTYPE: belum ada backend, jadi event dikirim lewat BroadcastChannel +
// localStorage -> hanya sampai ke tab/jendela lain di BROWSER YANG SAMA.
// Untuk produksi, ganti isi sendMemberEvent() dengan POST ke API dan
// subscribeMemberEvents() dengan WebSocket/SSE; komponen UI tidak perlu diubah.
//
// Notifikasi di UI HANYA muncul dari event yang ditujukan ke member ID kita
// dan dikirim oleh anggota LAIN (bukan diri sendiri).

const CHANNEL = "parakarsa_member_events";

export const EVENT_TEXT = {
  friend: "added your member ID as a friend",
  favorite: "added your member card to favorites",
  collaborate: "wants to collaborate with you",
  sent_id: "sent member ID Parakarsa",
};

export function sendMemberEvent({ toMemberId, from, type }) {
  if (!toMemberId || !from?.memberId || from.memberId === toMemberId) return;
  const event = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    toMemberId,
    from,
    type,
    at: Date.now(),
  };
  try {
    const ch = new BroadcastChannel(CHANNEL);
    ch.postMessage(event);
    ch.close();
  } catch { /* browser lama tanpa BroadcastChannel */ }
  try {
    localStorage.setItem(CHANNEL, JSON.stringify(event)); // memicu event "storage" di tab lain
  } catch { /* abaikan */ }
}

export function subscribeMemberEvents(myMemberId, onEvent) {
  const seen = new Set();
  const handle = (event) => {
    if (!event || event.toMemberId !== myMemberId) return;
    if (event.from?.memberId === myMemberId) return;
    if (!EVENT_TEXT[event.type] || seen.has(event.id)) return;
    seen.add(event.id);
    onEvent(event);
  };

  let bc = null;
  try {
    bc = new BroadcastChannel(CHANNEL);
    bc.onmessage = (e) => handle(e.data);
  } catch { /* abaikan */ }

  const onStorage = (e) => {
    if (e.key !== CHANNEL || !e.newValue) return;
    try { handle(JSON.parse(e.newValue)); } catch { /* abaikan */ }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    bc?.close();
    window.removeEventListener("storage", onStorage);
  };
}
