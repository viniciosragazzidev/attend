"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { GithubIcon, Loader, MailIcon, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

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
import { useUser } from "@/lib/user-context";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";

const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  lastName: z.string().min(3, "Last name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type registerFormData = z.infer<typeof registerSchema>;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<registerFormData>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();
  const { refreshUser } = useUser();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: registerFormData) => {
      const { name, lastName, email, password } = data;

      const result = await authClient.signUp.email({
        email,
        password,
        name: `${name} ${lastName}`,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
      return result;
    },
    onSuccess: async () => {
      await refreshUser();
      
      toast.success("Conta criada com sucesso!", {
        description: "Bem-vindo! Sua conta foi criada e você já está logado.",
      });

      navigate({ to: "/dashboard" });
    },
    onError: (error) => {
      console.error("Signup failed:", error.message);
      toast.error("Erro ao criar conta", {
        description: error.message || "Tente novamente ou use um email diferente.",
      });
    },
  });

  const onSubmit = async (data: registerFormData) => {
    mutate(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full border-border/50 md:w-[400px]">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center">
            <div className="w-34 flex">
              <img src="/logo.svg" alt="Kyper" className="w-full" />
            </div>
          </div>
          <CardTitle className="text-lg">Criar nova conta</CardTitle>
          <CardDescription>
            Preencha os dados abaixo para criar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="João"
                  {...register("name")}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Sobrenome</Label>
                <Input
                  id="lastName"
                  placeholder="Silva"
                  {...register("lastName")}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName.message}</p>
                )}
              </div>
            </div>
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
                <p className="text-sm text-red-500">{errors.password.message}</p>
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
                  Criando conta...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Criar conta
                </>
              )}
            </Button>
          </form>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Já tem uma conta?{" "}
            </span>
            <Link
              to="/signin"
              className="text-primary hover:underline font-medium"
            >
              Faça login
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
