import { Link } from "@inertiajs/react";

interface HeaderProps {
    breadcrumbs?: Array<{
        href: string;
        label: string;
    }>;
}

export default function Header({ breadcrumbs }: HeaderProps) {
    if (!breadcrumbs || breadcrumbs.length === 0) {
        return (
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <nav className="flex items-center space-x-4 lg:space-x-6"></nav>
                </div>
            </div>
        );
    }

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <nav className="flex items-center space-x-4 lg:space-x-6">
                    {breadcrumbs.map((item, index) => (
                        <div key={index} className="flex items-center">
                            {index > 0 && (
                                <span className="mx-2 text-gray-400">/</span>
                            )}
                            <Link
                                href={item.href}
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                {item.label}
                            </Link>
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    );
}
