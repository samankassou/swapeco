import { Offer } from "@/types";
import { router } from "@inertiajs/react";

interface ApproveOfferProps {
    offer: Offer;
    asLink?: boolean;
    triggerText?: string;
}

export default function ApproveOffer({
    offer,
    asLink = false,
    triggerText = "Approver l’offre",
}: ApproveOfferProps) {
    const handleApprove = () => {
        router.post(route("admin.exchange_market.offers.approve", offer.id));
    };

    if (asLink) {
        return (
            <button onClick={handleApprove} className="w-full text-left">
                {triggerText}
            </button>
        );
    }

    return <button onClick={handleApprove}>{triggerText}</button>;
}
