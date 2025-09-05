import type { User } from "@/types/user";

export interface UsersApiResponse {
  success: boolean;
  data?: User[];
  error?: string;
}

export async function fetchAllUsers(): Promise<UsersApiResponse> {
  try {
    const response = await fetch("http://localhost:3001/api/admin/users", {
      credentials: "include", // Para incluir cookies de autenticação
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
