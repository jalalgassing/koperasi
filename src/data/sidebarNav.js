// Daftar menu sidebar dashboard "Main". Dipakai oleh DashboardLayout untuk
// render menu, dan oleh App.jsx untuk mendaftarkan route-nya.
// "status: ready" -> sudah ada halaman aslinya. "status: soon" -> masih
// placeholder "Segera Hadir" di dalam shell dashboard (biar link tidak mati).
export const SIDEBAR_NAV = [
  {
    group: "Main",
    items: [
      { label: "Home", to: "/main", icon: "home", status: "ready" },
      { label: "Trending", to: "/main/trending", icon: "trending", status: "soon" },
      {
        label: "AI Generative Studio",
        to: "/main/ai-generative-studio",
        icon: "studio",
        status: "ready",
      },
      {
        label: "Shared Workforce",
        to: "/main/shared-workforce",
        icon: "workforce",
        status: "ready",
      },
      { label: "Haki Studio", to: "/main/haki-studio", icon: "haki", status: "soon" },
    ],
  },
  {
    group: "Management",
    items: [
      {
        label: "Collective Purchase",
        to: "/main/collective-purchase",
        icon: "cart",
        status: "soon",
      },
      {
        label: "Financial Report",
        to: "/main/financial-report",
        icon: "report",
        status: "soon",
      },
      {
        label: "Team Performance",
        to: "/main/team-performance",
        icon: "team",
        status: "soon",
      },
      {
        label: "Roles & Permissions",
        to: "/main/roles-permissions",
        icon: "roles",
        status: "soon",
      },
      { label: "Integrations", to: "/main/integrations", icon: "integration", status: "soon" },
    ],
  },
];
