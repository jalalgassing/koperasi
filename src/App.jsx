import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import LayananPage from "./pages/layanan/LayananPage.jsx";
import PlaceholderPage from "./pages/placeholder/PlaceholderPage.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/layanan" element={<LayananPage />} />
          <Route
            path="/tentang-kami"
            element={<PlaceholderPage title="Tentang Kami" />}
          />
          <Route path="/masuk" element={<PlaceholderPage title="Masuk" />} />
          <Route path="/daftar" element={<PlaceholderPage title="Daftar" />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
