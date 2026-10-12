import type { Badge } from "./types";
import { businesses } from "./businesses";
import { slugify } from "./slug";

const businessBadges: Badge[] = businesses.map((b) => ({
  id: b.badgeId,
  title: b.badgeTitle,
  description: `Collect ${b.name} to earn this badge.`,
  type: "collection",
  associatedBusinessId: b.id,
}));

const milestoneBadges: Badge[] = [
  {
    id: slugify("First Steps"),
    title: "First Steps",
    description: "Awarded for starting your East Village journey (demo starter badge).",
    type: "milestone",
  },
  {
    id: slugify("Block Explorer"),
    title: "Block Explorer",
    description: "Unlock any 3 properties.",
    type: "milestone",
  },
  {
    id: slugify("Local Legend"),
    title: "Local Legend",
    description: "Unlock all 10 properties.",
    type: "milestone",
  },
  {
    id: slugify("Culture Collector"),
    title: "Culture Collector",
    description: "Unlock one bookstore and two record stores.",
    type: "milestone",
  },
];

export const badges: Badge[] = [...businessBadges, ...milestoneBadges];
