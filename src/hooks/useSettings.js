import { useCallback } from "react";
import usePersistentState from "./usePersistentState.js";

export const SETTINGS_KEY = "parakarsa_settings";
export const DEFAULT_SETTINGS = {
  lang: "en",
  push: true,          // banner notifikasi di atas layar
  pushFriend: true,
  pushFavorite: true,
  pushCollab: true,
  pushSent: true,
  autoSlide: true,     // banner Home geser otomatis
  showOnline: true,
  showPhoto: true,
  allowFriend: true,   // boleh menerima permintaan teman
  allowCollab: true,   // boleh menerima ajakan kolaborasi
};

export default function useSettings() {
  const [stored, setStored] = usePersistentState(SETTINGS_KEY, DEFAULT_SETTINGS);
  const settings = { ...DEFAULT_SETTINGS, ...stored };
  const update = useCallback((patch) => setStored((cur) => ({ ...DEFAULT_SETTINGS, ...cur, ...patch })), [setStored]);
  return [settings, update];
}
