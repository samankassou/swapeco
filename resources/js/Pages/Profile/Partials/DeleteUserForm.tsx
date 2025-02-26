import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';

export default function DeleteUserForm({
    className = '',
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
        <header className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Suppression du compte</h2>
            <p className="mt-2 text-sm text-gray-600">
                Une fois votre compte supprimé, toutes ses ressources et données
                seront définitivement effacées. Avant de supprimer votre compte,
                veuillez télécharger toutes les données ou informations que vous
                souhaitez conserver.
            </p>
        </header>
    
        <div className="flex justify-end">
            <DangerButton onClick={confirmUserDeletion} className="text-white bg-red-600 hover:bg-red-700">
                Supprimer mon compte
            </DangerButton>
        </div>
    
        <Modal show={confirmingUserDeletion} onClose={closeModal}>
            <form onSubmit={deleteUser} className="p-6">
                <h2 className="text-xl font-medium text-gray-900">Êtes-vous sûr de vouloir supprimer votre compte ?</h2>
    
                <p className="mt-1 text-sm text-gray-600 text-justify">
                    Une fois votre compte supprimé, toutes ses ressources et données seront
                    définitivement supprimées. Veuillez entrer votre mot de passe pour confirmer
                    que vous souhaitez supprimer définitivement votre compte.
                </p>

    
                <div className="mt-6">
                    <InputLabel
                        htmlFor="password"
                        value="Mot de passe"
                        className="sr-only"
                    />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="mt-1 block w-3/4 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        isFocused
                        placeholder="Mot de passe"
                    />
                    <InputError message={errors.password} className="mt-2 text-sm text-red-600" />
                </div>
    
                <div className="mt-6 flex justify-end space-x-3">
                    <SecondaryButton onClick={closeModal} className="text-sm text-gray-600 hover:text-gray-900">
                        Annuler
                    </SecondaryButton>
    
                    <DangerButton className="text-sm text-white bg-red-600 hover:bg-red-700" disabled={processing}>
                        Supprimer mon compte
                    </DangerButton>
                </div>
            </form>
        </Modal>
    </section>
    
    );
}
