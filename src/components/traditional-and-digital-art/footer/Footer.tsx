import { contactDetails } from "@/data/contact";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#111713] px-5 pb-7 pt-14 text-[#f5f2eb] sm:px-8 sm:pt-16 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-[96rem]">
        <div className="grid gap-12 border-b border-white/15 pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <a href="#home" className="inline-flex items-center">
              <span className="mr-3 h-3 w-3 rounded-full bg-[#d17450]" />
              <span className="text-xl font-semibold uppercase tracking-[0.16em]">
                Yami Atelier
              </span>
            </a>
            <p className="mt-6 max-w-xl text-2xl font-medium leading-snug tracking-[-0.025em] text-[#b9c0bb] sm:text-3xl">
              Original art shaped by memory, place and imagination.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#a5aca7] sm:grid-cols-3 lg:justify-self-end"
          >
            <a href="#home" className="transition hover:text-[#d17450]">
              Home
            </a>
            <a href="#gallery" className="transition hover:text-[#d17450]">
              Gallery
            </a>
            <a href="#contact" className="transition hover:text-[#d17450]">
              Contact
            </a>
          </nav>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-xs uppercase tracking-[0.14em] text-[#737d76] sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Yami Atelier. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a
              href={`mailto:${contactDetails.email}`}
              className="transition hover:text-[#d17450]"
            >
              {contactDetails.email}
            </a>
            <a
              href={`tel:${contactDetails.phoneHref}`}
              className="transition hover:text-[#d17450]"
            >
              {contactDetails.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
