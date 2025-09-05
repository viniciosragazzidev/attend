// src/routes/_app/companies.tsx

import { CompanyCard } from "@/components/company/company-card";
import { CreateCompanyForm } from "@/components/company/CreateCompanyForm";
// Supondo a criação de um novo componente de card
import { fetchCompanies, fetchUserCompanies } from "@/lib/companies-api";
import { useUser } from "@/lib/user-context";
import type { Company } from "@/types/company";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_app/companies")({
  component: CompaniesPage,
});

function CompaniesPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { user } = useUser();
  const queryClient = useQueryClient();

  // ✨ Query para buscar todas as companies (apenas para admins)
  const {
    data: companies = [],
    isLoading: isAdminLoading,
    isError: isAdminError,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
    enabled: !!user?.isAdmin,
    // ✨ ADICIONE ESTA LINHA para selecionar apenas o array de dados
    select: (response) => response.data,
  });
  // ✨ Query para buscar a company do usuário logado
  // ...

  const {
    data: userCompany,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["userCompany", user?.id],
    queryFn: fetchUserCompanies,
    enabled: !!user,
    // ✨ ADICIONE ESTA LINHA para selecionar o objeto da empresa
    select: (response) => response.data,
  });

  // ...
  // Função chamada quando uma nova empresa é criada com sucesso
  const handleCompanyCreated = (newCompany: Company) => {
    // Invalida a query 'companies', forçando o TanStack Query a buscar os dados novamente.
    // Isso garante que a lista esteja sempre atualizada com o servidor.
    queryClient.invalidateQueries({ queryKey: ["companies"] });

    // Se a empresa criada for do usuário logado, atualiza a query dele também
    // Opcional: pode ser útil dependendo da lógica do seu backend
    queryClient.setQueryData(["userCompany", user?.id], newCompany);

    setShowCreateForm(false);
  };

  // Condição de loading unificada
  if (isAdminLoading || isUserLoading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Carregando empresas...</p>
      </div>
    );
  }

  // Tratamento de erro unificado (opcional, pode ser mais granular)
  if (isAdminError || isUserError) {
    return (
      <div style={{ padding: "2rem", color: "red", textAlign: "center" }}>
        <p>Ocorreu um erro ao buscar as empresas.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Empresas</h1>

      {/* Botão para criar nova empresa */}
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setShowCreateForm(true)} className="btn-create">
          + Criar Nova Empresa
        </button>
      </div>

      {/* Formulário de criação */}
      {showCreateForm && (
        <div style={{ marginBottom: "2rem" }}>
          <CreateCompanyForm
            onCompanyCreated={handleCompanyCreated}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}

      {/* Seção do Admin */}
      {user?.isAdmin && (
        <>
          <h2>Todas as Empresas ({companies.length})</h2>
          {companies.length === 0 ? (
            <p>Nenhuma empresa encontrada.</p>
          ) : (
            <div className="grid-container">
              {companies.map((company) => (
                // 💡 Usando o componente reutilizável CompanyCard
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Seção do Usuário */}
      <div style={{ marginTop: "2rem" }}>
        <h2>Sua Empresa</h2>
        {userCompany ? (
          // 💡 Usando o mesmo componente reutilizável
          <CompanyCard company={userCompany} />
        ) : (
          <p>Você ainda não possui uma empresa cadastrada.</p>
        )}
      </div>
    </div>
  );
}
