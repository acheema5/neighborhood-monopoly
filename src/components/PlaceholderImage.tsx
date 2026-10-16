import { CATEGORY_ICON_BY_RAW_CATEGORY, StorefrontIcon } from "./icons";
import type { CategoryGroup } from "../data/types";

interface PlaceholderImageProps {
  categoryGroup: CategoryGroup;
  rawCategory?: string;
  className?: string;
  alt?: string;
}

export function PlaceholderImage({ categoryGroup, rawCategory, className, alt }: PlaceholderImageProps) {
  const Icon = rawCategory ? (CATEGORY_ICON_BY_RAW_CATEGORY[rawCategory] ?? StorefrontIcon) : StorefrontIcon;

  return (
    <div
      className={`placeholder-image${className ? ` ${className}` : ""}`}
      data-category={categoryGroup}
      role={alt ? "img" : "presentation"}
      aria-label={alt}
      aria-hidden={alt ? undefined : true}
    >
      <Icon className="placeholder-image__icon" />
    </div>
  );
}
