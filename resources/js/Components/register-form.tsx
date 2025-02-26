import { FormEventHandler } from "react"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Button } from "@/Components/ui/button"
import { Link } from "@inertiajs/react"

export function RegisterForm({
  data,
  setData,
  errors,
  processing,
  onSubmit,
}: {
  data: any;
  setData: any;
  errors: any;
  processing: boolean;
  onSubmit: FormEventHandler;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      {/* Nom */}
      <div className="space-y-1">
        <Label htmlFor="name">Nom</Label>
        <Input
          id="name"
          type="text"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
          required
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
          required
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
      </div>

      {/* Mot de passe */}
      <div className="space-y-1">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          type="password"
          value={data.password}
          onChange={(e) => setData('password', e.target.value)}
          required
        />
        {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
      </div>

      {/* Confirmation du mot de passe */}
      <div className="space-y-1">
        <Label htmlFor="password_confirmation">Confirmer le mot de passe</Label>
        <Input
          id="password_confirmation"
          type="password"
          value={data.password_confirmation}
          onChange={(e) => setData('password_confirmation', e.target.value)}
          required
        />
        {errors.password_confirmation && <p className="text-red-600 text-sm">{errors.password_confirmation}</p>}
      </div>

      {/* Bouton d'inscription */}
      <Button type="submit" disabled={processing} className="w-full">
        {processing ? 'Inscription en cours...' : 'S’inscrire'}
      </Button>

      {/* Lien vers la connexion */}
      <p className="text-center text-sm text-gray-500 mt-4">
        Déjà un compte ?{" "}
        <Link href={route("login")} className="text-blue-600 hover:underline">
          Se connecter
        </Link>
      </p>

      {/* Copyright SWAPECO */}
      <p className="text-center text-sm text-gray-500 mt-2">
        © {new Date().getFullYear()} SWAPECO. Tous droits réservés.
      </p>
    </form>
  )
}
