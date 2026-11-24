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
import HakiStudioPage from "./pages/dashboard/HakiStudioPage.jsx";
import MemberCardPage from "./pages/member-card/MemberCardPage.jsx";
import DashboardComingSoon from "./pages/dashboard/DashboardComingSoon.jsx";
import { SIDEBAR_NAV } from "./data/sidebarNav.js";
import { useAuth } from "./context/AuthContext.jsx";
import useIsMobile from "./hooks/useIsMobile.js";
import MobileLayout from "./mobile/MobileLayout.jsx";
import MobileHome from "./mobile/pages/MobileHome.jsx";
import MobileWorkforce from "./mobile/pages/MobileWorkforce.jsx";
import MobileMemberId from "./mobile/pages/MobileMemberId.jsx";
import MobileProfile from "./mobile/pages/MobileProfile.jsx";
import MemberScanPage from "./mobile/pages/MemberScanPage.jsx";
import { MOBILE_SUB_ROUTES } from "./mobile/pages/sub/index.jsx";

const AUTH_ROUTES = ["/masuk", "/daftar"];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

// Mencegah akses /main/* tanpa "login" (sesi simulasi) — lempar ke halaman
// Masuk kalau belum ada sesi. Lihat src/context/AuthContext.jsx.
function RequireAuth({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  // "from" dipakai LoginPage untuk kembali ke halaman tujuan (mis. hasil scan QR).
  if (!isLoggedIn) return <Navigate to="/masuk" replace state={{ from: location }} />;
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
  "/main/haki-studio": <HakiStudioPage />,
   "/main/member-card": <MemberCardPage />,
};

// Tampilan mobile (<= 768px) punya halaman sendiri untuk 4 tab utama.
const MOBILE_PAGES = {
  "/main": <MobileHome />,
  "/main/shared-workforce": <MobileWorkforce />,
  "/main/member-card": <MobileMemberId />,
};

export default function App() {
  const isMobile = useIsMobile();
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
                {isMobile ? <MobileLayout /> : <DashboardLayout pageTitle={<DashboardTitle />} />}
              </RequireAuth>
            }
          >
            {SIDEBAR_NAV.flatMap((group) =>
              group.items.map((item) => (
                <Route
                  key={item.to}
                  path={item.to}
                  element={(isMobile && (MOBILE_PAGES[item.to] || MOBILE_SUB_ROUTES[item.to])) || READY_PAGES[item.to] || <ComingSoonRoute title={item.label} />}
                />
              ))
            )}
            <Route
              path="/main/profile"
              element={isMobile ? <MobileProfile /> : <ComingSoonRoute title="Profile" />}
            />
            {/* Halaman turunan mobile (notifikasi, bantuan, riwayat, sub-menu profil, dst) */}
            {Object.entries(MOBILE_SUB_ROUTES)
              .filter(([path]) => !SIDEBAR_NAV.some((g) => g.items.some((i) => i.to === path)))
              .map(([path, el]) => (
                <Route key={path} path={path} element={isMobile ? el : <ComingSoonRoute title="Mobile only" />} />
              ))}
            {/* Tujuan scan QR member ID: kartu anggota versi web */}
            <Route path="/main/member-card/:memberId" element={<MemberScanPage />} />
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
