import { useMemo, useState } from "react";
import { businesses } from "../data/businesses";
import { neighborhood } from "../data/neighborhood";
import { useAppStore } from "../store/useAppStore";
import { BusinessCard } from "../components/BusinessCard";

const CATEGORIES = ["All", "Food & Drink", "Shopping", "Arts", "Services"] as const;

export function ExplorePage() {
  const [category, setCategory] = useState<typeof CATEGORIES[number]>("All");
  const [query, setQuery] = useState("");
  const collectedCount = useAppStore((s) => s.collectedBusinessIds.length);

  const filtered = useMemo(() => {
    return businesses.filter((b) => {
      const matchesCategory = category === "All" || b.category === category;
      const matchesQuery = b.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="explore-page">
      <h1>{neighborhood.name}</h1>
      <p>
        {collectedCount} / {businesses.length} places collected
      </p>

      <input
        type="search"
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

      {/* TODO: replace list with stylized vector map + positioned BusinessMarker pins (project.md section 6A) */}
      <div className="explore-page__list">
        {filtered.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
    </div>
  );
}
