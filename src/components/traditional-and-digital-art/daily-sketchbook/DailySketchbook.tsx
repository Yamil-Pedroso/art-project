import {
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiBookOpen,
  FiChevronLeft,
  FiChevronRight,
  FiPenTool,
} from "react-icons/fi";
import {
  dailySketchPages,
  type DailySketchPage,
} from "@/data/dailySketches";

const paperTexture = {
  backgroundColor: "#f4ecda",
  backgroundImage:
    "radial-gradient(circle at 16% 18%, rgba(119,88,47,.08) 0 1px, transparent 1.5px), radial-gradient(circle at 82% 72%, rgba(119,88,47,.06) 0 1px, transparent 1.5px), linear-gradient(105deg, rgba(255,255,255,.52), transparent 42%, rgba(104,75,40,.045))",
  backgroundSize: "27px 27px, 35px 35px, 100% 100%",
};

interface SketchPageProps {
  page?: DailySketchPage;
  side: "left" | "right";
}

const SketchPage = ({ page, side }: SketchPageProps) => {
  if (!page) {
    return <div aria-hidden="true" className="hidden sm:block" />;
  }

  const pageNumber = String(page.id).padStart(2, "0");

  return (
    <article
      aria-label={`Daily sketch page ${page.id}`}
      className={`relative flex min-h-[23rem] flex-col overflow-hidden px-5 py-6 text-[#2f392f] sm:min-h-[32rem] sm:px-8 sm:py-8 lg:min-h-[38rem] lg:px-10 lg:py-9 ${
        side === "left"
          ? "rounded-l-[0.4rem] border-r border-[#7f6544]/20 shadow-[inset_-24px_0_34px_-30px_rgba(44,32,19,0.65)]"
          : "rounded-r-[0.4rem] shadow-[inset_24px_0_34px_-30px_rgba(44,32,19,0.65)]"
      }`}
      style={paperTexture}
    >
      <div className="flex items-center justify-between border-b border-[#866f50]/20 pb-3 text-[8px] font-semibold uppercase tracking-[0.24em] text-[#786b58] sm:text-[9px]">
        <span>Daily observation</span>
        <span>{page.date || `Day ${pageNumber}`}</span>
      </div>

      <div className="relative flex flex-1 items-center justify-center py-8 sm:py-10">
        <div className="pointer-events-none absolute inset-y-5 left-[9%] w-px bg-[#b5502d]/12" />
        {page.imageUrl ? (
          <figure className="relative z-10 flex h-full w-full flex-col items-center justify-center">
            <img
              src={page.imageUrl}
              alt={page.title || `Daily sketch ${page.id}`}
              className="max-h-full max-w-full object-contain drop-shadow-[0_12px_20px_rgba(44,32,19,0.14)]"
            />
            {(page.title || page.note) && (
              <figcaption className="mt-5 max-w-md text-center">
                {page.title && (
                  <p className="font-serif text-lg italic text-[#3a4038]">
                    {page.title}
                  </p>
                )}
                {page.note && (
                  <p className="mt-2 text-xs leading-relaxed text-[#786b58]">
                    {page.note}
                  </p>
                )}
              </figcaption>
            )}
          </figure>
        ) : (
          <div className="relative z-10 text-center text-[#796d5b]/55">
            <FiPenTool className="mx-auto h-6 w-6 stroke-[1.2] sm:h-7 sm:w-7" />
            <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.24em] sm:text-[10px]">
              Waiting for today’s sketch
            </p>
          </div>
        )}
      </div>

      <div
        className={`flex items-center border-t border-[#866f50]/20 pt-3 text-[9px] font-semibold tracking-[0.2em] text-[#786b58]/65 ${
          side === "left" ? "justify-start" : "justify-end"
        }`}
      >
        {pageNumber}
      </div>
    </article>
  );
};

const DailySketchbook = () => {
  const spreadCount = Math.ceil(dailySketchPages.length / 2);
  const lastStep = spreadCount + 1;
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const pointerStartX = useRef<number | null>(null);

  const goToStep = (nextStep: number) => {
    const safeStep = Math.max(0, Math.min(nextStep, lastStep));
    if (safeStep === step) return;

    setDirection(safeStep > step ? 1 : -1);
    setStep(safeStep);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;

    const distance = event.clientX - pointerStartX.current;
    pointerStartX.current = null;

    if (distance < -45) goToStep(step + 1);
    if (distance > 45) goToStep(step - 1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") goToStep(step + 1);
    if (event.key === "ArrowLeft") goToStep(step - 1);
  };

  const pageOffset = (step - 1) * 2;
  const leftPage = dailySketchPages[pageOffset];
  const rightPage = dailySketchPages[pageOffset + 1];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Interactive daily sketchbook"
      className="relative isolate w-full overflow-hidden rounded-[2rem] bg-[#1d2a21] px-3 py-12 outline-none ring-[#d17450] focus-visible:ring-2 sm:px-7 sm:py-16 lg:px-12 lg:py-20"
    >
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border border-[#e3b95f]/15" />
      <div className="pointer-events-none absolute -left-10 -top-10 h-44 w-44 rounded-full border border-[#e3b95f]/10" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-[#b5502d]/10 blur-3xl" />
      <span className="pointer-events-none absolute left-[8%] top-[26%] text-5xl text-[#e3b95f]/15">✦</span>
      <span className="pointer-events-none absolute right-[9%] top-[15%] text-3xl text-[#d17450]/20">✧</span>

      <div className="relative mx-auto mb-9 flex max-w-5xl flex-col gap-5 text-[#f5f2eb] sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d99272] sm:text-xs">
            An evolving visual diary
          </p>
          <h3 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Daily Sketching
          </h3>
        </div>
        <div className="max-w-sm sm:text-right">
          <p className="text-sm leading-relaxed text-[#aeb7b0] sm:text-base">
            A new page for small observations, passing ideas and drawings made
            one day at a time.
          </p>
          <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#77837a] sm:text-[10px]">
            Drag, swipe or use the arrow keys
          </p>
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl" style={{ perspective: "1800px" }}>
        <div className="absolute -inset-x-2 bottom-[-0.8rem] top-4 rounded-[1.4rem] bg-[#0c120e]/70 blur-sm sm:-inset-x-5 sm:bottom-[-1.2rem]" />
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            pointerStartX.current = null;
          }}
          className="relative cursor-grab touch-pan-y select-none active:cursor-grabbing"
        >
          <AnimatePresence mode="wait" custom={direction}>
            {step === 0 ? (
              <motion.button
                key="front-cover"
                type="button"
                onClick={() => goToStep(1)}
                custom={direction}
                initial={{ opacity: 0, rotateY: -12, x: 24 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: -42, x: -60 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto flex aspect-[4/5] w-[78%] max-w-[34rem] cursor-pointer flex-col items-center justify-between overflow-hidden rounded-r-2xl rounded-l-md border-l-[0.7rem] border-[#6f281d] bg-[#a8432d] px-7 py-9 text-center text-[#f6e8c9] shadow-[18px_22px_55px_rgba(4,8,5,0.42),inset_0_0_0_1px_rgba(255,255,255,0.12)] sm:px-12 sm:py-12"
              >
                <div className="absolute inset-3 rounded-r-xl rounded-l-sm border border-[#f0c66c]/30" />
                <div className="relative flex w-full items-center justify-between text-[8px] font-semibold uppercase tracking-[0.26em] text-[#f0c66c]/70 sm:text-[10px]">
                  <span>Visual journal</span>
                  <span>Vol. 01</span>
                </div>
                <div className="relative">
                  <FiBookOpen className="mx-auto h-9 w-9 text-[#f0c66c] sm:h-12 sm:w-12" />
                  <h4 className="mt-6 font-serif text-4xl italic leading-none sm:text-6xl">
                    Daily
                    <span className="block">Sketching</span>
                  </h4>
                  <span className="mx-auto mt-7 block h-px w-20 bg-[#f0c66c]/55" />
                  <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#f0c66c]/75 sm:text-xs">
                    Open the sketchbook
                  </p>
                </div>
                <p className="relative text-[9px] font-semibold uppercase tracking-[0.24em] text-[#f6e8c9]/55 sm:text-[10px]">
                  Yami Atelier · Daily practice
                </p>
              </motion.button>
            ) : step === lastStep ? (
              <motion.div
                key="back-cover"
                custom={direction}
                initial={{ opacity: 0, rotateY: 12, x: -24 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: 42, x: 60 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto flex aspect-[4/5] w-[78%] max-w-[34rem] flex-col items-center justify-center overflow-hidden rounded-l-2xl rounded-r-md border-r-[0.7rem] border-[#172019] bg-[#25342a] px-9 text-center text-[#f5f2eb] shadow-[-18px_22px_55px_rgba(4,8,5,0.42)]"
              >
                <div className="absolute inset-3 rounded-l-xl rounded-r-sm border border-white/10" />
                <span className="text-4xl text-[#e3b95f]/55">✦</span>
                <p className="mt-6 font-serif text-3xl italic sm:text-5xl">
                  To be continued tomorrow.
                </p>
                <button
                  type="button"
                  onClick={() => goToStep(0)}
                  className="relative mt-8 cursor-pointer border-b border-[#d99272]/60 pb-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#d99272]"
                >
                  Return to cover
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`spread-${step}`}
                custom={direction}
                initial={{
                  opacity: 0.35,
                  rotateY: direction > 0 ? -18 : 18,
                  x: direction > 0 ? 45 : -45,
                }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{
                  opacity: 0.2,
                  rotateY: direction > 0 ? 22 : -22,
                  x: direction > 0 ? -55 : 55,
                }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: direction > 0 ? "left center" : "right center" }}
                className="grid grid-cols-2 overflow-hidden rounded-md bg-[#e7dcc6] shadow-[0_24px_60px_rgba(4,8,5,0.42)]"
              >
                <SketchPage page={leftPage} side="left" />
                <SketchPage page={rightPage} side="right" />
                <span className="pointer-events-none absolute bottom-3 left-1/2 top-3 z-20 w-px -translate-x-1/2 bg-[#644a2d]/20 shadow-[0_0_18px_4px_rgba(71,48,24,0.18)]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <button
          type="button"
          onClick={() => goToStep(step - 1)}
          disabled={step === 0}
          aria-label="Previous sketchbook pages"
          className="absolute left-1 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#172019]/85 text-white shadow-lg backdrop-blur transition hover:bg-[#b5502d] disabled:pointer-events-none disabled:opacity-0 sm:-left-5 sm:h-12 sm:w-12"
        >
          <FiChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => goToStep(step + 1)}
          disabled={step === lastStep}
          aria-label="Next sketchbook pages"
          className="absolute right-1 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#172019]/85 text-white shadow-lg backdrop-blur transition hover:bg-[#b5502d] disabled:pointer-events-none disabled:opacity-0 sm:-right-5 sm:h-12 sm:w-12"
        >
          <FiChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="relative mx-auto mt-9 flex max-w-5xl items-center justify-center gap-2 sm:mt-12">
        {Array.from({ length: lastStep + 1 }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToStep(index)}
            aria-label={`Go to ${
              index === 0
                ? "front cover"
                : index === lastStep
                  ? "back cover"
                  : `spread ${index}`
            }`}
            aria-current={step === index ? "page" : undefined}
            className={`h-1.5 cursor-pointer rounded-full transition-all ${
              step === index
                ? "w-8 bg-[#d17450]"
                : "w-1.5 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default DailySketchbook;
