import { Head } from "@inertiajs/react";
import Dashboard from "@/Layouts/DashboardLayout";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import Heading from "@/Components/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { User } from "@/types/users";

export default function Index({ users }: { users: User[] }) {
    return (
        <>
            <Head title="Utilisateurs" />
            <div className="flex md:items-center flex-col md:flex-row md:justify-between mb-4">
                <Heading
                    title="Utilisateurs"
                    description="Gérez les profils utilisateurs"
                />
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
        { href: route("admin.dashboard"), label: "Utilisateurs" },
    ];

    return <Dashboard children={page} breadcrumbs={breadcrumbs} />;
};
