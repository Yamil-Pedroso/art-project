import { createFileRoute } from "@tanstack/react-router";
import ArtPortfolioPage from "@/pages/traditional-and-digital-art/ArtPortfolioPage";

export const Route = createFileRoute("/")({
  component: ArtPortfolioPage,
});
