import { ConfigDrawer } from "@/components/config-drawer";
import { Header } from "@/components/layout/header";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { fetchAllCompanies } from "@/lib/companies-api";
import { useUser } from "@/lib/user-context";
import { useEffect, useState } from "react";
import { CompaniesTable } from "./components/companies-table";

export function CompaniesPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const loadCompanies = async () => {
      if (!user?.isAdmin) {
        setError("Acesso negado");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetchAllCompanies();

        if (response.success && response.data) {
          setCompanies(response.data);
        } else {
          setError(response.error || "Erro ao carregar empresas");
        }
      } catch (err) {
        console.error("Erro ao carregar empresas:", err);
        setError("Erro ao carregar empresas");
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, [user]);

  if (loading) {
    return <div>Carregando empresas...</div>;
  }

  if (error) {
    return <div className="text-red-600">Erro: {error}</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Header />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Search />
          <div className="relative ml-auto flex-1 md:grow-0">
            <ThemeSwitch />
          </div>
          <ProfileDropdown />
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="container mx-auto py-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Gerenciar Empresas</h1>
              <p className="text-muted-foreground">
                Visualize e gerencie todas as empresas do sistema
              </p>
            </div>
            <CompaniesTable data={companies} search={{}} navigate={() => {}} />
          </div>
        </main>
      </div>
      <ConfigDrawer />
    </div>
  );
}
