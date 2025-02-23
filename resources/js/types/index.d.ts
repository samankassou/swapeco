export interface User {
    id: number;
    name: string;
    email: string;
    avatar: "/avatars/shadcn.jpg";
    email_verified_at?: string;
}

export interface Auth {
    user: User | null;
}

export interface Offer {
    id: number;
    title: string;
    description: string;
    published_at?: string;
}

export interface Flash {
    type: string;
    message: string;
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

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
