import { useNavigate } from "react-router-dom";
import { neighborhood } from "../data/neighborhood";
import { MapPinIcon, ChevronRightIcon } from "../components/icons";

export function MerchantNeighborhoodPage() {
  const navigate = useNavigate();

  return (
    <div className="merchant-page">
      <h1>Select a neighborhood</h1>
      <p>Choose where your business is located to get started.</p>

      <ul className="merchant-neighborhood-list">
        <li>
          <button
            type="button"
            className="merchant-neighborhood-row"
            onClick={() => navigate("/merchant/claim")}
          >
            <span className="merchant-neighborhood-row__icon">
              <MapPinIcon />
            </span>
            <div className="merchant-neighborhood-row__body">
              <strong>{neighborhood.name}</strong>
              <span>{neighborhood.city}</span>
              <span className="merchant-neighborhood-row__area">{neighborhood.demoArea}</span>
            </div>
            <ChevronRightIcon className="preview-card__chevron" />
          </button>
        </li>
        <li className="merchant-neighborhood-row merchant-neighborhood-row--disabled">
          <span className="merchant-neighborhood-row__icon">
            <MapPinIcon />
          </span>
          <div className="merchant-neighborhood-row__body">
            <strong>More neighborhoods</strong>
            <span>Coming after the East Village pilot</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
