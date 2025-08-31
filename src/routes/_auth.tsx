import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div style={{ display: "flex" }}>
      <main style={{ flex: 1 }}>
        {/* O Outlet renderiza a rota filha aqui */}
        <Outlet />
      </main>
    </div>
  );
}
