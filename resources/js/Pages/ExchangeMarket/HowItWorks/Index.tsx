import { Head } from "@inertiajs/react";
import Dashboard from "@/Layouts/DashboardLayout";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

export default function Index() {
    return (
        <>
            <Head title="Comment ça marche" />

            <div className="flex items-center mb-5">
                <h1 className="text-lg font-bold md:text-2xl">
                    Bourse d'échanges - Comment ça marche
                </h1>
            </div>
            <div className="container mx-auto">
                <Card className="px-10 py-4">
                    <CardHeader>
                        <CardTitle className="text-base font-bold md:text-xl">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </CardTitle>
                        <CardDescription>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <h2 className="font-semibold leading-none tracking-tight">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptatum suscipit minima distinctio harum
                            facilis vel nam nihil. Cupiditate, deserunt non
                            impedit, repellendus excepturi expedita nostrum,
                            odio aut quibusdam obcaecati qui! Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Laudantium
                            quo, fuga dolorum ipsum sed iste facere perferendis
                            a et id quod aut culpa, qui quis! Ex ipsum accusamus
                            neque est? Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. A nisi maiores amet! Minima eaque
                            itaque laboriosam minus, natus eum neque fuga in
                            soluta magni voluptatibus, porro quam voluptatum
                            facere laborum!
                        </p>
                        <p>
                            <img
                                className="object-cover h-96 w-full"
                                src="/images/placeholders/placeholder.svg"
                                alt="Placeholder"
                            />
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptatum suscipit minima distinctio harum
                            facilis vel nam nihil. Cupiditate, deserunt non
                            impedit, repellendus excepturi expedita nostrum,
                            odio aut quibusdam obcaecati qui! Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Harum, ad
                            magnam! Sapiente quibusdam officiis asperiores eum
                            cum repellat, sed illum accusantium impedit veniam
                            corporis molestias. Quos beatae qui voluptatibus
                            repellat? Lorem ipsum dolor, sit amet consectetur
                            adipisicing elit. Tempora beatae itaque, amet ipsa
                            at culpa eos corrupti voluptas. Necessitatibus
                            fugiat architecto quis. Tempora, aspernatur et
                            perferendis necessitatibus dolores harum aliquam.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptatum suscipit minima distinctio harum
                            facilis vel nam nihil. Cupiditate, deserunt non
                            impedit, repellendus excepturi expedita nostrum,
                            odio aut quibusdam obcaecati qui!
                        </p>
                    </CardContent>
                    <CardFooter>
                        <p className="text-sm italic">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptatum suscipit minima distinctio harum
                            facilis vel nam nihil. Cupiditate, deserunt non
                            impedit, repellendus excepturi expedita nostrum,
                            odio aut quibusdam obcaecati qui!
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode): React.ReactElement => {
    const breadcrumbs = [
        { href: "#", label: "Bourse d'échanges" },
        {
            href: route("admin.exchange_market.how_it_works"),
            label: "Comment ça marche",
        },
    ];

    return <Dashboard children={page} breadcrumbs={breadcrumbs} />;
};
