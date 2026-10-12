import type { NeighborhoodEvent } from "./types";

export const events: NeighborhoodEvent[] = [
  {
    id: "farmers-market",
    title: "Roosevelt Island Farmers Market",
    category: "Markets",
    dateTimeLabel: "Saturday, Oct 17 · 9am-2pm",
    location: "Main St Plaza",
    description: "Weekly market with local produce, flowers, and artisan goods from island vendors.",
    image: "/images/events/farmers-market.jpg",
  },
  {
    id: "live-music-night",
    title: "Riverside Live Music Night",
    category: "Music",
    dateTimeLabel: "Friday, Oct 23 · 7pm-10pm",
    location: "Riverwalk Promenade",
    description: "An evening of local musicians performing along the river with food trucks on site.",
    image: "/images/events/live-music-night.jpg",
  },
  {
    id: "art-walk",
    title: "Chapel Rd Art Walk",
    category: "Arts",
    dateTimeLabel: "Sunday, Oct 25 · 11am-4pm",
    location: "Chapel Rd & Riverwalk Gallery",
    description: "Self-guided walk through the island's small galleries and studio open houses.",
    image: "/images/events/art-walk.jpg",
  },
  {
    id: "fall-festival",
    title: "Island Fall Festival",
    category: "Food",
    dateTimeLabel: "Saturday, Nov 7 · 12pm-6pm",
    location: "Octagon Park",
    description: "Seasonal festival with local food vendors, live demos, and a community market.",
    image: "/images/events/fall-festival.jpg",
  },
];
