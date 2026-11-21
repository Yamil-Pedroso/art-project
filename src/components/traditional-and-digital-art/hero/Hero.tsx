import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FiPause, FiPlay } from "react-icons/fi";
import { FaPaintBrush } from "react-icons/fa";
import imageAssets from "@/assets";
import designHero from "@/assets/images/hero/design-hero.webp";
import DesignProfileLink from "@/components/design-perfil/DesignProfileLink";

const SLIDE_DURATION = 20_000;
const slides = [
  {
    id: "art",
    label: "Traditional & digital art",
    image: imageAssets.hero,
    eyebrow: "Traditional & digital artist",
    title: "Stories shaped in color, texture and light.",
    description:
      "A personal collection of original works where Caribbean roots meet European influences across physical and digital mediums.",
  },
  {
    id: "design",
    label: "Graphic & UI/UX design",
    image: designHero,
    eyebrow: "Graphic design · UI/UX · Adobe & Figma",
    title: "Ideas shaped into thoughtful digital experiences.",
    description:
      "From visual identities to intuitive interfaces. Exploring typography, composition and interaction through Adobe and Figma.",
  },
];

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(!document.hidden);
  const heroRef = useRef<HTMLElement>(null);
  const isInView = useInView(heroRef, { amount: 0.1 });
  const reducedMotion = useReducedMotion();
  const isDesign = activeSlide === 1;
  const canRotate =
    !isPaused && !hasFocus && !reducedMotion && isPageVisible && isInView;
  const transitionDuration = reducedMotion ? 0 : 2;

  useEffect(() => {
    const handleVisibility = () => setIsPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (!canRotate) return;
    const timer = window.setTimeout(
      () => setActiveSlide((current) => (current + 1) % slides.length),
      SLIDE_DURATION,
    );
    return () => window.clearTimeout(timer);
  }, [activeSlide, canRotate]);

  return (
    <section
      ref={heroRef}
      id="home"
      aria-roledescription="carousel"
      aria-label="Art and design at Yami Atelier"
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setHasFocus(false);
      }}
      className="relative isolate flex min-h-[86svh] w-full items-center overflow-hidden px-5 pb-12 pt-48 sm:px-10 sm:pt-52 lg:min-h-[92svh] lg:px-16 lg:pt-48 xl:px-24"
    >
      {slides.map((slide, index) => (
        <motion.img
          key={slide.id}
          src={slide.image}
          alt=""
          aria-hidden="true"
          initial={false}
          animate={{
            opacity: activeSlide === index ? 1 : 0,
            scale: activeSlide === index && !reducedMotion ? 1.025 : 1,
          }}
          transition={{
            opacity: { duration: transitionDuration },
            scale: { duration: SLIDE_DURATION / 1000, ease: "linear" },
          }}
          className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
        />
      ))}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ opacity: isDesign ? 0 : 1 }}
        transition={{ duration: transitionDuration }}
        className="absolute inset-0 -z-20 bg-gradient-to-r from-[#f4eddf]/95 via-[#f4eddf]/72 to-[#172019]/20"
      />
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ opacity: isDesign ? 1 : 0 }}
        transition={{ duration: transitionDuration }}
        className="absolute inset-0 -z-10 bg-gradient-to-l from-[#eef3f3]/98 via-[#eef3f3]/85 to-[#eef3f3]/20"
      />

      <div className="w-full">
        <div className="relative">
          <motion.div
            layout={reducedMotion ? false : "position"}
            initial={false}
            transition={{
              layout: {
                duration: transitionDuration,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            className={`grid w-full max-w-4xl lg:w-[70%] ${isDesign ? "ml-auto" : "mr-auto"}`}
          >
            {slides.map((slide, index) => {
              const isActive = activeSlide === index;
              return (
                <motion.div
                  key={slide.id}
                  aria-hidden={!isActive}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    filter:
                      isActive || reducedMotion ? "blur(0px)" : "blur(12px)",
                    y: isActive || reducedMotion ? 0 : index === 0 ? -12 : 12,
                  }}
                  transition={{
                    duration: transitionDuration,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`col-start-1 row-start-1 self-end ${index === 1 ? "text-right" : "text-left"}`}
                  style={{ pointerEvents: isActive ? "auto" : "none" }}
                >
                  <p
                    className={`mb-5 text-xs font-semibold uppercase tracking-[0.25em] sm:text-sm ${index === 1 ? "text-[#236e88]" : "text-[#b5502d]"}`}
                  >
                    {slide.eyebrow}
                  </p>
                  <h1 className="theme-hero-title text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-[#172019] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                    {slide.title}
                  </h1>
                  <p
                    className={`theme-hero-description mt-7 max-w-2xl text-lg leading-relaxed text-[#354039] sm:text-xl ${index === 1 ? "ml-auto" : ""}`}
                  >
                    {slide.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="mt-9 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <a
            href="#gallery"
            className="inline-flex h-14 max-w-full items-center rounded-full bg-[#172019] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-[#b5502d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5502d] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f5f2eb] sm:px-7 sm:text-sm"
          >
            <FaPaintBrush aria-hidden="true" className="mr-3 h-5 w-5 shrink-0" />
            Explore the traditional collection
          </a>
          <DesignProfileLink />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <div
            role="group"
            aria-label="Choose Hero slide"
            className="flex items-center gap-1 rounded-full border border-[#172019]/15 bg-[#f5f2eb]/90 p-1"
          >
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Show ${slide.label}`}
                aria-pressed={activeSlide === index}
                className={`flex min-h-10 cursor-pointer items-center gap-2 rounded-full px-3 text-[10px] font-semibold tracking-[0.04em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d92b5] sm:px-4 sm:text-xs ${activeSlide === index ? "bg-[#172019] text-white" : "text-[#4c5550] hover:text-[#236e88]"}`}
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${index === 0 ? "bg-[#d99272]" : "bg-[#2d92b5]"}`}
                />
                {index === 0 ? "Art" : "Design"}
              </button>
            ))}
          </div>
          {!reducedMotion && (
            <button
              type="button"
              onClick={() => setIsPaused((current) => !current)}
              aria-label={
                isPaused ? "Resume Hero slideshow" : "Pause Hero slideshow"
              }
              aria-pressed={isPaused}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#172019]/15 bg-[#f5f2eb]/90 text-[#172019] transition hover:border-[#2d92b5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d92b5]"
            >
              {isPaused ? (
                <FiPlay aria-hidden="true" />
              ) : (
                <FiPause aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
