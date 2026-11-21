import { Link } from "@tanstack/react-router";
import { FiArrowLeft } from "react-icons/fi";
import CreativeWorkspace from "@/components/design-perfil/CreativeWorkspace";

const DigitalDesignPage = () => (
  <main className="flex min-h-screen flex-col bg-[#f5f2eb] px-5 py-10 text-[#172019] sm:px-10 sm:py-16 lg:px-16">
    <Link
      to="/"
      aria-label="Volver a la página principal"
      title="Volver a la página principal"
      className="group mb-8 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#2d92b5] transition hover:bg-[#2d92b5]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d92b5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f2eb]"
    >
      <FiArrowLeft
        aria-hidden="true"
        className="h-5 w-5 transition-transform group-hover:-translate-x-0.5"
      />
    </Link>
    <h1 className="text-4xl text-center font-semibold tracking-[-0.045em] sm:text-6xl">
      Design Perfil Adobe &amp; Figma Focus
    </h1>
    <CreativeWorkspace />
  </main>
);

export default DigitalDesignPage;
