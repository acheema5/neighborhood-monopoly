import { Link } from "react-router-dom";
import type { NeighborhoodEvent } from "../data/types";
import { useBusinesses } from "../hooks/useBusinesses";
import { useAppStore } from "../store/useAppStore";
import { PlaceholderImage } from "./PlaceholderImage";
import { CheckIcon } from "./icons";

export function EventCard({ event }: { event: NeighborhoodEvent }) {
  const isSaved = useAppStore((s) => s.savedEventIds.includes(event.id));
  const toggleSavedEvent = useAppStore((s) => s.toggleSavedEvent);
  const businesses = useBusinesses();
  const isCollected = useAppStore((s) => s.isCollected);

  const participants = businesses.filter((b) => event.participatingBusinessIds.includes(b.id));
  const collectedCount = participants.filter((p) => isCollected(p.id)).length;
  const complete = collectedCount === participants.length && participants.length > 0;

  return (
    <div className="event-card">
      <div className="event-card__image-wrap">
        <PlaceholderImage
          categoryGroup={participants[0]?.categoryGroup ?? "Food & Drink"}
          rawCategory={participants[0]?.category}
          className="event-card__image"
          alt={`${event.title} category icon`}
        />
        {complete && (
          <span className="event-card__complete">
            <CheckIcon /> Route complete
          </span>
        )}
      </div>
      <div className="event-card__body">
        <h3>{event.title}</h3>
        <p className="event-card__meta">
          {event.dateTimeLabel} · {event.location}
        </p>
        <p>{event.description}</p>

        <ul className="event-card__participants">
          {participants.map((p) => (
            <li key={p.id}>
              <Link to={`/app/business/${p.id}`} className={isCollected(p.id) ? "event-card__stop event-card__stop--collected" : "event-card__stop"}>
                {isCollected(p.id) && <CheckIcon />}
                {p.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="event-card__footer">
          <span className="event-card__progress">
            {collectedCount} / {participants.length} collected
          </span>
          <button
            type="button"
            className={isSaved ? "event-card__interest event-card__interest--active" : "event-card__interest"}
            onClick={() => toggleSavedEvent(event.id)}
          >
            {isSaved ? "Interested ✓" : "Mark Interested"}
          </button>
        </div>
      </div>
    </div>
  );
}
