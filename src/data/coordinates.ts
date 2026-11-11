// Geocoded once via OpenStreetMap Nominatim from each business's real address
// in east-village-seed.json. Not fetched at runtime.
export const businessCoordinates: Record<string, { lat: number; lng: number }> = {
  "coffee-project": { lat: 40.7270679, lng: -73.9893826 },
  "la-cabra": { lat: 40.7293547, lng: -73.9866878 },
  venieros: { lat: 40.7293823, lng: -73.9845469 },
  "east-village-books": { lat: 40.7274698, lng: -73.9844706 },
  "cafe-mogador": { lat: 40.7274166, lng: -73.9843381 },
  "a1-records": { lat: 40.7258368, lng: -73.9844198 },
  "spark-pretty": { lat: 40.7287138, lng: -73.9856781 },
  "cloak-dagger": { lat: 40.7284792, lng: -73.9860541 },
  "stranded-records": { lat: 40.7272022, lng: -73.9903916 },
  "limited-to-one": { lat: 40.7294627, lng: -73.985542 },
  "artichoke-pizza": { lat: 40.7320931, lng: -73.9839076 },
  mcsorleys: { lat: 40.7287612, lng: -73.9897021 },
  "daveys-ice-cream": { lat: 40.7290119, lng: -73.9865689 },
  veselka: { lat: 40.7289775, lng: -73.9869985 },
  "trash-and-vaudeville": { lat: 40.7266424, lng: -73.9852878 },
};

export const EAST_VILLAGE_CENTER: [number, number] = [40.7275, -73.9865];
