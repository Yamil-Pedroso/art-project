import type { CVProps, ArtShowProps } from "@/types/Types";
import imageAssets from "@/assets";
import englishContent from "@/i18n/locales/en/content.json";

export const cvData: CVProps[] = [
  { ...englishContent.cv.profile, imageUrl: imageAssets.yamiAtelier },
];
export const artShow: ArtShowProps = englishContent.cv.exhibitions;
