import { authClient } from "@/lib/auth";
import type {
  CompaniesResponse,
  CreateCompanyRequest,
  CreateCompanyResponse,
  UserCompanyResponse,
} from "@/types/company";

const API_BASE_URL = "http://localhost:3001";
export const getSessionCookieToken = async () => {
  // Usar o authClient para obter a sessão atual
  const session = await authClient.getSession();

  if (!session.data?.session) {
    throw new Error("Usuário não autenticado");
  }

  // Obter o token de sessão da resposta do better-auth
  const sessionToken = session.data.session.token;

  console.log(
    "Session token obtido via authClient:",
    !!sessionToken,
    sessionToken,
  );

  // Debug: verificar o formato do cookie
  const cookieValue = `better-auth.session_token=${sessionToken}`;
  console.log("Cookie sendo enviado:", cookieValue);

  return cookieValue;
};
export async function fetchCompanies(): Promise<CompaniesResponse> {
  const cookieValue = await getSessionCookieToken();

  const response = await fetch(`${API_BASE_URL}/companies`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieValue,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erro na resposta:", response.status, errorText);
    throw new Error(
      `Erro ao buscar companies: ${response.status} - ${errorText}`,
    );
  }

  return response.json();
}

export async function fetchUserCompanies(): Promise<UserCompanyResponse> {
  const cookieValue = await getSessionCookieToken();

  const response = await fetch(`${API_BASE_URL}/companies/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieValue,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erro na resposta:", response.status, errorText);
    throw new Error(
      `Erro ao buscar companies: ${response.status} - ${errorText}`,
    );
  }

  return response.json();
}

export async function createCompany(
  companyData: CreateCompanyRequest,
): Promise<CreateCompanyResponse> {
  // Usar o authClient para obter a sessão atual
  const session = await authClient.getSession();

  if (!session.data?.session) {
    throw new Error("Usuário não autenticado");
  }

  // Obter o token de sessão da resposta do better-auth
  const sessionToken = session.data.session.token;

  console.log(
    "Session token obtido via authClient para criação:",
    !!sessionToken,
    sessionToken,
  );

  // Debug: verificar o formato do cookie
  const cookieValue = `better-auth.session_token=${sessionToken}`;
  console.log("Cookie sendo enviado para criação:", cookieValue);

  const response = await fetch(`${API_BASE_URL}/companies`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieValue,
    },
    body: JSON.stringify(companyData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erro na resposta de criação:", response.status, errorText);
    throw new Error(`Erro ao criar company: ${response.status} - ${errorText}`);
  }

  return response.json();
}
