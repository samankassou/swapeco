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
import { Campus, Offer, OfferStatus, OfferType } from "@/types";
import { MultiSelect } from "@/Components/multi-select";
import {
    Dropzone,
    DropzoneInput,
    DropzoneDescription,
    DropzoneGroup,
    DropzoneTitle,
    DropzoneUploadIcon,
    DropzoneZone,
} from "@/Components/ui/dropzone";
import {
    FileList,
    FileListDescription,
    FileListIcon,
    FileListHeader,
    FileListInfo,
    FileListItem,
    FileListName,
    FileListSize,
    FileListAction,
} from "@/Components/ui/file-list";
import { X } from "lucide-react";

interface OfferFormData {
    type: string;
    title: string;
    description: string;
    estimated_value: string;
    status: string;
    campuses: string[];
    images: any[]; // Pour les nouvelles images
    [key: string]: any;
}

interface ExistingImage {
    id: number;
    name: string;
    url: string;
}

interface OfferProps {
    id: number;
    title: string;
    description: string;
    type: string;
    status: OfferStatus;
    estimated_value: number;
    campuses: Campus[];
    images: ExistingImage[];
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
    const [newImages, setNewImages] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<ExistingImage[]>(
        offer.images || []
    );
    const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);

    const { data, setData, put, processing, errors } = useForm<OfferFormData>({
        type: offer.type,
        title: offer.title,
        description: offer.description,
        estimated_value: offer.estimated_value.toString(),
        status: offer.status.value,
        campuses: initialSelectedCampuses,
        images: [],
        delete_images: [],
    });

    const handleCampusChange = (values: string[]) => {
        setSelectedCampuses(values);
        setData("campuses", values);
    };

    // Pour la gestion des nouvelles images :
    const handleNewImagesChange = (uploadedImages: File[]) => {
        const updatedImages = [...newImages, ...uploadedImages];
        setNewImages(updatedImages);
        setData("images", updatedImages);
    };

    const removeNewImage = (index: number): void => {
        const updatedImages = [...newImages];
        updatedImages.splice(index, 1);
        setNewImages(updatedImages);
        setData("images", updatedImages);
    };

    const removeExistingImage = (imageId: number): void => {
        const updatedImagesToDelete = [...imagesToDelete, imageId];

        // Mettre à jour les deux états avec la même valeur
        setImagesToDelete(updatedImagesToDelete);
        setData("delete_images", updatedImagesToDelete);

        // Retirer l'image de l'affichage
        setExistingImages(existingImages.filter((img) => img.id !== imageId));
    };

    // Pour la valeur estimée, assurez-vous que c'est un nombre lors de l'envoi :
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log("Données soumises:", data);
        put(route("admin.exchange_market.offers.update", offer.id), {
            forceFormData: true,
            onError: (errors) => {
                //console.log("Erreurs de validation:", errors);
            },
        });
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

                            <div className="mt-4">
                                <Label>Images du produit</Label>

                                {/* Images existantes */}
                                {existingImages.length > 0 && (
                                    <>
                                        <div className="mb-2 text-sm text-muted-foreground">
                                            Images actuelles :
                                        </div>
                                        <FileList className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                            {existingImages.map((image) => (
                                                <FileListItem key={image.id}>
                                                    <FileListHeader>
                                                        <FileListIcon />
                                                        <FileListInfo>
                                                            <FileListName>
                                                                {image.name}
                                                            </FileListName>
                                                            <FileListDescription>
                                                                <a
                                                                    href={
                                                                        image.url
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-500 hover:underline"
                                                                >
                                                                    Voir l'image
                                                                </a>
                                                            </FileListDescription>
                                                        </FileListInfo>
                                                        <FileListAction
                                                            onClick={() =>
                                                                removeExistingImage(
                                                                    image.id
                                                                )
                                                            }
                                                        >
                                                            <X />
                                                            <span className="sr-only">
                                                                Retirer
                                                            </span>
                                                        </FileListAction>
                                                    </FileListHeader>
                                                </FileListItem>
                                            ))}
                                        </FileList>
                                    </>
                                )}

                                {/* Ajouter de nouvelles images */}
                                <div className="mt-4">
                                    <div className="mb-2 text-sm text-muted-foreground">
                                        Ajouter de nouvelles images :
                                    </div>
                                    <Dropzone
                                        multiple
                                        accept={{
                                            "image/*": [".jpg", ".png"],
                                        }}
                                        onDropAccepted={handleNewImagesChange}
                                    >
                                        <DropzoneZone>
                                            <DropzoneInput />
                                            <DropzoneGroup className="gap-4">
                                                <DropzoneUploadIcon />
                                                <DropzoneGroup>
                                                    <DropzoneTitle>
                                                        Déposez vos fichiers ici
                                                        ou cliquez pour
                                                        télécharger
                                                    </DropzoneTitle>
                                                    <DropzoneDescription>
                                                        Vous pouvez téléverser
                                                        des fichiers jusqu'à 4
                                                        Mo. Formats pris en
                                                        charge : JPG, JPEG, PNG.
                                                    </DropzoneDescription>
                                                </DropzoneGroup>
                                            </DropzoneGroup>
                                        </DropzoneZone>
                                    </Dropzone>

                                    {/* Nouvelles images ajoutées */}
                                    {newImages.length > 0 && (
                                        <FileList className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                            {newImages.map((file, index) => (
                                                <FileListItem key={index}>
                                                    <FileListHeader>
                                                        <FileListIcon />
                                                        <FileListInfo>
                                                            <FileListName>
                                                                {file.name}
                                                            </FileListName>
                                                            <FileListDescription>
                                                                <FileListSize>
                                                                    {Math.round(
                                                                        file.size /
                                                                            1024
                                                                    )}
                                                                </FileListSize>
                                                                <span className="ml-1">
                                                                    Ko
                                                                </span>
                                                            </FileListDescription>
                                                        </FileListInfo>
                                                        <FileListAction
                                                            onClick={() =>
                                                                removeNewImage(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <X />
                                                            <span className="sr-only">
                                                                Retirer
                                                            </span>
                                                        </FileListAction>
                                                    </FileListHeader>
                                                </FileListItem>
                                            ))}
                                        </FileList>
                                    )}
                                </div>
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
