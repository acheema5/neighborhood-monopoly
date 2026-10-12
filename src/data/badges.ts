import type { Badge } from "./types";

export const badges: Badge[] = [
  {
    id: "coffee-explorer",
    title: "Coffee Explorer",
    description: "Collect your first Food & Drink property.",
    type: "collection",
    associatedBusinessId: "island-coffee-collective",
    unlockRule: "Collect any Food & Drink business",
  },
  {
    id: "neighborhood-collector",
    title: "Neighborhood Collector",
    description: "Collect 5 properties in Roosevelt Island.",
    type: "milestone",
    unlockRule: "collectedBusinessIds.length >= 5",
  },
  {
    id: "full-set",
    title: "Island Completionist",
    description: "Collect every property in Roosevelt Island.",
    type: "milestone",
    unlockRule: "collectedBusinessIds.length === businesses.length",
  },
  {
    id: "event-goer",
    title: "Event Goer",
    description: "Mark interest in a neighborhood event.",
    type: "event",
    unlockRule: "savedEventIds.length >= 1",
  },
];
