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
      <PlaceholderImage category={business.categoryGroup} className="business-card__image" />
      <div className="business-card__body">
        <span className="business-card__category">{business.category}</span>
        <h3 className="business-card__name">{business.name}</h3>
        <p className="business-card__distance">{business.address}</p>
        <span className={`status-pill${isCollected ? " status-pill--collected" : ""}`}>
          {isCollected ? "Collected" : "Not collected"}
        </span>
      </div>
    </Link>
  );
}
