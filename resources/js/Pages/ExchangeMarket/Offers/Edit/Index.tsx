import { Head, useForm } from "@inertiajs/react";
import Dashboard from "@/Layouts/DashboardLayout";
import { FormEventHandler, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/input-error";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { Campus, OfferStatus } from "@/types";
import { MultiSelect } from "@/Components/multi-select";

interface OfferFormData {
    type: string;
    title: string;
    description: string;
    estimated_value: string;
    status: string;
    campuses: string[];
    [key: string]: any;
}

interface OfferProps {
    id: number;
    title: string;
    description: string;
    type: string;
    status: OfferStatus;
    estimated_value: number;
    campuses: Campus[];
}

export default function Index({
    offer,
    campuses,
}: {
    offer: OfferProps;
    campuses: Campus[];
}) {
    // Transform campuses to array of { label: string, value: string }
    const campusOptions = campuses.map((campus) => ({
        label: campus.name,
        value: campus.id.toString(),
    }));

    // Extraire les IDs des campus sélectionnés
    const initialSelectedCampuses = offer.campuses.map((campus) =>
        campus.id.toString()
    );

    const [selectedCampuses, setSelectedCampuses] = useState<string[]>(
        initialSelectedCampuses
    );

    const { data, setData, put, processing, errors } = useForm<OfferFormData>({
        type: offer.type,
        title: offer.title,
        description: offer.description,
        estimated_value: offer.estimated_value.toString(),
        status: offer.status.value,
        campuses: initialSelectedCampuses,
    });

    const handleCampusChange = (values: string[]) => {
        setSelectedCampuses(values);
        setData("campuses", values);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("admin.exchange_market.offers.update", { id: offer.id }));
    };

    return (
        <>
            <Head title="Modifier une offre" />

            <div className="flex items-center mb-5">
                <h1 className="text-lg font-bold md:text-2xl">
                    Bourse d'échanges - Modifier une offre d'échange
                </h1>
            </div>
            <div className="container mx-auto">
                <Card className="px-10 py-4">
                    <CardHeader>
                        <CardTitle className="text-base font-bold md:text-xl flex justify-between mb-4">
                            <h2>Modifier l'offre d'échange</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={submit}>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="type">Type d'offre</Label>
                                    <Select
                                        name="type"
                                        value={data.type}
                                        onValueChange={(value) =>
                                            setData("type", value)
                                        }
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Choisissez le type d'offre" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="product">
                                                Produit
                                            </SelectItem>
                                            <SelectItem value="service">
                                                Service
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <InputError
                                        message={errors.type}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label className="mb-1" htmlFor="title">
                                        Que proposez-vous ?
                                    </Label>

                                    <Input
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        className="mt-1"
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.title}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <Label className="mb-1" htmlFor="description">
                                    Description de l'offre
                                </Label>
                                <Textarea
                                    placeholder="Description de l'offre."
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <Label htmlFor="estimated_value">
                                    Valeur estimée (€)
                                </Label>

                                <Input
                                    type="number"
                                    id="estimated_value"
                                    name="estimated_value"
                                    value={data.estimated_value}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData(
                                            "estimated_value",
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.estimated_value}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <Label htmlFor="campuses">
                                    Campus de diffusion
                                </Label>
                                <MultiSelect
                                    className="mt-1"
                                    options={campusOptions}
                                    onValueChange={handleCampusChange}
                                    defaultValue={selectedCampuses}
                                    placeholder="Selectionnez les campus"
                                    variant="inverted"
                                    animation={2}
                                    maxCount={3}
                                />
                                <InputError
                                    message={errors.campuses}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4 flex items-center justify-end">
                                <Button type="submit" disabled={processing}>
                                    Mettre à jour l'offre
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode): React.ReactElement => {
    const breadcrumbs = [
        { href: "#", label: "Bourse d'échanges" },
        {
            href: route("admin.exchange_market.offers.index"),
            label: "Gestion des offres",
        },
        {
            href: "#",
            label: "Modifier une offre",
        },
    ];

    return <Dashboard children={page} breadcrumbs={breadcrumbs} />;
};
