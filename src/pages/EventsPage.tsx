import { events } from "../data/events";
import { EventCard } from "../components/EventCard";

export function EventsPage() {
  return (
    <div className="events-page">
      <h1>Events</h1>

      <div className="events-page__list">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
