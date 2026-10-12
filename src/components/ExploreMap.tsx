import type { Business } from "../data/types";
import { useAppStore } from "../store/useAppStore";

interface ExploreMapProps {
  businesses: Business[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const CATEGORY_INITIAL: Record<string, string> = {
  "Food & Drink": "F",
  Shopping: "S",
  Arts: "A",
  Services: "V",
};

export function ExploreMap({ businesses, selectedId, onSelect }: ExploreMapProps) {
  const isCollected = useAppStore((s) => s.isCollected);

  return (
    <div className="explore-map">
      <svg
        className="explore-map__surface"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect x="0" y="0" width="100" height="100" fill="var(--map-water)" />
        <rect x="8" y="6" width="84" height="88" rx="6" fill="var(--map-land)" />
        <rect x="8" y="24" width="84" height="2" fill="var(--map-street)" />
        <rect x="8" y="52" width="84" height="2" fill="var(--map-street)" />
        <rect x="8" y="76" width="84" height="2" fill="var(--map-street)" />
        <rect x="33" y="6" width="2" height="88" fill="var(--map-street)" />
        <rect x="64" y="6" width="2" height="88" fill="var(--map-street)" />
      </svg>

      {businesses.map((business) => {
        const collected = isCollected(business.id);
        const selected = business.id === selectedId;
        return (
          <button
            key={business.id}
            type="button"
            className={`business-marker${collected ? " business-marker--collected" : ""}${selected ? " business-marker--selected" : ""}`}
            style={{ left: `${business.mapPosition.x}%`, top: `${business.mapPosition.y}%` }}
            onClick={() => onSelect(business.id)}
            aria-label={business.name}
          >
            {CATEGORY_INITIAL[business.category] ?? "•"}
          </button>
        );
      })}
    </div>
  );
}
