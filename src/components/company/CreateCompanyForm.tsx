import { createCompany } from "@/lib/companies-api";
import type { CreateCompanyRequest } from "@/types/company";
import { useState } from "react";

interface CreateCompanyFormProps {
  onCompanyCreated?: (company: any) => void;
  onCancel?: () => void;
}

export function CreateCompanyForm({
  onCompanyCreated,
  onCancel,
}: CreateCompanyFormProps) {
  const [formData, setFormData] = useState<CreateCompanyRequest>({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Nome da empresa é obrigatório");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await createCompany(formData);

      console.log("Company criada com sucesso:", response);

      // Limpar o formulário
      setFormData({ name: "" });

      // Notificar o componente pai
      if (onCompanyCreated) {
        onCompanyCreated(response.data);
      }
    } catch (err) {
      console.error("Erro ao criar company:", err);
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpar erro quando o usuário começar a digitar
    if (error) {
      setError(null);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1.5rem",
        borderRadius: "8px",
        backgroundColor: "#fff",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: "1rem" }}>Criar Nova Empresa</h3>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="name"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Nome da Empresa *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Digite o nome da empresa"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
          />
        </div>

        {error && (
          <div
            style={{
              color: "red",
              marginBottom: "1rem",
              padding: "0.5rem",
              backgroundColor: "#ffe6e6",
              border: "1px solid #ffcccc",
              borderRadius: "4px",
            }}
          >
            {error}
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            justifyContent: "flex-end",
          }}
        >
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              style={{
                padding: "0.5rem 1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#f5f5f5",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              Cancelar
            </button>
          )}

          <button
            type="submit"
            disabled={loading || !formData.name.trim()}
            style={{
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              backgroundColor: loading ? "#ccc" : "#007bff",
              color: "white",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: !formData.name.trim() || loading ? 0.6 : 1,
            }}
          >
            {loading ? "Criando..." : "Criar Empresa"}
          </button>
        </div>
      </form>
    </div>
  );
}
