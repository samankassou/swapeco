import Heading from "@/Components/heading";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

interface NavItem {
    title: string;
    url: string;
    icon: React.ReactNode;
}
const sidebarNavItems: NavItem[] = [
    {
        title: "Profil",
        url: "/settings/profile",
        icon: null,
    },
    {
        title: "Password",
        url: "/settings/password",
        icon: null,
    },
    {
        title: "Appearance",
        url: "/settings/appearance",
        icon: null,
    },
];

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentPath = window.location.pathname;

    return (
        <div className="px-4 py-6">
            <Heading
                title="Paramètres"
                description="Gérez les paramètres de votre compte"
            />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {sidebarNavItems.map((item) => (
                            <Button
                                key={item.url}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn("w-full justify-start", {
                                    "bg-muted": currentPath === item.url,
                                })}
                            >
                                <Link href={item.url} prefetch>
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 md:hidden" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}
