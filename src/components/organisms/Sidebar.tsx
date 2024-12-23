"use client";

import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import sidebarItems from "./SidebarItems";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarContext";
import { useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggleSidebar } = useSidebar();
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);

  return (
    <div
      className={cn(
        "pb-12 border-r h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-300",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarItems.map((item, index) => (
              <div key={index}>
                {item.children ? (
                  <>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start",
                        !isOpen && "justify-center p-0 w-12 h-12"
                      )}
                      onClick={() =>
                        isOpen && setIsSettingsExpanded(!isSettingsExpanded)
                      }
                    >
                      <item.icon className={cn("h-4 w-4", isOpen && "mr-2")} />
                      {isOpen && (
                        <>
                          <span className="flex-1 text-left">{item.label}</span>
                          {isSettingsExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </>
                      )}
                    </Button>
                    {isOpen && isSettingsExpanded && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.children.map((child, childIndex) => (
                          <Button
                            key={childIndex}
                            variant="ghost"
                            className={cn(
                              "w-full justify-start pl-6 text-sm",
                              pathname === child.href && "bg-muted"
                            )}
                            asChild
                          >
                            <Link href={child.href}>
                              {child.icon && <child.icon className="mr-2" />}
                              {child.label}
                            </Link>
                          </Button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      pathname === item.href && "bg-muted",
                      !isOpen && "justify-center p-0 w-12 h-12"
                    )}
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon className={cn("h-4 w-4", isOpen && "mr-2")} />
                      {isOpen && <span>{item.label}</span>}
                    </Link>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute bottom-4 right-2"
        onClick={toggleSidebar}
      >
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </Button>
    </div>
  );
}
