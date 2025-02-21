import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { Toaster } from "@/Components/ui/sonner";
import { toast } from "sonner";
import { AppSidebar } from "@/Components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/Components/ui/sidebar";
import { XIcon } from "lucide-react";
import { PageProps } from "@/types";
import DashboardHeader from "@/Components/Dashboard/Header";

interface DashboardProps {
    children: React.ReactNode;
    breadcrumbs: Array<{
        href?: string;
        label: string;
    }>;
}

export default function Dashboard({ children, breadcrumbs }: DashboardProps) {
    const { flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash?.type && flash?.message) {
            toast(flash.message, {
                className: flash.type,
                duration: 2500,
                action: {
                    label: <XIcon className="h-4 w-4 shrink-0" />,
                    onClick: () => toast.dismiss(),
                },
            });
        }
    }, []);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <DashboardHeader breadcrumbs={breadcrumbs} />
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {children}
                    <Toaster richColors />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
