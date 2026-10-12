import type { PlayerSeed } from "./types";
import seed from "./eastVillageSeed.json";
import { slugify } from "./slug";

export const playerSeed: PlayerSeed = {
  name: seed.player.name,
  level: seed.player.level,
  startingPoints: seed.player.startingPoints,
  streakDays: seed.player.streakDays,
  initialCollectedBusinessIds: seed.player.initialCollectedBusinessIds,
  badgeIds: seed.player.badges.map(slugify),
  collectibleGoal: seed.player.collectibleGoal,
};
