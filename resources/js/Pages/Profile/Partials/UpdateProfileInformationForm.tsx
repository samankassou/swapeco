import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Informations de profil</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Mettez à jour les informations de votre profil et adresse email.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Section gauche : Nom et Email */}
                    <div>
                        <div>
                            <InputLabel htmlFor="name" value="Nom" className="text-xs font-medium text-gray-600" />
                            <TextInput
                                id="name"
                                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                isFocused
                                autoComplete="name"
                            />
                            <InputError className="mt-2 text-xs text-red-600" message={errors.name} />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" className="text-xs font-medium text-gray-600" />
                            <TextInput
                                id="email"
                                type="email"
                                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                            />
                            <InputError className="mt-1 text-xs text-red-600" message={errors.email} />
                        </div>

                        {/* Email unverified */}
                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div className="mt-4 text-sm text-gray-800">
                                <p>Your email address is unverified.</p>
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Cliquez ici pour renvoyer l'email de vérification.
                                </Link>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        Un nouveau lien de vérification a été envoyé à votre adresse email.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                </div>

                {/* Bouton Enregistrer */}
                <div className="flex justify-between items-center mt-6">
                    <PrimaryButton disabled={processing} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-2 px-4 rounded-md focus:ring-2 focus:ring-indigo-500">
                        Enregistrer les modifications
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition-opacity duration-300"
                        enterFrom="opacity-0"
                        leave="transition-opacity duration-300"
                        leaveTo="opacity-0"
                    >
                        <p className="text-xs text-green-600">
                            Modifications enregistrées avec succès.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>

    );
}
