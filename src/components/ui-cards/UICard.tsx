import { useState, useRef, useEffect } from "react";
import { artworks } from "@/data/artworks";
import { motion } from "framer-motion";
import { isWithinNewArtworkPeriod } from "@/lib/newArtwork";

export type ArtworkViewMode = "gallery" | "compact" | "list" | "masonry";

const UICard = ({
  artwork,
  index,
  onClick,
  isLatestArtwork = false,
  viewMode = "gallery",
}: {
  artwork: (typeof artworks)[0];
  index: number;
  onClick: () => void;
  isLatestArtwork?: boolean;
  viewMode?: ArtworkViewMode;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const revealTimerRef = useRef<number | null>(null);
  const showNewBadge =
    isLatestArtwork || isWithinNewArtworkPeriod(artwork);
  const isListView = viewMode === "list";
  const isCompactView = viewMode === "compact";
  const isMasonryView = viewMode === "masonry";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const shortStagger = (index % 4) * 35;
          revealTimerRef.current = window.setTimeout(() => {
            setIsVisible(true);
          }, shortStagger);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.01, rootMargin: "160px 0px" }
    );

    const currentCard = cardRef.current;
    if (currentCard) observer.observe(currentCard);
    return () => {
      if (currentCard) observer.unobserve(currentCard);
      if (revealTimerRef.current !== null) {
        window.clearTimeout(revealTimerRef.current);
      }
    };
  }, [index]);

  const artworkCallToAction = (
    <span className="flex w-full items-center justify-between bg-[#172019] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 group-hover:bg-[#b5502d] sm:px-5 sm:py-3">
      <span>View artwork</span>
      <span
        aria-hidden="true"
        className="inline-flex h-7 w-7 items-center justify-center border border-white/25 text-sm transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-white/50"
      >
        ↗
      </span>
    </span>
  );

  return (
    <motion.article
      layout
      ref={cardRef}
      initial={false}
      animate={
        isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
      }
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className={`group w-full ${isMasonryView ? "mb-7 break-inside-avoid sm:mb-8" : ""}`}
    >
      <button
        type="button"
        onClick={onClick}
        className={`w-full cursor-pointer text-left ${
          isListView
            ? "sm:grid sm:grid-cols-[minmax(16rem,42%)_minmax(0,1fr)] sm:items-center sm:gap-10 lg:gap-14 xl:gap-16"
            : ""
        }`}
        aria-label={`View details for ${artwork.title}`}
      >
        <div className="w-full shadow-[0_18px_50px_rgba(37,41,38,0.10)]">
          <div className="relative w-full">
            <div
              className={`w-full overflow-hidden bg-[#ded9ce] ${
                isMasonryView
                  ? ""
                  : isCompactView
                    ? "aspect-[3/4]"
                    : "aspect-[4/3]"
              }`}
            >
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                loading="lazy"
                className={`${
                  isMasonryView ? "block h-auto" : "h-full object-cover"
                } w-full transition duration-700 ease-out group-hover:scale-[1.04]`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172019]/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            {showNewBadge && (
              <span className="absolute left-3 top-3 z-10 border border-white/30 bg-[#172019]/82 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white shadow-sm backdrop-blur sm:left-4 sm:top-4">
                New
              </span>
            )}
            {artwork.status && (
              <span className="absolute right-3 top-3 z-10 border border-[#b5502d]/25 bg-[#f5f2eb]/92 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#b5502d] shadow-sm backdrop-blur sm:right-4 sm:top-4">
                {artwork.status}
              </span>
            )}
          </div>
          {!isListView && artworkCallToAction}
        </div>

        <div
          className={`px-3 pb-2 pt-6 ${
            isListView
              ? "sm:px-0 sm:py-6 sm:text-left lg:py-8"
              : "text-center"
          }`}
        >
          {isListView && (
            <span className="mb-6 block w-full">{artworkCallToAction}</span>
          )}
          <h3
            className={`font-semibold tracking-[-0.02em] text-[#172019] transition-colors duration-300 group-hover:text-[#b5502d] ${
              isCompactView || isMasonryView
                ? "text-xl"
                : isListView
                  ? "text-2xl sm:text-3xl lg:text-4xl"
                  : "text-xl"
            }`}
          >
            {artwork.title}
          </h3>
          <div
            className={`mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#747b76] ${
              isListView ? "justify-center sm:justify-start" : "justify-center"
            }`}
          >
            <span>{artwork.medium}</span>
            {artwork.dimensions && (
              <>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#b5502d]/60" />
                <span>{artwork.dimensions}</span>
              </>
            )}
          </div>
          {isListView && artwork.description && (
            <p className="mt-5 hidden max-w-2xl text-base leading-relaxed text-[#59615c] sm:block lg:mt-6 lg:text-lg lg:leading-relaxed">
              {artwork.description}
            </p>
          )}
        </div>
      </button>
    </motion.article>
  );
};

export default UICard;
