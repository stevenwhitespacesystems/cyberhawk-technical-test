import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldApi, useForm } from "@tanstack/react-form";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-form-adapter";

// eslint-disable-next-line
function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <em>{field.state.meta.errors.join(",")}</em>
            ) : null}
            {field.state.meta.isValidating ? "Validating..." : null}
        </>
    );
}

const registerSchema = z.object({
    name: z.string().min(1, "[Form] Name is required"),
    email: z.string().email("[Form] Invalid email address"),
    password: z.string().min(8, "[Form] Password must be at least 8 characters"),
    password_confirmation: z
        .string()
        .min(8, "[Form] Password confirmation must be at least 8 characters"),
});

type RegisterFormType = z.infer<typeof registerSchema>;

export function RegisterForm() {
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        } as RegisterFormType,
        onSubmit: async ({ value }) => {
            // console.log(value);
            // const response = await axios.post("/api/register", values);
            // console.log(response);
        },
        validatorAdapter: zodValidator(),
        validators: {
            onBlur: registerSchema,
        },
    });

    return (
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
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>
                        <Button type="submit" className="w-full">
                            Register and Login
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
    );
}
