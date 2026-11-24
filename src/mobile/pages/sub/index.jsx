// Peta route mobile -> halaman. Dipakai App.jsx.
import NotificationsPage from "./NotificationsPage.jsx";
import SupportPage from "./SupportPage.jsx";
import RolesPage from "./RolesPage.jsx";
import PurchasePage from "./PurchasePage.jsx";
import ReportPage from "./ReportPage.jsx";
import TeamPage from "./TeamPage.jsx";
import IntegrationsPage from "./IntegrationsPage.jsx";
import HistoryPage from "./HistoryPage.jsx";
import UpworthPage from "./UpworthPage.jsx";
import MorePage from "./MorePage.jsx";
import ProfileSection from "./ProfileSections.jsx";

export const MOBILE_SUB_ROUTES = {
  "/main/notifications": <NotificationsPage />,
  "/main/support": <SupportPage />,
  "/main/roles-permissions": <RolesPage />,
  "/main/collective-purchase": <PurchasePage />,
  "/main/financial-report": <ReportPage />,
  "/main/team-performance": <TeamPage />,
  "/main/integrations": <IntegrationsPage />,
  "/main/history": <HistoryPage />,
  "/main/upworth": <UpworthPage />,
  "/main/more": <MorePage />,
  "/main/profile/:section": <ProfileSection />,
};
