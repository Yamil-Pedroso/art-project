import { motion } from "framer-motion";
import { cvData, artShow } from "@/data/cvData";

interface ExhibitionListProps {
  eyebrow: string;
  title: string;
  shows: typeof artShow.soloShow.shows;
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
  const profile = cvData[0];
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
              alt="Artist working in the studio"
              className="absolute inset-0 h-full w-full object-cover object-center grayscale"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#172019]/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#172019]/25" />
          <p className="absolute bottom-6 left-6 text-xs font-semibold uppercase tracking-[0.24em] text-white/75 sm:bottom-9 sm:left-9">
            In the studio · Visual artist
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
            Artist profile
          </p>
          <h3 className="mt-5 text-5xl font-semibold leading-[0.96] tracking-[-0.045em] sm:text-6xl xl:text-7xl">
            A practice between places.
          </h3>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#bcc2bd] sm:text-xl">
            Caribbean roots, European influences and more than fifteen years
            exploring traditional and digital mediums.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/15 pt-7">
            <div>
              <span className="block text-3xl font-semibold text-white">15+</span>
              <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-[#858f88]">
                Years
              </span>
            </div>
            <div>
              <span className="block text-3xl font-semibold text-white">
                {totalShows}
              </span>
              <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-[#858f88]">
                Exhibitions
              </span>
            </div>
            <div>
              <span className="block text-3xl font-semibold text-white">3</span>
              <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-[#858f88]">
                Countries
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16 lg:px-14 lg:py-24 xl:px-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b5502d]">
            Curriculum vitae
          </p>
          <h3 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#172019] sm:text-5xl">
            Art as a cultural and emotional language.
          </h3>
          <p className="mt-5 text-base font-medium text-[#59615c]">
            {profile.subtitle}
          </p>
        </div>

        <div>
          <p className="text-lg leading-[1.85] text-[#4c5550] sm:text-xl sm:leading-[1.85]">
            {profile.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-2.5 border-t border-[#172019]/15 pt-7">
            {["YETI–UNEAC", "San Alejandro", "Havana", "Zurich"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#172019]/15 bg-[#f5f2eb]/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#59615c]"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-[#172019]/10 bg-[#f5f2eb] px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24 xl:px-20">
        <div className="mb-14 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b5502d]">
            Selected history
          </p>
          <h3 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#172019] sm:text-5xl lg:text-6xl">
            Exhibitions & milestones
          </h3>
        </div>

        <div className="grid gap-16 xl:grid-cols-2 xl:gap-20">
          <ExhibitionList
            eyebrow="Individual practice"
            title={artShow.soloShow.header}
            shows={artShow.soloShow.shows}
          />
          <ExhibitionList
            eyebrow="Collective practice"
            title={artShow.groupShow.header}
            shows={artShow.groupShow.shows}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default ArtCV;
