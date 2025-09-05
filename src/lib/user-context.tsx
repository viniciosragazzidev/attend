import type { BetterAuthUser, User } from "@/types/user";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { authClient } from "./auth";

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const session = await authClient.getSession();

      if (session.data?.user) {
        // Converter BetterAuthUser para User completo
        const betterAuthUser = session.data.user as BetterAuthUser;
        const userData: User = {
          ...betterAuthUser,
          isAdmin: betterAuthUser.isAdmin ?? false,
          status: betterAuthUser.status ?? "active",
          role: betterAuthUser.role ?? "user",
          image: betterAuthUser.image ?? undefined,
        };
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (err) {
      setError("Erro ao carregar informações do usuário");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const clearUser = () => {
    setUser(null);
    setError(null);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const value: UserContextType = {
    user,
    loading,
    error,
    refreshUser,
    clearUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
}
