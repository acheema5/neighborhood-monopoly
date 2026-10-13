import { Link } from "react-router-dom";
import { businesses } from "../data/businesses";
import { PlaceholderImage } from "../components/PlaceholderImage";
import { ChevronRightIcon } from "../components/icons";

export function MerchantPage() {
  return (
    <div className="merchant-page">
      <h1>Merchant</h1>
      <p className="demo-disclaimer">
        Simulated merchant login — select your business to manage its menu, offers, and
        redemptions. Nothing here is wired to real business accounts or data.
      </p>

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
