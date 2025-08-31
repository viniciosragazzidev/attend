import LoginForm from "@/components/auth/signin-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/signin")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="max-w-md flex justify-center items-center h-screen mx-auto">
      <LoginForm />
    </div>
  );
}
