import { Link } from "react-router-dom";
import type { Business } from "../data/types";
import { useAppStore } from "../store/useAppStore";
import { PlaceholderImage } from "./PlaceholderImage";

export function BusinessPreviewCard({ business }: { business: Business }) {
  const isCollected = useAppStore((s) => s.isCollected(business.id));

  return (
    <Link to={`/business/${business.id}`} className="preview-card">
      <PlaceholderImage category={business.categoryGroup} className="preview-card__image" />
      <div className="preview-card__body">
        <div className="preview-card__top">
          <span className="preview-card__category">{business.category}</span>
        </div>
        <h3 className="preview-card__name">{business.name}</h3>
        <p className="preview-card__status">
          {isCollected ? "Collected" : `Tap to view details · earn ${business.badgeTitle}`}
        </p>
      </div>
    </Link>
  );
}
