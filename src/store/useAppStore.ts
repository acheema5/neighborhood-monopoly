import { create } from "zustand";
import { persist } from "zustand/middleware";
import { businesses } from "../data/businesses";
import { badges } from "../data/badges";
import { playerSeed } from "../data/player";
import type { BusinessReward, CatalogItem } from "../data/types";

export interface VisitLogEntry {
  businessId: string;
  taskId: string;
  timestamp: number;
}

export interface BusinessProfileOverride {
  name?: string;
  category?: string;
  address?: string;
  description?: string;
}

interface AppState {
  pointsBalance: number;
  collectedBusinessIds: string[];
  completedTaskIdsByBusiness: Record<string, string[]>;
  earnedBadgeIds: string[];
  redeemedRewardBusinessIds: string[];
  pendingRedemptionBusinessIds: string[];
  savedEventIds: string[];
  visitLog: VisitLogEntry[];
  incrementalPurchaseByBusiness: Record<string, boolean>;
  valueFeedbackByBusiness: Record<string, boolean>;
  discoveryViewedBusinessIds: string[];
  profileOverrides: Record<string, BusinessProfileOverride>;
  catalogOverrides: Record<string, CatalogItem[]>;
  rewardOverrides: Record<string, BusinessReward>;

  completeTask: (businessId: string, taskId: string) => void;
  isTaskCompleted: (businessId: string, taskId: string) => boolean;
  canCollect: (businessId: string) => boolean;
  collectBusiness: (businessId: string) => void;
  isCollected: (businessId: string) => boolean;
  toggleSavedEvent: (eventId: string) => void;
  getEffectiveReward: (businessId: string) => BusinessReward | undefined;
  canRedeem: (businessId: string) => boolean;
  requestRedemption: (businessId: string) => void;
  confirmRedemption: (businessId: string) => void;
  recordIncrementalPurchase: (businessId: string, madePurchase: boolean) => void;
  recordValueFeedback: (businessId: string, worthIt: boolean) => void;
  logDiscoveryView: (businessId: string) => void;
  updateBusinessProfile: (businessId: string, patch: BusinessProfileOverride) => void;
  updateCatalog: (businessId: string, catalog: CatalogItem[]) => void;
  updateReward: (businessId: string, reward: BusinessReward) => void;
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
    pendingRedemptionBusinessIds: [] as string[],
    savedEventIds: [] as string[],
    visitLog: [] as VisitLogEntry[],
    incrementalPurchaseByBusiness: {} as Record<string, boolean>,
    valueFeedbackByBusiness: {} as Record<string, boolean>,
    discoveryViewedBusinessIds: [] as string[],
    profileOverrides: {} as Record<string, BusinessProfileOverride>,
    catalogOverrides: {} as Record<string, CatalogItem[]>,
    rewardOverrides: {} as Record<string, BusinessReward>,
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

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...buildInitialState(),

      completeTask: (businessId, taskId) => {
        const business = businesses.find((b) => b.id === businessId);
        const task = business?.tasks.find((t) => t.id === taskId);
        if (!business || !task) return;

        const existing = get().completedTaskIdsByBusiness[businessId] ?? [];
        if (existing.includes(taskId)) return;

        const visitLog =
          task.type === "simulated_qr"
            ? [...get().visitLog, { businessId, taskId, timestamp: Date.now() }]
            : get().visitLog;

        set({
          completedTaskIdsByBusiness: {
            ...get().completedTaskIdsByBusiness,
            [businessId]: [...existing, taskId],
          },
          pointsBalance: get().pointsBalance + task.points,
          visitLog,
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

      getEffectiveReward: (businessId) => {
        const override = get().rewardOverrides[businessId];
        if (override) return override;
        return businesses.find((b) => b.id === businessId)?.reward;
      },

      canRedeem: (businessId) => {
        const business = businesses.find((b) => b.id === businessId);
        if (!business) return false;
        if (!get().isCollected(businessId)) return false;
        if (get().redeemedRewardBusinessIds.includes(businessId)) return false;
        if (get().pendingRedemptionBusinessIds.includes(businessId)) return false;
        const reward = get().getEffectiveReward(businessId);
        if (!reward) return false;
        if (reward.instant) return true;
        return get().pointsBalance >= reward.pointsCost;
      },

      requestRedemption: (businessId) => {
        if (!get().canRedeem(businessId)) return;
        set({
          pendingRedemptionBusinessIds: [...get().pendingRedemptionBusinessIds, businessId],
        });
      },

      confirmRedemption: (businessId) => {
        if (!get().pendingRedemptionBusinessIds.includes(businessId)) return;
        const reward = get().getEffectiveReward(businessId);
        if (!reward) return;

        set({
          pointsBalance: reward.instant ? get().pointsBalance : get().pointsBalance - reward.pointsCost,
          redeemedRewardBusinessIds: [...get().redeemedRewardBusinessIds, businessId],
          pendingRedemptionBusinessIds: get().pendingRedemptionBusinessIds.filter(
            (id) => id !== businessId,
          ),
        });
      },

      recordIncrementalPurchase: (businessId, madePurchase) => {
        set({
          incrementalPurchaseByBusiness: {
            ...get().incrementalPurchaseByBusiness,
            [businessId]: madePurchase,
          },
        });
      },

      recordValueFeedback: (businessId, worthIt) => {
        set({
          valueFeedbackByBusiness: {
            ...get().valueFeedbackByBusiness,
            [businessId]: worthIt,
          },
        });
      },

      logDiscoveryView: (businessId) => {
        if (get().discoveryViewedBusinessIds.includes(businessId)) return;
        if (get().isCollected(businessId)) return;
        set({
          discoveryViewedBusinessIds: [...get().discoveryViewedBusinessIds, businessId],
        });
      },

      updateBusinessProfile: (businessId, patch) => {
        set({
          profileOverrides: {
            ...get().profileOverrides,
            [businessId]: { ...get().profileOverrides[businessId], ...patch },
          },
        });
      },

      updateCatalog: (businessId, catalog) => {
        set({
          catalogOverrides: { ...get().catalogOverrides, [businessId]: catalog },
        });
      },

      updateReward: (businessId, reward) => {
        set({
          rewardOverrides: { ...get().rewardOverrides, [businessId]: reward },
        });
      },

      resetDemo: () => set({ ...buildInitialState() }),
    }),
    { name: "neighborhood-monopoly-store" },
  ),
);
