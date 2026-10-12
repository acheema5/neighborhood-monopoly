import { create } from "zustand";
import { businesses } from "../data/businesses";
import { badges } from "../data/badges";
import { POINTS_PER_PROPERTY } from "../data/constants";

interface AppState {
  collectedBusinessIds: string[];
  completedTaskIdsByBusiness: Record<string, string[]>;
  pointsBalance: number;
  earnedBadgeIds: string[];
  redeemedCouponIds: string[];
  savedEventIds: string[];

  completeTask: (businessId: string, taskId: string) => void;
  isTaskCompleted: (businessId: string, taskId: string) => boolean;
  canCollect: (businessId: string) => boolean;
  collectBusiness: (businessId: string) => void;
  isCollected: (businessId: string) => boolean;
  toggleSavedEvent: (eventId: string) => void;
  redeemCoupon: (businessId: string) => void;
  resetDemo: () => void;
}

const initialState = {
  collectedBusinessIds: [] as string[],
  completedTaskIdsByBusiness: {} as Record<string, string[]>,
  pointsBalance: 0,
  earnedBadgeIds: [] as string[],
  redeemedCouponIds: [] as string[],
  savedEventIds: [] as string[],
};

function evaluateBadges(state: {
  collectedBusinessIds: string[];
  savedEventIds: string[];
  earnedBadgeIds: string[];
}): string[] {
  const earned = new Set(state.earnedBadgeIds);

  const collectedBusinesses = businesses.filter((b) =>
    state.collectedBusinessIds.includes(b.id),
  );

  if (collectedBusinesses.some((b) => b.category === "Food & Drink")) {
    earned.add("coffee-explorer");
  }
  if (state.collectedBusinessIds.length >= 5) {
    earned.add("neighborhood-collector");
  }
  if (state.collectedBusinessIds.length === businesses.length) {
    earned.add("full-set");
  }
  if (state.savedEventIds.length >= 1) {
    earned.add("event-goer");
  }

  return badges.filter((b) => earned.has(b.id)).map((b) => b.id);
}

export const useAppStore = create<AppState>((set, get) => ({
  ...initialState,

  completeTask: (businessId, taskId) => {
    const existing = get().completedTaskIdsByBusiness[businessId] ?? [];
    if (existing.includes(taskId)) return;
    set({
      completedTaskIdsByBusiness: {
        ...get().completedTaskIdsByBusiness,
        [businessId]: [...existing, taskId],
      },
    });
  },

  isTaskCompleted: (businessId, taskId) => {
    return (get().completedTaskIdsByBusiness[businessId] ?? []).includes(taskId);
  },

  canCollect: (businessId) => {
    const business = businesses.find((b) => b.id === businessId);
    if (!business) return false;
    const completed = get().completedTaskIdsByBusiness[businessId] ?? [];
    return business.tasks
      .filter((t) => t.required)
      .every((t) => completed.includes(t.id));
  },

  collectBusiness: (businessId) => {
    if (get().collectedBusinessIds.includes(businessId)) return;
    if (!get().canCollect(businessId)) return;

    const business = businesses.find((b) => b.id === businessId);
    if (!business) return;

    const collectedBusinessIds = [...get().collectedBusinessIds, businessId];
    const pointsBalance = get().pointsBalance + business.pointsReward;
    const earnedBadgeIds = evaluateBadges({
      collectedBusinessIds,
      savedEventIds: get().savedEventIds,
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
    const earnedBadgeIds = evaluateBadges({
      collectedBusinessIds: get().collectedBusinessIds,
      savedEventIds,
      earnedBadgeIds: get().earnedBadgeIds,
    });
    set({ savedEventIds, earnedBadgeIds });
  },

  redeemCoupon: (businessId) => {
    const current = get().redeemedCouponIds;
    if (current.includes(businessId)) return;
    set({ redeemedCouponIds: [...current, businessId] });
  },

  resetDemo: () => set({ ...initialState }),
}));

export const POINTS_PER_PROPERTY_RULE = POINTS_PER_PROPERTY;
