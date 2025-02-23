import HeroSection from "@/Components/Home/HeroSection";
import { Head } from "@inertiajs/react";

export default function Home({ auth }) {
    return (
        <>
            <Head title="Accueil" />
            <HeroSection auth={auth} />
        </>
    );
}
