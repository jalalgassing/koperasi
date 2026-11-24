import { readStore, writeStore } from "./storage.js";

export const NOTIF_KEY = "parakarsa_notifications";

const SEED = () => [
  { id: "seed-1", title: "Welcome to Parakarsa", text: "Your member card is ready. Share your QR to connect with other members.", at: Date.now() - 3600e3 * 5, read: false },
  { id: "seed-2", title: "Upworth", text: "You have 846 points. 154 more to reach 1,000!", at: Date.now() - 3600e3 * 26, read: false },
];

export function getNotifications() {
  const cur = readStore(NOTIF_KEY, null);
  if (cur) return cur;
  const seeded = SEED();
  writeStore(NOTIF_KEY, seeded);
  return seeded;
}

export function addNotification(n) {
  const list = getNotifications();
  writeStore(NOTIF_KEY, [{ read: false, at: Date.now(), ...n, id: n.id || `${Date.now()}-${Math.random().toString(36).slice(2, 6)}` }, ...list].slice(0, 60));
}
export const markRead = (id) => writeStore(NOTIF_KEY, getNotifications().map((n) => (n.id === id ? { ...n, read: true } : n)));
export const markAllRead = () => writeStore(NOTIF_KEY, getNotifications().map((n) => ({ ...n, read: true })));
export const clearNotifications = () => writeStore(NOTIF_KEY, []);
