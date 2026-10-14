import { Link } from "react-router-dom";
import { useBusinesses } from "../hooks/useBusinesses";
import { PlaceholderImage } from "../components/PlaceholderImage";
import { ChevronRightIcon } from "../components/icons";

export function MerchantPage() {
  const businesses = useBusinesses();

  return (
    <div className="merchant-page">
      <h1>Merchant</h1>

      <h2>Select your business</h2>
      <ul className="merchant-picker-list">
        {businesses.map((business) => (
          <li key={business.id}>
            <Link to={`/merchant/${business.id}`} className="merchant-picker-row">
              <PlaceholderImage category={business.categoryGroup} className="merchant-picker-row__image" />
              <div className="merchant-picker-row__body">
                <span className="business-card__category">{business.category}</span>
                <strong>{business.name}</strong>
                <span className="merchant-picker-row__address">{business.address}</span>
              </div>
              <ChevronRightIcon className="preview-card__chevron" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
