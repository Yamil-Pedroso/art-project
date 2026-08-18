import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { ArtWorkProps } from "@/types/Types";

interface FeaturedArtworkSliderProps {
  artworks: ArtWorkProps[];
  onArtworkSelect: (artworkId: number) => void;
}

type FanPosition = "left" | "center" | "right";

const fanMotion: Record<
  FanPosition,
  { x: string; y: number; rotate: number; scale: number; zIndex: number }
> = {
  left: { x: "-103%", y: 26, rotate: -10, scale: 0.9, zIndex: 10 },
  center: { x: "-50%", y: 0, rotate: 0, scale: 1, zIndex: 30 },
  right: { x: "3%", y: 26, rotate: 10, scale: 0.9, zIndex: 20 },
};

const FeaturedArtworkSlider = ({
  artworks,
  onArtworkSelect,
}: FeaturedArtworkSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeArtwork = artworks[activeIndex];

  useEffect(() => {
    if (isPaused || artworks.length < 2) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % artworks.length);
    }, 15_000);

    return () => window.clearTimeout(timer);
  }, [activeIndex, artworks.length, isPaused]);

  if (artworks.length === 0) return null;

  const moveSlider = (direction: -1 | 1) => {
    setActiveIndex(
      (current) => (current + direction + artworks.length) % artworks.length
    );
  };

  const getPosition = (index: number): FanPosition => {
    const relativeIndex =
      (index - activeIndex + artworks.length) % artworks.length;

    if (relativeIndex === 0) return "center";
    if (relativeIndex === 1) return "right";
    return "left";
  };

  return (
    <motion.section
      aria-labelledby="recent-artworks-title"
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
      className="relative isolate w-full overflow-hidden border-y border-white/10 bg-[#222222] px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16"
    >
      <div className="pointer-events-none absolute -left-32 top-1/2 -z-10 h-80 w-80 -translate-y-1/2 rounded-full border border-[#b5502d]/10" />
      <div className="pointer-events-none absolute -right-24 top-10 -z-10 h-64 w-64 rounded-full border border-white/10" />

      <div className="mx-auto max-w-[90rem] text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b5502d] sm:text-xs">
          Fresh from the studio
        </p>
        <h2
          id="recent-artworks-title"
          className="mx-auto mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-[#f5f2eb] sm:text-5xl lg:text-6xl"
        >
          The latest works
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
          Three recent pieces, moving between finished work and the intimacy of
          an evolving studio process.
        </p>

        <div className="relative mx-auto mt-10 h-[17rem] w-full max-w-6xl sm:mt-12 sm:h-[27rem] lg:h-[34rem]">
          {artworks.map((artwork, index) => {
            const position = getPosition(index);
            const isActive = position === "center";

            return (
              <motion.button
                key={artwork.id}
                type="button"
                initial={false}
                animate={fanMotion[position]}
                transition={{
                  duration: 0.78,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => {
                  if (isActive && artwork.id !== undefined) {
                    onArtworkSelect(artwork.id);
                    return;
                  }

                  setActiveIndex(index);
                }}
                aria-label={
                  isActive
                    ? `View ${artwork.title}`
                    : `Bring ${artwork.title} to the front`
                }
                aria-current={isActive ? "true" : undefined}
                className={`group absolute left-1/2 top-0 aspect-[3/4] w-[48%] max-w-[25rem] origin-bottom cursor-pointer overflow-hidden border bg-[#dcd6ca] text-left shadow-[0_24px_70px_rgba(0,0,0,0.42)] outline-none transition-[border-color] focus-visible:ring-2 focus-visible:ring-[#b5502d] focus-visible:ring-offset-4 focus-visible:ring-offset-[#222222] sm:w-[36%] lg:w-[30%] ${
                  isActive
                    ? "border-white/70"
                    : "border-[#172019]/10 hover:border-[#b5502d]/45"
                }`}
              >
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full object-cover transition duration-700 ease-out ${
                    isActive
                      ? "scale-100 group-hover:scale-[1.025]"
                      : "scale-[1.02] brightness-[0.82] group-hover:brightness-95"
                  }`}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#172019]/45 via-transparent to-transparent opacity-70" />
                {artwork.status && (
                  <span className="absolute right-3 top-3 border border-white/30 bg-[#f5f2eb]/90 px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#b5502d] backdrop-blur sm:right-4 sm:top-4 sm:text-[9px]">
                    {artwork.status}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3 text-white sm:bottom-5 sm:left-5 sm:right-5">
                    <span className="min-w-0">
                      <span className="block text-[8px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:text-[10px]">
                        {artwork.category}
                      </span>
                      <span className="mt-1 block truncate text-sm font-semibold sm:text-xl">
                        {artwork.title}
                      </span>
                    </span>
                    <FiArrowUpRight className="hidden h-5 w-5 shrink-0 sm:block" />
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="mt-7 flex items-center justify-center gap-4 sm:mt-9">
          <button
            type="button"
            onClick={() => moveSlider(-1)}
            aria-label="Previous recent artwork"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:-translate-x-0.5 hover:border-[#b5502d]/60 hover:bg-white/10 hover:text-[#d99272] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5502d]/55"
          >
            <FiChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2" aria-label="Recent artwork slides">
            {artworks.map((artwork, index) => (
              <button
                key={artwork.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${artwork.title}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5502d]/45"
              >
                <motion.span
                  aria-hidden="true"
                  animate={{
                    width: activeIndex === index ? 22 : 6,
                    backgroundColor:
                      activeIndex === index ? "#b5502d" : "#a8aaa7",
                  }}
                  transition={{ duration: 0.35 }}
                  className="h-1.5 rounded-full"
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => moveSlider(1)}
            aria-label="Next recent artwork"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:translate-x-0.5 hover:border-[#b5502d]/60 hover:bg-white/10 hover:text-[#d99272] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5502d]/55"
          >
            <FiChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <p aria-live="polite" className="mt-3 text-xs text-white/45">
          {activeArtwork?.title}
        </p>
      </div>
    </motion.section>
  );
};

export default FeaturedArtworkSlider;
