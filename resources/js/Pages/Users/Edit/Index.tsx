import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import Dashboard from "@/Layouts/DashboardLayout";
import Heading from "@/Components/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Label } from "@/Components/ui/label";

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
    console.log(user);

    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("admin.users.update", user.id));
    };

    return (
        <>
            <Head title="Modifier l'utilisateur" />
            <div className="flex md:items-center flex-col md:flex-row md:justify-between mb-4">
                <Heading
                    title="Modifier l'utilisateur"
                    description="Modifier les informations de l'utilisateur"
                />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-base font-bold md:text-xl">
                        Informations de l'utilisateur
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nom</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">
                                        {errors.name}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="role">Rôle</Label>
                                <Select
                                    value={data.role}
                                    onValueChange={(value) =>
                                        setData("role", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner un rôle" />
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
                                    <p className="text-red-500 text-sm">
                                        {errors.role}
                                    </p>
                                )}
                            </div>
                        </div>
                        <Button type="submit" disabled={processing}>
                            Mettre à jour
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}

Edit.layout = (page: React.ReactNode) => {
    const breadcrumbs = [
        { href: route("admin.dashboard"), label: "Dashboard" },
        { href: route("admin.users.index"), label: "Utilisateurs" },
        { href: "#", label: "Modifier" },
    ];

    return <Dashboard children={page} breadcrumbs={breadcrumbs} />;
};
