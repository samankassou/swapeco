import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

export default function UpdatePasswordForm({
    className = '',
}: {
    className?: string;
}) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return(
        <section className={className}>
    <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
            Mettre à jour le mot de passe
        </h2>
        <p className="mt-1 text-sm text-gray-500">
            Assurez-vous que votre compte utilise un mot de passe fort et unique pour garantir sa sécurité.
        </p>
    </header>

    <form onSubmit={updatePassword} className="space-y-6">
        {/* Champ mot de passe actuel */}
        <div>
            <InputLabel
                htmlFor="current_password"
                value="Mot de passe actuel"
                className="text-xs font-medium text-gray-600"
            />
            <TextInput
                id="current_password"
                ref={currentPasswordInput}
                value={data.current_password}
                onChange={(e) => setData('current_password', e.target.value)}
                type="password"
                className="mt-2 p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 w-full"
                autoComplete="current-password"
            />
            <InputError
                message={errors.current_password}
                className="mt-1 text-xs text-red-600"
            />
        </div>

        {/* Champ nouveau mot de passe */}
        <div>
            <InputLabel
                htmlFor="password"
                value="Nouveau mot de passe"
                className="text-xs font-medium text-gray-600"
            />
            <TextInput
                id="password"
                ref={passwordInput}
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                type="password"
                className="mt-2 p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 w-full"
                autoComplete="new-password"
            />
            <InputError
                message={errors.password}
                className="mt-1 text-xs text-red-600"
            />
        </div>

        {/* Champ confirmation du mot de passe */}
        <div>
            <InputLabel
                htmlFor="password_confirmation"
                value="Confirmer le mot de passe"
                className="text-xs font-medium text-gray-600"
            />
            <TextInput
                id="password_confirmation"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                type="password"
                className="mt-2 p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 w-full"
                autoComplete="new-password"
            />
            <InputError
                message={errors.password_confirmation}
                className="mt-1 text-xs text-red-600"
            />
        </div>

        {/* Bouton de sauvegarde */}
        <div className="flex justify-between items-center">
            <PrimaryButton disabled={processing} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-2 px-4 rounded-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Enregistrer
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
