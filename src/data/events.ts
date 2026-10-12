import type { NeighborhoodEvent } from "./types";
import seed from "./eastVillageSeed.json";

export const events: NeighborhoodEvent[] = seed.events.map((e): NeighborhoodEvent => ({
  id: e.id,
  title: e.name,
  dateTimeLabel: e.dateLabel,
  location: e.venue,
  description: e.description,
  participatingBusinessIds: e.participatingBusinessIds,
  mockOnly: true,
}));
