import { useUser } from "./user-context";
import { useCompany } from "./company-context";

export function useUserCompany() {
  const userContext = useUser();
  const companyContext = useCompany();

  return {
    user: userContext.user,
    company: companyContext.company,
    loading: userContext.loading || companyContext.loading,
    error: userContext.error || companyContext.error,
    refreshUser: userContext.refreshUser,
    refreshCompany: companyContext.refreshCompany,
    clearUser: userContext.clearUser,
    clearCompany: companyContext.clearCompany,
    refreshAll: async () => {
      await Promise.all([
        userContext.refreshUser(),
        companyContext.refreshCompany(),
      ]);
    },
  };
}
