import { createContext, useContext, useEffect, useState } from "react";

/**
 * Simulasi sesi login untuk kebutuhan PROTOTYPE (belum ada backend).
 * Data user disimpan di localStorage supaya status "sudah login" tetap
 * bertahan walau halaman di-refresh — cocok untuk demo ke dosen/klien
 * tanpa perlu login ulang terus-menerus.
 *
 * Catatan: ini BUKAN autentikasi sungguhan. Tidak ada password yang
 * divalidasi ke server mana pun. Lihat catatan di README soal kapan
 * ini perlu diganti dengan auth asli.
 */

const AuthContext = createContext(null);
const STORAGE_KEY = "parakarsa_session";

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadSession);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (userData) => {
    setUser({
      name: userData?.name || "Andika Putra",
      role: userData?.role || "Ketua Koperasi",
    });
  };

  const logout = () => setUser(null);

  const value = { user, isLoggedIn: Boolean(user), login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  return ctx;
}
