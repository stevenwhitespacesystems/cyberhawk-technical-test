import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { FieldInfo } from "./FieldInfo";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

type LoginFormType = z.infer<typeof loginSchema>;

export function LoginForm() {
    const { toast } = useToast();
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        } as LoginFormType,
        onSubmit: async ({ value }) => {
            try {
                await axios.post("/api/login", value);
                // navigate({ to: "/verify-email" });
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.data?.data) {
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: error.response.data.data,
                    });

                    return;
                }

                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Something went wrong",
                });
            }
        },
        validatorAdapter: zodValidator(),
        validators: {
            onBlur: loginSchema,
        },
    });

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>Enter your email below to login to your account</CardDescription>
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
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>
                        <Button type="submit" className="w-full">
                            Login
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
    );
}
