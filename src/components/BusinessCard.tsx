import { Link } from "react-router-dom";
import type { Business } from "../data/types";
import { useAppStore } from "../store/useAppStore";

export function BusinessCard({ business }: { business: Business }) {
  const isCollected = useAppStore((s) => s.isCollected(business.id));

  return (
    <Link to={`/business/${business.id}`} className="business-card">
      <div className="business-card__image" aria-hidden />
      <div className="business-card__body">
        <div className="business-card__top">
          <span className="business-card__category">{business.category}</span>
          <span className={`business-card__status${isCollected ? " business-card__status--collected" : ""}`}>
            {isCollected ? "Collected" : "Not collected"}
          </span>
        </div>
        <h3 className="business-card__name">{business.name}</h3>
        <p className="business-card__distance">{business.distanceLabel}</p>
      </div>
    </Link>
  );
}
