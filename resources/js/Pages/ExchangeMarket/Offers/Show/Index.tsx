import { Head } from "@inertiajs/react";
import Dashboard from "@/Layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Offer } from "@/types";
import Heading from "@/Components/heading";
import { Badge } from "@/Components/ui/badge";
import {
    CalendarIcon,
    MapPinIcon,
    BanknotesIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/Components/ui/button";
import { router } from "@inertiajs/react";

export default function Index({ offer }: { offer: Offer }) {
    const statusColors: Record<string, string> = {
        open: "bg-green-100 text-green-800",
        closed: "bg-gray-100 text-gray-800",
        pending: "bg-yellow-100 text-yellow-800",
    };

    const typeLabels: Record<string, string> = {
        service: "Service",
        product: "Produit",
        other: "Autre",
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "Non publiée";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(date);
    };

    const handleEdit = () => {
        router.visit(route("admin.exchange_market.offers.edit", offer.id));
    };

    const handleClose = () => {
        // Confirmation before closing the offer

        if (confirm("Êtes-vous sûr de vouloir fermer cette offre ?")) {
            router.post(route("admin.exchange_market.offers.close", offer.id));
        }
    };

    const handleDelete = () => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) {
            router.delete(
                route("admin.exchange_market.offers.destroy", offer.id)
            );
        }
    };

    return (
        <>
            <Head title="Gestion des offres" />

            <div className="flex md:items-center flex-col md:flex-row md:justify-between mb-4">
                <Heading
                    title="Bourse d'échanges - offres"
                    description="Gérez vos offres d'échanges"
                />

                <div className="flex gap-2 mt-4 md:mt-0">
                    <Button onClick={handleEdit} variant="outline">
                        Modifier
                    </Button>
                    {offer.status !== "closed" && (
                        <Button onClick={handleClose} variant="outline">
                            Fermer l'offre
                        </Button>
                    )}
                    <Button onClick={handleDelete} variant="destructive">
                        Supprimer
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base font-bold md:text-xl flex justify-between mb-4">
                        <h2>Détails de l'offre</h2>
                        <Badge
                            variant="outline"
                            className={
                                statusColors[offer.status] || "bg-gray-100"
                            }
                        >
                            {offer.status === "open"
                                ? "Ouverte"
                                : offer.status === "closed"
                                ? "Fermée"
                                : "En attente"}
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                            <img
                                src="/images/placeholders/placeholder.svg"
                                alt={offer.title}
                                className="w-full h-auto rounded-lg object-cover"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold">
                                    {offer.title}
                                </h3>
                                <Badge variant="outline" className="mt-1">
                                    {typeLabels[offer.type] || offer.type}
                                </Badge>
                            </div>

                            <div className="flex items-center text-gray-500">
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                <span>
                                    Publiée le: {formatDate(offer.published_at)}
                                </span>
                            </div>

                            {offer.estimated_value && (
                                <div className="flex items-center text-gray-500">
                                    <BanknotesIcon className="h-4 w-4 mr-2" />
                                    <span>
                                        Valeur estimée: {offer.estimated_value}{" "}
                                        €
                                    </span>
                                </div>
                            )}

                            {offer.campuses && offer.campuses.length > 0 && (
                                <div className="flex items-start text-gray-500">
                                    <MapPinIcon className="h-4 w-4 mr-2 mt-1" />
                                    <div>
                                        <span className="block mb-1">
                                            Campus de diffusion:
                                        </span>
                                        <div className="flex flex-wrap gap-1">
                                            {offer.campuses.map((campus) => (
                                                <Badge
                                                    key={campus.id}
                                                    variant="secondary"
                                                >
                                                    {campus.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="pt-2">
                                <h4 className="font-semibold mb-2">
                                    Description
                                </h4>
                                <div className="text-gray-700 whitespace-pre-wrap">
                                    {offer.description}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
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
        {
            href: "#",
            label: "Détails offre",
        },
    ];

    return <Dashboard children={page} breadcrumbs={breadcrumbs} />;
};
