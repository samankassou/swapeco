import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";

export default function OffersPagination({ links }) {
    return (
        <Pagination>
            <PaginationContent>
                {links.map((link, i) => {
                    // Skip rendering if it's the current page number
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
