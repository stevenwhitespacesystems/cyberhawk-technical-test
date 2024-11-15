import { createLazyFileRoute } from '@tanstack/react-router'
import { LoginForm } from "@/components/LoginForm"

export const Route = createLazyFileRoute('/login')({
  component: Login,
})

function Login() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}
