import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Search } from "lucide-react";

export default function FilterBar() {
    return (
        <Card className="mb-6">
            <CardContent className="p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-1 gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Rechercher une offre..."
                                className="pl-9"
                            />
                        </div>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Type d'offre" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Tous les types
                                </SelectItem>
                                <SelectItem value="product">
                                    Produits
                                </SelectItem>
                                <SelectItem value="service">
                                    Services
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Statut" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Tous les statuts
                                </SelectItem>
                                <SelectItem value="published">
                                    Publiées
                                </SelectItem>
                                <SelectItem value="draft">
                                    Brouillons
                                </SelectItem>
                                <SelectItem value="pending">
                                    En attente
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Select defaultValue="newest">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Trier par" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">
                                Plus récentes
                            </SelectItem>
                            <SelectItem value="oldest">
                                Plus anciennes
                            </SelectItem>
                            <SelectItem value="title">Titre (A-Z)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
}
