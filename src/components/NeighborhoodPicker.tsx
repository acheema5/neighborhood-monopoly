import { neighborhood } from "../data/neighborhood";
import { MapPinIcon, ChevronRightIcon } from "./icons";

export function NeighborhoodPicker({ onSelect }: { onSelect: () => void }) {
  return (
    <ul className="merchant-neighborhood-list">
      <li>
        <button type="button" className="merchant-neighborhood-row" onClick={onSelect}>
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
  );
}
