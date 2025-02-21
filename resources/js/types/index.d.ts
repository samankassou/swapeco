export interface User {
    id: number;
    name: string;
    email: string;
    avatar: "/avatars/shadcn.jpg";
    email_verified_at?: string;
}

export interface Flash {
    type: string;
    message: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
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
