import type { NeighborhoodEvent } from "../data/types";
import { useAppStore } from "../store/useAppStore";
import { PlaceholderImage } from "./PlaceholderImage";

export function EventCard({ event }: { event: NeighborhoodEvent }) {
  const isSaved = useAppStore((s) => s.savedEventIds.includes(event.id));
  const toggleSavedEvent = useAppStore((s) => s.toggleSavedEvent);

  return (
    <div className="event-card">
      <PlaceholderImage category={event.category} className="event-card__image" />
      <div className="event-card__body">
        <span className="event-card__category">{event.category}</span>
        <h3>{event.title}</h3>
        <p>{event.dateTimeLabel}</p>
        <p>{event.location}</p>
        <p>{event.description}</p>
        <button type="button" onClick={() => toggleSavedEvent(event.id)}>
          {isSaved ? "Interested ✓" : "Mark Interested"}
        </button>
      </div>
    </div>
  );
}
