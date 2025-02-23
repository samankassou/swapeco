import { PlusCircle } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

export default function EmptyState() {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <PlusCircle className="h-10 w-10 text-muted-foreground" />
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                    Aucune offre disponible
                </h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">
                    Vous n'avez pas encore créé d'offre. Commencez par en
                    déposer une !
                </p>

                <Button asChild>
                    <Link href={route("admin.exchange_market.offers.create")}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Déposer une offre
                    </Link>
                </Button>
            </div>
        </div>
    );
}
