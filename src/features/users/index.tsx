import { ConfigDrawer } from "@/components/config-drawer";
import { Header } from "@/components/layout/header";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { useUser } from "@/lib/user-context";
import { fetchAllUsers } from "@/lib/users-api";
import type { User } from "@/types/user";
import { useEffect, useState } from "react";
import { UsersProvider } from "./components/users-provider";
import { UsersTable } from "./components/users-table";

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const loadUsers = async () => {
      if (!user?.isAdmin) {
        setError("Acesso negado");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetchAllUsers();

        if (response.success && response.data) {
          // Mapear dados do backend para o formato esperado
          const mappedUsers = response.data.map((user) => ({
            ...user,
            image: user.image ?? undefined,
            firstName: user.firstName ?? undefined,
            lastName: user.lastName ?? undefined,
            username: user.username ?? undefined,
            phoneNumber: user.phoneNumber ?? undefined,
          }));
          setUsers(mappedUsers);
        } else {
          setError(response.error || "Erro ao carregar usuários");
        }
      } catch (err) {
        setError("Erro ao carregar usuários");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [user]);

  if (loading) {
    return <div>Carregando usuários...</div>;
  }

  if (error) {
    return <div className="text-red-600">Erro: {error}</div>;
  }

  return (
    <UsersProvider>
      <Header fixed>
        <Search />
        <div className="ms-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Gerenciar Usuários</h1>
          <p className="text-gray-600">
            Visualize e gerencie todos os usuários do sistema
          </p>
        </div>

        <UsersTable data={users} search={{}} navigate={() => {}} />
      </div>
    </UsersProvider>
  );
}
