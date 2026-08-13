import { useCallback, useEffect, useState } from "react";
import type { PortfolioUpdate } from "@/types/Types";
import { NEW_ARTWORK_STORAGE_KEY } from "@/lib/newArtwork";

export const SEEN_PORTFOLIO_UPDATES_KEY =
  "yami-atelier:seen-portfolio-update-ids";
export const DISMISSED_PORTFOLIO_UPDATES_KEY =
  "yami-atelier:dismissed-portfolio-update-ids";

const readStoredIds = (storageKey: string) => {
  try {
    const storedValue = window.localStorage.getItem(storageKey);
    const parsedValue: unknown = storedValue ? JSON.parse(storedValue) : [];
    return new Set(
      Array.isArray(parsedValue)
        ? parsedValue.filter((value): value is string =>
            typeof value === "string"
          )
        : []
    );
  } catch {
    return new Set<string>();
  }
};

const readSeenIds = () => {
  try {
    const seenIds = readStoredIds(SEEN_PORTFOLIO_UPDATES_KEY);

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
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(() =>
    readStoredIds(DISMISSED_PORTFOLIO_UPDATES_KEY)
  );

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

    setDismissedIds((currentIds) => {
      const relevantIds = new Set(
        [...currentIds].filter((id) => activeIds.has(id))
      );
      try {
        window.localStorage.setItem(
          DISMISSED_PORTFOLIO_UPDATES_KEY,
          JSON.stringify([...relevantIds])
        );
      } catch {
        // Keep the in-memory state for the current visit.
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

  const dismissUpdate = useCallback((updateId: string) => {
    setDismissedIds((currentIds) => {
      const nextIds = new Set(currentIds).add(updateId);
      try {
        window.localStorage.setItem(
          DISMISSED_PORTFOLIO_UPDATES_KEY,
          JSON.stringify([...nextIds])
        );
      } catch {
        // Keep the in-memory state for the current visit.
      }
      return nextIds;
    });

    setSeenIds((currentIds) => {
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

  const visibleUpdates = updates.filter(
    (update) => !dismissedIds.has(update.id)
  );

  return {
    seenIds,
    markAsSeen,
    dismissUpdate,
    visibleUpdates,
    hasUnseenUpdates: visibleUpdates.some(
      (update) => !seenIds.has(update.id)
    ),
  };
};
