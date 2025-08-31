"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { GithubIcon, Loader, LogIn, MailIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";

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
import { Link } from "@tanstack/react-router";

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

  const onSubmit = async (data: LoginFormData) => {
    console.log("form data -->", data);
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
              <span className="bg-background text-muted-foreground px-2">
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
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="**********"
                {...register("password")}
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader className="animate-spin" />
              ) : (
                <span className="flex items-center gap-1">
                  Entrar na conta
                  <LogIn className="ml-1" />
                </span>
              )}
            </Button>
          </form>
        </CardContent>
        <div className="flex justify-center">
          <span className="text-sm text-muted-foreground ">
            <span>Ainda não tem uma conta?</span>{" "}
            <Link to="/signup" className="text-primary">
              Crie uma agora!
            </Link>
          </span>
        </div>
      </Card>
    </motion.div>
  );
}
