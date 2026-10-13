export type CategoryGroup = "Food & Drink" | "Culture" | "Fashion";

export type TaskType = "tap" | "demo_checkin" | "demo_action" | "simulated_qr";

export interface BusinessTask {
  id: string;
  label: string;
  type: TaskType;
  points: number;
}

export interface CatalogItem {
  id: string;
  name: string;
  priceUSD: number;
  isMock: true;
}

export interface BusinessReward {
  title: string;
  pointsCost: number;
  mockOnly: true;
  instant?: true;
}

export interface Business {
  id: string;
  name: string;
  category: string;
  categoryGroup: CategoryGroup;
  address: string;
  description: string;
  dataStatus: string;
  mapPosition: { lat: number; lng: number };
  catalogLabel: string;
  catalog: CatalogItem[];
  tasks: BusinessTask[];
  unlockPointsBonus: number;
  badgeId: string;
  badgeTitle: string;
  reward: BusinessReward;
}

export interface NeighborhoodEvent {
  id: string;
  title: string;
  dateTimeLabel: string;
  location: string;
  description: string;
  participatingBusinessIds: string[];
  mockOnly: true;
}

export type BadgeType = "collection" | "milestone";

export interface Badge {
  id: string;
  title: string;
  description: string;
  type: BadgeType;
  associatedBusinessId?: string;
}

export interface Neighborhood {
  id: string;
  name: string;
  city: string;
  demoArea: string;
  disclaimer: string;
}

export interface PlayerSeed {
  name: string;
  level: number;
  startingPoints: number;
  streakDays: number;
  initialCollectedBusinessIds: string[];
  badgeIds: string[];
  collectibleGoal: number;
}
