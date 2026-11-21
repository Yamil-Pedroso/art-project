import type { ArtWorkProps } from "@/types/Types";
import imageAssets from "@/assets";
import englishContent from "@/i18n/locales/en/content.json";

const artworkRecords: ArtWorkProps[] = [
  {
    id: 1,
    imageUrl: imageAssets.art1,
    category: "Old Cars",
  },
  {
    id: 2,
    imageUrl: imageAssets.art2,
    category: "Old Cars",
  },
  {
    id: 3,
    imageUrl: imageAssets.still1,
    category: "Still Life Study",
  },
  {
    id: 4,
    imageUrl: imageAssets.pet1,
    category: "Pets",
  },
  {
    id: 5,
    imageUrl: imageAssets.pet3,
    category: "Pets",
  },
  {
    id: 6,
    imageUrl: imageAssets.pet2,
    category: "Pets",
  },
  {
    id: 7,
    imageUrl: imageAssets.digital1,
    category: "Digital Art",
  },
  {
    id: 8,
    imageUrl: imageAssets.digital2,
    category: "Digital Art",
  },
  {
    id: 9,
    imageUrl: imageAssets.digital3,
    category: "Digital Art",
  },
  {
    id: 10,
    imageUrl: imageAssets.digital4,
    category: "Digital Art",
  },
  {
    id: 11,
    imageUrl: imageAssets.digital5,
    category: "Digital Art",
  },
  {
    id: 12,
    imageUrl: imageAssets.digital6,
    category: "Digital Art",
  },
  {
    id: 13,
    imageUrl: imageAssets.digital7,
    category: "Digital Art",
  },
  {
    id: 14,
    imageUrl: imageAssets.digital8,
    category: "Digital Art",
  },
  {
    id: 15,
    imageUrl: imageAssets.digital9,
    category: "Digital Art",
  },
  {
    id: 16,
    imageUrl: imageAssets.digital10,
    category: "Digital Art",
  },
  {
    id: 17,
    imageUrl: imageAssets.digital11,
    category: "Digital Art",
  },
  {
    id: 18,
    imageUrl: imageAssets.digital12,
    category: "Digital Art",
  },
  {
    id: 19,
    imageUrl: imageAssets.master1,
    category: "Master copies",
    status: "In process",
  },
  {
    id: 20,
    imageUrl: imageAssets.rarity1,
    category: "Rarisity",
  },
  {
    id: 21,
    imageUrl: imageAssets.rarity2,
    category: "Rarisity",
  },
  {
    id: 22,
    imageUrl: imageAssets.rarity3,
    category: "Rarisity",
  },
  {
    id: 23,
    imageUrl: imageAssets.rarity4,
    category: "Rarisity",
  },
  {
    id: 24,
    imageUrl: imageAssets.rarity5,
    category: "Rarisity",
  },
  {
    id: 25,
    imageUrl: imageAssets.rarity6,
    category: "Rarisity",
  },
  {
    id: 26,
    imageUrl: imageAssets.rarity7,
    category: "Rarisity",
  },
  {
    id: 27,
    imageUrl: imageAssets.rarity8,
    category: "Rarisity",
  },
  {
    id: 28,
    imageUrl: imageAssets.rarity9,
    category: "Rarisity",
  },
  {
    id: 29,
    imageUrl: imageAssets.rarity10,
    category: "Rarisity",
  },
  {
    id: 30,
    imageUrl: imageAssets.rarity11,
    category: "Rarisity",
  },
  {
    id: 31,
    imageUrl: imageAssets.rarity12,
    category: "Rarisity",
  },
  {
    id: 32,
    imageUrl: imageAssets.rarity13,
    category: "Rarisity",
  },
  {
    id: 33,
    imageUrl: imageAssets.rarity14,
    category: "Rarisity",
  },
  {
    id: 34,
    imageUrl: imageAssets.rarity15,
    category: "Rarisity",
  },
  {
    id: 35,
    imageUrl: imageAssets.drawing1,
    category: "Drawings",
  },
  {
    id: 36,
    imageUrl: imageAssets.drawing2,
    category: "Drawings",
  },
  {
    id: 37,
    imageUrl: imageAssets.drawing3,
    category: "Drawings",
  },
  {
    id: 38,
    imageUrl: imageAssets.drawing4,
    category: "Drawings",
  },
  {
    id: 39,
    imageUrl: imageAssets.drawing5,
    category: "Drawings",
  },
  {
    id: 40,
    imageUrl: imageAssets.drawing6,
    category: "Drawings",
  },
  {
    id: 41,
    imageUrl: imageAssets.drawing7,
    category: "Drawings",
  },
  {
    id: 42,
    imageUrl: imageAssets.drawing8,
    category: "Drawings",
  },
  {
    id: 43,
    imageUrl: imageAssets.drawing9,
    category: "Drawings",
  },
  {
    id: 44,
    imageUrl: imageAssets.drawing10,
    category: "Drawings",
  },
  {
    id: 45,
    imageUrl: imageAssets.drawing11,
    category: "Drawings",
  },
  {
    id: 46,
    imageUrl: imageAssets.drawing12,
    category: "Drawings",
  },
  {
    id: 47,
    imageUrl: imageAssets.drawing13,
    category: "Drawings",
  },
  {
    id: 48,
    imageUrl: imageAssets.drawing14,
    category: "Drawings",
  },
  {
    id: 49,
    imageUrl: imageAssets.drawing15,
    category: "Drawings",
  },
  {
    id: 50,
    imageUrl: imageAssets.drawing16,
    category: "Drawings",
  },
  {
    id: 51,
    imageUrl: imageAssets.drawing17,
    category: "Drawings",
  },
  {
    id: 52,
    imageUrl: imageAssets.drawing18,
    category: "Drawings",
  },
  {
    id: 53,
    imageUrl: imageAssets.drawing19,
    category: "Drawings",
  },
  {
    id: 54,
    imageUrl: imageAssets.drawing20,
    category: "Drawings",
  },
  {
    id: 55,
    imageUrl: imageAssets.drawing21,
    category: "Drawings",
  },
  {
    id: 56,
    imageUrl: imageAssets.drawing22,
    category: "Drawings",
  },
  {
    id: 57,
    imageUrl: imageAssets.drawing23,
    category: "Drawings",
  },
  {
    id: 58,
    imageUrl: imageAssets.drawing24,
    category: "Drawings",
  },
  {
    id: 63,
    imageUrl: imageAssets.drawing25,
    category: "Drawings",
    markAsNew: true,
    publishedAt: "2026-08-12",
  },
  {
    id: 59,
    imageUrl: imageAssets.fantasy1,
    category: "Fantasy",
    status: "In process",
  },
  {
    id: 60,
    imageUrl: imageAssets.fantasy2,
    category: "Fantasy",
  },
  {
    id: 61,
    imageUrl: imageAssets.fantasy3,
    category: "Fantasy",
  },
  {
    id: 62,
    imageUrl: imageAssets.fantasy4,
    category: "Fantasy",
    markAsNew: true,
    publishedAt: "2026-08-12",
  },
  {
    id: 64,
    imageUrl: imageAssets.drawing26,
    category: "Drawings",
  },
  {
    id: 65,
    imageUrl: imageAssets.drawing27,
    category: "Drawings",
  },
  {
    id: 66,
    imageUrl: imageAssets.portrait1,
    category: "Portraits",
  },
  {
    id: 67,
    imageUrl: imageAssets.portrait2,
    category: "Portraits",
    status: "In process",
    phase1: imageAssets.portrait2Phase1,
    markAsNew: true,
    publishedAt: "2026-08-17",
  },
  {
    id: 68,
    imageUrl: imageAssets.portrait3,
    category: "Portraits",
    markAsNew: true,
    publishedAt: "2026-08-17",
  },
  {
    id: 69,
    imageUrl: imageAssets.still2,
    category: "Still Life Study",
    status: "In process",
    markAsNew: true,
    publishedAt: "2026-08-17",
  },
  {
    id: 70,
    imageUrl: imageAssets.landscape1,
    category: "Landscapes",
    markAsNew: true,
    publishedAt: "2026-08-20",
  },
  {
    id: 71,
    imageUrl: imageAssets.fantasy5,
    category: "Fantasy",
    markAsNew: true,
    publishedAt: "2026-08-20",
  },
  {
    id: 72,
    imageUrl: imageAssets.portrait4,
    category: "Portraits",
    markAsNew: true,
    publishedAt: "2026-08-20",
  },
  {
    id: 73,
    imageUrl: imageAssets.digital13,
    category: "Digital Art",
    markAsNew: true,
    publishedAt: "2026-08-20",
  },
  {
    id: 74,
    imageUrl: imageAssets.digital14,
    category: "Digital Art",
    phase1: imageAssets.digital14Phase1,
    phase2: imageAssets.digital14Phase2,
    phase3: imageAssets.digital14Phase3,
    markAsNew: true,
    publishedAt: "2026-08-22",
  },
  {
    id: 75,
    imageUrl: imageAssets.charcoal1,
    category: "Charcoal",
    markAsNew: true,
    publishedAt: "2026-08-22",
  },
  {
    id: 76,
    imageUrl: imageAssets.portrait5,
    category: "Portraits",
    markAsNew: true,
    publishedAt: "2026-08-22",
  },
  {
    id: 77,
    imageUrl: imageAssets.portrait6,
    category: "Portraits",
    status: "In process",
    markAsNew: true,
    publishedAt: "2026-09-04",
  },
  {
    id: 78,
    imageUrl: imageAssets.fantasy6,
    category: "Fantasy",
    status: "In process",
    markAsNew: true,
    publishedAt: "2026-09-04",
  },
  {
    id: 79,
    imageUrl: imageAssets.master2,
    category: "Master copies",
    status: "In process",
    markAsNew: true,
    publishedAt: "2026-09-04",
  },
  {
    id: 80,
    imageUrl: imageAssets.drawing28,
    category: "Drawings",
    markAsNew: true,
    publishedAt: "2026-10-05",
  },
];

const artworkCopy: Record<
  string,
  Pick<ArtWorkProps, "title" | "medium" | "dimensions" | "description">
> = englishContent.artworks;

export const artworks: ArtWorkProps[] = artworkRecords.map((artwork) => ({
  ...artwork,
  ...artworkCopy[String(artwork.id)],
}));
