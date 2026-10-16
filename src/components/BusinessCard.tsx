import { Link } from "react-router-dom";
import type { Business } from "../data/types";
import { useAppStore } from "../store/useAppStore";
import { PlaceholderImage } from "./PlaceholderImage";
import { CheckIcon } from "./icons";

export function BusinessCard({ business, index }: { business: Business; index?: number }) {
  const isCollected = useAppStore((s) => s.isCollected(business.id));

  return (
    <Link
      to={`/app/business/${business.id}`}
      className={`collectible-card${isCollected ? " collectible-card--collected" : ""}`}
    >
      <div className="collectible-card__image-wrap">
        <PlaceholderImage
          categoryGroup={business.categoryGroup}
          rawCategory={business.category}
          className="collectible-card__image"
          alt={`${business.name} category icon`}
        />
        {isCollected && (
          <span className="collectible-card__stamp" aria-label="Collected">
            <CheckIcon />
          </span>
        )}
        {typeof index === "number" && (
          <span className="collectible-card__index">{String(index + 1).padStart(2, "0")}</span>
        )}
      </div>
      <div className="collectible-card__body">
        <span className="collectible-card__category">{business.category}</span>
        <h3 className="collectible-card__name">{business.name}</h3>
        <span className={`status-pill${isCollected ? " status-pill--collected" : ""}`}>
          {isCollected ? "Collected" : "Not collected"}
        </span>
      </div>
    </Link>
  );
}
