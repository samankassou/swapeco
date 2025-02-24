import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";

interface PaginationLink {
    label: string;
    url: string | null;
    active: boolean;
}

interface OffersPaginationProps {
    links: PaginationLink[];
}

export default function OffersPagination({ links }: OffersPaginationProps) {
    return (
        <Pagination>
            <PaginationContent>
                {links.map((link: PaginationLink, i: number) => {
                    if (link.label.includes("...")) {
                        return (
                            <PaginationItem key={i}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    if (link.label === "&laquo; Previous") {
                        return (
                            <PaginationItem key={i}>
                                <PaginationPrevious
                                    href={link.url ?? "#"}
                                    className={
                                        link.active
                                            ? "bg-primary text-primary-foreground"
                                            : ""
                                    }
                                />
                            </PaginationItem>
                        );
                    }

                    if (link.label === "Next &raquo;") {
                        return (
                            <PaginationItem key={i}>
                                <PaginationNext
                                    href={link.url ?? "#"}
                                    className={
                                        link.active
                                            ? "bg-primary text-primary-foreground"
                                            : ""
                                    }
                                />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={i}>
                            <PaginationLink
                                href={link.url ?? "#"}
                                isActive={link.active}
                            >
                                {link.label}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
}
