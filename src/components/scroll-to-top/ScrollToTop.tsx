import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

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
          className="group fixed bottom-5 right-4 z-40 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[#b5502d] text-white sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
        >
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-[#172019] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white opacity-0 shadow-lg transition duration-300 group-hover:opacity-100 sm:block">
            Back to top
          </span>
          <FiArrowUp
            aria-hidden="true"
            className="relative text-2xl transition-transform duration-300 group-hover:-translate-y-1 sm:text-3xl"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
