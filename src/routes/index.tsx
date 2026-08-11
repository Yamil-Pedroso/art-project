import { createFileRoute } from "@tanstack/react-router";
import ArtGallery from "@/components/art-gallery/ArtGallery";
//import UICard from "@/components/ui-cards/UICard";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full w-full flex-col">
      <ArtGallery />
    </div>
  );
}
