// Tipos baseados no schema do Drizzle
export type UserStatus = "active" | "inactive" | "invited" | "suspended";
export type UserRole = "superadmin" | "admin" | "cashier" | "manager" | "user";

// Tipo base do better-auth (o que vem da sessão)
export interface BetterAuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  isAdmin?: boolean;
  firstName?: string;
  lastName?: string;
  username?: string;
  phoneNumber?: string;
  status?: UserStatus;
  role?: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// Tipo completo do nosso sistema
export interface User extends BetterAuthUser {
  // Garantir que os campos obrigatórios tenham valores padrão
  isAdmin: boolean;
  status: UserStatus;
  role: UserRole;
}

// Tipo para criação de usuário
export interface CreateUserInput {
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  phoneNumber?: string;
  status?: UserStatus;
  role?: UserRole;
  isAdmin?: boolean;
  image?: string;
}

// Tipo para atualização de usuário
export interface UpdateUserInput {
  id: string;
  name?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  phoneNumber?: string;
  status?: UserStatus;
  role?: UserRole;
  isAdmin?: boolean;
  image?: string;
}

// Tipo para resposta da API
export interface UserResponse extends User {
  fullName?: string; // firstName + lastName
}

// Constantes para UI
export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  active: "Ativo",
  inactive: "Inativo",
  invited: "Convidado",
  suspended: "Suspenso",
};

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  superadmin: "Super Admin",
  admin: "Administrador",
  cashier: "Caixa",
  manager: "Gerente",
  user: "Usuário",
};
