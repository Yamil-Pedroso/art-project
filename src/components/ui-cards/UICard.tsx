import { useState, useRef, useEffect } from "react";
import { artworks } from "@/data/artworks";
import { motion } from "framer-motion";

const UICard = ({
  artwork,
  index,
  onClick,
}: {
  artwork: (typeof artworks)[0];
  index: number;
  onClick: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

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
        className="w-full cursor-pointer text-left"
        aria-label={`View details for ${artwork.title}`}
      >
        <div
          className="relative w-full shadow-[0_18px_50px_rgba(37,41,38,0.10)]"
        >
          <div className="aspect-[4/3] w-full overflow-hidden bg-[#ded9ce]">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#172019]/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
          <span className="absolute bottom-0 left-1/2 z-10 inline-flex -translate-x-1/2 translate-y-1/2 items-center whitespace-nowrap rounded-full bg-[#b5502d] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_30px_rgba(181,80,45,0.3)] transition duration-300 group-hover:-translate-y-1 group-hover:bg-[#172019] sm:text-sm">
            View artwork
            <span aria-hidden="true" className="ml-2 text-base">
              ↗
            </span>
          </span>
        </div>

        <div className="px-3 pb-2 pt-9 text-center">
          <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#172019] transition-colors duration-300 group-hover:text-[#b5502d]">
            {artwork.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-[#747b76]">
            <span>{artwork.medium}</span>
            {artwork.dimensions && (
              <>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#b5502d]/60" />
                <span>{artwork.dimensions}</span>
              </>
            )}
          </div>
        </div>
      </button>
    </motion.article>
  );
};

export default UICard;
