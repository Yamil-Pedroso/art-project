import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiBrushAiFill } from "react-icons/ri";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 520);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to the top"
          initial={{ opacity: 0, scale: 0.75, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.75, y: 18 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-5 right-4 z-40 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[#b5502d] text-white shadow-[0_16px_40px_rgba(23,32,25,0.3)] sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
        >
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-[#172019] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white opacity-0 shadow-lg transition duration-300 group-hover:opacity-100 sm:block">
            Back to top
          </span>
          <span className="absolute -bottom-1 left-1/2 h-2 w-8 -translate-x-1/2 rounded-full bg-[#d58a69]/60 blur-[2px] transition-all duration-300 group-hover:w-10" />
          <RiBrushAiFill className="relative text-2xl transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110 sm:text-3xl" />
          <span
            aria-hidden="true"
            className="absolute right-2 top-1.5 text-[10px] font-bold sm:right-2.5 sm:top-2"
          >
            ↑
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
