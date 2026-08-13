import type { ArtWorkProps, PortfolioUpdate } from "@/types/Types";
import { getLatestArtwork, isWithinUpdatePeriod } from "@/lib/newArtwork";

/**
 * Future series, exhibition, news and studio updates can live here.
 * Artwork updates are generated automatically from the artwork data below.
 */
export const editorialUpdates: PortfolioUpdate[] = [];

export const getPortfolioUpdates = (
  artworks: ArtWorkProps[],
  now = new Date()
) => {
  const latestArtwork = getLatestArtwork(artworks);
  const artworkUpdates: PortfolioUpdate[] = artworks.flatMap((artwork) => {
    const isLatestArtwork = artwork.id === latestArtwork?.id;
    if (
      (!artwork.markAsNew && !isLatestArtwork) ||
      artwork.id === undefined ||
      !artwork.imageUrl
    ) {
      return [];
    }

    const publicationDate =
      artwork.publishedAt || __PORTFOLIO_BUILD_DATE__;

    return [
      {
        id: `artwork:${artwork.id}`,
        type: "artwork",
        title: artwork.title || "Untitled artwork",
        description: artwork.medium,
        publishedAt: publicationDate,
        imageUrl: artwork.imageUrl,
        artworkId: artwork.id,
      },
    ];
  });

  return [...editorialUpdates, ...artworkUpdates]
    .filter((update) => isWithinUpdatePeriod(update.publishedAt, now))
    .sort(
      (first, second) =>
        new Date(second.publishedAt).getTime() -
        new Date(first.publishedAt).getTime()
    );
};
