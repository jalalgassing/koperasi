import { readStore, writeStore } from "./storage.js";

export const ACTIVITY_KEY = "parakarsa_activity";

// Catat aksi user (tampil di halaman History). Maks 100 entri terakhir.
export function logActivity(text, icon = "check") {
  const list = readStore(ACTIVITY_KEY, []);
  writeStore(ACTIVITY_KEY, [{ id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, text, icon, at: Date.now() }, ...list].slice(0, 100));
}
