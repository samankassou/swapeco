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
import { Offer, Campus } from "@/types";
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
    files: any[]; // ou File[] si vous utilisez l'API File de TypeScript
    [key: string]: any; // Pour satisfaire la contrainte de FormDataType
}
export default function Index({
    offer,
    campuses,
}: {
    offer: Offer;
    campuses: Campus[];
}) {
    // transform campuses to array of { label: string, value: string }
    const campusOptions = campuses.map((campus) => ({
        label: campus.name,
        value: campus.id.toString(),
    }));

    // Extraire les IDs des campus de l'offre et les convertir en chaînes
    const initialCampusIds = offer.campuses
        ? offer.campuses.map((campus) => campus.id.toString())
        : [];

    const [selectedCampuses, setSelectedCampuses] =
        useState<string[]>(initialCampusIds);
    const [files, setFiles] = useState<File[]>([]);

    const { data, setData, put, processing, errors } = useForm<OfferFormData>({
        type: offer.type,
        title: offer.title,
        description: offer.description,
        estimated_value: offer.estimated_value,
        status: offer.status,
        campuses: initialCampusIds,
        files: [],
    });

    const handleCampusChange = (values: string[]) => {
        setSelectedCampuses(values);
        setData("campuses", values);
    };

    const handleFilesChange = (newFiles: File[]) => {
        // Mettre à jour l'état local
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);

        // Pour Inertia.js, qui attend généralement un FormData ou une structure similaire
        setData("files", [...files, ...newFiles]);
    };

    // submit the form
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("admin.exchange_market.offers.update", offer.id));
    };

    // remove a file from the list
    const removeFile = (index: number): void => {
        // Create a new array excluding the file at the specified index
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);

        // Also update the form data to reflect the removed file
        setData("files", updatedFiles);
    };

    return (
        <>
            <Head title="Gestion des offres" />

            <div className="flex items-center mb-5">
                <h1 className="text-lg font-bold md:text-2xl">
                    Bourse d'échanges - Modifier une offre d'échange
                </h1>
            </div>
            <div className="container mx-auto">
                <Card className="px-10 py-4">
                    <CardHeader>
                        <CardTitle className="text-base font-bold md:text-xl flex justify-between mb-4">
                            <h2>Modifier une offre d'échange</h2>
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
                                                Product
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
                                <div className="mt-1">
                                    <Dropzone
                                        multiple
                                        accept={{
                                            "image/*": [".jpg", ".png"],
                                        }}
                                        onDropAccepted={handleFilesChange}
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
                                    <FileList className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {files.map((file, index) => (
                                            <FileListItem key={index}>
                                                <FileListHeader>
                                                    <FileListIcon />
                                                    <FileListInfo>
                                                        <FileListName>
                                                            {file.name}
                                                        </FileListName>
                                                        <FileListDescription>
                                                            <FileListSize>
                                                                {file.size}
                                                            </FileListSize>
                                                        </FileListDescription>
                                                    </FileListInfo>
                                                    <FileListAction
                                                        onClick={() =>
                                                            removeFile(index)
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
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-end">
                                <Button type="submit" disabled={processing}>
                                    Soumettre l'offre
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
