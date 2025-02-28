import { ReactNode } from "react";
import { Link } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";
import { BreadcrumbItem } from "@/types";

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs = [] }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="mb-4 text-sm text-gray-500 flex items-center">
          <Link href="/" className="hover:underline">Home</Link>
          {breadcrumbs.map((breadcrumb, index) => (
            <span key={index} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-2" />
              {breadcrumb.href ? (
                <Link href={breadcrumb.href} className="hover:underline">{breadcrumb.label}</Link>
              ) : (
                <span>{breadcrumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Contenu */}
      <div className="bg-white p-6 rounded-lg shadow">{children}</div>
    </div>
  );
}
