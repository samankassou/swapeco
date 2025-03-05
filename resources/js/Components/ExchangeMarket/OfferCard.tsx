import { router } from "@inertiajs/react";
import { Badge } from "@/Components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import DeleteOffer from "@/Components/ExchangeMarket/Offers/delete-offer";
import CloseOffer from "@/Components/ExchangeMarket/Offers/close-offer";

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

export default function OfferCard({ offer }: { offer: Offer }) {
    const [actionMenuOpen, setActionMenuOpen] = useState(false);

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
                            className={cn("shrink-0", offer.type.classes)}
                        >
                            {offer.type.label}
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
                                    <DropdownMenuItem>
                                        <CloseOffer
                                            offer={offer}
                                            asLink
                                            triggerText="Clôturer"
                                        />
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">
                                        <DeleteOffer offer={offer} asLink />
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <Link
                    href={route("admin.exchange_market.offers.show", {
                        offer: offer.id,
                    })}
                >
                    <CardDescription>
                        <img
                            src={offer.image_url}
                            alt={offer.title}
                            className="aspect-video w-full rounded-md object-cover"
                        />
                    </CardDescription>
                </Link>
            </CardHeader>
            <CardContent className="space-y-2">
                <p className="line-clamp-2 text-sm text-gray-600">
                    {offer.description}
                </p>
                <div className="flex justify-between">
                    <p className="text-sm font-medium">Valeur estimée : </p>
                    <p className="font-semibold text-xl">
                        {offer.estimated_value} €
                    </p>
                </div>
            </CardContent>

            <CardFooter className="flex justify-between text-xs text-gray-500">
                <div className="flex flex-col gap-1">
                    <span>Créé le {offer.created_at}</span>
                    {offer.published_at && (
                        <span>Publié le {offer.published_at}</span>
                    )}
                </div>
                <Badge
                    variant="secondary"
                    className={cn("ml-2 shrink-0", offer.status.classes)}
                >
                    {offer.status.label}
                </Badge>
            </CardFooter>
        </Card>
    );
}
