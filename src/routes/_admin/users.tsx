import { UsersPage } from "@/features/users";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/users")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UsersPage />;
}
