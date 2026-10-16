import { create } from "zustand";
import { persist } from "zustand/middleware";
import { businesses } from "../data/businesses";
import { badges } from "../data/badges";
import { playerSeed } from "../data/player";
import type { BusinessReward, CatalogItem } from "../data/types";

export interface VisitLogEntry {
  businessId: string;
  timestamp: number;
}

export interface BusinessProfileOverride {
  name?: string;
  category?: string;
  address?: string;
  description?: string;
}

export interface PilotFeedback {
  discoveredNewPlace: boolean | null;
  wouldExploreAgain: boolean | null;
}

interface AppState {
  pointsBalance: number;
  collectedBusinessIds: string[];
  completedBonusTaskIdsByBusiness: Record<string, string[]>;
  earnedBadgeIds: string[];
  redeemedRewardBusinessIds: string[];
  pendingRedemptionBusinessIds: string[];
  savedEventIds: string[];
  visitLog: VisitLogEntry[];
  discoveryViewedBusinessIds: string[];
  profileOverrides: Record<string, BusinessProfileOverride>;
  catalogOverrides: Record<string, CatalogItem[]>;
  rewardOverrides: Record<string, BusinessReward>;
  pilotFeedback: PilotFeedback;

  checkInBusiness: (businessId: string) => void;
  isCollected: (businessId: string) => boolean;
  completeBonusTask: (businessId: string, taskId: string) => void;
  isBonusTaskCompleted: (businessId: string, taskId: string) => boolean;
  toggleSavedEvent: (eventId: string) => void;
  getEffectiveReward: (businessId: string) => BusinessReward | undefined;
  canRedeem: (businessId: string) => boolean;
  requestRedemption: (businessId: string) => void;
  confirmRedemption: (businessId: string) => void;
  logDiscoveryView: (businessId: string) => void;
  updateBusinessProfile: (businessId: string, patch: BusinessProfileOverride) => void;
  updateCatalog: (businessId: string, catalog: CatalogItem[]) => void;
  updateReward: (businessId: string, reward: BusinessReward) => void;
  setRewardEnabled: (businessId: string, enabled: boolean) => void;
  setPilotFeedback: (patch: Partial<PilotFeedback>) => void;
  resetDemo: () => void;
}

function buildInitialState() {
  const collectedBusinessIds = [...playerSeed.initialCollectedBusinessIds];
  const visitLog: VisitLogEntry[] = collectedBusinessIds.map((businessId) => ({
    businessId,
    timestamp: Date.now(),
  }));
  const earnedBadgeIds = evaluateGlobalBadges({
    collectedBusinessIds,
    earnedBadgeIds: [...playerSeed.badgeIds],
  });

  return {
    pointsBalance: playerSeed.startingPoints,
    collectedBusinessIds,
    completedBonusTaskIdsByBusiness: {} as Record<string, string[]>,
    earnedBadgeIds,
    redeemedRewardBusinessIds: [] as string[],
    pendingRedemptionBusinessIds: [] as string[],
    savedEventIds: [] as string[],
    visitLog,
    discoveryViewedBusinessIds: [] as string[],
    profileOverrides: {} as Record<string, BusinessProfileOverride>,
    catalogOverrides: {} as Record<string, CatalogItem[]>,
    rewardOverrides: {} as Record<string, BusinessReward>,
    pilotFeedback: { discoveredNewPlace: null, wouldExploreAgain: null } as PilotFeedback,
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

      checkInBusiness: (businessId) => {
        if (get().collectedBusinessIds.includes(businessId)) return;

        const business = businesses.find((b) => b.id === businessId);
        if (!business) return;

        const collectedBusinessIds = [...get().collectedBusinessIds, businessId];
        const pointsBalance =
          get().pointsBalance + business.checkInTask.points + business.unlockPointsBonus;
        const earnedBadgeIds = evaluateGlobalBadges({
          collectedBusinessIds,
          earnedBadgeIds: get().earnedBadgeIds,
        });
        const visitLog = [...get().visitLog, { businessId, timestamp: Date.now() }];

        set({ collectedBusinessIds, pointsBalance, earnedBadgeIds, visitLog });
      },

      isCollected: (businessId) => get().collectedBusinessIds.includes(businessId),

      completeBonusTask: (businessId, taskId) => {
        const business = businesses.find((b) => b.id === businessId);
        const task = business?.bonusTasks.find((t) => t.id === taskId);
        if (!business || !task) return;

        const existing = get().completedBonusTaskIdsByBusiness[businessId] ?? [];
        if (existing.includes(taskId)) return;

        set({
          completedBonusTaskIdsByBusiness: {
            ...get().completedBonusTaskIdsByBusiness,
            [businessId]: [...existing, taskId],
          },
          pointsBalance: get().pointsBalance + task.points,
        });
      },

      isBonusTaskCompleted: (businessId, taskId) => {
        return (get().completedBonusTaskIdsByBusiness[businessId] ?? []).includes(taskId);
      },

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
        if (!reward || reward.enabled === false) return false;
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
        const current = get().getEffectiveReward(businessId);
        set({
          rewardOverrides: {
            ...get().rewardOverrides,
            [businessId]: { enabled: current?.enabled ?? true, ...reward },
          },
        });
      },

      setRewardEnabled: (businessId, enabled) => {
        const current = get().getEffectiveReward(businessId);
        if (!current) return;
        set({
          rewardOverrides: { ...get().rewardOverrides, [businessId]: { ...current, enabled } },
        });
      },

      setPilotFeedback: (patch) => {
        set({ pilotFeedback: { ...get().pilotFeedback, ...patch } });
      },

      resetDemo: () => set({ ...buildInitialState() }),
    }),
    { name: "neighborhood-monopoly-store" },
  ),
);
