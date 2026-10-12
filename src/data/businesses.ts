import type { Business } from "./types";
import seed from "./eastVillageSeed.json";
import { businessCoordinates } from "./coordinates";
import { CATEGORY_GROUP_BY_RAW_CATEGORY } from "./categoryGroups";
import { slugify } from "./slug";

export const businesses: Business[] = seed.businesses.map((b): Business => ({
  id: b.id,
  name: b.name,
  category: b.category,
  categoryGroup: CATEGORY_GROUP_BY_RAW_CATEGORY[b.category] ?? "Food & Drink",
  address: b.address,
  description: b.description,
  dataStatus: b.dataStatus,
  mapPosition: businessCoordinates[b.id],
  catalogLabel: b.catalogLabel,
  catalog: b.catalog as Business["catalog"],
  tasks: b.collection.requiredTasks as Business["tasks"],
  unlockPointsBonus: b.collection.unlockPointsBonus,
  badgeId: slugify(b.collection.badge),
  badgeTitle: b.collection.badge,
  reward: b.reward as Business["reward"],
}));
