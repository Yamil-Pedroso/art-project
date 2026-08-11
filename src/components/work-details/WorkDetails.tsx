import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Route } from "../../routes/work-details/$workId";
import { artworks } from "@/data/artworks";

const WorkDetails = () => {
  const { workId } = Route.useParams();
  const currentIndex = artworks.findIndex(
    (artwork) => artwork.id === Number(workId)
  );
  const artwork = artworks[currentIndex];

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
        <p className="hidden text-xs font-semibold uppercase tracking-[0.24em] text-[#8a8f8b] sm:block">
          Artist portfolio
        </p>
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
              style={{ backgroundImage: `url(${artwork.imageUrl})` }}
            />
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="relative z-10 max-h-full max-w-full object-contain shadow-[0_16px_45px_rgba(20,24,21,0.22)]"
            />
            <span className="absolute bottom-4 left-4 z-20 bg-[#f5f2eb]/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#59615c] backdrop-blur sm:bottom-7 sm:left-7">
              Original artwork
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
