import RegisterForm from "@/components/auth/signup-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/signup")({
  component: SignupPage,
});

function SignupPage() {
  return (
    <div className="max-w-md flex justify-center items-center h-screen mx-auto">
      <RegisterForm />
    </div>
  );
}
