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

export default function Index() {
    return (
        <>
            <Head title="Comment ça marche" />

            {/* Section Présentation */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-blue-300 to-blue-600 text-white py-16 text-center shadow-lg"
            >
                <div className="container mx-auto px-6">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
                        Découvrez la Bourse des Échanges : Valorisez vos
                        ressources !
                    </h1>
                    <p className="text-lg md:text-xl mb-6">
                        Que vous soyez à la recherche d'une bourse pour vos
                        produits et services, ou si vous souhaitez mettre vos
                        ressources à disposition d'autres utilisateurs, notre
                        plateforme vous offre une solution flexible et efficace.
                    </p>
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="px-6 py-3 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-full shadow-md"
                    >
                        Rechercher une Bourse
                    </motion.button>
                </div>
            </motion.section>

            <div className="container mx-auto py-16 px-6">
                {/* Explication du fonctionnement */}
                <Card className="px-10 py-4 shadow-lg">
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
                    <CardContent className="space-y-8">
                        {/* Étape 1: Recherche d'une Bourse */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="p-6 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-xl shadow-xl"
                        >
                            <h2 className="font-semibold text-lg text-indigo-700">
                                🔍 Recherche d'une Bourse
                            </h2>
                            <p className="text-sm text-gray-700">
                                Une fois inscrit, vous pouvez rechercher des
                                bourses adaptées à vos besoins en produits ou
                                services. Que ce soit pour des investissements,
                                des biens ou des échanges, vous trouverez une
                                offre correspondant à vos attentes. Notre moteur
                                de recherche puissant facilite la navigation.
                            </p>
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.6 }}
                                className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md"
                            >
                                Commencer ma Recherche
                            </motion.button>
                        </motion.div>

                        {/* Étape 2: Mettre en Bourse un Produit ou Service */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="p-6 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-xl shadow-xl"
                        >
                            <h2 className="font-semibold text-lg text-indigo-700">
                                🛠️ Mettre en Bourse un Service ou Produit
                            </h2>
                            <p className="text-sm text-gray-700">
                                Si vous possédez un excédent de ressources, vous
                                pouvez facilement les mettre en bourse. Les
                                autres utilisateurs pourront les échanger contre
                                de l'argent ou via un système de troc simple et
                                rapide. Notre plateforme permet d'ajouter vos
                                produits ou services en quelques étapes simples
                                et rapides.
                            </p>
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.8 }}
                                className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md"
                            >
                                Mettre en Bourse
                            </motion.button>
                        </motion.div>

                        {/* Étape 3: Engagez-vous dans l'Économie Circulaire */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="p-6 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-xl shadow-xl"
                        >
                            <h2 className="font-semibold text-lg text-indigo-700">
                                ♻️ Engagez-vous dans l'Économie Circulaire
                            </h2>
                            <p className="text-sm text-gray-700">
                                Rejoignez une économie circulaire, réduisez les
                                déchets et valorisez vos excédents tout en
                                contribuant à des projets sociaux et
                                écologiques. C'est une opportunité de participer
                                activement à un monde plus durable tout en
                                gagnant de l'argent.
                            </p>
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 1 }}
                                className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md"
                            >
                                Découvrir l'Économie Circulaire
                            </motion.button>
                        </motion.div>
                    </CardContent>
                    <CardFooter className="p-6 bg-gradient-to-r from-blue-100 to-blue-300 rounded-b-xl shadow-lg border-t border-blue-300 backdrop-blur-md">
                    <p className="text-sm text-gray-900 italic leading-relaxed text-left pr-6 pl-6">
                        <strong>Rejoignez dès maintenant la Bourse des Échanges !</strong><br />
                        Maximisez vos opportunités en échangeant des produits, services et ressources sur notre plateforme. 
                        <span className="font-semibold text-blue-800"> Participez à une économie plus équitable et durable.</span>
                    </p>


                        <div className="mt-6 flex justify-center space-x-4">
                            <motion.button
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all focus:ring-2 focus:ring-indigo-400"
                            >
                                Commencer maintenant 🚀
                            </motion.button>

                            <motion.button
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-semibold rounded-lg shadow-md transition-all focus:ring-2 focus:ring-indigo-400"
                            >
                                En savoir plus ℹ️
                            </motion.button>
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
