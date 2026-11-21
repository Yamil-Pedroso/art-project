import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import imageAssets from "@/assets";

const archiveImages = [
  imageAssets.exhib2,
  imageAssets.exhib3,
  imageAssets.exhib4,
  imageAssets.exhib5,
  imageAssets.exhib6,
  imageAssets.exhib7,
  imageAssets.exhib8,
  imageAssets.exhib9,
  imageAssets.exhib10,
  imageAssets.exhib11,
  imageAssets.exhib12,
  imageAssets.exhib13,
  imageAssets.exhib14,
];

const exhibitionImages = [imageAssets.exhib1, ...archiveImages];

const ExhibitionCollector = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    if (selectedImage === null) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedImage]);

  return (
    <>
      <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full overflow-hidden bg-[#172019] text-[#f5f2eb]"
    >
      <div className="pointer-events-none absolute -right-48 -top-48 h-[38rem] w-[38rem] rounded-full border border-white/[0.06]" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-[24rem] w-[24rem] rounded-full border border-white/[0.06]" />

      <header className="relative grid gap-10 px-6 pb-14 pt-16 sm:px-10 sm:pt-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:px-14 lg:pb-20 lg:pt-24 xl:px-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d17450] sm:text-sm">
            Exhibition archive
          </p>
          <h3 className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.96] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Art beyond the studio.
          </h3>
        </div>
        <div className="max-w-2xl lg:justify-self-end">
          <p className="text-lg leading-relaxed text-[#c4c8c4] sm:text-xl sm:leading-relaxed">
            A visual archive of exhibitions, collectors and encounters that
            have carried the work from Havana to Berlin, Bonn and Zurich.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
            <div>
              <span className="block text-2xl font-semibold text-white sm:text-3xl">
                3
              </span>
              <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-[#8f9891]">
                Countries
              </span>
            </div>
            <div>
              <span className="block text-2xl font-semibold text-white sm:text-3xl">
                14+
              </span>
              <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-[#8f9891]">
                Exhibitions
              </span>
            </div>
            <div>
              <span className="block text-2xl font-semibold text-white sm:text-3xl">
                2013
              </span>
              <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-[#8f9891]">
                Since
              </span>
            </div>
          </div>
        </div>
      </header>

      <motion.button
        type="button"
        onClick={() => setSelectedImage(0)}
        aria-label="Open featured exhibition photograph"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="group relative mx-6 block cursor-zoom-in overflow-hidden text-left sm:mx-10 lg:mx-14 xl:mx-20"
      >
        <div className="aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:aspect-[2/1]">
          <img
            src={imageAssets.exhib1}
            alt="Featured moment from the exhibition archive"
            className="h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.025]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#101511]/90 via-transparent to-[#101511]/10" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-9 lg:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e08a66]">
              Selected moment
            </p>
            <p className="mt-3 max-w-2xl text-2xl font-semibold tracking-[-0.025em] text-white sm:text-4xl">
              The work in conversation with people and place.
            </p>
          </div>
          <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Cuba · Germany · Switzerland
          </p>
        </div>
        <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f2eb]/90 text-xl text-[#172019] opacity-0 backdrop-blur transition duration-300 group-hover:opacity-100 sm:right-8 sm:top-8">
          ↗
        </span>
      </motion.button>

      <div className="px-6 pb-16 pt-16 sm:px-10 sm:pb-20 sm:pt-20 lg:px-14 xl:px-20">
        <div className="mb-9 flex items-end justify-between border-b border-white/15 pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d17450]">
              Photographic journal
            </p>
            <h4 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
              Moments from the archive
            </h4>
          </div>
          <span className="hidden text-sm text-[#8f9891] sm:block">
            01 — {String(archiveImages.length).padStart(2, "0")}
          </span>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-5">
          {archiveImages.map((image, index) => (
            <motion.button
              type="button"
              onClick={() => setSelectedImage(index + 1)}
              aria-label={`Open exhibition photograph ${index + 1}`}
              key={image}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.65,
                delay: (index % 3) * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative mb-4 w-full cursor-zoom-in break-inside-avoid overflow-hidden bg-[#29302b] text-left lg:mb-5"
            >
              <img
                src={image}
                alt={`Exhibition archive moment ${String(index + 1).padStart(2, "0")}`}
                loading="lazy"
                className="h-auto w-full transition duration-700 ease-out group-hover:scale-[1.025] group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101511]/75 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between p-5 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  Archive
                </span>
                <span className="text-sm font-medium text-white/75">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      </motion.section>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Expanded exhibition photograph"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedImage(null);
            }}
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-[#090c0a]/90 p-4 backdrop-blur-md sm:p-8"
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              aria-label="Close enlarged photograph"
              className="absolute right-4 top-4 z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[#172019]/80 text-white transition hover:rotate-90 hover:border-[#d17450] hover:bg-[#d17450] sm:right-7 sm:top-7"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
              >
                <path
                  d="M6 6l12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <motion.figure
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onMouseDown={(event) => event.stopPropagation()}
              className="flex max-h-[92svh] max-w-[94vw] cursor-default flex-col items-center"
            >
              <img
                src={exhibitionImages[selectedImage]}
                alt={`Expanded exhibition archive moment ${selectedImage + 1}`}
                className="max-h-[82svh] max-w-full object-contain shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
              />
              <figcaption className="mt-4 flex w-full items-center justify-between gap-6 text-white/75">
                <span className="text-xs font-semibold uppercase tracking-[0.22em]">
                  Exhibition archive
                </span>
                <span className="text-sm tabular-nums">
                  {String(selectedImage + 1).padStart(2, "0")} /{" "}
                  {String(exhibitionImages.length).padStart(2, "0")}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExhibitionCollector;
