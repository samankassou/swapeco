import { FormEventHandler } from "react";
import { Head,useForm, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import InputError from "@/Components/input-error";
import { Transition } from "@headlessui/react";
import SettingsLayout from "@/Layouts/settings/layout";
import Dashboard from "@/Layouts/DashboardLayout";

// Définir le type des liens sociaux
type SocialLink = {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
};

export default function SocialMedia() {
    const { auth } = usePage<PageProps>().props;

    // Initialisation des valeurs de socialLink, en s'assurant que c'est un objet de type SocialLink
    const socialLinks: SocialLink = auth.user.socialLink || {};

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        facebook: socialLinks.facebook ?? "",
        twitter: socialLinks.twitter ?? "",
        linkedin: socialLinks.linkedin ?? "",
        github: socialLinks.github ?? "",
        instagram: socialLinks.instagram ?? "",
    });

    const updateSocialMedia: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("social_links.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                console.error("Update failed:", errors);
            },
        });
    };

    return (
        <>
            <Head title="Paramètres de Reseaux Sociaux" />
            <SettingsLayout>
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Mettre à jour les réseaux sociaux</h2>
                    <p>Mettre à jour les liens de vos profils sur les réseaux sociaux.</p>

                    <form onSubmit={updateSocialMedia} className="space-y-6">
                        {/* Facebook */}
                        <div className="grid gap-2">
                            <Label htmlFor="facebook">Facebook</Label>
                            <Input
                                id="facebook"
                                value={data.facebook}
                                onChange={(e) => setData("facebook", e.target.value)}
                                type="url"
                                className="mt-1 block w-full"
                                placeholder="URL de votre compte Facebook"
                            />
                            <InputError message={errors.facebook} />
                        </div>

                        {/* Twitter */}
                        <div className="grid gap-2">
                            <Label htmlFor="twitter">Twitter</Label>
                            <Input
                                id="twitter"
                                value={data.twitter}
                                onChange={(e) => setData("twitter", e.target.value)}
                                type="url"
                                className="mt-1 block w-full"
                                placeholder="URL de votre compte Twitter"
                            />
                            <InputError message={errors.twitter} />
                        </div>

                        {/* LinkedIn */}
                        <div className="grid gap-2">
                            <Label htmlFor="linkedin">LinkedIn</Label>
                            <Input
                                id="linkedin"
                                value={data.linkedin}
                                onChange={(e) => setData("linkedin", e.target.value)}
                                type="url"
                                className="mt-1 block w-full"
                                placeholder="URL de votre compte LinkedIn"
                            />
                            <InputError message={errors.linkedin} />
                        </div>

                        {/* GitHub */}
                        <div className="grid gap-2">
                            <Label htmlFor="github">GitHub</Label>
                            <Input
                                id="github"
                                value={data.github}
                                onChange={(e) => setData("github", e.target.value)}
                                type="url"
                                className="mt-1 block w-full"
                                placeholder="URL de votre compte GitHub"
                            />
                            <InputError message={errors.github} />
                        </div>

                        {/* Instagram */}
                        <div className="grid gap-2">
                            <Label htmlFor="instagram">Instagram</Label>
                            <Input
                                id="instagram"
                                value={data.instagram}
                                onChange={(e) => setData("instagram", e.target.value)}
                                type="url"
                                className="mt-1 block w-full"
                                placeholder="URL de votre compte Instagram"
                            />
                            <InputError message={errors.instagram} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Enregistrer les liens</Button>

                            {/* Affichage du statut d'enregistrement */}
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Enregistré avec succès</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </>
    );
}

SocialMedia.layout = (page: React.ReactNode): React.ReactElement => {
    const breadcrumbs = [
        { href: "#", label: "Paramètres du profil" },
    ];

    return <Dashboard children={page} breadcrumbs={breadcrumbs} />;
};
