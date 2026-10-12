import type { NeighborhoodEvent } from "../data/types";
import { businesses } from "../data/businesses";
import { useAppStore } from "../store/useAppStore";
import { PlaceholderImage } from "./PlaceholderImage";

export function EventCard({ event }: { event: NeighborhoodEvent }) {
  const isSaved = useAppStore((s) => s.savedEventIds.includes(event.id));
  const toggleSavedEvent = useAppStore((s) => s.toggleSavedEvent);

  const participants = businesses.filter((b) => event.participatingBusinessIds.includes(b.id));

  return (
    <div className="event-card">
      <PlaceholderImage category={participants[0]?.categoryGroup ?? "Food & Drink"} className="event-card__image" />
      <div className="event-card__body">
        <h3>{event.title}</h3>
        <p>{event.dateTimeLabel}</p>
        <p>{event.location}</p>
        <p>{event.description}</p>
        <p className="event-card__participants">
          Featuring: {participants.map((p) => p.name).join(", ")}
        </p>
        <p className="demo-disclaimer">Demo event — not a confirmed real-world gathering.</p>
        <button type="button" onClick={() => toggleSavedEvent(event.id)}>
          {isSaved ? "Interested ✓" : "Mark Interested"}
        </button>
      </div>
    </div>
  );
}
