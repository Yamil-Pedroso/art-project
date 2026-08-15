import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import type { PortfolioUpdate } from "@/types/Types";

interface NewArtworkNotificationProps {
  update?: PortfolioUpdate;
  isSeen: boolean;
  onSeen: (updateId: string) => void;
  onView: (update: PortfolioUpdate) => void;
}

const copy = {
  en: {
    artworkEyebrow: "New artwork",
    artworkAction: "View artwork",
    sketchEyebrow: "New daily sketch",
    sketchAction: "View sketchbook",
    close: "Dismiss notification",
  },
  es: {
    artworkEyebrow: "Nueva obra",
    artworkAction: "Ver obra",
    sketchEyebrow: "Nuevo sketch diario",
    sketchAction: "Ver libreta",
    close: "Cerrar notificación",
  },
};

const NewArtworkNotification = ({
  update,
  isSeen,
  onSeen,
  onView,
}: NewArtworkNotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const language =
    typeof document !== "undefined" &&
    document.documentElement.lang.toLowerCase().startsWith("es")
      ? "es"
      : "en";
  const text = copy[language];
  const isSketch = update?.type === "sketch";
  const eyebrow = isSketch ? text.sketchEyebrow : text.artworkEyebrow;
  const action = isSketch ? text.sketchAction : text.artworkAction;

  useEffect(() => {
    if (!update?.id || !update.imageUrl || isSeen) {
      setIsVisible(false);
      return;
    }

    const timer = window.setTimeout(() => setIsVisible(true), 900);
    return () => window.clearTimeout(timer);
  }, [isSeen, update?.id, update?.imageUrl]);

  const rememberAsSeen = () => {
    if (update?.id) onSeen(update.id);
    setIsVisible(false);
  };

  const handleView = () => {
    if (!update) return;
    rememberAsSeen();
    onView(update);
  };

  return (
    <AnimatePresence>
      {isVisible && update?.id && update.imageUrl && (
        <motion.aside
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-4 right-4 z-[70] overflow-hidden border border-white/10 bg-[#172019]/95 text-white shadow-[0_22px_70px_rgba(15,21,17,0.32)] backdrop-blur-xl sm:bottom-7 sm:left-auto sm:right-7 sm:w-[23rem]"
        >
          <div className="flex min-h-28">
            <div className="relative w-24 shrink-0 overflow-hidden bg-[#2b342e] sm:w-28">
              <img
                src={update.imageUrl}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#172019]/20" />
            </div>

            <div className="min-w-0 flex-1 px-4 py-4 pr-10">
              <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-[#d99272]">
                {eyebrow}
              </p>
              <p className="mt-1.5 truncate text-base font-semibold tracking-[-0.02em]">
                {update.title}
              </p>
              <button
                type="button"
                onClick={handleView}
                className="group mt-3 inline-flex cursor-pointer items-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d7ddd8] transition hover:text-[#d99272]"
              >
                {action}
                <FiArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={rememberAsSeen}
              aria-label={text.close}
              className="absolute right-2.5 top-2.5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white/55 transition hover:bg-white/10 hover:text-white"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
          <span className="absolute bottom-0 left-0 h-0.5 w-16 bg-[#b5502d]" />
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default NewArtworkNotification;
