import { useCallback, useEffect, useRef, useState } from "react";

// Toast kecil untuk umpan balik aksi (copy, share, dll).
export default function useToast() {
  const [msg, setMsg] = useState("");
  const timer = useRef(null);
  const show = useCallback((text) => {
    setMsg(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(""), 2200);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  const node = msg ? <div className="m-toast" role="status">{msg}</div> : null;
  return [node, show];
}
