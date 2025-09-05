import { createRouter as createTanstackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export interface AuthContext {
  cookies: string;
  getSession: () => Promise<any>;
}

export function createAuthContext(cookies: string): AuthContext {
  return {
    cookies,
    getSession: async () => {
      try {
        const response = await fetch("http://localhost:3001/api/auth/me", {
          headers: { cookie: cookies },
        });

        if (response.ok) {
          return await response.json();
        }
      } catch (error) {
        console.error("Erro ao obter sessão:", error);
      }
      return null;
    },
  };
}

export const createRouter = (cookies?: string) => {
  return createTanstackRouter({
    routeTree,
    context: {
      auth: cookies ? createAuthContext(cookies) : null,
    },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }

  interface RouterContext {
    auth: AuthContext | null;
  }
}
