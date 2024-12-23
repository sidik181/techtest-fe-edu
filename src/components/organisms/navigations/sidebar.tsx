import Link from "next/link";
import Image from "next/image";
import { LogOut, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationItem } from "./navigation";

interface SidebarProps {
  navigationItem: NavigationItem[];
  openIndexChildrenNavigation: number | null;
  toggleOpenChildrenNavigation: (index: number) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({
  navigationItem,
  openIndexChildrenNavigation,
  toggleOpenChildrenNavigation,
  isOpen,
  setIsOpen,
}: SidebarProps) {
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:flex lg:flex-col transition-transform duration-200 ease-in-out`}
      >
        <Link href={"/"}>
          <div className="flex p-5 gap-3 items-center">
            <Image
              src="/images/e-commerce.png"
              width={150}
              height={35}
              alt="Dashboard Logo"
            />
          </div>
        </Link>
        <nav className="flex-grow">
          <ul className="space-y-2 p-4">
            {navigationItem.map((item, index) => {
              const isOpenChildren = openIndexChildrenNavigation === index;
              if (item.children) {
                return (
                  <li key={index}>
                    <div
                      className="flex justify-between items-center rounded hover:bg-gray-700 cursor-pointer"
                      onClick={() => toggleOpenChildrenNavigation(index)}
                    >
                      <div className="flex p-2 gap-2 items-center">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <ChevronsUpDown size={22} />
                    </div>
                    <ul
                      className={`ml-4 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpenChildren ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {item.children.map((child, childIndex) => (
                        <li
                          key={childIndex}
                          className={`${
                            isOpenChildren ? "mt-2" : "-mt-10"
                          } transition-all duration-300 ease-in-out`}
                        >
                          <Link href={child.href || "#"}>
                            <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-600">
                              {child.icon}
                              <span>{child.label}</span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }
              return (
                <li key={index}>
                  {item.href && (
                    <Link href={item.href}>
                      <div className="flex p-2 gap-2 items-center rounded hover:bg-gray-600">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <Link href="/auth/logout">
            <Button
              variant={"destructive"}
              className="w-full"
            >
              <LogOut size={22} />
              Logout
            </Button>
          </Link>
        </div>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
