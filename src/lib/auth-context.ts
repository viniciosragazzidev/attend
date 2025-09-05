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
