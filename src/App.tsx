import type { ComponentType } from "react";
import { Outlet, Route, Routes, useParams } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { MerchantShell } from "./components/MerchantShell";
import { HomePage } from "./pages/HomePage";
import { ResidentNeighborhoodPage } from "./pages/ResidentNeighborhoodPage";
import { ExplorePage } from "./pages/ExplorePage";
import { BusinessDetailPage } from "./pages/BusinessDetailPage";
import { CollectionPage } from "./pages/CollectionPage";
import { EventsPage } from "./pages/EventsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { MerchantNeighborhoodPage } from "./pages/MerchantNeighborhoodPage";
import { MerchantClaimPage } from "./pages/MerchantClaimPage";
import { MerchantOverviewPage } from "./pages/MerchantOverviewPage";
import { MerchantProfilePage } from "./pages/MerchantProfilePage";
import { MerchantMenuPage } from "./pages/MerchantMenuPage";
import { MerchantOffersPage } from "./pages/MerchantOffersPage";
import { MerchantRedemptionsPage } from "./pages/MerchantRedemptionsPage";
import { MerchantReportsPage } from "./pages/MerchantReportsPage";

/** Remounts a business-scoped merchant page (and resets its local state) whenever :businessId changes. */
function keyedByBusinessId(Page: ComponentType) {
  return function KeyedPage() {
    const { businessId } = useParams();
    return <Page key={businessId} />;
  };
}

const MerchantOverviewRoute = keyedByBusinessId(MerchantOverviewPage);
const MerchantProfileRoute = keyedByBusinessId(MerchantProfilePage);
const MerchantMenuRoute = keyedByBusinessId(MerchantMenuPage);
const MerchantOffersRoute = keyedByBusinessId(MerchantOffersPage);
const MerchantRedemptionsRoute = keyedByBusinessId(MerchantRedemptionsPage);
const MerchantReportsRoute = keyedByBusinessId(MerchantReportsPage);

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/resident" element={<ResidentNeighborhoodPage />} />

      <Route
        element={
          <AppShell>
            <Outlet />
          </AppShell>
        }
      >
        <Route path="/app" element={<ExplorePage />} />
        <Route path="/app/business/:businessId" element={<BusinessDetailPage />} />
        <Route path="/app/collection" element={<CollectionPage />} />
        <Route path="/app/events" element={<EventsPage />} />
        <Route path="/app/profile" element={<ProfilePage />} />
      </Route>

      <Route
        element={
          <MerchantShell>
            <Outlet />
          </MerchantShell>
        }
      >
        <Route path="/merchant" element={<MerchantNeighborhoodPage />} />
        <Route path="/merchant/claim" element={<MerchantClaimPage />} />
        <Route path="/merchant/:businessId" element={<MerchantOverviewRoute />} />
        <Route path="/merchant/:businessId/profile" element={<MerchantProfileRoute />} />
        <Route path="/merchant/:businessId/menu" element={<MerchantMenuRoute />} />
        <Route path="/merchant/:businessId/offers" element={<MerchantOffersRoute />} />
        <Route path="/merchant/:businessId/redemptions" element={<MerchantRedemptionsRoute />} />
        <Route path="/merchant/:businessId/reports" element={<MerchantReportsRoute />} />
      </Route>
    </Routes>
  );
}

export default App;
