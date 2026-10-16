import { NavLink } from "react-router-dom";
import { CalendarIcon, CompassIcon, StackIcon, UserIcon } from "./icons";

const TABS = [
  { to: "/app", label: "Explore", Icon: CompassIcon },
  { to: "/app/collection", label: "Collection", Icon: StackIcon },
  { to: "/app/events", label: "Events", Icon: CalendarIcon },
  { to: "/app/profile", label: "Profile", Icon: UserIcon },
];

export function BottomNav() {
  return (
    <nav className="bottom-nav">
      {TABS.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/app"}
          className={({ isActive }) => `bottom-nav__item${isActive ? " bottom-nav__item--active" : ""}`}
        >
          <Icon />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
