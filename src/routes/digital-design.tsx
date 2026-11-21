import { createFileRoute } from "@tanstack/react-router";
import DigitalDesignPage from "@/pages/digital-design/DigitalDesignPage";

export const Route = createFileRoute("/digital-design")({
  component: DigitalDesignPage,
});
