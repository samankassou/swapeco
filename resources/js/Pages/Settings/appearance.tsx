import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/Components/appearance-tabs';
import HeadingSmall from '@/Components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/Layouts/app-layout';
import SettingsLayout from '@/Layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        label: 'Appearance settings',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Paramètres d'apparence" description="Mettez à jour les paramètres d'apparence de votre compte" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
