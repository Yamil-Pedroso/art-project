import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { contactDetails } from "@/data/contact";

const ContactSection = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const subject = String(formData.get("subject") || "Artwork inquiry");
    const message = String(formData.get("message") || "");
    const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");

    window.location.href = `mailto:${contactDetails.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      id="contact"
      className="relative w-full scroll-mt-6 overflow-hidden bg-[#dcd5c8] px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16"
    >
      <div className="pointer-events-none absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full border border-[#172019]/[0.06]" />
      <div className="pointer-events-none absolute -left-16 -top-16 h-[18rem] w-[18rem] rounded-full border border-[#172019]/[0.06]" />

      <div className="relative mx-auto grid max-w-[96rem] overflow-hidden shadow-[0_30px_90px_rgba(23,32,25,0.14)] lg:grid-cols-[0.82fr_1.18fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col justify-between overflow-hidden bg-[#172019] px-7 py-12 text-[#f5f2eb] sm:px-10 sm:py-14 lg:min-h-[42rem] lg:px-12 lg:py-16"
        >
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full border border-white/[0.07]" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/[0.07]" />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d17450] sm:text-sm">
              Start a conversation
            </p>
            <h2 className="mt-5 max-w-xl text-5xl font-semibold leading-[0.96] tracking-[-0.045em] sm:text-6xl">
              Let’s create something meaningful.
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-[#b9c0bb]">
              Interested in an original work, a commission or a creative
              collaboration? Tell me a little about what you have in mind.
            </p>
          </div>

          <div className="relative mt-12 space-y-5 border-t border-white/15 pt-8 text-sm">
            <a
              href={`mailto:${contactDetails.email}`}
              className="group flex items-center justify-between gap-4 text-white transition hover:text-[#d17450]"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#858f88]">
                Email
              </span>
              <span className="truncate">{contactDetails.email}</span>
            </a>
            <a
              href={`tel:${contactDetails.phoneHref}`}
              className="group flex items-center justify-between gap-4 text-white transition hover:text-[#d17450]"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#858f88]">
                Telephone
              </span>
              <span>{contactDetails.phoneDisplay}</span>
            </a>
            <div className="flex items-center justify-between gap-4 text-white">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#858f88]">
                Based in
              </span>
              <span>{contactDetails.location}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#f5f2eb] px-7 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
        >
          <div className="mb-10 flex items-end justify-between border-b border-[#172019]/15 pb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b5502d]">
                Contact form
              </p>
              <h3 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#172019] sm:text-4xl">
                Send an inquiry
              </h3>
            </div>
            <span className="hidden text-sm text-[#858c87] sm:block">01 — 04</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-8 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6d746f]">
                  Your name
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Name and surname"
                  className="mt-3 w-full border-0 border-b border-[#172019]/25 bg-transparent px-0 py-3 text-base text-[#172019] outline-none transition placeholder:text-[#9ca19e] focus:border-[#b5502d]"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6d746f]">
                  Email address
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="mt-3 w-full border-0 border-b border-[#172019]/25 bg-transparent px-0 py-3 text-base text-[#172019] outline-none transition placeholder:text-[#9ca19e] focus:border-[#b5502d]"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6d746f]">
                Subject
              </span>
              <select
                name="subject"
                defaultValue="Artwork inquiry"
                className="mt-3 w-full cursor-pointer appearance-none border-0 border-b border-[#172019]/25 bg-transparent px-0 py-3 text-base text-[#172019] outline-none transition focus:border-[#b5502d]"
              >
                <option>Artwork inquiry</option>
                <option>Commission request</option>
                <option>Exhibition proposal</option>
                <option>Creative collaboration</option>
                <option>Other</option>
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6d746f]">
                Your message
              </span>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me about your idea, the artwork you are interested in or your project..."
                className="mt-3 w-full resize-none border-0 border-b border-[#172019]/25 bg-transparent px-0 py-3 text-base leading-relaxed text-[#172019] outline-none transition placeholder:text-[#9ca19e] focus:border-[#b5502d]"
              />
            </label>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-xs leading-relaxed text-[#858c87]">
                Submitting opens your email app with this message prepared for
                sending.
              </p>
              <button
                type="submit"
                className="group inline-flex cursor-pointer items-center justify-center rounded-full bg-[#172019] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-[#b5502d]"
              >
                Send inquiry
                <span
                  aria-hidden="true"
                  className="ml-3 transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
