import { Dashboard } from "@/features/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  // const { user, loading, error, refreshUser } = useUser();

  return <Dashboard />;
}
