import { SidebarProvider } from "@/components/organisms/SidebarContext";
import { Navbar } from "@/components/organisms/Navbar";
import { Sidebar } from "@/components/organisms/Sidebar";
import { Breadcrumbs } from "@/components/organisms/Breadcrumbs";
import AuthWrapped from "@/components/organisms/AuthWrapped";
import "./root.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapped>
      <SidebarProvider>
        <div className="flex flex-col h-screen">
          <Navbar />
          <div className="flex-1 flex overflow-hidden pt-16">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
              <div className="p-6">
                <Breadcrumbs />
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </AuthWrapped>
  );
}
