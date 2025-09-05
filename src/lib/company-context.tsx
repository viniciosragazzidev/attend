import type { Company } from "@/types/company";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchUserCompanies } from "./companies-api";

interface CompanyContextType {
  company: Company | null;
  loading: boolean;
  error: string | null;
  refreshCompany: () => Promise<void>;
  clearCompany: () => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshCompany = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchUserCompanies();

      if (response.success && response.data) {
        setCompany(response.data);
      } else {
        setCompany(null);
      }
    } catch (err) {
      console.error("Erro ao carregar company:", err);
      setError("Erro ao carregar informações da empresa");
      setCompany(null);
    } finally {
      setLoading(false);
    }
  };

  const clearCompany = () => {
    setCompany(null);
    setError(null);
  };

  useEffect(() => {
    refreshCompany();
  }, []);

  const value: CompanyContextType = {
    company,
    loading,
    error,
    refreshCompany,
    clearCompany,
  };

  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error("useCompany deve ser usado dentro de um CompanyProvider");
  }
  return context;
}
