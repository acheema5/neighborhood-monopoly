import { NavLink } from "react-router-dom";
import { CalendarIcon, CompassIcon, GridIcon, UserIcon } from "./icons";

const TABS = [
  { to: "/", label: "Explore", Icon: CompassIcon },
  { to: "/collection", label: "Collection", Icon: GridIcon },
  { to: "/events", label: "Events", Icon: CalendarIcon },
  { to: "/profile", label: "Profile", Icon: UserIcon },
];

export function BottomNav() {
  return (
    <nav className="bottom-nav">
      {TABS.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) => `bottom-nav__item${isActive ? " bottom-nav__item--active" : ""}`}
        >
          <Icon />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
