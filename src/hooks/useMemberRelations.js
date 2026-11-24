import { useCallback, useEffect, useState } from "react";

// Favorit & teman milik user yang sedang login, disimpan di localStorage
// (prototype, belum ada backend). Disinkronkan antar tab lewat event "storage".
const KEY = "parakarsa_relations";
const EMPTY = { favorites: [], friends: [], collaborations: [] };

function load() {
  try {
    return { ...EMPTY, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return EMPTY;
  }
}

export default function useMemberRelations() {
  const [rel, setRel] = useState(load);

  useEffect(() => {
    const onStorage = (e) => e.key === KEY && setRel(load());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const update = useCallback((field, memberId, on) => {
    setRel((cur) => {
      const has = cur[field].includes(memberId);
      const next = on === undefined ? !has : on;
      if (next === has) return cur;
      const list = next ? [...cur[field], memberId] : cur[field].filter((id) => id !== memberId);
      const out = { ...cur, [field]: list };
      try { localStorage.setItem(KEY, JSON.stringify(out)); } catch { /* storage penuh/diblokir */ }
      return out;
    });
  }, []);

  return {
    favorites: rel.favorites,
    friends: rel.friends,
    collaborations: rel.collaborations,
    toggleFavorite: (id, on) => update("favorites", id, on),
    toggleFriend: (id, on) => update("friends", id, on),
    toggleCollab: (id, on) => update("collaborations", id, on),
  };
}
