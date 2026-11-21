import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { cvData, artShow as artShowData } from "@/data/cvData";
import imageAssets from "@/assets";

interface ExhibitionListProps {
  eyebrow: string;
  title: string;
  shows: typeof artShowData.soloShow.shows;
}

const ExhibitionList = ({ eyebrow, title, shows }: ExhibitionListProps) => (
  <section>
    <div className="mb-8 border-b border-[#172019]/15 pb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b5502d]">
        {eyebrow}
      </p>
      <h4 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#172019] sm:text-4xl">
        {title}
      </h4>
    </div>

    <div>
      {shows.map((show, index) => (
        <motion.article
          key={`${show.year}-${show.title}`}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.55,
            delay: Math.min(index * 0.04, 0.2),
            ease: [0.22, 1, 0.36, 1],
          }}
          className="group grid grid-cols-[4.5rem_1fr] gap-4 border-b border-[#172019]/10 py-6 sm:grid-cols-[6rem_1fr] sm:gap-7"
        >
          <p className="text-lg font-semibold tabular-nums text-[#b5502d] sm:text-xl">
            {show.year}
          </p>
          <div>
            <h5 className="text-lg font-semibold leading-snug text-[#172019] transition-colors group-hover:text-[#b5502d] sm:text-xl">
              {show.title}
            </h5>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#68706b] sm:text-base">
              {show.info.replace(/^\.\s*/, "")}
            </p>
          </div>
        </motion.article>
      ))}
    </div>
  </section>
);

const ArtCV = () => {
  const { t } = useTranslation();

  const profile = {
    ...cvData[0],
    ...(t("cv.profile", {
      ns: "content",
      returnObjects: true,
    }) as (typeof cvData)[0]),
  };
  const artShow = t("cv.exhibitions", {
    ns: "content",
    returnObjects: true,
  }) as typeof artShowData;
  const totalShows =
    artShow.soloShow.shows.length + artShow.groupShow.shows.length;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55 }}
      className="w-full overflow-hidden bg-[#e9e4da]"
    >
      <div className="grid bg-[#172019] text-[#f5f2eb] lg:min-h-[44rem] lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[25rem] overflow-hidden sm:min-h-[34rem] lg:min-h-full"
        >
          {profile.imageUrl && (
            <img
              src={profile.imageUrl}
              alt={t("ui.artistWorkingInTheStudio")}
              className="absolute inset-0 h-full w-full object-cover object-center grayscale"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#172019]/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#172019]/25" />
          <p className="absolute bottom-6 left-6 text-xs font-semibold uppercase tracking-[0.24em] text-white/75 sm:bottom-9 sm:left-9">
            {t("ui.inTheStudioVisualArtist")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col justify-center px-6 py-14 sm:px-10 sm:py-16 lg:px-14 xl:px-16"
        >
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full border border-white/[0.07]" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/[0.07]" />

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d17450] sm:text-sm">
            {t("ui.artistProfile")}
          </p>
          <h3 className="mt-5 text-5xl font-semibold leading-[0.96] tracking-[-0.045em] sm:text-6xl xl:text-7xl">
            {t("ui.aPracticeBetweenPlaces")}
          </h3>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#bcc2bd] sm:text-xl">
            {t(
              "ui.caribbeanRootsEuropeanInfluencesAndMoreThanFifteenYearsExploring",
            )}
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/15 pt-7">
            <div>
              <span className="block text-3xl font-semibold text-white">
                15+
              </span>
              <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-[#858f88]">
                {t("ui.years")}
              </span>
            </div>
            <div>
              <span className="block text-3xl font-semibold text-white">
                {totalShows}
              </span>
              <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-[#858f88]">
                {t("ui.exhibitions")}
              </span>
            </div>
            <div>
              <span className="block text-3xl font-semibold text-white">3</span>
              <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-[#858f88]">
                {t("ui.countries")}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[0.65fr_1.35fr] lg:gap-x-16 lg:gap-y-12 lg:px-14 lg:py-24 xl:grid-cols-[0.52fr_0.68fr_1.1fr] xl:gap-x-14 xl:px-20">
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b5502d]">
            {t("ui.curriculumVitae")}
          </p>
          <h3 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#172019] sm:text-5xl">
            {t("ui.artAsACulturalAndEmotionalLanguage")}
          </h3>
          <p className="mt-5 text-base font-medium text-[#59615c]">
            {profile.subtitle}
          </p>
        </div>

        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex h-full flex-col overflow-hidden bg-[#172019] shadow-[0_24px_65px_rgba(23,32,25,0.18)] lg:col-start-1 lg:row-start-2 xl:col-start-2 xl:row-start-1"
        >
          <div className="relative aspect-[3/4] min-h-[28rem] overflow-hidden xl:min-h-0">
            <img
              src={imageAssets.yamiDraw}
              alt={t("ui.yamiDrawingInVeniceWithASketchbook")}
              className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#172019]/85 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 text-[#f5f2eb] sm:p-7">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d99272]">
                {t("ui.travelSketchbook")}
              </span>
              <span className="mt-2 block text-xl font-semibold tracking-[-0.02em]">
                {t("ui.drawingInVenice")}
              </span>
            </figcaption>
          </div>

          <div className="flex flex-1 flex-col justify-between gap-16 px-6 py-8 text-[#f5f2eb] sm:px-7 sm:py-9 xl:gap-12">
            <div className="flex items-center justify-between border-b border-white/15 pb-4 text-[9px] font-semibold uppercase tracking-[0.26em] text-white/45">
              <span>{t("ui.fieldNotes")}</span>
              <span>{t("ui.01Venice")}</span>
            </div>

            <div>
              <span
                aria-hidden="true"
                className="block h-px w-10 bg-[#d17450]"
              />
              <p className="mt-5 max-w-xs text-2xl font-medium leading-[1.18] tracking-[-0.035em] text-white sm:text-3xl xl:text-2xl 2xl:text-3xl">
                {t("ui.drawingAsAWayOfLookingLonger")}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-[#929b95]">
                {t("ui.observingPlaceGestureAndMemoryThroughTheIntimacyOfA")}
              </p>
            </div>

            <div className="flex items-end justify-between gap-4 border-t border-white/15 pt-5">
              <div>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.24em] text-white/40">
                  {t("ui.practice")}
                </span>
                <span className="mt-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-white/75">
                  {t("ui.drawingObservation")}
                </span>
              </div>
              <span className="text-4xl font-light leading-none text-white/10">
                01
              </span>
            </div>
          </div>
        </motion.figure>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 xl:col-start-3 xl:row-span-1">
          <p className="text-lg leading-[1.85] text-[#4c5550] sm:text-xl sm:leading-[1.85]">
            {profile.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-2.5 border-t border-[#172019]/15 pt-7">
            {[
              "YETI–UNEAC",
              "San Alejandro",
              t("cv.havana", { ns: "content" }),
              t("cv.zurich", { ns: "content" }),
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#172019]/15 bg-[#f5f2eb]/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#59615c]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <motion.figure
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="grid overflow-hidden border-t border-white/10 bg-[#172019] text-[#f5f2eb] lg:min-h-[36rem] lg:grid-cols-[1.45fr_0.75fr]"
      >
        <div className="relative min-h-[24rem] overflow-hidden sm:min-h-[34rem] lg:min-h-full">
          <img
            src={imageAssets.yamiDraw1}
            alt={t("ui.yamiPaintingAtTheRembrandtHouseMuseumInAmsterdam")}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#172019]/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#172019]/30" />
          <figcaption className="absolute bottom-6 left-6 right-6 sm:bottom-9 sm:left-9 lg:hidden">
            <span className="text-[10px] font-semibold uppercase tracking-[0.27em] text-[#e1a284]">
              {t("ui.theRembrandtHouseMuseumAmsterdam")}
            </span>
          </figcaption>
        </div>

        <div className="relative flex flex-col justify-between gap-14 px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-16 xl:px-16">
          <div className="flex items-center justify-between border-b border-white/15 pb-5 text-[9px] font-semibold uppercase tracking-[0.26em] text-white/45">
            <span>{t("ui.fieldNotes")}</span>
            <span>{t("ui.02Amsterdam")}</span>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d99272]">
              {t("ui.theRembrandtHouseMuseum")}
            </p>
            <h3 className="mt-5 max-w-md text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-4xl xl:text-5xl">
              {t("ui.paintingWhereHistoryStillFeelsPresent")}
            </h3>
            <span
              aria-hidden="true"
              className="mt-7 block h-px w-12 bg-[#d17450]"
            />
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#aeb6b0] sm:text-lg">
              {t(
                "ui.aMomentOfPracticeInsideRembrandtsHouseInAmsterdamConnecting",
              )}
            </p>
          </div>

          <div className="flex items-end justify-between gap-4 border-t border-white/15 pt-5">
            <div>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.24em] text-white/40">
                {t("ui.practice")}
              </span>
              <span className="mt-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-white/75">
                {t("ui.paintingTraditionStudy")}
              </span>
            </div>
            <span className="text-5xl font-light leading-none text-white/10">
              02
            </span>
          </div>
        </div>
      </motion.figure>

      <div className="border-t border-[#172019]/10 bg-[#f5f2eb] px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24 xl:px-20">
        <div className="mb-14 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b5502d]">
            {t("ui.selectedHistory")}
          </p>
          <h3 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#172019] sm:text-5xl lg:text-6xl">
            {t("ui.exhibitionsMilestones")}
          </h3>
        </div>

        <div className="grid gap-16 xl:grid-cols-2 xl:gap-20">
          <ExhibitionList
            eyebrow={t("cv.individual", { ns: "content" })}
            title={artShow.soloShow.header}
            shows={artShow.soloShow.shows}
          />
          <ExhibitionList
            eyebrow={t("cv.collective", { ns: "content" })}
            title={artShow.groupShow.header}
            shows={artShow.groupShow.shows}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default ArtCV;
