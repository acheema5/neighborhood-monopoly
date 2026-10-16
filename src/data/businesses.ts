import type { Business } from "./types";
import seed from "./eastVillageSeed.json";
import { businessCoordinates } from "./coordinates";
import { CATEGORY_GROUP_BY_RAW_CATEGORY } from "./categoryGroups";
import { slugify } from "./slug";

export const businesses: Business[] = seed.businesses.map((b): Business => {
  const allTasks = b.collection.requiredTasks as Business["bonusTasks"];
  const checkInTask = allTasks.find((t) => t.type === "simulated_qr") ?? allTasks[allTasks.length - 1];
  const bonusTasks = allTasks.filter((t) => t.id !== checkInTask.id);

  return {
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
    checkInTask,
    bonusTasks,
    unlockPointsBonus: b.collection.unlockPointsBonus,
    badgeId: slugify(b.collection.badge),
    badgeTitle: b.collection.badge,
    reward: { enabled: true, ...(b.reward as Business["reward"]) },
  };
});
