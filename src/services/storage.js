// Penyimpanan localStorage kecil yang juga memberi tahu komponen lain di tab
// yang sama (event "storage" bawaan browser hanya jalan antar-tab).
const EVT = "pk-store";

export function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStore(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* penuh / diblokir */ }
  window.dispatchEvent(new CustomEvent(EVT, { detail: key }));
}

export const STORE_EVENT = EVT;
