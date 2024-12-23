"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

type BreadcrumbItem = {
  name: string;
  href: string;
};

interface HeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

export default function Header({
  title,
  breadcrumbs,
  isOpen,
  setIsOpen,
}: HeaderProps) {
  const pathname = usePathname();
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-5 py-3">
      <div className="w-full mx-auto flex justify-between items-center">
        <div className="flex items-center h-8">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className={`${
              isOpen ? "hidden" : "flex"
            } lg:hidden mr-2 px-2 py-1 items-center justify-center`}
            size={"sm"}
            variant="outline"
          >
            <Menu size={20} />
          </Button>
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </div>
        <nav aria-label="breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            {breadcrumbs.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <li
                  key={index}
                  className="flex items-center"
                >
                  {isActive ? (
                    <span className="text-blue-600 font-semibold">
                      {item.name}
                    </span>
                  ) : (
                    <Link href={item.href}>
                      <span className="hover:text-gray-700">{item.name}</span>
                    </Link>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <span className="mx-2">/</span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </header>
  );
}
