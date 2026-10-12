import { Link } from "react-router-dom";
import type { Business } from "../data/types";
import { useAppStore } from "../store/useAppStore";
import { PlaceholderImage } from "./PlaceholderImage";
import { ChevronRightIcon } from "./icons";

export function BusinessPreviewCard({ business }: { business: Business }) {
  const isCollected = useAppStore((s) => s.isCollected(business.id));

  return (
    <Link to={`/business/${business.id}`} className="preview-card">
      <PlaceholderImage category={business.categoryGroup} className="preview-card__image" />
      <div className="preview-card__body">
        <span className="preview-card__category">{business.category}</span>
        <h3 className="preview-card__name">{business.name}</h3>
        <span className={`status-pill${isCollected ? " status-pill--collected" : ""}`}>
          {isCollected ? "Collected" : "Not collected"}
        </span>
      </div>
      <ChevronRightIcon className="preview-card__chevron" />
    </Link>
  );
}
