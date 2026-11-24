import pink from "../assets/images/mobile/member-pink.png";
import yellow from "../assets/images/mobile/member-yellow.png";
import blue from "../assets/images/mobile/member-blue.png";

// Direktori anggota untuk tampilan mobile (data contoh, ganti dengan data
// backend nanti). "memberId" = 12 digit nomor anggota yang juga dipakai di QR.
// "tag" harus sama persis dengan salah satu label di MOBILE_FILTERS.
export const MOBILE_FILTERS = ["Designer", "Legal team", "Accountant", "Programming"];

export const MOBILE_MEMBERS = [
  { memberId: "029121021931", name: "Kristin Watson", photo: pink, role: "Designer", tag: "Designer", experience: "1+ year experience", price: "Rp. 1,000,000/Project" },
  { memberId: "029121021932", name: "Jane Cooper", photo: blue, role: "Designer", tag: "Designer", experience: "1+ year experience", price: "Rp. 1,000,000/Project" },
  { memberId: "029121021933", name: "Eleanor Pena", photo: yellow, role: "Junior legal counsel", tag: "Legal team", experience: "1+ year experience", price: "Rp. 1,000,000/Project" },
  { memberId: "029121021934", name: "Esther Howard", photo: yellow, role: "Accountant staff", tag: "Accountant", experience: "1+ year experience", price: "Rp. 1,000,000/Project" },
  { memberId: "029121021935", name: "Darrell Steward", photo: pink, role: "Programming", tag: "Programming", experience: "1+ year experience", price: "Rp. 1,000,000/Project" },
  { memberId: "029121021936", name: "Jenny Court", photo: blue, role: "Designer", tag: "Designer", experience: "2+ year experience", price: "Rp. 1,500,000/Project" },
  { memberId: "029121021937", name: "Herland Antezana", photo: yellow, role: "Legal assistant", tag: "Legal team", experience: "3+ year experience", price: "Rp. 2,000,000/Project" },
  { memberId: "029121021938", name: "First Rangel", photo: pink, role: "Accountant staff", tag: "Accountant", experience: "2+ year experience", price: "Rp. 1,200,000/Project" },
];

// Foto belum lengkap: anggota tanpa foto sendiri memakai foto yang sama (bergantian).
export function findMember(memberId) {
  return MOBILE_MEMBERS.find((m) => m.memberId === memberId) || null;
}
