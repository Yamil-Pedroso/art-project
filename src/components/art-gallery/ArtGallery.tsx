import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Route as ArtWorkDetailsRoute } from "@/routes/work-details/$workId";
import { useNavigate } from "@tanstack/react-router";
import { artworks } from "@/data/artworks";
import imageAssets from "@/assets";
import CategoryMenu from "../category-menu/CategoryMenu";
import UICard from "../ui-cards/UICard";
import ArtCV from "../art-cv/ArtCV";
import ExhibitionCollector from "../exhibition-collectors/Exhibition&Collector";
import EmptyCollection from "./EmptyCollection";
import ContactSection from "../contact/ContactSection";
import Footer from "../footer/Footer";
import { contactDetails } from "@/data/contact";
import ScrollToTop from "../scroll-to-top/ScrollToTop";

const ArtGallery = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleArtworkClick = (workId: number) => {
    navigate({
      to: ArtWorkDetailsRoute.to,
      params: { workId: String(workId) },
    });
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleNavCategory = (category: string) => {
    setSelectedCategory(category);
    setIsMenuOpen(false);
  };

  const filteredArtworks =
    selectedCategory === "All"
      ? artworks.filter((art) => art.id !== undefined) // para excluir el CV
      : artworks.filter(
          (art) => art.category === selectedCategory && art.id !== undefined
        );

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#f5f2eb]">
      <header className="absolute inset-x-0 top-0 z-50 px-4 pt-3 sm:px-8 sm:pt-5 lg:px-12 xl:px-16">
        <div className="mx-auto w-full border border-[#172019]/10 bg-[#f5f2eb]/75 shadow-[0_12px_40px_rgba(23,32,25,0.08)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 border-b border-[#172019]/10 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#59615c] sm:px-6 sm:text-xs lg:px-8">
            <div className="flex min-w-0 items-center gap-4 sm:gap-7">
              <a
                href={`mailto:${contactDetails.email}`}
                className="truncate transition hover:text-[#b5502d]"
              >
                <span aria-hidden="true" className="mr-2 text-[#b5502d]">
                  ✉
                </span>
                {contactDetails.email}
              </a>
              <a
                href={`tel:${contactDetails.phoneHref}`}
                className="hidden whitespace-nowrap transition hover:text-[#b5502d] sm:block"
              >
                <span aria-hidden="true" className="mr-2 text-[#b5502d]">
                  ☎
                </span>
                {contactDetails.phoneDisplay}
              </a>
            </div>
            <span className="hidden whitespace-nowrap text-[#7b817d] md:block">
              Visual artist · {contactDetails.location}
            </span>
          </div>

          <nav
            aria-label="Main navigation"
            className="flex h-[4.5rem] items-center justify-between px-4 sm:px-6 lg:px-8"
          >
            <a
              href="#home"
              onClick={() => setIsMenuOpen(false)}
              className="group inline-flex items-center text-[#172019]"
            >
              <span className="mr-3 h-3 w-3 rounded-full bg-[#b5502d] transition-transform group-hover:scale-125" />
              <span className="text-lg font-semibold uppercase tracking-[0.14em] sm:text-xl">
                Yami Atelier
              </span>
            </a>

            <div className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[0.14em] text-[#4c5550] lg:flex xl:gap-9">
              <a href="#home" className="transition hover:text-[#b5502d]">
                Home
              </a>
              <a
                href="#gallery"
                onClick={() => handleNavCategory("All")}
                className="transition hover:text-[#b5502d]"
              >
                Gallery
              </a>
              <a
                href="#gallery"
                onClick={() => handleNavCategory("Exhibitions & Collectors")}
                className="transition hover:text-[#b5502d]"
              >
                Exhibitions
              </a>
              <a
                href="#gallery"
                onClick={() => handleNavCategory("Art CV")}
                className="transition hover:text-[#b5502d]"
              >
                Art CV
              </a>
              <a
                href="#contact"
                className="rounded-full bg-[#172019] px-5 py-3 text-white transition hover:-translate-y-0.5 hover:bg-[#b5502d]"
              >
                Contact
              </a>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full border border-[#172019]/15 text-[#172019] lg:hidden"
            >
              <span
                className={`h-px w-5 bg-current transition ${
                  isMenuOpen ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-current transition ${
                  isMenuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </nav>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                id="mobile-navigation"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden border-t border-[#172019]/10 lg:hidden"
              >
                <div className="grid px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#4c5550]">
                  <a
                    href="#home"
                    onClick={() => setIsMenuOpen(false)}
                    className="border-b border-[#172019]/10 py-3"
                  >
                    Home
                  </a>
                  <a
                    href="#gallery"
                    onClick={() => handleNavCategory("All")}
                    className="border-b border-[#172019]/10 py-3"
                  >
                    Gallery
                  </a>
                  <a
                    href="#gallery"
                    onClick={() =>
                      handleNavCategory("Exhibitions & Collectors")
                    }
                    className="border-b border-[#172019]/10 py-3"
                  >
                    Exhibitions
                  </a>
                  <a
                    href="#gallery"
                    onClick={() => handleNavCategory("Art CV")}
                    className="border-b border-[#172019]/10 py-3"
                  >
                    Art CV
                  </a>
                  <a
                    href={`tel:${contactDetails.phoneHref}`}
                    className="pt-4 text-[#b5502d] sm:hidden"
                  >
                    {contactDetails.phoneDisplay}
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <section
        id="home"
        className="relative isolate flex min-h-[86svh] w-full items-center overflow-hidden px-5 pb-24 pt-48 sm:px-10 sm:pt-52 lg:min-h-[92svh] lg:px-16 lg:pt-48 xl:px-24"
      >
        <img
          src={imageAssets.hero}
          alt="Textura abstracta de pintura al óleo"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#f4eddf]/95 via-[#f4eddf]/72 to-[#172019]/20" />
        <div className="w-full max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#b5502d] sm:text-base"
          >
            Traditional & digital artist
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-[#172019] sm:text-6xl lg:text-8xl"
          >
            Stories shaped in color, texture and light.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-[#354039] sm:text-xl"
          >
            A personal collection of original works where Caribbean roots meet
            European influences across physical and digital mediums.
          </motion.p>
          <motion.a
            href="#gallery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28 }}
            className="mt-9 inline-flex items-center rounded-full bg-[#172019] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-[#b5502d]"
          >
            Explore the collection
            <span aria-hidden="true" className="ml-3 text-lg">
              ↓
            </span>
          </motion.a>
        </div>
      </section>

      <section
        id="gallery"
        className="min-h-screen w-full scroll-mt-4 px-4 pb-20 pt-14 sm:px-8 sm:pb-24 sm:pt-16 lg:px-12 lg:pb-28 lg:pt-20 xl:px-16"
      >
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#b5502d]">
            The collection
          </p>
          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#172019] sm:text-5xl lg:text-6xl">
            Selected artworks
          </h2>
          <div className="mx-auto my-5 h-px w-20 bg-[#b5502d]/55" />
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#59615c] sm:text-lg">
            Explore original pieces across traditional and digital mediums,
            each shaped by memory, imagination and lived experience.
          </p>
        </div>

        <CategoryMenu
          onSelect={handleCategorySelect}
          activeCategory={selectedCategory}
        />

        {selectedCategory === "Art CV" ? (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ArtCV />
          </motion.div>
        ) : selectedCategory === "Exhibitions & Collectors" ? (
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ExhibitionCollector />
            </motion.div>
          </AnimatePresence>
        ) : filteredArtworks.length === 0 ? (
          <EmptyCollection
            category={selectedCategory}
            onExploreAll={() => setSelectedCategory("All")}
          />
        ) : (
          <div className="grid w-full grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredArtworks.map((artwork, index) => (
              <UICard
                key={artwork.id}
                artwork={artwork}
                index={index}
                onClick={() => handleArtworkClick(artwork.id as number)}
              />
            ))}
          </div>
        )}
      </section>
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
};
export default ArtGallery;
