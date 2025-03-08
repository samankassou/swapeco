import { Head, Link } from "@inertiajs/react";
import Dashboard from "@/Layouts/DashboardLayout";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import OfferCard from "@/Components/ExchangeMarket/OfferCard";
import { PaginatedData, Offer, Campus } from "@/types";
import EmptyState from "@/Components/ExchangeMarket/Offers/EmptyState";
import { Button } from "@/Components/ui/button";
import { PlusCircle } from "lucide-react";
import FilterBar from "@/Components/ExchangeMarket/Offers/FilterBar";
import OffersPagination from "@/Components/ExchangeMarket/Offers/OffersPagination";
import Heading from "@/Components/heading";

export default function Index({
    offers,
    campuses,
}: {
    offers: PaginatedData<Offer>;
    campuses: Campus[];
}) {
    return (
        <>
            <Head title="Gestion des offres" />

            <div className="flex md:items-center flex-col md:flex-row md:justify-between mb-4">
                <Heading
                    title="Bourse d'échanges - offres"
                    description="Gérez vos offres d'échanges"
                />
                {offers.data.length > 0 && (
                    <Button className="text-left" asChild>
                        <Link
                            href={route("admin.exchange_market.offers.create")}
                        >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Déposer une offre
                        </Link>
                    </Button>
                )}
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-base font-bold md:text-xl flex justify-between mb-4">
                        <h2>Mes offres</h2>
                    </CardTitle>
                    <FilterBar />
                </CardHeader>
                <CardContent className="space-y-4">
                    {offers.data.length > 0 && (
                        <div className="text-sm text-muted-foreground">
                            Affichage de {offers.meta.from} à {offers.meta.to}{" "}
                            sur {offers.meta.total} offres
                        </div>
                    )}
                    {offers.data.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="flex flex-1 flex-col gap-4">
                            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                                {offers.data.map((offer) => (
                                    <OfferCard key={offer.id} offer={offer} />
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
                {/* Pagination */}
                {offers.data.length > 0 && (
                    <CardFooter className="flex justify-center">
                        <OffersPagination meta={offers.meta} />
                    </CardFooter>
                )}
            </Card>
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
