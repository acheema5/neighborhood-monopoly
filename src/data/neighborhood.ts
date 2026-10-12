import type { Neighborhood } from "./types";
import seed from "./eastVillageSeed.json";

export const neighborhood: Neighborhood = {
  id: seed.neighborhood.id,
  name: seed.neighborhood.name,
  city: seed.neighborhood.city,
  demoArea: seed.neighborhood.demoArea,
  disclaimer: seed.disclaimer,
};
