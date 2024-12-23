"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "./SidebarContext";
import Link from "next/link";
import Image from "next/image";
import { UserMenu } from "../../features/user/components/dropdown-profile";
import { CartDropdown } from "@/features/cart/components/cart-dropdown";

export function Navbar() {
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="border-b fixed top-0 left-0 right-0 bg-background z-10">
      <div className="flex h-16 items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Link href={"/"}>
          <div className="flex gap-3 items-center">
            <Image
              src="/images/e-commerce.png"
              width={150}
              height={35}
              alt="Dashboard Logo"
            />
          </div>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <CartDropdown />
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}
