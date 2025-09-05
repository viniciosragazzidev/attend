import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth";
import { useUser } from "@/lib/user-context";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export function SignOutButton() {
  const navigate = useNavigate();
  const { clearUser } = useUser();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
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
    <Button onClick={handleSignOut} variant="outline">
      Sair
    </Button>
  );
}
