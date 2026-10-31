import type { ArtWorkProps, PortfolioUpdate } from "@/types/Types";
import {
  isWithinNewArtworkPeriod,
  isWithinUpdatePeriod,
} from "@/lib/newArtwork";
import type { DailySketchPage } from "@/data/dailySketches";

/**
 * Future series, exhibition, news and studio updates can live here.
 * Artwork updates are generated automatically from the artwork data below.
 */
export const editorialUpdates: PortfolioUpdate[] = [];

export const getPortfolioUpdates = (
  artworks: ArtWorkProps[],
  sketchPages: DailySketchPage[] = [],
  now = new Date()
) => {
  const artworkUpdates: PortfolioUpdate[] = artworks.flatMap((artwork) => {
    if (
      !isWithinNewArtworkPeriod(artwork, now) ||
      artwork.id === undefined ||
      !artwork.imageUrl ||
      !artwork.publishedAt
    ) {
      return [];
    }

    return [
      {
        id: `artwork:${artwork.id}`,
        type: "artwork",
        title: artwork.title || "Untitled artwork",
        description: artwork.medium,
        publishedAt: artwork.publishedAt,
        imageUrl: artwork.imageUrl,
        artworkId: artwork.id,
      },
    ];
  });

  const latestSketch = sketchPages
    .filter((page) => Boolean(page.imageUrl))
    .sort((first, second) => second.id - first.id)[0];
  const sketchUpdates: PortfolioUpdate[] = latestSketch?.imageUrl
    ? [
        {
          id: `sketch:${latestSketch.id}`,
          type: "sketch",
          title:
            latestSketch.title ||
            `Daily sketch · Page ${String(latestSketch.id).padStart(2, "0")}`,
          description:
            latestSketch.note || "A new page in the daily sketchbook.",
          publishedAt: __PORTFOLIO_BUILD_DATE__,
          imageUrl: latestSketch.imageUrl,
          galleryCategory: "Daily Sketching",
        },
      ]
    : [];

  return [...editorialUpdates, ...artworkUpdates, ...sketchUpdates]
    .filter((update) => isWithinUpdatePeriod(update.publishedAt, now))
    .sort((first, second) => {
      const dateDifference =
        new Date(second.publishedAt).getTime() -
        new Date(first.publishedAt).getTime();

      return dateDifference || second.id.localeCompare(first.id);
    });
};
