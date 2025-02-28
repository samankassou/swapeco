"use client";

import { Head } from "@inertiajs/react";
import Dashboard from "@/Layouts/DashboardLayout";
import { motion } from "framer-motion";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

export default function Index() {
    return (
        <>
            <Head title="Comment ça marche" />

            {/* Section Présentation */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-gray-300 rounded-md to-gray-500 text-white py-8 md:py-16 text-center shadow-md"
            >
                <div className="container mx-auto px-6">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 max-w-2xl mx-auto">
                        Découvrez la Bourse des Échanges : Valorisez vos
                        ressources !
                    </h1>
                    <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
                        Que vous soyez à la recherche d'une bourse pour vos
                        produits et services, ou si vous souhaitez mettre vos
                        ressources à disposition d'autres utilisateurs, notre
                        plateforme vous offre une solution flexible et efficace.
                    </p>
                    <Button asChild>
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            Rechercher une offre
                        </motion.button>
                    </Button>
                </div>
            </motion.section>

            <div>
                {/* Explication du fonctionnement */}
                <Card className="md:px-6 lg:px-8 md:py-4 shadow-md">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-gray-800">
                            Comment fonctionne la Bourse des Échanges ?
                        </CardTitle>
                        <CardDescription>
                            Un système innovant où vous pouvez échanger des
                            produits, des services, ou même des ressources
                            contre de l'argent ou sous forme de troc. Découvrez
                            comment ça marche !
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-4 md:gap-8">
                        {/* Étape 1: Recherche d'une Offre */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-md shadow-md"
                        >
                            <h2 className="font-semibold text-lg text-gray-700 mb-4">
                                🔍 Recherche d'une Offre
                            </h2>
                            <p className="text-sm text-gray-700 mb-4">
                                Une fois inscrit, vous pouvez rechercher des
                                bourses adaptées à vos besoins en produits ou
                                services. Que ce soit pour des investissements,
                                des biens ou des échanges, vous trouverez une
                                offre correspondant à vos attentes. Notre moteur
                                de recherche puissant facilite la navigation.
                            </p>
                            <Button asChild>
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.6 }}
                                >
                                    Commencer ma recherche
                                </motion.button>
                            </Button>
                        </motion.div>

                        {/* Étape 2: Mettre en Bourse un Produit ou Service */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-md shadow-md"
                        >
                            <h2 className="font-semibold text-lg text-gray-700 mb-4">
                                🛠️ Mettre en Bourse un Service ou Produit
                            </h2>
                            <p className="text-sm text-gray-700 mb-4">
                                Si vous possédez un excédent de ressources, vous
                                pouvez facilement les mettre en bourse. Les
                                autres utilisateurs pourront les échanger contre
                                de l'argent ou via un système de troc simple et
                                rapide. Notre plateforme permet d'ajouter vos
                                produits ou services en quelques étapes simples
                                et rapides.
                            </p>
                            <Button asChild>
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.8 }}
                                >
                                    Mettre en bourse
                                </motion.button>
                            </Button>
                        </motion.div>

                        {/* Étape 3: Engagez-vous dans l'Économie Circulaire */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-md shadow-md"
                        >
                            <h2 className="font-semibold text-lg text-gray-700 mb-4">
                                ♻️ Engagez-vous dans l'Économie Circulaire
                            </h2>
                            <p className="text-sm text-gray-700 mb-4">
                                Rejoignez une économie circulaire, réduisez les
                                déchets et valorisez vos excédents tout en
                                contribuant à des projets sociaux et
                                écologiques. C'est une opportunité de participer
                                activement à un monde plus durable tout en
                                gagnant de l'argent.
                            </p>
                            <Button asChild>
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 1 }}
                                >
                                    Rejoindre l'économie circulaire
                                </motion.button>
                            </Button>
                        </motion.div>
                    </CardContent>
                    <CardFooter className="grid grid-cols-1 mt-8 md:grid-cols-3 py-4 gap-4 rounded-b-md border border-gray-300">
                        <p className="md:col-span-2 text-sm text-gray-900 italic leading-relaxed text-left pr-5">
                            <strong>
                                Rejoignez dès maintenant la Bourse des Échanges
                                !
                            </strong>
                            <br />
                            Maximisez vos opportunités en échangeant des
                            produits, services et ressources sur notre
                            plateforme.
                            <span className="font-semibold text-gray-800">
                                {" "}
                                Participez à une économie plus équitable et
                                durable.
                            </span>
                        </p>

                        <div className="flex flex-col justify-center space-y-4">
                            <Button asChild>
                                <motion.button
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    Commencer maintenant 🚀
                                </motion.button>
                            </Button>

                            <Button variant="secondary" asChild>
                                <motion.button
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    En savoir plus ℹ️
                                </motion.button>
                            </Button>
                        </div>
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
