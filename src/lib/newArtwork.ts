import type { ArtWorkProps } from "@/types/Types";

export const NEW_ARTWORK_BADGE_DAYS = 30;
export const NEW_ARTWORK_STORAGE_KEY = "yami-atelier:last-seen-new-artwork-id";

export const isWithinUpdatePeriod = (
  publishedAt: string,
  now = new Date(),
  durationDays = NEW_ARTWORK_BADGE_DAYS
) => {
  const publicationDate = new Date(publishedAt).getTime();
  if (Number.isNaN(publicationDate)) return false;

  const age = now.getTime() - publicationDate;
  const duration = durationDays * 24 * 60 * 60 * 1000;
  return age >= 0 && age <= duration;
};

const publicationTime = (artwork: ArtWorkProps) => {
  if (!artwork.publishedAt) return 0;
  const time = new Date(artwork.publishedAt).getTime();
  return Number.isNaN(time) ? 0 : time;
};

export const getCurrentNewArtwork = (artworks: ArtWorkProps[]) =>
  artworks
    .filter(
      (artwork) =>
        artwork.markAsNew &&
        artwork.id !== undefined &&
        artwork.imageUrl &&
        artwork.publishedAt &&
        isWithinUpdatePeriod(artwork.publishedAt)
    )
    .sort((first, second) => {
      const dateDifference = publicationTime(second) - publicationTime(first);
      return dateDifference || (second.id || 0) - (first.id || 0);
    })[0];

export const isWithinNewArtworkPeriod = (
  artwork: ArtWorkProps,
  now = new Date()
) => {
  if (!artwork.markAsNew || !artwork.publishedAt) return false;

  return isWithinUpdatePeriod(
    artwork.publishedAt,
    now,
    NEW_ARTWORK_BADGE_DAYS
  );
};
