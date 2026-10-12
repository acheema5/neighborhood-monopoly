import { useState } from "react";
import { events } from "../data/events";
import { EventCard } from "../components/EventCard";

const CATEGORIES = ["All", "Music", "Food", "Arts", "Markets"] as const;

export function EventsPage() {
  const [category, setCategory] = useState<typeof CATEGORIES[number]>("All");
  const filtered = events.filter((e) => category === "All" || e.category === category);

  return (
    <div className="events-page">
      <h1>Events</h1>

      <div className="events-page__chips">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className={c === category ? "chip chip--active" : "chip"}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="events-page__list">
        {filtered.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
