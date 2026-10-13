import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { ExplorePage } from "./pages/ExplorePage";
import { BusinessDetailPage } from "./pages/BusinessDetailPage";
import { CollectionPage } from "./pages/CollectionPage";
import { EventsPage } from "./pages/EventsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { MerchantPage } from "./pages/MerchantPage";
import { MerchantDashboardPage } from "./pages/MerchantDashboardPage";

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<ExplorePage />} />
        <Route path="/business/:businessId" element={<BusinessDetailPage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/merchant" element={<MerchantPage />} />
        <Route path="/merchant/:businessId" element={<MerchantDashboardPage />} />
      </Routes>
    </AppShell>
  );
}

export default App;
