import { LoginForm } from '@/Components/login-form'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler, useState } from 'react'

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false as boolean,
  })

  const [statusMessage, setStatusMessage] = useState<string | null>(status || null)

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('login'), {
      onFinish: () => reset(), // Réinitialisation du formulaire après envoi
      onError: () => setStatusMessage('Something went wrong. Please try again.') // Gestion d'erreur
    })
  }

  return (
    <GuestLayout>
      <Head title="Log In" />
      {/* Affichage du message de statut, s'il existe */}
      {statusMessage && (
        <div className="mb-4 text-sm font-medium text-green-600">{statusMessage}</div>
      )}
      {/* Passage des props nécessaires au composant LoginForm */}
      <LoginForm
        data={data}
        setData={setData}
        errors={errors}
        processing={processing}
        onSubmit={submit}
        canResetPassword={canResetPassword}
      />
    </GuestLayout>
  )
}

