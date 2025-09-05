// src/components/company/CompanyCard.tsx

import type { Company } from "@/types/company";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  if (!company) return null;

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>{company.name}</h3>
      <div style={{ fontSize: "0.9rem", color: "#666" }}>
        <p style={{ margin: "0.25rem 0" }}>
          <strong>ID:</strong> {company.id}
        </p>
        <p style={{ margin: "0.25rem 0" }}>
          <strong>Owner ID:</strong> {company.ownerId}
        </p>
        <p style={{ margin: "0.25rem 0" }}>
          <strong>Criado em:</strong>{" "}
          {new Date(company.createdAt).toLocaleDateString("pt-BR")}
        </p>
      </div>
    </div>
  );
}
