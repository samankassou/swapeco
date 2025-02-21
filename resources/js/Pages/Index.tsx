import { Head } from "@inertiajs/react";
import Dashboard from "@/Layouts/DashboardLayout";

export default function Index() {
    return (
        <>
            <Head title="Dashboard" />

            <div className="flex items-center mb-5">
                <h1 className="text-lg font-bold md:text-2xl">Dashboard</h1>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode): React.ReactElement => {
    const breadcrumbs = [{ href: route("dashboard"), label: "Dashboard" }];

    return <Dashboard children={page} breadcrumbs={breadcrumbs} />;
};
