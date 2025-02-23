import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/Components/ui/badge";
import { cn } from "@/lib/utils";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
    CardDescription,
} from "@/Components/ui/card";
import { Offer } from "@/types";

interface OfferCardProps {
    offer: Offer;
}

export default function OfferCard({ offer }: OfferCardProps) {
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

    return (
        <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-2">
                <div className="flex items-start justify-between">
                    <CardTitle
                        className="truncate text-lg font-semibold"
                        title={offer.title}
                    >
                        {offer.title}
                    </CardTitle>
                    <Badge className={cn("shrink-0", getTypeColor(offer.type))}>
                        {offer.type === "product" ? "Produit" : "Service"}
                    </Badge>
                    <Badge
                        className={cn(
                            "ml-2 shrink-0",
                            getStatusColor(offer.status)
                        )}
                    >
                        {offer.status}
                    </Badge>
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
            </CardFooter>
        </Card>
    );
}
