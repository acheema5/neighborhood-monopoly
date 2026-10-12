// Plain SVG string glyphs for Leaflet divIcon markup (can't render React there).
// Mirrors src/components/icons.tsx shapes at marker scale.
const GLYPH_PATHS: Record<string, string> = {
  coffee:
    '<path d="M5 9h12v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z"/><path d="M17 10.5h1.5a2.5 2.5 0 0 1 0 5H17"/>',
  cupcake:
    '<circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="1.1" fill="white" stroke="none"/><circle cx="14.5" cy="9" r="1.1" fill="white" stroke="none"/><circle cx="15" cy="14" r="1.1" fill="white" stroke="none"/><circle cx="9.5" cy="15" r="1.1" fill="white" stroke="none"/>',
  utensils: '<path d="M6 3v7a2 2 0 0 0 4 0V3"/><path d="M8 3v18"/><path d="M18 3c-1.7 0-3 1.8-3 5s1.3 5 3 5"/><path d="M18 3v18"/>',
  book: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H11v16H5.5A1.5 1.5 0 0 0 4 20.5Z"/><path d="M20 4.5A1.5 1.5 0 0 0 18.5 3H13v16h5.5a1.5 1.5 0 0 1 1.5 1.5Z"/>',
  music: '<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
  bag: '<path d="M6 7h12l1 13a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 20Z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
};

const GLYPH_BY_CATEGORY: Record<string, keyof typeof GLYPH_PATHS> = {
  Coffee: "coffee",
  "Coffee & Bakery": "coffee",
  Bakery: "cupcake",
  Restaurant: "utensils",
  Books: "book",
  Music: "music",
  Vintage: "bag",
  Fashion: "bag",
};

export function markerGlyphSvg(category: string): string {
  const key = GLYPH_BY_CATEGORY[category] ?? "bag";
  return `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">${GLYPH_PATHS[key]}</svg>`;
}
