import { CompaniesPage } from "@/features/companies";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/companies")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CompaniesPage />;
}
