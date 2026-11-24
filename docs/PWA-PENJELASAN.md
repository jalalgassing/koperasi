# PWA Parakarsa — Materi Presentasi ke PIC

> Dokumen ini disiapkan sebagai "contekan" sebelum presentasi. Bisa dibaca berurutan, atau langsung loncat ke **Bagian 9 (Prediksi Pertanyaan PIC)**.

---

## 1. Satu kalimat yang aman diucapkan

> **"PWA itu website biasa yang dikasih 'identitas aplikasi' dan 'otak cache', sehingga bisa dipasang di HP Android, dibuka fullscreen tanpa address bar, dan tetap jalan walau internet mati — tanpa harus bikin aplikasi native atau Flutter."**

Kalimat tambahan kalau ditanya soal kode:

> **"Kode React + Vite kita tidak berubah sama sekali. Kita cuma menambah satu plugin (`vite-plugin-pwa`) yang otomatis menghasilkan dua file: manifest dan service worker."**

---

## 2. Analogi (paling ampuh untuk PIC non-teknis)

| | Analogi | Penjelasan teknis |
|---|---|---|
| **Website biasa** | Brosur di kantor. Tiap mau baca harus datang lagi ke kantor. Kalau kantor tutup, tidak bisa baca. | Tiap buka halaman, browser request ulang ke server. Internet mati = halaman gagal. |
| **PWA** | Brosur yang sekali diambil, lalu **difotokopi dan disimpan di tas**. Bisa dibaca kapan saja. Dikasih **cover + label nama** supaya bisa ditaruh di rak depan meja (home screen) seolah buku sendiri. | Aset disimpan di **Cache Storage** oleh service worker. **Manifest** memberi nama, ikon, dan warna. |
| **Service worker** | Asisten yang berdiri di antara HP dan server. Tiap ada permintaan, ia memutuskan: "ambillah dari tas dulu" atau "telepon server". | Script yang jalan di background, terpisah dari halaman React, dan bisa **mencegat request** (`fetch`). |

**Kunci yang harus ditekankan:** PWA **bukan** aplikasi baru, **bukan** framework baru, **bukan** bahasa baru. Ini adalah **kemampuan tambahan pada website yang sudah ada**.

---

## 3. Definisi formal

**Progressive Web App (PWA)** adalah kumpulan **standar web terbuka** (W3C / Google, ~2015) yang memberi website kemampuan mirip aplikasi native: terpasang, fullscreen, offline, dan dapat di-update. Didukung Chrome, Edge, Samsung Internet, Firefox, dan sebagian Safari.

### Tiga pilar wajib

| Pilar | Fungsi | Di project Parakarsa |
|---|---|---|
| **HTTPS / secure context** | Syarat keamanan. Service worker **hanya boleh jalan di HTTPS** (atau `localhost`). | Deploy ke Netlify / Vercel / GitHub Pages = HTTPS otomatis. `localhost` juga dianggap aman untuk demo. |
| **Web App Manifest** (`manifest.webmanifest`) | "KTP aplikasi": nama, nama pendek, ikon, warna tema, `start_url`, dan mode tampilan (`display: standalone`). | Di-generate dari blok `manifest:` di `vite.config.js`. |
| **Service Worker** (`sw.js`) | Script background yang melakukan **install → precache → intercept request → update**. | Di-generate otomatis oleh **Workbox** lewat blok `workbox:` di `vite.config.js`. |

### Pelengkap (supaya rapi di HP)
Ikon **192×192**, **512×512**, dan **maskable 512×512** (aman dipotong jadi lingkaran oleh launcher Android), `apple-touch-icon`, `theme-color`, dan meta tag Safari.

---

## 4. Cara kerja — urutan kejadian (ini yang paling sering ditanya)

```
[1] User buka URL (HTTPS)
        │
[2] Browser unduh index.html → React + Vite jalan SEPERTI BIASA
        │
[3] main.jsx → src/pwa.js → registerSW() mendaftarkan sw.js
        │
[4] SW fase INSTALL: Workbox menyimpan semua aset build
    (JS, CSS, HTML, gambar, font, manifest) ke Cache Storage
    → disebut "app shell" (35 file, ±3,6 MB di build ini)
        │
[5] SW fase ACTIVATE: clientsClaim + skipWaiting → langsung kontrol tab
        │
[6] Browser baca manifest + cek syarat installability:
    HTTPS ✓  manifest valid ✓  ikon 192 & 512 ✓  SW punya fetch handler ✓
    → memicu event beforeinstallprompt → tombol "Pasang" muncul
        │
[7] User klik "Pasang" (atau Chrome ⋮ → Install app / Add to Home Screen)
    → Android bikin ikon + splash screen dari background_color & ikon
        │
[8] Buka dari ikon → display: standalone → TANPA address bar,
    status bar mengikuti theme_color → terasa seperti aplikasi native
        │
[9] Internet mati → SW jawab dari cache.
    navigateFallback: /index.html memastikan route React Router
    (/main, /main/member-card, ...) TIDAK 404 saat offline
        │
[10] Ada deploy baru → SW unduh versi baru → toast "Versi baru tersedia"
     → klik "Perbarui" → reload. Tidak perlu uninstall / Play Store.
```

**Catatan jujur untuk PIC:** aplikasi ini memakai data mock + `localStorage` (client-side), jadi data lokal ikut aman saat offline. **Kalau nanti ada API server, data dari server tetap butuh internet** — PWA hanya menjamin *tampilan & aset*, bukan sinkronisasi data realtime. Jangan over-promise soal ini.

---

## 5. Kenapa tidak jadi Flutter (jawaban untuk PIC)

| Aspek | Web biasa | **PWA (dipilih)** | Flutter / native |
|---|---|---|---|
| Kode | React + Vite | **React + Vite sama persis, + 1 plugin** | Codebase baru, bahasa Dart |
| Biaya & waktu | — | **Hampir tanpa rewrite** | 1 project tambahan, tim/skill terpisah |
| Distribusi | URL | URL **+ bisa di-install di HP** | Play Store / App Store |
| Update | Deploy | **Deploy langsung; user dapat versi baru otomatis** | Upload build + tunggu review |
| Offline | Tidak | **Ya (app shell + data lokal)** | Ya |
| Ikon di home screen | Tidak | **Ya** | Ya |
| Akses hardware penuh (NFC, Bluetooth, background sync, push iOS) | Tidak | Terbatas | Penuh |
| Tampilan mobile yang sudah dibuat | — | **Tetap terpakai** | Harus dibuat ulang |

> **Kesimpulan buat PIC:** karena targetnya *"web koperasi bisa dibuka di Android seperti aplikasi"*, PWA adalah jalan paling cepat & paling murah. Flutter baru diperlukan kalau nanti butuh fitur native berat atau memang ingin aplikasi mandiri di Play Store.

### Soal "plugin yang lupa"
- Plugin untuk **Vite** yang kamu maksud: **`vite-plugin-pwa`** ✅ (sudah dipasang).
- Kalau PIC nanti minta **file APK / masuk Play Store**: itu bukan plugin Vite lagi, tapi **PWABuilder** / **Bubblewrap (Trusted Web Activity / TWA)** yang **membungkus PWA jadi APK**. Kode web-nya tetap sama, hanya dibungkus — bukan rewrite.

---

## 6. Yang bisa vs. yang terbatas (biar tidak over-promise)

**Bisa ✅**
- Dipasang di Android, dibuka fullscreen tanpa address bar
- Ikon + splash screen + shortcut (Dashboard, Kartu Anggota)
- Offline untuk seluruh halaman & aset statis (sudah diuji: reload saat network dimatikan tetap tampil)
- Update otomatis dengan notifikasi "versi baru"
- Tetap responsif — tampilan mobile yang sudah ada tidak berubah
- Font Google ikut ter-cache

**Terbatas ⚠️**
- **iOS/Safari:** harus *Add to Home Screen* manual; tidak ada `beforeinstallprompt`; push notification terbatas
- **Wajib HTTPS** (kecuali `localhost`)
- Tidak bisa akses hardware native penuh seperti aplikasi native
- Data yang bergantung pada **API server** tetap butuh internet
- PWA **tidak otomatis muncul di Play Store** (perlu dibungkus TWA)

---

## 7. Daftar perubahan kode (bisa ditunjukkan ke PIC)

| File | Status | Isi |
|---|---|---|
| `package.json` | diubah | + `vite-plugin-pwa` (devDependency) |
| `vite.config.js` | diubah | + `VitePWA({ manifest, workbox, devOptions })` |
| `index.html` | diubah | + ikon, `theme-color`, meta PWA & Apple |
| `src/pwa.js` | **baru** | Registrasi service worker + event update/offline |
| `src/components/PWAInstall.jsx` | **baru** | Tombol "Pasang", status offline, toast update |
| `src/components/PWAInstall.css` | **baru** | Styling toast (tidak mengganggu desain) |
| `src/main.jsx` | diubah | Import `pwa.js` + mount `<PWAInstall />` (3 baris) |
| `public/icons/*` | **baru** | 6 ikon: 32, 64, 180, 192, 512, 512-maskable |
| `.gitignore` | diubah | Tambah `dist/`, `dev-dist/`, `node_modules/` |
| `docs/*` | **baru** | Materi presentasi ini |

**Yang TIDAK berubah:** seluruh komponen UI, halaman, routing, context, hooks, data mock, dan CSS desain — termasuk `src/mobile/` (tampilan mobile).

**Yang di-generate otomatis saat `npm run build`** (jangan diedit manual): `dist/manifest.webmanifest`, `dist/sw.js`, `dist/workbox-*.js`.

---

## 8. Cara demo 5 menit

```bash
npm install
npm run build
npm run preview          # http://localhost:4173
```

1. Buka `http://localhost:4173` di Chrome.
2. **DevTools → Application → Manifest**: lihat nama, ikon, `display: standalone`.
3. **DevTools → Application → Service Workers**: status *activated and is running*.
4. **DevTools → Lighthouse → kategori PWA**: cek skor installability.
5. **DevTools → Network → Offline**, lalu reload → halaman tetap tampil. ✅
6. Klik **"Pasang"** pada toast (atau ikon install di address bar) → aplikasi terpasang.

**Untuk HP Android sungguhan:** deploy ke hosting HTTPS (Netlify/Vercel/GitHub Pages), buka di Chrome Android, lalu ⋮ → **"Install app"**.
⚠️ `http://192.168.x.x` (LAN) **bukan** secure context, jadi service worker tidak akan jalan. Kalau mau tes lewat Wi-Fi tanpa deploy, pakai tunnel HTTPS: `npx localtunnel --port 4173`, `cloudflared tunnel`, atau ngrok.

> Untuk development harian, `npm run dev` juga sudah aktif SW-nya (`devOptions.enabled: true`), jadi PWA bisa didemokan langsung di `localhost:5173`. Warning "glob pattern doesn't match any files" di terminal dev itu **aman, bisa diabaikan** (memang tak ada aset statis yang di-precache di mode dev). Kalau terasa mengganggu saat ngoding UI, set `devOptions.enabled: false`.

---

## 9. Prediksi pertanyaan PIC + jawaban singkat

| Pertanyaan | Jawaban |
|---|---|
| "Ini aplikasi atau website?" | Website yang **bisa dipasang seperti aplikasi**. Satu codebase, satu deploy. |
| "Berarti kita bikin 2 aplikasi?" | Tidak. Masih 1 project React + Vite yang sama. |
| "Kenapa awalnya mau Flutter?" | Flutter untuk aplikasi native penuh. Untuk kebutuhan *buka di Android*, PWA cukup dan jauh lebih hemat. |
| "Kalau internet mati, datanya hilang?" | Tampilan & data lokal aman. Data dari server baru muncul saat online. |
| "Bisa masuk Play Store?" | Bisa, dibungkus **TWA / PWABuilder** jadi APK. Tetap pakai kode web yang sama. |
| "iPhone bisa?" | Bisa dibuka & *Add to Home Screen*, tapi alur install tidak semulus Android. |
| "Kenapa harus HTTPS?" | Aturan browser untuk service worker. `localhost` dikecualikan khusus untuk development. |
| "Update aplikasinya gimana?" | Tinggal deploy. User dapat toast "Versi baru tersedia", klik Perbarui, selesai. |
| "Apakah desain mobile-nya berubah?" | Tidak. `src/mobile/` tetap dipakai apa adanya. |
| "Berapa lama pengerjaannya?" | Konfigurasi + pembuatan ikon; tidak ada perubahan UI. |
| "Ukurannya berapa?" | App shell ±3,6 MB sekali cache; setelah itu buka halaman tidak unduh ulang. |
| "Aman?" | Service worker hanya jalan di HTTPS, dan hanya bisa mengakses aset dari origin kita sendiri. |

---

## 10. Istilah cepat (kalau PIC pakai istilah asing)

| Istilah | Arti singkat |
|---|---|
| **App shell** | Kerangka minimal (HTML/CSS/JS) yang di-cache supaya aplikasi bisa langsung tampil |
| **Precache** | Menyimpan aset saat service worker di-install, sebelum dibutuhkan |
| **Cache Storage** | Tempat penyimpanan browser khusus untuk aset (berbeda dengan `localStorage`) |
| **Workbox** | Library Google yang dipakai `vite-plugin-pwa` untuk men-generate service worker |
| **Manifest** | File JSON berisi identitas aplikasi |
| **Maskable icon** | Ikon dengan *safe zone* supaya tidak terpotong saat launcher Android membentuk lingkaran |
| **Standalone** | Mode tampilan tanpa UI browser (tanpa address bar) |
| **`beforeinstallprompt`** | Event browser yang menandakan aplikasi *layak dipasang* |
| **TWA** | *Trusted Web Activity* — cara membungkus PWA menjadi APK Android |

---

## Lampiran: hasil verifikasi teknis (bisa disebut saat demo)

Pengujian dengan Chrome headless pada build produksi (`npm run preview`):

```
title              : Parakarsa — Satu Platform untuk Menghubungkan & Bertransformasi
rootRendered       : true
manifestLinked     : true
themeColor         : #0a453b
serviceWorkers     : 1
swActive           : true
controlled         : true
secureContext      : true
installPromptSupported : true
JS errors          : (none)
```

Uji **reload dengan network dimatikan**: halaman tetap render, navigasi tetap ada, `controller: true`. ✅
