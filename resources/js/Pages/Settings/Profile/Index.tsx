import { PageProps } from "@/types";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";

import DeleteUser from "@/Components/delete-user";
import HeadingSmall from "@/Components/heading-small";
import InputError from "@/Components/input-error";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import SettingsLayout from "@/Layouts/settings/layout";
import Dashboard from "@/Layouts/DashboardLayout";

export default function Index({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<PageProps>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: auth.user.name,
            email: auth.user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("profile.update"), {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Paramètres du compte" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Informations du profil"
                        description="Mettez à jour votre nom et votre adresse e-mail"
                    />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nom</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                                autoComplete="name"
                                placeholder="Full name"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Adresse Email</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                                autoComplete="username"
                                placeholder="Email address"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.email}
                            />
                        </div>

                        {mustVerifyEmail &&
                            auth.user.email_verified_at === null && (
                                <div>
                                    <p className="-mt-4 text-sm text-muted-foreground">
                                    Votre adresse e-mail n'est pas vérifiée.{" "}
                                        <Link
                                            href={route("verification.send")}
                                            method="post"
                                            as="button"
                                            className="hover:decoration-current! text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out dark:decoration-neutral-500"
                                        >
                                            Cliquez ici pour renvoyer l'e-mail de vérification.
                                        </Link>
                                    </p>

                                    {status === "verification-link-sent" && (
                                        <div className="mt-2 text-sm font-medium text-green-600">
                                             Un nouveau lien de vérification a été envoyé à votre adresse e-mail.
                                        </div>
                                    )}
                                </div>
                            )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Enregistrer</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">
                                    Enregistré
                                </p>
                            </Transition>
                        </div>
                    </form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </>
    );
}

Index.layout = (page: React.ReactNode): React.ReactElement => {
    const breadcrumbs = [{ href: "#", label: "Paramètres du profil" }];

    return <Dashboard children={page} breadcrumbs={breadcrumbs} />;
};
