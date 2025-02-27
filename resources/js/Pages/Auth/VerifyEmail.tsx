import TextLink from "@/Components/text-link";
import { Button } from "@/Components/ui/button";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { FormEventHandler } from "react";

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Vérification d'Email" />

            <div className="mb-4 text-sm text-gray-600">
                Merci pour votre inscription ! Avant de commencer, pourriez-vous
                vérifier votre adresse email en cliquant sur le lien que nous
                venons de vous envoyer ? Si vous n'avez pas reçu l'email, nous
                vous en enverrons volontiers un autre.
            </div>

            {status === "verification-link-sent" && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    Un nouveau lien de vérification a été envoyé à l'adresse
                    email que vous avez fournie lors de votre inscription.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6 text-center">
                <Button disabled={processing}>
                    {processing && (
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                    )}
                    Renvoyer l'Email de Vérification
                </Button>

                <TextLink
                    href={route("logout")}
                    method="post"
                    className="mx-auto block text-sm"
                >
                    Se Déconnecter
                </TextLink>
            </form>
        </GuestLayout>
    );
}
