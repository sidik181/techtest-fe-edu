"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { href, label };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4"
    >
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-700"
          >
            {pathname !== "/" && (
              <>
                <Home className="h-4 w-4" />
                <span className="sr-only">Home</span>
              </>
            )}
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const isSettingsPath = breadcrumb.href.startsWith("/settings") 
          return (
            <li
              key={breadcrumb.href}
              className="flex items-center"
            >
              <ChevronRight className="h-4 w-4 text-gray-400" />
              {isSettingsPath ? (
                <span className="ml-2 text-gray-500">
                  {breadcrumb.label}
                </span>
              ) : isLast ? (
                <span className="ml-2 text-gray-700 font-medium">
                  {breadcrumb.label}
                </span>
              ) : (
                <Link
                  href={breadcrumb.href}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  {breadcrumb.label}
                </Link>
              )}
              {/* {isLast && isSettingsPath ? (
                <span className="ml-2 text-gray-700 font-medium">
                  {breadcrumb.label}
                </span>
              ) : (
                <Link
                  href={breadcrumb.href}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  {breadcrumb.label}
                </Link>
              )} */}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
