import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useBusinesses } from "../hooks/useBusinesses";
import { neighborhood } from "../data/neighborhood";
import { useAppStore } from "../store/useAppStore";
import { ExploreMap } from "../components/ExploreMap";
import { BusinessPreviewCard } from "../components/BusinessPreviewCard";
import { PlaceholderImage } from "../components/PlaceholderImage";
import { ProgressBar } from "../components/ProgressBar";
import { BookIcon, SearchIcon, UtensilsIcon, BagIcon, CheckIcon } from "../components/icons";
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
  const isCollected = useAppStore((s) => s.isCollected);
  const businesses = useBusinesses();

  const filtered = useMemo(() => {
    return businesses.filter((b) => {
      const matchesCategory = category === "All" || b.categoryGroup === category;
      const matchesQuery = b.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [businesses, category, query]);

  const selected = businesses.find((b) => b.id === selectedId) ?? null;

  return (
    <div className="explore-page">
      <header className="explore-page__header">
        <div>
          <h1>{neighborhood.name}</h1>
          <p className="explore-page__progress">
            {collectedCount} / {businesses.length} places collected
          </p>
        </div>
      </header>
      <ProgressBar value={collectedCount} max={businesses.length} />

      <div className="explore-page__search-wrap">
        <SearchIcon />
        <input
          type="search"
          className="explore-page__search"
          placeholder="Search East Village businesses"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search businesses"
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

      <div className="explore-page__map-area">
        <ExploreMap businesses={filtered} selectedId={selectedId} onSelect={setSelectedId} />
        {selected && <BusinessPreviewCard business={selected} />}
      </div>

      <div className="explore-page__nearby">
        <h2>Nearby places</h2>
        <div className="explore-page__nearby-row">
          {filtered.map((business) => {
            const collected = isCollected(business.id);
            return (
              <Link
                key={business.id}
                to={`/app/business/${business.id}`}
                className={`nearby-chip${collected ? " nearby-chip--collected" : ""}${selectedId === business.id ? " nearby-chip--selected" : ""}`}
                onMouseEnter={() => setSelectedId(business.id)}
                onClick={() => setSelectedId(business.id)}
              >
                <PlaceholderImage
                  categoryGroup={business.categoryGroup}
                  rawCategory={business.category}
                  className="nearby-chip__image"
                  alt={`${business.name} category icon`}
                />
                {collected && (
                  <span className="nearby-chip__check">
                    <CheckIcon />
                  </span>
                )}
                <span className="nearby-chip__name">{business.name}</span>
              </Link>
            );
          })}
          {filtered.length === 0 && (
            <p className="explore-page__empty">No businesses match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
