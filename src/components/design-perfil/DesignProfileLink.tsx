import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { FiArrowUpRight, FiPenTool } from "react-icons/fi";

const DesignProfileLink = () => {
  const { t } = useTranslation();
  return (
    <Link
      to="/digital-design"
      className="group inline-flex h-14 items-center gap-3 border border-[#172019] bg-[#f5f2eb]/95 px-3 text-[#172019] shadow-[4px_4px_0_#2d92b5] transition hover:-translate-y-0.5 hover:border-[#2d92b5] hover:shadow-[4px_6px_0_#2d92b5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d92b5] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f5f2eb]"
    >
      <span
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#2d92b5] bg-[#2d92b5] text-white"
      >
        <FiPenTool className="h-5 w-5 transition-transform group-hover:-rotate-12" />
      </span>
      <span className="flex flex-col text-left">
        <span className="text-sm font-semibold tracking-[-0.02em]">
          {t("ui.uiUxDesignPerfil")}
        </span>
        <span className="mt-0.5 text-[10px] font-medium tracking-[0.1em] text-[#59615c]">
          {t("ui.adobeFigmaFocus")}
        </span>
      </span>
      <FiArrowUpRight
        aria-hidden="true"
        className="ml-2 h-4 w-4 shrink-0 text-[#2d92b5] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
};

export default DesignProfileLink;
