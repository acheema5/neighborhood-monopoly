import { Link } from "react-router-dom";
import type { Business } from "../data/types";
import { useAppStore } from "../store/useAppStore";
import { PlaceholderImage } from "./PlaceholderImage";
import { ChevronRightIcon } from "./icons";

export function BusinessPreviewCard({ business }: { business: Business }) {
  const isCollected = useAppStore((s) => s.isCollected(business.id));
  const reward = useAppStore((s) => s.getEffectiveReward(business.id));

  return (
    <Link to={`/app/business/${business.id}`} className="preview-card">
      <PlaceholderImage
        categoryGroup={business.categoryGroup}
        rawCategory={business.category}
        className="preview-card__image"
        alt={`${business.name} category icon`}
      />
      <div className="preview-card__body">
        <span className="preview-card__category">{business.category}</span>
        <h3 className="preview-card__name">{business.name}</h3>
        <div className="preview-card__row">
          <span className={`status-pill${isCollected ? " status-pill--collected" : ""}`}>
            {isCollected ? "Collected" : "Not collected"}
          </span>
          {reward && <span className="preview-card__reward">{reward.title}</span>}
        </div>
      </div>
      <ChevronRightIcon className="preview-card__chevron" />
    </Link>
  );
}
