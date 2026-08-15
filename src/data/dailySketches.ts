import imageAssets from "@/assets";

export interface DailySketchPage {
  id: number;
  date?: string;
  title?: string;
  imageUrl?: string;
  note?: string;
}

export const dailySketchPages: DailySketchPage[] = [
  {
    id: 1,
    imageUrl: imageAssets.dailySketch1,
  },
  {
    id: 2,
    imageUrl: imageAssets.dailySketch2,
  },
  {
    id: 3,
    imageUrl: imageAssets.dailySketch3,
  },
  {
    id: 4,
    imageUrl: imageAssets.dailySketch4,
  },
  {
    id: 5,
    imageUrl: imageAssets.dailySketch5,
  },
  {
    id: 6,
    imageUrl: imageAssets.dailySketch6,
  },
  {
    id: 7,
    imageUrl: imageAssets.dailySketch7,
  },
  {
    id: 8,
    imageUrl: imageAssets.dailySketch8,
  },
  {
    id: 9,
    imageUrl: imageAssets.dailySketch9,
  },
  {
    id: 10,
    imageUrl: imageAssets.dailySketch10,
  },
  {
    id: 11,
    imageUrl: imageAssets.dailySketch11,
  },
  {
    id: 12,
  },
];
