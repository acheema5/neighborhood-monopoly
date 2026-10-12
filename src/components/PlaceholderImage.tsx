interface PlaceholderImageProps {
  category: string;
  className?: string;
}

export function PlaceholderImage({ category, className }: PlaceholderImageProps) {
  return (
    <div
      className={`placeholder-image${className ? ` ${className}` : ""}`}
      data-category={category}
      aria-hidden="true"
    />
  );
}
