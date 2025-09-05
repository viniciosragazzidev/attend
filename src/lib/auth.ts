import { createAuthClient } from "better-auth/react";
// src/lib/auth.ts

// A URL base do seu servidor Fastify (backend)
const apiUrl = "http://localhost:3001";

// A porta 3000 é a padrão do TanStack Start
const clientUrl = "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3001/api/auth",
  // Adicionar configurações adicionais se necessário
});
