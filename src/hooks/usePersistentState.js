import { useCallback, useEffect, useRef, useState } from "react";
import { readStore, writeStore, STORE_EVENT } from "../services/storage.js";

// useState yang tersimpan di localStorage & sinkron antar komponen/tab.
export default function usePersistentState(key, fallback) {
  const fb = useRef(fallback);
  const [value, setValue] = useState(() => readStore(key, fb.current));

  useEffect(() => {
    const sync = (e) => {
      if (e.type === "storage" ? e.key === key : e.detail === key) setValue(readStore(key, fb.current));
    };
    window.addEventListener(STORE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(STORE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [key]);

  const set = useCallback((next) => {
    const cur = readStore(key, fb.current);
    writeStore(key, typeof next === "function" ? next(cur) : next);
  }, [key]);

  return [value, set];
}
