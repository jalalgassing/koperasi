// Nomor anggota 12 digit. Belum ada backend, jadi dibuat deterministik dari
// nama (nama sama -> nomor sama) supaya QR user selalu konsisten.
export function memberIdFromName(name = "") {
  let h1 = 7, h2 = 13;
  for (let i = 0; i < name.length; i++) {
    h1 = (h1 * 31 + name.charCodeAt(i)) % 1000000;
    h2 = (h2 * 37 + name.charCodeAt(i) * (i + 1)) % 1000000;
  }
  return String(h1).padStart(6, "0") + String(h2).padStart(6, "0");
}

// "029121021930" -> "0291 2102 1930"
export function formatMemberId(id = "") {
  return id.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

// URL yang ditanam di QR. Dibuka kamera HP / scanner mana pun -> halaman
// kartu anggota versi web. Nama ikut di query supaya anggota yang belum ada
// di direktori tetap tampil namanya.
export function memberCardUrl(memberId, name) {
  const q = name ? `?name=${encodeURIComponent(name)}` : "";
  return `${window.location.origin}/main/member-card/${memberId}${q}`;
}

// Baca hasil scan -> { memberId, name } atau null kalau bukan QR Parakarsa.
export function parseMemberQr(text) {
  try {
    const url = new URL(text.trim());
    const m = url.pathname.match(/\/main\/member-card\/(\d{12})\/?$/);
    if (!m) return null;
    return { memberId: m[1], name: url.searchParams.get("name") || "" };
  } catch {
    return null;
  }
}
