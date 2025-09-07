// src/routes/_app.tsx

import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import LoadingPage from "@/components/loading-page";
import { AuthContext } from "@/lib/auth-context";
import { useUserCompany } from "@/lib/use-user-company";

import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/_app")({
  ssr: true,
  loader: async ({ context }) => {
    const authContext = context as { auth: AuthContext | null };

    if (authContext.auth) {
      const session = await authContext.auth.getSession();
      return { session, serverLoaded: true };
    }

    // Fallback se não tiver contexto
    return { session: null, serverLoaded: false };
  },
  component: DashboardLayout,
});

function DashboardLayout() {
  const { session: serverSession, serverLoaded } = Route.useLoaderData();

  const { refreshAll, user, loading, error } = useUserCompany();
  const navigate = useNavigate();
  const hasRedirected = useRef(false);

  // Sincroniza o contexto com os dados do servidor
  useEffect(() => {
    if (serverLoaded && serverSession?.user && !user) {
      // Se temos dados do servidor mas não no contexto, atualiza o contexto
      refreshAll();
    }
  }, [serverLoaded, serverSession, user, refreshAll]);

  // Redirecionamento automático se não houver usuário (apenas uma vez)
  useEffect(() => {
    if (!loading && !user && !serverSession?.user && !hasRedirected.current) {
      hasRedirected.current = true;
      navigate({ to: "/signin" });
    }
  }, [user, loading, navigate, serverSession]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  // Usa dados do servidor se disponível, senão do contexto
  const currentUser = serverSession?.user || user;

  // Se não há usuário, não renderiza nada (será redirecionado pelo useEffect)
  if (!currentUser) {
    return null;
  }
  console.log(currentUser);

  return (
    <div className="">
      <AuthenticatedLayout>
        <Outlet />
      </AuthenticatedLayout>
    </div>
  );
}
