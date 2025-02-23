import HeroSection from "@/Components/Home/HeroSection";
import { Head } from "@inertiajs/react";
import { Auth } from "@/types";

export interface HomeProps {
    auth: Auth;
}

export default function Home({ auth }: HomeProps) {
    return (
        <>
            <Head title="Accueil" />
            <HeroSection auth={auth} />
        </>
    );
}
