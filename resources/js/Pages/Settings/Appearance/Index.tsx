import { Head } from "@inertiajs/react";
import AppearanceTabs from "@/Components/appearance-tabs";
import HeadingSmall from "@/Components/heading-small";
import { type BreadcrumbItem } from "@/types";
import SettingsLayout from "@/Layouts/settings/layout";
import Dashboard from "@/Layouts/DashboardLayout";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Appearance settings",
        href: "/settings/appearance",
    },
];

export default function Index() {
    return (
        <>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Appearance settings"
                        description="Update your account's appearance settings"
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
