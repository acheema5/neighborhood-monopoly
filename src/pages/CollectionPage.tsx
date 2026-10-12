import { useState } from "react";
import { businesses } from "../data/businesses";
import { neighborhood } from "../data/neighborhood";
import { useAppStore } from "../store/useAppStore";
import { BusinessCard } from "../components/BusinessCard";

const CATEGORIES = ["All", "Food & Drink", "Shopping", "Arts", "Services"] as const;

export function CollectionPage() {
  const [category, setCategory] = useState<typeof CATEGORIES[number]>("All");
  const collectedCount = useAppStore((s) => s.collectedBusinessIds.length);

  const filtered = businesses.filter((b) => category === "All" || b.category === category);

  return (
    <div className="collection-page">
      <h1>Collection</h1>
      <p>
        {collectedCount} / {businesses.length} properties collected in {neighborhood.name}
      </p>

      <div className="collection-page__chips">
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

      <div className="collection-page__grid">
        {filtered.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
    </div>
  );
}
