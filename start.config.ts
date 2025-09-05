import { defineConfig } from "@tanstack/react-start";
import { createAuthContext } from "./src/lib/auth-context";

export default defineConfig({
  context: async ({ request }) => {
    try {
      // Extrai cookies da requisição
      const cookies = request.headers.get("cookie") || "";
      
      // Cria o contexto de autenticação
      const auth = createAuthContext(cookies);
      
      return {
        auth,
      };
    } catch (error) {
      console.error("Erro ao criar contexto:", error);
      return {
        auth: null,
      };
    }
  },
});
