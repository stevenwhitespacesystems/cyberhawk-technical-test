import { createFileRoute, Link, useRouter, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/state/auth-store";
import { useForm } from "@tanstack/react-form";
import axios from "axios";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldInfo } from "@/components/field-info";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

type LoginSearch = {
    redirect?: string;
};

export const Route = createFileRoute("/login")({
    component: Login,
    validateSearch: (search: Record<string, unknown>): LoginSearch => {
        return {
            redirect: search.redirect as string | undefined,
        };
    },
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

type LoginFormType = z.infer<typeof loginSchema>;

function Login() {
    const { toast } = useToast();
    const setAuth = useAuthStore((state) => state.setAuth);
    const router = useRouter();
    const search = useSearch({ from: Route.fullPath });

    const mutation = useMutation({
        mutationFn: async (data: LoginFormType) => {
            await axios.get("/sanctum/csrf-cookie");
            const response = await axios.post("/api/auth/login", data);
            return response.data;
        },
        onSuccess: (data) => {
            const { token, user } = data.data;
            setAuth(token, user);

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            if (search.redirect) {
                router.navigate({ to: search.redirect });
                return;
            }

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
            email: "",
            password: "",
        } as LoginFormType,
        onSubmit: async ({ value }) => {
            mutation.mutate(value);
        },
        validatorAdapter: zodValidator(),
        validators: {
            onBlur: loginSchema,
        },
    });

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
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
                            <Button type="submit" className="w-full" disabled={mutation.isPending}>
                                {mutation.isPending ? "Logging in..." : "Login"}
                            </Button>
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
