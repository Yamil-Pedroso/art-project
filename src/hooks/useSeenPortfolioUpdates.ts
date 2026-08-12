import { useCallback, useEffect, useState } from "react";
import type { PortfolioUpdate } from "@/types/Types";
import { NEW_ARTWORK_STORAGE_KEY } from "@/lib/newArtwork";

export const SEEN_PORTFOLIO_UPDATES_KEY =
  "yami-atelier:seen-portfolio-update-ids";

const readSeenIds = () => {
  try {
    const storedValue = window.localStorage.getItem(
      SEEN_PORTFOLIO_UPDATES_KEY
    );
    const parsedValue: unknown = storedValue ? JSON.parse(storedValue) : [];

    const seenIds = new Set(
      Array.isArray(parsedValue)
        ? parsedValue.filter((value): value is string =>
            typeof value === "string"
          )
        : []
    );

    const legacyArtworkId = window.localStorage.getItem(
      NEW_ARTWORK_STORAGE_KEY
    );
    if (legacyArtworkId) seenIds.add(`artwork:${legacyArtworkId}`);

    return seenIds;
  } catch {
    return new Set<string>();
  }
};

export const useSeenPortfolioUpdates = (updates: PortfolioUpdate[]) => {
  const [seenIds, setSeenIds] = useState<Set<string>>(() => readSeenIds());

  useEffect(() => {
    const activeIds = new Set(updates.map((update) => update.id));

    setSeenIds((currentIds) => {
      const relevantIds = new Set(
        [...currentIds].filter((id) => activeIds.has(id))
      );

      try {
        window.localStorage.setItem(
          SEEN_PORTFOLIO_UPDATES_KEY,
          JSON.stringify([...relevantIds])
        );
      } catch {
        // The experience remains usable when storage is unavailable.
      }

      return relevantIds;
    });
  }, [updates]);

  const markAsSeen = useCallback((updateId: string) => {
    setSeenIds((currentIds) => {
      if (currentIds.has(updateId)) return currentIds;

      const nextIds = new Set(currentIds).add(updateId);
      try {
        window.localStorage.setItem(
          SEEN_PORTFOLIO_UPDATES_KEY,
          JSON.stringify([...nextIds])
        );
      } catch {
        // Keep the in-memory state for the current visit.
      }
      return nextIds;
    });
  }, []);

  return {
    seenIds,
    markAsSeen,
    hasUnseenUpdates: updates.some((update) => !seenIds.has(update.id)),
  };
};
