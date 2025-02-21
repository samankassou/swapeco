import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { SidebarTrigger } from "@/Components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

interface Breadcrumb {
    href?: string;
    label: string;
}

export default function Header({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center gap-2 px-3">
                <SidebarTrigger />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbs.map((breadcrumb, index) => (
                            <React.Fragment key={index}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={breadcrumb.href}>
                                        {breadcrumb.label}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {index < breadcrumbs.length - 1 && (
                                    <BreadcrumbSeparator key={"sep" + index} />
                                )}
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
}
