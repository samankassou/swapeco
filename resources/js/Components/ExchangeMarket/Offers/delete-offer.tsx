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

interface DeleteOfferProps {
    offer: Offer;
    triggerText?: string;
    triggerClassName?: string;
    asLink?: boolean; // Nouvelle prop pour afficher en tant que lien
}

export default function DeleteOffer({
    offer,
    triggerText = "Supprimer",
    triggerClassName = "",
    asLink = false,
}: DeleteOfferProps) {
    const [open, setOpen] = useState(false);

    function deleteOffer(): void {
        router.delete(
            route("admin.exchange_market.offers.destroy", { offer: offer.id }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    setOpen(false);
                },
                onError: () => {
                    toast.error("Erreur lors de la suppression de l'offre");
                },
            }
        );
    }

    // Empêche la propagation du clic vers le Link parent
    function handleTriggerClick(e: React.MouseEvent) {
        //e.preventDefault();
        e.stopPropagation();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {asLink ? (
                    <button
                        className={`text-red-600 hover:text-red-700 text-left ${triggerClassName}`}
                        onClick={handleTriggerClick}
                    >
                        {triggerText}
                    </button>
                ) : (
                    <Button
                        variant="destructive"
                        className={triggerClassName}
                        onClick={handleTriggerClick}
                    >
                        {triggerText}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent onClick={(e) => e.stopPropagation()}>
                <DialogTitle>
                    Êtes-vous sûr de vouloir supprimer cette offre ?
                </DialogTitle>
                <DialogDescription>
                    Cette action est irréversible. L'offre "{offer.title}" sera
                    définitivement supprimée de votre compte.
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
                        variant="destructive"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteOffer();
                        }}
                    >
                        Supprimer l'offre
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
