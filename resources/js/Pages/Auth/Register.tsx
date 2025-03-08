import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import InputError from "@/Components/InputError";
import TextLink from "@/Components/text-link";
import { LoaderCircle } from "lucide-react";
import GuestLayout from "@/Layouts/GuestLayout";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";

interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    [key: string]: string;
}

const roles = [
    {
        id: "eco-company",
        name: "Eco-Entreprise",
    },
    {
        id: "eco-contributor",
        name: "Eco-Contributeur",
    },
    {
        id: "territory-promoter",
        name: "Promoteur de territoire",
    },
] as const;

export default function Register() {
    const { data, setData, post, processing, errors, reset } =
        useForm<RegisterForm>({
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            role: "",
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="S'inscrire" />
            <div className="flex flex-col gap-6">
                <Card className="overflow-hidden">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <form className="p-6 md:p-8" onSubmit={submit}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">
                                        Créer un compte
                                    </h1>
                                    <p className="text-balance text-muted-foreground">
                                        Entrez vos informations ci-dessous pour
                                        créer votre compte sur SwapECO
                                    </p>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nom</Label>
                                    <Input
                                        id="name"
                                        type="name"
                                        required
                                        tabIndex={1}
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder="John Doe"
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Adresse email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        placeholder="email@example.com"
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">
                                        Mot de passe
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={3}
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        placeholder="Password"
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">
                                        Confirmer le mot de passe
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        disabled={processing}
                                        placeholder="Confirmer le mot de passe"
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                    />
                                </div>
                                <div>
                                    <Label className="mb-2">Vous êtes?</Label>
                                    <div className="flex gap-6">
                                        <RadioGroup
                                            defaultValue="eco-company"
                                            className="max-w-sm"
                                            onValueChange={(value) =>
                                                setData("role", value)
                                            }
                                            aria-label="Vous êtes?"
                                            value={data.role}
                                            name="role"
                                            tabIndex={5}
                                        >
                                            {roles.map((role) => (
                                                <Label
                                                    className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-4 has-[[data-state=checked]]:border-gray-600 has-[[data-state=checked]]:bg-gray-50 dark:has-[[data-state=checked]]:border-gray-900 dark:has-[[data-state=checked]]:bg-gray-950"
                                                    key={role.id}
                                                >
                                                    <RadioGroupItem
                                                        value={role.id}
                                                        id={role.name}
                                                        className="shadow-none data-[state=checked]:border-gray-600 data-[state=checked]:bg-gray-600 *:data-[slot=radio-group-indicator]:[&>svg]:fill-white *:data-[slot=radio-group-indicator]:[&>svg]:stroke-white"
                                                    />
                                                    <div className="grid gap-1 font-normal">
                                                        <div className="font-medium">
                                                            {role.name}
                                                        </div>
                                                    </div>
                                                </Label>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                    <InputError message={errors.role} />
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
                                    S'inscrire
                                </Button>
                                {/*                                 <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
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
                                        <span>Google</span>
                                    </Button>
                                </div> */}
                                <div className="text-muted-foreground text-center text-sm">
                                    Vous possedez déjà un compte?{" "}
                                    <TextLink
                                        href={route("login")}
                                        tabIndex={6}
                                    >
                                        Se connecter
                                    </TextLink>
                                </div>
                            </div>
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
        </GuestLayout>
    );
}
