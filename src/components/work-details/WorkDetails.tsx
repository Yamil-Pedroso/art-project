import { useEffect, useState, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Route } from "../../routes/work-details/$workId";
import { artworks } from "@/data/artworks";
import ThemeToggle from "../theme-toggle/ThemeToggle";

interface ZoomPosition {
  x: number;
  y: number;
  xPercent: number;
  yPercent: number;
}

interface DisplayMedia {
  imageUrl: string;
  label: string;
}

interface ProcessPhase extends DisplayMedia {
  number: number;
}

const createProcessPhases = (
  artwork: (typeof artworks)[number] | undefined
): ProcessPhase[] =>
  [
    artwork?.phase1,
    artwork?.phase2,
    artwork?.phase3,
    artwork?.phase4,
    artwork?.phase5,
  ].flatMap((imageUrl, index) =>
    imageUrl
      ? [
          {
            imageUrl,
            number: index + 1,
            label: `Phase ${String(index + 1).padStart(2, "0")}`,
          },
        ]
      : []
  );

const WorkDetails = () => {
  const { workId } = Route.useParams();
  const currentIndex = artworks.findIndex(
    (artwork) => artwork.id === Number(workId)
  );
  const artwork = artworks[currentIndex];
  const [zoomPosition, setZoomPosition] = useState<ZoomPosition | null>(null);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [activeMedia, setActiveMedia] = useState<DisplayMedia>(() => ({
    imageUrl: artwork?.imageUrl || "",
    label: "Original artwork",
  }));
  const [processPhases, setProcessPhases] = useState<ProcessPhase[]>(() =>
    createProcessPhases(artwork)
  );

  useEffect(() => {
    setActiveMedia({
      imageUrl: artwork?.imageUrl || "",
      label: "Original artwork",
    });
    setProcessPhases(createProcessPhases(artwork));
    setZoomPosition(null);
    setIsImageZoomed(false);
  }, [artwork]);

  if (!artwork) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-[#f5f2eb] px-6 text-center">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#b5502d]">
            Artwork not found
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-[#172019]">
            This piece is no longer in the collection.
          </h1>
          <Link
            to="/"
            hash="gallery"
            className="mt-8 inline-flex rounded-full bg-[#172019] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#b5502d]"
          >
            Return to gallery
          </Link>
        </div>
      </main>
    );
  }

  const previousArtwork =
    artworks[currentIndex === 0 ? artworks.length - 1 : currentIndex - 1];
  const nextArtwork =
    artworks[currentIndex === artworks.length - 1 ? 0 : currentIndex + 1];
  const collectionNumber = String(currentIndex + 1).padStart(2, "0");
  const displayedImageUrl = activeMedia.imageUrl || artwork.imageUrl || "";

  const handleZoomMove = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - bounds.left, bounds.width));
    const y = Math.max(0, Math.min(event.clientY - bounds.top, bounds.height));

    setZoomPosition({
      x,
      y,
      xPercent: (x / bounds.width) * 100,
      yPercent: (y / bounds.height) * 100,
    });
  };

  const handleImageClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!isImageZoomed) {
      handleZoomMove(event);
    }

    setIsImageZoomed((isZoomed) => !isZoomed);
  };

  const toggleResponsiveZoom = () => {
    if (!isImageZoomed && !zoomPosition) {
      setZoomPosition({
        x: 0,
        y: 0,
        xPercent: 50,
        yPercent: 50,
      });
    }

    setIsImageZoomed((isZoomed) => !isZoomed);
  };

  const handlePhaseSelect = (phaseNumber: number) => {
    const selectedPhase = processPhases.find(
      (phase) => phase.number === phaseNumber
    );
    if (!selectedPhase || !activeMedia.imageUrl) return;

    setProcessPhases((currentPhases) =>
      currentPhases.map((phase) =>
        phase.number === phaseNumber
          ? {
              ...phase,
              imageUrl: activeMedia.imageUrl,
              label: activeMedia.label,
            }
          : phase
      )
    );
    setActiveMedia({
      imageUrl: selectedPhase.imageUrl,
      label: selectedPhase.label,
    });
    setZoomPosition(null);
    setIsImageZoomed(false);
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#f5f2eb] text-[#172019]">
      <div className="pointer-events-none absolute -right-48 -top-48 h-[34rem] w-[34rem] rounded-full border border-[#b5502d]/10" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-[22rem] w-[22rem] rounded-full border border-[#b5502d]/10" />

      <header className="relative z-10 flex w-full items-center justify-between border-b border-[#172019]/10 px-5 py-5 sm:px-8 lg:px-12 xl:px-16">
        <Link
          to="/"
          hash="gallery"
          className="group inline-flex items-center text-sm font-semibold uppercase tracking-[0.12em] text-[#4c5550] transition hover:text-[#b5502d]"
        >
          <span
            aria-hidden="true"
            className="mr-3 text-lg transition-transform group-hover:-translate-x-1"
          >
            ←
          </span>
          Back to gallery
        </Link>
        <div className="flex items-center gap-3">
          <p className="hidden text-xs font-semibold uppercase tracking-[0.24em] text-[#8a8f8b] sm:block">
            Artist portfolio
          </p>
          <ThemeToggle />
        </div>
      </header>

      <div className="relative grid w-full gap-12 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(22rem,0.88fr)] lg:gap-14 lg:px-12 lg:py-12 xl:gap-20 xl:px-16">
        <motion.section
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:sticky lg:top-8 lg:self-start"
        >
          <div className="relative flex min-h-[52svh] items-center justify-center overflow-hidden bg-[#dfdbd1] p-4 shadow-[0_28px_80px_rgba(35,39,36,0.14)] sm:min-h-[62svh] sm:p-7 lg:h-[calc(100svh-10rem)] lg:min-h-[38rem]">
            <div
              className="absolute inset-0 scale-110 bg-cover bg-center opacity-[0.16] blur-3xl"
              style={{ backgroundImage: `url(${displayedImageUrl})` }}
            />
            <div
              onMouseMove={handleZoomMove}
              onMouseLeave={() => {
                setZoomPosition(null);
                setIsImageZoomed(false);
              }}
              onClick={handleImageClick}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setIsImageZoomed((isZoomed) => !isZoomed);
                }
              }}
              aria-label={
                isImageZoomed
                  ? "Reset enlarged artwork"
                  : "Click to enlarge artwork"
              }
              className={`relative z-10 max-h-full max-w-full overflow-hidden shadow-[0_16px_45px_rgba(20,24,21,0.22)] outline-none ring-[#b5502d] focus-visible:ring-2 ${
                isImageZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
            >
              <motion.img
                key={displayedImageUrl}
                src={displayedImageUrl}
                alt={`${artwork.title || "Artwork"} — ${activeMedia.label}`}
                draggable={false}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.32 }}
                className="block max-h-[calc(100svh-13.5rem)] max-w-full select-none object-contain transition-transform duration-300 ease-out lg:max-h-[calc(100svh-13.5rem)]"
                style={
                  isImageZoomed
                    ? {
                        transform: "scale(2.45)",
                        transformOrigin: zoomPosition
                          ? `${zoomPosition.xPercent}% ${zoomPosition.yPercent}%`
                          : "50% 50%",
                      }
                    : undefined
                }
              />

              {zoomPosition && !isImageZoomed && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute hidden h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#f5f2eb]/90 bg-no-repeat shadow-[0_18px_55px_rgba(14,18,15,0.45)] lg:block xl:h-56 xl:w-56"
                  style={{
                    left: zoomPosition.x,
                    top: zoomPosition.y,
                    backgroundImage: `url(${displayedImageUrl})`,
                    backgroundSize: "340% 340%",
                    backgroundPosition: `${zoomPosition.xPercent}% ${zoomPosition.yPercent}%`,
                  }}
                >
                  <span className="absolute inset-1 rounded-full border border-[#172019]/20" />
                </div>
              )}
            </div>
            <span className="absolute right-7 top-7 z-20 hidden items-center bg-[#172019]/75 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur lg:inline-flex">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="mr-2 h-4 w-4"
              >
                <circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="1.6" />
                <path d="m15 15 5 5M10.5 7.5v6M7.5 10.5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              {isImageZoomed
                ? "Move cursor · Click to reset"
                : "Hover to magnify · Click to zoom"}
            </span>
            <button
              type="button"
              onClick={toggleResponsiveZoom}
              aria-label={
                isImageZoomed
                  ? "Reduce artwork image"
                  : "Enlarge artwork image"
              }
              aria-pressed={isImageZoomed}
              className="absolute right-4 top-4 z-30 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-[#172019]/85 text-white shadow-[0_12px_35px_rgba(14,18,15,0.28)] backdrop-blur transition active:scale-95 sm:right-7 sm:top-7 lg:hidden"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
              >
                <circle
                  cx="10.5"
                  cy="10.5"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="m15 15 5 5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
                <path
                  d={isImageZoomed ? "M7.5 10.5h6" : "M10.5 7.5v6M7.5 10.5h6"}
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            {artwork.status && (
              <span className="absolute left-4 top-4 z-30 border border-[#b5502d]/25 bg-[#f5f2eb]/92 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b5502d] shadow-sm backdrop-blur sm:left-7 sm:top-7">
                {artwork.status}
              </span>
            )}
            <span className="absolute bottom-4 left-4 z-20 bg-[#f5f2eb]/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#59615c] backdrop-blur sm:bottom-7 sm:left-7">
              {activeMedia.label}
            </span>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center py-2 lg:min-h-[calc(100svh-10rem)] lg:py-8"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#b5502d]">
              {artwork.category || "Selected work"}
            </p>
            <span className="text-sm font-medium tracking-[0.16em] text-[#8a8f8b]">
              {collectionNumber} / {String(artworks.length).padStart(2, "0")}
            </span>
          </div>

          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            {artwork.title}
          </h1>

          <div className="my-8 h-px w-full bg-[#172019]/15 lg:my-10" />

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a8f8b]">
              About the work
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#4c5550] sm:text-xl sm:leading-relaxed">
              {artwork.description || "Details about this artwork are coming soon."}
            </p>
          </div>

          <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-[#172019]/15 py-7 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a8f8b]">
                Medium
              </dt>
              <dd className="mt-2 text-base font-medium text-[#172019]">
                {artwork.medium || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a8f8b]">
                Dimensions
              </dt>
              <dd className="mt-2 text-base font-medium text-[#172019]">
                {artwork.dimensions || "Variable"}
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a8f8b]">
                Collection
              </dt>
              <dd className="mt-2 text-base font-medium text-[#172019]">
                {artwork.category || "Original works"}
              </dd>
            </div>
          </dl>

          {processPhases.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              aria-labelledby="creative-process-title"
              className="mt-9"
            >
              <div className="flex items-end justify-between gap-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#b5502d]">
                    Behind the artwork
                  </p>
                  <h2
                    id="creative-process-title"
                    className="mt-1.5 text-2xl font-semibold tracking-[-0.03em] text-[#172019]"
                  >
                    Creative process
                  </h2>
                </div>
                <span className="pb-1 text-xs text-[#8a8f8b]">
                  {processPhases.length} {processPhases.length === 1 ? "stage" : "stages"}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
                {processPhases.map((phase) => (
                  <motion.button
                    key={phase.number}
                    type="button"
                    layout
                    onClick={() => handlePhaseSelect(phase.number)}
                    whileTap={{ scale: 0.97 }}
                    aria-label={`Show ${phase.label} in the main artwork viewer`}
                    className="group cursor-pointer overflow-hidden border border-[#172019]/10 bg-[#e5e0d6] text-left transition hover:-translate-y-1 hover:border-[#b5502d]/45 hover:shadow-[0_12px_30px_rgba(23,32,25,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5502d]/50"
                  >
                    <div className="aspect-square overflow-hidden">
                      <motion.img
                        key={phase.imageUrl}
                        src={phase.imageUrl}
                        alt={`${artwork.title || "Artwork"}, ${phase.label}`}
                        loading="lazy"
                        decoding="async"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.28 }}
                        className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <span className="block border-t border-[#172019]/10 bg-[#f5f2eb]/85 px-2 py-2 text-center text-[9px] font-semibold uppercase tracking-[0.16em] text-[#69706c]">
                      {phase.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.section>
          )}

          <nav
            aria-label="Browse artworks"
            className="mt-9 grid grid-cols-2 gap-3"
          >
            <Link
              to="/work-details/$workId"
              params={{ workId: String(previousArtwork.id) }}
              className="group border border-[#172019]/15 px-4 py-4 transition hover:border-[#b5502d]/50 hover:bg-white/50 sm:px-5"
            >
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#8a8f8b]">
                ← Previous
              </span>
              <span className="mt-2 block truncate text-sm font-semibold transition group-hover:text-[#b5502d] sm:text-base">
                {previousArtwork.title}
              </span>
            </Link>
            <Link
              to="/work-details/$workId"
              params={{ workId: String(nextArtwork.id) }}
              className="group border border-[#172019]/15 px-4 py-4 text-right transition hover:border-[#b5502d]/50 hover:bg-white/50 sm:px-5"
            >
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#8a8f8b]">
                Next →
              </span>
              <span className="mt-2 block truncate text-sm font-semibold transition group-hover:text-[#b5502d] sm:text-base">
                {nextArtwork.title}
              </span>
            </Link>
          </nav>
        </motion.section>
      </div>
    </main>
  );
};

export default WorkDetails;
