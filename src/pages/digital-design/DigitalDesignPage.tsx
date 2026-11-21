import LanguageSwitcher from "@/components/language-switcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import {
  entranceGroup,
  entranceItem,
} from "@/components/design-perfil/designMotion";
import { Link } from "@tanstack/react-router";
import { FiArrowLeft } from "react-icons/fi";
import DesignPresentation from "@/components/design-perfil/DesignPresentation";

const DigitalDesignPage = () => {
  const { t } = useTranslation();

  const reducedMotion = useReducedMotion();

  return (
    <motion.main
      initial={reducedMotion ? false : "hidden"}
      animate="visible"
      variants={entranceGroup}
      className="flex min-h-screen flex-col bg-[#1a1a1a] px-5 py-8 text-[#f5f2eb] sm:px-10  lg:px-16"
    >
      <motion.div
        variants={entranceItem}
        className="mb-8 flex w-full items-center justify-between"
      >
        <Link
          to="/"
          aria-label={t("ui.volverALaPaginaPrincipal")}
          title={t("ui.volverALaPaginaPrincipal")}
          className="group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#2d92b5] transition hover:bg-[#2d92b5]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d92b5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f2eb]"
        >
          <FiArrowLeft
            aria-hidden="true"
            className="h-5 w-5 transition-transform group-hover:-translate-x-0.5"
          />
        </Link>
        <LanguageSwitcher dark />
      </motion.div>
      <motion.h1
        variants={entranceItem}
        className="text-4xl text-center font-semibold tracking-[-0.045em] sm:text-6xl"
      >
        {t("ui.designPerfilAdobeFigmaFocus")}
      </motion.h1>
      <DesignPresentation />
    </motion.main>
  );
};

export default DigitalDesignPage;
