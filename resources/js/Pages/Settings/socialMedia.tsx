import InputError from '@/Components/input-error';
import AppLayout from '@/Layouts/app-layout';
import SettingsLayout from '@/Layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import HeadingSmall from '@/Components/heading-small';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        label: 'Social Media settings',
        href: '/settings/social-media',
    },
];

export default function SocialMedia() {
    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        github: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        instagram: '',
    });

    const updateSocialLinks: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('social_media.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.github) {
                    reset('github');
                }
                if (errors.twitter) {
                    reset('twitter');
                }
                if (errors.facebook) {
                    reset('facebook');
                }
                if (errors.linkedin) {
                    reset('linkedin');
                }
                if (errors.instagram) {
                    reset('instagram');
                }
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Social Media Settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Mettre à jour les liens sociaux" description="Mettez à jour vos liens vers vos profils sociaux pour permettre à vos contacts de vous trouver facilement." />

                    <form onSubmit={updateSocialLinks} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="github">GitHub</Label>

                            <Input
                                id="github"
                                value={data.github}
                                onChange={(e) => setData('github', e.target.value)}
                                type="url"
                                className="mt-1 block w-full"
                                placeholder="GitHub URL"
                            />

                            <InputError message={errors.github} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="twitter">Twitter</Label>

                            <Input
                                id="twitter"
                                value={data.twitter}
                                onChange={(e) => setData('twitter', e.target.value)}
                                type="url"
                                className="mt-1 block w-full"
                                placeholder="Twitter URL"
                            />

                            <InputError message={errors.twitter} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="facebook">Facebook</Label>

                            <Input
                                id="facebook"
                                value={data.facebook}
                                onChange={(e) => setData('facebook', e.target.value)}
                                type="url"
                                className="mt-1 block w-full"
                                placeholder="Facebook URL"
                            />

                            <InputError message={errors.facebook} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="linkedin">LinkedIn</Label>

                            <Input
                                id="linkedin"
                                value={data.linkedin}
                                onChange={(e) => setData('linkedin', e.target.value)}
                                type="url"
                                className="mt-1 block w-full"
                                placeholder="LinkedIn URL"
                            />

                            <InputError message={errors.linkedin} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="instagram">Instagram</Label>

                            <Input
                                id="instagram"
                                value={data.instagram}
                                onChange={(e) => setData('instagram', e.target.value)}
                                type="url"
                                className="mt-1 block w-full"
                                placeholder="Instagram URL"
                            />

                            <InputError message={errors.instagram} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Enregistrer les liens sociaux</Button>

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
        </AppLayout>
    );
}
