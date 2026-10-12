import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Business } from "../data/types";
import { useAppStore } from "../store/useAppStore";
import { EAST_VILLAGE_CENTER } from "../data/coordinates";

interface ExploreMapProps {
  businesses: Business[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const CATEGORY_INITIAL: Record<string, string> = {
  "Food & Drink": "F",
  "Books & Culture": "B",
  Music: "M",
  Fashion: "S",
};

function markerIcon(initial: string, collected: boolean, selected: boolean) {
  const size = selected ? 38 : 32;
  return divIcon({
    html: `<span class="business-marker-pin${collected ? " business-marker-pin--collected" : ""}">${initial}</span>`,
    className: "business-marker-icon",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export function ExploreMap({ businesses, selectedId, onSelect }: ExploreMapProps) {
  const isCollected = useAppStore((s) => s.isCollected);

  return (
    <div className="explore-map">
      <MapContainer
        center={EAST_VILLAGE_CENTER}
        zoom={16}
        scrollWheelZoom={false}
        className="explore-map__leaflet"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {businesses.map((business) => {
          const collected = isCollected(business.id);
          const selected = business.id === selectedId;
          return (
            <Marker
              key={business.id}
              position={[business.mapPosition.lat, business.mapPosition.lng]}
              icon={markerIcon(CATEGORY_INITIAL[business.categoryGroup] ?? "•", collected, selected)}
              eventHandlers={{ click: () => onSelect(business.id) }}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}
