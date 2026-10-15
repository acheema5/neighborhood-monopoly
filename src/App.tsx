import { Outlet, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { MerchantShell } from "./components/MerchantShell";
import { ExplorePage } from "./pages/ExplorePage";
import { BusinessDetailPage } from "./pages/BusinessDetailPage";
import { CollectionPage } from "./pages/CollectionPage";
import { EventsPage } from "./pages/EventsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { MerchantNeighborhoodPage } from "./pages/MerchantNeighborhoodPage";
import { MerchantClaimPage } from "./pages/MerchantClaimPage";
import { MerchantDashboardPage } from "./pages/MerchantDashboardPage";

function App() {
  return (
    <Routes>
      <Route
        element={
          <AppShell>
            <Outlet />
          </AppShell>
        }
      >
        <Route path="/" element={<ExplorePage />} />
        <Route path="/business/:businessId" element={<BusinessDetailPage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
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
        <Route path="/merchant/:businessId" element={<MerchantDashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
