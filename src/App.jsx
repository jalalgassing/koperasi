import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import LayananPage from "./pages/layanan/LayananPage.jsx";
import TentangKamiPage from "./pages/tentang-kami/TentangKamiPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import DashboardHomePage from "./pages/dashboard/DashboardHomePage.jsx";
import AiGenerativeStudioPage from "./pages/dashboard/AiGenerativeStudioPage.jsx";
import SharedWorkforcePage from "./pages/dashboard/SharedWorkforcePage.jsx";
import DashboardComingSoon from "./pages/dashboard/DashboardComingSoon.jsx";
import { SIDEBAR_NAV } from "./data/sidebarNav.js";
import { useAuth } from "./context/AuthContext.jsx";

const AUTH_ROUTES = ["/masuk", "/daftar"];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Mencegah akses /main/* tanpa "login" (sesi simulasi) — lempar ke halaman
// Masuk kalau belum ada sesi. Lihat src/context/AuthContext.jsx.
function RequireAuth({ children }) {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/masuk" replace />;
  return children;
}

// Komponen generik untuk halaman dashboard yang belum didesain, supaya
// tiap link sidebar tetap render judul yang sesuai tanpa bikin file baru.
function ComingSoonRoute({ title }) {
  return <DashboardComingSoon title={title} />;
}

// Peta item sidebar -> elemen halaman yang sudah punya desain asli.
const READY_PAGES = {
  "/main": <DashboardHomePage />,
  "/main/ai-generative-studio": <AiGenerativeStudioPage />,
  "/main/shared-workforce": <SharedWorkforcePage />,
};

export default function App() {
  const { pathname } = useLocation();
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isDashboardRoute = pathname.startsWith("/main");

  return (
    <>
      <ScrollToTop />
      {!isAuthRoute && !isDashboardRoute && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/layanan" element={<LayananPage />} />
          <Route path="/tentang-kami" element={<TentangKamiPage />} />
          <Route path="/masuk" element={<LoginPage />} />
          <Route path="/daftar" element={<RegisterPage />} />

          <Route
            element={
              <RequireAuth>
                <DashboardLayout pageTitle={<DashboardTitle />} />
              </RequireAuth>
            }
          >
            {SIDEBAR_NAV.flatMap((group) =>
              group.items.map((item) => (
                <Route
                  key={item.to}
                  path={item.to}
                  element={READY_PAGES[item.to] || <ComingSoonRoute title={item.label} />}
                />
              ))
            )}
          </Route>
        </Routes>
      </main>
      {!isAuthRoute && !isDashboardRoute && <Footer />}
    </>
  );
}

// Judul topbar mengikuti label menu sidebar yang sedang aktif.
function DashboardTitle() {
  const { pathname } = useLocation();
  const allItems = SIDEBAR_NAV.flatMap((g) => g.items);
  const match = allItems.find((i) => i.to === pathname);
  return match?.label || "Main";
}
