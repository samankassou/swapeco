import { Head } from "@inertiajs/react";
import AppearanceTabs from "@/Components/appearance-tabs";
import HeadingSmall from "@/Components/heading-small";
import { type BreadcrumbItem } from "@/types";
import SettingsLayout from "@/Layouts/settings/layout";
import Dashboard from "@/Layouts/DashboardLayout";

const breadcrumbs: BreadcrumbItem[] = [
    {
        label: "Appearance settings",
        href: "/settings/appearance",
    },
];

export default function Index() {
    return (
        <>
            <Head title="Paramètres d'apparence" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Paramètres d'apparence"
                        description="Mettez à jour les paramètres d'apparence de votre compte"
                    />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </>
    );
}

Index.layout = (page: React.ReactNode): React.ReactElement => {
    const breadcrumbs = [{ href: "#", label: "Paramètres du profil" }];

    return <Dashboard children={page} breadcrumbs={breadcrumbs} />;
};
