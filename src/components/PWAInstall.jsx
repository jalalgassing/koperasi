import { useCallback, useEffect, useRef, useState } from "react";
import { updateSW } from "../pwa.js";
import "./PWAInstall.css";

// Komponen kecil yang membuat "PWA terasa nyata" saat didemokan:
//   - tombol "Pasang" saat browser mengizinkan install (beforeinstallprompt)
//   - status offline / online
//   - notifikasi "siap dipakai offline" & "versi baru tersedia"
// Komponen ini TIDAK mengubah tampilan utama; hanya muncul sebagai toast
// kecil di pojok bawah, dan otomatis sembunyi kalau aplikasi sudah terpasang.
function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: window-controls-overlay)").matches ||
    window.navigator.standalone === true
  );
}

export default function PWAInstall() {
  // `beforeinstallprompt` bukan state biasa: simpan di ref agar event object
  // tidak terkena serialisasi React, dan tetap bisa dipanggil .prompt().
  const deferredPrompt = useRef(null);
  const noticeTimer = useRef(null);
  const [canInstall, setCanInstall] = useState(false);
  const [installed, setInstalled] = useState(isStandalone);
  const [dismissed, setDismissed] = useState(false);
  const [offline, setOffline] = useState(!navigator.onLine);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [notice, setNotice] = useState("");

  const showNotice = useCallback((message) => {
    setNotice(message);
    window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(""), 4500);
  }, []);

  useEffect(() => {
    const onBeforeInstall = (event) => {
      // Cegah banner bawaan Chrome supaya kita bisa memakai tombol sendiri.
      event.preventDefault();
      deferredPrompt.current = event;
      setCanInstall(true);
    };
    const onAppInstalled = () => {
      deferredPrompt.current = null;
      setCanInstall(false);
      setInstalled(true);
      showNotice("Parakarsa berhasil dipasang 🎉");
    };
    const onOnline = () => setOffline(false);
    const onOffline = () => setOffline(true);
    const onOfflineReady = () => showNotice("Siap dipakai tanpa internet");
    const onNeedRefresh = () => setNeedRefresh(true);

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onAppInstalled);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    window.addEventListener("pwa:offline-ready", onOfflineReady);
    window.addEventListener("pwa:need-refresh", onNeedRefresh);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onAppInstalled);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("pwa:offline-ready", onOfflineReady);
      window.removeEventListener("pwa:need-refresh", onNeedRefresh);
      window.clearTimeout(noticeTimer.current);
    };
  }, [showNotice]);

  const handleInstall = async () => {
    const promptEvent = deferredPrompt.current;
    if (!promptEvent) return;
    await promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    deferredPrompt.current = null;
    setCanInstall(false);
    if (outcome === "accepted") {
      setInstalled(true);
      showNotice("Parakarsa berhasil dipasang 🎉");
    } else {
      showNotice("Pemasangan dibatalkan");
    }
  };

  // Urutan prioritas: update > ajakan install > status offline > toast info.
  let content = null;
  if (needRefresh) {
    content = {
      icon: "↻",
      title: "Versi baru tersedia",
      text: "Perbarui untuk memakai tampilan terbaru.",
      action: "Perbarui",
      onAction: () => updateSW(true),
      onClose: () => setNeedRefresh(false),
    };
  } else if (canInstall && !installed && !dismissed) {
    content = {
      icon: "⬇",
      title: "Pasang Parakarsa",
      text: "Buka seperti aplikasi, langsung dari layar utama.",
      action: "Pasang",
      onAction: handleInstall,
      onClose: () => setDismissed(true),
    };
  } else if (offline) {
    content = {
      icon: "●",
      title: "Sedang offline",
      text: "Halaman dimuat dari cache. Data lokal tetap tersedia.",
      offline: true,
    };
  } else if (notice) {
    content = { icon: "✓", title: notice, text: "", onClose: () => setNotice("") };
  }

  if (!content) return null;

  return (
    <div className={`pwa-toast ${content.offline ? "pwa-toast--offline" : ""}`} role="status" aria-live="polite">
      <span className="pwa-toast__icon" aria-hidden="true">{content.icon}</span>
      <div className="pwa-toast__body">
        <strong>{content.title}</strong>
        {content.text && <span>{content.text}</span>}
      </div>
      {content.action && (
        <button type="button" className="pwa-toast__btn" onClick={content.onAction}>
          {content.action}
        </button>
      )}
      {content.onClose && (
        <button type="button" className="pwa-toast__close" onClick={content.onClose} aria-label="Tutup">
          ×
        </button>
      )}
    </div>
  );
}
