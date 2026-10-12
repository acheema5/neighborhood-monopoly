import { Link } from "react-router-dom";
import type { Business } from "../data/types";
import { useAppStore } from "../store/useAppStore";
import { PlaceholderImage } from "./PlaceholderImage";

export function BusinessCard({ business }: { business: Business }) {
  const isCollected = useAppStore((s) => s.isCollected(business.id));

  return (
    <Link
      to={`/business/${business.id}`}
      className={`business-card${isCollected ? " business-card--collected" : ""}`}
    >
      <div className="business-card__image-wrap">
        <PlaceholderImage category={business.category} className="business-card__image" />
        {isCollected && <span className="business-card__stamp">✓</span>}
      </div>
      <div className="business-card__body">
        <div className="business-card__top">
          <span className="business-card__category">{business.category}</span>
        </div>
        <h3 className="business-card__name">{business.name}</h3>
        <p className="business-card__distance">{business.distanceLabel}</p>
      </div>
    </Link>
  );
}
