# Parakarsa — Koperasi Digital (React + Vite + PWA)

Web koperasi Parakarsa, sekarang sudah menjadi **Progressive Web App (PWA)**: bisa dipasang di Android, dibuka fullscreen tanpa address bar, dan tetap bisa dibuka saat internet mati.

Kode aplikasi **tidak di-rewrite**. PWA ditambahkan hanya lewat `vite-plugin-pwa` + ikon + 2 file kecil.

---

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:5173  (service worker juga aktif di dev)
```

Build & uji versi produksi (ini yang dipakai untuk demo PWA / Lighthouse):

```bash
npm run build
npm run preview    # http://localhost:4173
```

`npm run build` otomatis menghasilkan di folder `dist/`:

| File | Fungsi |
|---|---|
| `manifest.webmanifest` | Identitas aplikasi (nama, ikon, warna, `display: standalone`) |
| `sw.js` + `workbox-*.js` | Service worker: precache app shell, fallback offline, update |
| `icons/*` | Ikon 32/64/180/192/512 + maskable 512 |

> File di `dist/` jangan diedit manual — semuanya di-generate dari `vite.config.js`.

---

## Yang ditambahkan untuk PWA

| File | Keterangan |
|---|---|
| `package.json` | `+ vite-plugin-pwa` (devDependency) |
| `vite.config.js` | Konfigurasi `VitePWA`: `manifest`, `workbox`, `devOptions` |
| `index.html` | Ikon, `theme-color`, meta PWA & Apple/Safari |
| `src/pwa.js` | Registrasi service worker (`virtual:pwa-register`) |
| `src/components/PWAInstall.jsx` / `.css` | Tombol "Pasang", status offline, toast update |
| `src/main.jsx` | Import `pwa.js` + mount `<PWAInstall />` |
| `public/icons/` | 6 ikon brand (termasuk **maskable** untuk Android) |
| `docs/PWA-PENJELASAN.md` | Materi lengkap presentasi ke PIC |
| `docs/pwa-presentasi.html` | Satu halaman presentasi (buka di browser, bisa di-print) |

**Tidak berubah:** seluruh UI, halaman, routing, context, hooks, data mock, CSS — termasuk tampilan mobile di `src/mobile/`.

---

## Catatan penting

- **Wajib HTTPS** untuk service worker, kecuali `localhost`. Deploy ke Netlify / Vercel / GitHub Pages (HTTPS otomatis). `http://192.168.x.x` **tidak** akan mendaftarkan SW.
- Untuk tes di HP Android lewat Wi-Fi tanpa deploy, pakai tunnel HTTPS: `npx localtunnel --port 4173`, `cloudflared tunnel`, atau ngrok.
- Di `npm run dev` kadang muncul warning *"One of the glob patterns doesn't match any files"* — itu **aman**, karena di mode dev memang tidak ada aset statis yang di-precache. Kalau mengganggu saat ngoding UI, set `devOptions.enabled: false` di `vite.config.js`.
- **iOS/Safari:** install lewat *Add to Home Screen* manual; tidak ada `beforeinstallprompt`.
- Data aplikasi saat ini berupa mock + `localStorage` (client-side), jadi ikut tersedia offline. Jika nanti ditambahkan API server, data dari server tetap membutuhkan internet.
- Ingin file **APK / Play Store**? Bungkus PWA dengan **PWABuilder** atau **Bubblewrap (TWA)** — kode web tetap sama, bukan rewrite.

---

## Cara cek PWA di Chrome

1. DevTools → **Application → Manifest** (nama, ikon, display).
2. DevTools → **Application → Service Workers** (status *activated and is running*).
3. DevTools → **Lighthouse** → kategori **PWA**.
4. DevTools → **Network → Offline**, lalu reload → halaman tetap tampil.
5. Klik tombol **"Pasang"** (atau ikon install di address bar) → aplikasi terpasang.

Materi presentasi & daftar prediksi pertanyaan PIC ada di **`docs/PWA-PENJELASAN.md`**.
