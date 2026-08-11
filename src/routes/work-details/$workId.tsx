import { createFileRoute } from "@tanstack/react-router";
import WorkDetailsPage from "@/pages/WorkDetailsPage";

export const Route = createFileRoute("/work-details/$workId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <WorkDetailsPage />;
}
