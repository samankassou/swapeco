export interface User {
    id: number;
    name: string;
    email: string;
    is_admin?: boolean;
    avatar: "/avatars/shadcn.jpg";
    email_verified_at?: string;
    [key: string]: unknown;
}

export interface Auth {
    user: User;
}

export interface SocialLink {
    id: number;
    user_id: number;
    facebook: string;
    twitter: string;
    linkedin: string;
    github: string;
    instagram: string;
    [key: string]: unknown;
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

export interface OfferStatus {
    value: string;
    label: string;
    classes: string;
}

export interface OfferType {
    value: string;
    label: string;
    classes: string;
}

export interface OfferImage {
    id: string | number;
    name: string;
    url: string;
    [key: string]: unknown;
}
export interface Offer {
    id: number;
    image_url: string;
    title: string;
    description: string;
    type: OfferType;
    status: OfferStatus;
    campuses?: Campus[];
    images: OfferImage[];
    owner: User;
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

export interface NavMainProps {
    items: NavItem[];
}
export interface PaginationMetaLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: PaginationMetaLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}
export interface RichPaginationLink {
    firt: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
}
export interface PaginatedData<T> {
    data: T[];
    links: RichPaginationLink[];
    meta: PaginationMeta;
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
