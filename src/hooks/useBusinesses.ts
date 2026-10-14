import { businesses as baseBusinesses } from "../data/businesses";
import { useAppStore } from "../store/useAppStore";
import type { Business } from "../data/types";

export function useBusinesses(): Business[] {
  const profileOverrides = useAppStore((s) => s.profileOverrides);
  const catalogOverrides = useAppStore((s) => s.catalogOverrides);
  const rewardOverrides = useAppStore((s) => s.rewardOverrides);

  return baseBusinesses.map((b) => ({
    ...b,
    ...profileOverrides[b.id],
    catalog: catalogOverrides[b.id] ?? b.catalog,
    reward: rewardOverrides[b.id] ?? b.reward,
  }));
}

export function useBusiness(businessId: string | undefined): Business | undefined {
  const businesses = useBusinesses();
  return businesses.find((b) => b.id === businessId);
}
