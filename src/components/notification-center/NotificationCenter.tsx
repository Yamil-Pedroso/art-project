import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiBell,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import type { PortfolioUpdate, PortfolioUpdateType } from "@/types/Types";

const CHECKED_UPDATES_PROMPT_KEY =
  "yami-atelier:checked-notification-prompt";

interface NotificationCenterProps {
  updates: PortfolioUpdate[];
  seenIds: Set<string>;
  hasUnseenUpdates: boolean;
  onSelect: (update: PortfolioUpdate) => void;
  onDismiss: (updateId: string) => void;
}

const copy = {
  en: {
    title: "What's new",
    intro: "Recent notes from the studio and the evolving collection.",
    open: "Open what's new",
    close: "Close what's new",
    view: "View artwork",
    remove: "Remove notification",
    empty: "There are no recent updates at the moment.",
    subscribeTitle: "Would you like to discover my next works?",
    subscribeAction: "Receive updates by email",
    soon: "Soon",
    types: {
      artwork: "New artwork",
      series: "New series",
      exhibition: "Exhibition",
      news: "Journal",
      studio: "From the studio",
    },
  },
  es: {
    title: "Novedades",
    intro: "Notas recientes del estudio y de una colección en evolución.",
    open: "Abrir novedades",
    close: "Cerrar novedades",
    view: "Ver obra",
    remove: "Eliminar notificación",
    empty: "No hay novedades recientes por el momento.",
    subscribeTitle: "¿Quieres conocer mis próximas obras?",
    subscribeAction: "Recibir novedades por email",
    soon: "Próximamente",
    types: {
      artwork: "Nueva obra",
      series: "Nueva serie",
      exhibition: "Exposición",
      news: "Noticias",
      studio: "Desde el estudio",
    },
  },
};

const NotificationCenter = ({
  updates,
  seenIds,
  hasUnseenUpdates,
  onSelect,
  onDismiss,
}: NotificationCenterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldAnimateBell, setShouldAnimateBell] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const language =
    typeof document !== "undefined" &&
    document.documentElement.lang.toLowerCase().startsWith("es")
      ? "es"
      : "en";
  const text = copy[language];
  const unseenUpdatesSignature = updates
    .filter((update) => !seenIds.has(update.id))
    .map((update) => update.id)
    .sort()
    .join("|");

  useEffect(() => {
    if (!hasUnseenUpdates || !unseenUpdatesSignature) {
      setShouldAnimateBell(false);
      return;
    }

    try {
      const checkedSignature = window.localStorage.getItem(
        CHECKED_UPDATES_PROMPT_KEY
      );
      setShouldAnimateBell(checkedSignature !== unseenUpdatesSignature);
    } catch {
      setShouldAnimateBell(true);
    }
  }, [hasUnseenUpdates, unseenUpdatesSignature]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const handleSelect = (update: PortfolioUpdate) => {
    setIsOpen(false);
    onSelect(update);
  };

  const togglePanel = () => {
    const willOpen = !isOpen;
    setIsOpen(willOpen);

    if (willOpen && unseenUpdatesSignature) {
      setShouldAnimateBell(false);
      try {
        window.localStorage.setItem(
          CHECKED_UPDATES_PROMPT_KEY,
          unseenUpdatesSignature
        );
      } catch {
        // The animation still stops for the current visit.
      }
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={togglePanel}
        aria-expanded={isOpen}
        aria-controls="portfolio-updates-panel"
        aria-label={isOpen ? text.close : text.open}
        className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#172019]/15 text-[#172019] transition hover:border-[#b5502d]/45 hover:text-[#b5502d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5502d]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f2eb]"
      >
        <motion.span
          aria-hidden="true"
          animate={
            shouldAnimateBell
              ? { rotate: [0, -13, 11, -8, 6, 0] }
              : { rotate: 0 }
          }
          transition={
            shouldAnimateBell
              ? {
                  duration: 0.9,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 11.1,
                }
              : { duration: 0.2 }
          }
          className="flex origin-top items-center justify-center"
        >
          <FiBell className="h-[18px] w-[18px]" />
        </motion.span>
        {hasUnseenUpdates && (
          <motion.span
            aria-hidden="true"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-[#b5502d] ring-2 ring-[#f5f2eb]"
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            id="portfolio-updates-panel"
            aria-label={text.title}
            initial={{ opacity: 0, y: -8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.99 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-[8.25rem] z-[80] flex max-h-[calc(100svh-9.5rem)] flex-col overflow-hidden border border-[#172019]/10 bg-[#f5f2eb]/98 text-left shadow-[0_28px_90px_rgba(23,32,25,0.2)] backdrop-blur-xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-[calc(100%+0.9rem)] sm:max-h-[min(38rem,calc(100svh-8rem))] sm:w-[25rem]"
          >
            <div className="flex items-start justify-between border-b border-[#172019]/10 px-5 py-5 sm:px-6">
              <div className="pr-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#b5502d]">
                  Yami Atelier
                </p>
                <h2 className="mt-1.5 text-2xl font-semibold tracking-[-0.035em] text-[#172019]">
                  {text.title}
                </h2>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#69706c]">
                  {text.intro}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={text.close}
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#59615c] transition hover:bg-[#172019]/5 hover:text-[#172019] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5502d]/45"
              >
                <FiX aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>

            <div className="min-h-0 overflow-y-auto overscroll-contain">
              {updates.length === 0 ? (
                <p className="px-6 py-10 text-center text-sm leading-relaxed text-[#69706c]">
                  {text.empty}
                </p>
              ) : (
                <ul className="divide-y divide-[#172019]/8">
                  {updates.map((update) => {
                    const isSeen = seenIds.has(update.id);
                    const typeLabel =
                      text.types[update.type as PortfolioUpdateType];

                    return (
                      <li key={update.id} className="relative">
                        <button
                          type="button"
                          onClick={() => handleSelect(update)}
                          className="group flex w-full cursor-pointer gap-4 py-4 pl-5 pr-14 text-left transition hover:bg-white/55 focus-visible:bg-white/70 focus-visible:outline-none sm:pl-6 sm:pr-16"
                        >
                          {update.imageUrl && (
                            <span className="h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden bg-[#e7e1d6]">
                              <img
                                src={update.imageUrl}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                              />
                            </span>
                          )}
                          <span className="min-w-0 flex-1 self-center">
                            <span className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#b5502d]">
                              {!isSeen && (
                                <span
                                  aria-label="Unread"
                                  className="h-1.5 w-1.5 rounded-full bg-[#b5502d]"
                                />
                              )}
                              {typeLabel}
                            </span>
                            <span className="mt-1.5 block truncate text-base font-semibold tracking-[-0.02em] text-[#172019]">
                              {update.title}
                            </span>
                            {update.description && (
                              <span className="mt-0.5 block truncate text-xs text-[#737975]">
                                {update.description}
                              </span>
                            )}
                            <span className="mt-2 inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4c5550] transition group-hover:text-[#b5502d]">
                              {update.type === "artwork"
                                ? text.view
                                : typeLabel}
                              <FiArrowUpRight
                                aria-hidden="true"
                                className="ml-1.5 h-3 w-3"
                              />
                            </span>
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onDismiss(update.id)}
                          aria-label={`${text.remove}: ${update.title}`}
                          title={text.remove}
                          className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#8a8f8b] transition hover:bg-[#172019]/6 hover:text-[#b5502d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5502d]/40 sm:right-4"
                        >
                          <FiTrash2 aria-hidden="true" className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="border-t border-[#172019]/10 bg-white/35 px-5 py-4 sm:px-6">
              <p className="text-sm font-medium text-[#354039]">
                {text.subscribeTitle}
              </p>
              <button
                type="button"
                disabled
                className="mt-2 inline-flex cursor-not-allowed items-center text-[10px] font-semibold uppercase tracking-[0.15em] text-[#777d79]"
              >
                {text.subscribeAction}
                <FiArrowRight aria-hidden="true" className="ml-2 h-3.5 w-3.5" />
                <span className="ml-3 border-l border-[#172019]/15 pl-3 text-[8px] tracking-[0.18em] text-[#9b9f9c]">
                  {text.soon}
                </span>
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;
