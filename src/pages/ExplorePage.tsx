import { useMemo, useState } from "react";
import { businesses } from "../data/businesses";
import { neighborhood } from "../data/neighborhood";
import { useAppStore } from "../store/useAppStore";
import { ExploreMap } from "../components/ExploreMap";
import { BusinessPreviewCard } from "../components/BusinessPreviewCard";

const CATEGORIES = ["All", "Food & Drink", "Shopping", "Arts", "Services"] as const;

export function ExplorePage() {
  const [category, setCategory] = useState<typeof CATEGORIES[number]>("All");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const collectedCount = useAppStore((s) => s.collectedBusinessIds.length);

  const filtered = useMemo(() => {
    return businesses.filter((b) => {
      const matchesCategory = category === "All" || b.category === category;
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

      <input
        type="search"
        className="explore-page__search"
        placeholder="Search businesses"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="explore-page__chips">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className={c === category ? "chip chip--active" : "chip"}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <ExploreMap businesses={filtered} selectedId={selectedId} onSelect={setSelectedId} />

      {selected && <BusinessPreviewCard business={selected} />}
    </div>
  );
}
