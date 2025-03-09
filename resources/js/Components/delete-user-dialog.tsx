import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { FormEventHandler } from "react";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";

interface DeleteUserDialogProps {
    isOpen: boolean;
    onClose: () => void;
    userId: number;
    userName: string;
}

export default function DeleteUserDialog({
    isOpen,
    onClose,
    userId,
    userName,
}: DeleteUserDialogProps) {
    const { delete: destroy, processing } = useForm();

    const handleDelete: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route("admin.users.destroy", userId), {
            preserveScroll: true,
            onSuccess: (page) => {
                if (page.props.flash?.message) {
                    toast.success(page.props.flash.message);
                }
                onClose();
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmer la suppression</DialogTitle>
                    <DialogDescription>
                        Êtes-vous sûr de vouloir supprimer l'utilisateur{" "}
                        {userName} ? Cette action est irréversible.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button
                        variant="destructive"
                        disabled={processing}
                        onClick={handleDelete}
                    >
                        Supprimer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
