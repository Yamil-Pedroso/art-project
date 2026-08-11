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
  ...Array.from({ length: 10 }, (_, index) => ({ id: index + 3 })),
];
