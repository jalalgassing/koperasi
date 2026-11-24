import usePersistentState from "./usePersistentState.js";
import { NOTIF_KEY, getNotifications } from "../services/notifications.js";

export default function useNotifications() {
  const [list] = usePersistentState(NOTIF_KEY, null);
  const items = list || getNotifications();
  return { items, unread: items.filter((n) => !n.read).length };
}
