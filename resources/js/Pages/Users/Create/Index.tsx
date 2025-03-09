import { Head, useForm } from "@inertiajs/react";
import Dashboard from "@/Layouts/DashboardLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/Components/ui/select";

export default function CreateUser({ roles }: { roles: { name: string }[] }) {
    const { data, setData, post, errors } = useForm({
        name: "",
        email: "",
        password: "",
        role: "",
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route("admin.users.store"));
    }

    return (
        <>
            <Head title="Créer un utilisateur" />
            <div className="max-w-md mx-auto">
                <h1 className="mb-4 text-2xl font-bold">
                    Créer un utilisateur
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* ...existing form styling... */}
                    <div>
                        <Label htmlFor="name">Nom</Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Nom"
                        />
                        {errors.name && (
                            <div className="text-red-600">{errors.name}</div>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="Email"
                        />
                        {errors.email && (
                            <div className="text-red-600">{errors.email}</div>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="Mot de passe"
                        />
                        {errors.password && (
                            <div className="text-red-600">
                                {errors.password}
                            </div>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="role">Rôle</Label>
                        <Select
                            onValueChange={(value) => setData("role", value)}
                            defaultValue=""
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Choisir un rôle" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((role) => (
                                    <SelectItem
                                        key={role.name}
                                        value={role.name}
                                    >
                                        {role.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.role && (
                            <div className="text-red-600">{errors.role}</div>
                        )}
                    </div>
                    <div>
                        <Button
                            type="submit"
                            className="bg-blue-600 text-white"
                        >
                            Créer l'utilisateur
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

CreateUser.layout = (page: React.ReactNode) => {
    const breadcrumbs = [
        { href: route("admin.users.index"), label: "Utilisateurs" },
        { href: route("admin.users.create"), label: "Créer" },
    ];

    return <Dashboard children={page} breadcrumbs={breadcrumbs} />;
};
