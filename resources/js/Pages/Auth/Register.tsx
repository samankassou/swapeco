import { RegisterForm } from '@/Components/register-form'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'
import { Toaster, toast } from "sonner" // ✅ Utilisation de Sonner

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('register'), {
      onFinish: () => {
        reset('password', 'password_confirmation')
        toast.success("Inscription réussie !") // ✅ Utilisation de Sonner
      },
      onError: () => {
        toast.error("Erreur lors de l'inscription") // ✅ Utilisation de Sonner
      },
    })
  }

  return (
    <GuestLayout>
      <Head title="Register" />
      <Toaster position="top-right" richColors /> {/* ✅ Ajout du Toaster */}
      <RegisterForm 
        data={data} 
        setData={setData} 
        errors={errors} 
        processing={processing} 
        onSubmit={submit} 
      />
    </GuestLayout>
  )
}

