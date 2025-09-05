import { ConfirmDialog } from "@/components/confirm-dialog";
import { authClient } from "@/lib/auth";
import { useUserCompany } from "@/lib/use-user-company";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

interface SignOutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
  const navigate = useNavigate();

  const { clearUser, clearCompany } = useUserCompany();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      clearCompany(); // Limpa o contexto da empresa
      clearUser(); // Limpa o contexto do usuário

      toast.success("Logout realizado com sucesso!", {
        description: "Você foi desconectado com segurança.",
      });

      // Redirecionar para login se necessário
      navigate({ to: "/signin" });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Erro ao fazer logout", {
        description: "Ocorreu um erro inesperado. Tente novamente.",
      });
    }
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Sign out"
      desc="Are you sure you want to sign out? You will need to sign in again to access your account."
      confirmText="Sign out"
      handleConfirm={handleSignOut}
      className="sm:max-w-sm"
    />
  );
}
