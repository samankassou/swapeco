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
import { PaginatedData, Offer } from "@/types";
import EmptyState from "@/Components/ExchangeMarket/Offers/EmptyState";
import { Button } from "@/Components/ui/button";
import { PlusCircle } from "lucide-react";
import FilterBar from "@/Components/ExchangeMarket/Offers/FilterBar";
import OffersPagination from "@/Components/ExchangeMarket/Offers/OffersPagination";

export default function Index({ offers }: { offers: PaginatedData<Offer> }) {
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
                        <CardTitle className="text-base font-bold md:text-xl flex justify-between mb-4">
                            <h2>Mes offres</h2>
                            {offers.data.length > 0 && (
                                <Button asChild>
                                    <Link
                                        href={route(
                                            "admin.exchange_market.offers.create"
                                        )}
                                    >
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Déposer une offre
                                    </Link>
                                </Button>
                            )}
                        </CardTitle>
                        <FilterBar />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {offers.data.length > 0 && (
                            <div className="text-sm text-muted-foreground">
                                Affichage de {offers.from} à {offers.to} sur{" "}
                                {offers.total} offres
                            </div>
                        )}
                        {offers.data.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <div className="flex flex-1 flex-col gap-4">
                                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                                    {offers.data.map((offer) => (
                                        <OfferCard
                                            key={offer.id}
                                            offer={offer}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                    {/* Pagination */}
                    {offers.data.length > 0 && (
                        <CardFooter className="flex justify-center">
                            <OffersPagination links={offers.links} />
                        </CardFooter>
                    )}
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
