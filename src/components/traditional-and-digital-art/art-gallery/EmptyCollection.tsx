import { motion } from "framer-motion";
import imageAssets from "@/assets";

interface EmptyCollectionProps {
  category: string;
  onExploreAll: () => void;
}

const categoryMessages: Record<string, string> = {
  Fantasy:
    "New worlds, characters and visual stories are taking shape in the studio.",
  Portraits:
    "New faces and personal stories are currently being brought to life.",
  Landscapes:
    "A new series inspired by place, memory and atmosphere is in progress.",
  "Anatomy Study":
    "Studies of structure, movement and the expressive architecture of the human form are taking shape.",
  "Still Life Study":
    "Quiet arrangements of objects, light and texture are currently being explored in the studio.",
  Drawings:
    "Studies, gestures and works on paper will be added to this collection soon.",
};

const EmptyCollection = ({
  category,
  onExploreAll,
}: EmptyCollectionProps) => {
  const message =
    categoryMessages[category] ||
    "A new body of work is currently taking shape and will be revealed here soon.";

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative isolate flex min-h-[34rem] w-full items-center justify-center overflow-hidden border border-[#172019]/10 bg-[#e8e3d9] px-6 py-20 text-center sm:min-h-[38rem] sm:px-12"
    >
      <img
        src={imageAssets.hero}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-30 h-full w-full scale-105 object-cover opacity-25 blur-[2px]"
      />
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#f5f2eb]/95 via-[#f5f2eb]/80 to-[#d9c9b7]/70" />
      <div className="absolute left-1/2 top-1/2 -z-10 w-[120%] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        <p className="select-none whitespace-nowrap text-[20vw] font-semibold uppercase leading-none tracking-[-0.07em] text-[#172019]/[0.035]">
          {category}
        </p>
      </div>

      <div className="max-w-2xl">
        <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-[#b5502d]/30 bg-[#f5f2eb]/80 backdrop-blur">
          <svg
            aria-hidden="true"
            viewBox="0 0 48 48"
            className="h-7 w-7 text-[#b5502d]"
            fill="none"
          >
            <path
              d="M12 33c8-2 13-8 20-20 2-3 6 1 4 4-8 12-13 17-21 19-4 1-7-1-8-3 2 1 3 1 5 0Z"
              fill="currentColor"
            />
            <path
              d="M8 34c1 5-2 7-5 8 5 1 10 0 12-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b5502d] sm:text-sm">
          From the studio
        </p>
        <h3 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#172019] sm:text-6xl">
          {category} collection
        </h3>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#59615c] sm:text-xl">
          {message} Check back soon to discover the finished pieces.
        </p>

        <button
          type="button"
          onClick={onExploreAll}
          className="group mt-9 inline-flex cursor-pointer items-center rounded-full bg-[#172019] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-[#b5502d]"
        >
          Explore all artworks
          <span
            aria-hidden="true"
            className="ml-3 transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </button>
      </div>
    </motion.section>
  );
};

export default EmptyCollection;
