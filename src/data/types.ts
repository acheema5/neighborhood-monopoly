export type Category = "Food & Drink" | "Shopping" | "Arts" | "Services";

export type TaskType = "visit" | "purchase" | "qr" | "other";

export interface BusinessTask {
  id: string;
  label: string;
  type: TaskType;
  required: boolean;
}

export interface Business {
  id: string;
  name: string;
  category: Category;
  description: string;
  addressOrArea: string;
  distanceLabel: string;
  image: string;
  mapPosition: { lat: number; lng: number };
  featuredItems: string[];
  tasks: BusinessTask[];
  pointsReward: number;
  couponReward?: string;
}

export interface NeighborhoodEvent {
  id: string;
  title: string;
  category: string;
  dateTimeLabel: string;
  location: string;
  description: string;
  image: string;
}

export type BadgeType = "collection" | "event" | "milestone";

export interface Badge {
  id: string;
  title: string;
  description: string;
  type: BadgeType;
  associatedBusinessId?: string;
  unlockRule: string;
}

export interface Neighborhood {
  id: string;
  name: string;
  description: string;
}
