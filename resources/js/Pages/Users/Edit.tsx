import { Head, useForm } from "@inertiajs/react";
import Dashboard from "@/Layouts/DashboardLayout";
import Heading from "@/Components/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

interface Props {
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
    roles: { value: string; label: string }[];
}

export default function Edit({ user, roles }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.role, // Suppression du || "" car le rôle est déjà géré dans le contrôleur
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("admin.users.update", user.id));
    };

    return (
        <>
            <Head title="Modifier l'utilisateur" />
            <div className="flex md:items-center flex-col md:flex-row md:justify-between mb-4">
                <Heading
                    title="Modifier l'utilisateur"
                    description="Mettez à jour les informations de l'utilisateur"
                />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-base font-bold md:text-xl flex justify-between mb-4">
                        <h2>Modifier l'utilisateur</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Nom</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="mt-1 block w-full"
                                error={errors.name}
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                disabled
                                className="mt-1 block w-full bg-gray-100"
                            />
                        </div>
                        <div>
                            <Label htmlFor="role">
                                Rôle <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={data.role}
                                onValueChange={(value) =>
                                    setData("role", value)
                                }
                                required
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Sélectionnez un rôle" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map((role) => (
                                        <SelectItem
                                            key={role.value}
                                            value={role.value}
                                        >
                                            {role.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.role && (
                                <p className="text-sm text-red-500">
                                    {errors.role}
                                </p>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing}>
                                Mettre à jour
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}

Edit.layout = (page: React.ReactNode): React.ReactElement => {
    const breadcrumbs = [
        { href: route("admin.dashboard"), label: "Dashboard" },
        { href: route("admin.users.index"), label: "Utilisateurs" },
        { href: "#", label: "Modifier l'utilisateur" },
    ];

    return <Dashboard children={page} breadcrumbs={breadcrumbs} />;
};
