import { router } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { toast } from "sonner";
import { Offer } from "@/types";

interface CloseOfferProps {
    offer: Offer;
    triggerText?: string;
    triggerClassName?: string;
    asLink?: boolean;
}

export default function CloseOffer({
    offer,
    triggerText = "Clôturer",
    triggerClassName = "",
    asLink = false,
}: CloseOfferProps) {
    const [open, setOpen] = useState(false);

    function closeOffer(): void {
        router.post(
            route("admin.exchange_market.offers.close", { offer: offer.id }),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setOpen(false);
                },
                onError: () => {
                    toast.error("Erreur lors de la clôture de l'offre");
                },
            }
        );
    }

    // Empêche la propagation du clic vers le Link parent
    function handleTriggerClick(e: React.MouseEvent) {
        e.stopPropagation();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {asLink ? (
                    <button
                        className={`text-blue-600 hover:text-blue-700 text-left ${triggerClassName}`}
                        onClick={handleTriggerClick}
                    >
                        {triggerText}
                    </button>
                ) : (
                    <Button
                        variant="outline"
                        className={triggerClassName}
                        onClick={handleTriggerClick}
                    >
                        {triggerText}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent onClick={(e) => e.stopPropagation()}>
                <DialogTitle>
                    Êtes-vous sûr de vouloir clôturer cette offre ?
                </DialogTitle>
                <DialogDescription>
                    L'offre "{offer.title}" ne sera plus disponible pour les
                    échanges. Cette action est réversible et vous pourrez
                    ré-ouvrir l'offre ultérieurement.
                </DialogDescription>

                <DialogFooter className="gap-2 mt-4">
                    <DialogClose asChild>
                        <Button
                            variant="secondary"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Annuler
                        </Button>
                    </DialogClose>

                    <Button
                        variant="default"
                        onClick={(e) => {
                            e.stopPropagation();
                            closeOffer();
                        }}
                    >
                        Clôturer l'offre
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
