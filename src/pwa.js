// Registrasi Service Worker untuk PWA Parakarsa.
// -----------------------------------------------------------------------------
// File ini di-import sekali dari main.jsx. `virtual:pwa-register` adalah
// modul virtual yang disediakan oleh vite-plugin-pwa (bukan file di disk),
// berisi pembungkus workbox-window untuk mendaftarkan sw.js / dev-sw.js.
//
// Kita daftarkan secara manual (bukan injectRegister otomatis) agar bisa
// menampilkan notifikasi ke pengguna ketika:
//   - aplikasi sudah siap dipakai offline, dan
//   - ada versi baru yang sudah ter-download.
import { registerSW } from "virtual:pwa-register";

export const updateSW = registerSW({
  immediate: true,
  onOfflineReady() {
    window.dispatchEvent(new CustomEvent("pwa:offline-ready"));
  },
  onNeedRefresh() {
    window.dispatchEvent(new CustomEvent("pwa:need-refresh"));
  },
  onRegisterError(error) {
    // Jangan sampai gagal registrasi SW membuat aplikasi ikut error.
    console.warn("[PWA] Service worker gagal didaftarkan:", error);
  },
});
