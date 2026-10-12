import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { ExplorePage } from "./pages/ExplorePage";
import { BusinessDetailPage } from "./pages/BusinessDetailPage";
import { CollectionPage } from "./pages/CollectionPage";
import { EventsPage } from "./pages/EventsPage";
import { RewardsPage } from "./pages/RewardsPage";
import { ProfilePage } from "./pages/ProfilePage";

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<ExplorePage />} />
        <Route path="/business/:businessId" element={<BusinessDetailPage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </AppShell>
  );
}

export default App;
