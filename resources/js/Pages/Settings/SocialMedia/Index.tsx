import InputError from "@/Components/input-error";
import SettingsLayout from "@/Layouts/settings/layout";
import Dashboard from "@/Layouts/DashboardLayout";
import { type BreadcrumbItem } from "@/types";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import HeadingSmall from "@/Components/heading-small";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

export default function SocialMedia() {
    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        facebook: "",
        twitter: "",
        linkedin: "",
        github: "",
        instagram: "",
    });

    const updateSocialMedia: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("social_media.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // Handle error here if needed
            },
        });
    };

    return (
        <>
            <Head title="Paramètres des réseaux sociaux" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Mettre à jour les réseaux sociaux"
                        description="Mettez à jour les liens de vos profils sur les réseaux sociaux"
                    />

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

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Enregistré</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </>
    );
}

SocialMedia.layout = (page: React.ReactNode): React.ReactElement => {
    const breadcrumbs: BreadcrumbItem[] = [
        { href: "#", label: "Paramètres du profil" },
    ];

    return <Dashboard children={page} breadcrumbs={breadcrumbs} />;
};









