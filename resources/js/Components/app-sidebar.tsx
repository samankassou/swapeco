import * as React from "react";
import {
    Flower,
    GalleryVerticalEnd,
    Gauge,
    HandCoins,
    LayoutDashboard,
    NewspaperIcon,
    TagsIcon,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/Components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import { NavMain } from "./Dashboard/NavMain";
import { NavDashboard } from "./Dashboard/NavDashboard";
import { NavUser } from "./Dashboard/NavUser";
const navigations = [
    {
        group: "Dashboard",
        permission: null,
        role: null,
        menu: [
            {
                name: "Dashboard",
                href: route("dashboard"),
                icon: (
                    <LayoutDashboard className="h-4 w-4 shrink-0 text-gray-600" />
                ),
                current: route().current("dashboard"),
                permission: null,
                role: null,
                subs: [],
            },
        ],
    },
    {
        group: "Content",
        permission: null,
        role: null,
        menu: [
            {
                name: "Posts",
                href: route("dashboard"),
                icon: (
                    <NewspaperIcon className="h-4 w-4 shrink-0 text-gray-600" />
                ),
                current: route().current("dashboard"),
                permission: null,
                role: null,
                subs: [],
            },
            {
                name: "Categories",
                href: route("dashboard"),
                icon: <TagsIcon className="h-4 w-4 shrink-0 text-gray-600" />,
                current: "dashboard",
                permission: null,
                role: null,
                subs: [],
            },
        ],
    },
];

const data = {
    dashboard: {
        name: "Dashboard",
        url: route("dashboard"),
        icon: Gauge,
        isActive: route().current("dashboard"),
    },
    navMain: [
        {
            title: "Bourse d’échanges",
            url: "#",
            icon: HandCoins,
            isActive: false,
            items: [
                {
                    title: "Comment ça marche",
                    url: "#",
                    icon: HandCoins,
                    isActive: false,
                },
                {
                    title: "Gestion des échanges",
                    url: "#",
                    icon: HandCoins,
                    isActive: false,
                },
                {
                    title: "Mes transactions d’Echanges",
                    url: "#",
                    icon: HandCoins,
                    isActive: false,
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = usePage().props.auth.user;

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Flower className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">
                                        Swap ECO
                                    </span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavDashboard dashboard={data.dashboard} />
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
