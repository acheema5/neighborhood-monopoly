import { NavLink } from "react-router-dom";

const TABS = [
  { to: "/", label: "Explore" },
  { to: "/collection", label: "Collection" },
  { to: "/events", label: "Events" },
  { to: "/rewards", label: "Rewards" },
  { to: "/profile", label: "Profile" },
];

export function BottomNav() {
  return (
    <nav className="bottom-nav">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === "/"}
          className={({ isActive }) => `bottom-nav__item${isActive ? " bottom-nav__item--active" : ""}`}
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
