import { createFileRoute } from "@tanstack/react-router";
import WorkDetailsPage from "@/pages/traditional-and-digital-art/WorkDetailsPage";

export const Route = createFileRoute("/work-details/$workId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <WorkDetailsPage />;
}
