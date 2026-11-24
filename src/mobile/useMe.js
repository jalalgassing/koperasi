import { useMemo } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { formatMemberId, memberCardUrl, memberIdFromName } from "../utils/memberId.js";

// Identitas user yang sedang login untuk tampilan mobile.
export default function useMe() {
  const { user } = useAuth();
  const name = user?.name || "Member";
  return useMemo(() => {
    const memberId = memberIdFromName(name);
    return { name, memberId, display: formatMemberId(memberId), url: memberCardUrl(memberId, name) };
  }, [name]);
}

export function greetingKey() {
  const h = new Date().getHours();
  if (h < 11) return "greet.morning";
  if (h < 15) return "greet.afternoon";
  if (h < 19) return "greet.evening";
  return "greet.night";
}
