export interface User {
    id: number;
    name: string;
    email: string;
    avatar: "/avatars/shadcn.jpg";
    email_verified_at?: string;
    [key: string]: unknown;
}

export interface Auth {
    user: User;
}

export interface Campus {
    id: number;
    name: string;
    [key: string]: unknown;
}

export interface Flash {
    type?: string;
    message?: string;
}

export interface Offer {
    id: number;
    image_url: "/images/placeholders/placeholder.svg";
    title: string;
    description: string;
    type: string;
    status: string;
    campuses?: Campus[];
    estimated_value: number;
    published_at?: string;
    created_at: string;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    flash?: Flash;
};

export interface NavItem {
    title: string;
    url: string;
    icon?: React.ComponentType<{ className?: string }>;
    isActive: boolean;
    items?: NavItem[];
}

interface NavMainProps {
    items: NavItem[];
}
interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}
export interface PaginatedData<T> {
    data: T[];
    links: PaginationLink[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface BreadcrumbItem {
    label: string;
    href: string;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    flash: {
        message?: string;
        type?: "success" | "error" | "info" | "warning";
    };
    [key: string]: unknown;
}
