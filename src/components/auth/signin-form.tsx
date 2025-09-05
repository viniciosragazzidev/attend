"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { GithubIcon, Loader, LogIn, MailIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth";
import { useUserCompany } from "@/lib/use-user-company";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const { refreshAll } = useUserCompany();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const { email, password } = data;

      // Chama o endpoint de login no backend Fastify
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
      return result;
    },
    onSuccess: async () => {
      // Atualiza ambos os contextos
      await refreshAll();

      toast.success("Login realizado com sucesso!", {
        description: "Bem-vindo de volta!",
      });

      // Redireciona o usuário após o login bem-sucedido
      navigate({ to: "/dashboard" });
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
      toast.error("Erro ao fazer login", {
        description:
          error.message || "Verifique suas credenciais e tente novamente.",
      });
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full border-border/50  md:w-[350px]">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center">
            {" "}
            <div className="w-34 flex">
              <img src="/logo.svg" alt="Kyper" className="w-full" />
            </div>
          </div>
          <CardTitle className="text-lg">Bem vindo de volta!</CardTitle>
          <CardDescription>
            Informe suas credencias para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              <MailIcon />
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <GithubIcon />
              GitHub
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continue com
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isPending || isSubmitting}
            >
              {isPending || isSubmitting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Entrar
                </>
              )}
            </Button>
          </form>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Não tem uma conta? </span>
            <Link
              to="/signup"
              className="text-primary hover:underline font-medium"
            >
              Cadastre-se
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
