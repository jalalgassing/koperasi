import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// PWA Parakarsa
// -----------------------------------------------------------------------------
// Plugin `vite-plugin-pwa` (Workbox) yang mengubah build React + Vite ini
// menjadi Progressive Web App. Tidak ada kode aplikasi yang diubah: plugin
// hanya men-generate 2 file tambahan saat build:
//   1. manifest.webmanifest  -> identitas aplikasi (nama, ikon, warna, mode)
//   2. sw.js                 -> service worker (cache app shell + offline)
// Dokumentasi: https://vite-pwa-org.netlify.app/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Saat ada versi baru, service worker langsung diperbarui tanpa
      // menunggu semua tab ditutup. Notifikasi "versi baru" tetap muncul
      // lewat komponen PWAInstall.jsx.
      registerType: "autoUpdate",
      // Registrasi dilakukan manual di src/pwa.js supaya kita bisa menangani
      // event offline-ready / need-refresh.
      injectRegister: null,
      // Ikon yang tidak di-import dari JS (ada di folder public) tetap
      // ikut ter-precache agar bisa dipakai saat offline.
      includeAssets: [
        "icons/favicon-32x32.png",
        "icons/apple-touch-icon.png",
        "icons/pwa-64x64.png",
      ],

      // === WEB APP MANIFEST ==============================================
      // Ini yang dibaca Android/Chrome saat pengguna menekan "Install app".
      manifest: {
        id: "/",
        name: "Parakarsa — Platform Koperasi Digital",
        short_name: "Parakarsa",
        description:
          "Satu platform untuk menghubungkan & bertransformasi: akses Cloud & AI, perlindungan HAKI, dan kolaborasi ekosistem koperasi.",
        lang: "id",
        dir: "ltr",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "any",
        background_color: "#0a453b",
        theme_color: "#0a453b",
        categories: ["business", "finance", "productivity"],
        prefer_related_applications: false,
        icons: [
          {
            src: "/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            // Ikon maskable = aman dipotong jadi lingkaran/bundar oleh
            // launcher Android. Wajib agar ikon tidak terpotong aneh.
            src: "/icons/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        shortcuts: [
          {
            name: "Dashboard Anggota",
            short_name: "Dashboard",
            description: "Buka halaman utama anggota",
            url: "/main",
            icons: [{ src: "/icons/pwa-192x192.png", sizes: "192x192" }],
          },
          {
            name: "Kartu Anggota",
            short_name: "Kartu",
            description: "Tampilkan kartu anggota digital",
            url: "/main/member-card",
            icons: [{ src: "/icons/pwa-192x192.png", sizes: "192x192" }],
          },
        ],
      },

      // === SERVICE WORKER (Workbox) ======================================
      workbox: {
        // Semua aset hasil build (JS/CSS/HTML/gambar/font) disimpan di cache
        // saat install -> halaman tetap bisa dibuka walau tanpa internet.
        globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,svg,webp,woff,woff2,json}"],
        // Aplikasi memakai React Router (BrowserRouter): semua URL harus
        // jatuh ke index.html supaya deep-link tidak 404 saat offline.
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api\//],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          // Font Google di-cache terpisah (tidak ikut precache karena
          // di-load dari domain lain lewat @import di index.css).
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "parakarsa-font-stylesheets",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "parakarsa-font-webfonts",
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },

      // Service worker juga aktif di `npm run dev`, jadi PWA bisa langsung
      // didemokan di http://localhost:5173 tanpa harus build dulu.
      // (localhost dianggap "secure context" oleh Chrome, sama seperti HTTPS.)
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
  server: {
    port: 5173,
  },
});
