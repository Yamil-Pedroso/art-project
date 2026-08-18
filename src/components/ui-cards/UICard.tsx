import { useState, useRef, useEffect } from "react";
import { artworks } from "@/data/artworks";
import { motion } from "framer-motion";
import { isWithinNewArtworkPeriod } from "@/lib/newArtwork";

export type ArtworkViewMode = "gallery" | "compact" | "list";

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
  const showNewBadge =
    isLatestArtwork || isWithinNewArtworkPeriod(artwork);
  const isListView = viewMode === "list";
  const isCompactView = viewMode === "compact";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 100);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    const currentCard = cardRef.current;
    if (currentCard) observer.observe(currentCard);
    return () => {
      if (currentCard) observer.unobserve(currentCard);
    };
  }, [index]);

  return (
    <motion.article
      layout
      ref={cardRef}
      initial={false}
      animate={
        isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }
      }
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="group w-full"
    >
      <button
        type="button"
        onClick={onClick}
        className={`w-full cursor-pointer text-left ${
          isListView
            ? "sm:grid sm:grid-cols-[minmax(12rem,17rem)_minmax(0,1fr)] sm:items-center sm:gap-8"
            : ""
        }`}
        aria-label={`View details for ${artwork.title}`}
      >
        <div
          className="relative w-full shadow-[0_18px_50px_rgba(37,41,38,0.10)]"
        >
          <div
            className={`w-full overflow-hidden bg-[#ded9ce] ${
              isCompactView ? "aspect-[3/4]" : "aspect-[4/3]"
            }`}
          >
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
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
          <span
            className={`absolute bottom-0 left-1/2 z-10 inline-flex -translate-x-1/2 translate-y-1/2 items-center whitespace-nowrap rounded-full bg-[#b5502d] font-semibold uppercase text-white shadow-[0_10px_30px_rgba(181,80,45,0.3)] transition duration-300 group-hover:-translate-y-1 group-hover:bg-[#172019] ${
              isCompactView
                ? "px-5 py-3 text-xs tracking-[0.13em]"
                : "px-6 py-3 text-xs tracking-[0.14em] sm:text-sm"
            }`}
          >
            View artwork
            <span aria-hidden="true" className="ml-2 text-base">
              ↗
            </span>
          </span>
        </div>

        <div
          className={`px-3 pb-2 pt-9 ${
            isListView ? "sm:px-0 sm:py-4 sm:text-left" : "text-center"
          }`}
        >
          <h3
            className={`font-semibold tracking-[-0.02em] text-[#172019] transition-colors duration-300 group-hover:text-[#b5502d] ${
              isCompactView ? "text-xl" : isListView ? "text-2xl" : "text-xl"
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
            <p className="mt-4 hidden max-w-2xl text-sm leading-relaxed text-[#59615c] sm:block">
              {artwork.description}
            </p>
          )}
        </div>
      </button>
    </motion.article>
  );
};

export default UICard;
