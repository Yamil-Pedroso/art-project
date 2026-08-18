import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import {
  applyTheme,
  getInitialTheme,
  THEME_STORAGE_KEY,
  type PortfolioTheme,
} from "@/lib/theme";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<PortfolioTheme>(() => getInitialTheme());
  const transitionTimer = useRef<number | null>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(
    () => () => {
      if (transitionTimer.current !== null) {
        window.clearTimeout(transitionTimer.current);
      }
    },
    []
  );

  const toggleTheme = () => {
    const nextTheme: PortfolioTheme = isDark ? "light" : "dark";
    document.documentElement.classList.add("theme-transitioning");
    applyTheme(nextTheme);
    setTheme(nextTheme);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // The theme still changes for the current visit.
    }

    if (transitionTimer.current !== null) {
      window.clearTimeout(transitionTimer.current);
    }
    transitionTimer.current = window.setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 650);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`group relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5502d]/55 focus-visible:ring-offset-2 sm:h-11 sm:w-11 ${
        isDark
          ? "border-white/15 bg-[#171717] text-[#f0c66c] focus-visible:ring-offset-[#171717]"
          : "border-[#172019]/15 bg-[#f5f2eb]/75 text-[#172019] focus-visible:ring-offset-[#f5f2eb]"
      }`}
    >
      <motion.span
        aria-hidden="true"
        animate={{
          x: isDark ? 7 : -7,
          rotate: isDark ? 8 : -8,
          backgroundColor: isDark ? "#b5502d" : "#d99272",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        className="absolute bottom-1.5 h-1.5 w-8 rounded-[60%_40%_55%_45%] opacity-75 blur-[0.2px]"
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -80, scale: 0.55 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 80, scale: 0.55 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex items-center justify-center"
        >
          {isDark ? (
            <FiMoon aria-hidden="true" className="h-[17px] w-[17px]" />
          ) : (
            <FiSun aria-hidden="true" className="h-[18px] w-[18px]" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
