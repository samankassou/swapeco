import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import InputError from "@/Components/InputError";
import TextLink from "@/Components/text-link";
import { LoaderCircle } from "lucide-react";
import { Checkbox } from "@/Components/ui/checkbox";

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
    [key: string]: string | boolean;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } =
        useForm<LoginForm>({
            email: "",
            password: "",
            remember: false,
        });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Se connecter" />
            <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">
                    <div className="flex flex-col gap-6">
                        <Card className="overflow-hidden">
                            <CardContent className="grid p-0 md:grid-cols-2">
                                <form className="p-6 md:p-8" onSubmit={submit}>
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col items-center text-center">
                                            <h1 className="text-2xl font-bold">
                                                Bon retour!
                                            </h1>
                                            <p className="text-balance text-muted-foreground">
                                                Connectez-vous à votre compte
                                                SwapECO
                                            </p>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">
                                                Adresse email
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="email@example.com"
                                            />
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="flex items-center">
                                                <Label htmlFor="password">
                                                    Mot de passe oublié
                                                </Label>
                                                {canResetPassword && (
                                                    <TextLink
                                                        href={route(
                                                            "password.request"
                                                        )}
                                                        className="ml-auto text-sm"
                                                        tabIndex={5}
                                                    >
                                                        Mot de passe oublié?
                                                    </TextLink>
                                                )}
                                            </div>
                                            <Input
                                                id="password"
                                                type="password"
                                                required
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Password"
                                            />
                                            <InputError
                                                message={errors.password}
                                            />
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                tabIndex={3}
                                            />
                                            <Label htmlFor="remember">
                                                Se souvenir
                                            </Label>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="mt-4 w-full"
                                            tabIndex={4}
                                            disabled={processing}
                                        >
                                            {processing && (
                                                <LoaderCircle className="h-4 w-4 animate-spin" />
                                            )}
                                            Se connecter
                                        </Button>
                                        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                            <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                                Ou continuez avec
                                            </span>
                                        </div>
                                        <div className="grid">
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                                <span>
                                                    se connecter avec Google
                                                </span>
                                            </Button>
                                        </div>
                                        <div className="text-center text-sm">
                                            Vous n&apos;avez pas de compte?{" "}
                                            <a
                                                href="#"
                                                className="underline underline-offset-4"
                                            >
                                                S'inscrire
                                            </a>
                                        </div>
                                    </div>
                                    {status && (
                                        <div className="mb-4 text-center text-sm font-medium text-green-600">
                                            {status}
                                        </div>
                                    )}
                                </form>
                                <div className="relative hidden bg-muted md:block">
                                    <img
                                        src="/images/placeholders/placeholder.svg"
                                        alt="Image"
                                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                            En continuant, vous acceptez nos{" "}
                            <a href="#">Termes de Service</a> et notre{" "}
                            <a href="#">Politique de confidentialité</a>.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
