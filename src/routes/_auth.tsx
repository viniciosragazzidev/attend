import LoadingPage from "@/components/loading-page";
import { useUser } from "@/lib/user-context";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const hasRedirected = useRef(false);

  // Redirecionamento automático se já estiver logado (apenas uma vez)
  useEffect(() => {
    if (!loading && user && !hasRedirected.current) {
      hasRedirected.current = true;
      navigate({ to: "/dashboard" });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <LoadingPage />;
  }

  // Se já estiver logado, não renderiza nada (será redirecionado pelo useEffect)
  if (user) {
    return null;
  }

  return (
    <div style={{ display: "flex" }}>
      <main style={{ flex: 1 }}>
        {/* O Outlet renderiza a rota filha aqui */}
        <Outlet />
      </main>
    </div>
  );
}
