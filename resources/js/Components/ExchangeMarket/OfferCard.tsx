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
    return (
        <Card>
            <CardHeader>
                <CardTitle>{offer.title}</CardTitle>
                <CardDescription>
                    <img
                        src="/images/placeholders/placeholder.svg"
                        className="object-cover h-36 w-full"
                    />
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <p>{offer.description}</p>
            </CardContent>
            <CardFooter>
                <p>{offer.published_at}</p>
            </CardFooter>
        </Card>
    );
}
