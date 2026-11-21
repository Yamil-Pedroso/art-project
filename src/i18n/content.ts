import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { artworks } from "@/data/artworks";

export const useLocalizedArtworks = () => {
  const { t } = useTranslation("content");
  return useMemo(
    () =>
      artworks.map((artwork) => ({
        ...artwork,
        title: t(`artworks.${artwork.id}.title`),
        medium: t(`artworks.${artwork.id}.medium`),
        dimensions: t(`artworks.${artwork.id}.dimensions`),
        description: t(`artworks.${artwork.id}.description`),
      })),
    [t],
  );
};
