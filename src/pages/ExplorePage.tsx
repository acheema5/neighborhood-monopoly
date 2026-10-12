import { useMemo, useState } from "react";
import { businesses } from "../data/businesses";
import { neighborhood } from "../data/neighborhood";
import { useAppStore } from "../store/useAppStore";
import { ExploreMap } from "../components/ExploreMap";
import { BusinessPreviewCard } from "../components/BusinessPreviewCard";
import { BookIcon, SearchIcon, UtensilsIcon, BagIcon } from "../components/icons";
import type { CategoryGroup } from "../data/types";

const CATEGORIES: Array<{ label: "All" | CategoryGroup; Icon?: typeof BookIcon }> = [
  { label: "All" },
  { label: "Food & Drink", Icon: UtensilsIcon },
  { label: "Culture", Icon: BookIcon },
  { label: "Fashion", Icon: BagIcon },
];

export function ExplorePage() {
  const [category, setCategory] = useState<"All" | CategoryGroup>("All");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const collectedCount = useAppStore((s) => s.collectedBusinessIds.length);

  const filtered = useMemo(() => {
    return businesses.filter((b) => {
      const matchesCategory = category === "All" || b.categoryGroup === category;
      const matchesQuery = b.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const selected = businesses.find((b) => b.id === selectedId) ?? null;

  return (
    <div className="explore-page">
      <h1>{neighborhood.name}</h1>
      <p className="explore-page__progress">
        {collectedCount} / {businesses.length} places collected
      </p>
      <p className="demo-disclaimer">
        Unofficial school demo · real businesses, fictional rewards &amp; pricing
      </p>

      <div className="explore-page__search-wrap">
        <SearchIcon />
        <input
          type="search"
          className="explore-page__search"
          placeholder="Search businesses"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="explore-page__chips">
        {CATEGORIES.map(({ label, Icon }) => (
          <button
            key={label}
            type="button"
            className={label === category ? "chip chip--active" : "chip"}
            onClick={() => setCategory(label)}
          >
            {Icon && <Icon />}
            {label}
          </button>
        ))}
      </div>

      <ExploreMap businesses={filtered} selectedId={selectedId} onSelect={setSelectedId} />

      {selected && <BusinessPreviewCard business={selected} />}
    </div>
  );
}
