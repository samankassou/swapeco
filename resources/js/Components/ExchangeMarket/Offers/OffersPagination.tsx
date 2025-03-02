import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import { PaginationMeta, PaginationMetaLink } from "@/types";

export default function OffersPagination({ meta }: { meta: PaginationMeta }) {
    return (
        <Pagination>
            <PaginationContent>
                {meta.links.map((link: PaginationMetaLink, i: number) => {
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
