import { create } from "zustand";
import { businesses } from "../data/businesses";
import { badges } from "../data/badges";
import { playerSeed } from "../data/player";

interface AppState {
  pointsBalance: number;
  collectedBusinessIds: string[];
  completedTaskIdsByBusiness: Record<string, string[]>;
  earnedBadgeIds: string[];
  redeemedRewardBusinessIds: string[];
  savedEventIds: string[];

  completeTask: (businessId: string, taskId: string) => void;
  isTaskCompleted: (businessId: string, taskId: string) => boolean;
  canCollect: (businessId: string) => boolean;
  collectBusiness: (businessId: string) => void;
  isCollected: (businessId: string) => boolean;
  toggleSavedEvent: (eventId: string) => void;
  canRedeem: (businessId: string) => boolean;
  redeemReward: (businessId: string) => void;
  resetDemo: () => void;
}

function buildInitialState() {
  const collectedBusinessIds = [...playerSeed.initialCollectedBusinessIds];
  const completedTaskIdsByBusiness: Record<string, string[]> = {};
  for (const id of collectedBusinessIds) {
    const business = businesses.find((b) => b.id === id);
    if (business) {
      completedTaskIdsByBusiness[id] = business.tasks.map((t) => t.id);
    }
  }
  const earnedBadgeIds = evaluateGlobalBadges({
    collectedBusinessIds,
    earnedBadgeIds: [...playerSeed.badgeIds],
  });

  return {
    pointsBalance: playerSeed.startingPoints,
    collectedBusinessIds,
    completedTaskIdsByBusiness,
    earnedBadgeIds,
    redeemedRewardBusinessIds: [] as string[],
    savedEventIds: [] as string[],
  };
}

function evaluateGlobalBadges(state: {
  collectedBusinessIds: string[];
  earnedBadgeIds: string[];
}): string[] {
  const earned = new Set(state.earnedBadgeIds);
  const collected = businesses.filter((b) => state.collectedBusinessIds.includes(b.id));

  if (collected.length >= 3) earned.add("block-explorer");
  if (collected.length === businesses.length) earned.add("local-legend");

  const hasBookstore = collected.some((b) => b.category === "Books");
  const musicCount = collected.filter((b) => b.category === "Music").length;
  if (hasBookstore && musicCount >= 2) earned.add("culture-collector");

  for (const business of collected) {
    earned.add(business.badgeId);
  }

  return badges.filter((b) => earned.has(b.id)).map((b) => b.id);
}

export const useAppStore = create<AppState>((set, get) => ({
  ...buildInitialState(),

  completeTask: (businessId, taskId) => {
    const business = businesses.find((b) => b.id === businessId);
    const task = business?.tasks.find((t) => t.id === taskId);
    if (!business || !task) return;

    const existing = get().completedTaskIdsByBusiness[businessId] ?? [];
    if (existing.includes(taskId)) return;

    set({
      completedTaskIdsByBusiness: {
        ...get().completedTaskIdsByBusiness,
        [businessId]: [...existing, taskId],
      },
      pointsBalance: get().pointsBalance + task.points,
    });
  },

  isTaskCompleted: (businessId, taskId) => {
    return (get().completedTaskIdsByBusiness[businessId] ?? []).includes(taskId);
  },

  canCollect: (businessId) => {
    const business = businesses.find((b) => b.id === businessId);
    if (!business) return false;
    const completed = get().completedTaskIdsByBusiness[businessId] ?? [];
    return business.tasks.every((t) => completed.includes(t.id));
  },

  collectBusiness: (businessId) => {
    if (get().collectedBusinessIds.includes(businessId)) return;
    if (!get().canCollect(businessId)) return;

    const business = businesses.find((b) => b.id === businessId);
    if (!business) return;

    const collectedBusinessIds = [...get().collectedBusinessIds, businessId];
    const pointsBalance = get().pointsBalance + business.unlockPointsBonus;
    const earnedBadgeIds = evaluateGlobalBadges({
      collectedBusinessIds,
      earnedBadgeIds: get().earnedBadgeIds,
    });

    set({ collectedBusinessIds, pointsBalance, earnedBadgeIds });
  },

  isCollected: (businessId) => get().collectedBusinessIds.includes(businessId),

  toggleSavedEvent: (eventId) => {
    const current = get().savedEventIds;
    const savedEventIds = current.includes(eventId)
      ? current.filter((id) => id !== eventId)
      : [...current, eventId];
    set({ savedEventIds });
  },

  canRedeem: (businessId) => {
    const business = businesses.find((b) => b.id === businessId);
    if (!business) return false;
    if (!get().isCollected(businessId)) return false;
    if (get().redeemedRewardBusinessIds.includes(businessId)) return false;
    if (business.reward.instant) return true;
    return get().pointsBalance >= business.reward.pointsCost;
  },

  redeemReward: (businessId) => {
    const business = businesses.find((b) => b.id === businessId);
    if (!business || !get().canRedeem(businessId)) return;

    set({
      pointsBalance: business.reward.instant
        ? get().pointsBalance
        : get().pointsBalance - business.reward.pointsCost,
      redeemedRewardBusinessIds: [...get().redeemedRewardBusinessIds, businessId],
    });
  },

  resetDemo: () => set({ ...buildInitialState() }),
}));
