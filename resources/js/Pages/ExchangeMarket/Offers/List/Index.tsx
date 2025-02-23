import { Head } from "@inertiajs/react";
import Dashboard from "@/Layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import OfferCard from "@/Components/ExchangeMarket/OfferCard";
import { Offer } from "@/types";

export interface IndexProps {
    offers: Offer[];
}
export default function Index({ offers }: IndexProps) {
    return (
        <>
            <Head title="Gestion des offres" />

            <div className="flex items-center mb-5">
                <h1 className="text-lg font-bold md:text-2xl">
                    Bourse d'échanges - offres
                </h1>
            </div>
            <div className="container mx-auto">
                <Card className="px-10 py-4">
                    <CardHeader>
                        <CardTitle className="text-base font-bold md:text-xl">
                            Liste des offres
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-1 flex-col gap-4">
                            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                                {offers &&
                                    offers.map((offer) => (
                                        <OfferCard offer={offer} />
                                    ))}
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
            href: route("admin.exchange_market.offers.index"),
            label: "Gestion des offres",
        },
    ];

    return <Dashboard children={page} breadcrumbs={breadcrumbs} />;
};
