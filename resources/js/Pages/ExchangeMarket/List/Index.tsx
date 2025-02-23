import { Head } from "@inertiajs/react";
import Dashboard from "@/Layouts/DashboardLayout";

import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import OfferCard from "@/Components/ExchangeMarket/OfferCard";

export default function Index() {
    return (
        <>
            <Head title="Gestion des échanges" />

            <div className="flex items-center mb-5">
                <h1 className="text-lg font-bold md:text-2xl">
                    Bourse d'échanges
                </h1>
            </div>
            <div className="container mx-auto">
                <Card className="px-10 py-4">
                    <CardHeader>
                        <CardTitle className="text-base font-bold md:text-xl">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-1 flex-col gap-4 p-4">
                            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                                <OfferCard />
                                <OfferCard />
                                <OfferCard />
                                <OfferCard />
                                <OfferCard />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode): React.ReactElement => {
    const breadcrumbs = [
        { href: "#", label: "Bourse d'échanges" },
        {
            href: route("admin.exchange-market.index"),
            label: "Gestion des échanges",
        },
    ];

    return <Dashboard children={page} breadcrumbs={breadcrumbs} />;
};
