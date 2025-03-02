import { router } from "@inertiajs/react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/Components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { confirm } from "@/Components/ui/confirmer";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
    CardDescription,
} from "@/Components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import { Offer } from "@/types";
import { MoreHorizontal } from "lucide-react";
import { Link } from "@inertiajs/react";
import { toast } from "sonner";

interface OfferCardProps {
    offer: Offer;
}

export default function OfferCard({ offer }: OfferCardProps) {
    const [actionMenuOpen, setActionMenuOpen] = useState(false);
    const getStatusColor = (status: string) => {
        return (
            {
                published: "bg-green-100 text-green-800",
                draft: "bg-gray-100 text-gray-800",
                pending: "bg-yellow-100 text-yellow-800",
            }[status] || "bg-gray-100 text-gray-800"
        );
    };

    const getTypeColor = (type: string) => {
        return (
            {
                product: "bg-blue-100 text-blue-800",
                service: "bg-purple-100 text-purple-800",
            }[type] || "bg-gray-100 text-gray-800"
        );
    };

    function deleteOffer(id: number): void {
        router.delete(
            route("admin.exchange_market.offers.destroy", { offer: id }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    // Notification de succès (optionnel si vous avez déjà un middleware flash)
                    //toast.success("Offre supprimée avec succès");
                },
                onError: (errors) => {
                    // Gestion des erreurs
                    toast.error("Erreur lors de la suppression de l'offre");
                },
            }
        );
    }

    function closeOffer(id: number): void {
        router.post(
            route("admin.exchange_market.offers.close", { offer: id }),
            {}, // Données à envoyer (vide dans votre cas)
            {
                preserveScroll: true,
                onSuccess: () => {
                    //toast.success("Offre clôturée avec succès");
                },
                onError: (errors) => {
                    // Gestion des erreurs
                    toast.error("Erreur lors de la clôture de l'offre");
                },
            }
        );
    }

    return (
        <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                    <CardTitle
                        className="truncate text-lg font-semibold"
                        title={offer.title}
                    >
                        {offer.title}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="secondary"
                            className={cn("shrink-0", getTypeColor(offer.type))}
                        >
                            {offer.type === "product" ? "Produit" : "Service"}
                        </Badge>
                        <DropdownMenu
                            open={actionMenuOpen}
                            onOpenChange={setActionMenuOpen}
                        >
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <MoreHorizontal />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-[100px]"
                            >
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={route(
                                                "admin.exchange_market.offers.edit",
                                                { offer: offer.id }
                                            )}
                                        >
                                            Modifier
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                confirm({
                                                    title: "Êtes-vous sûr ?",
                                                    description:
                                                        "L'offre ne sera plus disponible pour les échanges.",
                                                })
                                                    .then(() =>
                                                        closeOffer(offer.id)
                                                    )
                                                    .catch(() => {});
                                            }}
                                        >
                                            Clôturer
                                        </Button>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-red-600"
                                        asChild
                                    >
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                confirm({
                                                    title: "Êtes-vous vraiment sûr ?",
                                                    description:
                                                        "Cette action ne peut pas être annulée. Cela supprimera définitivement l'offre de nos serveurs.",
                                                })
                                                    .then(() =>
                                                        deleteOffer(offer.id)
                                                    )
                                                    .catch(() => {});
                                            }}
                                        >
                                            Supprimer
                                        </Button>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <CardDescription>
                    <img
                        src={
                            offer.image_url ||
                            "/images/placeholders/placeholder.svg"
                        }
                        alt={offer.title}
                        className="aspect-video w-full rounded-md object-cover"
                    />
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <p className="line-clamp-2 text-sm text-gray-600">
                    {offer.description}
                </p>
                <div className="flex justify-between">
                    <p className="text-sm font-medium">Valeur estimée : </p>
                    <p className="font-semibold text-xl">
                        {new Intl.NumberFormat("fr-FR", {
                            style: "currency",
                            currency: "EUR",
                        }).format(offer.estimated_value)}
                    </p>
                </div>
            </CardContent>

            <CardFooter className="flex justify-between text-xs text-gray-500">
                <div className="flex flex-col gap-1">
                    <span>
                        Créé le{" "}
                        {format(new Date(offer.created_at), "dd MMM yyyy", {
                            locale: fr,
                        })}
                    </span>
                    {offer.published_at && (
                        <span>
                            Publié le{" "}
                            {format(
                                new Date(offer.published_at),
                                "dd MMM yyyy",
                                { locale: fr }
                            )}
                        </span>
                    )}
                </div>
                <Badge
                    variant="secondary"
                    className={cn(
                        "ml-2 shrink-0",
                        getStatusColor(offer.status)
                    )}
                >
                    {offer.status}
                </Badge>
            </CardFooter>
        </Card>
    );
}
