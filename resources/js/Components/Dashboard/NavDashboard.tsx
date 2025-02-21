import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/sidebar";

interface Dashboard {
    name: string;
    url: string;
    icon: React.ComponentType;
}
interface NavDashboardProps {
    dashboard: Dashboard;
}
export function NavDashboard({ dashboard }: NavDashboardProps) {
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Tableau de bord</SidebarGroupLabel>
            <SidebarMenu>
                <SidebarMenuItem key={dashboard.name}>
                    <SidebarMenuButton asChild>
                        <a href={dashboard.url}>
                            <dashboard.icon />
                            <span>{dashboard.name}</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}
