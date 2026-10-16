import { Link, useParams } from "react-router-dom";
import { useBusiness } from "../hooks/useBusinesses";
import { useAppStore } from "../store/useAppStore";
import {
  ArrowLeftIcon,
  ChartIcon,
  ChevronRightIcon,
  ListIcon,
  StorefrontIcon,
  TagIcon,
  TicketIcon,
} from "../components/icons";

const SECTIONS = [
  { to: "profile", label: "Business profile", description: "Name, category, address, description", Icon: StorefrontIcon },
  { to: "menu", label: "Menu", description: "Add, edit, or remove items", Icon: ListIcon },
  { to: "offers", label: "Offers", description: "Configure your reward", Icon: TagIcon },
  { to: "redemptions", label: "Redemptions", description: "Confirm resident reward requests", Icon: TicketIcon },
  { to: "reports", label: "Reports", description: "Check-ins and activity", Icon: ChartIcon },
] as const;

export function MerchantOverviewPage() {
  const { businessId } = useParams();
  const business = useBusiness(businessId);

  const isCollected = useAppStore((s) => (business ? s.isCollected(business.id) : false));
  const isPending = useAppStore((s) =>
    business ? s.pendingRedemptionBusinessIds.includes(business.id) : false,
  );
  const visitCount = useAppStore((s) =>
    business ? s.visitLog.filter((v) => v.businessId === business.id).length : 0,
  );

  if (!business) {
    return <p>Business not found.</p>;
  }

  return (
    <div className="merchant-page">
      <Link to="/merchant/claim" className="merchant-dashboard__switch">
        <ArrowLeftIcon /> Switch business
      </Link>

      <h1 className="merchant-page__business-name">{business.name}</h1>
      <p className="business-detail__meta">
        {business.category} · {business.address}
      </p>

      <div className="stat-row">
        <div className="stat-row__item">
          <strong>{visitCount}</strong>
          <span>Check-ins</span>
        </div>
        <div className="stat-row__item">
          <strong>{isCollected ? "Yes" : "No"}</strong>
          <span>Collected</span>
        </div>
        <div className="stat-row__item">
          <strong>{isPending ? 1 : 0}</strong>
          <span>Pending</span>
        </div>
      </div>

      <h2>Manage</h2>
      <ul className="settings-list">
        {SECTIONS.map(({ to, label, description, Icon }) => (
          <li key={to}>
            <Link to={to} className="merchant-overview-row">
              <span className="merchant-overview-row__icon">
                <Icon />
              </span>
              <span className="merchant-overview-row__body">
                <strong>{label}</strong>
                <span>{description}</span>
              </span>
              {to === "redemptions" && isPending && <span className="merchant-overview-row__badge">1</span>}
              <ChevronRightIcon className="preview-card__chevron" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
