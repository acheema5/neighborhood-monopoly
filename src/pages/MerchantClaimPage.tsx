import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBusinesses } from "../hooks/useBusinesses";
import { PlaceholderImage } from "../components/PlaceholderImage";
import { ArrowLeftIcon, SearchIcon } from "../components/icons";

export function MerchantClaimPage() {
  const navigate = useNavigate();
  const businesses = useBusinesses();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return businesses;
    return businesses.filter(
      (b) => b.name.toLowerCase().includes(q) || b.address.toLowerCase().includes(q),
    );
  }, [businesses, query]);

  return (
    <div className="merchant-page">
      <Link to="/merchant" className="merchant-dashboard__switch">
        <ArrowLeftIcon /> Change neighborhood
      </Link>

      <h1>Claim your business</h1>
      <p>Search by business name or address to claim your listing.</p>

      <div className="explore-page__search-wrap">
        <SearchIcon />
        <input
          type="search"
          className="explore-page__search"
          placeholder="Search by name or address"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <ul className="merchant-picker-list">
        {results.length === 0 && <li className="merchant-page__empty">No matching businesses found.</li>}
        {results.map((business) => (
          <li key={business.id}>
            <div className="merchant-picker-row">
              <PlaceholderImage
                categoryGroup={business.categoryGroup}
                rawCategory={business.category}
                className="merchant-picker-row__image"
                alt={`${business.name} category icon`}
              />
              <div className="merchant-picker-row__body">
                <span className="business-card__category">{business.category}</span>
                <strong>{business.name}</strong>
                <span className="merchant-picker-row__address">{business.address}</span>
              </div>
              <button type="button" onClick={() => navigate(`/merchant/${business.id}`)}>
                Claim this listing
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
