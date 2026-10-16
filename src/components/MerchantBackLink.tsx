import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "./icons";

interface MerchantBackLinkProps {
  businessId: string;
  businessName: string;
  variant?: "link" | "button";
}

export function MerchantBackLink({ businessId, businessName, variant = "link" }: MerchantBackLinkProps) {
  if (variant === "button") {
    return (
      <Link to={`/merchant/${businessId}`} className="business-detail__cta business-detail__cta--secondary">
        <ArrowLeftIcon /> Back to manage {businessName}
      </Link>
    );
  }

  return (
    <Link to={`/merchant/${businessId}`} className="merchant-dashboard__switch">
      <ArrowLeftIcon /> Back to {businessName}
    </Link>
  );
}
