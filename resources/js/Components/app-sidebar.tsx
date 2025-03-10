import * as React from "react";
import { Flower, Gauge, HandCoins, LucideUsers2 } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/Components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import { NavMain } from "./Dashboard/NavMain";
import { NavDashboard } from "./Dashboard/NavDashboard";
import { NavUser } from "./Dashboard/NavUser";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = usePage().props.auth.user;

    const data = {
        dashboard: {
            name: "Tableau de bord",
            url: route("admin.dashboard"),
            icon: Gauge,
            isActive: route().current("admin.dashboard"),
        },
        navMain: [
            {
                title: "Bourse d’échanges",
                url: "#",
                icon: HandCoins,
                isActive: route().current("admin.exchange_market.*"),
                items: [
                    {
                        title: "Comment ça marche",
                        url: route("admin.exchange_market.how_it_works"),
                        icon: HandCoins,
                        isActive: route().current(
                            "admin.exchange_market.how_it_works"
                        ),
                    },
                    {
                        title: "Trouver une offre d’échange",
                        url: route("admin.exchange_market.offers.index"),
                        icon: HandCoins,
                        isActive: route().current(
                            "admin.exchange_market.offers.index"
                        ),
                    },
                    {
                        title: "Déposer une offre d’échange",
                        url: route("admin.exchange_market.offers.create"),
                        icon: HandCoins,
                        isActive: route().current(
                            "admin.exchange_market.offers.create"
                        ),
                    },
                    {
                        title: "Mes offres d’Echanges",
                        url: route("admin.exchange_market.offers.me"),
                        icon: HandCoins,
                        isActive: route().current(
                            "admin.exchange_market.offers.me"
                        ),
                    },
                    // Item visible uniquement pour les admins
                    ...(user?.is_admin
                        ? [
                              {
                                  title: "Gérer les offres d’Echanges",
                                  url: route(
                                      "admin.exchange_market.offers.manage"
                                  ),
                                  icon: HandCoins,
                                  isActive: route().current(
                                      "admin.exchange_market.offers.manage"
                                  ),
                              },
                          ]
                        : []),
                    {
                        title: "Mes transactions d’Echanges",
                        url: "#",
                        icon: HandCoins,
                        isActive: false,
                    },
                ],
            },
            ...(user?.is_admin
                ? [
                      {
                          title: "Utilisateurs",
                          url: route("admin.users.index"),
                          icon: LucideUsers2,
                          isActive: route().current("admin.users.*"),
                          items: [
                              {
                                  title: "Gérer les utilisateurs",
                                  url: route("admin.users.index"),
                                  icon: LucideUsers2,
                                  isActive:
                                      route().current("admin.users.index"),
                              },
                          ],
                      },
                  ]
                : []),
        ],
    };

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
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
