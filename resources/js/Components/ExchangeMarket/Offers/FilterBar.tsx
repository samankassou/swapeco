import { router } from "@inertiajs/react";
import { useCallback, useState } from "react";
import debounce from "lodash/debounce";
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
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState({
        type: "all",
        status: "all",
    });
    const [sort, setSort] = useState("-created_at");

    const updateSearch = useCallback(
        debounce((value: string) => {
            router.get(
                route("admin.exchange_market.offers.index"),
                {
                    "filter[title]": value,
                    "filter[type]": filter.type,
                    "filter[status]": filter.status,
                    sort: sort,
                },
                { preserveState: true, preserveScroll: true }
            );
        }, 300),
        [filter, sort]
    );

    const updateFilters = (key: string, value: string) => {
        if (key === "sort") {
            setSort(value);
            router.get(
                route("admin.exchange_market.offers.index"),
                {
                    "filter[title]": search,
                    "filter[type]": filter.type,
                    "filter[status]": filter.status,
                    sort: value,
                },
                { preserveState: true, preserveScroll: true }
            );
            return;
        }

        const newFilters = { ...filter, [key]: value };
        setFilter(newFilters);
        router.get(
            route("admin.exchange_market.offers.index"),
            {
                "filter[title]": search,
                "filter[type]": newFilters.type,
                "filter[status]": newFilters.status,
                sort: sort,
            },
            { preserveState: true, preserveScroll: true }
        );
    };

    return (
        <Card className="mb-6">
            <CardContent className="p-6">
                <div className="flex items-center justify-between flex-col gap-4 md:flex-row">
                    <div className="relative w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Rechercher une offre..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                updateSearch(e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex gap-4 flex-col md:flex-row w-full">
                        <Select
                            value={filter.type}
                            onValueChange={(value) =>
                                updateFilters("type", value)
                            }
                        >
                            <SelectTrigger className="md:w-[180px]">
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
                        <Select
                            value={filter.status}
                            onValueChange={(value) =>
                                updateFilters("status", value)
                            }
                        >
                            <SelectTrigger className="md:w-[180px]">
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
                            </SelectContent>
                        </Select>
                        <Select
                            value={sort}
                            onValueChange={(value) =>
                                updateFilters("sort", value)
                            }
                        >
                            <SelectTrigger className="md:w-[180px]">
                                <SelectValue placeholder="Trier par" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="-created_at">
                                    Plus récentes
                                </SelectItem>
                                <SelectItem value="created_at">
                                    Plus anciennes
                                </SelectItem>
                                <SelectItem value="title">
                                    Titre (A-Z)
                                </SelectItem>
                                <SelectItem value="-title">
                                    Titre (Z-A)
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
