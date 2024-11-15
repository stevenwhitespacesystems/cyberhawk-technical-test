import { createLazyFileRoute } from '@tanstack/react-router'
import { RegisterForm } from '@/components/RegisterForm'

export const Route = createLazyFileRoute('/register')({
  component: Register,
})

function Register() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <RegisterForm />
    </div>
  )
}
