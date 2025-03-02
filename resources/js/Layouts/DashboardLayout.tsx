import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { Toaster } from "@/Components/ui/sonner";
import { toast } from "sonner";
import { AppSidebar } from "@/Components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/Components/ui/sidebar";
import { XIcon } from "lucide-react";
import { type SharedData } from "@/types";
import DashboardHeader from "@/Components/Dashboard/Header";

interface DashboardProps {
    children: React.ReactNode;
    breadcrumbs: Array<{
        href?: string;
        label: string;
    }>;
}

export default function Dashboard({ children, breadcrumbs }: DashboardProps) {
    const { flash } = usePage<SharedData>().props;

    useEffect(() => {
        if (flash.message && flash.type) {
            toast[flash.type](flash.message, {
                action: {
                    label: "Fermer",
                    onClick: () => toast.dismiss(),
                    altText: "Fermer",
                    icon: <XIcon className="w-4 h-4" />,
                },
            });
        }
    }, [flash]);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <DashboardHeader breadcrumbs={breadcrumbs} />
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {children}
                    <Toaster position="top-right" />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
