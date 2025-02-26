"use client";

import { useState } from "react";
import { Head } from "@inertiajs/react";
import Dashboard from "@/Layouts/DashboardLayout";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import DeleteUserForm from "./Partials/DeleteUserForm";
import { PageProps } from "@/types";

export default function Index({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const [activeTab, setActiveTab] = useState("profile");
    const [progress, setProgress] = useState(33); // Progression de la mise à jour (33%, 66%, 100%)

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        if (tab === "profile") {
            setProgress(33); // Profil: 33%
        } else if (tab === "password") {
            setProgress(66); // Mot de passe: 66%
        } else if (tab === "appearance") {
            setProgress(100); // Apparence: 100%
        }
    };

    return (
        <>
            <Head title="Paramètres du Profil" />

            <h3 className="text-xl font-semibold">Parametres</h3>
            <p className="text-sm text-gray-600">Mettez à jour votre profil et vos informations de compte</p>   
           
            <div className="py-10">

                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Barre de navigation horizontale avec espacement réduit */}
                    <div className="flex items-center justify-start border-b border-gray-700 pb-3 mb-6 space-x-4">
                        <button
                            onClick={() => handleTabChange("profile")}
                            className={`px-3 py-1 text-xs font-medium transition-all ease-in-out duration-300 ${activeTab === "profile" ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-500 hover:text-gray-300"}`}
                        >
                            Profil
                        </button>
                        <button
                            onClick={() => handleTabChange("password")}
                            className={`px-3 py-1 text-xs font-medium transition-all ease-in-out duration-300 ${activeTab === "password" ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-500 hover:text-gray-300"}`}
                        >
                            Mot de passe
                        </button>
                        <button
                            onClick={() => handleTabChange("appearance")}
                            className={`px-3 py-1 text-xs font-medium transition-all ease-in-out duration-300 ${activeTab === "appearance" ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-500 hover:text-gray-300"}`}
                        >
                            Apparence
                        </button>
                    </div>

                    {/* Barre de progression améliorée */}
                    <div className="w-full bg-gray-600 rounded-full h-1.5 mb-4">
                        <div
                            className="bg-gray-900 text-xs font-medium text-gray-100 text-center p-0.5 leading-none rounded-full"
                            style={{ width: `${progress}%`, transition: "width 0.5s ease-out" }}
                        >
                            {progress}%
                        </div>
                    </div>

                    {/* Contenu dynamique selon l'onglet actif */}
                    {activeTab === "profile" && (
                        <div className="bg-white-800 p-5 shadow-md sm:rounded-lg sm:p-6">
                            <div className="flex justify-between gap-6">
                                {/* Formulaire de mise à jour des informations du profil à gauche */}
                                <div className="w-full sm:w-1/2">
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                        className="max-w-xl mb-4"
                                    />
                                </div>

                                {/* Formulaire de suppression de compte à droite */}
                                <div className="w-full sm:w-2/4">
                                    <DeleteUserForm className="max-w-xl" />
                                </div>
                            </div>
                        </div>
                    )}


                    {activeTab === "password" && (
                        <div className="bg-white-800 p-5 shadow-md sm:rounded-lg sm:p-6">
                            <UpdatePasswordForm
                                className="max-w-xl mb-4"
                            />
                        </div>
                    )}

                    {activeTab === "appearance" && (
                        <div className="bg-gray-800 p-5 shadow-md sm:rounded-lg sm:p-6">
                            <h3 className="text-lg font-semibold text-gray-200">Personnalisation de l'apparence</h3>
                            <p className="text-xs text-gray-400">Cette section est en développement...</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode): React.ReactElement => {
    const breadcrumbs = [
        { href: "#", label: "Paramètres du profil" },
    ];

    return <Dashboard children={page} breadcrumbs={breadcrumbs} />;
};


