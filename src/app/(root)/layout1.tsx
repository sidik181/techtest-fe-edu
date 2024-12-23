"use client";

import { useState } from "react";
import Header from "@/components/organisms/navigations/header";
import Sidebar from "@/components/organisms/navigations/sidebar";
import { navigation } from "@/components/organisms/navigations/navigation";
import "./root.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openIndexChildrenNavigation, setOpenIndexChildrenNavigation] = useState<
    number | null
  >(null);

  const toggleOpenChildrenNavigation = (index: number) => {
    setOpenIndexChildrenNavigation(index === openIndexChildrenNavigation ? null : index);
  };

  const breadcrumbs = [{ name: "Dashboard", href: "/" }];
  return (
    <div className="flex h-screen">
      <Sidebar
        navigationItem={navigation}
        openIndexChildrenNavigation={openIndexChildrenNavigation}
        toggleOpenChildrenNavigation={toggleOpenChildrenNavigation}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="flex-grow overflow-auto w-full">
        <Header
          title="Dashboard"
          breadcrumbs={breadcrumbs}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <main className="p-2">
          <div className="min-h-screen px-3 py-2">{children}</div>
        </main>
      </div>
    </div>
  );
}
