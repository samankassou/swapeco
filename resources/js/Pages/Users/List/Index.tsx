import { Head, Link } from "@inertiajs/react";
import Dashboard from "@/Layouts/DashboardLayout";
import { getColumns } from "./components/columns";
import { DataTable } from "./components/data-table";
import Heading from "@/Components/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { User } from "@/types/users";
import { Button } from "@/Components/ui/button";
import { PlusCircle } from "lucide-react";

export default function Index({
    users,
    roles,
}: {
    users: User[];
    roles: { value: string; label: string }[];
}) {
    const columns = getColumns(roles);
    return (
        <>
            <Head title="Utilisateurs" />
            <div className="flex md:items-center flex-col md:flex-row md:justify-between mb-4">
                <Heading
                    title="Utilisateurs"
                    description="Gérez les profils utilisateurs"
                />
                <Button className="text-left" asChild>
                    <Link href={route("admin.users.create")}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Créer un utilisateur
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-base font-bold md:text-xl flex justify-between mb-4">
                        <h2>Liste des utilisateurs</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <DataTable data={users} columns={columns} />
                </CardContent>
            </Card>
        </>
    );
}

Index.layout = (page: React.ReactNode): React.ReactElement => {
    const breadcrumbs = [
        { href: route("admin.dashboard"), label: "Dashboard" },
        { href: route("admin.users.index"), label: "Utilisateurs" },
    ];

    return <Dashboard children={page} breadcrumbs={breadcrumbs} />;
};
