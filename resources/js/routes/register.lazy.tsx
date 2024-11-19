import { createLazyFileRoute, Link, useRouter } from "@tanstack/react-router";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldInfo } from "@/components/field-info";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/state/auth-store";

export const Route = createLazyFileRoute("/register")({
    component: Register,
});

const registerSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email(),
        password: z.string().min(8, "Password must be at least 8 characters"),
        password_confirmation: z.string().min(8, "Password confirmation is required"),
    })
    .superRefine(({ password, password_confirmation }, ctx) => {
        if (password !== password_confirmation) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Passwords do not match",
                path: ["password_confirmation"],
            });
        }
    });

type RegisterFormType = z.infer<typeof registerSchema>;

function Register() {
    const { toast } = useToast();
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const mutation = useMutation({
        mutationFn: async (data: RegisterFormType) => {
            await axios.get("/sanctum/csrf-cookie");
            const response = await axios.post("/api/register", data);
            return response.data;
        },
        onSuccess: (data) => {
            const { token, user } = data.data;
            setAuth(token, user);

            router.navigate({ to: "/interactive" });
        },
        onError: (error) => {
            if (axios.isAxiosError(error) && error.response?.data?.data) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: error.response.data.data[0],
                });
                return;
            }

            toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong",
            });
        },
    });

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        } as RegisterFormType,
        onSubmit: async ({ value }) => {
            mutation.mutate(value);
        },
        validatorAdapter: zodValidator(),
        validators: {
            onBlur: registerSchema,
        },
    });

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription>
                        Enter your name, email and password below to register an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                    >
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <form.Field name="name">
                                    {(field) => (
                                        <>
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                type="text"
                                                placeholder="John Doe"
                                                required
                                            />
                                            <FieldInfo field={field} />
                                        </>
                                    )}
                                </form.Field>
                            </div>
                            <div className="grid gap-2">
                                <form.Field name="email">
                                    {(field) => (
                                        <>
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                type="email"
                                                placeholder="m@example.com"
                                                required
                                            />
                                            <FieldInfo field={field} />
                                        </>
                                    )}
                                </form.Field>
                            </div>
                            <div className="grid gap-2">
                                <form.Field name="password">
                                    {(field) => (
                                        <>
                                            <Label htmlFor="password">Password</Label>
                                            <Input
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                type="password"
                                                required
                                                placeholder="********"
                                            />
                                            <FieldInfo field={field} />
                                        </>
                                    )}
                                </form.Field>
                            </div>
                            <div className="grid gap-2">
                                <form.Field name="password_confirmation">
                                    {(field) => (
                                        <>
                                            <Label htmlFor="password_confirmation">
                                                Password Confirmation
                                            </Label>
                                            <Input
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                type="password"
                                                required
                                                placeholder="********"
                                            />
                                            <FieldInfo field={field} />
                                        </>
                                    )}
                                </form.Field>
                            </div>
                            <Button type="submit" className="w-full" disabled={mutation.isPending}>
                                {mutation.isPending ? "Registering..." : "Register and Login"}
                            </Button>
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
