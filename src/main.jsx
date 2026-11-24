import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import PWAInstall from "./components/PWAInstall.jsx";
import "./pwa.js"; // daftarkan service worker (dijalankan satu kali)
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        {/* Toast install / offline / update — muncul di semua halaman */}
        <PWAInstall />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
